import Sidebar from "../Components/Sidebar";
import StockWatchlistCard from "../Components/StockWatchlistCard";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import StockTrendChart from "../Components/StockTrendChart";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useEffect, useState, useRef, useCallback, useContext } from "react";
import { debounce } from "lodash";
import StockTrendChartMini from "../Components/StockChartMini";
import {
  deleteFromWatchlist,
  getMarketGainers,
  getMarketLosers,
  getStockChartData,
  getWatchList,
  searchStock,
  debounceStockSearchj,
  addToWatchList,
} from "../Utils/api";
import { DarkModeContext } from "../Contexts/DarkModeProvider";
import { FiMinusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DateRangePicker from "../Components/DateRangePicker";
import { ColorRing } from "react-loader-spinner";
const stockData = [
  {
    name: "Apple",
    logo: "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/AAPL_icon.png",
    price: "236.86",
    currentPrice: "236.86",
    trend: [10, 15, 16, 28, 16, 22],
    percentage: 45,
    change: 13,
    navigate: "/stock/AAPL/4fc93602-a51a-4220-a55a-6a1e291adf66",
  },
  {
    name: "Tesla",
    logo: "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
    price: "276.31",
    currentPrice: "276.31",
    trend: [21, 15, 12, 18, 16, 22],
    percentage: 21,
    change: 15,
    navigate: "/stock/TSLA/c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
  },
  {
    name: "Netflix",
    logo: "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/NFLX_icon.jpeg",
    price: "975.51",
    currentPrice: "975.51",
    trend: [12, 15, 12, 18, 18, 32],
    percentage: 52,
    change: 12,
    navigate: "/stock/NFLX/57a0e048-43de-4c41-84b7-9bea41de5fe6",
  },
  {
    name: "AMD",
    logo: "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/AMD_icon.jpeg",
    price: "101.15",
    currentPrice: "101.15",
    trend: [11, 12, 12, 18, 16, 22],
    percentage: 12,
    change: 23,
    navigate: "/stock/AMD/2d95a22b-e3a0-424a-a661-1d4401ed5b25",
  },
];

//   const filterOptions = ["All", "Tech", "Finance", "Healthcare"];
//   const sortOptions = ["Relevance", "Price: High to Low", "Price: Low to High"];

const Market = () => {
  // const [selectedFilter, setSelectedFilter] = useState("All");
  // const [selectedSort, setSelectedSort] = useState("Relevance");
  // const [filterOpen, setFilterOpen] = useState(false);
  // const [sortOpen, setSortOpen] = useState(false);
  const navigate = useNavigate();
  const [watchList, setWatchList] = useState();
  const [selectedStock, setSelectedStock] = useState();
  const [chartData, setChartData] = useState();
  const [marketGainers, setMarketGainers] = useState([]);
  const [marketLosers, setMarketLosers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [choosenStock, setChoosenStock] = useState("");
  const sliderRef = useRef(null);
  const sliderRef2 = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [stocksData, setStocksData] = useState();
  const [page, setPage] = useState(2);
  const [hasNext, setHasNext] = useState(false);
  const observerRef = useRef(null); // Observer reference for last item
  const { setShowLoginForm } = useContext(DarkModeContext);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    // let ud=localStorage.getItem('fin_userDetails');

    if (!token) {
      setShowLoginForm(true);
    }
  }, []);
  const fetchStockOptions = useCallback(
    debounce(async (inputValue) => {
      if (inputValue.length > 2) {
        try {
          await debounceStockSearchj(inputValue, (data) => {
            console.log("data", data);
            setStocksData(data);
          }); // Call API to search stocks
        } catch (error) {
          console.error("Error fetching stocks:", error);
        } finally {
          console.log("final");
        }
      } else {
        console.log("A");
      }
    }, 500), // Debounce to limit API calls
    []
  );

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const scrollLeft2 = () => {
    if (sliderRef2.current) {
      sliderRef2.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight2 = () => {
    if (sliderRef2.current) {
      sliderRef2.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    getMarketLosers(
      async (data) => {
        console.log(data);
        try {
          const results = await Promise.all(
            data.map((stock) => searchStock(stock.ticker))
          );
          setMarketLosers(results); // Updates state with resolved values
        } catch (error) {
          console.error("Error fetching stocks:", error);
        }
      },
      (data) => {
        console.log("error", data);
      }
    );

    getMarketGainers(
      async (data) => {
        console.log(data);
        try {
          const results = await Promise.all(
            data.map((stock) => searchStock(stock.ticker))
          );
          setMarketGainers(results); // Updates state with resolved values
        } catch (error) {
          console.error("Error fetching stocks:", error);
        }
      },
      (error) => {
        console.log("error", error);
      }
    );

    if (localStorage.getItem("token")) {
      getWatchList(
        (data) => {
          setWatchList(data.data);
          setSelectedStock(data.data[0]);

          setHasNext(data.hasNextPage);
          console.log("check", data);
        },
        (error) => {
          console.log("error", error);
        }
      );
    }
  }, []);

  // Function to fetch stocks
  const fetchWatchList = (pageNumber) => {
    if (!hasNext) return;

    getWatchList(
      (data) => {
        setWatchList((prev) => [...prev, ...data.data]); // Append new data
        setHasNext(data.hasNextPage); // Update hasNext flag
        setPage(pageNumber + 1); // Increment page number
      },
      (error) => {
        console.log("Error fetching stocks:", error);
      },
      pageNumber // Pass page number to API
    );
  };

  // Infinite Scroll using IntersectionObserver
  useEffect(() => {
    if (!watchList?.length) return;

    const lastStockElement = observerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext) {
          fetchWatchList(page); // Fetch next page
        }
      },
      { threshold: 1.0 }
    );

    if (lastStockElement) observer.observe(lastStockElement);

    return () => {
      if (lastStockElement) observer.unobserve(lastStockElement);
    };
  }, [watchList, hasNext]);

  useEffect(() => {
    if (!selectedStock) return;
    // Fetch stock chart data when selectedStock changes

    const today = new Date();
    const sevenDaysAgo = new Date();
    const ticker = selectedStock?.stock?.ticker;
    sevenDaysAgo.setDate(today.getDate() - 7);

    const fromDate = sevenDaysAgo.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const toDate = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD

    const finalStartDate =
      startDate && startDate.trim() !== "" ? startDate : fromDate;
    const finalEndDate = endDate && endDate.trim() !== "" ? endDate : toDate;

    setLoading(true);
    getStockChartData(
      ticker,
      finalStartDate,
      finalEndDate,
      "day",
      (data) => {
        setChartData(data);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [selectedStock, startDate, endDate]);

  const updateState = (searchedStock) => {
    // Check if stock is already in the watchlist
    const isAlreadyInWatchlist = watchList.some(
      (item) => item.stock.id === searchedStock.id
    );
    let userDetails = localStorage.getItem("fin_userDetails");
    console.log(atob(userDetails));

    if (!isAlreadyInWatchlist) {
      // Create a new watchlist entry
      const newStockEntry = {
        stock: {
          icon_url: searchedStock.icon_url,
          logo_url: searchedStock.logo_url,
          id: searchedStock.id,
          ticker: searchedStock.ticker,
          price: searchedStock.price,
          name: searchedStock.name,
        },
        user: userDetails,
        id: crypto.randomUUID(), // Generate a unique ID
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Append the new stock entry to the watchlist
      setWatchList([...watchList, newStockEntry]);
    } else {
      console.log("Stock is already in the watchlist.");
    }
  };

  return (
    <div className="w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]">
      {/* Ensure sidebar is inside a container with sufficient height */}
      <Sidebar />

      <div className="flex flex-col w-[70rem] gap-2 dark:bg-[#000D38] py-5 md:px-10 mx-[1rem] md:mx-[7rem] flex-1 rounded-xl border dark:border-[#00387E]  dark:text-white">
        <span className="font-semibold text-[1.5rem] font-poppins flex flex-row items-center">
          Market Research
        </span>

        {watchList?.length > 0 ? (
          <div className="flex flex-col lg:flex-row justify-center gap-5 mt-5 w-full">
            {/* Selected Stock */}
            <div className="flex flex-1 flex-col gap-2 w-full">
              {selectedStock ? (
                <div className="flex justify-between w-full rounded-lg items-center p-2 bg-white dark:bg-[#002763] border dark:border-[#00387E]">
                  <div className="flex p-2 gap-5 items-center ">
                    <img
                      className="rounded-full w-10 h-10 "
                      src={selectedStock?.stock?.icon_url}
                      alt="stockImg"
                    />
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-xl font-bold truncate flex gap-2 items-center cursor-pointer"
                        onClick={() => {
                          navigate(
                            `/stock/${selectedStock?.stock?.ticker}/${selectedStock?.stock?.id}`
                          );
                        }}
                      >
                        {selectedStock?.stock?.name} (
                        {selectedStock?.stock?.ticker}){" "}
                        <FiMinusCircle
                          onClick={() => {
                            setShowModal(true);
                          }}
                          color="red"
                          size={28}
                          className="cursor-pointer ml-10 mt-4"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <div className="font-semibold">
                          {selectedStock?.stock?.price + "$" || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <DateRangePicker
                      startDate={startDate}
                      endDate={endDate}
                      setStartDate={setStartDate}
                      setEndDate={setEndDate}
                      transform={false}
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-16"></div>
              )}

              <div className="dark:bg-[#001B51] bg-[#e4eaf0] rounded-lg p-3 w-full border dark:border-[#00387E] h-80 overflow-hidden">
                {loading ? (
                  <div className="flex items-center justify-center">
                    <ColorRing
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="color-ring-loading"
                      wrapperStyle={{}}
                      wrapperClass="color-ring-wrapper"
                      colors={[
                        "#e15b64",
                        "#f47e60",
                        "#f8b26a",
                        "#abbd81",
                        "#849b87",
                      ]}
                    />
                  </div>
                ) : (
                  <StockTrendChart
                    stockData={chartData}
                    filter="1W"
                    static={false}
                  />
                )}
              </div>
            </div>

            {/* Watchlist */}
            <div className="w-full md:w-[15rem]">
              <div className="flex justify-between mt-5 mb-5">
                <div className="font-semibold text-2xl">WatchList</div>
                <div
                  onClick={() => {
                    setShowSearch(true);
                  }}
                  className="border border-black dark:border-white px-3 py-2 cursor-pointer rounded-lg flex gap-2 items-center justify-center"
                >
                  Add <FaPlus />
                </div>
              </div>
              <div className="rounded-lg p-3 flex-2">
                <div className="flex flex-col gap-2 max-h-[18.5rem] overflow-y-auto custom-scrollbar p-2 w-full">
                  {watchList?.map((stockData, index) => (
                    <div
                      ref={index === watchList.length - 1 ? observerRef : null}
                      onClick={() => {
                        setSelectedStock(stockData), setChoosenStock(stockData);
                      }}
                      key={index}
                      className="flex group justify-between items-center cursor-pointer p-2 gap-5 bg-[#e5f4ff] dark:bg-[#002763] border dark:border-[#00387E] rounded-lg w-full"
                    >
                      <img
                        className="rounded-full w-10 h-10"
                        src={stockData?.stock?.icon_url}
                        alt="stockImg"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold truncate">
                          {stockData?.stock?.name} ({stockData?.stock.ticker})
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <div className="font-semibold">
                            {stockData?.stock?.price?.toFixed(2)}$
                          </div>
                          {/* <div onClick={()=>{setShowModal(true), setChoosenStock(stockData)}} className="hidden group-hover:flex px-2 py-1"><FiMinusCircle color="red"/></div> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="dark:bg-[#001B51] bg-[#e4eaf0] rounded-lg p-3 border dark:border-[#00387E] w-full flex flex-col gap-5">
            <div className="font-bold text-slate-400 text-center">
              Your personalized stock tracker. Save your favorite stocks and
              monitor their trends effortlessly.
              <br />
              Watch. Track. Grow.
            </div>
            <div
              onClick={() => {
                if (
                  localStorage.getItem("token") &&
                  localStorage.getItem("fin_userDetails")
                ) {
                  setShowSearch(true);
                } else {
                  setShowLoginForm(true);
                }
              }}
              className="border border-black dark:border-white px-3 py-2 cursor-pointer rounded-lg flex gap-2 items-center justify-center"
            >
              Add <FaPlus />
            </div>
          </div>
        )}

        <div className="dark:bg-[#001B51] bg-[#e5f4ff] rounded-lg p-3 border dark:border-[#00387E]">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl dark:text-white">
              Market Trend
            </div>

            {/* Filter & Sort Dropdowns */}
            <div className="flex gap-2 dark:text-white relative">
              {/* Filter Dropdown */}
              {/* <div className="relative">
                        <button 
                            onClick={() => setFilterOpen(!filterOpen)} 
                            className="flex items-center bg-[#002763] px-4 py-2 rounded-lg"
                        >
                            Filter By: {selectedFilter} <IoIosArrowDown className="ml-2 w-4 h-4" />
                        </button>
                        {filterOpen && (
                            <div className="absolute top-12 left-0 bg-[#002763] rounded-lg shadow-lg w-40">
                                {filterOptions.map((option) => (
                                    <div 
                                        key={option}
                                        className={`px-4 py-2 cursor-pointer hover:bg-[#00387E] ${selectedFilter === option ? "font-bold" : ""}`}
                                        onClick={() => { setSelectedFilter(option); setFilterOpen(false); }}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div> */}

              {/* Sort Dropdown */}
              {/* <div className="relative">
                        <button 
                            onClick={() => setSortOpen(!sortOpen)} 
                            className="flex items-center bg-[#002763] px-4 py-2 rounded-lg"
                        >
                            Sort By: {selectedSort} <IoIosArrowDown className="ml-2 w-4 h-4" />
                        </button>
                        {sortOpen && (
                            <div className="absolute top-12 left-0 bg-[#002763] rounded-lg shadow-lg w-48">
                                {sortOptions.map((option) => (
                                    <div 
                                        key={option}
                                        className={`px-4 py-2 cursor-pointer hover:bg-[#00387E] ${selectedSort === option ? "font-bold" : ""}`}
                                        onClick={() => { setSelectedSort(option); setSortOpen(false); }}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div> */}
            </div>
          </div>
          <div className="w-full">
            <table className="w-full dark:text-white">
              <thead>
                <tr className="text-left text-slate-400 border-b border-[#00387E]">
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Current Price</th>
                  <th className="py-3 px-4">Graph</th>
                  <th className="py-3 px-4">Percentage</th>
                </tr>
              </thead>

              <tbody>
                {stockData.map((stock, index) => (
                  <tr key={index} className="border-b border-[#00387E]">
                    {/* Stock Logo & Name */}
                    <td
                      className="py-3 px-4 flex items-center gap-2 cursor-pointer"
                      onClick={() => {
                        navigate(`${stock.navigate}`);
                      }}
                    >
                      <img
                        src={stock.logo}
                        alt={stock.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="font-semibold">{stock.name}</span>
                    </td>

                    {/* Stock Prices */}
                    <td className="py-3 px-4 mx-auto">${stock.price}</td>
                    <td className="py-3 px-8 mx-auto">${stock.currentPrice}</td>

                    {/* Trend Chart (Replace with your actual component) */}
                    <td className="py-3 px-4 mx-auto">
                      {/* <StockTrendChart trendData={stock.trend} /> */}
                      <StockTrendChartMini />
                    </td>

                    {/* Percentage Change */}
                    <td className="py-3 px-4 text-green-400 flex items-center gap-1">
                      +{stock.percentage} ({stock.change}%)
                      <span>⬆</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-5 relative w-[76rem] max-w-[60rem] 2xl:max-w-[76rem]">
          {/* Title & Right Arrow */}
          <div className="flex justify-between items-center">
            <div className="font-semibold">Top Gainers</div>
            <div className="flex gap-2">
              <button
                className="rounded-full dark:bg-[#001B51] bg-[#e5f4ff] p-2 cursor-pointer"
                onClick={scrollLeft}
              >
                <MdArrowBackIos className="dark:text-white" />
              </button>
              <button
                className="rounded-full dark:bg-[#001B51] bg-[#e5f4ff] p-2 cursor-pointer"
                onClick={scrollRight}
              >
                <MdArrowForwardIos className="dark:text-white" />
              </button>
            </div>
          </div>

          {/* Scrollable Card Slider */}
          <div
            ref={sliderRef}
            className="flex overflow-x-hidden flex-nowrap p-2 scroll-smooth"
          >
            {marketGainers && marketGainers.length > 0 ? (
              marketGainers
                .filter((arr) => Array.isArray(arr) && arr.length > 0) // Ensure arr is an array & not empty
                .map((arr, index) => (
                  <StockWatchlistCard key={index} data={arr[0]} />
                ))
            ) : (
              <p>Loading market data...</p> // Fallback UI
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-5 relative w-[76rem] max-w-[60rem] 2xl:max-w-[76rem]">
          {/* Title & Right Arrow */}
          <div className="flex justify-between items-center">
            <div className="font-semibold">Top Losers</div>
            <div className="flex gap-2">
              <button
                className="rounded-full dark:bg-[#001B51] bg-[#e5f4ff] p-2 cursor-pointer"
                onClick={scrollLeft2}
              >
                <MdArrowBackIos className="dark:text-white" />
              </button>
              <button
                className="rounded-full dark:bg-[#001B51] bg-[#e5f4ff] p-2 cursor-pointer"
                onClick={scrollRight2}
              >
                <MdArrowForwardIos className="dark:text-white" />
              </button>
            </div>
          </div>

          {/* Scrollable Card Slider */}
          <div
            ref={sliderRef2}
            className="flex overflow-x-hidden flex-nowrap p-2 scroll-smooth"
          >
            {marketLosers && marketLosers.length > 0 ? (
              marketLosers
                .filter((arr) => Array.isArray(arr) && arr.length > 0) // Ensure arr is an array & not empty
                .map((arr, index) => (
                  <StockWatchlistCard key={index} data={arr[0]} />
                ))
            ) : (
              <p>Loading market data...</p> // Fallback UI
            )}
          </div>
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#001B51] text-white dark:border border-[#00387E] rounded-lg p-5 w-80 shadow-lg">
              {/* Modal Content */}
              <p className="text-lg font-semibold text-center mb-4">
                Do you want to remove the selected stock from the watchlist?
              </p>

              {/* Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  className="px-4 py-2 text-sm font-medium bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-all"
                  onClick={() => setShowModal(false)} // Add your close function here
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                  onClick={() => {
                    deleteFromWatchlist(
                      choosenStock?.id,
                      () => {
                        setShowModal(false);
                        setWatchList((prevWatchlist) =>
                          prevWatchlist.filter(
                            (item) => item.id !== choosenStock.id
                          )
                        );
                        // if(selectedStock.id!=watchList?[0].id){
                        //   if(watchList.length-1>0)selectedStock=watchList[0]
                        // }
                        // else{
                        //   if(watchList.length-1>0){
                        //     selectedStock=watchList[1]
                        //   }
                        // }
                      },
                      (error) => {
                        console.log("error", error);
                      }
                    );
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}

        {showSearch && (
          <div className="fixed inset-0 flex items-center justify-center z-20">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => {
                setShowSearch(false);
              }}
            ></div>

            {/* Modal Content */}
            <div className="relative z-30 w-[30rem] h-[20rem] rounded-lg p-5 dark:bg-[#001a50] dark:text-white bg-white shadow-lg">
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                  setStocksData();
                }}
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-white cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Title */}
              <div className="text-lg font-bold mb-3">
                Add stock to watchlist
              </div>

              {/* Search Input */}
              <input
                type="text"
                placeholder="Search for a stock..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  fetchStockOptions(e.target.value);
                }}
                className="w-full rounded-lg bg-slate-200 px-2 py-3 border border-gray-300 text-black outline-none"
              />

              {searchQuery?.length > 2 && (
                <div className="dark:bg-[#000A2D] dark:text-white mt-2 rounded-lg p-2 max-h-48 overflow-y-auto notificationScrollbar">
                  {stocksData?.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {stocksData.map((data) => {
                        const isInWatchlist = watchList.some(
                          (item) => item.stock.id === data.id
                        );

                        return (
                          <div
                            key={data.id}
                            className="dark:bg-[#001a50] flex items-center justify-between rounded-lg p-2 cursor-pointer"
                          >
                            <div>
                              <div className="font-semibold">{data.name}</div>
                              <div>({data.ticker})</div>
                            </div>

                            <button
                              className={`p-1 rounded-full ${
                                isInWatchlist
                                  ? "bg-green-500"
                                  : "bg-blue-500 hover:bg-blue-600"
                              } text-white transition`}
                              onClick={() => {
                                if (!isInWatchlist) {
                                  addToWatchList(
                                    data.id,
                                    () => {
                                      updateState(data);
                                    },
                                    (error) => {
                                      console.log("error", error);
                                    }
                                  );
                                }
                              }}
                            >
                              {isInWatchlist ? (
                                // Tick Icon
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                // Plus Icon
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4v16m-8-8h16"
                                  />
                                </svg>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div>No stocks found</div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Market;
