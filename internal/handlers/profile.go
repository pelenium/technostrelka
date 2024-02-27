package handlers

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Profile(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		sqlStmt := `SELECT username FROM userinfo WHERE username = ?`
		username := ""
		err := db.QueryRow(sqlStmt, c.Params.ByName("username")).Scan(&username)
		if err != nil {
			if err != sql.ErrNoRows {
				panic(err)
			}
			c.HTML(http.StatusOK, "notfound.html", gin.H{})
		} else {
			c.HTML(http.StatusOK, "profile.html", gin.H{"username": c.Params.ByName("username")})
		}
	}
}
