package main

import (
	"bufio"
	"context"
	"crypto/ecdsa"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"math/big"
	"os"
	"strings"
	"time"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/params"
	"github.com/gorilla/websocket"
	"github.com/joho/godotenv"
	"github.com/tyler-smith/go-bip32"
	"github.com/tyler-smith/go-bip39"
)

const (
	bscMainnetChainID = 56
	selfSendGasLimit  = 50_000
	txCount           = 2
	defaultAmountWei  = "100000000"
	// bloXroute requires at least 0.05 gwei effective gas price across private
	// transactions when no dynamic-fee contract payment is included.
	minPrivateEffectiveGasPriceWei = 50_000_000
	requestTimeout                 = 30 * time.Second
)

type config struct {
	mnemonic       string
	nodeURL        string
	bloxrouteWSURL string
	amountWei      *big.Int
}

type bundleRequest struct {
	JSONRPC string       `json:"jsonrpc"`
	ID      string       `json:"id"`
	Method  string       `json:"method"`
	Params  bundleParams `json:"params"`
}

type bundleParams struct {
	Transactions      []string          `json:"txs"`
	BlockchainNetwork string            `json:"blockchain_network"`
	MEVBuilders       map[string]string `json:"mev_builders"`
}

type bundleResponse struct {
	JSONRPC string          `json:"jsonrpc"`
	ID      json.RawMessage `json:"id"`
	Result  json.RawMessage `json:"result"`
	Error   *rpcError       `json:"error"`
}

type rpcError struct {
	Code    int             `json:"code"`
	Message string          `json:"message"`
	Data    json.RawMessage `json:"data,omitempty"`
}

func main() {
	_ = godotenv.Load()

	cfg, err := loadConfig()
	if err != nil {
		log.Fatal(err)
	}
	privateKey, err := derivePrivateKey(cfg.mnemonic)
	if err != nil {
		log.Fatalf("derive private key: %v", err)
	}
	from := crypto.PubkeyToAddress(privateKey.PublicKey)

	nodeCtx, cancelNode := context.WithTimeout(context.Background(), requestTimeout)

	client, err := ethclient.DialContext(nodeCtx, cfg.nodeURL)
	if err != nil {
		cancelNode()
		log.Fatalf("connect to BSC node: %v", err)
	}
	defer client.Close()

	chainID, err := client.ChainID(nodeCtx)
	if err != nil {
		cancelNode()
		log.Fatalf("read chain ID: %v", err)
	}
	if !chainID.IsInt64() || chainID.Int64() != bscMainnetChainID {
		cancelNode()
		log.Fatalf("node is on chain ID %s; expected BSC Mainnet chain ID %d", chainID, bscMainnetChainID)
	}

	confirmedNonce, err := client.NonceAt(nodeCtx, from, nil)
	if err != nil {
		cancelNode()
		log.Fatalf("read confirmed nonce for %s: %v", from, err)
	}
	pendingNonce, err := client.PendingNonceAt(nodeCtx, from)
	if err != nil {
		cancelNode()
		log.Fatalf("read pending nonce for %s: %v", from, err)
	}
	if pendingNonce != confirmedNonce {
		cancelNode()
		log.Fatalf(
			"wallet has pending transactions (confirmed nonce %d, pending nonce %d); wait for them to settle before building a self-contained bundle",
			confirmedNonce,
			pendingNonce,
		)
	}
	nonce := confirmedNonce
	balance, err := client.BalanceAt(nodeCtx, from, nil)
	if err != nil {
		cancelNode()
		log.Fatalf("read balance for %s: %v", from, err)
	}
	gasTipCap, err := client.SuggestGasTipCap(nodeCtx)
	if err != nil {
		cancelNode()
		log.Fatalf("read suggested gas tip cap: %v", err)
	}
	gasTipCap = compliantGasTipCap(gasTipCap)
	gasPrice, err := client.SuggestGasPrice(nodeCtx)
	cancelNode()
	if err != nil {
		log.Fatalf("read suggested gas price: %v", err)
	}
	gasFeeCap := new(big.Int).Add(gasPrice, gasTipCap)

	required := requiredBalance(gasFeeCap, cfg.amountWei)
	if balance.Cmp(required) < 0 {
		log.Fatalf("insufficient balance for %d transfers: have %s wei, need at least %s wei", txCount, balance, required)
	}

	rawTransactions, hashes, err := buildSelfSendTransactions(
		privateKey,
		chainID,
		nonce,
		gasTipCap,
		gasFeeCap,
		cfg.amountWei,
	)
	if err != nil {
		log.Fatalf("build bundle: %v", err)
	}

	printSummary(from, chainID, nonce, balance, gasTipCap, gasFeeCap, cfg.amountWei, hashes)
	if !confirmSubmission(os.Stdin) {
		fmt.Println("Aborted.")
		return
	}
	recheckCtx, cancelRecheck := context.WithTimeout(context.Background(), requestTimeout)
	currentNonce, err := client.PendingNonceAt(recheckCtx, from)
	cancelRecheck()
	if err != nil {
		log.Fatalf("recheck pending nonce before submission: %v", err)
	}
	if currentNonce != nonce {
		log.Fatalf("wallet nonce changed while awaiting confirmation: got %d, expected %d; rebuild the bundle", currentNonce, nonce)
	}

	submitCtx, cancelSubmit := context.WithTimeout(context.Background(), requestTimeout)
	defer cancelSubmit()
	response, err := submitBundle(submitCtx, cfg.bloxrouteWSURL, rawTransactions)
	if err != nil {
		log.Fatalf("submit bundle: %v", err)
	}
	pretty, err := json.MarshalIndent(response, "", "  ")
	if err != nil {
		log.Fatalf("format response: %v", err)
	}
	fmt.Printf("\nbloXroute response:\n%s\n", pretty)
}

