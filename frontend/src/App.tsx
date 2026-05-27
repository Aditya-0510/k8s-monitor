import {
  Routes,
  Route,
} from "react-router-dom"

import Sidebar from "./components/layout/Sidebar"
import Navbar from "./components/layout/Navbar"

import Dashboard from "./pages/Dashboard"
import Nodes from "./pages/Nodes"
import Pods from "./pages/Pods"
import Events from "./pages/Events"
import Logs from "./pages/Logs"
import Deployments from "./pages/Deployments"

function App() {

  return (
    <div className="
      flex
      bg-slate-950
      text-white
    ">

      <Sidebar />

      <div className="
        flex-1
        min-h-screen
      ">

        <Navbar />

        <div className="p-8">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/nodes"
              element={<Nodes />}
            />

            <Route
              path="/pods"
              element={<Pods />}
            />

            <Route
              path="/events"
              element={<Events />}
            />

            <Route
              path="/logs"
              element={<Logs />}
            />
            
            <Route
              path="/deployments"
              element={<Deployments />}
            />

          </Routes>

        </div>

      </div>

    </div>
  )
}

export default App