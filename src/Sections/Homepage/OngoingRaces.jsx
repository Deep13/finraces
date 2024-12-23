import { BiChevronRight } from "react-icons/bi";
import React, { useEffect, useState } from 'react'
import RaceCardHomepage from '../../Components/RaceCardHomepage'
import { getRaceList } from "../../Utils/api";
import { useNavigate } from "react-router-dom";

const OngoingRaces = () => {
  const [raceList, setRaceList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getRaceList('running', (data) => {
      // alert('success')
      console.log('running races', data)
      setRaceList(data)
    }, () => {
      // alert('failure')
    })
  }, [])

  return (
    <div className='max-w-[1400px] relative mb-[3.3rem]'>
      <a onClick={() => navigate('/allraces', { state: 'Ongoing Races' })} className='absolute right-0 top-2 text-[#8d8d8d] text-[0.94rem] font-semibold hover:underline flex items-center' href="">
        See All <BiChevronRight size={18} />
      </a>
      <h2 className='text-[2.14rem] text-start font-bold mb-[1.4rem] dark:text-white'>Ongoing Races</h2>
      <div className='w-full gap-[1.4rem] grid grid-cols-1 md:grid-cols-2'>
        {
          raceList[0] && raceList.slice(0, 4).map((curr, index) => {
            return (
              <RaceCardHomepage start_Date={curr.start_date} end_date={curr.end_date} raceName={curr.name} raceId={curr.id} key={index + 1} />
            )
          })
          // :
          // <>
          //   <RaceCardHomepage />
          //   <RaceCardHomepage />
          //   <RaceCardHomepage />
          //   <RaceCardHomepage />
          // </>
        }
        {/* <RaceCardHomepage /> */}
        {/* <RaceCardHomepage />
        <RaceCardHomepage />
        <RaceCardHomepage /> */}
      </div>
    </div>
  )
}

export default OngoingRaces