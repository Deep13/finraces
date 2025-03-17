import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Ensure Chart.js is installed

const barColors = [
  "red", "blue", "yellow", "green", "purple", "orange", "pink", "brown", "cyan", "magenta"
];

// Function to generate unique rankings (1 to stockCount) randomly
const generateUniqueRanks = (stockCount) => {
  let ranks = Array.from({ length: stockCount }, (_, i) => i + 1);
  return ranks.sort(() => Math.random() - 0.5); // Shuffle ranks
};

// Function to generate initial dataset
const generateInitialData = (stocks) => {
  const stockCount = stocks.length;
  let dataMatrix = stocks.map((stock, index) => {
    const color = barColors[index % barColors.length]; // Ensure consistent colors
    return {
      label: stock.ticker,
      data: [],
      borderColor: color,
      backgroundColor: color, // Same as borderColor
      fill: false,
    };
  });

  for (let i = 0; i < 20; i++) {
    let timestamp = (i * 5).toString().padStart(2, "0");
    let uniqueRanks = generateUniqueRanks(stockCount);

    stocks.forEach((stock, index) => {
      dataMatrix[index].data.push({ x: timestamp, y: uniqueRanks[index] });
    });
  }

  return dataMatrix;
};

const RankChart = ({ stocks }) => {
  const [datasets, setDatasets] = useState(generateInitialData(stocks));

  useEffect(() => {
    const interval = setInterval(() => {
      setDatasets((prevDatasets) => {
        const newX = (parseInt(prevDatasets[0].data[prevDatasets[0].data.length - 1].x) + 5)
          .toString()
          .padStart(2, "0");
        const uniqueRanks = generateUniqueRanks(stocks.length); // New unique ranks

        return prevDatasets.map((dataset, index) => ({
          ...dataset,
          data: [...dataset.data.slice(1), { x: newX, y: uniqueRanks[index] }],
        }));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [stocks]);

  return (
    <div style={{ width: "800px", height: "400px" }}>
      <Line
        data={{ datasets }}
        options={{
          responsive: true,
          scales: {
            x: { type: "category", title: { display: true, text: "Time (seconds)" } },
            y: {
              title: { display: true, text: "Rank" },
              reverse: true, // Higher ranks at the top
              ticks: { stepSize: 1, min: 1, max: stocks.length },
            },
          },
        }}
      />
    </div>
  );
};

export default RankChart;
