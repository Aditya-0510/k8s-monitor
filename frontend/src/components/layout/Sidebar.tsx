import {
  LayoutDashboard,
  Boxes,
  Server,
  ScrollText,
  Activity,
  Layers3
} from "lucide-react"

import { NavLink } from "react-router-dom"

const items = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Nodes",
    icon: Server,
    path: "/nodes",
  },
  {
    name: "Pods",
    icon: Boxes,
    path: "/pods",
  },
  {
    name: "Events",
    icon: Activity,
    path: "/events",
  },
  {
    name: "Deployments",
    icon: Layers3,
    path: "/deployments",
  },
  {
    name: "Logs",
    icon: ScrollText,
    path: "/logs",
  },
]

function Sidebar() {

  return (
    <div className="
      w-72
      min-h-screen
      bg-slate-950
      border-r border-slate-800
      p-6
    ">

      <h1 className="
        text-2xl
        font-bold
        mb-10
      ">
        K8s Monitor
      </h1>

      <div className="space-y-2">

        {items.map((item) => {

          const Icon = item.icon

          return (

            <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                    w-full
                    flex
                    items-center
                    gap-4
                    px-4
                    py-3
                    rounded-xl

                    transition-all
                    duration-200

                    ${
                    isActive
                        ? "bg-slate-800 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }
                `}
                >

                <Icon size={20} />

                <span className="font-medium">
                    {item.name}
                </span>

                </NavLink>
          )
        })}

      </div>

    </div>
  )
}

export default Sidebar