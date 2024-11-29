import React, { useContext } from 'react'
import compass from '../assets/icons/sidebar/compass.svg'
import compassdark from '../assets/icons/sidebar/compassdark.svg'
import finance_idea from '../assets/icons/sidebar/finance_idea.svg'
import finance_ideadark from '../assets/icons/sidebar/financeideadark.svg'
import stats from '../assets/icons/sidebar/stats.svg'
import statsdark from '../assets/icons/sidebar/statsdark.svg'
import live_streaming from '../assets/icons/sidebar/live_streaming.svg'
import livestreamingdark from '../assets/icons/sidebar/livestreamingdark.svg'
import forward from '../assets/icons/sidebar/forward.svg'
import forwarddark from '../assets/icons/sidebar/forwarddark.svg'
import eth from '../assets/icons/sidebar/eth.svg'
import ethdark from '../assets/icons/sidebar/ethdark.svg'
import recent from '../assets/icons/sidebar/recent.svg'
import recentdark from '../assets/icons/sidebar/recentdark.svg'
import { DarkModeContext } from '../Contexts/DarkModeProvider'

const Sidebar = () => {
    const { darkModeEnabled } = useContext(DarkModeContext)
    return (
        <div className="w-[4rem] flex-shrink-0 relative left-4 z-[9]"> {/* Prevent sidebar from flexing */}
            <div className={`sticky top-24 left-6 transition-transform ease-out duration-300 flex flex-col gap-[0.7rem] z-[10]`}>
                <button className="w-[3.35rem] dark:bg-[#001a50] dark:text-white h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                    <img src={darkModeEnabled ? compassdark : compass} alt="discover" />
                    Discover
                </button>
                <button className="w-[3.35rem] dark:bg-[#001a50] dark:text-white h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                    <img src={darkModeEnabled ? statsdark : stats} alt="stocks" />
                    Stocks
                </button>
                <button className="w-[3.35rem] dark:bg-[#001a50] dark:text-white h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                    <img src={darkModeEnabled ? ethdark : eth} alt="crypto" />
                    Crypto
                </button>
                <button className="w-[3.35rem] dark:bg-[#001a50] dark:text-white h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                    <img src={darkModeEnabled ? livestreamingdark : live_streaming} alt="live races" />
                    Live Races
                </button>
                <button className="w-[3.35rem] dark:bg-[#001a50] dark:text-white h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                    <img src={darkModeEnabled ? recentdark : recent} alt="upcoming races" />
                    Upcoming Races
                </button>
                <button className="w-[3.35rem] dark:bg-[#001a50] dark:text-white h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                    <img src={darkModeEnabled ? finance_ideadark : finance_idea} alt="my races" />
                    My Races
                </button>
                <button className="w-[3.35rem] dark:bg-[#001a50] dark:text-white h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                    <img src={darkModeEnabled ? forwarddark : forward} alt="my watchlist" />
                    My Watchlist
                </button>
            </div>
        </div>
    )
}

export default Sidebar