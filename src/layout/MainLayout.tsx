import { Outlet, Link } from 'react-router-dom'

export default function MainLayout() {
  return (
   <div class="pt-0 pr-6 pb-6 pl-6 bg-gray-100 min-h-[calc(100vh-64px)] overflow-hidden">

      <nav className="bg-gray-800 text-white p-4 flex gap-4">
        <Link to="/">Dashboard</Link>
        <Link to="/competitions">Competitions</Link>
        <Link to="/participants">Participants</Link>
        <Link to="/scores">Scores</Link>
      </nav>
      <main className="p-6 flex-1 bg-gray-100">
        <Outlet />
      </main>
    </div>
  )
}
