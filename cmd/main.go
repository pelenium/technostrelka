package main

import (
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
	"technostrelka/internal/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	db, err := sql.Open("sqlite3", "./internal/db/users.db")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	r := gin.Default()

	r.LoadHTMLGlob("./internal/static/html/*.html")

	r.GET("/", handlers.Index)

	r.GET("/login", handlers.Login)
	r.GET("/signup", handlers.Signup)
	// r.GET("/profile", handlers.Login)

	r.Run(":8080")
}
