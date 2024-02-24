package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func SignupGET(c *gin.Context) {
	c.HTML(http.StatusOK, "signup.html", gin.H{})
}
