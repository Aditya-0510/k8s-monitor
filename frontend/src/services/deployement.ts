import api from "./api"

export async function scaleDeployment(
  namespace: string,
  name: string,
  replicas: number,
) {

  return api.post(
    "/deployments/scale",
    {
      namespace,
      name,
      replicas,
    },
  )
}