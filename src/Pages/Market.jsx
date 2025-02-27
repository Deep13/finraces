import Sidebar from "../Components/Sidebar"
import StockWatchlistCard from "../Components/StockWatchlistCard"
import { MdArrowBackIos , MdArrowForwardIos} from "react-icons/md";
import facebookLogo from "../assets/images/f.png"
import StockTrendChart from "../Components/StockTrendChart";
import { IoIosArrowDown} from "react-icons/io";
import { useEffect, useState } from "react";
import StockTrendChartMini from "../Components/StockChartMini";
import { getMarketLosers } from "../Utils/api";

const stockData = [
    {
      name: "Facebook",
      logo: "Facebook-logo.png",
      price: "4,099",
      currentPrice: "4,099",
      trend: [10, 15, 12, 18, 16, 22],
      percentage: 20,
      change: 5,
    },
    {
        name: "Facebook",
        logo: "Facebook-logo.png",
        price: "4,099",
        currentPrice: "4,099",
        trend: [10, 15, 12, 18, 16, 22],
        percentage: 20,
        change: 5,
      },
      {
        name: "Facebook",
        logo: "Facebook-logo.png",
        price: "4,099",
        currentPrice: "4,099",
        trend: [10, 15, 12, 18, 16, 22],
        percentage: 20,
        change: 5,
      },
      {
        name: "Facebook",
        logo: "Facebook-logo.png",
        price: "4,099",
        currentPrice: "4,099",
        trend: [10, 15, 12, 18, 16, 22],
        percentage: 20,
        change: 5,
      },
  ];

  const filterOptions = ["All", "Tech", "Finance", "Healthcare"];
  const sortOptions = ["Relevance", "Price: High to Low", "Price: Low to High"];

