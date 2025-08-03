// src/components/profile/ProfileHeader.tsx

import React, { useState } from "react";
import { Youtube, Twitch, Settings } from "lucide-react";
import BannerSelector from "./BannerSelector";

type ProfileHeaderProps = {
  totalGames: number;
  winRate: string;
  lossRate: string;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  totalGames,
  winRate,
  lossRate,
}) => {
  const [showBannerSelector, setShowBannerSelector] = useState(false);

const availableBanners = [
  { file: "blue2.png", label: "Ocean Blue" },
  { file: "gray.png", label: "Shadow Gray" },
  { file: "green.png", label: "Forest Green" },
  { file: "green2.png", label: "Emerald" },
  { file: "Purple.png", label: "Royal Purple" },
  { file: "yellow.png", label: "Golden Hour" },
  { file: "Blue3.png", label: "Dark blue" },
  { file: "DarkGray.png", label: "Black & White" },
  { file: "Orange.png", label: "Sunset" },
  { file: "Orange2.png", label: "Evening Glow" },
  { file: "Red.png", label: "Intense Red" },
  { file: "Yellow2.png", label: "Yellow" }
];


  const handleBannerSelect = (banner: string) => {
    localStorage.setItem("selectedBanner", banner);
    window.location.reload();
  };

  return (
    <div>
      <div
        className="w-full rounded-2xl shadow-md backdrop-blur-md px-6 py-3 flex items-center justify-between"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          color: "#fff",
        }}
      >
        <div className="flex items-center space-x-6 text-sm">
          <div className="text-center">
            <div className="text-gray-300">Total Game</div>
            <div className="text-lg font-bold">{totalGames}</div>
          </div>

          <div className="w-px h-8 bg-gray-300 opacity-30" />

          <div className="text-center">
            <div className="text-gray-300">Win</div>
            <div className="text-lg font-bold">{winRate}</div>
          </div>

          <div className="w-px h-8 bg-gray-300 opacity-30" />

          <div className="text-center">
            <div className="text-gray-300">Loss</div>
            <div className="text-lg font-bold">{lossRate}</div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <a
            href="https://twitch.tv/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitch className="w-6 h-6 text-white hover:text-purple-400 transition" />
          </a>

          <div className="w-px h-6 bg-gray-300 opacity-30" />

          <a
            href="https://youtube.com/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Youtube className="w-6 h-6 text-white hover:text-red-500 transition" />
          </a>

          <div className="w-px h-6 bg-gray-300 opacity-30" />

          <button
            onClick={() => setShowBannerSelector((prev) => !prev)}
            title="Kies banner"
          >
            <Settings className="w-6 h-6 text-white hover:text-sky-400 transition" />
          </button>
        </div>
      </div>

      {showBannerSelector && (
        <div className="mt-4 w-full">
          <BannerSelector banners={availableBanners} onSelect={handleBannerSelect} />
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
