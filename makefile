install_air:
	go install github.com/air-verse/air@latest

run:
	air --build.cmd "mkdir -p ./tmp/go-build && env GOCACHE=$(CURDIR)/tmp/go-build go build -o ./tmp/anthonyposchen-com ." --build.bin "env DEV=1 ./tmp/anthonyposchen-com" --build.include_ext "go,html,css,js" --build.stop_on_error "true"
