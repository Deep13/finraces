import React, { useState } from 'react';
import UpcomingRaceCardHomepage from '../../Components/UpcomingRaceCardHomepage';

const UpcomingRaces = () => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState("Tech Stocks");

  // Handler for button clicks
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className='w-full relative mb-[3.29rem]'>
      <a className='absolute right-0 top-2 text-[#8d8d8d] text-[0.94rem] font-semibold hover:underline' href="">
        See All >
      </a>
      <h2 className='text-[2.14rem] text-center font-bold mb-[1.4rem]'>Upcoming Races</h2>
      
      {/* Tab layout */}
      <div className='w-full gap-[0.7rem] flex justify-center items-center mb-[1.4rem]'>
        {["Tech Stocks", "NFT", "Crypto", "Finance", "Agro"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`flex justify-center items-center w-[9rem] py-[0.76rem] rounded-[70px] shadow-xl font-semibold text-[0.94rem] 
              ${activeTab === tab ? 'bg-[#e5f4ff]' : 'bg-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Upcoming race cards */}
      <div className='flex gap-[1.76rem] flex-wrap justify-center items-center'>
        <UpcomingRaceCardHomepage />
        <UpcomingRaceCardHomepage />
        <UpcomingRaceCardHomepage />
        <UpcomingRaceCardHomepage />
      </div>
    </div>
  );
}

export default UpcomingRaces;