func loadConfig() (config, error) {
	amount := strings.TrimSpace(os.Getenv("AMOUNT_WEI"))
	if amount == "" {
		amount = defaultAmountWei
	}
	amountWei := new(big.Int)
	if _, ok := amountWei.SetString(amount, 10); !ok || amountWei.Sign() <= 0 {
		return config{}, errors.New("AMOUNT_WEI must be a positive base-10 integer")
	}

	cfg := config{
		mnemonic:       strings.TrimSpace(os.Getenv("SEED_PHRASE")),
		nodeURL:        strings.TrimSpace(os.Getenv("RPC_URL")),
		bloxrouteWSURL: strings.TrimSpace(os.Getenv("BLOXROUTE_WS_URL")),
		amountWei:      amountWei,
	}
	if cfg.mnemonic == "" {
		return config{}, errors.New("SEED_PHRASE is required")
	}
	if !bip39.IsMnemonicValid(cfg.mnemonic) {
		return config{}, errors.New("SEED_PHRASE is not a valid BIP-39 mnemonic")
	}
	if cfg.nodeURL == "" {
		return config{}, errors.New("RPC_URL is required")
	}
	if cfg.bloxrouteWSURL == "" {
		return config{}, errors.New("BLOXROUTE_WS_URL is required")
	}
	if !strings.HasPrefix(cfg.bloxrouteWSURL, "ws://") && !strings.HasPrefix(cfg.bloxrouteWSURL, "wss://") {
		return config{}, errors.New("BLOXROUTE_WS_URL must use ws:// or wss://")
	}
	return cfg, nil
}

// derivePrivateKey derives account zero using BIP-44 path m/44'/60'/0'/0/0.
func derivePrivateKey(mnemonic string) (*ecdsa.PrivateKey, error) {
	seed := bip39.NewSeed(mnemonic, "")

	key, err := bip32.NewMasterKey(seed)
	if err != nil {
		return nil, fmt.Errorf("master key: %w", err)
	}
	path := []uint32{
		bip32.FirstHardenedChild + 44,
		bip32.FirstHardenedChild + 60,
		bip32.FirstHardenedChild,
		0,
		0,
	}
	for _, child := range path {
		key, err = key.NewChildKey(child)
		if err != nil {
			return nil, fmt.Errorf("derive child %d: %w", child, err)
		}
	}

	privateKey, err := crypto.ToECDSA(key.Key)
	if err != nil {
		return nil, fmt.Errorf("convert key to ECDSA: %w", err)
	}
	return privateKey, nil
}

