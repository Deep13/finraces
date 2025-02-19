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

const StockTrendChartMini = ({ chartColor = "#82e85d" }) => {
  const data = {
    labels: ["Mon 10", "Tues 11", "Weds 12", "Thurs 13", "Fri 14", "Sat 15"],
    datasets: [
      {
        label: "Stock Trend",
        data: [20, 35, 30, 25, 28, null], // Last value is null for the dashed prediction
        borderColor: chartColor,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, `${chartColor}80`); // 80 = 50% opacity
          gradient.addColorStop(1, `${chartColor}00`); // 00 = 0% opacity
          return gradient;
        },
        borderWidth: 2,
        pointRadius: (context) => (context.dataIndex === 4 ? 6 : 3), // Highlight Friday
        pointBackgroundColor: (context) =>
          context.dataIndex === 4 ? chartColor : "#fff",
        pointBorderColor: chartColor,
        fill: true,
        tension: 0.4, // Smooth curve
      },
      {
        label: "Prediction",
        data: [null, null, null, null, 28, 27],
        borderColor: chartColor,
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
        ticks: { display: false },
      },
      y: {
        grid: { display: false },
        ticks: { display: false },
        border:{display:false}
      },
    },
  };

  return (
    <div className="p-4 rounded-2xl w-36 h-24 bg-transparent">
      <Line data={data} options={options} />
    </div>
  );
};

export default StockTrendChartMini;
