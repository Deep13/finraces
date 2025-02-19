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

const StockTrendChart = () => {
  const data = {
    labels: ["Mon 10", "Tues 11", "Weds 12", "Thurs 13", "Fri 14", "Sat 15"],
    datasets: [
      {
        label: "Stock Trend",
        data: [20, 35, 30, 25, 28, null], // Last value is null for the dashed prediction
        borderColor: "#42A5F5",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(66, 165, 245, 0.5)");
          gradient.addColorStop(1, "rgba(66, 165, 245, 0)");
          return gradient;
        },
        borderWidth: 2,
        pointRadius: (context) => (context.dataIndex === 4 ? 6 : 3), // Highlight Friday
        pointBackgroundColor: (context) =>
          context.dataIndex === 4 ? "#42A5F5" : "#fff",
        pointBorderColor: "#42A5F5",
        fill: true,
        tension: 0.4, // Smooth curve
      },
      {
        label: "Prediction",
        data: [null, null, null, null, 28, 27],
        borderColor: "#42A5F5",
        borderWidth: 2,
        borderDash: [5, 5], // Dashed line
        fill: false,
        tension: 0.4,
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
        grid: { display:false },
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