func requiredBalance(gasFeeCap, amountWei *big.Int) *big.Int {
	gasPerTransaction := new(big.Int).Mul(gasFeeCap, big.NewInt(selfSendGasLimit))
	costPerTransaction := new(big.Int).Add(gasPerTransaction, amountWei)
	return new(big.Int).Mul(costPerTransaction, big.NewInt(txCount))
}

// compliantGasTipCap applies a conservative floor so the bundle satisfies
// bloXroute's minimum effective gas-price rule even without a dynamic-fee
// contract payment and with a zero base fee.
func compliantGasTipCap(suggested *big.Int) *big.Int {
	minimum := big.NewInt(minPrivateEffectiveGasPriceWei)
	if suggested == nil || suggested.Cmp(minimum) < 0 {
		return minimum
	}
	return new(big.Int).Set(suggested)
}

func buildSelfSendTransactions(
	privateKey *ecdsa.PrivateKey,
	chainID *big.Int,
	startingNonce uint64,
	gasTipCap *big.Int,
	gasFeeCap *big.Int,
	amountWei *big.Int,
) ([]string, []common.Hash, error) {
	if privateKey == nil || chainID == nil || gasTipCap == nil || gasFeeCap == nil || amountWei == nil {
		return nil, nil, errors.New("private key, chain ID, fee caps, and amount are required")
	}
	if chainID.Sign() <= 0 || gasTipCap.Sign() < 0 || gasFeeCap.Sign() <= 0 || amountWei.Sign() <= 0 {
		return nil, nil, errors.New("chain ID, fee cap, and amount must be positive; tip cap must not be negative")
	}
	if gasFeeCap.Cmp(gasTipCap) < 0 {
		return nil, nil, errors.New("gas fee cap must be greater than or equal to gas tip cap")
	}

	from := crypto.PubkeyToAddress(privateKey.PublicKey)
	signer := types.LatestSignerForChainID(chainID)
	rawTransactions := make([]string, 0, txCount)
	hashes := make([]common.Hash, 0, txCount)

	for i := uint64(0); i < txCount; i++ {
		tx := types.NewTx(&types.DynamicFeeTx{
			ChainID:   new(big.Int).Set(chainID),
			Nonce:     startingNonce + i,
			GasTipCap: new(big.Int).Set(gasTipCap),
			GasFeeCap: new(big.Int).Set(gasFeeCap),
			Gas:       selfSendGasLimit,
			To:        &from,
			Value:     new(big.Int).Set(amountWei),
		})
		signed, err := types.SignTx(tx, signer, privateKey)
		if err != nil {
			return nil, nil, fmt.Errorf("sign transaction %d: %w", i+1, err)
		}
		encoded, err := signed.MarshalBinary()
		if err != nil {
			return nil, nil, fmt.Errorf("encode transaction %d: %w", i+1, err)
		}

		// blxr_submit_bundle requires raw transaction bytes without a 0x prefix.
		rawTransactions = append(rawTransactions, hex.EncodeToString(encoded))
		hashes = append(hashes, signed.Hash())
	}

	return rawTransactions, hashes, nil
}

