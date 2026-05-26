import { useMemo, useState } from "react"

import FilterBar from "./components/common/FilterBar"
import SummaryCard from "./components/cards/SummaryCard"
import NodeCpuChart from "./components/charts/NodeCpuChart"
import PodTable from "./components/tables/PodTable"
import NodeMemoryChart from "./components/charts/NodeMemoryChart"
import DeploymentTable from "./components/tables/DeploymentTable"
import useDashboardData from "./hooks/useDashboardData"

function App() {
  const [search, setSearch] = useState("")
  const [namespace, setNamespace] = useState("all")
  
  const {
    nodeMetrics,
    podMetrics,
    loading,
    deployments,
    namespaces
  } = useDashboardData()

  if (loading) {
    return (
      <div className="p-8 text-white">
        Loading...
      </div>
    )
  }

  const totalCPU =
    nodeMetrics.reduce(
      (sum, node) => sum + node.cpuCores,
      0
    )

  const totalMemory =
    nodeMetrics.reduce(
      (sum, node) => sum + node.memoryMB,
      0
    )
    const filteredPods = useMemo(() => {

    return podMetrics.filter((pod) => {

      const matchesSearch =
        pod.name
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesNamespace =
        namespace === "all" ||
        pod.namespace === namespace

      return (
        matchesSearch &&
        matchesNamespace
      )
    })

  }, [podMetrics, search, namespace])

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Kubernetes Monitoring Dashboard
      </h1>

      <FilterBar
        search={search}
        setSearch={setSearch}
        namespace={namespace}
        setNamespace={setNamespace}
        namespaces={namespaces}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <SummaryCard
          title="Nodes"
          value={nodeMetrics.length}
        />

        <SummaryCard
          title="Pods"
          value={podMetrics.length}
        />

        <SummaryCard
          title="CPU Usage"
          value={`${totalCPU.toFixed(2)} cores`}
        />

        <SummaryCard
          title="Memory Usage"
          value={`${totalMemory.toFixed(0)} MB`}
        />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <NodeCpuChart nodes={nodeMetrics} />
        <NodeMemoryChart nodes={nodeMetrics} />
      </div>

      <PodTable pods={filteredPods} />
      <div className="mt-8">
        <DeploymentTable deployments={deployments} />
      </div>
    </div>
  )
}

export default App