import React, { useState } from 'react';
import UpcomingRaceCardHomepage from '../../Components/UpcomingRaceCardHomepage';
import { BiChevronRight } from "react-icons/bi"; 

const UpcomingRaces = () => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState("Tech Stocks");

  // Handler for button clicks
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className='max-w-[1400px] relative mb-[3.29rem]'>
      <a className='absolute right-0 top-2 text-[#8d8d8d] text-[0.94rem] font-semibold hover:underline flex items-center' href="">
            See All <BiChevronRight size={18} />
      </a>
      <h2 className='text-[2.14rem] text-center font-bold mb-[1.4rem]'>Upcoming Races</h2>
      
      {/* Tab layout */}
      <div className='w-full gap-[0.7rem] flex justify-center items-center mb-[1.4rem]'>
        {["Stocks", "NFT", "Crypto", "Finance", "Agro"].map((tab) => (
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

      {/* Upcoming race cards */}
      <div className='gap-[1.76rem] grid grid-cols-1 md:grid-cols-2 w-full'>
        <UpcomingRaceCardHomepage />
        <UpcomingRaceCardHomepage />
        <UpcomingRaceCardHomepage />
        <UpcomingRaceCardHomepage />
      </div>
    </div>
  );
}

export default UpcomingRaces;
