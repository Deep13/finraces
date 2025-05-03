import { useContext, useMemo } from "react";
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
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  zoomPlugin
);

const transformToPercentage = (data) => {
  if (!Array.isArray(data) || data.length === 0) return [];
  const first = data[0];
  return data.map((val, idx) =>
    idx === 0 ? 0 : ((val - first) / first) * 100
  );
};



const StockChart = ({
  labels = [],
  datasets = [],
  area = false,
  disableAnimation = false,
}) => {
  const { darkModeEnabled, chartRef } = useContext(DarkModeContext);
  const totalDuration = 4000;
const delayBetweenPoints = totalDuration / labels.length;

console.log(labels,"check2")

const previousY = (ctx) =>
  ctx.index === 0
    ? ctx?.chart?.scales?.y?.getPixelForValue(100)
    : ctx?.chart?.getDatasetMeta(ctx?.datasetIndex)?.data?.[ctx?.index - 1]?.getProps(["y"], true)?.y;

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
    from:previousY,
    delay(ctx) {
      if (ctx.type !== "data" || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints;
    },
  },
};

  const transformedDatasets = useMemo(() => {
    return datasets.map((dataset) => ({
      ...dataset,
      data: transformToPercentage(dataset.data),
      fill: area,
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 0,
      tension: area ? 0.4 : 0,
      backgroundColor: area
        ? (ctx) => getGradient(ctx, dataset.borderColor || "#00E396")
        : dataset.borderColor || "#00E396",
    }));
  }, [datasets, area]);

  const getGradient = (ctx, borderColor) => {
    if (!ctx?.chart?.ctx) return borderColor;
    const chart = ctx.chart;
    const gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.height);
    gradient.addColorStop(0, `${borderColor}40`);
    gradient.addColorStop(1, `${borderColor}05`);
    return gradient;
  };

  const data = {
    labels,
    datasets: transformedDatasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: disableAnimation ? false : animation,
    scales: {
      x: {
        ticks: { color: darkModeEnabled ? "#fff" : "#000" },
        grid: { color: darkModeEnabled ? "#444" : "#ddd" },
      },
      y: {
        beginAtZero: true, // Start Y-axis at 0%
        ticks: {
          color: darkModeEnabled ? "#fff" : "#000",
          callback: (value) => `${value}%`, // Show % on Y-axis
        },
        grid: { color: darkModeEnabled ? "#444" : "#ddd", borderDash: [5, 5] },
      },
    },
    plugins: {
      legend: { display: labels.length>0? true:false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const val = context.parsed.y.toFixed(2);
            return `${context.dataset.label}: ${val}%`;
          },
        },
        backgroundColor: darkModeEnabled ? "#333" : "#fff",
        titleColor: darkModeEnabled ? "#fff" : "#000",
        bodyColor: darkModeEnabled ? "#fff" : "#000",
      },
      zoom: {
        pan: { enabled: true, mode: "xy" },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: "xy",
        },
      },
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 0,
      },
    },
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

StockChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string),
  datasets: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.number).isRequired,
      borderColor: PropTypes.string,
    })
  ),
  area: PropTypes.bool,
  disableAnimation: PropTypes.bool,
};

export default StockChart;
