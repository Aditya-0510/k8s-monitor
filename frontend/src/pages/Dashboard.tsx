import SummaryCard from "../components/cards/SummaryCard"

import NodeCpuChart from "../components/charts/NodeCpuChart"
import NodeMemoryChart from "../components/charts/NodeMemoryChart"

import useDashboardData from "../hooks/useDashboardData"
import useRealtimeMetrics from "../hooks/useRealtimeMetrics"

import useClusterEvents from "../hooks/useClusterEvents"

import ClusterHealthCard from "../components/health/ClusterHealthCard"

import {
  calculateClusterHealth,
} from "../utils/clusterHealth"

import AlertCenter from "../components/alerts/AlertCenter"

import {
  generateAlerts,
} from "../utils/alerts"

function Dashboard() {



  const {
    nodeMetrics: initialNodeMetrics,
    podMetrics,
    deployments
  } = useDashboardData()

  const realtimeNodes =
    useRealtimeMetrics()

  const nodeMetrics =
    realtimeNodes.length > 0
      ? realtimeNodes
      : initialNodeMetrics

  const events =
    useClusterEvents()

  const recentEvents =
    events.slice(0, 5)

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

    const health =
  calculateClusterHealth(
    nodeMetrics,
    podMetrics,
    deployments || [],
  )

  const alerts =
  generateAlerts(
    nodeMetrics,
    podMetrics,
    deployments || [],
  )
  return (
    <div>

      <div className="
        flex
        items-center
        justify-between
        mb-10
      ">

        <div>

          <h1 className="
            text-4xl
            font-bold
            mb-2
          ">
            Cluster Overview
          </h1>

          <p className="
            text-slate-400
          ">
            Real-time Kubernetes observability
          </p>

        </div>

        <div className="
          flex
          items-center
          gap-3

          bg-slate-900
          border border-slate-800

          px-5
          py-3

          rounded-2xl
        ">

          <div className="
            w-3
            h-3
            rounded-full
            bg-green-500
            animate-pulse
          " />

          <span className="
            text-sm
            text-slate-300
          ">
            Cluster Healthy
          </span>

        </div>

      </div>
      <ClusterHealthCard
  score={health.score}
  status={health.status}
  alerts={health.alerts}
/>

<AlertCenter
  alerts={alerts}
/>
      <div className="
        grid
        grid-cols-1
        md:grid-cols-4
        gap-6
        mb-10
      ">

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

      <div className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-8
        mb-10
      ">

        <NodeCpuChart
          nodes={nodeMetrics}
        />

        <NodeMemoryChart
          nodes={nodeMetrics}
        />

      </div>

      <div className="
        bg-slate-900
        border border-slate-800
        rounded-2xl
        p-6
      ">

        <div className="
          flex
          items-center
          justify-between
          mb-6
        ">

          <h2 className="
            text-2xl
            font-bold
          ">
            Recent Cluster Events
          </h2>

          <span className="
            text-sm
            text-slate-400
          ">
            Live
          </span>

        </div>

        <div className="space-y-4">

          {recentEvents.map((event, index) => (

            <div
              key={index}
              className="
                bg-slate-950
                border border-slate-800
                rounded-xl
                p-4
              "
            >

              <div className="
                flex
                items-center
                justify-between
                mb-2
              ">

                <span className="
                  text-blue-400
                  text-sm
                ">
                  {event.object?.reason}
                </span>

                <span className="
                  text-xs
                  text-slate-500
                ">
                  {event.object?.involvedObject?.kind}
                </span>

              </div>

              <p className="
                text-sm
                text-slate-300
              ">
                {event.object?.message}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default Dashboard