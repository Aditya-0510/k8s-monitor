package handlers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	metricsv "k8s.io/metrics/pkg/client/clientset/versioned"

	"k8s.io/client-go/kubernetes"
)

func GetNodeMetrics(
	metricsClient *metricsv.Clientset,
) gin.HandlerFunc {

	return func(c *gin.Context) {

		metrics, err := metricsClient.
			MetricsV1beta1().
			NodeMetricses().
			List(
				context.TODO(),
				metav1.ListOptions{},
			)

		if err != nil {

			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			return
		}

		var nodeMetrics []gin.H

		for _, node := range metrics.Items {

			cpu :=
				float64(
					node.Usage.Cpu().
						MilliValue(),
				) / 1000

			memory :=
				float64(
					node.Usage.Memory().
						Value(),
				) / (1024 * 1024)

			nodeMetrics = append(nodeMetrics, gin.H{
				"name":      node.Name,
				"cpuCores":  cpu,
				"memoryMB":  memory,
			})
		}

		c.JSON(http.StatusOK, gin.H{
			"nodes": nodeMetrics,
		})
	}
}

func GetPodMetrics(
	clientset *kubernetes.Clientset,
	metricsClient *metricsv.Clientset,
) gin.HandlerFunc {

	return func(c *gin.Context) {

		metrics, err := metricsClient.
			MetricsV1beta1().
			PodMetricses("").
			List(
				context.TODO(),
				metav1.ListOptions{},
			)

		if err != nil {

			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			return
		}

		var podMetrics []gin.H

		for _, pod := range metrics.Items {

			var totalCPU int64
			var totalMemory int64

			for _, container := range pod.Containers {

				totalCPU +=
					container.
						Usage.
						Cpu().
						MilliValue()

				totalMemory +=
					container.
						Usage.
						Memory().
						Value()
			}

			podInfo, err := clientset.
				CoreV1().
				Pods(pod.Namespace).
				Get(
					context.TODO(),
					pod.Name,
					metav1.GetOptions{},
				)

			if err != nil {
				continue
			}

			var containers []gin.H

			for _, container := range podInfo.
				Spec.
				Containers {

				containers = append(
					containers,
					gin.H{
						"name":  container.Name,
						"image": container.Image,
					},
				)
			}

			restartCount := int32(0)

			for _, status := range podInfo.
				Status.
				ContainerStatuses {

				restartCount +=
					status.RestartCount
			}

			podMetrics = append(
				podMetrics,
				gin.H{
					"name":      pod.Name,
					"namespace": pod.Namespace,

					"node": podInfo.
						Spec.
						NodeName,

					"status": string(
						podInfo.Status.Phase,
					),

					"cpuCores": float64(
						totalCPU,
					) / 1000,

					"memoryMB": float64(
						totalMemory,
					) / (1024 * 1024),

					"restartCount": restartCount,
					"containers":   containers,
				},
			)
		}

		c.JSON(http.StatusOK, gin.H{
			"pods": podMetrics,
		})
	}
}