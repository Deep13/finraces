import React, { useEffect, useState } from 'react'
import UpcomingRaceCardHomepage from '../../Components/UpcomingRaceCardHomepage'
import Pagination from '../../Components/Pagination'
import { getRaceList } from '../../Utils/api'
import { ColorRing } from 'react-loader-spinner'

const UpcomingRacesAllRaces = ({filters}) => {

    const [raceList, setRaceList] = useState([]);
    const [loading,setLoading]=useState(false);
    const [page,setPage]=useState(1);
    const [totalRaces,setTotalRaces]=useState(1);
    const [hasNextPage,setHasNextPage]=useState(false)

    useEffect(() => {
        setLoading(true)
        getRaceList('scheduled',page, (data) => {
            let total=Math.floor((data.total)/10);
            setTotalRaces(total)
            console.log('finished races', data)
            setRaceList(data.data)
            setLoading(false)
            setHasNextPage(data.hasNextPage);
        }, () => {
            console.error('Failed to fetch race list');
            setLoading(false)
        });
    }, [filters,page]);

    return (
        <div className='max-w-[1400px] relative mb-[3.3rem]'>
            <div className='w-full gap-[1.4rem] grid grid-cols-1 md:grid-cols-2 min-h-[200px] relative'>
    {loading ? (
        <div className='absolute inset-0 flex items-center justify-center'>
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
        </div>
    ) : (
        raceList.length > 0 ? (
            raceList.map((curr, index) => (
                <UpcomingRaceCardHomepage
                    key={`${curr.id}-${index}`}
                    startDate={curr.start_date}
                    endDate={curr.end_date}
                    raceName={curr.name}
                    raceId={curr.id}
                    index={index}
                    totalStocksCount={curr.stocks.length}
                    stock1={curr?.stocks?.[0]?.icon_url}
                    stock2={curr?.stocks?.[1]?.icon_url}
                    stock3={curr?.stocks?.[2]?.icon_url}
                    stock1Name={curr?.stocks?.[0]?.name}
                    stock2Name={curr?.stocks?.[1]?.name}
                    stock3Name={curr?.stocks?.[2]?.name}
                    participants={curr.participants.length}
                    participantsData={curr.participants}
                />
            ))
        ) : (
            <p className='dark:text-white col-span-2 text-center'>There are no Upcoming races at the moment</p>
        )
    )}
</div>

            {hasNextPage>0 && <Pagination currentPage={page} totalPages={totalRaces} onPageChange={(newPage) => setPage(newPage)} />}
        </div>
    )
}

export default UpcomingRacesAllRaces