import React, { useCallback, useContext, useEffect, useState } from 'react'
import stonks2 from '../../assets/images/stonks2.png'
// import Person from '../../assets/images/person2.png'
import coin2 from '../../assets/images/coin2.png'
// import diamond from '../../assets/images/diamondIcon.svg'
import { IoIosAdd } from "react-icons/io";
// import { FiArrowUpRight } from 'react-icons/fi'
import StockWatchlistCard from '../../Components/StockWatchlistCard'
import avatarplaceholder from '../../assets/images/avatarplaceholder.png'
import malePlaceholder from '../../assets/images/manPlaceholder.jpg'
import femalePlaceholder from '../../assets/images/womanPlaceholder.jpg'
import graphrate_second from '../../assets/images/graph.png'
import flags from '../../assets/images/racing-flag.png'
import diamond from '../../assets/images/Crowncoin.png'
import { DarkModeContext } from '../../Contexts/DarkModeProvider'
import { useNavigate } from 'react-router-dom'
import { lastRaceDataByUser, getTotalPointsUser, getWinningRate, getWatchList, debounceStockSearchj, addToWatchList } from '../../Utils/api'
import Hero from './Hero'
import { useRef } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { FaMinus,FaPlus } from "react-icons/fa";
import { debounce } from 'lodash';





