import React, { useEffect, useState } from 'react'
import Pagination from '../../Components/Pagination'
import FinishedRaceCard from '../../Components/FinishedRaceCard'
import { getRaceList } from '../../Utils/api'
import { ColorRing } from 'react-loader-spinner'

const FinishedRaces = ({filters}) => {

    const [raceList, setRaceList] = useState([])
    const [loading,setLoading]=useState(false);

    // useEffect(() => {
    //     // first get the list of the finished races
    //     setLoading(true)
    //     getRaceList('finished', (data) => {
    //         // alert('success')
    //         console.log('finished races', data)
    //         setRaceList(data)
    //         setLoading(false)
    //     }, (error) => {
    //         // alert('failure')
    //         console.log("error",error);
    //         setLoading(false);
    //     },filters)
    // }, [])
    useEffect(() => {
        // first get the list of the finished races
        setLoading(true)
        getRaceList('finished', (data) => {
            // alert('success')
            console.log('finished races', data)
            setRaceList(data)
            setLoading(false)
        }, (error) => {
            // alert('failure')
            console.log("error",error);
            setLoading(false);
        },filters)
    }, [filters])
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
        raceList?.map((curr, index) => (
            <FinishedRaceCard
                key={curr.id}
                raceName={curr.name}
                raceData={curr}
            />
        ))
    )}
</div>

            {/* <Pagination currentPage={2} totalPages={10} onPageChange={() => { }} /> */}
        </div>
    )
}

export default FinishedRaces