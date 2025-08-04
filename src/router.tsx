// src/Router.tsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import Leagues from "./pages/Leagues";
import MyGames from "./pages/MyGames";
import MyLeagues from "./pages/MyLeagues";
import ProfilePage from "./pages/ProfilePage";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="my-games" element={<MyGames />} />
          <Route path="my-leagues" element={<MyLeagues />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="games" element={<Games />} />
          <Route path="leagues" element={<Leagues />} />
        </Route>
      </Routes>
    </Router>
  );
}
