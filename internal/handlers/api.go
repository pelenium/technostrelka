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

		if res["action"] == "register" {
			sqlStmt := `SELECT username FROM userinfo WHERE username = ?`
			username := ""
			err := db.QueryRow(sqlStmt, res["username"]).Scan(&username)
			if err != nil {
				if err != sql.ErrNoRows {
					panic(err)
				}
				sqlStmt = `INSERT INTO userinfo(username, password) VALUES(?, ?)`
				_, err = db.Exec(sqlStmt, res["username"], res["password"])
				if err != nil {
					panic(err)
				}
			}
		} else {
			c.JSON(http.StatusTeapot, gin.H{})
		}
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

		if res["action"] == "login" {
			sqlStmt := `SELECT username FROM userinfo WHERE username = ?`
			username := ""
			err := db.QueryRow(sqlStmt, res["username"]).Scan(&username)
			if err != nil {
				if err != sql.ErrNoRows {
					panic(err)
				}
				c.JSON(http.StatusTeapot, gin.H{})
			}

			sqlStmt = `SELECT password FROM userinfo WHERE username = ?`
			password := ""
			err = db.QueryRow(sqlStmt, res["username"]).Scan(&password)
			if err != nil {
				if err != sql.ErrNoRows {
					panic(err)
				}
				c.JSON(http.StatusTeapot, gin.H{})
			}

			if password == res["password"] {
				c.JSON(http.StatusOK, gin.H{})
			} else {
				c.JSON(http.StatusTeapot, gin.H{})
			}
		} else {
			c.JSON(http.StatusTeapot, gin.H{})
		}
	}
}

func UploadImage(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	dst := fmt.Sprintf("internal/users//%s", file.Filename)
	if err := c.SaveUploadedFile(file, dst); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "File uploaded successfully"})
}
