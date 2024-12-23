import React from 'react'
import badges from '../../assets/images/badges.png'
import diamond from '../../assets/images/diamondIcon.svg'
import { FiArrowUpRight } from "react-icons/fi";
import Person from '../../assets/images/person2.png'
import redbadge from '../../assets/images/redbadge.png'
import goldbadge from '../../assets/images/goldbadge.png'
import badgegiftpurple from '../../assets/images/badgegiftpurple.png'
import badgegiftred from '../../assets/images/badgegiftred.png'
import badgegiftsilver from '../../assets/images/badgegiftsilver.png'
import badgemountain from '../../assets/images/badgemountain.png'
import graphrate_second from '../../assets/images/graph.png'




const UserProfile = () => {

    const dummyData = [
        {
            "race_id": "R001",
            // "image": Person,
            "race_name": "Bulls Run",
            "total_points": 79.99,
            "total_stocks": 1500,
            "your_ranking": 35,
            "status": "upcoming"
        },
        {
            "race_id": "R002",
            // "image": Person,
            "race_name": "Market Fit",
            "total_points": 59.99,
            "total_stocks": 1200,
            "your_ranking": 10,
            "status": "running"
        },
        {
            "race_id": "R003",
            // "image": Person,
            "race_name": "Nasdaq kings",
            "total_points": 49.99,
            "total_stocks": 800,
            "your_ranking": 25,
            "status": "finished"
        }
    ]


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
                        <div className='h-full z-10'>
                            <img src={graphrate_second} alt="" />
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
                    <div className='w-full h-full flex justify-between flex-wrap'>
                        <div className='p-2 w-[7rem] h-[7rem] overflow-hidden bg-[#000A2D] self-start rounded-xl flex-wrap gap-4'>
                            <img className='w-full h-full object-cover' src={redbadge} alt="" />
                        </div>
                        <div className='p-2 w-[7rem] h-[7rem] overflow-hidden bg-[#000A2D] self-start rounded-xl flex-wrap gap-4'>
                            <img className='w-full h-full object-cover' src={goldbadge} alt="" />
                        </div>
                        <div className='p-2 w-[7rem] h-[7rem] overflow-hidden bg-[#000A2D] self-start rounded-xl flex-wrap gap-4'>
                            <img className='w-full h-full object-cover' src={badgemountain} alt="" />
                        </div>
                        <div className='p-2 w-[7rem] h-[7rem] overflow-hidden bg-[#000A2D] self-start rounded-xl flex-wrap gap-4'>
                            <img className='w-full h-full object-cover' src={badgegiftpurple} alt="" />
                        </div>
                        <div className='p-2 w-[7rem] h-[7rem] overflow-hidden bg-[#000A2D] self-start rounded-xl flex-wrap gap-4'>
                            <img className='w-full h-full object-cover' src={badgegiftred} alt="" />
                        </div>
                        <div className='p-2 w-[7rem] h-[7rem] overflow-hidden bg-[#000A2D] self-start rounded-xl flex-wrap gap-4'>
                            <img className='w-full h-full object-cover' src={badgegiftsilver} alt="" />
                        </div>
                    </div>
                </div>
            </div>


            {/* table is remaining  */}
            <div className='w-full p-4 bg-white dark:bg-[#001b51] dark:border dark:border-[#00387E] rounded-[20px]'>
                <table className="table border-separate border-spacing-0 w-full text-left dark:text-white">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="py-4 dark:text-[#898989] text-[0.9rem]">Race ID</th>
                            <th className="py-4 dark:text-[#898989] text-[0.9rem]">Race Name</th>
                            <th className="py-4 dark:text-[#898989] text-[0.9rem]">Total Points</th>
                            <th className="py-4 dark:text-[#898989] text-[0.9rem]">Total Stocks</th>
                            <th className="py-4 dark:text-[#898989] text-[0.9rem]">Your Ranking</th>
                            <th className="py-4 dark:text-[#898989] text-[0.9rem]">Status</th>
                            {/* <th className="py-4 dark:text-[#898989] text-[0.9rem]">Status</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            dummyData?.map((curr, index) => {

                                return (
                                    <tr key={index} className="odd:bg-transparent even:bg-[#00276] pb-2 dark:border-b">
                                        <th className="py-3">{curr.race_id}</th>
                                        {/* <td className="py-3">
                                            <div className='w-14 h-14 rounded-xl overflow-hidden'>
                                                <img className='w-full h-full object-cover' src={Person} alt="" />
                                            </div>
                                        </td> */}
                                        <td className="text-[1.1rem] py-3">{curr.race_name}</td>
                                        <td className="text-[1.1rem] py-3">{curr.total_points}</td>
                                        <td className="text-[1.1rem] py-3">{curr.total_stocks}</td>
                                        <td className="text-[1.1rem] py-3">{curr.status}</td>
                                        <td className="text-[1.1rem]">
                                            <div className='py-3 flex justify-start'>
                                                {
                                                    curr.status === 'upcoming' &&
                                                    <div className='text-white bg-opacity-25 text-center font-medium  bg-white border-white border px-2 rounded-full'>
                                                        {curr.status}
                                                    </div>
                                                }
                                                {
                                                    curr.status === 'running' &&
                                                    <div className='text-green-600 bg-opacity-25 text-center font-medium  bg-green-600 border-green-700 border px-2 rounded-full'>
                                                        {curr.status}
                                                    </div>
                                                }
                                                {
                                                    curr.status === 'finished' &&
                                                    <div className='text-red-600 bg-opacity-25 text-center font-medium  bg-red-600 border-red-700 border px-2 rounded-full'>
                                                        {curr.status}
                                                    </div>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UserProfile