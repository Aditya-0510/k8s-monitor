import DeploymentTable from "../components/tables/DeploymentTable"

import useDashboardData from "../hooks/useDashboardData"

function Deployments() {

  const {
    deployments,
  } = useDashboardData()

  return (
    <div>

      <div className="
        flex
        items-center
        justify-between
        mb-8
      ">

        <div>

          <h1 className="
            text-3xl
            font-bold
            mb-2
          ">
            Deployments
          </h1>

          <p className="
            text-slate-400
          ">
            Monitor deployment replicas and rollout health
          </p>

        </div>

      </div>

      <DeploymentTable
        deployments={deployments}
      />

    </div>
  )
}

export default Deployments