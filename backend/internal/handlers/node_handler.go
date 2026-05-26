package handlers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
)

func GetNodes(clientset *kubernetes.Clientset) gin.HandlerFunc {

	return func(c *gin.Context) {

		nodes, err := clientset.CoreV1().Nodes().List(
			context.TODO(),
			metav1.ListOptions{},
		)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		var nodeNames []string

		for _, node := range nodes.Items {
			nodeNames = append(nodeNames, node.Name)
		}

		c.JSON(http.StatusOK, gin.H{
			"nodes": nodeNames,
		})
	}
}