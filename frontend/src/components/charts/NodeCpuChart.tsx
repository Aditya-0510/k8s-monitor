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

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="cpuCores" />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

export default NodeCpuChart