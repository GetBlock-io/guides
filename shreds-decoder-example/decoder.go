package main

import (
	"bytes"
	"fmt"
	"time"
)

// Counters are cumulative. Only the receive goroutine owns decoder state.
type counters struct {
	Packets, Bytes, Shreds, Data, Coding, UniqueData, Duplicates uint64
	Batches, Entries, Transactions, Blocks                       uint64
	ShredErrors, EntryErrors, Conflicts, Incomplete, Late        uint64
}

type slotKey struct {
	slot    uint64
	version uint16
}
type slotState struct {
	shreds           map[uint32]shred
	created          time.Time
	next             uint32
	scan             uint32
	pendingBytes     int
	last             *uint32
	bytes            int
	failed, complete bool
}
type retiredSlot struct {
	key   slotKey
	until time.Time
}

type decoder struct {
	stats                        counters
	slots                        map[slotKey]*slotState
	retired                      []retiredSlot
	ttl                          time.Duration
	maxSlots, maxBytes, buffered int
	lastError                    string
}

func newDecoder(ttl time.Duration, maxSlots, maxBytes int) *decoder {
	return &decoder{slots: make(map[slotKey]*slotState), ttl: ttl, maxSlots: maxSlots, maxBytes: maxBytes}
}

func (d *decoder) evict(key slotKey, now time.Time) {
	s := d.slots[key]
	if !s.complete {
		d.stats.Incomplete++
	}
	d.buffered -= s.bytes
	delete(d.slots, key)
	// A bounded tombstone cache prevents late packets from decoding an evicted
	// slot again. Deduplication is deliberately limited to this retention window.
	if len(d.retired) >= 4*d.maxSlots {
		d.retired = d.retired[1:]
	}
	d.retired = append(d.retired, retiredSlot{key, now.Add(d.ttl)})
}

func (d *decoder) oldest() slotKey {
	var oldest slotKey
	var when time.Time
	for k, s := range d.slots {
		if when.IsZero() || s.created.Before(when) {
			oldest, when = k, s.created
		}
	}
	return oldest
}

func (d *decoder) expire(now time.Time) {
	for k, s := range d.slots {
		if now.Sub(s.created) >= d.ttl {
			d.evict(k, now)
		}
	}
	i := 0
	for i < len(d.retired) && !now.Before(d.retired[i].until) {
		i++
	}
	d.retired = d.retired[i:]
}

func (d *decoder) process(packet []byte, now time.Time) {
	d.stats.Packets++
	d.stats.Bytes += uint64(len(packet))
	s, err := parseShred(packet)
	if err != nil {
		d.stats.ShredErrors++
		d.lastError = err.Error()
		return
	}
	d.stats.Shreds++
	if !s.data {
		d.stats.Coding++
		return
	}
	d.stats.Data++
	key := slotKey{s.slot, s.version}
	for _, retired := range d.retired {
		if key == retired.key && now.Before(retired.until) {
			d.stats.Late++
			return
		}
	}
	state := d.slots[key]
	if state != nil {
		if old, exists := state.shreds[s.index]; exists {
			if bytes.Equal(old.content, s.content) {
				d.stats.Duplicates++
			} else {
				d.conflict(state, s.slot)
			}
			return
		}
		if state.last != nil && (s.index > *state.last || (s.flags&0xc0 == 0xc0 && s.index != *state.last)) {
			d.conflict(state, s.slot)
			return
		}
	}
	for len(d.slots) > 0 && ((state == nil && len(d.slots) >= d.maxSlots) || d.buffered+len(s.content) > d.maxBytes) {
		old := d.oldest()
		d.evict(old, now)
		if old == key {
			d.stats.Late++
			return
		}
	}
	if state == nil {
		state = &slotState{shreds: make(map[uint32]shred), created: now}
		d.slots[key] = state
	}
	if s.flags&0xc0 == 0xc0 {
		for index := range state.shreds {
			if index > s.index {
				d.conflict(state, s.slot)
				return
			}
		}
		last := s.index
		state.last = &last
	}
	s.content = bytes.Clone(s.content) // The UDP read buffer is reused.
	state.shreds[s.index] = s
	state.bytes += len(s.content)
	d.buffered += len(s.content)
	d.stats.UniqueData++
	d.decodeReady(state, s.slot)
}

func (d *decoder) conflict(s *slotState, slot uint64) {
	d.stats.Conflicts++
	s.failed = true
	d.lastError = fmt.Sprintf("conflicting data for slot %d; slot excluded from future completion", slot)
}

func (d *decoder) decodeReady(state *slotState, slot uint64) {
	if state.failed || state.complete {
		return
	}
	for {
		end := state.scan
		for {
			s, ok := state.shreds[end]
			if !ok {
				return
			}
			state.pendingBytes += len(s.content) - 88
			state.scan = end + 1
			if s.flags&0x40 != 0 {
				break
			}
			end++
		}
		batch := make([]byte, 0, state.pendingBytes)
		for i := state.next; i <= end; i++ {
			batch = append(batch, state.shreds[i].content[88:]...)
		}
		entries, err := decodeEntries(batch)
		if err != nil {
			d.stats.EntryErrors++
			d.lastError = fmt.Sprintf("slot %d shreds %d..%d: %v", slot, state.next, end, err)
			state.failed = true
			return
		}
		d.stats.Batches++
		d.stats.Entries += uint64(len(entries))
		for _, entry := range entries {
			d.stats.Transactions += uint64(len(entry.Transactions))
		}
		state.next = end + 1
		state.pendingBytes = 0
		if state.last != nil && end == *state.last {
			state.complete = true
			d.stats.Blocks++
			return
		}
	}
}
