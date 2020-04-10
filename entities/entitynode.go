package main

import (
	"crypto/tls"
	"fmt"
	"log"
	"net/http"
	"io/ioutil"
	"encoding/binary"
)

type LedgerLine struct {
	len     int
	rawdata []byte
}

type Block struct {
	blocksize   uint32
	certlen     uint16
	Cpub        tls.Certificate
	hashlen     uint16
	hash        []byte
	remove      uint16
	timestamp   uint16
	blocknum    uint16 
	numlines    uint16 
	ledgerLines  []LedgerLine

}

type BlockChain struct {
	blocklen uint32
	blocks   []Block
}

func (r LedgerLine  ) Dump() []byte {
	return r.rawdata
}

func (b Block) Dump() []byte{
	rawcert, _ := ioutil.ReadFile("pubkey.crt")
	blocksize  := make([]byte, 4)
	certlen  := make([]byte, 4)
	remove   := make([]byte, 1)
	hashlen   := make([]byte, 2)
	timestamp := make([]byte, 2)
	blocknum  := make([]byte, 2)
	numlines  := make([]byte, 2)
    binary.LittleEndian.PutUint32(blocksize, b.blocksize)
    binary.LittleEndian.PutUint16(certlen,b.certlen)
    binary.LittleEndian.PutUint16(hashlen, b.hashlen)
    binary.LittleEndian.PutUint16(timestamp, b.timestamp)
    binary.LittleEndian.PutUint16(blocknum, b.blocknum)
    binary.LittleEndian.PutUint16(numlines, b.numlines)
    binary.LittleEndian.PutUint16(remove, b.remove)
	rawdata := make([]byte,0)
	rawdata = append(rawdata,blocksize ...)
	rawdata = append(rawdata,certlen ...)
	rawdata = append(rawdata,rawcert ...)
	rawdata = append(rawdata,hashlen ...)
	rawdata = append(rawdata,b.hash ...)
	rawdata = append(rawdata,remove ...)
	rawdata = append(rawdata,timestamp ...)
	rawdata = append(rawdata,blocknum ...)
	rawdata = append(rawdata,numlines ...)
	for _,ledge := range b.ledgerLines {
		rawdata = append(rawdata,ledge.Dump() ...)
	}
	return rawdata
}
func (bc BlockChain) Dump() []byte{
	blocklen   := make([]byte, 4)
	binary.LittleEndian.PutUint32(blocklen, bc.blocklen)
	rawdata := make([]byte,0)
	rawdata = append(rawdata,blocklen ...)
	for _,block := range bc.blocks{
		rawdata = append(rawdata,block.Dump() ...)
	}
	return rawdata
}

func LoadBlockChain(raw []byte) BlockChain {
	var bc BlockChain
	bc.blocklen = binary.LittleEndian.Uint32(raw[0:3])
	bc.blocks   = make([]Block,0)
	idx := 3
	for ; idx < int(bc.blocklen); {
		blocksize := int(binary.LittleEndian.Uint32(raw[idx: idx + 3])	)
		bc.blocks = append(bc.blocks,LoadBlock(raw[idx: idx + blocksize]))
		idx = idx + blocksize
	}
	return bc
}
func LoadBlock(raw []byte) Block {
	var blk Block
	return blk
}
// GetHandler handles the index route
func getcert(w http.ResponseWriter, r *http.Request) {
	rawcert, _ := ioutil.ReadFile("pubkey.crt")
	w.Write(rawcert)
}

func newblock(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		_, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Error reading request body",
				http.StatusInternalServerError)
		}

		fmt.Fprint(w, "POST done")
	} else {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}
}
func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/",getcert)
	mux.HandleFunc("/newblock",newblock)

	log.Fatal(http.ListenAndServe(":1917",mux))
}