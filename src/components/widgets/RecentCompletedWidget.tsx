// src/components/widgets/RecentCompletedWidget.tsx
import React, { useEffect, useState } from "react";

type RecentItem = {
  userId: number | null;
  username: string;
  gameTitle: string;
  completedDate: string; // 'YYYY-MM-DD' of ISO
  score?: number | null; // aanwezig in API, maar we tonen 'm niet
};

function formatDate(s: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toISOString().slice(0, 10);
}

export default function RecentCompletedWidget() {
  const [items, setItems] = useState<RecentItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setError(null);
        setItems(null);
        const res = await fetch(`/api/games/recent?limit=5`, { signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setItems(Array.isArray(json?.items) ? (json.items as RecentItem[]) : []);
      } catch (e: any) {
        if (e?.name !== "AbortError") setError(e?.message ?? "Kon data niet laden");
      }
    })();
    return () => ac.abort();
  }, []);

  if (error) return <div className="text-sm">Error: {error}</div>;
  if (!items) return <div className="text-sm">Laden…</div>;
  if (items.length === 0) return <div className="text-sm">Geen recente completions</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            <th className="py-2 pr-3">Speler</th>
            <th className="py-2 pr-3">Titel</th>
            <th className="py-2 pr-0">Datum</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r, i) => (
            <tr key={`${r.username}-${r.gameTitle}-${i}`}>
              <td className="py-2 pr-3">{r.username}</td>
              <td className="py-2 pr-3">{r.gameTitle}</td>
              <td className="py-2 pr-0">{formatDate(r.completedDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
