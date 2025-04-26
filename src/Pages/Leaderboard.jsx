import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import ProfileCardHomepage from '../Components/ProfileCardHomepage'
import LeaderTable from '../Components/LeaderTable'
import Sidebar from '../Components/Sidebar'
import cofeeman from '../assets/images/cofeeman.png'
import baggybro from '../assets/images/baggybro.png'
import kirayoshikage from '../assets/images/kirayoshikage.png'
import gillbates2 from '../assets/images/gillbates2.png'

import Crown_1 from '../assets/images/Crown_1.png'
import Crown_2 from '../assets/images/Crown_2.png'
import Crown_3 from '../assets/images/Crown_3.png'
import malePlceholder from '../assets/images/manPlaceholder.jpg'
import femalePlceholder from '../assets/images/womanPlaceholder.jpg'
import { CgSearch } from "react-icons/cg";

import { getTopRankers } from '../Utils/api'
import Pagination from '../Components/Pagination'
import {useNavigate} from "react-router-dom";
import DateRangePicker from "../Components/DateRangePicker"


const Leaderboard = () => {
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
      },
      {
        userName: 'LunaStar',
        image: '',
        fullName: 'Luna Starling',
        rank: 5,
        points: 45000,
        email: 'luna.starling@outlook.com',
        gender: 'male'
      },
      {
        userName: 'AceHunter',
        image: '',
        fullName: 'Ace Hunter',
        rank: 6,
        points: 42000,
        email: 'ace.hunter@protonmail.com',
        gender: 'female'
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



  const [activeTab, setActiveTab] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [top3,setTop3]=useState([]);
  const [hasNextPage, setHasNextPage] = useState(false)
  const [searchQuery,setSearchQuery]=useState("");
  const [startDate,setStartDate]=useState("");
  const [sortType,setSortType]=useState("Rank");
  const [endDate,setEndDate]=useState("");
  const [page,setPage]=useState(1);
  const navigate=useNavigate();


  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(()=>{
    console.log(sortType)

    getTopRankers(startDate, endDate, 20, 1,searchQuery,(data) => {
      // console.log('Top 4 fetched', data)
      setLeaderboard(data.data)
      // setTop3(data.data.slice(0,3));
      setHasNextPage(data.hasNextPage)
    },(error)=>{console.log(error)},sortType )
  },[sortType])

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
    getTopRankers(startDate, today, 20, 1,searchQuery, (data) => {
      console.log('Top 4 fetched', data)
      setLeaderboard(data.data);
      setTop3(data.data.slice(0,3));
      setHasNextPage(data.hasNextPage)
    })
  }, [activeTab])

  console.log("l",leaderboard,top3)

  useEffect(()=>{
    console.log(startDate,endDate,searchQuery)
    getTopRankers(startDate, endDate, 20, page,searchQuery, (data) => {
      console.log('Top 4 fetched', data)
      setLeaderboard(data.data)
      // setTop3(data.data.slice(0,3));
      setHasNextPage(data.hasNextPage)
    })
  },[searchQuery,startDate,endDate,page])

  useEffect(()=>{
    getTopRankers(startDate, endDate, 20, page,searchQuery, (data) => {
      // console.log('Top 4 fetched', data)
      setLeaderboard(data.data)
      setTop3(data.data.slice(0,3));
      setHasNextPage(data.hasNextPage)
    })
  },[])

  useEffect(()=>{
    getTopRankers(startDate, endDate, 20, 1,searchQuery, (data) => {
      // console.log('Top 4 fetched', data)
      setLeaderboard(data.data)
      setTop3(data.data.slice(0,3));
      setHasNextPage(data.hasNextPage)
    })
  },[startDate,endDate])

  return (
    <>
      <Navbar />
      <div className='w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]'>
        {/* Ensure sidebar is inside a container with sufficient height */}
        <Sidebar />

        <div className='flex-1 px-[2%] md:px-[6%]'>
          <div className='w-full rounded-lg py-8 dark:bg-[#000D38]'>
            <h1 className='text-[2.2rem] font-bold text-black text-center mb-4 dark:text-white'>Global Leaderboard</h1>
            <div className="w-full px-20 flex flex-wrap justify-between items-center gap-4 md:gap-6 mb-6 dark:text-white">
              {/* Tab Buttons */}
              <div className="flex gap-[0.7rem]">
                {Object.keys(leaderboardData).map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => handleTabClick(tab)}
                    className={`flex dark:text-white justify-center items-center px-[0.9rem] py-[0.76rem] rounded-[70px] shadow-xl font-semibold text-[0.6rem] md:text-[0.94rem] 
                      ${activeTab === tab ? 'bg-[#e5f4ff] dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff]' : 'bg-white dark:bg-transparent dark:border dark:border-[#00387E]'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

  {/* Date Range Picker */}
  <div className="flex items-center gap-2 md:gap-4">
    <label htmlFor="start-date" className="text-sm">Range:</label>
    <DateRangePicker
      startDate={startDate}
      endDate={endDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  </div>
</div>

            <div className='w-full rounded-[20px] grid lg:grid-cols-4 md:grid-cols-2 gap-[1.3rem] md:px-[1.3rem] px-[0.7rem] py-[1.11rem]'>
            
         {top3 && top3.length >= 3 && (
  <div className='col-span-full w-full flex flex-col items-center justify-center'>
    
    {/* Profile Pictures with Crowns */}
    <div className='w-full flex justify-center items-center gap-6'>
      {top3.map((entry, index) => {
        const user = entry.user;
        const image = user?.photo?.path || (user?.gender === 'female' ? femalePlceholder : malePlceholder);
        const crown = index === 0 ? Crown_1 : index === 1 ? Crown_2 : Crown_3;

        return (
          <div onClick={()=>{navigate(`/userprofile/${user.id}`)}} key={user.id} className='relative flex-1 flex justify-center cursor-pointer'>
            <img
              src={image}
              alt={`Rank ${index + 1}`}
              className='w-64 h-64 md:w-72 md:h-72 rounded-xl object-cover shadow-lg border-2 border-white'
            />
            <img
              src={crown}
              alt={`Crown ${index + 1}`}
              className='w-64 h-24 md:w-72 md:h-32 absolute -bottom-12 left-1/2 transform -translate-x-1/2'
            />
          </div>
        );
      })}
    </div>

    {/* Names Below */}
    <div className='w-full flex justify-center items-center gap-6 mt-16 dark:text-white'>
      {top3.map((entry) => {
        const user = entry.user;
        return (
          <div key={user.id} className='flex flex-1 justify-center'>
            <p className='text-center font-semibold text-xl'>{user.firstName} {user.lastName}</p>
          </div>
        );
      })}
    </div>
  </div>
)}


            </div>

            <div className="flex flex-wrap items-center gap-4 px-6 md:px-20 py-5 mt-5 dark:text-white w-full">
              {/* Search Input */}
              <CgSearch size={32} className='text-slate-300 font-semibold'/>
              <input
                type="text"
                value={searchQuery}
                onChange={(e)=>{setSearchQuery(e.target.value)}}
                placeholder="Search users..."
                className="rounded-xl px-4 w-2/3 h-10 border dark:border-slate-300 dark:bg-[#002760] bg-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />

              
            </div>

            <LeaderTable data={leaderboard} setSortType={setSortType} />
            {/* {hasNextPage && <Pagination />} */}

            <br /><br /><br />

            <div className='flex items-center justify-center gap-5 px-20 py-5'>
            {page > 1 && (
              <div
                onClick={() => setPage(page - 1)}
                className="border px-3 py-2 dark:text-white cursor-pointer rounded-xl dark:bg-[#002760] bg-[#e5f4ff]"
              >
                Previous
              </div>
            )}

            {hasNextPage && (
              <div
                onClick={() => setPage(page + 1)}
                className="border px-3 py-2 dark:text-white cursor-pointer rounded-xl dark:bg-[#002760] bg-[#e5f4ff]"
              >
                Next
              </div>
            )}

            </div>
            {/* <h1 className='text-[2.2rem] font-bold text-black text-center mb-4 dark:text-white'>NASDAQ Leaderboard</h1>
            <div className='w-full gap-[0.7rem] flex justify-center items-center mb-[1.4rem] mb-6'>
            </div> */}
            {/* <div className='w-full rounded-[20px] grid lg:grid-cols-4 md:grid-cols-2 gap-[1.3rem] md:px-[1.3rem] px-[0.7rem] py-[1.11rem]'>
              {
                leaderboardData['Pharmaceuticals']?.map((curr, index) => {
                  return (
                    <ProfileCardHomepage
                      key={curr.userName}
                      userName={curr.userName}
                      fullName={curr.fullName}
                      rank={curr.rank}
                      image={curr.image}
                      points={curr.points}
                      index={index}
                      email={curr.email}
                    />
                  )
                })
              }
            </div> */}
            {/* <LeaderTable /> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Leaderboard