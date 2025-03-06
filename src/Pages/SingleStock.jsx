import Sidebar from "../Components/Sidebar"
import { IoIosArrowDown} from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa6";
import facebookLogo from "../assets/images/f.png"
import { RxMixerVertical } from "react-icons/rx";
import { useEffect, useState } from "react";
import StockTrendChart from "../Components/StockTrendChart";
import { useContext } from "react";
import DarkModeProvider, { DarkModeContext } from "../Contexts/DarkModeProvider";
import { addToWatchList, checkWatchlist, deleteFromWatchlist, getStockChartData, getStockComparisonData, getStockHistory, getStockProfile, getWatchList } from "../Utils/api";
import { useParams } from "react-router-dom";
import CandleChart from "../Components/CandleChart";

const SingleStock = () => {

    const [graphType, setGraphType] = useState("area");
    const [timeRange, setTimeRange] = useState("1M");
    const [years, setYears] = useState("Years");
    const [filter, setFilter] = useState("Filters");
    const [timeOpen, setTimeOpen] = useState(false);
    const [yearsOpen, setYearsOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    // const {selectedStock}=useContext(DarkModeContext)
    const [inWatchlist,setInWatchList]=useState(false);
    const [watchListID,setWatchListID]=useState(null);
    const [stockData,setStockData]=useState();
    const [historyData,setHistoryData]=useState();
    const[PERatio,setPERatio]=useState(157.45);
    const [showPopUp,setShowPopUp]=useState(false);

    const filterMap={"1D":1,"1W":7,"1M":30,"3M":90,"6M":180}
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

        getStockComparisonData(ticker,(data)=>{
          setPERatio(data?.peratio)
        },(error)=>{
          console.log("Error",error)
        })

        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - filterMap[timeRange]);

        const fromDate = sevenDaysAgo.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const toDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        let units='day';
        if (timeRange === '1D') {
          units = 'hour';
      }
        getStockChartData(ticker,fromDate,toDate,units,
          (data)=>{
            console.log("c",ticker,fromDate,toDate,data)
          setHistoryData(data)
        }
        ,(error)=>{console.log(error)})

        // checkWatchlist(ticker,(data)=>{setInWatchList(data)},(error)=>{console.log("Error",error)})
        getWatchList((data)=>{
          console.log("big d",data)
          data.data.map((entry)=>{
            if(entry.stock.ticker==ticker){
              setInWatchList(true);
              setWatchListID(entry.id);
            }
          })
        },(error)=>{
          console.log("Error",error)
        })
        
    },[])

    

    useEffect(()=>{
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - filterMap[timeRange]);

      const fromDate = sevenDaysAgo.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      const toDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      let units='day';
      if (timeRange === '1D') {
        units = 'hour';
    }
      getStockChartData(ticker,fromDate,toDate,units,
        (data)=>{
          console.log("c",ticker,fromDate,toDate,data)
        setHistoryData(data)
      }
      ,(error)=>{console.log(error)})
    },[timeRange])
  
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

                {inWatchlist?(
                  <div onClick={()=>{deleteFromWatchlist(watchListID,(data)=>{console.log(data); setInWatchList(false); setShowPopUp(true)},(error)=>{console.log(error)})}} className="flex gap-2 items-center rounded-md border dark:border-[#00387E] px-3 cursor-pointer py-1">
                  <FaMinus/>
                  Watchlist
              </div>
                ):(
                  <div onClick={()=>{addToWatchList(id,(data)=>{console.log(data); setInWatchList(true); setShowPopUp(true)},(error)=>{console.log(error)})}} className="flex gap-2 items-center rounded-md border dark:border-[#00387E] px-3 cursor-pointer py-1">
                    <FaPlus/>
                    Watchlist
                </div>
                )}
            </div>

            <div className="flex justify-between py-2 px-5 gap-5 dark:bg-[#002763] border dark:border-[#00387E] rounded-xl">
                <div className=" flex flex-col justify-center gap-2 h-32">
                    <div className="text-[#D1D1D1]">Market Cap</div>
                    <div className="font-semibold text-xl font-popins">{stockData?.mktCap? stockData.mktCap:"150,000,000"}</div>
                    
                </div>
                <div className=" flex flex-col justify-center gap-2 h-32">
                    <div className="text-[#D1D1D1]">Volume</div>
                    <div className="font-semibold text-xl font-popins">{stockData?.volAvg?stockData.volAvg:"150,000,000"}</div>
                    
                </div><div className=" flex flex-col justify-center gap-2 h-32">
                    <div className="text-[#D1D1D1]">DCF</div>
                    <div className="font-semibold text-xl font-popins">{stockData?.dcf? stockData.dcf.toFixed(2):"150,000"}</div>
                    
                </div><div className=" flex flex-col justify-center gap-2 h-32">
                    <div className="text-[#D1D1D1]">P/E Ratio</div>
                    <div className="font-semibold text-xl font-popins">{PERatio}</div>
                    
                </div>
            </div>

            <div className="flex justify-between mb-7">
                      <div>
                        <span className="font-semibold text-[1rem] font-poppins items-center flex flex-row mb-5">
                          Chart
                        </span>
                        <div className="border dark:border-[#00387E] flex p-2 rounded-sm cursor-pointer">
                          {["area", "candle"].map((type) => (
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
                                {["1D", "1W", "1M", "3M", "6M"].map((option) => (
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
                          
                        </div>
                      </div>
            </div>

            <div className="dark:bg-[#002763] h-80 border dark:border-[#00387E] rounded-xl">
                {graphType=="area"&&<StockTrendChart stockData={historyData} static={false} filter={timeRange}/>}
                {graphType=="candle"&&<CandleChart stockData={historyData} static={false} filter={timeRange}/>}
            </div>

            {showPopUp&&
            <div className="dark:bg-[#002763] border dark:border-[#00387E] flex flex-col items-center justify-center gap-5 absolute top-30 left-[65%] w-60 h-40 rounded-lg p-2">
               <div className="mx-auto text-center"> Stock has been {inWatchlist?"added to the watchlist":"removed from the watchlist"}</div>  
               <div className="bg-blue-500 px-3 py-2 rounded-lg cursor-pointer" onClick={()=>setShowPopUp(false)}>Close</div>
              </div>}
        </div>
    </div>
  )
}

export default SingleStock