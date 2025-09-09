import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useBannerColor } from "../../context/ColorContext";

// Klein hulpfunctietje om kleur te tweaken
function adjust(hex: string, amt: number) {
  const [r, g, b] = hex.replace(/^#/, "").match(/.{1,2}/g)!.map((h) => parseInt(h, 16));
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const nr = clamp(r + amt), ng = clamp(g + amt), nb = clamp(b + amt);
  return `#${nr.toString(16).padStart(2, "0")}${ng.toString(16).padStart(2, "0")}${nb
    .toString(16)
    .padStart(2, "0")}`;
}

const data = [
  { name: "W1", score: 820 },
  { name: "W2", score: 940 },
  { name: "W3", score: 1040 },
  { name: "W4", score: 1180 },
  { name: "W5", score: 1260 },
  { name: "W6", score: 1320 },
  { name: "W7", score: 1450 },
];

const ProfileGraph: React.FC = () => {
  const { bannerColor } = useBannerColor();

  // Thema-afgeleiden
  const bg = bannerColor;                // kaartkleur
  const axis = adjust(bannerColor, 90);  // assen/labels
  const grid = adjust(bannerColor, 70);  // hulplijnen/tooltip-border
  const line = adjust(bannerColor, 140); // lijnkleur
  const dotFill = adjust(bannerColor, 160);

  return (
    <div
      className="rounded-2xl shadow p-6 border text-white"
      style={{
        backgroundColor: bg,
        borderColor: "rgba(255,255,255,0.12)",
      }}
    >
      <h3 className="text-lg font-semibold mb-4">Scoreverloop dit seizoen</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke={axis} />
          <YAxis stroke={axis} />
          <Tooltip
            contentStyle={{
              background: adjust(bannerColor, -10),
              border: `1px solid ${grid}`,
              color: "#fff",
            }}
            itemStyle={{ color: "#fff" }}
            labelStyle={{ color: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke={line}
            strokeWidth={2.5}
            dot={{ r: 4, stroke: "#fff", strokeWidth: 1, fill: dotFill }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfileGraph;
