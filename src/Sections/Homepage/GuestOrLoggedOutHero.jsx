import React, { useContext, useEffect, useState } from 'react'
import stonks2 from '../../assets/images/stonks2.png'
// import Person from '../../assets/images/person2.png'
import coin2 from '../../assets/images/coin2.png'
// import diamond from '../../assets/images/diamondIcon.svg'
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
import { lastRaceDataByUser, getTotalPointsUser, getWinningRate, getWatchList } from '../../Utils/api'
import Hero from './Hero'
import { useRef } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";




const GuestOrLoggedOutHero = () => {
    const { setCreateRace, profileImage,setSelectedStock } = useContext(DarkModeContext)
    const navigate = useNavigate()
    const [lastRaceStatus, setLastRaceStatus] = useState("Loading...")
    const [lastRaceId, setLastRaceId] = useState("")
    const [lastRaceName, setLastRaceName] = useState("Loading...")
    const [totalPoints, setTotalPoints] = useState(0)
    const [winningRate, setWinningRate] = useState(0)
    const [watchList,setWatchList] = useState([]);
    const [page,setPage]=useState(2);
    const [hasNext,setHasNext]=useState(false);

    const iu = localStorage.getItem('userDetails')
    const imageUrl = iu && JSON.parse(atob(iu))
    const userId = imageUrl && imageUrl?.userId
    const userName = imageUrl && imageUrl?.userName
    const gender = imageUrl && imageUrl?.gender

    const sliderRef = useRef(null);

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
                    fetchWatchList(page);
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
  const fetchWatchList = (pageNumber) => {
    if (!hasNext) return; // Prevent duplicate calls

    
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

  // Detect when user scrolls to the end
  const handleScroll = () => {
    if (!sliderRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

    // If user scrolled near the right end, load more
    if (scrollLeft + clientWidth >= scrollWidth - 20) {
      fetchWatchList(page);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, [page, hasNext]);

    return (
        <>
            {/* <div className='max-w-[1400px] dark:bg-gradient-to-l dark:from-[rgba(0,0,0,0.25)] dark:to-[#0a0d2b] h-auto py-[2.2rem] px-[2.52rem] hero-gradient mb-[3.3rem] grid md:grid-cols-2 grid-cols-1 rounded-lg dark:border dark:border-[#00387E]'>
                <div className='py-[1.76rem] flex-1 flex flex-col col-span-1 order-2 md:order-1 justify-center gap-4 items-start pl-4'>
                    <h1 className='md:text-[2.35rem] text-[2rem] font-bold leading-10 mb-[1rem] dark:text-[#5988FF]'>Welcome Back!</h1>
                    <p className='text-[0.94rem] mb-[1rem] dark:text-white'>Continue where you left</p>
                    <div className='flex gap-4'>
                        <button
                            onClick={() => setCreateRace(true)}
                            className='w-auto dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] dark:text-white font-bold text-[0.82rem] px-[2rem] py-[0.82rem] border border-black bg-[#e5f4ff] rounded-[33px]'>
                            Create Race
                        </button>
                        <button
                            onClick={() => navigate('/allraces', { state: "Upcoming Races" })}
                            className='w-[8.9rem] bg-transparent dark:text-white font-bold text-[0.82rem] px-[2rem] py-[0.82rem] border border-[#00387E] bg-[#e5f4ff] rounded-[33px]'>
                            Join Race
                        </button>
                    </div>
                </div>

                <div className='flex-1 overflow-hidden col-span-2 md:col-span-1 order-1 md:order-2'>
                    <img className='w-full h-full object-cover' src={stonks2} alt="" />
                </div>
            </div> */}
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

                {lastRaceId && (
                    <div
                        className="col-span-1 row-span-1 bg-white rounded-lg p-[1.5rem] flex gap-8 dark:bg-transparent dark:border dark:border-[#00387E] items-center group hover:border-black h-[10rem]"
                        onClick={() => navigate(`/race/${lastRaceId}`)}
                        title='Visit your last race by clicking on this card'>
                        <div className='flex flex-col gap-[8px] cursor-pointer'>
                            <p className='text-[1rem] dark:text-[#D1D1D1]'>{capitalize(lastRaceStatus)} Race</p>
                            <p className='text-[1rem] line-clamp-2 max-w-[15rem] dark:text-white font-semibold group-hover:underline font-poppins'>{lastRaceName}</p>
                        </div>
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
    className="flex gap-2 overflow-x-hidden flex-nowrap p-2 scroll-smooth max-w-[65rem] 2xl:max-w-[81rem]"
  >
    {watchList && watchList.length > 0 ? (
      watchList.map((stockData, index) => (
        <StockWatchlistCard key={index} data={stockData.stock} />
      ))
    ) : (
      <p>Loading watchlist...</p> // Fallback UI
    )}
  </div>
</div>

        </>
    )
}


export default GuestOrLoggedOutHero
