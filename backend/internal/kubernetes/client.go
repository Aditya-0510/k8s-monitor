package kubernetes

import (
	"os"
	"path/filepath"

	"k8s.io/client-go/kubernetes"

	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
)

func NewClient() (*kubernetes.Clientset, error) {

	// prod k3s
	config, err := rest.InClusterConfig()
	if err == nil {
		return kubernetes.NewForConfig(config)
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

	return kubernetes.NewForConfig(config)
}