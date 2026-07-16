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

		// Get all pods
		pods, err := clientset.
			CoreV1().
			Pods("").
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

		// Get metrics for running pods
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

		// Map metrics by namespace/pod name
		metricMap := make(map[string]interface{})

		for _, metric := range metrics.Items {

			key := metric.Namespace + "/" + metric.Name

			var totalCPU int64
			var totalMemory int64

			for _, container := range metric.Containers {

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

			metricMap[key] = gin.H{
				"cpu":    float64(totalCPU) / 1000,
				"memory": float64(totalMemory) / (1024 * 1024),
			}
		}

		var podMetrics []gin.H

		for _, pod := range pods.Items {

			var containers []gin.H

			for _, container := range pod.Spec.Containers {

				containers = append(
					containers,
					gin.H{
						"name":  container.Name,
						"image": container.Image,
					},
				)
			}

			restartCount := int32(0)

			status := string(pod.Status.Phase)

			for _, cs := range pod.Status.ContainerStatuses {

				restartCount += cs.RestartCount

				if cs.State.Waiting != nil {
					status = cs.State.Waiting.Reason
				}

				if cs.State.Terminated != nil {
					status = cs.State.Terminated.Reason
				}
			}

			cpu := 0.0
			memory := 0.0

			key := pod.Namespace + "/" + pod.Name

			if metric, ok := metricMap[key]; ok {

				m := metric.(gin.H)

				cpu = m["cpu"].(float64)
				memory = m["memory"].(float64)
			}

			podMetrics = append(
				podMetrics,
				gin.H{
					"name":         pod.Name,
					"namespace":    pod.Namespace,
					"node":         pod.Spec.NodeName,
					"status":       status,
					"cpuCores":     cpu,
					"memoryMB":     memory,
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