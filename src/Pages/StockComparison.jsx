import { useCallback, useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosCloseCircleOutline  } from "react-icons/io";
import { RxMixerVertical } from "react-icons/rx";
import { FaArrowRight } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";
import StockChart from "../Components/StockChart";
import StockWatchlistCard from "../Components/StockWatchlistCard"
import {debounceStockSearchj, getStockHistory, searchStock} from "../Utils/api";
import { debounce } from "lodash";


const StockComparison = () => {
  const [graphType, setGraphType] = useState("price");

  // State for dropdowns
  const [timeRange, setTimeRange] = useState("5M");
  const [years, setYears] = useState("Years");
  const [filter, setFilter] = useState("Filters");

  // Dropdown visibility states
  const [timeOpen, setTimeOpen] = useState(false);
  const [yearsOpen, setYearsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [dropdownOpen,setDropdownOpen] = useState(false);
  const [selectedStocks,setSelectedStocks] = useState(["","","",""]);
  const [openedIndex,setOpenedIndex] = useState(0);
  const [stocksData,setStocksData] = useState();

  const [showModal,setShowModal] = useState(false);

  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const stockColors = [ "#00E396","#FEB019","#FF4560","#775DD0"]
  const [tableData, setTableData] = useState([]);
  const [datasets,setDatasets] = useState([{},{},{},{}]);
  const [chartData,setChartData] = useState([{},{},{},{}]);
  // useEffect(() => {
  //   // Filter out empty values from selectedStocks
  //   const validStocks = selectedStocks.filter(stock => stock.trim() !== "");
    
  //   if (validStocks.length === 0) {
  //     // If no stocks are selected, set tableData to "--"
  //     setTableData([
  //       { label: "Market Value", values: Array(4).fill("--") },
  //       { label: "Enterprise Value", values: Array(4).fill("--") },
  //       { label: "Price to Earnings", values: Array(4).fill("--") },
  //       { label: "Diluted Earnings", values: Array(4).fill("--") },
  //       { label: "Sector", values: Array(4).fill("--") },
  //       { label: "Industry", values: Array(4).fill("--") },
  //       { label: "CEO", values: Array(4).fill("--") },
  //     ]);
  //     return;
  //   }
  
  //   // Ensure tableData always has 4 values, filling missing ones with "--"
  //   const transformedData = [
  //     {
  //       label: "Market Value",
  //       values: Array(4).fill("--").map((_, i) => stocksData.stocks[validStocks[i]]?.marketValue || "--"),
  //     },
  //     {
  //       label: "Enterprise Value",
  //       values: Array(4).fill("--").map((_, i) => stocksData.stocks[validStocks[i]]?.enterpriseValue || "--"),
  //     },
  //     {
  //       label: "Price to Earnings",
  //       values: Array(4).fill("--").map((_, i) => stocksData.stocks[validStocks[i]]?.priceToEarnings || "--"),
  //     },
  //     {
  //       label: "Diluted Earnings",
  //       values: Array(4).fill("--").map((_, i) => stocksData.stocks[validStocks[i]]?.dilutedEarning || "--"),
  //     },
  //     {
  //       label: "Sector",
  //       values: Array(4).fill("--").map((_, i) => stocksData.stocks[validStocks[i]]?.sector || "--"),
  //     },
  //     {
  //       label: "Industry",
  //       values: Array(4).fill("--").map((_, i) => stocksData.stocks[validStocks[i]]?.industry || "--"),
  //     },
  //     {
  //       label: "CEO",
  //       values: Array(4).fill("--").map((_, i) => stocksData.stocks[validStocks[i]]?.ceo || "--"),
  //     },
  //   ];
  
  //   console.log("tableData", transformedData);
  //   setTableData(transformedData);
  
  //   // Chart data update
  //   setDatasets(validStocks.map((stock, index) => ({
  //     label: stock,
  //     data: stocksData.stocks[stock]?.data || [], // Ensure safe access
  //     borderColor: stockColors[index] || "#000", // Default color
  //   })));
  // }, [stocksData, selectedStocks]);

  const fetchAndTransformStockData = async (timeframe, startDate, endDate) => {
   selectedStocks.map((stock)=>{
      if(stock==''){
       return;
      }
      else{
        console.log(stock.ticker,timeframe,startDate,endDate)
        getStockHistory(stock.ticker,timeframe,startDate,endDate,(data)=>{console.log("data here",data),()=>{}})
      }


   })
  };
  

  const [searchQuery, setSearchQuery] = useState("");

  const fetchStockOptions = useCallback(
          debounce(async (inputValue) => {
              if (inputValue.length > 2) {
                  try {
                      await debounceStockSearchj(inputValue, (data) => {
                          console.log("data",data)
                          setStocksData(data);
                      }); // Call API to search stocks
  
                  } catch (error) {
                      console.error("Error fetching stocks:", error);
                     
                  } finally {
                     console.log("final")
                  }
              } else {
                  console.log("A")
              }
          }, 500), // Debounce to limit API calls
          []
      );
  
  return (
    <div className="w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]">
      <Sidebar />
      <div className="dark:bg-[#000D38] py-5 md:px-10 mx-[1rem] md:mx-[7rem] flex flex-1 flex-col rounded-xl border dark:border-[#00387E] dark:text-white">
        
        {/* Header */}
        <div>
          <span className="font-semibold text-[1.5rem] font-poppins items-center flex flex-row mb-5">
            <MdArrowBackIos />
            Stock Comparison
          </span>
        </div>

        <div 
          className=" bg-[#e4eaf0] dark:bg-[#001a50] flex rounded-xl py-2 px-2 mb-7">
          <div className="w-[10%]">
            <span>Add Stocks</span>
          </div>
          {/* <div className="flex  justify-between w-[95%]">
            {Array(4)
              .fill()
              .map((_, index) => (
                <div
                onClick={()=>{
                  setShowModal(true)
                  setOpenedIndex(index)
                  }} 
                  key={index}
                  className="w-[24%] cursor-pointer dark:text-slate-400 bg-[#e5f4ff] dark:bg-[#001B51] border dark:border-[#00387E] flex flex-col justify-center items-center rounded-lg"
                >
                  <IoAddCircleOutline size={32} />
                  <span>Add Stock</span>
                </div>
              ))}
          </div> */}
          <div className="flex justify-center gap-2 w-[100%]">
    {Array(4)
      .fill()
      .map((_, index) => (
        selectedStocks[index] ? (
          // Display Stock Card when a stock is selected
          <div
            onClick={() => {
              setShowModal(true);
              setOpenedIndex(index);
            }} 
            key={index}
          >
             <StockWatchlistCard data={selectedStocks[index]}/>            
          </div>
        ) : (
          // Show "Add Stock" button if nothing is selected
          <div
            onClick={() => {
              setShowModal(true);
              setOpenedIndex(index);
            }} 
            key={index}
            className="w-[24%] h-40 cursor-pointer dark:text-slate-400 bg-[#e5f4ff]
             dark:bg-[#001B51] border dark:border-[#00387E] flex flex-col justify-center 
             items-center rounded-lg"
          >
            <IoAddCircleOutline size={32} />
            <span>Add Stock</span>
          </div>
        )
      ))}
  </div>
        </div>
        <div className= "flex items-center justify-center">
          <button
            className="py-2 px-3 bg-blue-500 rounded-md"
           onClick={async()=>{
            const d= await fetchAndTransformStockData('1hour',"2025-02-20", "2025-02-27")
            setChartData(d)}}>
            Compare Stocks
          </button>
        </div>
        {/* Chart & Stats */}
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
        {/* Chart Placeholder */}
        <div className="h-[30rem] w-full bg-[#e4eaf0]  dark:bg-[#001a50] flex rounded-xl py-2 px-5 mb-7">
          <div className="w-full h-full">
            <StockChart labels={labels} datasets={chartData} />
          </div>
        </div>


        {/* Stocks Header */}
        <div className="h-[3rem] border-2 dark:border-0 dark:bg-[#001a50] grid grid-cols-5 rounded-xl py-2 px-5 mb-7 font-poppins font-semibold">
          <div className="col-span-1 flex justify-center items-center">
            Stocks
            <FaArrowRight />
          </div>
          {/* {datasets.map((stock, index) => (
            <div key={index} className="flex justify-center items-center gap-2">
              <div>{stock.label}</div>
              <div style={{ backgroundColor: stock.borderColor }} className={`w-5 h-5`}></div>
            </div>
          ))} */}
          {selectedStocks.map((stock,index)=>(
            <div key={index} className="flex justify-center items-center gap-2">
              <div>{stock.ticker}</div>
              <div style={{ backgroundColor:stockColors[index] }} className={`w-5 h-5`}></div>
            </div>
          ))}
        </div>

        {/* Table Section */}
        <div className="h-auto dark:bg-[#001a50] dark:border-0 border-2 rounded-xl py-2 px-5 mb-7">
          
          {tableData.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-5 gap-4  dark:text-slate-200 py-2">
              <div className="col-span-1 flex justify-start">{row.label}</div>
              {row.values.map((value, colIndex) => (
                <div key={colIndex} className="flex justify-center">
                  {value || "--"}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="h-auto dark:bg-[#001a50] dark:border-0 border-2 rounded-xl py-2 px-5 mb-7">
          <div className="font-semibold text-[1.5rem] font-poppins my-5">Price Performance</div>
          {tableData.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-5 gap-4 dark:text-slate-200 py-2">
              <div className="col-span-1 flex justify-start">{row.label}</div>
              {row.values.map((value, colIndex) => (
                <div key={colIndex} className="flex justify-center">
                  {value}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="h-auto dark:bg-[#001a50] dark:border-0 border-2 rounded-xl py-2 px-5 mb-7">
          <div className="font-semibold text-[1.5rem] font-poppins my-5">Income Statement</div>
          {tableData.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-5 gap-4 dark:text-slate-200 py-2">
              <div className="col-span-1 flex justify-start">{row.label}</div>
              {row.values.map((value, colIndex) => (
                <div key={colIndex} className="flex justify-center">
                  {value}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="h-auto dark:bg-[#001a50] dark:border-0 border-2 rounded-xl py-2 px-5 mb-7">
          <div className="font-semibold text-[1.5rem] font-poppins my-5">Margin</div>
          {tableData.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-5 gap-4 dark:text-slate-200 py-2">
              <div className="col-span-1 flex justify-start">{row.label}</div>
              {row.values.map((value, colIndex) => (
                <div key={colIndex} className="flex justify-center">
                  {value}
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>

      
     {showModal && (
  <div className="fixed inset-0 flex items-center justify-center z-20">
    {/* Overlay */}
    <div 
      className="absolute inset-0 bg-black bg-opacity-50"
      onClick={() => {
        setShowModal(false);
        setDropdownOpen(false);
      }}
    ></div>

    {/* Modal Content */}
    <div className="relative z-30 w-[30rem] h-[20rem] rounded-lg p-5 dark:bg-[#001a50] dark:text-white bg-white shadow-lg">
      {/* Close Button */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full transition"
      >
        <IoIosCloseCircleOutline size={32} />
      </button>

      {/* Title */}
      <div className="text-lg font-bold mb-3">Add stock to compare</div>

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

      {searchQuery?.length>2 &&
        <div className="dark:bg-[#000A2D] dark:text-white mt-2 rounded-lg p-2 max-h-48 overflow-y-auto notificationScrollbar">
          {stocksData?.length>0?
          (
            <div className="flex flex-col gap-2">
              {stocksData.map((data)=>(
                <div onClick={()=>{
                  selectedStocks[openedIndex]=data
                  setSearchQuery("");
                  setShowModal(false);
                }} className="dark:bg-[#001a50] rounded-lg p-2 cursor-pointer" key={data.id}>
                  <div className="font-semibold">{data.name}</div>
                  <div>({data.ticker})</div>
                </div>
              )
                
              )}
            </div>
          ):(
            <div>No stocks found</div>
          )  
        }
        </div>
      }
    </div>
  </div>
)}



      
    </div>
  );
};

export default StockComparison;
