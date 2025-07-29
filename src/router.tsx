// src/Router.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Participants from "./pages/Participants";
import ProfilePage from "./pages/ProfilePage";
import MainLayout from "./pages/MainLayout";
import Games from "./pages/Games";
import Leagues from "./pages/Leagues";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="participants" element={<Participants />} />
          <Route path="games" element={<Games />} />
          <Route path="leagues" element={<Leagues />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}
