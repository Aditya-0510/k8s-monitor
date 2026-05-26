package handlers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
)

func GetNamespaces(clientset *kubernetes.Clientset) gin.HandlerFunc {

	return func(c *gin.Context) {

		namespaces, err := clientset.CoreV1().Namespaces().List(
			context.TODO(),
			metav1.ListOptions{},
		)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		var nsList []string

		for _, ns := range namespaces.Items {
			nsList = append(nsList, ns.Name)
		}

		c.JSON(http.StatusOK, gin.H{
			"namespaces": nsList,
		})
	}
}