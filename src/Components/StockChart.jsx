import { useContext } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import { DarkModeContext } from "../Contexts/DarkModeProvider";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title);

const StockChart = ({ labels = [], datasets = [] }) => {
  const { darkModeEnabled } = useContext(DarkModeContext);

  console.log("Labels:", labels);
  console.log("Datasets:", datasets);

  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: dataset.borderColor || "#00E396",
      backgroundColor: dataset.borderColor || "#00E396",
      borderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      tension: 0.4, // Smooth curves
    })),
  };

  const totalDuration = 2000;
  const delayBetweenPoints = labels.length ? totalDuration / labels.length : 2000;

  const previousY = (ctx) => {
    if (!ctx.chart || ctx.index === 0) {
      return ctx.chart?.scales?.y?.getPixelForValue(100) || 100;
    }
    const prevPoint = ctx.chart.getDatasetMeta(ctx.datasetIndex)?.data[ctx.index - 1];
    return prevPoint ? prevPoint.getProps(["y"], true).y : 100;
  };

  const animation = {
    x: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: NaN,
      delay(ctx) {
        if (ctx.type !== "data" || ctx.xStarted) return 0;
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
        if (ctx.type !== "data" || ctx.yStarted) return 0;
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
  };

  const options = {
    animation,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: darkModeEnabled ? "#333" : "#fff",
        titleColor: darkModeEnabled ? "#fff" : "#000",
        bodyColor: darkModeEnabled ? "#fff" : "#000",
      },
    },
    scales: {
      x: {
        ticks: { color: darkModeEnabled ? "#fff" : "#000" },
        grid: { color: darkModeEnabled ? "#444" : "#ddd" },
      },
      y: {
        ticks: { color: darkModeEnabled ? "#fff" : "#000" },
        grid: { color: darkModeEnabled ? "#444" : "#ddd", borderDash: [5, 5] },
      },
    },
  };

  return <Line data={data} options={options} />;
};

// Prop Validation
StockChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  datasets: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.number).isRequired,
      borderColor: PropTypes.string,
    })
  ).isRequired,
};

export default StockChart;
