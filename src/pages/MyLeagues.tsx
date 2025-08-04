import React, { useState } from "react";
import { useBannerColor } from "../context/ColorContext";

const mockLeagues = Array.from({ length: 25 }).map((_, i) => {
  const startDate = new Date(Date.now() - i * 86400000 * 7); // elke league 7 dagen vroeger gestart
  const endDate = new Date(startDate.getTime() + 86400000 * 30); // elke league duurt 30 dagen
  const daysLeft = Math.max(
    0,
    Math.ceil((endDate.getTime() - Date.now()) / 86400000)
  );

  return {
    id: `${i + 1}`,
    name: `League ${i + 1}`,
    started: startDate.toISOString().split("T")[0],
    daysLeft,
  };
});

const ITEMS_PER_PAGE = 5;

const MyLeagues: React.FC = () => {
  const { bannerColor } = useBannerColor();
  const [page, setPage] = useState(1);

  const paginatedLeagues = mockLeagues.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(mockLeagues.length / ITEMS_PER_PAGE);

  return (
    <div className="w-full px-0 pt-6 pb-10">
      <div
        className="w-full p-4 rounded-xl shadow-md border border-white/10"
        style={{ backgroundColor: bannerColor }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">My Leagues</h2>
          <button className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1 rounded-lg flex items-center">
            <span className="text-lg mr-1">+</span> Join New League
          </button>
        </div>

        <div className="space-y-2">
          {paginatedLeagues.map((league) => (
            <div
              key={league.id}
              className="flex justify-between items-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm text-white/60 font-bold border border-white/20">
                  {league.name.split(" ")[1]}
                </div>
                <div>
                  <div className="font-semibold text-white">{league.name}</div>
                  <div className="text-sm text-white/60">
                    Started on {league.started}
                  </div>
                </div>
              </div>
              <div className="text-white font-semibold text-sm">
                Days left: {league.daysLeft}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4 text-sm text-white/60 items-center space-x-2">
          <button
            className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 transition disabled:opacity-30"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 transition disabled:opacity-30"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyLeagues;
