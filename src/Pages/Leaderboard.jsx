import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import compass from '../assets/icons/sidebar/compass.svg'
import finance_idea from '../assets/icons/sidebar/finance_idea.svg'
import stats from '../assets/icons/sidebar/stats.svg'
import live_streaming from '../assets/icons/sidebar/live_streaming.svg'
import forward from '../assets/icons/sidebar/forward.svg'
import eth from '../assets/icons/sidebar/eth.svg'
import recent from '../assets/icons/sidebar/recent.svg'
import ProfileCardHomepage from '../Components/ProfileCardHomepage'
import LeaderTable from '../Components/LeaderTable'

const Leaderboard = () => {

  const [activeTab, setActiveTab] = useState("Tech Stocks");


  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <Navbar />
      <div className='w-full relative h-auto flex pb-8 pt-8'>
        {/* Ensure sidebar is inside a container with sufficient height */}
        <div className="w-[4rem] flex-shrink-0 relative left-4 z-[9]"> {/* Prevent sidebar from flexing */}
          <div className={`sticky top-24 left-6 transition-transform ease-out duration-300 flex flex-col gap-[0.7rem] z-[10]`}>
            <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
              <img src={compass} alt="discover" />
              Discover
            </button>
            <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
              <img src={stats} alt="stocks" />
              Stocks
            </button>
            <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
              <img src={eth} alt="crypto" />
              Crypto
            </button>
            <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
              <img src={live_streaming} alt="live races" />
              Live Races
            </button>
            <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
              <img src={recent} alt="upcoming races" />
              Upcoming Races
            </button>
            <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
              <img src={finance_idea} alt="my races" />
              My Races
            </button>
            <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
              <img src={forward} alt="my watchlist" />
              My Watchlist
            </button>
          </div>
        </div>

        <div className='flex-1 px-[2%] md:px-[6%]'>
          <div className='w-full rounded-lg py-8'>
            <h1 className='text-[2.2rem] font-bold text-black text-center mb-4'>Global Leaderboard</h1>
            <div className='w-full gap-[0.7rem] flex justify-center items-center mb-[1.4rem] mb-6'>
              {["Tech Stocks", "Health Care", "Energy", "Pharmaceuticals", "Automotive", "See More"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`flex justify-center items-center w-[5rem] md:w-[9rem] px-[0.9rem] py-[0.76rem] rounded-[70px] shadow-xl font-semibold text-[0.6rem] md:text-[0.94rem] 
              ${activeTab === tab ? 'bg-[#e5f4ff]' : 'bg-white'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className='w-full rounded-[20px] grid lg:grid-cols-4 md:grid-cols-2 gap-[1.3rem] md:px-[1.3rem] px-[0.7rem] py-[1.11rem]'>
              <ProfileCardHomepage />
              <ProfileCardHomepage />
              <ProfileCardHomepage />
              <ProfileCardHomepage />
            </div>
            <LeaderTable />

            <br /><br /><br />

            <h1 className='text-[2.2rem] font-bold text-black text-center mb-4'>NASDAQ Leaderboard</h1>
            <div className='w-full gap-[0.7rem] flex justify-center items-center mb-[1.4rem] mb-6'>
            </div>
            <div className='w-full rounded-[20px] grid lg:grid-cols-4 md:grid-cols-2 gap-[1.3rem] md:px-[1.3rem] px-[0.7rem] py-[1.11rem]'>
              <ProfileCardHomepage />
              <ProfileCardHomepage />
              <ProfileCardHomepage />
              <ProfileCardHomepage />
            </div>
            <LeaderTable />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Leaderboard