// src/components/profile/ProfileStatsHeader.tsx
import React from "react";

interface ProfileStatsHeaderProps {
  name: string;
  username: string;
}

const ProfileStatsHeader: React.FC<ProfileStatsHeaderProps> = ({ name }) => {
  return (
    <div className="text-center mt-4">
      <h1 className="text-sm text-gray-400">@{name}</h1>
    </div>
  );
};

export default ProfileStatsHeader;
