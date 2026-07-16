function Navbar() {

  return (
    <div className="
      h-20
      bg-slate-900
      border-b border-slate-800

      flex
      items-center
      justify-between

      px-8
    ">

      <div>

        <h1 className="
          text-2xl
          font-bold
        ">
          Kubernetes Monitoring Dashboard
        </h1>

        <p className="
          text-sm
          text-slate-400
        ">
          Real-time cluster observability
        </p>

      </div>

      <div className="
        flex
        items-center
        gap-3
      ">

        <div className="
          w-3
          h-3
          rounded-full
          bg-green-500
          animate-pulse
        " />

        <span className="
          text-sm
          text-slate-300
        ">
          Connected to Cluster
        </span>

      </div>

    </div>
  )
}

export default Navbar