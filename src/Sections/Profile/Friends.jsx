import React, { useState } from 'react'
import AddFriend from '../Friends/AddFriend'
import AllFirends from '../Friends/AllFirends'
import Challanges from '../Friends/Challanges'
import FriendsLeaderBoard from '../Friends/FriendsLeaderBoard'


const tabs = {
    AllFriends: "All Friends",
    FreindsLeaderboard: 'Friends Leaderboard',
    AddFried: 'Add a Friend',
    Challenges: 'Challenges'
}

const Friends = () => {

    const [activeTab, setActiveTab] = useState(tabs.AllFriends)

    return (
        <div className='w-full flex gap-4'>
            {/* this is sidebar  */}
            <div className=" w-[14rem] flex flex-col gap-4">
                {
                    Object.keys(tabs).map((curr, index) => {
                        return (
                            <button onClick={() => setActiveTab(tabs[curr])} key={curr} className={`w-full roudned-xl dark:text-white bg-white text-[0.9rem] ${activeTab === tabs[curr] ? 'dark:bg-[#002763] border border-[#00387E]' : 'dark:bg-[#001B51]'} py-4 px-[1.2rem] rounded-[15px] text-start`}>
                                {tabs[curr]}
                            </button>
                        )
                    })
                }
            </div>

            {/* active tab  */}
            <div className="flex-1 bg-white rounded-xl dark:bg-[#001B51] border dark:border-[#00387E] dark:text-white py-4 px-6">
                {activeTab === tabs.AddFried && <AddFriend />}
                {activeTab === tabs.AllFriends && <AllFirends />}
                {activeTab === tabs.Challenges && <Challanges />}
                {activeTab === tabs.FreindsLeaderboard && <FriendsLeaderBoard />}
            </div>
        </div>
    )
}

export default Friends