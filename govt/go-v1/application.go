package main

import (
    "io/ioutil"
    "log"
    "net/http"
    "os"
)

func main() {
    port := os.Getenv("PORT")
        if port == "" {
            port = "5000"
        }

        f, _ := os.Create("/var/log/golang/golang-server.log")
        defer f.Close()
        log.SetOutput(f)

        const indexPage = "public/index.html"
        http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
            if r.Method == "POST" {
                if buf, err := ioutil.ReadAll(r.Body); err == nil {
                    log.Printf("Received message: %s\n", string(buf))
                }
            } else {
                log.Printf("Serving %s to %s...\n", indexPage, r.RemoteAddr)
                http.ServeFile(w, r, indexPage)
            }
        })

        http.HandleFunc("/newuser", func(w http.ResponseWriter, r *http.Request){
            if r.Method == "POST" {
                    rawcert, _ := ioutil.ReadFile("public/pubkey.crt")
                    rawkey, _ := ioutil.ReadFile("public/privkey.key")
                    rawdata := make([]byte,0)
                    rawdata = append(rawdata, rawcert ...)
                    rawdata = append(rawdata, rawkey ...)
                    w.Write(rawdata)
            } else {
                w.Write([]byte("You need to post"))
            }
        })

        log.Printf("Listening on port %s\n\n", port)
        http.ListenAndServe(":"+port, nil)
}
