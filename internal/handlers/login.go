package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func LoginGET(c *gin.Context) {
	c.HTML(http.StatusOK, "login.html", gin.H{})
}
