package main

import (
	"encoding/hex"
	"encoding/json"
	"math/big"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/gorilla/websocket"
	"github.com/tyler-smith/go-bip39"
)

func TestBuildSelfSendTransactions(t *testing.T) {
	privateKey, err := crypto.GenerateKey()
	if err != nil {
		t.Fatal(err)
	}
	chainID := big.NewInt(bscMainnetChainID)
	gasTipCap := big.NewInt(1_000_000_000)
	gasFeeCap := big.NewInt(3_000_000_000)
	amount := big.NewInt(1)
	startingNonce := uint64(17)

	rawTransactions, hashes, err := buildSelfSendTransactions(
		privateKey,
		chainID,
		startingNonce,
		gasTipCap,
		gasFeeCap,
		amount,
	)
	if err != nil {
		t.Fatalf("buildSelfSendTransactions() error = %v", err)
	}
	if len(rawTransactions) != txCount {
		t.Fatalf("got %d raw transactions, want %d", len(rawTransactions), txCount)
	}
	if len(hashes) != txCount {
		t.Fatalf("got %d hashes, want %d", len(hashes), txCount)
	}

	wantSender := crypto.PubkeyToAddress(privateKey.PublicKey)
	signer := types.LatestSignerForChainID(chainID)
	for i, raw := range rawTransactions {
		if len(raw) >= 2 && raw[:2] == "0x" {
			t.Errorf("transaction %d has forbidden 0x prefix", i+1)
		}
		encoded, err := hex.DecodeString(raw)
		if err != nil {
			t.Fatalf("decode transaction %d: %v", i+1, err)
		}
		var tx types.Transaction
		if err := tx.UnmarshalBinary(encoded); err != nil {
			t.Fatalf("unmarshal transaction %d: %v", i+1, err)
		}
		if tx.Nonce() != startingNonce+uint64(i) {
			t.Errorf("transaction %d nonce = %d, want %d", i+1, tx.Nonce(), startingNonce+uint64(i))
		}
		if tx.To() == nil || *tx.To() != wantSender {
			t.Errorf("transaction %d recipient = %v, want sender %s", i+1, tx.To(), wantSender)
		}
		if tx.Value().Cmp(amount) != 0 {
			t.Errorf("transaction %d value = %s, want %s", i+1, tx.Value(), amount)
		}
		if tx.Type() != types.DynamicFeeTxType {
			t.Errorf("transaction %d type = %d, want dynamic fee type %d", i+1, tx.Type(), types.DynamicFeeTxType)
		}
		if tx.GasTipCap().Cmp(gasTipCap) != 0 {
			t.Errorf("transaction %d gas tip cap = %s, want %s", i+1, tx.GasTipCap(), gasTipCap)
		}
		if tx.GasFeeCap().Cmp(gasFeeCap) != 0 {
			t.Errorf("transaction %d gas fee cap = %s, want %s", i+1, tx.GasFeeCap(), gasFeeCap)
		}
		from, err := types.Sender(signer, &tx)
		if err != nil {
			t.Fatalf("recover sender for transaction %d: %v", i+1, err)
		}
		if from != wantSender {
			t.Errorf("transaction %d sender = %s, want %s", i+1, from, wantSender)
		}
		if tx.Hash() != hashes[i] {
			t.Errorf("transaction %d hash = %s, want %s", i+1, tx.Hash(), hashes[i])
		}
	}
}

func TestRequiredBalance(t *testing.T) {
	gasFeeCap := big.NewInt(3_000_000_000)
	amount := big.NewInt(1)

	got := requiredBalance(gasFeeCap, amount)
	want := big.NewInt(300_000_000_000_002)
	if got.Cmp(want) != 0 {
		t.Fatalf("requiredBalance() = %s, want %s", got, want)
	}
}

