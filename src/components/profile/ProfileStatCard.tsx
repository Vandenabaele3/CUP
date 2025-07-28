import React from "react";

interface Props {
  label: string;
  value: string;
  bgColor: string;
}

const ProfileStatCard: React.FC<Props> = ({ label, value, bgColor }) => {
  return (
    <div
      className="rounded-xl px-6 py-4 shadow-inner text-white"
      style={{ backgroundColor: bgColor }}
    >
      <div className="text-xs uppercase tracking-wider font-semibold opacity-80">
        {label}
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
};

export default ProfileStatCard;
