import React from "react";

type Props = {
  url: string;
};

const ProfilePicture: React.FC<Props> = ({ url }) => {
  return (
    <div className="relative w-[110px] h-[110px] mx-auto mt 5 z-30">

      <div
        className="w-full h-full rounded-full border-[10px] border-yellow-400 shadow-xl"
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "0 0 30px #facc15, 0 0 40px #facc15",
        }}
      />
    </div>
  );
};

export default ProfilePicture;
