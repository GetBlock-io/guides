# Solana UDP shred decoder (Go)

A standalone example that receives raw Solana shreds over UDP, reassembles
entry batches, decodes legacy and v0 transactions, and prints statistics once
per second. Uses only the Go standard library. No validator, RPC endpoint,
provider credentials, or Docker image is needed by the decoder itself.

## Run

Requires Go 1.24 or newer and a source forwarding **one raw shred per UDP
datagram** to your machine. The listener does not subscribe to a provider or
discover peers. Configure delivery using your provider's instructions.

```sh
cd shreds-decoder-example
go run . -listen 0.0.0.0:1820
```

For a forwarder on the same machine:

```sh
go run . -listen 127.0.0.1:1820
```

To build a standalone binary:

```sh
go build -o bin/shreds-decoder .
./bin/shreds-decoder -listen 0.0.0.0:1820
```

Allow inbound UDP on the selected port and configure the sender with the
receiver's reachable address. `0.0.0.0` is a bind address, not a destination.
Send only one network/feed to an instance. Provider-specific envelopes, gRPC
messages, repair nonces, and concatenated datagrams are not supported.

Press Ctrl+C (or send SIGTERM) for a final statistics line and clean shutdown.
Startup and socket errors go to stderr; statistics go to stdout. Idle listeners
still print a line every second.

## Output

Every line uses `key=value` fields. Most counters describe the interval since
the previous line; `total_*` values are cumulative since startup. `interval`
reports the actual elapsed time, so divide a count by that value for a rate.

| Field | Meaning |
| --- | --- |
| `blocks` | Slots whose data shreds from index 0 through `LAST_SHRED_IN_SLOT` were received and every entry batch decoded successfully |
| `tx`, `entries`, `batches` | Decoded transactions, PoH entries (including ticks), and complete entry batches; transactions are counted before the whole slot completes |
| `shreds` | Datagrams with a structurally valid shred header, including coding packets and repeated data packets |
| `data`, `coding` | Parsed data and coding shred packets; coding payloads are not decoded |
| `unique_data`, `duplicates` | Newly retained data shreds and repeats with the same slot/version/index and header/payload |
| `packets`, `bytes` | All UDP datagrams and bytes received by the application, including rejected packets |
| `shred_errors` | Invalid packet sizes, unknown variants, or invalid shred headers |
| `entry_errors` | Complete batches rejected by the entry/transaction decoder |
| `conflicts` | Different data for the same shred index, or incompatible slot-end markers |
| `incomplete_evicted` | Unfinished or failed slots removed because of age or retention limits |
| `late` | Data packets ignored for recently evicted slots |
| `buffered_slots`, `buffered_bytes` | Current retention state; completed slots remain cached for deduplication |
| `total_blocks`, `total_tx`, `total_shreds` | Cumulative corresponding counters |
| `total_errors` | Cumulative shred errors + entry errors + conflicts; incomplete evictions are reported separately |
| `last_error` | Most recent decode/conflict error; remains visible until replaced |
| `final` | `true` on the last report during graceful shutdown |

`blocks` means **fully decoded slot data**, not a confirmed or finalized Solana
block. Packet parsing does not verify signatures, Merkle proofs, PoH, or
consensus. Previously emitted counters are not rolled back if conflicting data
arrives later. Transaction counts are occurrences in decoded batches, not
globally deduplicated transaction signatures or successful execution counts.

## Options

```text
-listen          0.0.0.0:1820  UDP bind address
-read-buffer     8388608       Requested OS receive buffer, bytes
-slot-ttl        10s           Retain a slot for this long after its first data shred
-max-slots       64            Maximum retained slots
-max-buffer-mib  64            Maximum retained shred header/payload bytes, MiB
```

The OS may cap the receive buffer even when setting it succeeds. Socket overflow
and loss before the application are not measured by this portable example.
`-max-buffer-mib` is not a process memory limit: maps, batch assembly, decoded
transactions, and the Go runtime also use memory. The oldest retained slot is
evicted when a limit is reached. A bounded cache of up to `4 * max-slots`
recently evicted slots suppresses late packets for another `slot-ttl`; replay
beyond this window can be counted again.

## How it works

1. Parse the common/data/coding headers. Accept legacy (`0xa5` data, `0x5a`
   coding) and Merkle variants, including chained and re-signed variants.
2. Retain data shreds by slot, shred version, and index. Copy payloads before
   the UDP buffer is reused. Accept out-of-order packets and ignore duplicates.
3. Starting at index 0, concatenate consecutive data payloads through each
   `DATA_COMPLETE_SHRED` boundary. Respect the declared data size; Merkle
   trailers are never interpreted as entry data.
4. Decode the complete bincode `Vec<Entry>`. Transaction vectors use Solana's
   canonical shortvec encoding. Decode signatures, message headers, static
   account keys, blockhashes, instructions, and v0 address-table lookups.
5. Count the slot only when all batches through its last data shred decode.

`entries.go` exposes the decoded `Entry` and `Transaction` structures inside
the example. To inspect transactions, add your handler where `decodeReady`
iterates over the decoded entries. Byte slices reference the batch buffer;
copy them before retaining or asynchronously processing them.

### Deliberate limitations

- **No Reed–Solomon/FEC recovery or repair requests.** Coding shreds are
  recognized and counted. A missing data shred stalls subsequent decoding in
  that slot; other slots continue. Joining mid-slot can leave the first slot
  incomplete. Increase retention only if packets arrive late, not to recover
  permanently lost data.
- A complete batch with a decode error stops further decoding for that slot.
  Repeated copies do not count the same error again.
- Legacy and v0 transaction messages in `Vec<Entry>` are supported. New message
  versions or other ledger payload formats require an explicit parser update.
- Address-table keys/indexes are decoded, but loaded account addresses are not
  resolved. Execution status, logs, inner instructions, and balance changes are
  not present in raw shreds.
- This is a single-threaded educational receiver, not a production indexer or
  authenticated block verifier. Benchmark with your own feed before relying
  on its throughput.

## Validation

```sh
go test -race -cover ./...
go vet ./...
go test -run '^$' -fuzz '^FuzzDecodeEntries$' -fuzztime=10s
go test -run '^$' -fuzz '^FuzzParseShred$' -fuzztime=10s
```

Tests cover legacy/v0 decoding, multi-byte shortvec, truncated input, supported
shred variants, cross-shred reassembly, out-of-order delivery, duplicates,
multiple batches, missing packets, conflicts, bounded retention, and a real
loopback UDP listener with periodic/idle reports and graceful shutdown.
The suite also decodes public legacy and v0 transaction wire fixtures from
[solana-go v1.14.0](https://github.com/gagliardetto/solana-go/blob/v1.14.0/transaction_test.go),
with source URLs retained in `testdata/transactions.json`. These tests do not
establish live-feed compatibility or cryptographic validity.

## Protocol references

- [Solana shred wire format](https://github.com/solana-foundation/specs/blob/main/p2p/shred.md)
- [Agave shred variants and flags](https://github.com/anza-xyz/agave/blob/v3.0.0/ledger/src/shred.rs)
- [Agave Merkle payload layout](https://github.com/anza-xyz/agave/blob/v3.0.0/ledger/src/shred/merkle.rs)
- [Solana shortvec encoding](https://github.com/anza-xyz/solana-sdk/blob/master/short-vec/src/lib.rs)

These references describe the wire layouts implemented here; they are not a
claim of compatibility with every future validator release.
