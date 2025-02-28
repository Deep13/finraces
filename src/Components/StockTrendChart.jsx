import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

const StockTrendChart = ({ stockData=[
  { "date": "2025-02-27 00:00:00", "close": 281.95 },
  { "date": "2025-02-26 00:00:00", "close": 290.8 },
  { "date": "2025-02-25 00:00:00", "close": 302.8 },
  { "date": "2025-02-24 00:00:00", "close": 330.53 },
  { "date": "2025-02-21 00:00:00", "close": 337.8 },
  { "date": "2025-02-20 00:00:00", "close": 354.4 },
] }) => {
  if (!stockData || stockData.length === 0) {
    return <p>No stock data available</p>;
  }

  // Extract dates (formatted as Day and Date) and close prices
  const labels = stockData.map((item) => {
    const date = new Date(item.date);
    return date.toLocaleDateString("en-US", { weekday: "short", day: "numeric" });
  });

  const closePrices = stockData.map((item) => item.close);

  const data = {
    labels: labels.reverse(), // Reverse to get oldest to newest order
    datasets: [
      {
        label: "Stock Trend",
        data: closePrices.reverse(), // Reverse to match the labels
        borderColor: "#42A5F5",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(66, 165, 245, 0.5)");
          gradient.addColorStop(1, "rgba(66, 165, 245, 0)");
          return gradient;
        },
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#42A5F5",
        pointBorderColor: "#fff",
        fill: true,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#fff" },
      },
      y: {
        grid: { display: false },
        ticks: { color: "#fff" },
      },
    },
  };

  return (
    <div className="bg-transparent p-4 rounded-2xl w-full h-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default StockTrendChart;
