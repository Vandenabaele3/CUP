// src/pages/MyGames.tsx

import React, { useState } from "react";
import { useBannerColor } from "../context/ColorContext";
import CompleteGameWizard from "../components/Wizards/CompleteGameWizard";

interface Game {
  id: number;
  name: string;
  playedOn: string;
  score: number;
}

const ITEMS_PER_PAGE = 5;

const dummyGames: Game[] = Array.from({ length: 123 }, (_, i) => ({
  id: i + 1,
  name: `Game ${i + 1}`,
  playedOn: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
  score: Math.floor(Math.random() * 50) + 50,
}));

const MyGames: React.FC = () => {
  const { bannerColor } = useBannerColor();
  const [page, setPage] = useState(1);
  const [showCompleteWizard, setShowCompleteWizard] = useState(false);

  const sortedGames = [...dummyGames].sort(
    (a, b) => new Date(b.playedOn).getTime() - new Date(a.playedOn).getTime()
  );

  const paginatedGames = sortedGames.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(dummyGames.length / ITEMS_PER_PAGE);

  return (
    <div className="w-full px-0 pt-6 pb-10">
      <div
        className="w-full p-4 rounded-xl shadow-md border border-white/10"
        style={{ backgroundColor: bannerColor }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">My Played Games</h2>
          <button
            className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1 rounded-lg flex items-center"
            onClick={() => setShowCompleteWizard(true)}
          >
            <span className="text-lg mr-1">+</span> Complete Game
          </button>
        </div>

        <div className="space-y-2">
          {paginatedGames.map((game) => (
            <div
              key={game.id}
              className="flex justify-between items-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm text-white/60 font-bold border border-white/20">
                  {game.id}
                </div>
                <div>
                  <div className="font-semibold text-white">{game.name}</div>
                  <div className="text-sm text-white/60">
                    Completed on {game.playedOn}
                  </div>
                </div>
              </div>
              <div className="text-white font-semibold text-sm">
                Score: {game.score}
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-end mt-4 text-sm text-white/60 items-center space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 transition disabled:opacity-30"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 transition disabled:opacity-30"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* ✅ Wizard tonen als modal */}
      {showCompleteWizard && (
        <CompleteGameWizard
          open={showCompleteWizard}
          onClose={() => setShowCompleteWizard(false)}
        />
      )}
    </div>
  );
};

export default MyGames;
