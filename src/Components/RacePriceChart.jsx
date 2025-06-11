import { useContext, useState, useEffect } from "react";
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

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const RacePriceChart = ({ stocks = [], stopTime }) => {
  const { darkModeEnabled, chartRef } = useContext(DarkModeContext);

  const initialDatasets = stocks.map((stock) => ({
    label: stock,
    data: [],
    borderColor: getRandomColor(),
    backgroundColor: getRandomColor(),
    borderWidth: 2,
    pointRadius: 0,
    pointHoverRadius: 0,
  }));

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: initialDatasets,
  });

  useEffect(() => {
    if (!stopTime) return; // If no stopTime is provided, update indefinitely

    const stopTimestamp = new Date(stopTime).getTime(); // Convert stopTime to timestamp
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();

      if (currentTime >= stopTimestamp) {
        clearInterval(interval); // Stop adding data when stopTime is reached
        return;
      }

      setChartData((prevData) => {
        if (new Date().getTime() >= stopTimestamp) {
          clearInterval(interval);
          return prevData; // Stop updating when time is reached
        }

        const newLabel = new Date().toLocaleTimeString();
        const newDatasets = prevData.datasets.map((dataset) => ({
          ...dataset,
          data: [...dataset.data, (100 + Math.random() * 10).toFixed(2)], // Random price
        }));

        return {
          labels: [...prevData.labels, newLabel],
          datasets: newDatasets,
        };
      });
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [stopTime]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: darkModeEnabled ? "#fff" : "#000",
          callback: function (val, index) {
            return index % 10 === 0 ? chartData.labels[index] : "";
          },
        },
        grid: { color: darkModeEnabled ? "#444" : "#ddd" },
      },
      y: {
        ticks: { color: darkModeEnabled ? "#fff" : "#000" },
        grid: { color: darkModeEnabled ? "#444" : "#ddd", borderDash: [5, 5] },
      },
    },
    plugins: {
      legend: true,
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
    elements: {
      point: {
        radius: 0,
        hoverRadius: 0,
      },
    },
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

RacePriceChart.propTypes = {
  stocks: PropTypes.arrayOf(PropTypes.string),
  stopTime: PropTypes.string, // Accepts stop time as a string (e.g., "2025-03-20T15:30:00")
};

export default RacePriceChart;
