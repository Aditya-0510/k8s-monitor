import SummaryCard from "../components/cards/SummaryCard"

import NodeCpuChart from "../components/charts/NodeCpuChart"
import NodeMemoryChart from "../components/charts/NodeMemoryChart"

import useDashboardData from "../hooks/useDashboardData"
import useRealtimeMetrics from "../hooks/useRealtimeMetrics"

import CpuHistoryChart from "../components/charts/CpuHistoryChart"
import useCpuHistory from "../hooks/useCpuHistory"

function Nodes() {

  const {
    nodeMetrics: initialNodeMetrics,
  } = useDashboardData()

  const realtimeNodes =
    useRealtimeMetrics()

  const nodeMetrics =
    realtimeNodes.length > 0
      ? realtimeNodes
      : initialNodeMetrics

  const totalCPU =
    nodeMetrics.reduce(
      (sum, node) => sum + node.cpuCores,
      0
    )
  const cpuHistory = useCpuHistory()
  const totalMemory =
    nodeMetrics.reduce(
      (sum, node) => sum + node.memoryMB,
      0
    )

  return (
    <div>

      <h1 className="
        text-3xl
        font-bold
        mb-8
      ">
        Node Monitoring
      </h1>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
        mb-8
      ">

        <SummaryCard
          title="Total Nodes"
          value={nodeMetrics.length}
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

      <div className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-8
      ">

        <NodeCpuChart
          nodes={nodeMetrics}
        />

        <NodeMemoryChart
          nodes={nodeMetrics}
        />

      </div>
        <div className="mt-8">

    <CpuHistoryChart
        data={cpuHistory}
    />

    </div>
    </div>
  )
}

export default Nodes