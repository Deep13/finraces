import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import AllRacesHero from '../Sections/AllRaces/AllRacesHero';
import OngoingRacesAllRaces from '../Sections/AllRaces/OngoingRacesAllRaces';
import UpcomingRacesAllRaces from '../Sections/AllRaces/UpcomingRacesAllRaces';
import FinishedRaces from '../Sections/AllRaces/FinishedRaces';
import { useLocation } from 'react-router-dom';

const tabs = {
    'Ongoing Races': 'Ongoing Races',
    'Upcoming Races': 'Upcoming Races',
    // 'Finished Races': 'Finished Races',
};

const AllRaces = () => {
    const thisLocation = useLocation()
    const [activeTab, setActiveTab] = useState(tabs[thisLocation.state.toString()]); // Corrected default tab
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    console.log(thisLocation.state)

    return (
        <>
            <Navbar />
            <div className="w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]">
                {/* Ensure sidebar is inside a container with sufficient height */}
                <Sidebar />

                <div className="flex-1 px-[2%] md:px-[6%]">
                    <AllRacesHero />
                    <div className="w-full gap-[0.7rem] flex justify-center items-center mb-[1.4rem]">
                        {Object.keys(tabs).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabClick(tab)}
                                className={`flex dark:text-white justify-center items-center px-[0.9rem] py-[0.76rem] rounded-[70px] shadow-xl font-semibold text-[0.6rem] md:text-[0.94rem] 
              ${activeTab === tab
                                        ? 'bg-[#e5f4ff] dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff]'
                                        : 'bg-white dark:bg-transparent dark:border dark:border-[#00387E]'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    {activeTab === tabs['Ongoing Races'] && <OngoingRacesAllRaces />}
                    {activeTab === tabs['Finished Races'] && <FinishedRaces />}
                    {activeTab === tabs['Upcoming Races'] && <UpcomingRacesAllRaces />}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllRaces;
