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
import Sidebar from '../Components/Sidebar'

const Leaderboard = () => {

  const [activeTab, setActiveTab] = useState("Tech Stocks");


  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <Navbar />
      <div className='w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]'>
        {/* Ensure sidebar is inside a container with sufficient height */}
        <Sidebar />

        <div className='flex-1 px-[2%] md:px-[6%]'>
          <div className='w-full rounded-lg py-8 dark:bg-[#000D38]'>
            <h1 className='text-[2.2rem] font-bold text-black text-center mb-4 dark:text-white'>Global Leaderboard</h1>
            <div className='w-full gap-[0.7rem] flex justify-center items-center mb-[1.4rem] mb-6'>
              {["Tech Stocks", "Healthcare", "Energy", "Pharmaceuticals", "Automotive","See More"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`flex dark:text-white justify-center items-center w-[5rem] md:w-[9rem] px-[0.9rem] py-[0.76rem] rounded-[70px] shadow-xl font-semibold text-[0.6rem] md:text-[0.94rem] 
              ${activeTab === tab ? 'bg-[#e5f4ff] dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff]' : 'bg-white dark:bg-transparent dark:border dark:border-[#00387E]'}`}
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

            <h1 className='text-[2.2rem] font-bold text-black text-center mb-4 dark:text-white'>NASDAQ Leaderboard</h1>
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