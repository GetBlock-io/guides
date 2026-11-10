package main

import (
	"encoding/binary"
	"fmt"
)

const maxShredsPerSlot = 32768

type shred struct {
	slot    uint64
	index   uint32
	version uint16
	data    bool
	flags   byte
	// Only the header and declared ledger data, excluding padding and proofs.
	content []byte
}

func parseShred(packet []byte) (shred, error) {
	var s shred
	if len(packet) < 83 || len(packet) > 1228 {
		return s, fmt.Errorf("invalid shred length: %d", len(packet))
	}
	v := packet[64]
	legacy := v == 0xa5 || v == 0x5a
	chained, resigned := false, false
	if legacy {
		s.data = v == 0xa5
	} else {
		switch v & 0xf0 {
		case 0x80:
			s.data = true
		case 0x90:
			s.data, chained = true, true
		case 0xb0:
			s.data, chained, resigned = true, true, true
		case 0x40:
		case 0x60:
			chained = true
		case 0x70:
			chained, resigned = true, true
		default:
			return s, fmt.Errorf("unsupported shred variant: 0x%02x", v)
		}
	}
	s.slot = binary.LittleEndian.Uint64(packet[65:73])
	s.index = binary.LittleEndian.Uint32(packet[73:77])
	s.version = binary.LittleEndian.Uint16(packet[77:79])
	fec := binary.LittleEndian.Uint32(packet[79:83])
	if s.index >= maxShredsPerSlot || fec >= maxShredsPerSlot {
		return s, fmt.Errorf("shred index out of range")
	}
	if !s.data {
		if len(packet) != 1228 {
			return s, fmt.Errorf("invalid coding shred length: %d", len(packet))
		}
		n := binary.LittleEndian.Uint16(packet[83:85])
		k := binary.LittleEndian.Uint16(packet[85:87])
		position := binary.LittleEndian.Uint16(packet[87:89])
		if n == 0 || k == 0 || uint32(n)+uint32(k) > 256 || position >= k || s.index < uint32(position) || fec+uint32(n) > maxShredsPerSlot {
			return s, fmt.Errorf("invalid coding shred header")
		}
		return s, nil
	}
	if len(packet) < 88 {
		return s, fmt.Errorf("truncated data header")
	}
	if fec > s.index {
		return s, fmt.Errorf("FEC index exceeds data index")
	}
	parent := binary.LittleEndian.Uint16(packet[83:85])
	if uint64(parent) > s.slot || (s.slot > 0 && parent == 0) {
		return s, fmt.Errorf("invalid parent offset")
	}
	s.flags = packet[85]
	if s.flags&0xc0 == 0x80 {
		return s, fmt.Errorf("last-in-slot flag without data-complete flag")
	}
	end := int(binary.LittleEndian.Uint16(packet[86:88]))
	// Legacy data reserves space for the coding header. Merkle trailers are
	// excluded from ledger data even when the UDP datagram is padded to 1228.
	limit := 1139
	if !legacy {
		if len(packet) < 1203 {
			return s, fmt.Errorf("truncated Merkle data shred")
		}
		limit = 1203 - int(v&0x0f)*20
		if chained {
			limit -= 32
		}
		if resigned {
			limit -= 64
		}
	}
	if end < 88 || end > limit || end > len(packet) {
		return s, fmt.Errorf("invalid data size: %d", end)
	}
	s.content = packet[:end]
	return s, nil
}
