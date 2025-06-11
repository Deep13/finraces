import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

const processStockData = (stockData) => {
  if (!stockData || !stockData.results || stockData.results.length === 0) {
    return [];
  }
  
  return [{
    label: stockData.ticker || "Stock",
    data: stockData.results.map((item) => ({
      x: item.t, // Timestamp
      y: [item.o, item.h, item.l, item.c], // Open, High, Low, Close
    })),
  }];
};

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

const CandleChart = ({ stockData, static: isStatic = false, filter = "1M" }) => {
  const processedCandles = isStatic ? generateStaticCandles(filter) : processStockData(stockData);

  if (!processedCandles || processedCandles.length === 0) {
    return <p style={{ color: "white", textAlign: "center" }}>Please select stocks to compare</p>;
  }

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

    console.log("labels",processedCandles)

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <ReactApexChart options={options} series={series} type="candlestick" height={300} />
    </div>
  );
};

CandleChart.propTypes = {
  stockData: PropTypes.shape({
    ticker: PropTypes.string,
    results: PropTypes.arrayOf(
      PropTypes.shape({
        t: PropTypes.number.isRequired, // Timestamp
        o: PropTypes.number.isRequired, // Open
        h: PropTypes.number.isRequired, // High
        l: PropTypes.number.isRequired, // Low
        c: PropTypes.number.isRequired, // Close
      })
    ),
  }),
  static: PropTypes.bool,
  filter: PropTypes.string,
};

export default CandleChart;
