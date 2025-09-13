// src/components/widgets/ScoreChart.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type ApiRow = {
  userId?: number;
  username?: string;
  date?: string;   // YYYY-MM-DD
  value?: unknown; // per-game score (number of string-nummer)
};

type ScoreDataPoint = {
  date: string;
  [player: string]: string | number;
};

const COLORS = ["#8ab4ff", "#7ee787", "#f9e2af", "#ff7b72", "#c3a6ff"];

// helpers
const isValidDate = (s: unknown) =>
  typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);

const toNumber = (v: unknown): number | null => {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  return Number.isFinite(n) ? n : null;
};

export default function ScoreChart() {
  const [rows, setRows] = useState<ApiRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // haal per-game punten op
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setError(null);
        const res = await fetch("/api/leaderboard/game-points", { signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const items = Array.isArray(json?.items) ? (json.items as ApiRow[]) : [];
        setRows(items);
      } catch (e: any) {
        if (e?.name !== "AbortError") setError(e?.message ?? "Kon data niet laden");
      }
    })();
    return () => ac.abort();
  }, []);

  // normaliseer naar recharts-formaat
  const { data, playerNames, warn } = useMemo(() => {
    if (!rows || rows.length === 0) {
      return { data: [] as ScoreDataPoint[], playerNames: [] as string[], warn: null as string | null };
    }

    const byDate = new Map<string, ScoreDataPoint>();
    const players = new Set<string>();
    let invalidCount = 0;

    for (const r of rows) {
      if (!isValidDate(r.date)) { invalidCount++; continue; }
      const val = toNumber(r.value);
      if (val === null) { invalidCount++; continue; }

      const uname =
        (r.username && r.username.trim()) ||
        (typeof r.userId === "number" ? `user-${r.userId}` : null);
      if (!uname) { invalidCount++; continue; }

      players.add(uname);
      if (!byDate.has(r.date!)) byDate.set(r.date!, { date: r.date! });

      const bucket = byDate.get(r.date!)!;
      const current = typeof bucket[uname] === "number" ? (bucket[uname] as number) : 0;
      bucket[uname] = current + val; // som per dag/speler
    }

    // sorteer datapunten op datum
    const data = Array.from(byDate.values()).sort((a, b) =>
      (a.date as string).localeCompare(b.date as string)
    );
    const playerNames = Array.from(players).sort((a, b) => a.localeCompare(b));

    // VUL MISSENDE SPELERS OP MET 0 PER DATUM
    // Zo worden lijnen niet meer onderbroken wanneer een speler die dag geen score had.
    for (const dp of data) {
      for (const p of playerNames) {
        if (typeof dp[p] !== "number") dp[p] = 0;
      }
    }

    const warn =
      invalidCount > 0 && data.length === 0
        ? "Endpoint levert geen geldige per-game data (verwacht velden: userId/username, date, value)."
        : null;

    return { data, playerNames, warn };
  }, [rows]);

  if (error) {
    return <div className="bg-muted p-3 rounded-md shadow-sm text-sm">Error: {error}</div>;
  }
  if (!rows) {
    return <div className="bg-muted p-3 rounded-md shadow-sm text-sm">Laden…</div>;
  }
  if (data.length === 0) {
    return (
      <div className="bg-muted p-3 rounded-md shadow-sm text-sm">
        <div>{warn ?? "Geen data"}</div>
      </div>
    );
  }

  return (
    <div className="bg-muted p-3 rounded-md shadow-sm text-sm">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.25)" strokeDasharray="4 4" />

          <XAxis
            dataKey="date"
            stroke="#fff"
            tick={{ fill: "#fff", fontSize: 12 }}
            axisLine={{ stroke: "rgba(255,255,255,0.5)" }}
            tickLine={{ stroke: "rgba(255,255,255,0.3)" }}
          />

          <YAxis
            stroke="#fff"
            tick={{ fill: "#fff", fontSize: 12 }}
            axisLine={{ stroke: "rgba(255,255,255,0.5)" }}
            tickLine={{ stroke: "rgba(255,255,255,0.3)" }}
          />

          <Tooltip
            contentStyle={{
              background: "rgba(0,0,0,0.85)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
            }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#fff" }}
          />

          <Legend wrapperStyle={{ color: "#fff" }} />

          {playerNames.map((player, index) => (
            <Line
              key={`${player}-${index}`}
              type="monotone"
              dataKey={player}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              connectNulls={true} // extra veiligheid als er toch nulls zouden binnensluipen
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
