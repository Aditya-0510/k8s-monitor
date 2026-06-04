import { useState } from "react"

import { scaleDeployment } from "../../services/deployement"

interface Deployment {
  name: string
  namespace: string

  desiredReplicas: number
  availableReplicas: number

  readyReplicas?: number
  updatedReplicas?: number
}

interface Props {
  deployments: Deployment[]
}

function DeploymentTable({
  deployments,
}: Props) {

  const [loading, setLoading] = useState<string | null>(
    null,
  )

  async function handleScale(
    deployment: Deployment,
    replicas: number,
  ) {

    if (replicas < 0) return

    try {

      setLoading(deployment.name)

      await scaleDeployment(
        deployment.namespace,
        deployment.name,
        replicas,
      )

      window.location.reload()

    } catch (error) {

      console.error(error)

      alert("Failed to scale deployment")

    } finally {

      setLoading(null)
    }
  }

  return (

    <div className="
      bg-slate-800
      rounded-2xl
      p-6
      shadow-lg
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
          Deployments
        </h2>

        <span className="
          text-slate-400
          text-sm
        ">
          {deployments.length} Deployments
        </span>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="
              text-left
              text-slate-400
              border-b
              border-slate-700
            ">

              <th className="pb-4">
                Name
              </th>

              <th className="pb-4">
                Namespace
              </th>

              <th className="pb-4">
                Available
              </th>

              <th className="pb-4">
                Desired
              </th>

              <th className="pb-4">
                Scale
              </th>

            </tr>

          </thead>

          <tbody>

            {deployments.map(
              (deployment) => (

                <tr
                  key={`${deployment.namespace}-${deployment.name}`}
                  className="
                    border-b
                    border-slate-700
                    hover:bg-slate-700/30
                  "
                >

                  <td className="
                    py-4
                    font-medium
                  ">
                    {deployment.name}
                  </td>

                  <td className="py-4">
                    {deployment.namespace}
                  </td>

                  <td className="py-4">

                    <span
                      className={
                        deployment.availableReplicas ===
                        deployment.desiredReplicas
                          ? "text-green-400"
                          : "text-yellow-400"
                      }
                    >
                      {deployment.availableReplicas}
                    </span>

                  </td>

                  <td className="py-4">
                    {deployment.desiredReplicas}
                  </td>

                  <td className="py-4">

                    <div className="
                      flex
                      items-center
                      gap-3
                    ">

                      <button
                        disabled={
                          loading ===
                          deployment.name
                        }
                        onClick={() =>
                          handleScale(
                            deployment,
                            deployment.desiredReplicas - 1,
                          )
                        }
                        className="
                          w-8
                          h-8

                          rounded-lg

                          bg-slate-700
                          hover:bg-slate-600
                        "
                      >
                        -
                      </button>

                      <span className="
                        min-w-[20px]
                        text-center
                      ">
                        {deployment.desiredReplicas}
                      </span>

                      <button
                        disabled={
                          loading ===
                          deployment.name
                        }
                        onClick={() =>
                          handleScale(
                            deployment,
                            deployment.desiredReplicas + 1,
                          )
                        }
                        className="
                          w-8
                          h-8

                          rounded-lg

                          bg-blue-600
                          hover:bg-blue-500
                        "
                      >
                        +
                      </button>

                    </div>

                  </td>

                </tr>
              ),
            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default DeploymentTable