func printSummary(
	from common.Address,
	chainID *big.Int,
	startingNonce uint64,
	balance *big.Int,
	gasTipCap *big.Int,
	gasFeeCap *big.Int,
	amountWei *big.Int,
	hashes []common.Hash,
) {
	bnbBalance := new(big.Float).Quo(new(big.Float).SetInt(balance), big.NewFloat(params.Ether))
	bnbAmount := new(big.Float).Quo(new(big.Float).SetInt(amountWei), big.NewFloat(params.Ether))
	bnbMaxBundleFee := new(big.Float).Quo(
		new(big.Float).SetInt(new(big.Int).Mul(gasFeeCap, big.NewInt(selfSendGasLimit*txCount))),
		big.NewFloat(params.Ether),
	)

	fmt.Println("=== BSC bloXroute Bundle Summary ===")
	fmt.Printf("Address:            %s\n", from.Hex())
	fmt.Printf("Chain ID:           %s\n", chainID)
	fmt.Printf("Transactions:       %d\n", txCount)
	fmt.Printf("Nonces:             %d, %d\n", startingNonce, startingNonce+1)
	fmt.Printf("Balance:            %s BNB\n", bnbBalance.Text('f', 18))
	fmt.Printf("Self-send per tx:   %s BNB (%s wei)\n", bnbAmount.Text('f', 18), amountWei)
	fmt.Printf("Gas limit per tx:   %d\n", selfSendGasLimit)
	fmt.Printf("Gas tip cap:        %s gwei\n", weiToGwei(gasTipCap))
	fmt.Printf("Gas fee cap:        %s gwei\n", weiToGwei(gasFeeCap))
	fmt.Printf("Max bundle gas fee: %s BNB\n", bnbMaxBundleFee.Text('f', 18))
	for i, hash := range hashes {
		fmt.Printf("Tx %d hash:          %s\n", i+1, hash.Hex())
	}
	fmt.Println("====================================")
}

func weiToGwei(value *big.Int) string {
	return new(big.Float).Quo(new(big.Float).SetInt(value), big.NewFloat(params.GWei)).Text('f', 2)
}

func confirmSubmission(input io.Reader) bool {
	fmt.Print("\nSubmit both transactions as one live bundle? (y/yes): ")
	scanner := bufio.NewScanner(input)
	if !scanner.Scan() {
		return false
	}
	answer := strings.TrimSpace(strings.ToLower(scanner.Text()))
	return answer == "y" || answer == "yes"
}

func submitBundle(
	ctx context.Context,
	wsURL string,
	rawTransactions []string,
) (bundleResponse, error) {
	if len(rawTransactions) != txCount {
		return bundleResponse{}, fmt.Errorf("bundle must contain exactly %d transactions, got %d", txCount, len(rawTransactions))
	}

	connection, response, err := websocket.DefaultDialer.DialContext(ctx, wsURL, nil)
	if err != nil {
		if response != nil {
			return bundleResponse{}, fmt.Errorf("connect to bloXroute WebSocket: %w (HTTP status %s)", err, response.Status)
		}
		return bundleResponse{}, fmt.Errorf("connect to bloXroute WebSocket: %w", err)
	}
	defer connection.Close()

	if deadline, ok := ctx.Deadline(); ok {
		if err := connection.SetWriteDeadline(deadline); err != nil {
			return bundleResponse{}, fmt.Errorf("set WebSocket write deadline: %w", err)
		}
		if err := connection.SetReadDeadline(deadline); err != nil {
			return bundleResponse{}, fmt.Errorf("set WebSocket read deadline: %w", err)
		}
	}

	request := bundleRequest{
		JSONRPC: "2.0",
		ID:      "1",
		Method:  "blxr_submit_bundle",
		Params: bundleParams{
			Transactions:      rawTransactions,
			BlockchainNetwork: "BSC-Mainnet",
			MEVBuilders:       map[string]string{"all": ""},
		},
	}
	if err := connection.WriteJSON(request); err != nil {
		return bundleResponse{}, fmt.Errorf("write submission request: %w", err)
	}

	var result bundleResponse
	if err := connection.ReadJSON(&result); err != nil {
		return bundleResponse{}, fmt.Errorf("read submission response: %w", err)
	}
	if result.Error != nil {
		return result, fmt.Errorf("bloXroute RPC error %d: %s", result.Error.Code, result.Error.Message)
	}
	if len(result.Result) == 0 || string(result.Result) == "null" {
		return result, errors.New("bloXroute returned neither a result nor an RPC error")
	}

	return result, nil
}
