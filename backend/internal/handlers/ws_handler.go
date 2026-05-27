package handlers

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	metricsv "k8s.io/metrics/pkg/client/clientset/versioned"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func MetricsWebSocket(
	metricsClient *metricsv.Clientset,
) gin.HandlerFunc {

	return func(c *gin.Context) {

		conn, err := upgrader.Upgrade(
			c.Writer,
			c.Request,
			nil,
		)

		if err != nil {
			log.Println(err)
			return
		}

		defer conn.Close()

		for {

			metrics, err := metricsClient.
				MetricsV1beta1().
				NodeMetricses().
				List(
					context.TODO(),
					metav1.ListOptions{},
				)

			if err != nil {
				log.Println(err)
				return
			}

			var data []gin.H

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

				data = append(data, gin.H{
					"name":      node.Name,
					"cpuCores":  cpu,
					"memoryMB":  memory,
				})
			}

			err = conn.WriteJSON(gin.H{
				"nodes": data,
			})

			if err != nil {
				log.Println(err)
				return
			}

			time.Sleep(2 * time.Second)
		}
	}
}