func TestCompliantGasTipCap(t *testing.T) {
	minimum := big.NewInt(minPrivateEffectiveGasPriceWei)
	tests := []struct {
		name      string
		suggested *big.Int
		want      *big.Int
	}{
		{name: "nil suggestion", suggested: nil, want: minimum},
		{name: "below minimum", suggested: big.NewInt(1), want: minimum},
		{name: "at minimum", suggested: new(big.Int).Set(minimum), want: minimum},
		{name: "above minimum", suggested: big.NewInt(1_000_000_000), want: big.NewInt(1_000_000_000)},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			got := compliantGasTipCap(test.suggested)
			if got.Cmp(test.want) != 0 {
				t.Fatalf("compliantGasTipCap() = %s, want %s", got, test.want)
			}
		})
	}
}

func TestDerivePrivateKeyIsDeterministic(t *testing.T) {
	mnemonic, err := bip39.NewMnemonic(make([]byte, 16))
	if err != nil {
		t.Fatalf("create test mnemonic: %v", err)
	}
	first, err := derivePrivateKey(mnemonic)
	if err != nil {
		t.Fatalf("first derivePrivateKey() error = %v", err)
	}
	second, err := derivePrivateKey(mnemonic)
	if err != nil {
		t.Fatalf("second derivePrivateKey() error = %v", err)
	}
	firstAddress := crypto.PubkeyToAddress(first.PublicKey)
	secondAddress := crypto.PubkeyToAddress(second.PublicKey)
	if firstAddress != secondAddress {
		t.Fatalf("derived addresses differ: %s != %s", firstAddress, secondAddress)
	}
}

func TestConfirmSubmission(t *testing.T) {
	for _, test := range []struct {
		input string
		want  bool
	}{
		{input: "yes\n", want: true},
		{input: " Y \n", want: true},
		{input: "no\n", want: false},
		{input: "", want: false},
	} {
		if got := confirmSubmission(strings.NewReader(test.input)); got != test.want {
			t.Errorf("confirmSubmission(%q) = %t, want %t", test.input, got, test.want)
		}
	}
}

func TestSubmitBundleRejectsWrongTransactionCount(t *testing.T) {
	_, err := submitBundle(t.Context(), "wss://example.invalid/ws", []string{"one"})
	if err == nil {
		t.Fatal("submitBundle() error = nil, want transaction-count error")
	}
}

func TestSubmitBundleSendsBloxrouteRequest(t *testing.T) {
	upgrader := websocket.Upgrader{}
	server := httptest.NewServer(http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		if got := request.Header.Get("Authorization"); got != "" {
			t.Errorf("Authorization header = %q, want no header for proxy", got)
		}
		connection, err := upgrader.Upgrade(writer, request, nil)
		if err != nil {
			t.Errorf("upgrade WebSocket: %v", err)
			return
		}
		defer connection.Close()

		var got bundleRequest
		if err := connection.ReadJSON(&got); err != nil {
			t.Errorf("read request: %v", err)
			return
		}
		if got.Method != "blxr_submit_bundle" {
			t.Errorf("method = %q, want blxr_submit_bundle", got.Method)
		}
		if got.Params.BlockchainNetwork != "BSC-Mainnet" {
			t.Errorf("blockchain_network = %q, want BSC-Mainnet", got.Params.BlockchainNetwork)
		}
		if len(got.Params.Transactions) != txCount {
			t.Errorf("transaction count = %d, want %d", len(got.Params.Transactions), txCount)
		}
		if got.Params.MEVBuilders["all"] != "" {
			t.Errorf("mev_builders = %#v, want all builder with empty signature", got.Params.MEVBuilders)
		}
		if err := connection.WriteJSON(map[string]any{
			"jsonrpc": "2.0",
			"id":      "1",
			"result":  map[string]string{"bundleHash": "0xbundle"},
		}); err != nil {
			t.Errorf("write response: %v", err)
		}
	}))
	defer server.Close()

	wsURL := "ws" + strings.TrimPrefix(server.URL, "http")
	response, err := submitBundle(t.Context(), wsURL, []string{"aabb", "ccdd"})
	if err != nil {
		t.Fatalf("submitBundle() error = %v", err)
	}
	var result struct {
		BundleHash string `json:"bundleHash"`
	}
	if err := json.Unmarshal(response.Result, &result); err != nil {
		t.Fatalf("decode result: %v", err)
	}
	if result.BundleHash != "0xbundle" {
		t.Fatalf("bundle hash = %q, want 0xbundle", result.BundleHash)
	}
}
