import React, { useEffect, useState } from 'react'
import RaceCardHomepage from '../../Components/RaceCardHomepage'
import Pagination from '../../Components/Pagination'
import { getRaceList } from '../../Utils/api'

const OngoingRacesAllRaces = () => {
    const [raceList, setRaceList] = useState([])

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
            <h2 className='text-[2.14rem] text-start font-bold mb-[1.4rem] dark:text-white'>Ongoing Races</h2>
            <div className='w-full gap-[1.4rem] grid grid-cols-1 md:grid-cols-2'>
                {
                    raceList[0] ? raceList.map((curr, index) => {
                        return (
                            <RaceCardHomepage start_Date={curr.start_date} end_date={curr.end_date} raceName={curr.name} raceId={curr.id} key={index + 1} />
                        )
                    }) :
                        <p className='dark:text-white'>There are no ongoing races right now</p>
                }
            </div>
            {/* <Pagination currentPage={2} totalPages={10} onPageChange={() => { }} /> */}
        </div>
    )
}

export default OngoingRacesAllRaces