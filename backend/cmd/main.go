package main

import (
	"k8s-monitor/internal/kubernetes"
	"k8s-monitor/internal/routes"

	"github.com/gin-gonic/gin"
)

func main() {

	clientset, err := kubernetes.NewClient()
	if err != nil {
		panic(err.Error())
	}

	metricsClient, err := kubernetes.NewMetricsClient()
	if err != nil {
		panic(err.Error())
	}

	router := gin.Default()

	router.SetTrustedProxies(nil)

	routes.SetupRoutes(
		router,
		clientset,
		metricsClient,
	)

	router.Run(":3000")
}