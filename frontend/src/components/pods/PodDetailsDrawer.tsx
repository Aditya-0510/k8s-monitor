import { motion, AnimatePresence } from "framer-motion"

import type { PodDetails } from "../../types/pod"

import usePodLogs from "../../hooks/usePodLogs"

interface Props {
  pod: PodDetails | null
  onClose: () => void
}

function PodDetailsDrawer({
  pod,
  onClose,
}: Props) {

  const logs = usePodLogs(
    pod?.namespace || "",
    pod?.name || "",
  )

  return (

    <AnimatePresence>

      {pod && (

        <>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}

            onClick={onClose}

            className="
              fixed
              inset-0

              bg-black/50
              backdrop-blur-sm

              z-40
            "
          />

          <motion.div

            initial={{ x: 500 }}
            animate={{ x: 0 }}
            exit={{ x: 500 }}

            transition={{
              type: "spring",
              damping: 25,
              stiffness: 250,
            }}

            className="
              fixed
              top-0
              right-0

              h-screen
              w-[500px]

              bg-slate-950/95
              backdrop-blur-xl

              border-l
              border-slate-800

              p-8

              z-50

              overflow-y-auto
            "
          >

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

                  transition-colors

                  text-xl
                "
              >
                ✕
              </button>

            </div>

            <div className="space-y-6">

              <div>

                <p className="
                  text-slate-400
                  text-sm
                ">
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

                <p className="
                  text-slate-400
                  text-sm
                ">
                  Namespace
                </p>

                <p className="mt-1">
                  {pod.namespace}
                </p>

              </div>

              <div>

                <p className="
                  text-slate-400
                  text-sm
                ">
                  Node
                </p>

                <p className="mt-1">
                  {pod.node}
                </p>

              </div>

              <div>

                <p className="
                  text-slate-400
                  text-sm
                ">
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

                <p className="
                  text-slate-400
                  text-sm
                ">
                  CPU Usage
                </p>

                <p className="mt-1">
                  {pod.cpuCores.toFixed(3)} cores
                </p>

              </div>

              <div>

                <p className="
                  text-slate-400
                  text-sm
                ">
                  Memory Usage
                </p>

                <p className="mt-1">
                  {pod.memoryMB.toFixed(1)} MB
                </p>

              </div>

              <div>

  <p className="
    text-slate-400
    text-sm
  ">
    Restart Count
  </p>

  <p className="mt-1">
    {pod.restartCount || 0}
  </p>

</div>

<div>

  <p className="
    text-slate-400
    text-sm
    mb-3
  ">
    Containers
  </p>

  <div className="space-y-3">

    {pod.containers?.map(
      (container) => (

        <div
          key={container.name}
          className="
            bg-slate-900
            border border-slate-800
            rounded-xl
            p-4
          "
        >

          <p className="
            font-medium
            mb-1
          ">
            {container.name}
          </p>

          <p className="
            text-xs
            text-slate-400
            font-mono
          ">
            {container.image}
          </p>

        </div>

      )
    )}

  </div>

</div>

              <div>

                <p className="
                  text-slate-400
                  text-sm
                  mb-3
                ">
                  Live Logs
                </p>

                <div className="
                 bg-[#0d1117]
                  border
                  border-slate-800
                  shadow-inner
        rounded-2xl


                  p-4

                  h-[300px]
                  overflow-y-auto

                  font-mono
                  text-xs
                ">

                  {logs.length === 0 && (

                    <p className="
                      text-slate-500
                    ">
                      Waiting for logs...
                    </p>

                  )}

                  {logs.map((log, index) => (

                    <div
  key={index}
  className={`
    mb-1
    whitespace-pre-wrap
    break-words
    leading-6

    ${
      log.includes("ERROR")
        ? "text-red-400"

      : log.includes("WARN")
        ? "text-yellow-400"

      : log.includes("INFO")
        ? "text-blue-400"

      : "text-green-400"
    }
  `}
>

  {log}

</div>

                  ))}

                </div>

              </div>

            </div>

          </motion.div>

        </>

      )}

    </AnimatePresence>
  )
}

export default PodDetailsDrawer