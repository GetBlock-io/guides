package main

import (
	"context"
	"errors"
	"flag"
	"fmt"
	"io"
	"log"
	"net"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	listen := flag.String("listen", "0.0.0.0:1820", "UDP bind address (one raw Solana shred per datagram)")
	readBuffer := flag.Int("read-buffer", 8<<20, "requested OS UDP receive buffer in bytes")
	ttl := flag.Duration("slot-ttl", 10*time.Second, "maximum slot retention since its first data shred")
	maxSlots := flag.Int("max-slots", 64, "maximum retained slots")
	maxBytes := flag.Int("max-buffer-mib", 64, "maximum retained shred content in MiB (not total heap)")
	flag.Parse()
	if flag.NArg() != 0 || *readBuffer < 1 || *ttl <= 0 || *maxSlots < 1 || *maxSlots > 4096 || *maxBytes < 1 || *maxBytes > 1024 {
		log.Fatal("invalid configuration: positive limits required; max-slots <= 4096; max-buffer-mib 1..1024; no positional arguments")
	}
	addr, err := net.ResolveUDPAddr("udp", *listen)
	if err != nil {
		log.Fatal(err)
	}
	conn, err := net.ListenUDP("udp", addr)
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()
	if err := conn.SetReadBuffer(*readBuffer); err != nil {
		log.Printf("cannot set requested UDP receive buffer: %v", err)
	}
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()
	log.Printf("listening on %s; raw UDP shreds; statistics every second; Ctrl+C to stop", conn.LocalAddr())
	d := newDecoder(*ttl, *maxSlots, *maxBytes<<20)
	if err := serve(ctx, conn, d, os.Stdout); err != nil {
		log.Print(err)
		os.Exit(1)
	}
}

// serve serializes receipt, decoding and reporting so counters need no locks.
// Closing the socket wakes an idle read immediately when shutdown is requested.
func serve(ctx context.Context, conn *net.UDPConn, d *decoder, output io.Writer) error {
	done := make(chan struct{})
	defer close(done)
	go func() {
		select {
		case <-ctx.Done():
			_ = conn.Close()
		case <-done:
		}
	}()
	buffer := make([]byte, 65535) // Reject oversize datagrams without silent truncation.
	previous := counters{}
	last := time.Now()
	next := last.Add(time.Second)
	if err := conn.SetReadDeadline(next); err != nil {
		return err
	}
	for {
		n, _, err := conn.ReadFromUDP(buffer)
		now := time.Now()
		if ctx.Err() != nil {
			return report(output, d, previous, now, now.Sub(last), true)
		}
		if err != nil {
			var netErr net.Error
			if !errors.As(err, &netErr) || !netErr.Timeout() {
				return fmt.Errorf("UDP read: %w", err)
			}
		} else {
			d.process(buffer[:n], now)
		}
		if !now.Before(next) {
			d.expire(now)
			if err := report(output, d, previous, now, now.Sub(last), false); err != nil {
				return err
			}
			previous, last = d.stats, now
			next = now.Add(time.Second)
			if err := conn.SetReadDeadline(next); err != nil {
				return err
			}
		}
	}
}

func report(w io.Writer, d *decoder, p counters, now time.Time, elapsed time.Duration, final bool) error {
	s := d.stats
	_, err := fmt.Fprintf(w,
		"%s final=%t interval=%.3fs blocks=%d tx=%d entries=%d batches=%d shreds=%d data=%d coding=%d unique_data=%d duplicates=%d packets=%d bytes=%d shred_errors=%d entry_errors=%d conflicts=%d incomplete_evicted=%d late=%d buffered_slots=%d buffered_bytes=%d total_blocks=%d total_tx=%d total_shreds=%d total_errors=%d last_error=%q\n",
		now.UTC().Format(time.RFC3339), final, elapsed.Seconds(),
		s.Blocks-p.Blocks, s.Transactions-p.Transactions, s.Entries-p.Entries, s.Batches-p.Batches,
		s.Shreds-p.Shreds, s.Data-p.Data, s.Coding-p.Coding, s.UniqueData-p.UniqueData, s.Duplicates-p.Duplicates,
		s.Packets-p.Packets, s.Bytes-p.Bytes, s.ShredErrors-p.ShredErrors, s.EntryErrors-p.EntryErrors,
		s.Conflicts-p.Conflicts, s.Incomplete-p.Incomplete, s.Late-p.Late, len(d.slots), d.buffered,
		s.Blocks, s.Transactions, s.Shreds, s.ShredErrors+s.EntryErrors+s.Conflicts, d.lastError)
	return err
}