const Market = () => {
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [selectedSort, setSelectedSort] = useState("Relevance");
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    useEffect(()=>{
        getMarketLosers(
            (data)=>{console.log(data)},
            (data)=>{console.log("error",data)}
        )
    })
  return (
    <div className='w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]'>
    {/* Ensure sidebar is inside a container with sufficient height */}
        <Sidebar />
        
        <div className='flex flex-col w-[70rem] gap-2 dark:bg-[#000D38] py-5 md:px-10 mx-[1rem] md:mx-[7rem] flex-1 rounded-xl border dark:border-[#00387E]  dark:text-white'>
            <span className='font-semibold text-[1.5rem] font-poppins flex flex-row items-center'>
                <MdArrowBackIos/>
               My Dashboard
            </span>

            <div className="flex flex-col gap-2 mt-5">
                <div className="flex justify-between">
                    <div className="font-semibold">
                        Best Stock
                    </div>
                    <div className="rounded-full bg-[#001B51] p-1 cursor-pointer">
                        <MdArrowForwardIos/>
                    </div>
                </div>
                <div className="flex gap-2 custom-scrollbar overflow-x-scroll flex-nowrap p-2">
                <StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />
                    <StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />
                    <StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />
                    <StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />
                    <StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />
                    <StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />
                </div>

            </div>

            <div className="flex justify-center gap-5 mt-5">
                <div className=" flex flex-1 flex-col gap-2">
                <div className="flex p-2 gap-5 rounded-lg">
                            <img className="rounded-full" src={facebookLogo} alt='stockImg'></img>
                            <div className="">
                                <div className="text-xl font-bold">Facebook(FCB)</div>
                                <div className="flex items-center justify-between gap-3">
                                    <div className="font-semibold">450$</div>
                                    <div className="flex gap-2 text-red-500">20%(-5%) <IoIosArrowDown/> </div>
                                </div>
                            </div>
                        </div>
                    <div className="bg-[#001B51] rounded-lg p-3 border border-[#00387E] h-80">
                        <StockTrendChart/>
                    </div>

                </div>
                <div className="bg-[#001B51] rounded-lg p-3 border border-[#00387E] flex-2 ">
                    <div className="flex justify-between mb-2">
                        <div className="font-semibold">WatchList</div>
                        <div className="">See all</div>
                    </div>
                    <div className="flex flex-col gap-2 max-h-80 overflow-y-scroll custom-scrollbar p-2">
                    <div className="flex justify-between p-2 gap-5 dark:bg-[#002763] border dark:border-[#00387E] rounded-lg">
                    <img className="rounded-full" src={facebookLogo} alt='stockImg'></img>
                            <div className="">
                                <div className=" font-bold">Facebook(FCB)</div>
                                <div className="flex items-center justify-between gap-3">
                                    <div className="font-semibold">450$</div>
                                    <div className="flex gap-2 text-red-500">20%(-5%) <IoIosArrowDown/> </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="flex justify-between p-2 gap-5 dark:bg-[#002763] border dark:border-[#00387E] rounded-lg">
                        <img className="rounded-full" src={facebookLogo} alt='stockImg'></img>
                            <div className="">
                                <div className=" font-bold">Facebook(FCB)</div>
                                <div className="flex items-center justify-between gap-3">
                                    <div className="font-semibold">450$</div>
                                    <div className="flex gap-2 text-red-500">20%(-5%) <IoIosArrowDown/> </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between p-2 gap-5 dark:bg-[#002763] border dark:border-[#00387E] rounded-lg">
                        <img className="rounded-full" src={facebookLogo} alt='stockImg'></img>
                            <div className="">
                                <div className=" font-bold">Facebook(FCB)</div>
                                <div className="flex items-center justify-between gap-3">
                                    <div className="font-semibold">450$</div>
                                    <div className="flex gap-2 text-red-500">20%(-5%) <IoIosArrowDown/> </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between p-2 gap-5 dark:bg-[#002763] border dark:border-[#00387E] rounded-lg">
                        <img className="rounded-full" src={facebookLogo} alt='stockImg'></img>
                            <div className="">
                                <div className=" font-bold">Facebook(FCB)</div>
                                <div className="flex items-center justify-between gap-3">
                                    <div className="font-semibold">450$</div>
                                    <div className="flex gap-2 text-red-500">20%(-5%) <IoIosArrowDown/> </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between p-2 gap-5 dark:bg-[#002763] border dark:border-[#00387E] rounded-lg">
                        <img className="rounded-full" src={facebookLogo} alt='stockImg'></img>
                            <div className="">
                                <div className=" font-bold">Facebook(FCB)</div>
                                <div className="flex items-center justify-between gap-3">
                                    <div className="font-semibold">450$</div>
                                    <div className="flex gap-2 text-red-500">20%(-5%) <IoIosArrowDown/> </div>
                                </div>
                            </div>
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
                    <div className="relative">
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
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative">
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
                    </div>

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
                            <img src={facebookLogo} alt={stock.name} className="w-10 h-10 rounded-full" />
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

            <div className="flex flex-col gap-2 mt-5">
                <div className="flex justify-between">
                    <div className="font-semibold">
                        Top Gainers
                    </div>
                    <div className="rounded-full bg-[#001B51] p-1 cursor-pointer">
                        <MdArrowForwardIos/>
                    </div>
                </div>
                <div className="flex gap-2 custom-scrollbar overflow-x-scroll flex-nowrap p-2">
                <StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />
                    <StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />
                    <StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />
                    <StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />
                    <StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />

<StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />
                    <StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />
                    <StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />
                </div>

            </div>
            <div className="flex flex-col gap-2 mt-5">
                <div className="flex justify-between">
                    <div className="font-semibold">
                       Top Loosers
                    </div>
                    <div className="rounded-full bg-[#001B51] p-1 cursor-pointer">
                        <MdArrowForwardIos/>
                    </div>
                </div>
                <div className="flex gap-2 custom-scrollbar overflow-x-scroll flex-nowrap p-2">
                <StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />
                    <StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />
                    <StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />
                    <StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />
                    <StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />
                    <StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />
                    <StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />
                    <StockWatchlistCard
                    
                    data={{
                        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
                        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
                        "price": 297.46,
                        "type": "CS",
                        "primary_exchange": "XNAS",
                        "market": "stocks",
                        "currency_name": "usd",
                        "active": true,
                        "name": "Tesla, Inc. Common Stock",
                        "ticker_root": null,
                        "ticker": "TSLA",
                        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
                        "createdAt": "2025-02-23T11:38:50.932Z",
                        "updatedAt": "2025-02-23T11:38:50.932Z"
                    }}
                    />
                </div>

            </div>
        </div>
    </div>
  )
}

export default Market