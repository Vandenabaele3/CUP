import React from "react";
import twitchIcon from "../../images/twitch3.png";
import youtubeIcon from "../../images/youtube4.png"; // hernoem nieuwe bestand naar dit

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
  return (
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
          <img src={twitchIcon} alt="Twitch" className="w-8 h-8" />
        </a>

        <div className="w-px h-6 bg-gray-300 opacity-30" />

        <a
          href="https://youtube.com/yourchannel"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={youtubeIcon} alt="YouTube" className="w-12 h-12 object-contain" />
        </a>
      </div>
    </div>
  );
};

export default ProfileHeader;
