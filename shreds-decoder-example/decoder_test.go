package main

import (
	"bytes"
	"context"
	"encoding/base64"
	"encoding/binary"
	"encoding/json"
	"net"
	"os"
	"strings"
	"testing"
	"time"
)

// Synthetic wire fixtures are built independently of the production reader.
// They are structurally valid but do not contain real cryptographic signatures.
func transactionFixture(v0 bool) []byte {
	b := append([]byte{1}, bytes.Repeat([]byte{0x42}, 64)...)
	if v0 {
		b = append(b, 0x80)
	}
	b = append(b, 1, 0, 1, 2) // header and two static account keys
	b = append(b, bytes.Repeat([]byte{0x11}, 32)...)
	b = append(b, bytes.Repeat([]byte{0x22}, 32)...)
	b = append(b, bytes.Repeat([]byte{0x33}, 32)...)
	b = append(b, 1, 1, 1) // one instruction: program 1, one account
	if v0 {
		b = append(b, 2)
	} else {
		b = append(b, 0)
	}
	b = append(b, 0x82, 0x01) // 130 bytes of instruction data, shortvec
	b = append(b, bytes.Repeat([]byte{0x44}, 130)...)
	if v0 {
		b = append(b, 1) // one ALT lookup
		b = append(b, bytes.Repeat([]byte{0x55}, 32)...)
		b = append(b, 1, 7, 0) // writable index 7; no readonly indexes
	}
	return b
}

func batchFixture() []byte {
	b := binary.LittleEndian.AppendUint64(nil, 2) // two entries
	b = binary.LittleEndian.AppendUint64(b, 1)
	b = append(b, make([]byte, 32)...)
	b = binary.LittleEndian.AppendUint64(b, 2)
	b = append(b, transactionFixture(false)...)
	b = append(b, transactionFixture(true)...)
	b = binary.LittleEndian.AppendUint64(b, 8) // tick entry
	b = append(b, make([]byte, 32)...)
	return binary.LittleEndian.AppendUint64(b, 0)
}

func dataFixture(slot uint64, index uint32, flags, variant byte, payload []byte) []byte {
	size := 1203
	if variant == 0xa5 {
		size = 1228
	}
	b := make([]byte, size)
	b[64] = variant
	binary.LittleEndian.PutUint64(b[65:], slot)
	binary.LittleEndian.PutUint32(b[73:], index)
	binary.LittleEndian.PutUint16(b[77:], 1)
	binary.LittleEndian.PutUint16(b[83:], 1)
	b[85] = flags
	binary.LittleEndian.PutUint16(b[86:], uint16(88+len(payload)))
	copy(b[88:], payload)
	return b
}

func splitFixture(slot uint64) [][]byte {
	b := batchFixture()
	return [][]byte{
		dataFixture(slot, 0, 0, 0x96, b[:200]),
		dataFixture(slot, 1, 0xc0, 0x96, b[200:]),
	}
}

func testDecoder() *decoder { return newDecoder(time.Second*10, 4, 1<<20) }

// Public wire transactions from solana-go complement synthetic fixtures.
// Source URLs are retained alongside the raw transaction data in testdata.
func TestPublicTransactionFixtures(t *testing.T) {
	data, err := os.ReadFile("testdata/transactions.json")
	if err != nil {
		t.Fatal(err)
	}
	var fixtures []struct {
		Name, Base64 string
		Version      int
	}
	if err := json.Unmarshal(data, &fixtures); err != nil {
		t.Fatal(err)
	}
	for _, fixture := range fixtures {
		t.Run(fixture.Name, func(t *testing.T) {
			wire, err := base64.StdEncoding.DecodeString(fixture.Base64)
			if err != nil {
				t.Fatal(err)
			}
			r := wireReader{data: wire}
			tx := r.transaction()
			if r.err != nil {
				t.Fatal(r.err)
			}
			if r.pos != len(wire) || tx.Version != fixture.Version || len(tx.Signatures) != 1 || len(tx.Instructions) == 0 {
				t.Fatalf("unexpected decode: version=%d offset=%d", tx.Version, r.pos)
			}
			if fixture.Version == 0 && len(tx.AddressTableLookups) == 0 {
				t.Fatal("missing v0 lookups")
			}
		})
	}
}

