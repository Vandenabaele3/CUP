import React, { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import ProfileInfoCard from "../components/profile/ProfileInfoCard";
import ProfileMiniStatCard from "../components/profile/ProfileMiniStatCard";
import ScoreChart from "../components/profile/ScoreChart";

export default function ProfilePage() {
  const [bgColor, setBgColor] = useState("rgba(0,0,0,0.6)");

  const userInfo = {
    fullName: "John Doe",
    username: "johndoe42",
    email: "john@example.com",
    password: "••••••••",
    age: 30,
    gender: "Male",
    location: "New York",
    address: "123 Main Street",
    phone: "+1 555-1234",
    joined: "2024-05-01",
  };

  useEffect(() => {
    const img = document.querySelector("img");
    if (img) {
      const fac = new FastAverageColor();
      fac.getColorAsync(img)
        .then((color) => {
          const transparentColor = color.rgba.replace("rgb", "rgba").replace(")", ", 0.7)");
          setBgColor(transparentColor);
          localStorage.setItem("cardBgColor", transparentColor);
        })
        .catch(() => {
          setBgColor("rgba(0,0,0,0.6)");
        });
    }
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Mini Stat Kaarten */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProfileMiniStatCard title="Games Played" value="120" icon="🎮" />
        <ProfileMiniStatCard title="Total Wins" value="95" icon="🏆" />
        <ProfileMiniStatCard title="Current Rank" value="Gold" icon="⭐" />
        <ProfileMiniStatCard title="Highest Score" value="9875" icon="🔥" />
      </div>

      {/* Info Card rechts */}
      <div>
        <ProfileInfoCard info={userInfo} bgColor={bgColor} />
      </div>

      {/* Score Chart onderaan */}
      <div className="lg:col-span-3">
        <ScoreChart />
      </div>
    </div>
  );
}
