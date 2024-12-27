import React, { useEffect, useState } from 'react'
import Pagination from '../../Components/Pagination'
import FinishedRaceCard from '../../Components/FinishedRaceCard'
import { getRaceList } from '../../Utils/api'

const FinishedRaces = () => {

    const [raceList, setRaceList] = useState([])

    useEffect(() => {
        // first get the list of the finished races
        getRaceList('finished', (data) => {
            // alert('success')
            console.log('finished races', data)
            setRaceList(data)
        }, () => {
            // alert('failure')
        })
    }, [])
    return (
        <div className='max-w-[1400px] relative mb-[3.3rem]'>
            <h2 className='text-[2.14rem] text-start font-bold mb-[1.4rem] dark:text-white'>Finished Races</h2>
            <div className='w-full gap-[1.4rem] grid grid-cols-1 md:grid-cols-2'>
                {
                    raceList?.map((curr, index) => {
                        return (
                            <FinishedRaceCard
                                key={curr.id}
                                raceName={curr.name}
                                raceData={raceList[index]}
                            />
                        )
                    })
                }
            </div>
            {/* <Pagination currentPage={2} totalPages={10} onPageChange={() => { }} /> */}
        </div>
    )
}

export default FinishedRaces