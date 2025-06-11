import React, { useEffect, useState } from 'react'
import { getRaceResults } from '../Utils/api'

const RaceResult = ({
    race_id
}) => {

    const [Result, setResult] = useState(null)
    useEffect(() => {
        getRaceResults(race_id, (data) => {
            console.log("race result finished", JSON.stringify(data))
            setResult(data)
        })
    }, [])
    return (
        <div className='w-full h-screen fixed top-0 left-0 backdrop-blur-lg grid place-items-center z-[100] py-[8]'>
            <div className='bg-white rounded-lg p-8 shadow-lg min-w-[450px]'>
                <p className='text-lg text-center mb-4'>Race Finished</p>
                <h1 className='text-2xl text-center font-bold mb-4'>Winner Stocks!</h1>
                <div className='w-full flex flex-col'>
                    <div className='flex-1 flex py-2 font-bold text-sm bg-green-200'>
                        <div className="flex-1 flex justify-center">Rank</div>
                        <div className="flex-1 flex justify-center">Stock Name</div>
                        <div className="flex-1 flex justify-center">Change (%)</div>
                    </div>
                    {
                        Result?.result?.stocks?.map(curr => {
                            return (
                                <div key={curr.stock_id} className='flex-1 flex py-2'>
                                    <div className="flex-1 flex justify-center">{curr.rank}</div>
                                    <div className="flex-1 flex justify-center border-l border-r border-black">{curr.stock_name}</div>
                                    <div className={`flex-1 flex justify-center font-semibold ${curr.percent_change > 0 ? 'text-green-700' : 'text-red-500'}`}>{curr.percent_change.toFixed(2)}%</div>
                                </div>
                            )
                        })
                    }
                    <div className='w-full text-sm mt-3'>
                        Race Created by:
                        <span className='font-semibold ml-2'>
                            {Result?.result?.created_by.firstName + Result?.result?.created_by.lastName}
                        </span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default RaceResult