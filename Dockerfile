# syntax=docker/dockerfile:1

ARG GO_VERSION=1.25.5

FROM golang:${GO_VERSION}-alpine AS build

WORKDIR /src

# The app's go.mod uses a local ../basic-web replacement.
# Provide that sibling path through a Docker named build context:
# docker build --build-context basic-web=../basic-web .
COPY --from=basic-web . /src/basic-web
COPY . /src/anthonyposchen.com

WORKDIR /src/anthonyposchen.com

ENV CGO_ENABLED=0
ENV GOOS=linux

RUN go build -trimpath -ldflags="-s -w" -o /out/anthonyposchen-com .

FROM scratch

COPY --from=build /out/anthonyposchen-com /anthonyposchen-com

ENV PORT=42069
EXPOSE 42069

USER 1000:1000

ENTRYPOINT ["/anthonyposchen-com"]
