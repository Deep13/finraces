import { useContext, useRef, useState, useMemo,useEffect } from "react";
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

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title, zoomPlugin);

const generateStaticData = (filter, num) => {
  const now = new Date();
  let labels = [];
  let datasets = [];

  if (filter === "1D") {
    labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  } else {
    const days = { "1W": 7, "1M": 30, "3M": 90, "6M": 180 }[filter] || 30;
    labels = Array.from({ length: days + 1 }, (_, i) => {
      let date = new Date();
      date.setDate(now.getDate() - (days - i));
      return date.toISOString().split("T")[0];
    });
  }

  for (let i = 0; i < num; i++) {
    datasets.push({
      label: `Stock ${i + 1}`,
      data: labels.map(() => 100 + Math.random() * 10), // Random stock prices
      borderColor: [ "#00E396","#FEB019","#FF4560","#775DD0"][i], // Different colors
    });
  }

  return { labels, datasets };
};


const StockChart = ({ labels = [], datasets = [], area = false, num = 1, filter = "1M", staticData = false,disableAnimation=false }) => {
  const { darkModeEnabled } = useContext(DarkModeContext);
  const chartRef = useRef(null);
  const [selectedPoints, setSelectedPoints] = useState({ start: null, end: null, difference: null });

  const staticChartData = useMemo(() => (staticData ? generateStaticData(filter,num) : { labels, datasets }), [staticData, filter, labels, datasets]);



  // useEffect(() => {
  //   // Cleanup function: Destroy previous chart instance before updating
  //   return () => {
  //     if (chartRef.current) {
  //       chartRef.current.destroy();
  //     }
  //   };
  // }, [labels, datasets]); // Runs whenever labels or datasets change

  const data = {
    labels: staticChartData.labels,
    datasets: staticChartData.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: area ? (ctx) => getGradient(ctx, dataset.borderColor || "#00E396") : dataset.borderColor || "#00E396",
      borderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      tension: 0.4,
      fill: area,
    })),
  };
  const totalDuration = 4000;
  const delayBetweenPoints = totalDuration / staticChartData.labels.length;
  
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

  const getGradient = (ctx, borderColor) => {
    if (!ctx?.chart?.ctx) return borderColor;
    const chart = ctx.chart;
    const gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.height);
    gradient.addColorStop(0, `${borderColor}40`);
    gradient.addColorStop(1, `${borderColor}05`);
    return gradient;
  };

  const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation:disableAnimation?false:animation,
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
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      backgroundColor: darkModeEnabled ? "#333" : "#fff",
      titleColor: darkModeEnabled ? "#fff" : "#000",
      bodyColor: darkModeEnabled ? "#fff" : "#000",
    },
    zoom: {
      pan: { enabled: true, mode: "xy" },
      zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: "xy" },
    },
  },
};


  const handleResetSelection = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
      setSelectedPoints({ start: null, end: null, difference: null });
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <Line ref={chartRef} data={data} options={options} />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", gap: "10px" }}>
        <button onClick={handleResetSelection} style={buttonStyle}>Reset</button>
      </div>
      {selectedPoints.start !== null && selectedPoints.end !== null && (
        <div style={{ textAlign: "center", marginTop: "10px", color: darkModeEnabled ? "#fff" : "#000" }}>
          <strong>Difference: </strong> {selectedPoints.difference}
        </div>
      )}
    </div>
  );
};

const buttonStyle = {
  padding: "8px 12px",
  fontSize: "16px",
  fontWeight: "bold",
  backgroundColor: "#6b7280",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
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
  stock: PropTypes.bool,
  filter: PropTypes.oneOf(["1D", "1W", "1M", "3M", "6M"]),
  staticData: PropTypes.bool,
};

export default StockChart;
