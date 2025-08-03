import React from "react";

interface ProfileMiniStatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
  bgColor?: string;
}

const ProfileMiniStatCard: React.FC<ProfileMiniStatCardProps> = ({
  title,
  value,
  icon,
  className = "",
  bgColor = "#0B2545",
}) => {
  return (
    <div
      className={`rounded-2xl p-3 flex flex-col items-center justify-between text-white text-center min-h-[160px] ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex items-center gap-2 text-base font-semibold text-gray-200 mb-2">
        <span className="text-2xl">{icon}</span>
        <span>{title}</span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-4xl font-bold">{value}</div>
      </div>
    </div>
  );
};

export default ProfileMiniStatCard;