const GuestOrLoggedOutHero = () => {
    const { setCreateRace, profileImage,setSelectedStock ,setShowLoginForm} = useContext(DarkModeContext)
    const navigate = useNavigate()
    const [lastRaceStatus, setLastRaceStatus] = useState("Loading...")
    const [searchQuery, setSearchQuery] = useState("");
    const [stocksData,setStocksData] = useState();
    const [lastRaceId, setLastRaceId] = useState("")
    const [lastRaceName, setLastRaceName] = useState("Loading...")
    const [showSearch,setShowSearch]=useState(false);
    
    const [totalPoints, setTotalPoints] = useState(0)
    const [winningRate, setWinningRate] = useState(0)
    const [watchList,setWatchList] = useState([]);
    const [page,setPage]=useState(1);
    const [hasNext,setHasNext]=useState(false);
    const token = localStorage.getItem('token')

    const iu = localStorage.getItem('fin_userDetails')
    const imageUrl = iu && JSON.parse(atob(iu))
    const userId = imageUrl && imageUrl?.userId
    const userName = imageUrl && imageUrl?.userName
    const gender = imageUrl && imageUrl?.gender

    const sliderRef = useRef(null);

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

              const updateState = (searchedStock) => {
                // Check if stock is already in the watchlist
                const isAlreadyInWatchlist = watchList.some(item => item.stock.id === searchedStock.id);
                let userDetails=localStorage.getItem('fin_userDetails');
                console.log(atob(userDetails))
              
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
                    user:userDetails,
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

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -255, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 255, behavior: "smooth" });
    
            // Wait for scroll to complete, then check if near the end
            setTimeout(() => {
                const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    
                // If scrolled near the right end, fetch more stocks
                if (scrollLeft + clientWidth >= scrollWidth - 50 && hasNext) {
                    fetchWatchList();
                }
            }, 500); // Delay to ensure smooth scroll before checking
        }
    };
    


    function capitalize(s) {
        if (s === 'scheduled') return 'Upcoming'
        return String(s[0]).toUpperCase() + String(s).slice(1);
    }

    useEffect(() => {
        userId && lastRaceDataByUser(userId, (data) => {
            console.log("racesDataByUser", data)
            setLastRaceStatus(data[0]?.status || "No Data")
            setLastRaceId(data[0]?.id || "")
            setLastRaceName(data[0]?.name || "No Data")
        })
        userId && getTotalPointsUser(userId, (data) => {
            console.log('Total Points', data)
            setTotalPoints(data)
        })
        userId && getWinningRate(userId, (data) => {
            console.log('Winning Rate', data)
            setWinningRate(data)
        })
    }, [userId])

    useEffect(()=>{
        getWatchList(
            (data)=>{setWatchList(data.data)
                console.log("check",data)
                setHasNext(data.hasNextPage)
            },
            (error)=>{console.log("error",error)}
        )
    },[])

     // Function to fetch stocks
     const fetchWatchList = () => {
      if (!hasNext) return; // Prevent unnecessary calls
  
      setPage((prevPage) => {
          const nextPage = prevPage + 1; // Increment before API call
          getWatchList(
              (data) => {
                  setWatchList((prev) => [...prev, ...data.data]); // Append new data
                  setHasNext(data.hasNextPage); // Update hasNext flag
              },
              (error) => console.log("Error fetching stocks:", error),
              nextPage // Pass the incremented page number
          );
          return nextPage; // Update the state with new page
      });
  };
  

  // Detect when user scrolls to the end
  const handleScroll = () => {
    if (!sliderRef.current || !hasNext) return;
  
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
  
    // If user scrolled near the right end, load more
    if (scrollLeft + clientWidth >= scrollWidth - 10) {
      fetchWatchList();
    }
  };
  

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
  
    slider.addEventListener("scroll", handleScroll);
    
    return () => slider.removeEventListener("scroll", handleScroll);
  }, [page, hasNext]);  // Added dependencies
  

    return (
        <>
           
            <Hero />

            <div className='max-w-[1400px] rounded-lg mb-[3.3rem] flex justify-between flex-wrap items-start'>
                <div className='rounded-xl overflow-hidden h-[10rem] w-[10rem]'>
                    <img className='w-full h-full object-cover' src={profileImage || (gender && gender == 'female' ? femalePlaceholder : malePlaceholder)} alt="User Profile" />
                </div>

                <div onClick={() => {
                    navigate('/profile')
                }} className='bg-white cursor-pointer rounded-lg p-[1.5rem] flex flex-col gap-[0.75rem] dark:bg-transparent dark:border dark:border-[#00387E] justify-center h-[10rem]'>
                    <p className="font-semibold text-[2rem] dark:text-white">{userName}</p>
                    <div className="self-start flex gap-4">
                        <div className="py-[0.5rem] px-[0.8rem] bg-slate-200 rounded-xl flex gap-[7px] dark:bg-[#002763] dark:text-white">
                            <div className="font-semibold text-[0.9rem] flex flex-col">
                                <p className="font-semibold text-[0.9rem]">Explorer</p>
                            </div>
                        </div>
                    </div>
                </div>

                {lastRaceId ? (
    <div
        className="col-span-1 row-span-1 bg-white rounded-lg p-[1.5rem] flex gap-8 dark:bg-transparent dark:border dark:border-[#00387E] items-center group hover:border-black h-[10rem]"
        onClick={() => navigate(`/race/${lastRaceId}`)}
        title="Visit your last race by clicking on this card"
    >
        <div className="flex flex-col gap-[8px] cursor-pointer">
            <p className="text-[1rem] dark:text-[#D1D1D1]">{capitalize(lastRaceStatus)} Race</p>
            <p className="text-[1rem] line-clamp-2 max-w-[15rem] dark:text-white font-semibold group-hover:underline font-poppins">
                {lastRaceName}
            </p>
        </div>
    </div>
) : (
    <div className="col-span-1 row-span-1 bg-white rounded-lg p-[1.5rem] flex flex-col gap-2 items-center justify-center text-center dark:bg-transparent dark:border dark:border-[#00387E] h-[10rem]">
        <p className="text-[1rem] font-semibold dark:text-white">Start Racing Today!</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Compete, earn, and grow in the world of stock predictions.</p>
        <button onClick={() => {
            // create Race
            if (!token) {
                setShowLoginForm(true)
                // navigate('/auth')
                return
            }
            setCreateRace(true)
            }} className="darktext-[#e4eaf0] mt-5 bg-[#e4eaf0] dark:text-white dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] pl-[1.5rem] pr-[0.8rem] h-[2.35rem] text-[0.7rem] md:text-[0.9rem] rounded-[8px] flex gap-2 items-center text-black font-semibold">
                Create Race
                <IoIosAdd size={20} />
            </button>
    </div>
)}


                <div className="col-span-1 row-span-1 bg-white rounded-lg p-[1.5rem] flex gap-8 dark:bg-transparent dark:border dark:border-[#00387E] items-start h-[10rem]">
                    <div className='h-full p-[10px] w-[100px]'>
                        <img src={diamond} alt="" />





                    </div>
                    <div className='flex flex-col gap-[8px]'>
                        <p className='text-[1rem] dark:text-white'>Total Points</p>
                        <p className='text-[2rem] dark:text-white font-poppins'>{totalPoints}</p>
                    </div>
                </div>

                <div className="col-span-1 row-span-1 bg-white rounded-lg p-[1.5rem] flex gap-8 dark:bg-transparent dark:border dark:border-[#00387E] items-start h-[10rem]">
                    <div className='flex flex-col gap-[8px] dark:text-white'>
                        <p className='text-[1rem]'>Win Rate</p>
                        <p className='text-[2rem] font-bold font-poppins'>{(winningRate.rate * 100).toFixed(2)}%</p>
                        {/* <div className='flex font-semibold gap-2 rounded-full border border-green-600 justify-start self-start items-center px-2 py-1'>
                                                <FiArrowUpRight color="green" size={15} />
                                                <p className="text-green-600">1.8%</p>
                                            </div> */}
                    </div>
                    <div className='h-full w-[100px] p-[10px] z-10'>
                        <img src={flags} alt="" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2 mt-5 relative">
  {/* Title & Navigation Buttons */}
  <div className="flex justify-between items-center">
    <div className="text-[2.14rem] text-center mx-auto font-bold mb-[1.4rem] dark:text-white">
      Watchlist
    </div>
    <div className="flex gap-2">
      <button className="rounded-full bg-[#001B51] p-2 cursor-pointer" onClick={scrollLeft}>
        <MdArrowBackIos className="text-white" />
      </button>
      <button className="rounded-full bg-[#001B51] p-2 cursor-pointer" onClick={scrollRight}>
        <MdArrowForwardIos className="text-white" />
      </button>
    </div>
  </div>

  {/* Scrollable Stock Cards */}
  <div
    ref={sliderRef}
    className="flex gap-2 overflow-x-hidden flex-nowrap p-2 scroll-smooth max-w-[65vw] 2xl:max-w-[81vw]"
  >
    {watchList && watchList.length > 0 ? (
      watchList.map((stockData, index) => (
        <StockWatchlistCard key={index} data={stockData.stock} />
      ))
    ) : (
      <div className="rounded-lg p-3 w-full flex flex-col gap-5 mb-[8rem]">
        <div className="font-bold dark:text-slate-400 text-center">
           <div>
                Your personalized stock tracker. Save your favorite stocks and monitor 
                their trends effortlessly. Build your watchlist today. 
            </div>
            <div className='font-extrabold text-2xl mt-3 dark:text-white'>Watch. Track. Grow.</div>

            <div onClick={()=>{
                if(localStorage.getItem('token') && localStorage.getItem('fin_userDetails')){
                    setShowSearch(true)
                }
                else{
                    setShowLoginForm(true)
                }
                            
            }} className="border border-black dark:border-white px-3 py-2 cursor-pointer rounded-lg flex gap-2 items-center justify-center w-32 mx-auto mt-5">Add <FaPlus/></div>
                   
        </div>
                  
    </div>  // Fallback UI
    )}
    {showSearch && (
      <div className="fixed inset-0 flex items-center justify-center z-20">
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => {
            setShowSearch(false)
        }}
        ></div>
    
        {/* Modal Content */}
        <div className="relative z-30 w-[30rem] h-[20rem] rounded-lg p-5 dark:bg-[#001a50] dark:text-white bg-white shadow-lg">
          {/* Close Button */}
          <button
            onClick={() => {
                setShowSearch(false)
                setSearchQuery("")
                // setStocksData()
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
    
          {/* Title */}
          <div className="text-lg font-bold mb-3">Add stock to watchlist</div>
    
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
                            const isInWatchlist = watchList.some((item) => item.stock.id === data.id);
            
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
                                    isInWatchlist ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
                                  } text-white transition`}
                                  onClick={() => {
                                    if (!isInWatchlist) {
                                      addToWatchList(data.id,()=>{
                                        updateState(data)
                                      },(error)=>{console.log("error", error)})
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
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
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
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-8-8h16" />
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

        </>
    )
}


export default GuestOrLoggedOutHero
