package handlers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
)

func GetPods(clientset *kubernetes.Clientset) gin.HandlerFunc {

	return func(c *gin.Context) {

		pods, err := clientset.CoreV1().Pods("").List(
			context.TODO(),
			metav1.ListOptions{},
		)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		var podList []gin.H

		for _, pod := range pods.Items {

			podList = append(podList, gin.H{
				"name":      pod.Name,
				"namespace": pod.Namespace,
				"status":    pod.Status.Phase,
				"node":      pod.Spec.NodeName,
			})
		}

		c.JSON(http.StatusOK, gin.H{
			"pods": podList,
		})
	}
}