func TestEntries(t *testing.T) {
	batch := batchFixture()
	entries, err := decodeEntries(batch)
	if err != nil {
		t.Fatal(err)
	}
	if len(entries) != 2 || len(entries[0].Transactions) != 2 || len(entries[1].Transactions) != 0 {
		t.Fatal("wrong entry or transaction counts")
	}
	legacy, v0 := entries[0].Transactions[0], entries[0].Transactions[1]
	if legacy.Version != -1 || v0.Version != 0 || len(legacy.Instructions[0].Data) != 130 || len(v0.AddressTableLookups) != 1 || v0.Instructions[0].Accounts[0] != 2 {
		t.Fatal("incorrect transaction decode")
	}
	if !bytes.Equal(v0.Raw, transactionFixture(true)) {
		t.Fatal("raw transaction differs")
	}
	for i := 0; i < len(batch); i++ {
		if _, err := decodeEntries(batch[:i]); err == nil {
			t.Fatalf("accepted truncated batch at %d", i)
		}
	}
	if _, err := decodeEntries(append(bytes.Clone(batch), 0, 0)); err != nil {
		t.Fatal("zero padding:", err)
	}
	if _, err := decodeEntries(append(bytes.Clone(batch), 1)); err == nil {
		t.Fatal("accepted garbage suffix")
	}
	corrupt := bytes.Clone(batch)
	binary.LittleEndian.PutUint64(corrupt, ^uint64(0))
	if _, err := decodeEntries(corrupt); err == nil {
		t.Fatal("accepted unbounded entry count")
	}
	corrupt = bytes.Clone(batch)
	corrupt[56+65] = 0x81
	if _, err := decodeEntries(corrupt); err == nil {
		t.Fatal("accepted unsupported message version")
	}
}

func TestShortvec(t *testing.T) {
	for _, tc := range []struct {
		wire []byte
		want int
	}{
		{[]byte{0}, 0}, {[]byte{127}, 127}, {[]byte{0x80, 1}, 128}, {[]byte{0xff, 0xff, 3}, 65535},
	} {
		r := wireReader{data: tc.wire}
		if got := r.shortvec(); got != tc.want || r.err != nil {
			t.Fatalf("%x: %d %v", tc.wire, got, r.err)
		}
	}
	for _, wire := range [][]byte{{}, {0x80}, {0x80, 0}, {0x81, 0}, {0xff, 0xff, 4}, {0x80, 0x80, 0x80}} {
		r := wireReader{data: wire}
		r.shortvec()
		if r.err == nil {
			t.Fatalf("accepted %x", wire)
		}
	}
}

func TestShredVariants(t *testing.T) {
	for _, variant := range []byte{0xa5, 0x86, 0x96, 0xb6} {
		s, err := parseShred(dataFixture(100, 0, 0xc0, variant, batchFixture()))
		if err != nil || !s.data {
			t.Fatalf("variant %x: %v", variant, err)
		}
	}
	for _, variant := range []byte{0x5a, 0x46, 0x66, 0x76} {
		b := make([]byte, 1228)
		b[64] = variant
		binary.LittleEndian.PutUint16(b[83:], 32)
		binary.LittleEndian.PutUint16(b[85:], 32)
		s, err := parseShred(b)
		if err != nil || s.data {
			t.Fatalf("variant %x: %v", variant, err)
		}
		d := testDecoder()
		d.process(b, time.Now())
		if d.stats.Coding != 1 || d.stats.Transactions != 0 {
			t.Fatal("coding shred treated as entries")
		}
	}
	for _, mutate := range []func([]byte) []byte{
		func(b []byte) []byte { return b[:87] },
		func(b []byte) []byte { b[64] = 0xff; return b },
		func(b []byte) []byte { b[85] = 0x80; return b },
		func(b []byte) []byte { binary.LittleEndian.PutUint16(b[86:], 1203); return b },
		func(b []byte) []byte { binary.LittleEndian.PutUint32(b[73:], maxShredsPerSlot); return b },
	} {
		if _, err := parseShred(mutate(dataFixture(100, 0, 0xc0, 0x96, batchFixture()))); err == nil {
			t.Fatal("accepted malformed shred")
		}
	}
}

func TestReassemblyAndDeduplication(t *testing.T) {
	for _, order := range [][]int{{0, 1, 0, 1}, {1, 1, 0, 0}} {
		d := testDecoder()
		now := time.Now()
		packets := splitFixture(100)
		for _, index := range order {
			d.process(packets[index], now)
		}
		if d.stats.Blocks != 1 || d.stats.Transactions != 2 || d.stats.Entries != 2 || d.stats.Duplicates != 2 || d.stats.EntryErrors != 0 {
			t.Fatalf("%+v", d.stats)
		}
		// Simulate the next read overwriting the shared UDP buffer.
		packets[0][88] ^= 0xff
		if d.slots[slotKey{100, 1}].shreds[0].content[88] != 2 {
			t.Fatal("retained UDP buffer alias")
		}
	}
}

