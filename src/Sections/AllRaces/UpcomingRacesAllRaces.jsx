import React, { useEffect, useState } from 'react'
import UpcomingRaceCardHomepage from '../../Components/UpcomingRaceCardHomepage'
import Pagination from '../../Components/Pagination'
import { getRaceList } from '../../Utils/api'

const UpcomingRacesAllRaces = () => {

    const [raceList, setRaceList] = useState([]);

    useEffect(() => {
        getRaceList('scheduled', (data) => {
            console.log('race list here', data);
            setRaceList(data);
        }, () => {
            console.error('Failed to fetch race list');
        });
    }, []);

    return (
        <div className='max-w-[1400px] relative mb-[3.3rem]'>
            <h2 className='text-[2.14rem] text-start font-bold mb-[1.4rem] dark:text-white'>UpcomingRaces</h2>
            <div className='w-full gap-[1.4rem] grid grid-cols-1 md:grid-cols-2'>
                {
                    raceList.length > 0 ? raceList?.map((curr, index) => {
                        return (
                            <UpcomingRaceCardHomepage
                                key={`${index}`} // Unique key based on tabChangeKey
                                startDate={curr.start_date}
                                endDate={curr.end_date}
                                raceName={curr.name}
                                raceId={curr.id}
                                index={index}
                            />
                        );
                    }) :
                        <p className='dark:text-white'>There are no Upcoming races at the moment</p>
                }
            </div>
            {/* <Pagination currentPage={2} totalPages={10} onPageChange={() => { }} /> */}
        </div>
    )
}

export default UpcomingRacesAllRaces