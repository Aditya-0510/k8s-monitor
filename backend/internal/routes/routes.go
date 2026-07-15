package routes

import (
	"k8s-monitor/internal/handlers"
	"k8s-monitor/internal/prometheus"

	"github.com/gin-gonic/gin"
	"k8s.io/client-go/kubernetes"

	metricsv "k8s.io/metrics/pkg/client/clientset/versioned"
)

func SetupRoutes(
	router *gin.Engine,
	clientset *kubernetes.Clientset,
	metricsClient *metricsv.Clientset,
	promClient *prometheus.Client,
) {

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"service": "k8s-monitor-backend",
			"status":  "running",
		})
	})

	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "healthy",
		})
	})
	
	router.GET("/nodes", handlers.GetNodes(clientset))
	router.GET("/pods", handlers.GetPods(clientset))
	router.GET("/namespaces", handlers.GetNamespaces(clientset))
	router.GET("/deployments", handlers.GetDeployments(clientset))
	router.GET("/metrics/nodes", handlers.GetNodeMetrics(metricsClient))
	router.GET("/metrics/pods", handlers.GetPodMetrics(clientset, metricsClient))
	router.GET("/ws/metrics",handlers.MetricsWebSocket(metricsClient))
	router.GET("/ws/events", handlers.EventsWebSocket(clientset))
	router.GET("/prometheus/cpu-history",handlers.GetCPUHistory(promClient))
	router.GET("/ws/logs", handlers.LogsWebSocket(clientset))
	router.POST("/deployments/scale", handlers.ScaleDeployment(clientset))
}