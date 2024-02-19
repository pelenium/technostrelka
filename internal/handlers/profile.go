package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Profile(c *gin.Context) {
	c.HTML(http.StatusOK, "profile.html", gin.H{})
}