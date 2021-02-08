package main

import (
	"fmt"
	"github.com/wrporter/games/server/internal/env"
	"github.com/wrporter/games/server/internal/server"
	"github.com/wrporter/games/server/internal/server/auth"
	"log"
	"net/http"
	"time"
)

type logWriter struct{}

func (writer logWriter) Write(bytes []byte) (int, error) {
	return fmt.Printf("%s %s", time.Now().UTC().Format("2006-01-02T15:04:05.999Z"), string(bytes))
}

func main() {
	log.SetFlags(0)
	log.SetOutput(new(logWriter))

	s := server.New()
	auth.RegisterRoutes(s)

	log.Printf("listening on http://%s", env.AppDomain())
	log.Fatal(http.ListenAndServe(env.AppDomain(), s.SessionManager.Manager.LoadAndSave(s)))
}
