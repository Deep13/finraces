import Sidebar from "../Components/Sidebar"
import { MdArrowBackIos} from "react-icons/md";
import { useState } from "react";
import { IoIosArrowDown} from "react-icons/io";
import facebookLogo from "../assets/images/f.png"
import StockTrendChartMini from "../Components/StockChartMini";
import { FaSearch } from "react-icons/fa";

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



const StockMarketTable = () => {
    const filterOptions = ["All", "Tech", "Finance", "Healthcare"];
    const sortOptions = ["Relevance", "Price: High to Low", "Price: Low to High"];

    const [selectedFilter, setSelectedFilter] = useState("All");
    const [selectedSort, setSelectedSort] = useState("Relevance");
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className='w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]'>
        <Sidebar />
        
        <div className='flex flex-col w-[70rem] gap-5 dark:bg-[#000D38] py-5 md:px-6 mx-[1rem] md:mx-[7rem] flex-1 rounded-xl border dark:border-[#00387E]  dark:text-white'>
            <div className="flex justify-between items-center ">
                <div className='font-semibold text-[1.5rem] font-poppins flex flex-row items-center'>
                    <MdArrowBackIos/>
                    Stock Market
                </div>

                <div>
                    <div className="flex gap-2 text-white relative">
                        <div className="flex cursor-pointer items-center rounded-full bg-[#001B51] p-3 border border-[#00387E]">
                            <FaSearch size={16}/>
                        </div>            
                        {/* Filter Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => setFilterOpen(!filterOpen)} 
                                className="flex items-center bg-[#002763] px-4 py-2 rounded-xl"
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
                                className="flex items-center bg-[#002763] px-4 py-2 rounded-xl"
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
            </div>

            <div className="w-full bg-[#001B51] rounded-lg p-3 border border-[#00387E]">
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
    </div>
  )
}

export default StockMarketTable