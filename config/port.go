package config

import "os"

func Port() string {
	port := os.Getenv("PORT")
	if port == "" {
		return "42069"
	}
	return port
}
