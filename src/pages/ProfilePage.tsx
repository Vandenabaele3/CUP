import React from "react";
import ProfileInfoCard from "../components/profile/ProfileInfoCard";
import ProfileMiniStatCard from "../components/profile/ProfileMiniStatCard";
import { useBannerColor } from "../context/ColorContext";
import {
  FaGamepad,
  FaTrophy,
  FaStar,
  FaFire,
  FaChartBar,
  FaUsers,
} from "react-icons/fa";

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
    <div className="w-full pt-6 pb-10">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Info Card links en breder */}
        <div className="lg:col-span-2">
          <ProfileInfoCard info={userInfo} bgColor={bannerColor} />
        </div>

        {/* Mini Stat Kaarten rechts in 2 kolommen x 3 rijen */}
        <div className="grid grid-cols-2 gap-4">
          <ProfileMiniStatCard
            title="Games played"
            value="120"
            icon={<FaGamepad className="text-white text-xl" />}
            bgColor={bannerColor}
          />
          <ProfileMiniStatCard
            title="CUPs won"
            value="95"
            icon={<FaTrophy className="text-white text-xl" />}
            bgColor={bannerColor}
          />
          <ProfileMiniStatCard
            title="Max CUP Score"
            value="9875"
            icon={<FaStar className="text-white text-xl" />}
            bgColor={bannerColor}
          />
          <ProfileMiniStatCard
            title="Current CUP"
            value="8760"
            icon={<FaFire className="text-white text-xl" />}
            bgColor={bannerColor}
          />
          <ProfileMiniStatCard
            title="Matches"
            value="215"
            icon={<FaChartBar className="text-white text-xl" />}
            bgColor={bannerColor}
          />
          <ProfileMiniStatCard
            title="Opponents"
            value="80"
            icon={<FaUsers className="text-white text-xl" />}
            bgColor={bannerColor}
          />
        </div>
      </div>
    </div>
  );
}
