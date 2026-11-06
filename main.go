package main

import (
	"embed"
	"io/fs"
	"log/slog"
	"net/http"
	"os"

	"github.com/AnthonyPoschen/anthonyposchen.com/config"
	"github.com/AnthonyPoschen/basic-web/pkg/memfs"
	"github.com/AnthonyPoschen/basic-web/pkg/util"
)

//go:embed web/*
var embeddedFS embed.FS

func init() {
	var webFS fs.FS
	if util.IsDev() {
		webFS = os.DirFS("./web")
	} else {
		tmpfs, err := fs.Sub(embeddedFS, "web")
		if err != nil {
			panic(err)
		}
		webFS = memfs.CreateMinifiedFS(tmpfs)
	}

	util.SetupLogger()
	util.SetupHttpMux(http.DefaultServeMux, webFS)
}

func main() {
	port := config.Port()

	slog.Info("Server listening", "port", port)
	if err := http.ListenAndServe(":"+port, http.DefaultServeMux); err != nil {
		slog.Error("server failed to listen and serve", "error", err.Error())
	}
}