func TestMultipleBatches(t *testing.T) {
	d := testDecoder()
	now := time.Now()
	d.process(dataFixture(100, 0, 0x40, 0x96, batchFixture()), now)
	if d.stats.Transactions != 2 || d.stats.Blocks != 0 {
		t.Fatalf("%+v", d.stats)
	}
	d.process(dataFixture(100, 1, 0xc0, 0x96, batchFixture()), now)
	if d.stats.Transactions != 4 || d.stats.Blocks != 1 || d.stats.Batches != 2 {
		t.Fatalf("%+v", d.stats)
	}
}

func TestMissingCorruptAndConflictingData(t *testing.T) {
	now := time.Now()
	packets := splitFixture(100)
	d := testDecoder()
	d.process(packets[1], now)
	if d.stats.Blocks != 0 || d.stats.Transactions != 0 {
		t.Fatal("decoded incomplete slot")
	}
	d.expire(now.Add(11 * time.Second))
	if d.stats.Incomplete != 1 || d.buffered != 0 {
		t.Fatalf("%+v", d.stats)
	}
	d.process(packets[0], now.Add(12*time.Second))
	if d.stats.Late != 1 {
		t.Fatal("did not suppress late slot")
	}
	d = testDecoder()
	d.process(dataFixture(100, 0, 0xc0, 0x96, []byte{1, 2, 3}), now)
	if d.stats.EntryErrors != 1 || d.stats.Blocks != 0 || d.stats.Transactions != 0 {
		t.Fatalf("%+v", d.stats)
	}
	d = testDecoder()
	d.process(packets[0], now)
	conflict := bytes.Clone(packets[0])
	conflict[90] ^= 1
	d.process(conflict, now)
	d.process(packets[1], now)
	if d.stats.Conflicts != 1 || d.stats.Blocks != 0 {
		t.Fatalf("%+v", d.stats)
	}
}

func TestBounds(t *testing.T) {
	now := time.Now()
	d := newDecoder(time.Minute, 2, 600)
	for i := uint64(0); i < 100; i++ {
		d.process(splitFixture(100 + i)[0], now.Add(time.Duration(i)*time.Millisecond))
		if len(d.slots) > 2 || d.buffered > 600 || len(d.retired) > 8 {
			t.Fatal("retention limit exceeded")
		}
	}
	if d.stats.Incomplete != 98 {
		t.Fatalf("%+v", d.stats)
	}
}

// Exercise the real socket, idle one-second reports and graceful shutdown.
func TestUDPListener(t *testing.T) {
	conn, err := net.ListenUDP("udp4", &net.UDPAddr{IP: net.IPv4(127, 0, 0, 1)})
	if err != nil {
		t.Fatal(err)
	}
	defer conn.Close()
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	var output bytes.Buffer
	d := testDecoder()
	done := make(chan error, 1)
	go func() { done <- serve(ctx, conn, d, &output) }()
	sender, err := net.DialUDP("udp4", nil, conn.LocalAddr().(*net.UDPAddr))
	if err != nil {
		t.Fatal(err)
	}
	defer sender.Close()
	packets := splitFixture(100)
	for _, packet := range [][]byte{packets[1], packets[0], packets[0], {1, 2, 3}} {
		if _, err := sender.Write(packet); err != nil {
			t.Fatal(err)
		}
	}
	time.Sleep(2200 * time.Millisecond)
	cancel()
	select {
	case err := <-done:
		if err != nil {
			t.Fatal(err)
		}
	case <-time.After(2 * time.Second):
		t.Fatal("listener did not stop")
	}
	if d.stats.Blocks != 1 || d.stats.Transactions != 2 || d.stats.ShredErrors != 1 || d.stats.Duplicates != 1 {
		t.Fatalf("%+v", d.stats)
	}
	lines := strings.Split(strings.TrimSpace(output.String()), "\n")
	if len(lines) < 3 || !strings.Contains(lines[0], "blocks=1 tx=2") || !strings.Contains(lines[1], "blocks=0 tx=0") || !strings.Contains(lines[len(lines)-1], "final=true") {
		t.Fatalf("unexpected output: %s", output.String())
	}
}

func FuzzDecodeEntries(f *testing.F) {
	f.Add(batchFixture())
	f.Add([]byte{})
	f.Fuzz(func(t *testing.T, data []byte) { _, _ = decodeEntries(data) })
}

func FuzzParseShred(f *testing.F) {
	f.Add(dataFixture(100, 0, 0xc0, 0x96, batchFixture()))
	f.Add([]byte{})
	f.Fuzz(func(t *testing.T, data []byte) { _, _ = parseShred(data) })
}
