# Kubernetes Monitoring & Management Platform

A full-stack cloud-native observability and cluster management platform built with **React, TypeScript, Go, Kubernetes, Prometheus, Grafana, and WebSockets**.

The platform provides real-time visibility into Kubernetes clusters, including node metrics, pod metrics, deployments, events, logs, health scoring, alerting, and deployment scaling directly from the UI.

---

# Features

## Cluster Monitoring

* Real-time node metrics (CPU & Memory)
* Real-time pod metrics
* Deployment monitoring
* Namespace discovery
* Historical Prometheus metrics
* Cluster health scoring

## Observability

* Live Kubernetes Events
* Real-time Pod Logs
* Prometheus Integration
* Grafana Dashboards
* Alert Generation
* Resource Utilization Charts

## Cluster Management

* Deployment Scaling
* Pod Inspection Drawer
* Container Information
* Restart Count Monitoring
* Image Version Tracking

## User Interface

* Modern React + TypeScript frontend
* Tailwind CSS styling
* Responsive dashboard layout
* Realtime updates using WebSockets
* Interactive charts and analytics

---

# Architecture

```text
Frontend (React + TypeScript)
            |
            v
Backend API (Go + Gin)
            |
            +----------------+
            |                |
            v                v
 Kubernetes API       Prometheus API
            |
            v
        Minikube / K3s
```

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios
* Recharts
* React Router
* Framer Motion

## Backend

* Go
* Gin
* Kubernetes Client-Go
* Kubernetes Metrics API
* WebSockets

## Infrastructure

* Kubernetes
* Minikube
* Docker
* Prometheus
* Grafana

---

# Running Locally with Minikube

## Start Minikube

```bash
minikube start
```

---

## Enable Metrics Server

```bash
minikube addons enable metrics-server
```

---

## Install Prometheus & Grafana

Add Helm repositories:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

helm repo update
```

Install monitoring stack:

```bash
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace
```
---

## Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
go mod download
```

Run:

```bash
go run cmd/main.go
```
---

## Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run:

```bash
npm run dev
```
---

# Project Goals

This project was built to explore:

* Kubernetes API development
* Cloud-native monitoring
* Platform engineering concepts
* DevOps workflows
* Observability tooling
* Real-time infrastructure management
