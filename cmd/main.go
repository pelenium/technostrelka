package main

import (
	"database/sql"

	"technostrelka/internal/handlers"

	_ "github.com/mattn/go-sqlite3"

	"github.com/gin-gonic/gin"
)

func main() {
	db, err := sql.Open("sqlite3", "./internal/db/users.sqlite")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	sts := `DROP TABLE userinfo;
			CREATE TABLE IF NOT EXISTS userinfo (
				username TEXT PRIMARY KEY,  
				password TEXT NOT NULL
			);`
	_, err = db.Exec(sts)

	if err != nil {
		panic(err)
	}

	r := gin.Default()

	r.LoadHTMLGlob("./internal/static/html/*.html")

	r.GET("/", handlers.Index)

	r.GET("/login", handlers.LoginGET)
	r.POST("/login", handlers.LoginUser(db))

	r.GET("/profile", handlers.Profile)

	r.GET("/signup", handlers.SignupGET)
	r.POST("/signup", handlers.RegisterUser(db))

	r.Run(":8080")
}
