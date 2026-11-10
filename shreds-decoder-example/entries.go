package main

import (
	"encoding/binary"
	"fmt"
)

// Byte slices reference the entry batch. Copy them if keeping a transaction
// beyond the lifetime of that batch. ALT addresses are encoded, not resolved.
type Transaction struct {
	Signatures          [][]byte
	Version             int // -1 = legacy, 0 = v0
	Header              [3]byte
	AccountKeys         [][]byte
	RecentBlockhash     []byte
	Instructions        []Instruction
	AddressTableLookups []AddressTableLookup
	Raw                 []byte
}

type Instruction struct {
	ProgramIDIndex byte
	Accounts, Data []byte
}

type AddressTableLookup struct {
	AccountKey, WritableIndexes, ReadonlyIndexes []byte
}

type Entry struct {
	NumHashes    uint64
	Hash         []byte
	Transactions []Transaction
}

type wireReader struct {
	data []byte
	pos  int
	err  error
}

func (r *wireReader) fail(message string) {
	if r.err == nil {
		r.err = fmt.Errorf("offset %d: %s", r.pos, message)
	}
}

func (r *wireReader) take(n int) []byte {
	if r.err != nil {
		return nil
	}
	if n < 0 || n > len(r.data)-r.pos {
		r.fail("truncated input")
		return nil
	}
	b := r.data[r.pos : r.pos+n]
	r.pos += n
	return b
}

func (r *wireReader) byte() byte {
	b := r.take(1)
	if b == nil {
		return 0
	}
	return b[0]
}

func (r *wireReader) u64() uint64 {
	b := r.take(8)
	if b == nil {
		return 0
	}
	return binary.LittleEndian.Uint64(b)
}

// Solana shortvec is canonical 7-bit continuation encoding, not bincode varint.
func (r *wireReader) shortvec() int {
	value := 0
	for i := 0; i < 3; i++ {
		b := r.byte()
		if r.err != nil {
			return 0
		}
		if (i > 0 && b == 0) || (i == 2 && b > 3) {
			r.fail("invalid shortvec")
			return 0
		}
		value |= int(b&0x7f) << (7 * i)
		if b&0x80 == 0 {
			return value
		}
	}
	r.fail("invalid shortvec")
	return 0
}

func (r *wireReader) vector() []byte { return r.take(r.shortvec()) }

func (r *wireReader) transaction() Transaction {
	start := r.pos
	tx := Transaction{Version: -1}
	n := r.shortvec()
	if n < 1 || n > 127 {
		r.fail("invalid signature count")
	}
	for i := 0; i < n && r.err == nil; i++ {
		tx.Signatures = append(tx.Signatures, r.take(64))
	}
	first := r.byte()
	if first&0x80 != 0 {
		tx.Version = int(first & 0x7f)
		if tx.Version != 0 {
			r.fail("unsupported transaction version")
		}
		first = r.byte()
	}
	tx.Header = [3]byte{first, r.byte(), r.byte()}
	n = r.shortvec()
	if n > 256 {
		r.fail("too many static accounts")
	}
	for i := 0; i < n && r.err == nil; i++ {
		tx.AccountKeys = append(tx.AccountKeys, r.take(32))
	}
	tx.RecentBlockhash = r.take(32)
	n = r.shortvec()
	for i := 0; i < n && r.err == nil; i++ {
		tx.Instructions = append(tx.Instructions, Instruction{r.byte(), r.vector(), r.vector()})
	}
	loaded := 0
	if tx.Version == 0 {
		n = r.shortvec()
		for i := 0; i < n && r.err == nil; i++ {
			lookup := AddressTableLookup{r.take(32), r.vector(), r.vector()}
			loaded += len(lookup.WritableIndexes) + len(lookup.ReadonlyIndexes)
			tx.AddressTableLookups = append(tx.AddressTableLookups, lookup)
		}
	}
	if r.err != nil {
		return tx
	}
	static := len(tx.AccountKeys)
	required := int(tx.Header[0])
	if required != len(tx.Signatures) || required > static || int(tx.Header[1]) >= required || int(tx.Header[2]) > static-required || static+loaded > 256 {
		r.fail("invalid message header or account count")
	}
	for _, inst := range tx.Instructions {
		if inst.ProgramIDIndex == 0 || int(inst.ProgramIDIndex) >= static {
			r.fail("invalid program index")
		}
		for _, account := range inst.Accounts {
			if int(account) >= static+loaded {
				r.fail("invalid instruction account index")
			}
		}
	}
	tx.Raw = r.data[start:r.pos]
	return tx
}

// decodeEntries reads one complete bincode Vec<Entry>, including every legacy
// or v0 transaction. No offset guessing or partial-batch success is allowed.
func decodeEntries(data []byte) ([]Entry, error) {
	r := wireReader{data: data}
	count := r.u64()
	if count > uint64((len(data)-r.pos)/48) {
		r.fail("entry count exceeds remaining bytes")
	}
	var entries []Entry
	for i := uint64(0); i < count && r.err == nil; i++ {
		entry := Entry{NumHashes: r.u64(), Hash: r.take(32)}
		txs := r.u64()
		// The smallest signed legacy transaction occupies 134 bytes.
		if txs > uint64((len(data)-r.pos)/134) {
			r.fail("transaction count exceeds remaining bytes")
		}
		for j := uint64(0); j < txs && r.err == nil; j++ {
			entry.Transactions = append(entry.Transactions, r.transaction())
		}
		entries = append(entries, entry)
	}
	if r.err != nil {
		return nil, r.err
	}
	// Agave can pad the last entry batch with zero bytes to fill a FEC set.
	for _, b := range data[r.pos:] {
		if b != 0 {
			return nil, fmt.Errorf("non-zero trailing bytes after entries at offset %d", r.pos)
		}
	}
	return entries, nil
}
