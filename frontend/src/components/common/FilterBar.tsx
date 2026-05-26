interface Props {
  search: string
  setSearch: (value: string) => void

  namespace: string
  setNamespace: (value: string) => void

  namespaces: string[]
}

function FilterBar({
  search,
  setSearch,
  namespace,
  setNamespace,
  namespaces,
}: Props) {

  return (
    <div className="
      bg-slate-800
      rounded-2xl
      p-6
      shadow-lg
      mb-8
    ">

      <div className="
        flex flex-col lg:flex-row
        gap-4
      ">

        <input
          type="text"
          placeholder="Search Pods..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            flex-1
            bg-slate-700
            border border-slate-600
            rounded-xl
            px-4 py-3
            outline-none
          "
        />

        <select
          value={namespace}
          title="namespace"
          onChange={(e) =>
            setNamespace(e.target.value)
          }
          className="
            bg-slate-700
            border border-slate-600
            rounded-xl
            px-4 py-3
            outline-none
          "
        >

          <option value="all">
            All Namespaces
          </option>

          {namespaces.map((ns) => (

            <option
              key={ns}
              value={ns}
            >
              {ns}
            </option>

          ))}

        </select>

      </div>

    </div>
  )
}

export default FilterBar