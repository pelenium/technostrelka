package main

import (
	"technostrelka/internal/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.LoadHTMLGlob("./internal/static/html/*.html")

	r.GET("/", handlers.Index)

	r.GET("/login", handlers.Login)
	r.GET("/signup", handlers.Login)
	r.GET("/profile", handlers.Login)

	r.Run(":8080")
}
