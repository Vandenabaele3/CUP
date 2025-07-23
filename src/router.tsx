// src/AppRouter.tsx

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Competitions from "./pages/Competitions";
import Participants from "./pages/Participants";
import Scores from "./pages/Scores";
import ProfilePage from "./pages/ProfilePage";

export default function AppRouter() {
  return (
    <Router>
      <nav className="bg-gray-900 text-white px-6 py-4 flex space-x-6">
        <Link to="/">Dashboard</Link>
        <Link to="/competitions">Competitions</Link>
        <Link to="/participants">Participants</Link>
        <Link to="/scores">Scores</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <main
  className="p-6 min-h-[calc(100vh-64px)] overflow-hidden"
  style={{
    backgroundColor: "white",
    backgroundImage: "radial-gradient(#ccc 1px, transparent 0)",
    backgroundSize: "30px 30px",
  }}
>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/participants" element={<Participants />} />
          <Route path="/scores" element={<Scores />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </Router>
  );
}
