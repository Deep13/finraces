import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

const CandleChart = ({ labels = [], candles = [] }) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const options = {
    chart: {
      type: "candlestick",
      height: 400,
      background: "transparent",
      zoom: { enabled: false }, // We handle zoom manually
      toolbar: { show: false },
    },
    xaxis: {
      categories: labels,
      labels: { style: { colors: "#fff" } },
    },
    yaxis: {
      labels: { style: { colors: "#fff" } },
    },
    grid: { borderColor: "#444" },
    tooltip: { theme: "dark" },
  };

  const series = [{ data: candles }];

  // Zoom Functions
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div style={{ position: "relative", width: "100%", height: "450px", overflow: "hidden" }}>
      {/* Zoom Buttons - Center Bottom */}
      <div style={buttonContainerStyle}>
        <button onClick={handleZoomIn} style={buttonStyle}>+</button>
        <button onClick={handleZoomOut} style={buttonStyle}>-</button>
        <button onClick={handleResetZoom} style={buttonStyle}>Reset</button>
      </div>

      {/* Chart Container - Prevents Overflow */}
      <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center" }}>
        <ReactApexChart options={options} series={series} type="candlestick" height={400} />
      </div>
    </div>
  );
};

// Updated Button Container Style - Centered at Bottom
const buttonContainerStyle = {
  position: "absolute",
  bottom: "10px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "8px",
  zIndex: 10,
};

// Button Styling
const buttonStyle = {
  padding: "6px 10px",
  fontSize: "14px",
  fontWeight: "bold",
  backgroundColor: "#6b7280", // Slate Grey
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background 0.2s",
};

CandleChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  candles: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.string.isRequired, // Date or label
      y: PropTypes.arrayOf(PropTypes.number).isRequired, // [open, high, low, close]
    })
  ).isRequired,
};

export default CandleChart;
