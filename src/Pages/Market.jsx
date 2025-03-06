import Sidebar from "../Components/Sidebar"
import StockWatchlistCard from "../Components/StockWatchlistCard"
import { MdArrowBackIos , MdArrowForwardIos} from "react-icons/md";
import facebookLogo from "../assets/images/f.png"
import StockTrendChart from "../Components/StockTrendChart";
import { IoIosArrowDown} from "react-icons/io";
import { useEffect, useState, useRef } from "react";
import StockTrendChartMini from "../Components/StockChartMini";
import { getMarketGainers, getMarketLosers, getStockChartData, getStockHistory, getWatchList,searchStock } from "../Utils/api";

const stockData = [
    {
      name: "Apple",
      logo: "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/AAPL_icon.png",
      price: "236.86",
      currentPrice: "236.86",
      trend: [10, 15, 16, 28, 16, 22],
      percentage: 45,
      change: 13,
    },
    {
        name: "Tesla",
        logo: "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
        price: "276.31",
        currentPrice: "276.31",
        trend: [21, 15, 12, 18, 16, 22],
        percentage: 21,
        change: 15,
      },
      {
        name: "Netflix",
        logo: "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/NFLX_icon.jpeg",
        price: "975.51",
        currentPrice: "975.51",
        trend: [12, 15, 12, 18, 18, 32],
        percentage: 52,
        change: 12,
      },
      {
        name: "AMD",
        logo: "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/AMD_icon.jpeg",
        price: "101.15",
        currentPrice: "101.15",
        trend: [11, 12, 12, 18, 16, 22],
        percentage: 12,
        change: 23,
      },
  ];

  const filterOptions = ["All", "Tech", "Finance", "Healthcare"];
  const sortOptions = ["Relevance", "Price: High to Low", "Price: Low to High"];

