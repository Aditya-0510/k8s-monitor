package handlers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"

	appsv1 "k8s.io/api/apps/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
)

func GetDeployments(clientset *kubernetes.Clientset) gin.HandlerFunc {

	return func(c *gin.Context) {

		deployments, err := clientset.AppsV1().Deployments("").List(
			context.TODO(),
			metav1.ListOptions{},
		)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		var deploymentList []gin.H

		for _, deployment := range deployments.Items {

			deploymentList = append(deploymentList, formatDeployment(deployment))
		}

		c.JSON(http.StatusOK, gin.H{
			"deployments": deploymentList,
		})
	}
}

func formatDeployment(deployment appsv1.Deployment) gin.H {
	desiredReplicas := int32(0)

	if deployment.Spec.Replicas != nil {
		desiredReplicas = *deployment.Spec.Replicas
	}
	return gin.H{
		"name":               deployment.Name,
		"namespace":          deployment.Namespace,
		"desiredReplicas":    desiredReplicas,
		"availableReplicas":  deployment.Status.AvailableReplicas,
		"readyReplicas":      deployment.Status.ReadyReplicas,
		"updatedReplicas":    deployment.Status.UpdatedReplicas,
	}
}