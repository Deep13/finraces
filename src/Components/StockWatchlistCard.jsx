import { BiUpArrowAlt } from "react-icons/bi";
import React from 'react'
import fb from '../assets/images/fb.svg'

const StockWatchlistCard = () => {
    return (
        <div className='w-[13.2rem] p-4 dark:text-white dark:bg-[#002763] rounded-xl shadow-lg dark:shadow-none border-[#00387E] flex flex-col gap-[9px] justify-between'>
            {/* name with icons and up down */}
            <div className='flex justify-between items-center w-full'>
                <div className='flex gap-2 items-center'>
                    {/* icon  */}
                    <div className='w-10 h-10 rounded-full bg-white'>
                        {/* contains image here  */}
                        <img className="w-full h-full object-cover" src={fb} alt="" />
                    </div>
                    <div className='text-[0.9rem] font-semibold'>
                        Stock Name
                    </div>
                </div>
                <BiUpArrowAlt size={25} color="green" />
            </div>
            {/* website url  */}
            <div className="font-semibold dark:text-white text-[0.7rem]">
                company.com
            </div>
            {/* price previous and current  */}
            <div className="flex gap-2">
                <p className="dark:text-white text-[0.9rem]">$221</p>
                <p className="dark:text-white text-[0.9rem] font-semibold">$221</p>
            </div>
            <p className="text-green">50%</p>

        </div>
    )
}

export default StockWatchlistCard