import type {
  Alert,
} from "../../types/alerts"

interface Props {
  alerts: Alert[]
}

function AlertCenter({
  alerts,
}: Props) {

  return (
    <div className="
      bg-slate-900
      border border-slate-800
      rounded-2xl
      p-6
      mb-10
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
          Active Alerts
        </h2>

        <div className="
          bg-red-500/20
          text-red-400

          px-3
          py-1

          rounded-full
          text-sm
        ">

          {alerts.length} alerts

        </div>

      </div>

      <div className="space-y-4">

        {alerts.length === 0 && (

          <div className="
            bg-green-500/10
            border border-green-500/20
            text-green-400

            rounded-xl
            p-4
          ">

            No active alerts

          </div>

        )}

        {alerts.map((alert) => {

          const color =
            alert.severity === "critical"
              ? "border-red-500/20 bg-red-500/10 text-red-400"

              : alert.severity === "warning"
              ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"

              : "border-blue-500/20 bg-blue-500/10 text-blue-400"

          return (

            <div
              key={alert.id}
              className={`
                border
                rounded-xl
                p-4

                ${color}
              `}
            >

              <div className="
                flex
                items-center
                justify-between
                mb-2
              ">

                <span className="
                  uppercase
                  text-xs
                  font-bold
                ">
                  {alert.severity}
                </span>

                <span className="
                  text-xs
                  opacity-70
                ">
                  {alert.timestamp}
                </span>

              </div>

              <p className="font-medium">
                {alert.message}
              </p>

            </div>
          )
        })}

      </div>

    </div>
  )
}

export default AlertCenter