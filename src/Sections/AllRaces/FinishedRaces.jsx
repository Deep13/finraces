import React from 'react'
import RaceCardHomepage from '../../Components/RaceCardHomepage'
import Pagination from '../../Components/Pagination'

const FinishedRaces = () => {
    return (
        <div className='max-w-[1400px] relative mb-[3.3rem]'>
            <h2 className='text-[2.14rem] text-start font-bold mb-[1.4rem] dark:text-white'>Finished Races</h2>
            <div className='w-full gap-[1.4rem] grid grid-cols-1 md:grid-cols-2'>
                <RaceCardHomepage />
                <RaceCardHomepage />
                <RaceCardHomepage />
                <RaceCardHomepage />
                <RaceCardHomepage />
                <RaceCardHomepage />
                <RaceCardHomepage />
            </div>
            {/* <Pagination currentPage={2} totalPages={10} onPageChange={() => { }} /> */}
        </div>
    )
}

export default FinishedRaces