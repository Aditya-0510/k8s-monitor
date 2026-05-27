import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import type { NodeMetric } from "../../types/metrics"

interface Props {
  nodes: NodeMetric[]
}

function NodeCpuChart({ nodes }: Props) {

  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-4">
        Node CPU Usage
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={nodes}>

            <CartesianGrid
              stroke="#334155"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="name"
              tick={{ fill: "#94a3b8" }}
            />

            <YAxis
              tick={{ fill: "#94a3b8" }}
            />

            <Tooltip />

            <Bar
              dataKey="cpuCores"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

export default NodeCpuChart