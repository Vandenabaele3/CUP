// src/Router.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Competitions from "./pages/Competitions";
import Participants from "./pages/Participants";
import Scores from "./pages/Scores";
import ProfilePage from "./pages/ProfilePage";
import MainLayout from "./pages/MainLayout";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="competitions" element={<Competitions />} />
          <Route path="participants" element={<Participants />} />
          <Route path="scores" element={<Scores />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}
