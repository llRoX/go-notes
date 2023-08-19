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

type PatchNoteMessage struct {
	Markdown string `json:"markdown"`
}

func setupRoutes() {

	path := "./data"
	s, _ := storage.NewStorage(path)

	http.HandleFunc("/files", func(w http.ResponseWriter, r *http.Request) {

		if r.Method == http.MethodGet {
			files := s.ListFiles()
			w.Header().Set("Access-Control-Allow-Origin", "*")
			enc := json.NewEncoder(w)
			enc.Encode(files)
			return
		}

	})

	http.HandleFunc("/files/", func(w http.ResponseWriter, r *http.Request) {
		urlPath := r.URL.Path
		if len(urlPath) <= 7 {
			http.NotFound(w, r)
			return
		}

		filePath, _ := strings.CutPrefix(urlPath, "/files/")
		fmt.Println(r.Method)
		if r.Method == http.MethodGet {
			fileData, err := s.ReadFile(filePath)
			if err != nil {
				http.NotFound(w, r)
				return
			}
			w.Header().Set("Access-Control-Allow-Origin", "*")
			enc := json.NewEncoder(w)
			enc.Encode(string(fileData))
		} else if r.Method == http.MethodPatch {
			var message PatchNoteMessage
			err := json.NewDecoder(r.Body).Decode(&message)
			if err != nil {
				fmt.Println(err)
				return
			}
			fmt.Println("patch")

			s.PatchFile(filePath, message.Markdown)
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.WriteHeader(http.StatusOK)

		} else {
			fmt.Println("other")
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "*")
			w.Header().Set("Access-Control-Allow-Headers", "*")
			// w.WriteHeader(http.StatusOK)
		}

	})
}

func main() {
	fmt.Println("Notes App v0.01")
	setupRoutes()
	http.ListenAndServe("localhost:8080", nil)

}
