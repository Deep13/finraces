import { useContext, useRef } from "react";
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

// Register Chart.js components and zoom plugin
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title, zoomPlugin);

const StockChart = ({ labels = [], datasets = [],area=false }) => {
  const { darkModeEnabled } = useContext(DarkModeContext);
  const chartRef = useRef(null); // Reference for the chart instance

  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: dataset.borderColor || "#00E396",
      backgroundColor: area
      ? (ctx) => getGradient(ctx, dataset.borderColor || "#00E396")
      : dataset.borderColor || "#00E396",
      borderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      tension: 0.4, // Smooth curves
      fill:area
    })),
  };

  const getGradient = (ctx, borderColor) => {
    if (!ctx?.chart?.ctx) return borderColor; // Fallback if context is missing
    const chart = ctx.chart;
    const gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.height);
    gradient.addColorStop(0, `${borderColor}40`); // 25% opacity at the top
    gradient.addColorStop(1, `${borderColor}05`); // 5% opacity at the bottom
    return gradient;
  };

  const options = {
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
      zoom: {
        pan: {
          enabled: true,
          mode: "xy", // Panning in both X and Y directions
        },
        zoom: {
          wheel: {
            enabled: true, // Mouse wheel zoom
          },
          pinch: {
            enabled: true, // Pinch to zoom (touch devices)
          },
          mode: "xy", // Zoom both axes
        },
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

  // Function to zoom in
  const handleZoomIn = () => {
    if (chartRef.current) {
      chartRef.current.zoom(1.2); // 1.2x zoom in
    } else {
      console.error("Chart instance is not available yet.");
    }
  };

  // Function to zoom out
  const handleZoomOut = () => {
    if (chartRef.current) {
      chartRef.current.zoom(0.8); // 0.8x zoom out
    } else {
      console.error("Chart instance is not available yet.");
    }
  };

  // Function to reset zoom
  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    } else {
      console.error("Chart instance is not available yet.");
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <Line ref={chartRef} data={data} options={options} />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", gap: "10px" }}>
        <button onClick={handleZoomIn} style={buttonStyle}>+</button>
        <button onClick={handleZoomOut} style={buttonStyle}>-</button>
        <button onClick={handleResetZoom} style={buttonStyle}>Reset</button>
      </div>
    </div>
  );
};

// Button styling
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
