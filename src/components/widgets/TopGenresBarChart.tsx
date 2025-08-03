import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type GenreData = {
  genre: string;
  count: number;
};

type TopGenresBarChartProps = {
  data: GenreData[];
};

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff6f61", "#6a5acd"];

const TopGenresBarChart: React.FC<TopGenresBarChartProps> = ({ data }) => {
  const topGenres = data
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="bg-muted p-3 rounded-md shadow-sm text-sm">
      <p className="text-muted-foreground mb-2">Top 5 genres</p>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={topGenres} layout="vertical">
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="genre" width={80} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8">
            {topGenres.map((_, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopGenresBarChart;
