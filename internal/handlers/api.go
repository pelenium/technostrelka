package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterUser(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		res := map[string]any{}
		data, err := io.ReadAll(c.Request.Body)
		if err != nil {
			c.Error(err)
		}

		err = json.Unmarshal(data, &res)
		if err != nil {
			c.Error(err)
		}

		fmt.Println(res)

		c.JSON(http.StatusOK, gin.H{})
	}
}

func LoginUser(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		res := map[string]any{}
		data, err := io.ReadAll(c.Request.Body)
		if err != nil {
			c.Error(err)
		}

		err = json.Unmarshal(data, &res)
		if err != nil {
			c.Error(err)
		}

		fmt.Println(res)

		c.JSON(http.StatusOK, gin.H{})
	}
}
