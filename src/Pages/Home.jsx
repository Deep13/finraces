import React, {useEffect} from 'react'
import Hero from '../Sections/Homepage/Hero'
import OngoingRaces from '../Sections/Homepage/OngoingRaces'
import Leaderboard from '../Sections/Homepage/Leaderboard'
import UpcomingRaces from '../Sections/Homepage/UpcomingRaces'
import KeyFeatures from '../Sections/Homepage/KeyFeatures'
import Heading from '../Sections/Homepage/Heading'
import FAQ from '../Sections/Homepage/FAQ'
import { motion } from 'motion/react'
import Sidebar from '../Components/Sidebar'
import GuestOrLoggedOutHero from '../Sections/Homepage/GuestOrLoggedOutHero'

const Home = () => {


  const userDetails = localStorage.getItem('userDetails')


  return (
    <motion.div
      initial={{
        y: 120,
        opacity: 0
      }}
      animate={{
        y: 0,
        opacity: 1
      }}
      transition={{
        duration: 0.4,
        ease: 'easeInOut'
      }}
      className='w-full relative h-auto flex pb-8 dark:bg-[#000924]'>
      {/* Ensure sidebar is inside a container with sufficient height */}
      <Sidebar />

      <div className='flex-1 px-[2%] md:px-[6%] pt-[2.1rem]'>
        {/* <Hero /> */}
        {
          userDetails ?
            <GuestOrLoggedOutHero />
            :
            <Hero />
        }
        <OngoingRaces />
        <Leaderboard />
        <UpcomingRaces />
        <KeyFeatures />
        <Heading />
        <FAQ />
      </div>
    </motion.div>
  )
}

export default Home
