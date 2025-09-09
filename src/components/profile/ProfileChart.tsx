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

const data = [
  { name: "W1", score: 820 },
  { name: "W2", score: 940 },
  { name: "W3", score: 1040 },
  { name: "W4", score: 1180 },
  { name: "W5", score: 1260 },
  { name: "W6", score: 1320 },
  { name: "W7", score: 1450 },
];

const ProfileChart: React.FC = () => {
  const { bannerColor } = useBannerColor();

  return (
    <div
      className="rounded-2xl shadow p-6 border text-white"
      style={{
        backgroundColor: bannerColor,
        borderColor: "rgba(255,255,255,0.12)",
      }}
    >
      <h3 className="text-lg font-semibold mb-4">Score Progress</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
          <YAxis stroke="rgba(255,255,255,0.4)" />
          <Tooltip
            contentStyle={{
              background: "rgba(20,20,20,0.9)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfileChart;
