import React, { useEffect, useState } from 'react';
import UpcomingRaceCardHomepage from '../../Components/UpcomingRaceCardHomepage';
import { BiChevronRight } from "react-icons/bi";
import { getRaceList } from '../../Utils/api';

const UpcomingRaces = () => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState("Tech Stocks");
  const [raceList, setRaceList] = useState([]);
  const [tabChangeKey, setTabChangeKey] = useState(0); // Key to retrigger animations

  // Handler for button clicks
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setTabChangeKey(prevKey => prevKey + 1); // Increment key to trigger re-render
  };

  useEffect(() => {
    getRaceList('scheduled', (data) => {
      console.log('race list here', data);
      setRaceList(data);
    }, () => {
      console.error('Failed to fetch race list');
    });
  }, []);

  return (
    <div className='max-w-[1400px] relative mb-[3.29rem]'>
      <a className='absolute right-0 top-2 text-[#8d8d8d] text-[0.94rem] font-semibold hover:underline flex items-center' href="">
        See All <BiChevronRight size={18} />
      </a>
      <h2 className='text-[2.14rem] text-center font-bold mb-[1.4rem] dark:text-white'>Upcoming Races</h2>

      {/* Tab layout */}
      {/* <div className='w-full gap-[0.7rem] flex justify-center items-center mb-[1.4rem]'>
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
      </div> */}

      {/* Upcoming race cards */}
      <div className='gap-[1.76rem] grid grid-cols-1 md:grid-cols-2 w-full'>
        {
          raceList && raceList.slice(0, 4).map((curr, index) => {
            return (
              <UpcomingRaceCardHomepage
                key={`${tabChangeKey}-${index}`} // Unique key based on tabChangeKey
                startDate={curr.start_date}
                endDate={curr.end_date}
                raceName={curr.name}
                raceId={curr.id}
                index={index}
              />
            );
          })
        }
      </div>
    </div>
  );
}

export default UpcomingRaces;
