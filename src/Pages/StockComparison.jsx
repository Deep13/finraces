import { useCallback, useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosCloseCircleOutline  } from "react-icons/io";
import { RxMixerVertical } from "react-icons/rx";
import { FaArrowRight } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";
import StockChart from "../Components/StockChart";
import StockComparisonCard from "../Components/StockComparisonCard"
import {debounceStockSearchj, getStockComparisonData, getStockHistory, searchStock} from "../Utils/api";
import { debounce } from "lodash";
import stockData from "../stockData.json"
import CandleChart from "../Components/CandleChart";


const StockComparison = () => {
  const [graphType, setGraphType] = useState("line");

  // State for dropdowns
  const [timeRange, setTimeRange] = useState("1M");
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

  const [labels, setLabels] = useState([]);
  const stockColors = [ "#00E396","#FEB019","#FF4560","#775DD0"]
  const [tableData, setTableData] = useState([
    { label: "Avg. Shares", values: Array(4).fill("--") },
    { label: "Avg. Earning per Share", values: Array(4).fill("--") },
    { label: "Gross Profit", values: Array(4).fill("--") },
    { label: "P/E Ratio", values: Array(4).fill("--") },
    { label: "Diluted Earnings Per Share", values: Array(4).fill("--") },
    { label: "Net Income Loss", values: Array(4).fill("--") },
    // { label: "SIC", values: Array(4).fill("--") },
  ]);
  const [IncometableData, setIncomeTableData] = useState([
    { label: "Revenue", values: Array(4).fill("--") },
    { label: "Operating Expenses", values: Array(4).fill("--") },
    { label: "Operating Income", values: Array(4).fill("--") },
    { label: "Research and Development", values: Array(4).fill("--") },
  
  ]);
  const [sheetTableData, setSheetTableData] = useState([
    { label: "Assets", values: Array(4).fill("--") },
    { label: "Equity", values: Array(4).fill("--") },
    { label: "Inventory", values: Array(4).fill("--") },
    { label: "Liabilities", values: Array(4).fill("--") },
    { label: "Long-term Debt", values: Array(4).fill("--") },
  
  ]);
  const [cashTableData, setCashTableData] = useState([
    { label: "Net Cash Flow", values: Array(4).fill("--") },
    { label: "Financial Activities", values: Array(4).fill("--") },
    { label: "Investing Activities", values: Array(4).fill("--") },
    { label: "Operating Activities", values: Array(4).fill("--") },
  
  ]);
  // const [datasets,setDatasets] = useState([{},{},{},{}]);
  const [chartData,setChartData] = useState([{},{},{},{}]);
  const [candleData,setCandleData] = useState([{},{},{},{}]);
  
  // const processStockData = (stockData) => {
  //   const { labels, stocks } = stockData;
  
  //   const stockColors = {
  //     NFLX: "#00E396", // Netflix (Red)
  //     TSLA: "#FEB019", // Tesla (Dark Red)
  //     AAPL: "#FF4560", // Apple (Grey)
  //     AMZN: "#775DD0", // Amazon (Orange)
  //   };
  
  //   const datasets = Object.entries(stocks).map(([symbol, stock]) => ({
  //     label: symbol,
  //     data: stock.data,
  //     borderColor: stockColors[symbol] || "#00E396",
  //     backgroundColor: stockColors[symbol] || "#00E396",
  //   }));
  
  //   return { labels, datasets };
  // };
  const formatCandleData = (stockHistory) => {
    return stockHistory.map((entry) => ({
      x: entry.date, // Ensure date is formatted correctly
      y: [entry.open, entry.high, entry.low, entry.close], // OHLC format
    }));
  };
  const fetchStockDataForChart = () => {
    let allPromises = selectedStocks.map((stock, index) => {
      return new Promise((resolve, reject) => {
        getStockHistory(
          stock.ticker,
          "1day",
          "2024-12-01", // Replace with your dynamic `fromDate`
          "2025-02-28", // Replace with your dynamic `toDate`
          (data) => {
            resolve({ ticker: stock.ticker, data });
          },
          (error) => reject(error)
        );
      });
    });
  
    Promise.all(allPromises)
      .then((results) => {
        let datasets = [];
        let dateLabels = [];
        let candleDatasets=[];
  
        results.forEach((stockData, index) => {
          let stockPrices = stockData.data.map((entry) => entry.close);
          let stockDates = stockData.data.map((entry) => entry.date.split(" ")[0]);
  
          // Use the first stock's dates as labels
          if (index === 0) {
            setLabels(stockDates.reverse()); // Reverse to get chronological order
          }
  
          datasets.push({
            label: stockData.ticker,
            data: stockPrices.reverse(),
            borderColor: stockColors[index % stockColors.length], // Cycle through stockColors
            backgroundColor: stockColors[index % stockColors.length] + "33", // Add transparency for area chart
            fill: graphType === "area",
          });

          candleDatasets.push({
            label: stockData.ticker,
            data: formatCandleData(stockData.data), // Convert to OHLC format
          });
        });

        console.log("candle",candleDatasets)
  
        setChartData(datasets);
        setCandleData(candleDatasets);
      })
      .catch((error) => console.log("Error fetching stock data:", error));
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [numVal,setNum]=useState(0);

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

  useEffect(()=>{
    
    
    
  },[selectedStocks])

  const buttonClick=()=>{
    let count=0;
    for(let i=0;i<4;i++){
      //fill the tables 
      
      if(selectedStocks[i]?.ticker){
        count=count+1;
        getStockComparisonData(selectedStocks[i].ticker,
          (data)=>{
            console.log("res",data);
            setIncomeTableData((prevData) => {
              let updatedData = [...prevData];
            
              updatedData[0] = { ...updatedData[0], values: [...updatedData[0].values] };
              updatedData[0].values[i] = data.financials.income_statement.revenues?.value ?? "--";
            
              updatedData[1] = { ...updatedData[1], values: [...updatedData[1].values] };
              updatedData[1].values[i] = data.financials.income_statement.operating_expenses?.value ?? "--";
            
              updatedData[2] = { ...updatedData[2], values: [...updatedData[2].values] };
              updatedData[2].values[i] = data.financials.income_statement.operating_income_loss?.value ?? "--";
            
              updatedData[3] = { ...updatedData[3], values: [...updatedData[3].values] };
              updatedData[3].values[i] = data.financials.income_statement.research_and_development?.value ?? "--";
            
              return updatedData;
            });
            
            
            setTableData((prevData) => {
              let updatedData = [...prevData];
            
              updatedData[0] = { ...updatedData[0], values: [...updatedData[0].values] };
              updatedData[0].values[i] = data.financials.income_statement?.basic_average_shares?.value ?? "--";
            
              updatedData[1] = { ...updatedData[1], values: [...updatedData[1].values] };
              updatedData[1].values[i] = data.financials.income_statement?.basic_earnings_per_share?.value ?? "--";
            
              updatedData[2] = { ...updatedData[2], values: [...updatedData[2].values] };
              updatedData[2].values[i] = data?.peratio ?? "--";
            
              updatedData[3] = { ...updatedData[3], values: [...updatedData[3].values] };
              updatedData[3].values[i] = data.financials.income_statement?.diluted_earnings_per_share?.value ?? "--";
              
              updatedData[4] = { ...updatedData[4], values: [...updatedData[4].values] };
              updatedData[4].values[i] = data.financials.income_statement.diluted_earnings_per_share?.value ?? "--";
            
              updatedData[5] = { ...updatedData[5], values: [...updatedData[5].values] };
              updatedData[5].values[i] = data.financials.comprehensive_income.comprehensive_income_loss?.value ?? "--";
            
              return updatedData;
            });
            
  
            setSheetTableData((prevData) => {
              let updatedData = [...prevData];
            
              updatedData[0] = { ...updatedData[0], values: [...updatedData[0].values] };
              updatedData[0].values[i] = data.financials.balance_sheet?.assets?.value ?? "--";
            
              updatedData[1] = { ...updatedData[1], values: [...updatedData[1].values] };
              updatedData[1].values[i] = data.financials.balance_sheet?.equity?.value ?? "--";
            
              updatedData[2] = { ...updatedData[2], values: [...updatedData[2].values] };
              updatedData[2].values[i] = data.financials.balance_sheet?.inventory?.value ?? "--";
            
              updatedData[3] = { ...updatedData[3], values: [...updatedData[3].values] };
              updatedData[3].values[i] = data.financials.balance_sheet?.liabilities?.value ?? "--";
            
              updatedData[4] = { ...updatedData[4], values: [...updatedData[4].values] };
              updatedData[4].values[i] = data.financials.balance_sheet.long_term_debt?.value ?? "--";
            
              return updatedData;
            });
            
            
  
            setCashTableData((prevData) => {
              let updatedData = [...prevData];
            
              updatedData[0] = { ...updatedData[0], values: [...updatedData[0].values] };
              updatedData[0].values[i] = data.financials.cash_flow_statement?.net_cash_flow?.value ?? "--";
            
              updatedData[1] = { ...updatedData[1], values: [...updatedData[1].values] };
              updatedData[1].values[i] = data.financials.cash_flow_statement?.net_cash_flow_from_financing_activities?.value ?? "--";
            
              updatedData[2] = { ...updatedData[2], values: [...updatedData[2].values] };
              updatedData[2].values[i] = data.financials.cash_flow_statement?.net_cash_flow_from_investing_activities?.value ?? "--";
            
              updatedData[3] = { ...updatedData[3], values: [...updatedData[3].values] };
              updatedData[3].values[i] = data.financials.cash_flow_statement?.net_cash_flow_from_operating_activities?.value ?? "--";
            
              return updatedData;
            });
            
  
          },
          (error)=>{console.log("er",error)}
        )
      }
      

      //chart Data

    }
    setNum(count);
      console.log(count);

    //make graphs
    fetchStockDataForChart()

  }
  
  return (
    <div className="w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]">
      <Sidebar />
      <div className="dark:bg-[#000D38] py-5 md:px-10 mx-[1rem] md:mx-[7rem] flex flex-1 flex-col rounded-xl border dark:border-[#00387E] dark:text-white">
        
        {/* Header */}
        <div>
          <span className="font-semibold text-[1.5rem] font-poppins items-center flex flex-row mb-5">
            {/* <MdArrowBackIos /> */}
            Stock Comparison
          </span>
        </div>

        <div 
          className=" bg-[#e4eaf0] dark:bg-[#001a50] flex rounded-xl py-2 px-2 mb-7">
          {/* <div className="w-[10%]">
            <span>Add Stocks</span>
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
             <StockComparisonCard data={selectedStocks[index]}/>            
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
           onClick={()=>buttonClick()}>
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
              {["line", "area"].map((type) => (
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
              {/* <div className="relative">
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
              </div> */}

              {/* Filters Dropdown */}
              {/* <div className="relative">
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
              </div> */}

            </div>
          </div>
        </div>
        {/* Chart Placeholder */}
        <div className="h-[30rem] w-full bg-[#e4eaf0]  dark:bg-[#001a50] flex rounded-xl py-2 px-5 mb-7">
          <div className="w-full h-full">
            {graphType=='line'&&
            <StockChart labels={labels} datasets={chartData} staticData={true} filter={timeRange} num={numVal} />}
            {graphType=='area'&&
            <StockChart labels={labels} datasets={chartData} area={true} staticData={true} filter={timeRange } num={numVal}/>}
            {/* {graphType=='candle' &&
            <CandleChart 
            labels={labels}
            candles={candleData}
          />
          
            } */}
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
          <div className="font-semibold text-[1.5rem] font-poppins my-5">Balance Sheet</div>
          {sheetTableData.map((row, rowIndex) => (
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
          {IncometableData.map((row, rowIndex) => (
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
          <div className="font-semibold text-[1.5rem] font-poppins my-5">Cash Flow</div>
          {cashTableData.map((row, rowIndex) => (
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
                  setSelectedStocks((prevStocks) => {
                    const updatedStocks = [...prevStocks]; // Create a new array
                    updatedStocks[openedIndex] = data; // Update the specific index
                    return updatedStocks; // Set the new state
                });
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
