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
	PatchFile(string, string) error
}

type LocalStorage struct {
	filesystem fs.FS
	path       string
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

func (storage *LocalStorage) PatchFile(path string, markdown string) error {
	file, err := os.OpenFile(storage.path+"/"+path, os.O_RDWR, 0755)

	if err != nil {
		return err
	}
	file.Truncate(int64(len(markdown)))
	file.WriteString(markdown)

	return nil
}

func (storage *LocalStorage) TestName(path string) (string, error) {

	file, err := os.OpenFile(storage.path+"/"+path, os.O_RDWR, 0755)
	file.Truncate(0)
	file.WriteString("# Edit File")

	if err != nil {
		return "", err
	}

	info, err := file.Stat()

	if err != nil {
		return "", err
	}

	return info.Name(), nil
}

func NewStorage(path string) (*LocalStorage, error) {

	filesystem := os.DirFS(path)
	return &LocalStorage{
		filesystem: filesystem,
		path:       path,
	}, nil
}
