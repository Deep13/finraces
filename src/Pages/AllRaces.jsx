import React, { useState,useCallback,useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import AllRacesHero from '../Sections/AllRaces/AllRacesHero';
import OngoingRacesAllRaces from '../Sections/AllRaces/OngoingRacesAllRaces';
import UpcomingRacesAllRaces from '../Sections/AllRaces/UpcomingRacesAllRaces';
import FinishedRaces from '../Sections/AllRaces/FinishedRaces';
import { useLocation } from 'react-router-dom';
import {debounceStockSearchj} from "../Utils/api";
import { debounce } from "lodash";
import { FaMinusCircle } from "react-icons/fa";


const tabs = {
    'Ongoing Races': 'Ongoing Races',
    'Upcoming Races': 'Upcoming Races',
    'Finished Races': 'Finished Races',
};

const AllRaces = () => {
    const thisLocation = useLocation()
    const [activeTab, setActiveTab] = useState(tabs[thisLocation?.state?.toString()]); // Corrected default tab
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const [searchQuery,setSearchQuery]=useState("");
    const [stockSuggestions,setStockSuggestions]=useState([]);
    const [endDate,setEndDate]=useState("")
    const [stockNames,setStockNames]=useState([])

    const [filters,setFilters]=useState({
        endDate:"",
        selectedStocks:[]
    })
    // console.log(thisLocation.state)
    const fetchStockOptions = useCallback(
        debounce(async (inputValue) => {
            if (inputValue.length > 2) {
                try {
                    await debounceStockSearchj(inputValue, (data) => {
                        console.log("data",data)
                        setStockSuggestions(data);
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
        fetchStockOptions(searchQuery)
    },[searchQuery])


    return (
        <>
            <Navbar />
            <div className="w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924] min-h-[100vh]">
                {/* Ensure sidebar is inside a container with sufficient height */}
                <Sidebar />

                <div className="flex-1 flex flex-col items-center px-[2%] md:px-[6%]">

                    

                    {/* <AllRacesHero /> */}
                    <div className="w-full gap-[0.7rem] flex justify-center items-center mb-[1.4rem]">
                        {Object.keys(tabs).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabClick(tab)}
                                className={`flex dark:text-white justify-center items-center px-[0.9rem] py-[0.76rem] rounded-[70px] shadow-xl font-semibold text-[0.6rem] md:text-[0.94rem] 
                                    ${activeTab === tab
                                        ? 'bg-[#e5f4ff] dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff]'
                                        : 'bg-white dark:bg-transparent dark:border dark:border-[#00387E]'
                                    }`}>
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="w-full md:w-[70%] flex flex-col gap-3 px-4 py-3 rounded-xl dark:bg-[#00387E] mb-5 text-white">
                        
                        {/* Line 1: Filters Row */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            
                            {/* Date Picker */}
                            {activeTab !== 'Ongoing Races' && (
                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <label className="text-sm whitespace-nowrap">Date:</label>
                                <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                min={activeTab === 'Upcoming Races' ? new Date().toISOString().split('T')[0] : undefined}
                                max={activeTab === 'Finished Races' ? new Date().toISOString().split('T')[0] : undefined}
                                className="rounded-md px-3 py-2 text-black focus:outline-none w-full md:w-48"
                                />
                            </div>
                            )}

                            {/* Stock Input */}
                            <div className="flex items-center gap-2 w-full relative">
                            <label className="text-sm whitespace-nowrap">Stocks:</label>
                            <input
                                type="text"
                                placeholder="e.g. AAPL, TSLA"
                                className="rounded-md px-3 py-2 text-black focus:outline-none w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            
                            {/* Stock Suggestions */}
                            {stockSuggestions.length > 0 && (
                                <div className="notificationScrollbar dark:text-white flex flex-col gap-2 w-full md:w-60 max-h-48 p-2 overflow-y-auto rounded-xl dark:bg-[#000924] border-2 dark:border-[#00387E] absolute top-12 z-10">
                                {stockSuggestions.map((stock) => {
                                    const stockValue = `${stock.ticker}`;
                                    return (
                                    <div
                                        key={stockValue}
                                        onClick={() => {
                                        setSearchQuery("");
                                        setStockSuggestions([]);
                                        setStockNames((prev) => {
                                            const alreadyExists = prev.includes(stockValue);
                                            if (alreadyExists) return prev;
                                            return [...prev, stockValue];
                                        });
                                        }}
                                        className="flex gap-1 items-center px-2 cursor-pointer hover:bg-[#00387E]"
                                    >
                                        <div>{stock.name}</div>
                                        <div>({stock.ticker})</div>
                                    </div>
                                    );
                                })}
                                </div>
                            )}
                            </div>
                        </div>

                        {/* Line 2: Selected Stocks */}
                        {stockNames.length > 0 && (
                            <div className="flex flex-wrap gap-2 items-center justify-center w-full">
                            {stockNames.map((stock, index) => (
                                <div
                                key={index}
                                className="group relative px-4 h-8 rounded-full border border-blue-400 text-white text-sm font-medium flex items-center justify-center transition-all"
                                >
                                <span className="group-hover:opacity-0 transition-opacity duration-200">
                                    {stock}
                                </span>
                                <div
                                    onClick={() => setStockNames((prev) => prev.filter((s) => s !== stock))}
                                    className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                                >
                                    <FaMinusCircle className="text-red-500 text-lg" />
                                </div>
                                </div>
                            ))}
                            </div>
                        )}

                        {/* Line 3: Search Button */}
                        <div className="flex justify-center gap-5">
                            <div
                            onClick={() => {
                                setFilters((prev) => ({
                                ...prev,
                                endDate: endDate,
                                selectedStocks: stockNames,
                                }));
                            }}
                            className="cursor-pointer bg-gradient-to-r from-[#005bff] to-[#5b89ff] px-8 h-10 rounded-lg flex items-center justify-center text-sm font-semibold text-white"
                            >
                            Search
                            </div>
                            <div
                            onClick={()=>{
                                setEndDate("");
                                setStockNames([])
                            }}
                            className="cursor-pointer bg-gradient-to-r from-[#005bff] to-[#5b89ff] px-8 h-10 rounded-lg flex items-center justify-center text-sm font-semibold text-white"
                            >
                            Reset Filters
                            </div>
                        </div>
                        </div>

                    
                    {activeTab === tabs['Ongoing Races'] && <OngoingRacesAllRaces filters={filters}/>}
                    {activeTab === tabs['Finished Races'] && <FinishedRaces filters={filters} />}
                    {activeTab === tabs['Upcoming Races'] && <UpcomingRacesAllRaces filters={filters}/>}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllRaces;



