import React, { useEffect, useState } from 'react';
import ProfileCardHomepage from '../../Components/ProfileCardHomepage';
import { BiChevronRight } from "react-icons/bi";
import cofeeman from '../../assets/images/cofeeman.png'
import baggybro from '../../assets/images/baggybro.png'
import gillbates2 from '../../assets/images/gillbates2.png'
import kirayoshikage from '../../assets/images/kirayoshikage.png'
import { useNavigate } from 'react-router-dom';
import { getTop4 } from '../../Utils/api';



const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState(null)

  const navigate = useNavigate()

  const leaderboardData = {
    "Today": [
      {
        userName: 'ChampionDuke',
        image: baggybro, // Replace with actual paths or imports
        fullName: 'Duke Wriothesley',
        rank: 1,
        points: 52000,
        email: 'duke.wriothesley@gmail.com'
      },
      {
        userName: 'Alysees',
        image: kirayoshikage,
        fullName: 'Alysees Smith',
        rank: 2,
        points: 48000,
        email: 'alysees.smith@yahoo.com'
      },
      {
        userName: 'LunaStar',
        image: gillbates2,
        fullName: 'Luna Starling',
        rank: 3,
        points: 45000,
        email: 'luna.starling@outlook.com'
      },
      {
        userName: 'AceHunter',
        image: cofeeman,
        fullName: 'Ace Hunter',
        rank: 4,
        points: 42000,
        email: 'ace.hunter@protonmail.com'
      }
    ],
    "This Week": [
      {
        userName: 'CryptoKing',
        image: cofeeman,
        fullName: 'Satoshi Nakamoto',
        rank: 1,
        points: 90000,
        email: 'satoshi.nakamoto@bitcoin.org'
      },
      {
        userName: 'BlockQueen',
        image: kirayoshikage,
        fullName: 'Vitalik Buterin',
        rank: 2,
        points: 85000,
        email: 'vitalik.buterin@ethereum.org'
      },
      {
        userName: 'BitGuru',
        image: baggybro,
        fullName: 'Charlie Lee',
        rank: 3,
        points: 80000,
        email: 'charlie.lee@litecoin.org'
      },
      {
        userName: 'AltFanatic',
        image: gillbates2,
        fullName: 'Gavin Wood',
        rank: 4,
        points: 75000,
        email: 'gavin.wood@polkadot.network'
      }
    ],
    "This Month": [
      {
        userName: 'MedExpert',
        image: gillbates2,
        fullName: 'Dr. John Doe',
        rank: 1,
        points: 30000,
        email: 'dr.john.doe@healthcare.net'
      },
      {
        userName: 'PharmaGuru',
        image: baggybro,
        fullName: 'Dr. Jane Smith',
        rank: 2,
        points: 28000,
        email: 'dr.jane.smith@pharma.org'
      },
      {
        userName: 'HealthHacker',
        image: kirayoshikage,
        fullName: 'Dr. Emily Blake',
        rank: 3,
        points: 26000,
        email: 'dr.emily.blake@wellness.co'
      },
      {
        userName: 'CoffeeHunter',
        image: cofeeman,
        fullName: 'Dr. Liam White',
        rank: 4,
        points: 24000,
        email: 'dr.liam.white@medicare.com'
      }
    ]
  };

  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState(Object.keys(leaderboardData)[0]);

  // Handler for button clicks
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };


  useEffect(() => {
    let today = new Date()
    let sevenDaysAgo = new Date()
    let monthAgo = new Date()
    sevenDaysAgo.setDate(today.getDate() - 7)
    monthAgo.setDate(today.getMonth() - 1)
    let startDate = ''
    if (activeTab === 'Today') {
      startDate = today
    }
    if (activeTab === 'This Week') {
      startDate = sevenDaysAgo
    }
    if (activeTab === 'This Month') {
      startDate = monthAgo
    }
    getTop4(startDate, today, (data) => {
      console.log('Top 4 fetched', startDate, data.data)
      setLeaderboard(data.data)
    })
  }, [activeTab])



  return (
    <div className='max-w-[1400px] relative mb-[3.29rem]'>
      <a className='absolute right-0 top-2 text-[#8d8d8d] text-[0.94rem] font-semibold hover:underline flex items-center cursor-pointer' onClick={() => navigate('/leaderboard')}>
        See All <BiChevronRight size={18} />
      </a>
      <h2 className='text-[2.14rem] text-center font-bold mb-[1.4rem] dark:text-white'>LeaderBoard</h2>

      {/* Tab layout */}
      <div className='w-full gap-[0.7rem] flex justify-center items-center mb-[1.4rem]'>
        {
          Object.keys(leaderboardData).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`flex dark:text-white justify-center items-center px-[0.9rem] py-[0.76rem] rounded-[70px] shadow-xl font-semibold text-[0.6rem] md:text-[0.94rem] 
              ${activeTab === tab ? 'bg-[#e5f4ff] dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff]' : 'bg-white dark:bg-transparent dark:border dark:border-[#00387E]'}`}
            >
              {tab}
            </button>
          ))
        }
      </div>

      {/* Top players profile cards */}
      <div
        className='bg-[#e5f4ff] w-full rounded-[20px] grid lg:grid-cols-4 md:grid-cols-2 gap-[1.3rem] md:px-[1.3rem] px-[0.7rem] py-[1.11rem] dark:bg-transparent'>
        {
          leaderboard &&
          leaderboard?.map((curr, index) => {
            return (
              <ProfileCardHomepage
                key={curr.userName}
                // userName={curr.user.firstname + curr.user.lastname}
                fullName={curr.user.firstName + " " + curr.user.lastName}
                rank={index + 1}
                image={curr?.user?.photo?.path}
                points={curr?.total_points == null ? 0 : curr.total_points}
                index={index}
                id={curr.user.id} // this is mandatory
                activeTab={activeTab}
              // email={curr.user.email}
              />
            )
          })
        }
      </div>
    </div>
  );
}

export default Leaderboard;
