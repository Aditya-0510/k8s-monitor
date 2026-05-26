package handlers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	metricsv "k8s.io/metrics/pkg/client/clientset/versioned"
)

func GetNodeMetrics(metricsClient *metricsv.Clientset) gin.HandlerFunc {

	return func(c *gin.Context) {

		metrics, err := metricsClient.MetricsV1beta1().
			NodeMetricses().
			List(context.TODO(), metav1.ListOptions{})

		if err != nil {

			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			return
		}

		var nodeMetrics []gin.H

		for _, node := range metrics.Items {

			cpu := float64(node.Usage.Cpu().MilliValue()) / 1000
			memory := float64(node.Usage.Memory().Value()) / (1024 * 1024)

			nodeMetrics = append(nodeMetrics, gin.H{
				"name":   node.Name,
				"cpuCores":    cpu,
				"memoryMB": memory,
			})
		}

		c.JSON(http.StatusOK, gin.H{
			"nodes": nodeMetrics,
		})
	}
}

func GetPodMetrics(metricsClient *metricsv.Clientset) gin.HandlerFunc {

	return func(c *gin.Context) {

		metrics, err := metricsClient.MetricsV1beta1().
			PodMetricses("").
			List(context.TODO(), metav1.ListOptions{})

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

				totalCPU += container.Usage.Cpu().MilliValue()

				totalMemory += container.Usage.Memory().Value()
			}

			podMetrics = append(podMetrics, gin.H{
				"name":       pod.Name,
				"namespace":  pod.Namespace,
				"cpuCores":   float64(totalCPU) / 1000,
				"memoryMB":   float64(totalMemory) / (1024 * 1024),
			})
		}

		c.JSON(http.StatusOK, gin.H{
			"pods": podMetrics,
		})
	}
}