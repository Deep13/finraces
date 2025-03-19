import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const POINTS_INTERVAL = 5;
const POINTS_PER_TICK = 12;
const TOTAL_DURATION = 60;
const TOTAL_POINTS = (TOTAL_DURATION / POINTS_INTERVAL) * POINTS_PER_TICK;
const INITIAL_POINTS = TOTAL_POINTS / 2;
const ANIMATION_DURATION = 60000; // ⬆️ Increased animation duration (slower)
const testStocks = ["Apple", "Google", "Netflix", "Amazon","a","b","c","d","e"]

const generateNumbers = (count, min, max) =>
  Array.from({ length: count }, () =>
    `${Math.floor(Math.random() * (max - min + 1) + min)}th`
      .replace("1th", "1st")
      .replace("2th", "2nd")
      .replace("3th", "3rd")
  );

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const StockRaceChart = ({ duration = TOTAL_DURATION, stocks=testStocks }) => {
  const chartRef = useRef(null);
  const [pointCount, setPointCount] = useState(INITIAL_POINTS);
  



  // Generate all X-axis points at the start
  const xLabels = Array.from({ length: TOTAL_POINTS + 1 }, (_, i) => i * (POINTS_INTERVAL / POINTS_PER_TICK));

  const generateDatasets = () =>
    stocks.map((stock) => {
      const color = getRandomColor();
      return {
        label: stock,
        data: generateNumbers(TOTAL_POINTS + 1, 1, stocks.length), // Fill all data points initially
        borderColor: color,
        backgroundColor: `${color}80`,
      };
    });

  const [chartData, setChartData] = useState({
    labels: xLabels, // Use precomputed labels
    datasets: generateDatasets(),
  });

  const delayBetweenPoints = ANIMATION_DURATION / chartData.labels.length; // ⬆️ Increase delay

  const previousY = (ctx) =>
    ctx.index === 0
      ? ctx?.chart?.scales?.y?.getPixelForValue(100)
      : ctx?.chart?.getDatasetMeta(ctx?.datasetIndex)?.data?.[ctx?.index - 1]?.getProps(["y"], true)?.y;

      const animation = {
        x: {
          type: "number",
          easing: "linear", // ⬆️ Ensures a smooth, steady flow
          duration: delayBetweenPoints * 3, // ⬆️ Increased duration
          from: NaN,
          delay(ctx) {
            if (ctx.type !== "data" || ctx.xStarted) {
              return 0;
            }
            ctx.xStarted = true;
            return ctx.index * delayBetweenPoints; // ❌ Removed extra * 2 multiplier
          },
        },
        y: {
          type: "number",
          easing: "linear", // ⬆️ Matches x animation for consistency
          duration: delayBetweenPoints * 3, // ⬆️ Same duration as x for smooth movement
          from: previousY,
          delay(ctx) {
            if (ctx.type !== "data" || ctx.yStarted) {
              return 0;
            }
            ctx.yStarted = true;
            return ctx.index * delayBetweenPoints; // ❌ Removed extra * 2 multiplier
          },
        },
      };
      

  const options = {
    responsive: true,
    animation,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Stock Race Chart" },
    },
    scales: {
      x: {
        type: "linear",
        ticks: {
          stepSize: POINTS_INTERVAL,
        },
      },
      y: {
        type: "category",
        reverse:false,
        labels: stocks.map((_, i) =>
          `${i + 1}th`.replace("1th", "1st").replace("2th", "2nd").replace("3th", "3rd")
        ),
      },
    },
  };

  useEffect(()=>{
    console.log("data generated",chartData)
  },[chartData])

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex" }}> {/* ✅ Full height & width */}
      <div style={{ flex: 1, position: "relative" }}> {/* ✅ Makes sure chart resizes correctly */}
        {chartData ? <Line ref={chartRef} data={chartData} options={options} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default StockRaceChart;
