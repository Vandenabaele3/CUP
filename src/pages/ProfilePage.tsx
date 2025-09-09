import React from "react";
import ProfileInfoCard from "../components/profile/ProfileInfoCard";
import ProfileMiniStatCard from "../components/profile/ProfileMiniStatCard";
import { useBannerColor } from "../context/ColorContext";
import { Gamepad2, Trophy, Star, Flame, BarChart3, Users } from "lucide-react";

export default function ProfilePage() {
  const { bannerColor } = useBannerColor();

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

  return (
    <div className="flex flex-col gap-6">
      {/* Info + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account info */}
        <div className="lg:col-span-2">
          <ProfileInfoCard info={userInfo} bgColor={bannerColor} />
        </div>

        {/* Mini stat cards */}
        <div className="grid grid-cols-2 gap-4">
          <ProfileMiniStatCard
            title="Games played"
            value="120"
            icon={<Gamepad2 className="text-white text-xl" />}
            bgColor={bannerColor}
          />
          <ProfileMiniStatCard
            title="CUPs won"
            value="95"
            icon={<Trophy className="text-white text-xl" />}
            bgColor={bannerColor}
          />
          <ProfileMiniStatCard
            title="Max CUP Score"
            value="9875"
            icon={<Star className="text-white text-xl" />}
            bgColor={bannerColor}
          />
          <ProfileMiniStatCard
            title="Current CUP"
            value="8760"
            icon={<Flame className="text-white text-xl" />}
            bgColor={bannerColor}
          />
          <ProfileMiniStatCard
            title="Matches"
            value="215"
            icon={<BarChart3 className="text-white text-xl" />}
            bgColor={bannerColor}
          />
          <ProfileMiniStatCard
            title="Opponents"
            value="80"
            icon={<Users className="text-white text-xl" />}
            bgColor={bannerColor}
          />
        </div>
      </div>
    </div>
  );
}
