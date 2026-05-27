import EventFeed from "../components/events/EventFeed"

import useClusterEvents from "../hooks/useClusterEvents"

function Events() {

  const events =
    useClusterEvents()

  return (
    <div>

      <h1 className="
        text-3xl
        font-bold
        mb-8
      ">
        Cluster Events
      </h1>

      <EventFeed
        events={events}
      />

    </div>
  )
}

export default Events