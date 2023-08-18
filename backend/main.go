package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/llRoX/go-notes/pkg/storage"
)

func serve(w http.ResponseWriter, r *http.Request) {

}

type Test struct {
	Value string
}

func test(store storage.Storage) {
	store.FileExists("d")
}

func setupRoutes() {

	path := "./data"
	s, _ := storage.NewStorage(path)

	http.HandleFunc("/files", func(w http.ResponseWriter, r *http.Request) {
		files := s.ListFiles()
		w.Header().Set("Access-Control-Allow-Origin", "*")
		enc := json.NewEncoder(w)
		enc.Encode(files)
	})

	http.HandleFunc("/files/", func(w http.ResponseWriter, r *http.Request) {
		urlPath := r.URL.Path
		if len(urlPath) <= 7 {
			http.NotFound(w, r)
			return
		}

		filePath, _ := strings.CutPrefix(urlPath, "/files/")
		fileData, err := s.ReadFile(filePath)
		if err != nil {
			http.NotFound(w, r)
			return
		}
		w.Header().Set("Access-Control-Allow-Origin", "*")
		enc := json.NewEncoder(w)
		enc.Encode(string(fileData))

	})
}

func main() {
	fmt.Println("Notes App v0.01")
	setupRoutes()
	http.ListenAndServe("localhost:8080", nil)

}
