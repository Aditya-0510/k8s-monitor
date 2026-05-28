interface Props {
  score: number
  status: string
  alerts: string[]
}

function ClusterHealthCard({
  score,
  status,
  alerts,
}: Props) {

  const color =
    status === "Healthy"
      ? "text-green-400"
      : status === "Warning"
      ? "text-yellow-400"
      : "text-red-400"

  return (
    <div className="
      bg-slate-900
      border border-slate-800
      rounded-2xl
      p-8
      mb-10
    ">

      <div className="
        flex
        items-center
        justify-between
        mb-6
      ">

        <div>

          <h2 className="
            text-3xl
            font-bold
            mb-2
          ">
            Cluster Health
          </h2>

          <p className="
            text-slate-400
          ">
            Real-time infrastructure health analysis
          </p>

        </div>

        <div className="text-right">

          <h1 className={`
            text-6xl
            font-bold
            ${color}
          `}>
            {score}%
          </h1>

          <p className={`
            text-lg
            mt-2
            ${color}
          `}>
            {status}
          </p>

        </div>

      </div>

      <div className="space-y-3">

        {alerts.length === 0 && (

          <div className="
            bg-green-500/10
            border border-green-500/20
            text-green-400

            rounded-xl
            p-4
          ">

            No infrastructure issues detected

          </div>

        )}

        {alerts.map((alert, index) => (

          <div
            key={index}
            className="
              bg-yellow-500/10
              border border-yellow-500/20

              text-yellow-400

              rounded-xl
              p-4
            "
          >

            ⚠ {alert}

          </div>

        ))}

      </div>

    </div>
  )
}

export default ClusterHealthCard