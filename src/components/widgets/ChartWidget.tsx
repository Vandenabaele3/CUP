import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type DataPoint = {
  name: string;
  value: number;
};

type ChartWidgetProps = {
  data: DataPoint[];
  color?: string;
};

export default function ChartWidget({ data, color = "#5885AF" }: ChartWidgetProps) {
  return (
    <div className="p-4 w-full min-w-[400px] h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
        >
          <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis width={25} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
