package handlers

import (
	"context"
	"log"
	// "net/http"

	"github.com/gin-gonic/gin"
	// "github.com/gorilla/websocket"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	"k8s.io/client-go/kubernetes"
)

func EventsWebSocket(
	clientset *kubernetes.Clientset,
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

		watcher, err := clientset.
			CoreV1().
			Events("").
			Watch(
				context.TODO(),
				metav1.ListOptions{},
			)

		if err != nil {
			log.Println(err)
			return
		}

		ch := watcher.ResultChan()

		for event := range ch {

			err := conn.WriteJSON(event)

			if err != nil {
				log.Println(err)
				return
			}
		}
	}
}