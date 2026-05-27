interface Props {
  events: any[]
}

function EventFeed({ events }: Props) {

  return (
    <div className="
      bg-slate-800
      rounded-2xl
      p-6
      shadow-lg
      mt-8
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-4
      ">
        Live Cluster Events
      </h2>

      <div className="
        max-h-[500px]
        overflow-y-auto
        space-y-4
      ">

        {events.map((event, index) => (

          <div
            key={index}
            className="
              border border-slate-700
              rounded-xl
              p-4
              bg-slate-900
            "
          >

            <div className="
              flex items-center
              justify-between
              mb-2
            ">

              <span className="
                text-sm
                text-blue-400
              ">
                {event.object?.reason}
              </span>

              <span className="
                text-xs
                text-slate-500
              ">
                {event.object?.involvedObject?.kind}
              </span>

            </div>

            <p className="
              text-sm
              text-slate-300
            ">
              {event.object?.message}
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}

export default EventFeed