const Market = () => {
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [selectedSort, setSelectedSort] = useState("Relevance");
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const [watchList,setWatchList]=useState();
    const [selectedStock,setSelectedStock]=useState();
    const [chartData,setChartData]=useState();
    const [marketGainers,setMarketGainers]=useState([]);
    const [marketLosers,setMarketLosers]=useState([]);
    const sliderRef = useRef(null);
    const sliderRef2 = useRef(null);

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

    useEffect(()=>{
        getMarketLosers(
            async (data)=>{
                console.log(data)
                try {
                    const results = await Promise.all(data.map(stock => searchStock(stock.ticker)));
                    setMarketLosers(results); // Updates state with resolved values
                } catch (error) {
                    console.error("Error fetching stocks:", error);
                }
            },
            (data)=>{console.log("error",data)}
        )

        getMarketGainers(
            async (data) => {
                console.log(data);
                try {
                    const results = await Promise.all(data.map(stock => searchStock(stock.ticker)));
                    setMarketGainers(results); // Updates state with resolved values
                } catch (error) {
                    console.error("Error fetching stocks:", error);
                }
            },
            (error) => {
                console.log("error", error);
            }
        );
        
        
        getWatchList(
            (data)=>{
                setWatchList(data.data)
                setSelectedStock(data.data[0])
                console.log("check",data)
            },
            (error)=>{console.log("error",error)}
        )
    },[])

    useEffect(()=>{
        const today = new Date();
        const sevenDaysAgo = new Date();
        const ticker=selectedStock?.stock?.ticker;
        sevenDaysAgo.setDate(today.getDate() - 7);

        const fromDate = sevenDaysAgo.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const toDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

        getStockChartData(ticker,fromDate,toDate,'day',(data)=>{
            setChartData(data)
        },(error)=>{console.log(error)})
          
    },[selectedStock])

  return (
    <div className='w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]'>
    {/* Ensure sidebar is inside a container with sufficient height */}
        <Sidebar />
        
        <div className='flex flex-col w-[70rem] gap-2 bg-[#e5f4ff] dark:bg-[#000D38] py-5 md:px-10 mx-[1rem] md:mx-[7rem] flex-1 rounded-xl border dark:border-[#00387E]  dark:text-white'>
            <span className='font-semibold text-[1.5rem] font-poppins flex flex-row items-center'>
               
               My Watchlist
            </span>

            

            <div className="flex justify-center gap-5 mt-5">
                <div className=" flex flex-1 flex-col gap-2">
                   {selectedStock? <div className="flex p-2 gap-5 rounded-lg items-center">
                            <img className="rounded-full w-10 h-10" src={selectedStock?.stock?.icon_url} alt='stockImg'></img>
                            <div className="">
                                <div className="text-xl font-bold">{selectedStock?.stock?.name}({selectedStock?.stock?.ticker})</div>
                                <div className="flex items-center justify-between gap-3">
                                    <div className="font-semibold">{(selectedStock?.stock?.price +'$') ||"N/A"}</div>
                                    {/* <div className="flex gap-2 text-red-500">20%(-5%) <IoIosArrowDown/> </div> */}
                                </div>
                            </div>
                    </div>:
                    <div className="mt-16">
                            
                        </div>}
                    <div className="dark:bg-[#001B51] bg-[#e4eaf0] rounded-lg p-3 w-[57rem] border dark:border-[#00387E] h-80">
                        <StockTrendChart stockData={chartData} filter="1W" static={false}/>
                    </div>

                </div>
                <div>
                <div className="flex justify-between mt-5 mb-5">
                        <div className="font-semibold text-2xl">WatchList</div>
                        {/* <div className="">See all</div> */}
                    </div>
                <div className="dark:bg-[#001B51] bg-[#e4eaf0] rounded-lg p-3 border dark:border-[#00387E] flex-2 ">
                    <div className="flex flex-col gap-2 max-h-[18.5rem] w-[15rem] h-[18.5rem] overflow-y-scroll custom-scrollbar p-2">
                        {watchList?.map((stockData,index)=>(
                            <div onClick={()=>{setSelectedStock(stockData)}} key={index} className=" max-w-60 flex justify-between items-center cursor-pointer p-2 gap-5 bg-[#e5f4ff] dark:bg-[#002763] border dark:border-[#00387E] rounded-lg">
                            <img className="rounded-full w-10 h-10" src={stockData?.stock?.icon_url} alt='stockImg'></img>
                                    <div className="">
                                        <div className=" font-bold">{stockData?.stock?.name}({stockData?.stock.ticker})</div>
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="font-semibold">{stockData?.stock?.price}$</div>
                                            {/* <div className="flex gap-2 text-red-500">20%(-5%) <IoIosArrowDown/> </div> */}
                                        </div>
                                    </div>
                                
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </div>

            <div className="bg-[#001B51] rounded-lg p-3 border border-[#00387E]">
                <div className="flex justify-between items-center">
                <div className="font-bold text-xl text-white">Market Trend</div>

                {/* Filter & Sort Dropdowns */}
                <div className="flex gap-2 text-white relative">
                    
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
                    <table className="w-full text-white">
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
                        <td className="py-3 px-4 flex items-center gap-2">
                            <img src={stock.logo} alt={stock.name} className="w-10 h-10 rounded-full" />
                            <span className="font-semibold">{stock.name}</span>
                        </td>

                        {/* Stock Prices */}
                        <td className="py-3 px-4 mx-auto">${stock.price}</td>
                        <td className="py-3 px-8 mx-auto">${stock.currentPrice}</td>

                        {/* Trend Chart (Replace with your actual component) */}
                        <td className="py-3 px-4 mx-auto">
                            {/* <StockTrendChart trendData={stock.trend} /> */}
                            <StockTrendChartMini/>
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

            <div className="flex flex-col gap-2 mt-5 relative">
            {/* Title & Right Arrow */}
            <div className="flex justify-between items-center">
                <div className="font-semibold">Top Gainers</div>
                <div className="flex gap-2">
                    <button
                        className="rounded-full bg-[#001B51] p-2 cursor-pointer"
                        onClick={scrollLeft}
                    >
                        <MdArrowBackIos className="text-white" />
                    </button>
                    <button
                        className="rounded-full bg-[#001B51] p-2 cursor-pointer"
                        onClick={scrollRight}
                    >
                        <MdArrowForwardIos className="text-white" />
                    </button>
                </div>
            </div>

            {/* Scrollable Card Slider */}
            <div
                ref={sliderRef}
                className="flex gap-2 overflow-x-hidden flex-nowrap p-2 scroll-smooth"
            >
                {marketGainers && marketGainers.length > 0 ? (
                    marketGainers
                        .filter(arr => Array.isArray(arr) && arr.length > 0) // Ensure arr is an array & not empty
                        .map((arr, index) => (
                            <StockWatchlistCard key={index} data={arr[0]} />
                        ))
                ) : (
                    <p>Loading market data...</p> // Fallback UI
                )}
            </div>
        </div>
        <div className="flex flex-col gap-2 mt-5 relative">
            {/* Title & Right Arrow */}
            <div className="flex justify-between items-center">
                <div className="font-semibold">Top Losers</div>
                <div className="flex gap-2">
                    <button
                        className="rounded-full bg-[#001B51] p-2 cursor-pointer"
                        onClick={scrollLeft2}
                    >
                        <MdArrowBackIos className="text-white" />
                    </button>
                    <button
                        className="rounded-full bg-[#001B51] p-2 cursor-pointer"
                        onClick={scrollRight2}
                    >
                        <MdArrowForwardIos className="text-white" />
                    </button>
                </div>
            </div>

            {/* Scrollable Card Slider */}
            <div
                ref={sliderRef2}
                className="flex gap-2 overflow-x-hidden flex-nowrap p-2 scroll-smooth"
            >
                {marketLosers && marketLosers.length > 0 ? (
                    marketLosers
                        .filter(arr => Array.isArray(arr) && arr.length > 0) // Ensure arr is an array & not empty
                        .map((arr, index) => (
                            <StockWatchlistCard key={index} data={arr[0]} />
                        ))
                ) : (
                    <p>Loading market data...</p> // Fallback UI
                )}
            </div>
        </div>
        </div>
    </div>
  )
}

export default Market