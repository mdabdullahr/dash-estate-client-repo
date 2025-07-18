import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";

// Triangle Shape Function
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
          ${x + width / 2},${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
    y + height
  }
          ${x + width},${y + height} Z`;
};

// Triangle Shape Component
const TriangleBar = ({ fill, x, y, width, height }) => {
  return <path d={getPath(x, y, width, height)} fill={fill} stroke="none" />;
};

// Bar Colors
const COLORS = ["#3B82F6", "#F97316", "#14203e"]; // Blue, Green, Amber

// Main Chart Component
const PhaiChart = ({ pieChartData }) => {
  return (
    <div className="w-full h-[500px] bg-white mt-10">
      <h3 className="text-xl font-semibold mb-4">📊 Activity Summary</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={pieChartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar
            dataKey="value"
            shape={<TriangleBar />}
            label={{ position: "top", fill: "#333", fontSize: 12 }}
          >
            {pieChartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PhaiChart;
