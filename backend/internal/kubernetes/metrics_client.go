package kubernetes

import (
	"os"
	"path/filepath"

	metricsv "k8s.io/metrics/pkg/client/clientset/versioned"

	"k8s.io/client-go/tools/clientcmd"
)

func NewMetricsClient() (*metricsv.Clientset, error) {

	kubeconfig := filepath.Join(
		os.Getenv("USERPROFILE"),
		".kube",
		"config",
	)

	config, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		return nil, err
	}

	metricsClient, err := metricsv.NewForConfig(config)
	if err != nil {
		return nil, err
	}

	return metricsClient, nil
}