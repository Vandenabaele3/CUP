// src/pages/MyGames.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useBannerColor } from "../context/ColorContext";
import CompleteGameWizard from "../components/Wizards/CompleteGameWizard";

type ApiItem = {
  title: string;
  completionDate: string;
  score: number | null;
  isDlc: boolean;
};

type ApiResponse = {
  items: ApiItem [];
  total: number;
  page: number;
  pageSize: number;
};

const ITEMS_PER_PAGE = 7;

const MyGames: React.FC = () => {
  const { bannerColor } = useBannerColor();
  const [page, setPage] = useState(1);
  const [showCompleteWizard, setShowCompleteWizard] = useState(false);
  const [items, setItems] = useState<ApiItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / ITEMS_PER_PAGE)),
    [total]
  );

  useEffect(() => {
    let abort = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          page: String(page),
          pageSize: String(ITEMS_PER_PAGE),
        });

        const devUserId = import.meta.env.VITE_DEV_USER_ID as string | undefined;
        if (devUserId) params.set("userId", devUserId);

        const res = await fetch(`/api/games/completed/my?${params.toString()}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: ApiResponse = await res.json();
        if (!abort) {
          setItems(data.items || []);
          setTotal(data.total || 0);
        }
      } catch (e: any) {
        if (!abort) {
          setError(e?.message || "Failed to load");
          setItems([]);
          setTotal(0);
        }
      } finally {
        if (!abort) setLoading(false);
      }
    }
    load();
    return () => {
      abort = true;
    };
  }, [page]);

  return (
    <div className="w-full px-0 pt-6 pb-10">
      <div
        className="w-full p-4 rounded-xl shadow-md border border-white/10"
        style={{ backgroundColor: bannerColor }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Completed Games</h2>
          <button
            className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1 rounded-lg flex items-center"
            onClick={() => setShowCompleteWizard(true)}
          >
            <span className="text-lg mr-1">+</span> Complete Game
          </button>
        </div>

        <div className="space-y-2">
          {loading && (
            <div className="p-4 rounded-lg bg-white/5 text-white/60">
              Loading...
            </div>
          )}

          {!loading && error && (
            <div className="p-4 rounded-lg bg-red-500/20 text-red-200">
              {error}
            </div>
          )}

          {!loading && !error && items.length === 0 && (
            <div className="p-4 rounded-lg bg-white/5 text-white/60">
              No completed games found.
            </div>
          )}

          {!loading &&
            !error &&
            items.map((game, idx) => {
              const rowNumber = (page - 1) * ITEMS_PER_PAGE + idx + 1;
              return (
                <div
                  key={`${game.title}-${game.completionDate}-${rowNumber}`}
                  className={`flex justify-between items-center p-4 rounded-lg transition
                    ${game.isDlc ? "bg-white/10 border border-yellow-400/30" : "bg-white/5 hover:bg-white/10"}`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border
                      ${game.isDlc
                        ? "text-yellow-300/80 border-yellow-400/40 bg-yellow-400/10"
                        : "text-white/60 border-white/20 bg-white/10"}`}
                    >
                      {rowNumber}
                    </div>
                    <div>
                      <div className="font-semibold text-white flex items-center gap-2">
                        <span>{game.title}</span>
                        {game.isDlc && (
                          <span className="px-2 py-0.5 text-[10px] rounded-full border border-yellow-400/50 text-yellow-200/90 bg-yellow-400/10 uppercase tracking-wider">
                            DLC
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-white/60">
                        Completed on {game.completionDate.slice(0, 10)}
                      </div>
                    </div>
                  </div>
                  <div className="text-white font-semibold text-sm">
                    Score: {game.score ?? "—"}
                  </div>
                </div>
              );
            })}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-end mt-4 text-sm text-white/60 items-center space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1 || loading}
              className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 transition disabled:opacity-30"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages || loading}
              className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 transition disabled:opacity-30"
            >
              Next
            </button>
          </div>
        )}
      </div>

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
