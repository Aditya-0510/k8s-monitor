import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

import type { NodeMetric } from "../../types/metrics"

interface Props {
  nodes: NodeMetric[]
}

function NodeMemoryChart({ nodes }: Props) {

  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-4">
        Memory Usage
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={nodes}
              dataKey="memoryMB"
              nameKey="name"
              outerRadius={100}
              label
            >

              {nodes.map((_, index) => (
                <Cell
                  key={index}
                />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

export default NodeMemoryChart