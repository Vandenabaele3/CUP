import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "W1", score: 820 },
  { name: "W2", score: 940 },
  { name: "W3", score: 1040 },
  { name: "W4", score: 1180 },
  { name: "W5", score: 1260 },
];

const ProfileChart: React.FC = () => {
  return (
    <div className="bg-white/5 backdrop-blur rounded-xl p-4 shadow border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">Scoreverloop dit seizoen</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1a1f2e", border: "none", color: "#fff" }}
            labelStyle={{ color: "#ccc" }}
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
