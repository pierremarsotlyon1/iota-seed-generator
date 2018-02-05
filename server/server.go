package main

import (
	"github.com/labstack/echo"
	"os/exec"
	"github.com/matishsiao/goInfo"
	"os"
	"github.com/labstack/echo/middleware"
)

func main() {
	e := echo.New()

	//Add CORS
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{"Origin", "X-Requested-With", "Content-Type", "Accept"},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	}))

	e.GET("/", func(c echo.Context) error {

		//Init
		var out []byte
		var err error

		//Get system informations to generate a seed
		gi := goInfo.GetInfo()
		if gi.Kernel == "Linux" {
			out, err = exec.Command("sh", "-c", "cat /dev/urandom |tr -dc A-Z9|head -c${1:-81}").Output()
		} else if gi.Kernel == "Darwin" {
			out, err = exec.Command("sh", "-c", "cat /dev/urandom |LC_ALL=C tr -dc 'A-Z9' | fold -w 81 | head -n 1").Output()
		} else {
			return c.JSON(403, map[string]string{
				"error": "Error when detected system",
			})
		}

		//Check if error
		if err != nil {
			return c.JSON(403, map[string]string{
				"error": "Error when generated seed",
			})
		}

		//Return seed generated
		return c.JSON(200, map[string]string{
			"seed": string(out),
		})
	})

    //Get port from env
	port := os.Getenv("PORT")

    if len(port) == 0 {
        port = "1323"
    }
	//Launch web server
	e.Logger.Fatal(e.Start(":" + port))
}
