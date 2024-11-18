import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import fb from '../assets/images/f.png'
import a from '../assets/images/a.png'
import g from '../assets/images/g.png'

const RaceTile = ({
    ranks,
    stockRankList
}) => {

    const length = stockRankList && stockRankList.length

    const calculateWidhtByPosition = (numberOfStocks, position) => {
        let stepSizePercent = 100 / numberOfStocks
        if (position == numberOfStocks) return 10
        return (stepSizePercent * (numberOfStocks - position)) + 20// will be a number in percentage
    }

    useEffect(() => {
        console.log('ranks', ranks)
    }, [ranks])


    return (
        <div className="h-full w-full flex flex-col gap-8 absolute left-0 top-0 justify-center pr-8">

            {
                stockRankList?.map((curr, index) => {
                    return (
                        <div
                            key={curr.stock_id}
                            style={{
                                width: `${calculateWidhtByPosition(length, curr.rank)}%`,
                                transition: 'all 0.9s ease-out'
                            }}
                            className="bg-red-500 h-1 border-t-4 border-red-400 relative flex transition-all ease-in-out duration-500">
                            <div className="w-8 h-8 overflow-hidden z-20 rounded-full absolute -right-4 -top-4 border-2 border-black">
                                <img className="w-full h-full object-cover" src={a} alt="stock" />
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default RaceTile