k8s monitor

kubectl port-forward svc/prometheus-kube-prometheus-prometheus 9090:9090 -n monitoring 

kubectl port-forward svc/prometheus-grafana 3001:80 -n monitoring




react
typescript
go
go routines
go channels
kubernetes   (minikube)
docker
grafana
prometheus



docker build -t k8s-monitor-frontend .
docker run -p 5173:80 k8s-monitor-frontend

docker build -t k8s-monitor-backend .