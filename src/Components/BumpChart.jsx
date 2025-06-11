import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

const generateRandomRanks = (stocks) => {
  return stocks.map((stock) => ({
    name: stock,
    rank: Math.floor(Math.random() * stocks.length) + 1,
  }));
};

const BumpChart = ({ stocks, maxPoints = 10 }) => {
  const [data, setData] = useState([
    { time: "T+0s", rankings: generateRandomRanks(stocks) },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        // Calculate new time based on the last valid time in the dataset
        const lastTimeValue = prevData.length > 0 ? parseInt(prevData[prevData.length - 1].time.match(/\d+/)[0]) : 0;
        const nextTime = `T+${lastTimeValue + 5}s`;

        // Create new entry
        const newEntry = {
          time: nextTime,
          rankings: generateRandomRanks(stocks),
        };

        // Maintain maxPoints, shifting timestamps correctly
        return [...prevData, newEntry].slice(-maxPoints);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [stocks, maxPoints]);

  const option = {
    title: { text: "", left: "center", textStyle: { color: "#fff", fontSize: 18 } },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: data.map((entry) => entry.time),
      axisLabel: { color: "#fff" },
    },
    yAxis: {
      type: "value",
      inverse: true,
      min: 1,
      max: stocks.length,
      axisLabel: { color: "#fff" },
      splitNumber: stocks.length - 1,
    },
    legend: { show: true, textStyle: { color: "#fff" } },
    series: stocks.map((stock, index) => ({
      name: stock,
      type: "line",
      smooth: true,
      symbolSize: 10,
      lineStyle: { width: 3 },
      itemStyle: { color: `hsl(${index * 72}, 100%, 60%)` },
      emphasis: { focus: "series" },
      data: data.map((entry) => entry.rankings.find((s) => s.name === stock)?.rank || 1),
    })),
  };

  return <ReactECharts option={option} style={{ height: 600, width: "100%" }} />;
};

export default BumpChart;
