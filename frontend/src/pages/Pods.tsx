import { useMemo, useState } from "react"

import PodTable from "../components/tables/PodTable"
import FilterBar from "../components/common/FilterBar"
import useDashboardData from "../hooks/useDashboardData"
import PodDetailsDrawer from "../components/pods/PodDetailsDrawer"
import type { PodDetails } from "../types/pod"

function Pods() {

  const {
    podMetrics,
    namespaces,
  } = useDashboardData()

  const [search, setSearch] =
    useState("")

  const [namespace, setNamespace] =
    useState("all")

    const [selectedPod, setSelectedPod] = useState<PodDetails | null>(null)

  const filteredPods = useMemo(() => {

    return podMetrics.filter((pod) => {

      const matchesSearch =
        pod.name
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesNamespace =
        namespace === "all" ||
        pod.namespace === namespace

      return (
        matchesSearch &&
        matchesNamespace
      )
    })

  }, [podMetrics, search, namespace])

  return (
    <div>

      <h1 className="
        text-3xl
        font-bold
        mb-8
      ">
        Pod Monitoring
      </h1>

      <FilterBar
        search={search}
        setSearch={setSearch}
        namespace={namespace}
        setNamespace={setNamespace}
        namespaces={namespaces}
      />

     <PodTable
        pods={filteredPods}
        onSelectPod={setSelectedPod}
      />

      <PodDetailsDrawer
        pod={selectedPod}
        onClose={() =>
          setSelectedPod(null)
        }
      />

    </div>
  )
}

export default Pods