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

const generateStaticData = (filter) => {
  const now = new Date();
  let labels = [], data = [];

  if (filter === "1D") {
    labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    data = labels.map(() => 100 + Math.random() * 5);
  } else {
    const days = { "1W": 7, "1M": 30, "3M": 90, "6M": 180 }[filter] || 30;
    labels = Array.from({ length: days + 1 }, (_, i) => {
      let date = new Date();
      date.setDate(now.getDate() - (days - i));
      return date.toISOString().split("T")[0];
    });
    data = labels.map(() => 100 + Math.random() * 10);
  }

  return labels.map((date, index) => ({ date, close: data[index] }));
};

const StockTrendChart = ({ stockData = [], static: isStatic = false, filter = "1M" }) => {
  const processedStockData = isStatic ? generateStaticData(filter) : stockData;

  if (!processedStockData || processedStockData.length === 0) {
    return <p>No stock data available</p>;
  }

  const labels = processedStockData.map((item) => item.date.split(" ")[0]);
  const closePrices = processedStockData.map((item) => item.close);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Trend",
        data: closePrices,
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
