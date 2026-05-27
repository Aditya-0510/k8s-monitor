import type { PodDetails } from "../../types/pod"

interface Props {
  pod: PodDetails | null
  onClose: () => void
}

function PodDetailsDrawer({
  pod,
  onClose,
}: Props) {

  if (!pod) return null

  return (
    <div className="
      fixed
      top-0
      right-0

      h-screen
      w-[450px]

      bg-slate-950
      border-l border-slate-800

      p-8

      z-50

      overflow-y-auto
    ">

      <div className="
        flex
        items-center
        justify-between
        mb-8
      ">

        <h2 className="
          text-2xl
          font-bold
        ">
          Pod Details
        </h2>

        <button
          onClick={onClose}
          className="
            text-slate-400
            hover:text-white
            text-xl
          "
        >
          ✕
        </button>

      </div>

      <div className="space-y-6">

        <div>

          <p className="text-slate-400 text-sm">
            Pod Name
          </p>

          <h3 className="
            text-xl
            font-semibold
            mt-1
          ">
            {pod.name}
          </h3>

        </div>

        <div>

          <p className="text-slate-400 text-sm">
            Namespace
          </p>

          <p className="mt-1">
            {pod.namespace}
          </p>

        </div>

        <div>

          <p className="text-slate-400 text-sm">
            Node
          </p>

          <p className="mt-1">
            {pod.node}
          </p>

        </div>

        <div>

          <p className="text-slate-400 text-sm">
            Status
          </p>

          <p className="
            mt-1
            text-green-400
          ">
            {pod.status}
          </p>

        </div>

        <div>

          <p className="text-slate-400 text-sm">
            CPU Usage
          </p>

          <p className="mt-1">
            {pod.cpuCores.toFixed(3)} cores
          </p>

        </div>

        <div>

          <p className="text-slate-400 text-sm">
            Memory Usage
          </p>

          <p className="mt-1">
            {pod.memoryMB.toFixed(1)} MB
          </p>

        </div>

      </div>

    </div>
  )
}

export default PodDetailsDrawer