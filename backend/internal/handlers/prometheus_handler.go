package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"k8s-monitor/internal/prometheus"
)

func GetCPUHistory(
	promClient *prometheus.Client,
) gin.HandlerFunc {

	return func(c *gin.Context) {

		result, err := promClient.QueryRange(
			`sum(rate(container_cpu_usage_seconds_total[5m]))`,
		)

		if err != nil {

			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": result,
		})
	}
}