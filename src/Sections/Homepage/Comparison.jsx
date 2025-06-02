import { BiChevronRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import StockWatchlistCard from "../../Components/StockComparisonCard";
import StockChart from "../../Components/StockChart";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { getStockChartData, debounceStockSearchj } from "../../Utils/api";

const Comparison = () => {
  const navigate = useNavigate();

  const { ref: chartRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const [showChart, setShowChart] = useState(false);
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([
    null,
    null,
    null,
    null,
  ]);

  const stockTickers = ["AAPL", "TSLA", "AMZN", "NFLX"];

  const stockColors = [
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0",
    "#3F51B5",
    "#546E7A",
    "#26A69A",
    "#F9A825",
    "#EC407A",
    "#29B6F6",
    "#66BB6A",
    "#AB47BC",
    "#FFA726",
    "#8D6E63",
    "#42A5F5",
    "#7E57C2",
    "#EF5350",
    "#26C6DA",
    "#9CCC65",
    "#FF7043",
  ];

  useEffect(() => {
    if (inView) {
      setShowChart(false);
      setTimeout(() => setShowChart(true), 100);
    }
  }, [inView]);

  // Fetch card data
  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const fetchedStocks = await Promise.all(
          stockTickers.map((ticker) => debounceStockSearchj(ticker))
        );
        setSelectedStocks(fetchedStocks);
      } catch (error) {
        console.error("Error fetching stock details:", error);
      }
    };

    fetchStockDetails();
  }, []);

  // Fetch chart data
  useEffect(() => {
    const formatDate = (date) => date.toISOString().split("T")[0];
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const startDate = formatDate(oneMonthAgo);
    const endDate = formatDate(today);

    const fetchChartData = async () => {
      try {
        const results = await Promise.all(
          stockTickers.map(
            (ticker) =>
              new Promise((resolve, reject) => {
                getStockChartData(
                  ticker,
                  startDate,
                  endDate,
                  "day",
                  (data) => resolve({ ticker, data }),
                  (err) => reject(err)
                );
              })
          )
        );

        let dateLabels = [];
        const allDatasets = results.map((stockData, index) => {
          const res = stockData.data?.results || [];
          const prices = res.map((r) => r.c);
          const dates = res.map(
            (r) => new Date(r.t).toISOString().split("T")[0]
          );

          if (index === 0) dateLabels = dates;
          return {
            label: stockData.ticker,
            data: prices,
            borderColor: stockColors[index % stockColors.length],
            backgroundColor: stockColors[index % stockColors.length] + "33",
            fill: false,
          };
        });

        setLabels(dateLabels);
        setDatasets(allDatasets);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="max-w-[1400px] relative mb-[3.3rem]">
      <a
        onClick={() => navigate("/stockComparison")}
        className="absolute right-0 top-2 text-[#8d8d8d] text-[0.94rem] font-semibold hover:underline flex items-center"
        href="#"
      >
        Compare more <BiChevronRight size={18} />
      </a>
      <h2 className="text-[2.14rem] text-center font-bold mb-[1.4rem] dark:text-white">
        Stock Comparison
      </h2>

      <div className="flex flex-col gap-5 ml-10">
        <div className="w-full flex gap-5 items-center justify-center">
          {selectedStocks.map((stockData, index) => (
            <StockWatchlistCard
              key={index}
              data={stockData.data[0]}
              clickable={true}
            />
          ))}
        </div>

        <div
          ref={chartRef}
          className="h-[30rem] w-full bg-[#e4eaf0] dark:bg-[#001a50] flex rounded-xl py-2 px-5 mx-auto"
        >
          {showChart && <StockChart labels={labels} datasets={datasets} />}
        </div>
      </div>
    </div>
  );
};

export default Comparison;
