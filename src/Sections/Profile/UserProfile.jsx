import React from 'react'
import badges from '../../assets/images/badges.png'
import diamond from '../../assets/images/diamondIcon.svg'
import { FiArrowUpRight } from "react-icons/fi";


const UserProfile = () => {
    return (
        <>
            <div className='grid grid-cols-3 md:grid-cols-5 gap-4 dark:text-white'>
                <div className='col-span-3 rounded-lg grid gap-4 grid-cols-2 grid-rows-2'>
                    <div className="col-span-1 row-span-1 bg-white rounded-lg p-[1.5rem] flex gap-8 dark:bg-[#001B51] dark:border dark:border-[#00387E]">
                        <div className='h-full'>
                            <img src={diamond} alt="" />
                        </div>
                        <div className='flex flex-col gap-[8px]'>
                            <p className='text-[1rem]'>Total Points</p>
                            <p className='text-[1.5rem]'>15,000,000</p>
                            <div className='flex font-semibold gap-2 rounded-full border border-green-600 justify-start self-start items-center px-2 py-1'>
                                <FiArrowUpRight color="green" size={15} />
                                <p className="text-green-600">4.8%</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 row-span-1 bg-white rounded-lg p-[1.5rem] flex gap-8 dark:bg-[#001B51] dark:border dark:border-[#00387E] dark:text-white">
                        <div className='flex flex-col gap-[8px]'>
                            <p className='text-[1rem]'>Win Rate</p>
                            <p className='text-[1.5rem] font-bold'>7590</p>
                            <div className='flex font-semibold gap-2 rounded-full border border-green-600 justify-start self-start items-center px-2 py-1'>
                                <FiArrowUpRight color="green" size={15} />
                                <p className="text-green-600">1.8%</p>
                            </div>
                        </div>
                        <div className='h-full'>
                            <img src={diamond} alt="" />
                        </div>
                    </div>

                    <div className="col-span-2 row-span-1 rounded-lg flex justify-between gap-4 bg-white p-[1.5rem] dark:bg-[#001B51] dark:border dark:border-[#00387E] dark:text-white">
                        <div className="flex-1 rounded-lg">
                            <p className="text-[1rem]">Race Participated</p>
                            <p className="text-[1.5rem] font-semibold">450</p>
                        </div>
                        <div className="flex-1 rounded-lg">
                            <p className="text-[1rem]">Best Stock</p>
                            <p className="text-[1.5rem] font-semibold">Apple</p>
                        </div>
                        <div className="flex-1 rounded-lg">
                            <p className="text-[1rem]">Best Prediction</p>
                            <p className="text-[1.5rem] font-semibold">Google</p>
                        </div>
                    </div>
                </div>
                <div className='col-span-2 bg-white rounded-lg p-[1.5rem] flex justify-center items-center flex-col dark:bg-[#001B51] dark:border dark:border-[#00387E] dark:text-white'>
                    <p className="mb-[8px] text-[1rem] self-start">Achievements</p>
                    <div>
                        <img src={badges} alt="" />
                    </div>
                </div>
            </div>


            {/* table is remaining  */}
        </>
    )
}

export default UserProfile