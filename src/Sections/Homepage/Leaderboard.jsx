import React, { useState } from 'react';
import ProfileCardHomepage from '../../Components/ProfileCardHomepage';
import { BiChevronRight } from "react-icons/bi";


const Leaderboard = () => {
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
      <h2 className='text-[2.14rem] text-center font-bold mb-[1.4rem] dark:text-white'>LeaderBoard</h2>

      {/* Tab layout */}
      <div className='w-full gap-[0.7rem] flex justify-center items-center mb-[1.4rem]'>
        {["Tech Stocks", "Healthcare", "Energy", "Pharmaceuticals", "Automotive"].map((tab) => (
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

      {/* Top players profile cards */}
      <div className='bg-[#e5f4ff] w-full rounded-[20px] grid lg:grid-cols-4 md:grid-cols-2 gap-[1.3rem] md:px-[1.3rem] px-[0.7rem] py-[1.11rem] dark:bg-transparent'>
        <ProfileCardHomepage />
        <ProfileCardHomepage />
        <ProfileCardHomepage />
        <ProfileCardHomepage />
      </div>
    </div>
  );
}

export default Leaderboard;
