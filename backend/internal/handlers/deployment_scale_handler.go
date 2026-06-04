package handlers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	"k8s.io/client-go/kubernetes"
)

type ScaleRequest struct {
	Namespace string `json:"namespace"`
	Name      string `json:"name"`
	Replicas  int32  `json:"replicas"`
}

func ScaleDeployment(
	clientset *kubernetes.Clientset,
) gin.HandlerFunc {

	return func(c *gin.Context) {

		var req ScaleRequest

		if err := c.ShouldBindJSON(&req); err != nil {

			c.JSON(
				http.StatusBadRequest,
				gin.H{
					"error": err.Error(),
				},
			)

			return
		}

		deployment, err := clientset.
			AppsV1().
			Deployments(req.Namespace).
			Get(
				context.TODO(),
				req.Name,
				metav1.GetOptions{},
			)

		if err != nil {

			c.JSON(
				http.StatusInternalServerError,
				gin.H{
					"error": err.Error(),
				},
			)

			return
		}

		deployment.Spec.Replicas =
			&req.Replicas

		_, err =
			clientset.
				AppsV1().
				Deployments(req.Namespace).
				Update(
					context.TODO(),
					deployment,
					metav1.UpdateOptions{},
				)

		if err != nil {

			c.JSON(
				http.StatusInternalServerError,
				gin.H{
					"error": err.Error(),
				},
			)

			return
		}

		c.JSON(
			http.StatusOK,
			gin.H{
				"message":
					"deployment scaled",
			},
		)
	}
}