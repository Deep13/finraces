import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import ProfileCardHomepage from '../Components/ProfileCardHomepage'
import LeaderTable from '../Components/LeaderTable'
import Sidebar from '../Components/Sidebar'
import cofeeman from '../assets/images/cofeeman.png'
import baggybro from '../assets/images/baggybro.png'
import kirayoshikage from '../assets/images/kirayoshikage.png'
import gillbates2 from '../assets/images/gillbates2.png'

const Leaderboard = () => {
  const leaderboardData = {
    "Tech Stocks": [
      {
        userName: 'ChampionDuke',
        image: baggybro, // Replace with actual paths or imports
        fullName: 'Duke Wriothesley',
        rank: 1,
        points: 52000
      },
      {
        userName: 'Alysees',
        image: kirayoshikage,
        fullName: 'Alysees Smith',
        rank: 2,
        points: 48000
      },
      {
        userName: 'LunaStar',
        image: gillbates2,
        fullName: 'Luna Starling',
        rank: 3,
        points: 45000
      },
      {
        userName: 'AceHunter',
        image: cofeeman,
        fullName: 'Ace Hunter',
        rank: 4,
        points: 42000
      }
    ],
    "Crypto": [
      {
        userName: 'CryptoKing',
        image: cofeeman,
        fullName: 'Satoshi Nakamoto',
        rank: 1,
        points: 90000
      },
      {
        userName: 'BlockQueen',
        image: kirayoshikage,
        fullName: 'Vitalik Buterin',
        rank: 2,
        points: 85000
      },
      {
        userName: 'BitGuru',
        image: baggybro,
        fullName: 'Charlie Lee',
        rank: 3,
        points: 80000
      },
      {
        userName: 'AltFanatic',
        image: gillbates2,
        fullName: 'Gavin Wood',
        rank: 4,
        points: 75000
      }
    ],
    "Pharmaceuticals": [
      {
        userName: 'MedExpert',
        image: gillbates2,
        fullName: 'Dr. John Doe',
        rank: 1,
        points: 30000
      },
      {
        userName: 'PharmaGuru',
        image: baggybro,
        fullName: 'Dr. Jane Smith',
        rank: 2,
        points: 28000
      },
      {
        userName: 'HealthHacker',
        image: kirayoshikage,
        fullName: 'Dr. Emily Blake',
        rank: 3,
        points: 26000
      },
      {
        userName: 'CoffeeHunter',
        image: cofeeman,
        fullName: 'Dr. Liam White',
        rank: 4,
        points: 24000
      }
    ]
  };


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
              {Object.keys(leaderboardData).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`flex dark:text-white justify-center items-center px-[0.9rem] py-[0.76rem] rounded-[70px] shadow-xl font-semibold text-[0.6rem] md:text-[0.94rem] 
              ${activeTab === tab ? 'bg-[#e5f4ff] dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff]' : 'bg-white dark:bg-transparent dark:border dark:border-[#00387E]'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className='w-full rounded-[20px] grid lg:grid-cols-4 md:grid-cols-2 gap-[1.3rem] md:px-[1.3rem] px-[0.7rem] py-[1.11rem]'>
              {
                leaderboardData[activeTab]?.map((curr, index) => {
                  return (
                    <ProfileCardHomepage
                      key={curr.userName}
                      userName={curr.userName}
                      fullName={curr.fullName}
                      rank={curr.rank}
                      image={curr.image}
                      points={curr.points}
                      index={index}
                    />
                  )
                })
              }
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