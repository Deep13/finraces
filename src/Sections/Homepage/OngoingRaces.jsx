import { BiChevronRight } from "react-icons/bi"; 
import React from 'react'
import RaceCardHomepage from '../../Components/RaceCardHomepage'

const OngoingRaces = () => {
  return (
    <div className='max-w-[1400px] relative mb-[3.3rem]'>
        <a className='absolute right-0 top-2 text-[#8d8d8d] text-[0.94rem] font-semibold hover:underline flex items-center' href="">
            See All <BiChevronRight size={18} />
        </a>
        <h2 className='text-[2.14rem] text-center font-bold mb-[1.4rem]'>Ongoing Races</h2>
        <div className='w-full gap-[1.4rem] grid grid-cols-1 md:grid-cols-2'>
            <RaceCardHomepage/>
            <RaceCardHomepage/>
            <RaceCardHomepage/>
            <RaceCardHomepage/>
        </div>
    </div>
  )
}

export default OngoingRaces