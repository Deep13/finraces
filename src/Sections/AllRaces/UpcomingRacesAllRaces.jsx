import React from 'react'
import UpcomingRaceCardHomepage from '../../Components/UpcomingRaceCardHomepage'
import Pagination from '../../Components/Pagination'

const UpcomingRacesAllRaces = () => {
    return (
        <div className='max-w-[1400px] relative mb-[3.3rem]'>
            <h2 className='text-[2.14rem] text-start font-bold mb-[1.4rem] dark:text-white'>UpcomingRaces</h2>
            <div className='w-full gap-[1.4rem] grid grid-cols-1 md:grid-cols-2'>
                <UpcomingRaceCardHomepage />
                <UpcomingRaceCardHomepage />
                <UpcomingRaceCardHomepage />
                <UpcomingRaceCardHomepage />
                <UpcomingRaceCardHomepage />
                <UpcomingRaceCardHomepage />
                <UpcomingRaceCardHomepage />
            </div>
            {/* <Pagination currentPage={2} totalPages={10} onPageChange={() => { }} /> */}
        </div>
    )
}

export default UpcomingRacesAllRaces