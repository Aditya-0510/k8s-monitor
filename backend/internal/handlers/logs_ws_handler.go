package handlers

import (
	"bufio"
	"context"
	"log"
	// "net/http"

	"github.com/gin-gonic/gin"
	// "github.com/gorilla/websocket"

	corev1 "k8s.io/api/core/v1"

	"k8s.io/client-go/kubernetes"
)

func LogsWebSocket(
	clientset *kubernetes.Clientset,
) gin.HandlerFunc {

	return func(c *gin.Context) {

		namespace :=
			c.Query("namespace")

		podName :=
			c.Query("pod")

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

		req := clientset.
			CoreV1().
			Pods(namespace).
			GetLogs(
				podName,
				&corev1.PodLogOptions{
					Follow: true,
				},
			)

		stream, err := req.Stream(
			context.TODO(),
		)

		if err != nil {
			log.Println(err)
			return
		}

		defer stream.Close()

		scanner := bufio.NewScanner(stream)

		for scanner.Scan() {

			line := scanner.Text()

			err := conn.WriteJSON(gin.H{
				"log": line,
			})

			if err != nil {
				log.Println(err)
				return
			}
		}
	}
}