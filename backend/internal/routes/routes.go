package routes

import (
	"k8s-monitor/internal/handlers"

	"github.com/gin-gonic/gin"
	"k8s.io/client-go/kubernetes"

	metricsv "k8s.io/metrics/pkg/client/clientset/versioned"
)

func SetupRoutes(
	router *gin.Engine,
	clientset *kubernetes.Clientset,
	metricsClient *metricsv.Clientset,
) {

	router.GET("/nodes", handlers.GetNodes(clientset))
	router.GET("/pods", handlers.GetPods(clientset))
	router.GET("/namespaces", handlers.GetNamespaces(clientset))
	router.GET("/deployments", handlers.GetDeployments(clientset))
	router.GET("/metrics/nodes", handlers.GetNodeMetrics(metricsClient))
	router.GET("/metrics/pods", handlers.GetPodMetrics(metricsClient),
)
}