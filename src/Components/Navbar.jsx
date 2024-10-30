import { HiMenu } from "react-icons/hi";
import React, { useState } from 'react'
import logo from '../assets/icons/logofinraces.svg'
import globe from '../assets/icons/globe_icon.svg'
import search from '../assets/icons/search_icon.svg'
import support from '../assets/icons/support_icon.svg'
import compass from '../assets/icons/sidebar/compass.svg'
import finance_idea from '../assets/icons/sidebar/finance_idea.svg'
import stats from '../assets/icons/sidebar/stats.svg'
import live_streaming from '../assets/icons/sidebar/live_streaming.svg'
import forward from '../assets/icons/sidebar/forward.svg'
import eth from '../assets/icons/sidebar/eth.svg'
import recent from '../assets/icons/sidebar/recent.svg'

const Navbar = () => {

    const [toggle, setToggle] = useState(false)

    return (
        <>
            <div className={`${toggle ? '-translate-x-[10rem]' : 'translate-x-0'} fixed transition-transform ease-out duration-300 left-[0.8rem] top-[6.5rem] flex flex-col gap-[0.7rem] z-[10]`}>
                <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                    <img src={compass} alt="discover" />
                    Discover
                </button>
                <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                    <img src={stats} alt="discover" />
                    Stocks
                </button>
                <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                    <img src={eth} alt="discover" />
                    Crypto
                </button>
                <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                    <img src={live_streaming} alt="discover" />
                    Live Races
                </button>
                <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                    <img src={recent} alt="discover" />
                    Upcoming Races
                </button>
                <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                    <img src={finance_idea} alt="discover" />
                    My Races
                </button>
                <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                    <img src={forward} alt="discover" />
                    My Watchlist
                </button>
            </div>
            <nav className='w-full pl-[1.5rem] py-[1.1rem] bg-[#e5f4ff] flex items-center justify-between sticky top-0 z-[10]'>
                <div className="flex items-center">
                    <button onClick={() => setToggle(prev => !prev)} className='w-[2.9rem] h-[2.9rem] grid place-items-center bg-white rounded-[8px] mr-[106px]'>
                        <HiMenu size={24} color="black" />
                    </button>
                    <div>
                        <img src={logo} alt="Finraces logo" />
                    </div>
                </div>
                <div className="flex gap-[12px] justify-start items-center mr-[173px]">
                    <button className='w-[2.9rem] h-[2.9rem] grid place-items-center bg-white rounded-[8px]'>
                        <img src={search} alt="Search" />
                    </button>
                    <button className="w-[5.64rem] bg-[#e4eaf0] h-[2.35rem] text-[0.9rem] rounded-[8px] grid place-items-center text-black">
                        Log in
                    </button>
                    <button className="w-[5.64rem] h-[2.35rem] text-[0.9rem] rounded-[8px] bg-[#c9c9c9] grid place-items-center font-extrabold text-black">
                        Sign up
                    </button>
                    <button className='w-[2.9rem] h-[2.9rem] grid place-items-center bg-white rounded-[8px]'>
                        <img src={support} alt="Search" />
                    </button>
                    <button className='w-[2.9rem] h-[2.9rem] grid place-items-center bg-white rounded-[8px]'>
                        <img src={globe} alt="Search" />
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Navbar