import { useContext, useEffect, useState } from "react";
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
import { DarkModeContext } from "../Contexts/DarkModeProvider";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
);

const StockTrendChart = ({
  stockData = [],
  static: isStatic = false,
  filter = "1M",
}) => {
  const [chartData, setChartData] = useState({ labels: [], closePrices: [] });
  const { darkModeEnabled, chartRef } = useContext(DarkModeContext);
  useEffect(() => {
    if (!stockData || !stockData.results || stockData.results.length === 0) {
      return;
    }

    // Extract labels & prices
    const labels = stockData.results.map((entry) => {
      const dateObj = new Date(entry.t);
      return filter === "1D"
        ? `${dateObj.getHours().toString().padStart(2, "0")}:${dateObj
            .getMinutes()
            .toString()
            .padStart(2, "0")}`
        : dateObj.toISOString().split("T")[0];
    });

    const closePrices = stockData.results.map((entry) => entry.c);

    setChartData({ labels, closePrices });
  }, [stockData, filter]);

  if (chartData.labels.length === 0) {
    return <p>No stock data available</p>;
  }

  const totalDuration = 4000;
  const delayBetweenPoints = totalDuration / chartData.labels.length;

  const previousY = (ctx) =>
    ctx.index === 0
      ? ctx?.chart?.scales?.y?.getPixelForValue(100)
      : ctx?.chart
          ?.getDatasetMeta(ctx?.datasetIndex)
          ?.data?.[ctx?.index - 1]?.getProps(["y"], true)?.y;

  const animation = {
    x: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: NaN,
      delay(ctx) {
        if (ctx.type !== "data" || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
    y: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== "data" || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
  };

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Stock Trend",
        data: chartData.closePrices,
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
    animation: animation,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        mode: "nearest",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: darkModeEnabled ? "#fff" : "#000" },
      },
      y: {
        grid: { display: false },
        ticks: { color: darkModeEnabled ? "#fff" : "#000" },
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
