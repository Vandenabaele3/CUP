import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import ProfileBanner from "../components/profile/ProfileBanner";
import ProfilePicture from "../components/profile/ProfilePicture";
import ProfileStatsHeader from "../components/profile/ProfileStatsHeader";
import ProfileHeader from "../components/profile/ProfileHeader";
import { FastAverageColor } from "fast-average-color";
import avatar from "../images/avatar.jpg";
import banner from "../images/Purple.png";
import { useSetBannerColor } from "../context/ColorContext";

// 🔧 Helper om kleur lichter of donkerder te maken
function adjustColor(hex: string, amount: number) {
  let [r, g, b] = hex
    .replace(/^#/, "")
    .match(/.{1,2}/g)!
    .map((x) => parseInt(x, 16));

  r = Math.max(0, Math.min(255, r + amount));
  g = Math.max(0, Math.min(255, g + amount));
  b = Math.max(0, Math.min(255, b + amount));

  return `rgb(${r}, ${g}, ${b})`;
}

export default function MainLayout() {
  const [bgColor, setBgColor] = useState("white");
  const [menuColor, setMenuColor] = useState("rgba(0, 0, 0, 0.2)");
  const { setBannerColor } = useSetBannerColor();

  const profileData = {
    name: "John Doe",
    username: "johndoe42",
    imageUrl: avatar,
    bannerUrl: banner,
  };

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = banner;

    img.onload = () => {
      const fac = new FastAverageColor();
      const color = fac.getColor(img);
      const hex = color.hex;

      const lighter = adjustColor(hex, +75);
      const darker = adjustColor(hex, -5);

      setBgColor(lighter);
      setMenuColor(darker);
      setBannerColor(darker);

      document.body.style.backgroundColor = lighter;
      document.body.style.backgroundImage =
        "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 0)";
      document.body.style.backgroundSize = "30px 30px";
    };
  }, [setBannerColor]);

  return (
    <div className="flex min-h-screen relative overflow-hidden">
      <Sidebar bgColor={menuColor} />

      <main
        className="flex-grow overflow-y-auto min-h-screen"
        style={{
          backgroundColor: bgColor,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 0)",
          backgroundSize: "30px 30px",
        }}
      >
        <div className="relative px-4 md:px-8 max-w-[1600px] mx-auto">
          <ProfileBanner url={profileData.bannerUrl} />
          <div className="absolute top-[2.0rem] left-1/2 transform -translate-x-1/2 z-20">
            <ProfilePicture url={profileData.imageUrl} />
          </div>
          <div className="absolute top-[8.5rem] left-1/2 transform -translate-x-1/2 z-20">
            <ProfileStatsHeader
              name={profileData.name}
              username={profileData.username}
            />
          </div>
        </div>

        <div className="-mt-5 z-10 relative px-4 md:px-8 max-w-[1600px] mx-auto">
          <ProfileHeader totalGames={1956} winRate="85%" lossRate="25%" />
        </div>

        <div className="px-4 md:px-8 max-w-[1600px] mx-auto pb-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
