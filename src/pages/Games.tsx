import React from "react";
import ListWidget from "../components/widgets/ListWidget";
import { useBannerColor } from "../context/ColorContext";

const mockData = Array.from({ length: 60 }).map((_, i) => ({
  id: `${i + 1}`,
  text: `Game ${i + 1}`,
  created: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
  status: i % 2 === 0 ? "Actief" : "Inactief",
}));

const Games: React.FC = () => {
  const { bannerColor } = useBannerColor();

  return (
    <div className="w-full px-0 pt-6 pb-10">
      <div
        className="w-full p-4 rounded-xl shadow-md border border-white/10"
        style={{ backgroundColor: bannerColor }}
      >
        <ListWidget initialItems={mockData} itemsPerPage={10} />
      </div>
    </div>
  );
};

export default Games;
