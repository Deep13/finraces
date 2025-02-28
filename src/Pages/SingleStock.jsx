import Sidebar from "../Components/Sidebar"
import { IoIosArrowDown} from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import facebookLogo from "../assets/images/f.png"
import { RxMixerVertical } from "react-icons/rx";
import { useEffect, useState } from "react";
import StockTrendChart from "../Components/StockTrendChart";
import { useContext } from "react";
import DarkModeProvider, { DarkModeContext } from "../Contexts/DarkModeProvider";
import { addToWatchList, getStockHistory, getStockProfile } from "../Utils/api";
import { useParams } from "react-router-dom";

const SingleStock = () => {

    const [graphType, setGraphType] = useState("price");
    const [timeRange, setTimeRange] = useState("5M");
    const [years, setYears] = useState("Years");
    const [filter, setFilter] = useState("Filters");
    const [timeOpen, setTimeOpen] = useState(false);
    const [yearsOpen, setYearsOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    // const {selectedStock}=useContext(DarkModeContext)
    const [stockData,setStockData]=useState();
    const [historyData,setHistoryData]=useState();

    const {ticker,id}=useParams()

    useEffect(
      ()=>{
        getStockProfile(
          (data)=>{
          setStockData(data[0]);
          console.log(id)
          console.log("here",data)

        },
        (error)=>{console.log(error)},ticker)

        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        const fromDate = sevenDaysAgo.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const toDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

        getStockHistory(ticker,'1day',fromDate,toDate,
          (data)=>{
            console.log("c",ticker,fromDate,toDate,data)
          setHistoryData(data)
        }
        ,(error)=>{console.log(error)})
        
    },[])
  
  return (
    <div className="w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]">
        <Sidebar/>

        <div className="dark:bg-[#000D38] py-5 md:px-10 mx-[1rem] md:mx-[7rem] flex flex-1 flex-col gap-3 rounded-xl border dark:border-[#00387E] dark:text-white">
            <div className="flex justify-between items-center">
                <div className="flex justify-between p-2 gap-5 rounded-lg">
                    <img className="rounded-full w-12 h-12" src={stockData?.image? stockData.image:facebookLogo} alt='stockImg'></img>
                        <div className="">
                            <div className=" font-bold">{stockData?.companyName? stockData.companyName:"Facebook"} ({stockData?ticker:"FEB"})</div>
                            <div className="flex items-center justify-between gap-3">
                                <div className="font-semibold">{stockData?.price? stockData.price:281}$</div>
                                <div className="flex gap-2 text-red-500">{stockData?.changes? stockData.changes:12}% <IoIosArrowDown/> </div>
                            </div>
                        </div>
                </div>

                <div onClick={()=>{addToWatchList(id,(data)=>{console.log(data),(error)=>{console.log(error)}})}} className="flex gap-2 items-center rounded-md border dark:border-[#00387E] px-3 cursor-pointer py-1">
                    <FaPlus/>
                    Watchlist
                </div>
            </div>

            <div className="flex justify-between py-2 px-5 gap-5 dark:bg-[#002763] border dark:border-[#00387E] rounded-xl">
                <div className=" flex flex-col justify-center gap-2 h-32">
                    <div className="text-[#D1D1D1]">Market Cap</div>
                    <div className="font-semibold text-xl font-popins">{stockData?.mktCap? stockData.mktCap:"150,000,000"}</div>
                    <div className=" mx-auto py-1 px-2 rounded-lg bg-[#26666333] opacity-80 text-[#6BEBA4]">4.12%</div>
                </div>
                <div className=" flex flex-col justify-center gap-2 h-32">
                    <div className="text-[#D1D1D1]">Volume</div>
                    <div className="font-semibold text-xl font-popins">{stockData?.volAvg?stockData.volAvg:"150,000,000"}</div>
                    <div className=" mx-auto py-1 px-2 rounded-lg bg-[#26666333] opacity-80 text-[#6BEBA4]">4.12%</div>
                </div><div className=" flex flex-col justify-center gap-2 h-32">
                    <div className="text-[#D1D1D1]">Circulating Supply</div>
                    <div className="font-semibold text-xl font-popins">15,00,000</div>
                    <div className=" mx-auto py-1 px-2 rounded-lg bg-[#26666333] opacity-80 text-[#6BEBA4]">4.12%</div>
                </div><div className=" flex flex-col justify-center gap-2 h-32">
                    <div className="text-[#D1D1D1]">P/E Ratio</div>
                    <div className="font-semibold text-xl font-popins">15,00,000</div>
                    <div className=" mx-auto py-1 px-2 rounded-lg bg-[#26666333] opacity-80 text-[#6BEBA4]">4.12%</div>
                </div>
            </div>

            <div className="flex justify-between mb-7">
                      <div>
                        <span className="font-semibold text-[1rem] font-poppins items-center flex flex-row mb-5">
                          Chart
                        </span>
                        <div className="border dark:border-[#00387E] flex p-2 rounded-sm cursor-pointer">
                          {["price", "market", "candle"].map((type) => (
                            <span
                              key={type}
                              className={`${graphType === type ? "bg-blue-500" : ""} rounded-md px-7`}
                              onClick={() => setGraphType(type)}
                            >
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </span>
                          ))}
                        </div>
                      </div>
            
                      {/* Dropdowns for Stats */}
                      <div>
                        <span className="font-semibold text-[1rem] font-poppins flex flex-row mb-3 pl-2">
                          Stats
                        </span>
                        <div className="flex p-2 rounded-sm gap-3 relative">
            
                          {/* Time Range Dropdown */}
                          <div className="relative">
                            <button
                              className="flex py-2 items-center justify-between gap-2 pb-1 rounded-md px-3 border dark:border-[#00387E] cursor-pointer"
                              onClick={() => setTimeOpen(!timeOpen)}
                            >
                              {timeRange} <IoIosArrowDown />
                            </button>
                            {timeOpen && (
                              <div className="absolute top-full left-0 w-full bg-white dark:bg-[#00387E] shadow-lg rounded-md mt-1 z-10">
                                {["1M", "3M", "6M", "1Y", "5Y"].map((option) => (
                                  <div
                                    key={option}
                                    className="p-2 py-4 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer text-center"
                                    onClick={() => {
                                      setTimeRange(option);
                                      setTimeOpen(false);
                                    }}
                                  >
                                    {option}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
            
                          {/* Years Dropdown */}
                          <div className="relative">
                            <button
                              className="flex py-2 items-center justify-between gap-2 pb-1 rounded-md px-3 border dark:border-[#00387E] cursor-pointer"
                              onClick={() => setYearsOpen(!yearsOpen)}
                            >
                              {years} <IoIosArrowDown />
                            </button>
                            {yearsOpen && (
                              <div className="absolute top-full left-0 w-full bg-white dark:bg-[#00387E] shadow-lg rounded-md mt-1 z-10">
                                {["2023", "2024", "2025"].map((option) => (
                                  <div
                                    key={option}
                                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer text-center"
                                    onClick={() => {
                                      setYears(option);
                                      setYearsOpen(false);
                                    }}
                                  >
                                    {option}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
            
                          {/* Filters Dropdown */}
                          <div className="relative">
                            <button
                              className="flex py-2 items-center justify-between gap-2 pb-1 rounded-md px-3 border dark:border-[#00387E] cursor-pointer"
                              onClick={() => setFilterOpen(!filterOpen)}
                            >
                              {filter} <RxMixerVertical />
                            </button>
                            {filterOpen && (
                              <div className="absolute top-full left-0 w-full bg-white dark:bg-[#00387E] shadow-lg rounded-md mt-1 z-10">
                                {["Volume", "Market Cap", "Growth"].map((option) => (
                                  <div
                                    key={option}
                                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer text-center"
                                    onClick={() => {
                                      setFilter(option);
                                      setFilterOpen(false);
                                    }}
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

            <div className="dark:bg-[#002763] h-80 border dark:border-[#00387E] rounded-xl">
                <StockTrendChart stockData={historyData}/>
            </div>
        </div>
    </div>
  )
}

export default SingleStock