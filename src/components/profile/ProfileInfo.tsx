// components/profile/ProfileInfo.tsx
import React from "react";

const ProfileInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Profielgegevens</h3>
      <div className="text-sm space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-500">Email</span>
          <span>chetfaker@cup.com</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Team</span>
          <span>Creative Tim</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Locatie</span>
          <span>Belgium</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Data gebruikt</span>
          <span>2GB</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
