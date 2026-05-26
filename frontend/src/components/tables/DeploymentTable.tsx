interface Deployment {
  name: string
  namespace: string
  desiredReplicas: number
  availableReplicas: number
}

interface Props {
  deployments: Deployment[]
}

function DeploymentTable({
  deployments,
}: Props) {

  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-4">
        Deployments
      </h2>

      <table className="w-full">

        <thead>

          <tr className="text-left text-slate-400 border-b border-slate-700">

            <th className="pb-3">
              Name
            </th>

            <th className="pb-3">
              Namespace
            </th>

            <th className="pb-3">
              Replicas
            </th>

          </tr>

        </thead>

        <tbody>

          {deployments.map((deployment) => (

            <tr
              key={deployment.name}
              className="border-b border-slate-700"
            >

              <td className="py-3">
                {deployment.name}
              </td>

              <td className="py-3">
                {deployment.namespace}
              </td>

              <td className="py-3">
                {deployment.availableReplicas}/
                {deployment.desiredReplicas}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}

export default DeploymentTable