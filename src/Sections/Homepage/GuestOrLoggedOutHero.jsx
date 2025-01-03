import React, { useContext, useEffect, useState } from 'react'
import stonks2 from '../../assets/images/stonks2.png'
// import Person from '../../assets/images/person2.png'
import coin2 from '../../assets/images/coin2.png'
import diamond from '../../assets/images/diamondIcon.svg'
// import { FiArrowUpRight } from 'react-icons/fi'
import StockWatchlistCard from '../../Components/StockWatchlistCard'
import { DarkModeContext } from '../../Contexts/DarkModeProvider'
import { useNavigate } from 'react-router-dom'
import { lastRaceDataByUser, getTotalPointsUser } from '../../Utils/api'




const GuestOrLoggedOutHero = () => {
    const { setCreateRace } = useContext(DarkModeContext)
    const navigate = useNavigate()
    const [lastRaceStatus, setLastRaceStatus] = useState("Loading...")
    const [lastRaceId, setLastRaceId] = useState("")
    const [lastRaceName, setLastRaceName] = useState("Loading...")
    const [totalPoints, setTotalPoints] = useState(0)

    const imageUrl = JSON.parse(atob(localStorage.getItem('userDetails')))
    const userId = imageUrl?.userId
    const userName = imageUrl?.userName

    console.log("imageUrl", imageUrl)

    function capitalize(s) {
        if (s === 'scheduled') return 'Upcoming'
        return String(s[0]).toUpperCase() + String(s).slice(1);
    }

    useEffect(() => {
        lastRaceDataByUser(userId, (data) => {
            console.log("racesDataByUser", data)
            setLastRaceStatus(data[0]?.status || "No Data")
            setLastRaceId(data[0]?.id || "")
            setLastRaceName(data[0]?.name || "No Data")
        })
        getTotalPointsUser(userId, (data) => {
            console.log('Total Points', data)
            setTotalPoints(data)
        })
    }, [userId])

    return (
        <>
            <div className='max-w-[1400px] dark:bg-gradient-to-l dark:from-[rgba(0,0,0,0.25)] dark:to-[#0a0d2b] h-auto py-[2.2rem] px-[2.52rem] hero-gradient mb-[3.3rem] grid md:grid-cols-2 grid-cols-1 rounded-lg dark:border dark:border-[#00387E]'>
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
            </div>

            <div className='max-w-[1400px] rounded-lg mb-[3.3rem] flex gap-[2.8rem] justify-start flex-wrap items-start'>
                <div className='rounded-xl overflow-hidden h-[10rem] w-[10rem]'>
                    <img className='w-full h-full object-cover' src={imageUrl?.photo?.path || ''} alt="User Profile" />
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
                    <div className='h-full'>
                        <img src={diamond} alt="Diamond Icon" />
                    </div>
                    <div className='flex flex-col gap-[8px]'>
                        <p className='text-[1rem] dark:text-white'>Total Points</p>
                        <p className='text-[1.5rem] dark:text-white font-poppins'>{totalPoints}</p>
                    </div>
                </div>
            </div>

            <div className='mb-[3.3rem] w-full'>
                <h2 className='text-[2.14rem] text-center font-bold mb-[1.4rem] dark:text-white'>Your Watchlist</h2>
                <div className='w-full flex gap-[10px] justify-start flex-wrap'>
                    <StockWatchlistCard />
                    <StockWatchlistCard />
                    <StockWatchlistCard />
                    <StockWatchlistCard />
                    <StockWatchlistCard />
                </div>
            </div>
        </>
    )
}

export default GuestOrLoggedOutHero
