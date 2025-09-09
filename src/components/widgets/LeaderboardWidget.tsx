// src/components/widgets/LeaderboardWidget.tsx
import React, { useEffect, useState } from "react";

type LeaderItem = {
  rank: number;
  id: number | string;
  name: string;
  avatarUrl: string | null;
  score: number;
};

type ApiResponse = { items: LeaderItem[] };

export default function LeaderboardWidget({ endpoint = "/api/leaderboard" }: { endpoint?: string }) {
  const [items, setItems] = useState<LeaderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await fetch(endpoint, { credentials: "include" });
        if (!res.ok) throw new Error("Response not ok");
        const data: ApiResponse = await res.json();
        if (active) setItems(data.items ?? []);
      } catch {
        if (active) setErr("Kon leaderboard niet laden");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [endpoint]);

  if (loading) return <div className="text-sm text-gray-300">Laden…</div>;
  if (err) return <div className="text-sm text-red-300">{err}</div>;
  if (!items.length) return <div className="text-sm text-gray-300">Nog geen scores.</div>;

  return (
    <ol className="w-full">
      {items.map((p) => (
        <li
          key={p.id}
          className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
        >
          <div className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-white font-semibold tabular-nums">
            {p.rank}
          </div>
          <div className="h-8 w-8 overflow-hidden rounded-full bg-white/10 shrink-0">
            {p.avatarUrl ? (
              <img src={p.avatarUrl} alt={p.name} className="h-full w-full object-cover" />
            ) : null}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-white/90">{p.name}</div>
          </div>
          <div className="text-white font-semibold tabular-nums">{p.score}</div>
        </li>
      ))}
    </ol>
  );
}
