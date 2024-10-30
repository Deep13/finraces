import React from 'react'
import Hero from '../Sections/Homepage/Hero'
import OngoingRaces from '../Sections/Homepage/OngoingRaces'
import Leaderboard from '../Sections/Homepage/Leaderboard'
import UpcomingRaces from '../Sections/Homepage/UpcomingRaces'
import KeyFeatures from '../Sections/Homepage/KeyFeatures'
import Heading from '../Sections/Homepage/Heading'
import FAQ from '../Sections/Homepage/FAQ'

const Home = () => {
  return (
    <div className='w-full relative h-auto px-[10.3rem] pt-[2.1rem]'>
      <Hero/>
      <OngoingRaces/>
      <Leaderboard/>
      <UpcomingRaces/>
      <KeyFeatures/>
      <Heading/>
      <FAQ/>
    </div>
  )
}

export default Home