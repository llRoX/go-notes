package storage

import (
	"fmt"
	"io/fs"
	"log"
	"os"
)

type Storage interface {
	ListFiles() []string
	FileExists(string) bool
	ReadFile(string) ([]byte, error)
}

type LocalStorage struct {
	filesystem fs.FS
}

func (storage *LocalStorage) ListFiles() []string {

	var files []string

	fs.WalkDir(storage.filesystem, ".", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			log.Fatal(err)
		}
		if d.IsDir() {
			return nil
		}
		fmt.Println(path)
		files = append(files, path)
		return nil
	})

	return files
}

func (storage *LocalStorage) FileExists(path string) bool {
	return true
}

func (storage *LocalStorage) ReadFile(path string) ([]byte, error) {
	return fs.ReadFile(storage.filesystem, path)
}

func NewStorage(path string) (*LocalStorage, error) {

	filesystem := os.DirFS(path)
	return &LocalStorage{
		filesystem: filesystem,
	}, nil
}
