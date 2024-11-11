import React from 'react'
import Hero from '../Sections/Homepage/Hero'
import OngoingRaces from '../Sections/Homepage/OngoingRaces'
import Leaderboard from '../Sections/Homepage/Leaderboard'
import UpcomingRaces from '../Sections/Homepage/UpcomingRaces'
import KeyFeatures from '../Sections/Homepage/KeyFeatures'
import Heading from '../Sections/Homepage/Heading'
import FAQ from '../Sections/Homepage/FAQ'
import compass from '../assets/icons/sidebar/compass.svg'
import finance_idea from '../assets/icons/sidebar/finance_idea.svg'
import stats from '../assets/icons/sidebar/stats.svg'
import live_streaming from '../assets/icons/sidebar/live_streaming.svg'
import forward from '../assets/icons/sidebar/forward.svg'
import eth from '../assets/icons/sidebar/eth.svg'
import recent from '../assets/icons/sidebar/recent.svg'
import CountDown from '../Components/CountDown'

const Home = () => {
  return (
    <div className='w-full relative h-auto flex pb-8'>
      {/* Ensure sidebar is inside a container with sufficient height */}
      <div className="w-[4rem] flex-shrink-0 relative left-4 z-[9]"> {/* Prevent sidebar from flexing */}
        <div className={`sticky top-24 left-6 transition-transform ease-out duration-300 flex flex-col gap-[0.7rem] z-[10]`}>
          <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
              <img src={compass} alt="discover" />
              Discover
          </button>
          <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
              <img src={stats} alt="stocks" />
              Stocks
          </button>
          <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
              <img src={eth} alt="crypto" />
              Crypto
          </button>
          <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
              <img src={live_streaming} alt="live races" />
              Live Races
          </button>
          <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
              <img src={recent} alt="upcoming races" />
              Upcoming Races
          </button>
          <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
              <img src={finance_idea} alt="my races" />
              My Races
          </button>
          <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
              <img src={forward} alt="my watchlist" />
              My Watchlist
          </button>
        </div>
      </div>
      
      <div className='flex-1 px-[2%] md:px-[6%] pt-[2.1rem]'>
        <Hero/>
        <OngoingRaces/>
        <Leaderboard/>
        <UpcomingRaces/>
        <KeyFeatures/>
        <Heading/>
        <FAQ/>
        <CountDown deadline={1731330333320} />

      </div>
    </div>
  )
}

export default Home
