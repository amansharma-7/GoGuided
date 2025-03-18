import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import React, { memo } from "react";

const COLORS = [
  "#065f46",
  "#047857",
  "#059669",
  "#10b981",
  "#34d399",
  "#6ee7b7",
];

const ChartSection = ({ data }) => {
  const showLineChart = data.length > 2;

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Bar Chart */}
      <div className=" shadow-black/50 p-4 rounded-md border border-green-200 shadow-sm flex flex-col items-center">
        <h3 className="text-green-900 font-bold mb-2">Performance Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="shadow-black/50 p-4 rounded-md border border-green-200 shadow-sm flex flex-col items-center">
        <h3 className="text-green-900 font-bold mb-2">Category Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={70}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}

      {/* <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
        <h3 className="text-green-900 font-bold mb-2">Trends Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#34d399"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
};

export default memo(ChartSection);
