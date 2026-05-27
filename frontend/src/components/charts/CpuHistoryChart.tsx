import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

interface Props {
  data: any[]
}

function CpuHistoryChart({
  data,
}: Props) {

  return (
    <div className="
      bg-slate-800
      rounded-2xl
      p-6
      shadow-lg
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-4
      ">
        CPU Usage History
      </h2>

      <div className="h-96">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <CartesianGrid
              stroke="#334155"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="time"
              tick={{ fill: "#94a3b8" }}
            />

            <YAxis
              tick={{ fill: "#94a3b8" }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="cpu"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

export default CpuHistoryChart