package routes

import (
	"k8s-monitor/internal/handlers"

	"github.com/gin-gonic/gin"
	"k8s.io/client-go/kubernetes"
)

func SetupRoutes(
	router *gin.Engine,
	clientset *kubernetes.Clientset,
) {

	router.GET("/nodes", handlers.GetNodes(clientset))

	router.GET("/pods", handlers.GetPods(clientset))

	router.GET("/namespaces", handlers.GetNamespaces(clientset))
}