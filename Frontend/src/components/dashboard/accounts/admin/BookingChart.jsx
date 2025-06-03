import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const statsData = [
  { name: "Jan", value: 34 },
  { name: "Feb", value: 28 },
  { name: "Mar", value: 45 },
  { name: "Apr", value: 50 },
  { name: "May", value: 60 },
  { name: "Jun", value: 55 },
  { name: "Jul", value: 70 },
  { name: "Aug", value: 85 },
  { name: "Sep", value: 78 },
  { name: "Oct", value: 65 },
  { name: "Nov", value: 48 },
  { name: "Dec", value: 40 },
];

function BookingChart() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-center items-center w-full">
      <h3 className="text-green-900 font-bold mb-4 text-center">
        Bookings Over Time
      </h3>

      <div className="w-full">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={statsData}>
            <XAxis dataKey="name" stroke="#065f46" tick={{ fill: "#065f46" }} />
            <YAxis stroke="#065f46" tick={{ fill: "#065f46" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#d1fae5",
                borderColor: "#065f46",
              }}
              itemStyle={{ color: "#065f46" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#34d399"
              strokeWidth={3}
              dot={{ fill: "#065f46", stroke: "#065f46", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BookingChart;
