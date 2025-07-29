// src/components/profile/ProfileBanner.tsx
import React from "react";

interface ProfileBannerProps {
  url: string;
}

const ProfileBanner: React.FC<ProfileBannerProps> = ({ url }) => {
  return (
    <div
      className="w-full h-36 rounded-t-2xl rounded-b-2xl overflow-hidden shadow-md"
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "right center",
      }}
    />
  );
};

export default ProfileBanner;
