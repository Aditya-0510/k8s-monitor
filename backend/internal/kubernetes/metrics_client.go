package kubernetes

import (
	"os"
	"path/filepath"

	metricsv "k8s.io/metrics/pkg/client/clientset/versioned"

	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
)

func NewMetricsClient() (*metricsv.Clientset, error) {

	// prod k3s
	config, err := rest.InClusterConfig()
	if err == nil {

		return metricsv.NewForConfig(config)
	}

	// Local minikube
	kubeconfig := filepath.Join(
		os.Getenv("USERPROFILE"),
		".kube",
		"config",
	)

	config, err = clientcmd.
		BuildConfigFromFlags(
			"",
			kubeconfig,
		)
	if err != nil {
		return nil, err
	}

	return metricsv.NewForConfig(config)
}