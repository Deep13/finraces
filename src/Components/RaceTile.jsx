import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import fb from '../assets/images/f.png'
import a from '../assets/images/a.png'
import g from '../assets/images/g.png'
import { Hourglass } from 'react-loader-spinner'
import { DarkModeContext } from '../Contexts/DarkModeProvider'



const RaceTile = ({
    ranks,
    stockRankList,
    stocksData,
    raceStatus
}) => {
    const colors = [
        "#4CFF4C", // Fluorescent Green
        "#00BFFF", // Neon Sky Blue
        "#D3BFFF", // Bright Lavender
        "#FFA07A", // Neon Peach
        "#FFFF00", // Bright Yellow
        "#FF69B4", // Hot Pink
        "#C0C0C0", // Shiny Silver
        "#FFA500", // Fluorescent Orange
        "#FFFDD0", // Creamy Neon Beige
        "#00FF7F"  // Neon Seafoam Green
    ];


    const length = stockRankList && stockRankList.length
    const { darkModeEnabled } = useContext(DarkModeContext)

    const calculateWidhtByPosition = (numberOfStocks, position) => {

        let stepSizePercent = 100 / numberOfStocks
        if (position == numberOfStocks) return 10
        if (position == 1) return 99
        return (stepSizePercent * (numberOfStocks - position)) + 20// will be a number in percentage
    }

    const sortedStockRankList = stockRankList?.slice().sort((a, b) =>
        a.stock_name.localeCompare(b.stock_name)
    )

    useEffect(() => {
        // console.log('ranks', ranks)
        // stockRankList && console.log(getRandomColors(stockRankList.length))
    }, [ranks])


    return (
        <div className="h-full w-full flex flex-col gap-8 justify-center pr-12 items-start dark:bg-[#002864]">

            {
                raceStatus === 'finished' ?
                    <div className='rounded-lg bg-white shadow-xl italic px-8 py-4 w-[50%] z-20 grid place-items-center text-3xl font-bold self-center'>
                        Race Finished
                    </div>
                    :
                    sortedStockRankList?.map((curr, index) => {
                        // console.log(`This is ${index} color: ${colors[index]}`)
                        let imageUrl = stocksData[Object.keys(stocksData).find(element => element === curr.stock_id)]?.icon_url
                        // console.log(imageUrl)
                        return (
                            <div
                                key={curr.stock_id}
                                style={{
                                    width: `${calculateWidhtByPosition(length, curr.rank)}%`,
                                    transition: 'all 0.9s ease-out',
                                    borderTopColor: colors[index]
                                }}
                                className={`h-1 border-t-4 relative flex transition-all ease-in-out duration-500`}>
                                <div className="absolute -right-4 -top-4 z-20">
                                    <div className='w-8 h-8 overflow-hidden z-10 rounded-full border-2 border-black mb-1'>
                                        {imageUrl && <img className="w-full h-full object-cover" src={imageUrl ? imageUrl : a} alt="stock" />}
                                        {!imageUrl && <div className='grid place-items-center font-bold text-blace bg-blue-300 text-black w-full h-full'>{curr?.stock_name?.substring(0, 2)}</div>}
                                    </div>
                                    {/* <div className='text-xs font-semibold text-center'>{curr.stock_name}</div> */}
                                </div>
                            </div>
                        )
                    })
            }
            {!stockRankList &&
                <div className='w-full h-full grid place-items-center'>
                    <Hourglass
                        visible={true}
                        height="40"
                        width="40"
                        ariaLabel="hourglass-loading"
                        wrapperStyle={{}}
                        wrapperClass="relative left-4"
                        colors={darkModeEnabled ? ['#fff', '#fff'] : ['#000', '#000']}
                    />
                </div>
            }

        </div>
    )
}

export default RaceTile