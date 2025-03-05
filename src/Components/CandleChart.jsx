import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

const generateStaticCandles = (filter) => {
  const now = new Date();
  const candles = [];
  const days = { "1W": 7, "1M": 30, "3M": 90, "6M": 180 }[filter] || 30;

  for (let i = days; i >= 0; i--) {
    let date = new Date();
    date.setDate(now.getDate() - i);

    const open = 100 + Math.random() * 20;
    const high = open + Math.random() * 5;
    const low = open - Math.random() * 5;
    const close = low + Math.random() * (high - low);

    candles.push({ x: date.getTime(), y: [open, high, low, close] });
  }
  return [{ label: "Static Stock", data: candles }];
};

const CandleChart = ({ labels = [], candles = [], static: isStatic = false, filter = "1M" }) => {
  const processedCandles = isStatic ? generateStaticCandles(filter) : candles;

  if (!processedCandles || processedCandles.length === 0 || JSON.stringify(processedCandles) === JSON.stringify([{},{},{},{}])) {
    return <p style={{ color: "white", textAlign: "center" }}>Please select stocks to compare</p>;
  }

  const [zoomLevel, setZoomLevel] = useState(1);

  const options = {
    chart: {
      type: "candlestick",
      height: 400,
      background: "transparent",
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    xaxis: {
      type: "datetime",
      labels: { style: { colors: "#fff" } },
    },
    yaxis: {
      labels: { style: { colors: "#fff" } },
    },
    grid: { borderColor: "#444" },
    tooltip: { enabled: true, theme: "dark" },
    legend: { show: false },
  };

  const series = processedCandles
    .filter(stock => stock.data.length > 0)
    .map(stock => ({
      name: stock.label,
      data: stock.data,
    }));

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div style={{ position: "relative", width: "100%", height: "270px", overflow: "hidden" }}>
      <div style={buttonContainerStyle}>
        {/* <button onClick={handleZoomIn} style={buttonStyle}>+</button>
        <button onClick={handleZoomOut} style={buttonStyle}>-</button>
        <button onClick={handleResetZoom} style={buttonStyle}>Reset</button> */}
      </div>

      <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center" }}>
        <ReactApexChart options={options} series={series} type="candlestick" height={400} />
      </div>
    </div>
  );
};

const buttonContainerStyle = {
  position: "absolute",
  bottom: "-10px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "8px",
  zIndex: 10,
};

const buttonStyle = {
  padding: "6px 10px",
  fontSize: "14px",
  fontWeight: "bold",
  backgroundColor: "#6b7280",
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
      x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      y: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ).isRequired,
  static: PropTypes.bool,
  filter: PropTypes.string,
};

export default CandleChart;
