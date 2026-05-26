package main

import (
	"context"
	"fmt"
	"os"
	"path/filepath"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
)

func main() {

	kubeconfig := filepath.Join(
		os.Getenv("USERPROFILE"),
		".kube",
		"config",
	)

	config, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		panic(err.Error())
	}

	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		panic(err.Error())
	}

	nodes, err := clientset.CoreV1().Nodes().List(
		context.TODO(),
		metav1.ListOptions{},
	)

	if err != nil {
		panic(err.Error())
	}

	fmt.Println("Cluster Nodes:")

	for _, node := range nodes.Items {
		fmt.Println(node.Name)
	}
}