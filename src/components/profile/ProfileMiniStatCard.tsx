import React from "react";

export type ProfileMiniStatCardProps = {
  title: string;
  value: string;
  icon: string;
};

export default function ProfileMiniStatCard({ title, value, icon }: ProfileMiniStatCardProps) {
  return (
    <div className="rounded-xl shadow-md p-4 bg-gray-800 text-white flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  );
}
