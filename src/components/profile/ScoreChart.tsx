// components/profile/ScoreChart.tsx
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

const ScoreChart: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Scoreverloop dit seizoen
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#999" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreChart;
