package main

import (
	"k8s-monitor/internal/kubernetes"
	"k8s-monitor/internal/routes"
	"k8s-monitor/internal/prometheus"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
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

	promClient, err := prometheus.NewPrometheusClient()
	if err != nil {
		panic(err.Error())
	}

	router := gin.Default()
	router.Use(cors.Default())

	router.SetTrustedProxies(nil)

	routes.SetupRoutes(
		router,
		clientset,
		metricsClient,
		promClient,
	)

	router.Run(":8080")
}