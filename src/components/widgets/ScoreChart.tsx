import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type ScoreDataPoint = {
  date: string;
  [player: string]: string | number;
};

type ScoreChartProps = {
  data: ScoreDataPoint[];
};

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff6f61", "#6a5acd"];

const ScoreChart: React.FC<ScoreChartProps> = ({ data }) => {
  const playerNames = Object.keys(data[0] || {}).filter((key) => key !== "date");

  return (
    <div className="bg-muted p-3 rounded-md shadow-sm text-sm">
      <p className="text-muted-foreground mb-2">Scoreverloop</p>
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {playerNames.map((player, index) => (
            <Line
              key={player}
              type="monotone"
              dataKey={player}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreChart;
