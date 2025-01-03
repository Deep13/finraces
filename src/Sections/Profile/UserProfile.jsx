import React, { useEffect, useState } from 'react'
import badges from '../../assets/images/badges.png'
import diamond from '../../assets/images/diamondIcon.svg'
// import { FiArrowUpRight } from "react-icons/fi";
import Person from '../../assets/images/person2.png'
import redbadge from '../../assets/images/redbadge.png'
import goldbadge from '../../assets/images/goldbadge.png'
import badgegiftpurple from '../../assets/images/badgegiftpurple.png'
import badgegiftred from '../../assets/images/badgegiftred.png'
import badgegiftsilver from '../../assets/images/badgegiftsilver.png'
import badgemountain from '../../assets/images/badgemountain.png'
import graphrate_second from '../../assets/images/graph.png'
import {
    racesDataByUser,
    getWinningRate,
    getTotalPointsUser,
    getRacesCountByRank,
    getAllBadges
} from '../../Utils/api';
import { useNavigate } from 'react-router-dom';




const UserProfile = ({
    userId
}) => {
    const [total, setTotal] = useState(0)
    const [races, setRaces] = useState([])
    const [totalPoints, setTotalPoints] = useState(0)
    const [winningRate, setWinnigRate] = useState(0)
    const [badges, setBadges] = useState([])
    const [raceCounts, setRaceCounts] = useState({ // keys are ranks and values are counts of races with that rank
        1: 0,
        2: 0,
        3: 0,
    })
    const navigate = useNavigate()



    function capitalize(s) {
        return String(s[0]).toUpperCase() + String(s).slice(1);
    }

    useEffect(() => {
        // console.log('userId', userId)
        if (userId) {
            racesDataByUser(userId, (data) => {
                // console.log('data', data)
                setRaces(data)
                setTotal(data.length)
            }, (error) => {
                console.log('error', error)
            })
            getWinningRate(userId, (data) => {
                // console.log('winning rate', data)
                setWinnigRate(data.rate)
            })
            getTotalPointsUser(userId, (data) => {
                // console.log('Race Participated', data)
                setTotalPoints(data)
            })

            let obj = {};
            [1, 2, 3].forEach(element => {
                getRacesCountByRank(userId, element, (data) => {
                    // console.log(`with rank ${element}`, data)
                    obj[element] = data
                })
            })
            setRaceCounts(obj)
        }

        getAllBadges((data) => {
            console.log('all badges', data.data)
            setBadges(data.data)
        })
    }, [userId])

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
                            <p className='text-[1.5rem] font-poppins'>{totalPoints}</p>
                            {/* <div className='flex font-semibold gap-2 rounded-full border border-green-600 justify-start self-start items-center px-2 py-1'>
                                <FiArrowUpRight color="green" size={15} />
                                <p className="text-green-600">4.8%</p>
                            </div> */}
                        </div>
                    </div>

                    <div className="col-span-1 row-span-1 bg-white rounded-lg p-[1.5rem] flex gap-8 dark:bg-[#001B51] dark:border dark:border-[#00387E] dark:text-white">
                        <div className='flex flex-col gap-[8px]'>
                            <p className='text-[1rem]'>Win Rate</p>
                            <p className='text-[1.5rem] font-bold font-poppins'>{winningRate}</p>
                            {/* <div className='flex font-semibold gap-2 rounded-full border border-green-600 justify-start self-start items-center px-2 py-1'>
                                <FiArrowUpRight color="green" size={15} />
                                <p className="text-green-600">1.8%</p>
                            </div> */}
                        </div>
                        <div className='h-full z-10 w-[10rem]'>
                            <img src={graphrate_second} alt="" />
                        </div>
                    </div>

                    <div className="col-span-2 row-span-1 rounded-lg flex justify-between gap-4 bg-white p-[1.5rem] dark:bg-[#001B51] dark:border dark:border-[#00387E] dark:text-white">
                        <div className="flex-1 rounded-lg flex flex-col justify-between">
                            <p className="text-[1rem]">Race Participated</p>
                            <p className="text-[1.5rem] font-semibold font-poppins">{total}</p>
                        </div>
                        <div className="flex-1 rounded-lg flex flex-col justify-between">
                            <p className="text-[1rem]">Races with 1st place</p>
                            <p className="text-[1.5rem] font-semibold font-poppins">{raceCounts[1]}</p>
                        </div>
                        <div className="flex-1 rounded-lg flex flex-col justify-between">
                            <p className="text-[1rem]">Races with 2nd place</p>
                            <p className="text-[1.5rem] font-semibold font-poppins">{raceCounts[2]}</p>
                        </div>
                        <div className="flex-1 rounded-lg flex flex-col justify-between">
                            <p className="text-[1rem]">Races with 3rd place</p>
                            <p className="text-[1.5rem] font-semibold font-poppins">{raceCounts[3]}</p>
                        </div>
                    </div>
                </div>
                <div className='col-span-2 bg-white rounded-lg p-[1.5rem] flex justify-center items-center flex-col dark:bg-[#001B51] dark:border dark:border-[#00387E] dark:text-white'>
                    <p className="mb-[8px] text-[1rem] self-start">Achievements</p>
                    <div className='w-full h-full flex justify-start flex-wrap gap-[30px]'>
                        {badges.length > 0 &&
                            badges?.map(curr => {
                                return (
                                    <div key={curr.id} className='p-2 w-[7rem] h-[7rem] overflow-hidden bg-[#000A2D] self-start rounded-xl flex-wrap gap-4'>
                                        <img className='w-full h-full object-fit' src={curr.badge.image} alt="" />
                                    </div>
                                )
                            })
                        }
                        {/* <div className='p-2 w-[7rem] h-[7rem] overflow-hidden bg-[#000A2D] self-start rounded-xl flex-wrap gap-4'>
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
                        </div> */}
                    </div>
                </div>
            </div>


            {/* table is remaining  */}
            <div className='w-full p-4 bg-white dark:bg-[#001b51] dark:border dark:border-[#00387E] rounded-[20px]'>
                <table className="table border-separate border-spacing-0 w-full text-left dark:text-white">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="py-4 dark:text-[#898989] text-[0.9rem]">Serial No.</th>
                            <th className="py-4 dark:text-[#898989] text-[0.9rem]">Race Name</th>
                            <th className="py-4 dark:text-[#898989] text-[0.9rem]">Total Participants</th>
                            <th className="py-4 dark:text-[#898989] text-[0.9rem]">Total Stocks</th>
                            {/* <th className="py-4 dark:text-[#898989] text-[0.9rem]">Your Ranking</th> */}
                            <th className="py-4 dark:text-[#898989] text-[0.9rem]">Status</th>
                            {/* <th className="py-4 dark:text-[#898989] text-[0.9rem]">Status</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            races?.map((curr, index) => {

                                return (
                                    <tr onClick={(e) => {
                                        e.stopPropagation()
                                        navigate(`/race/${curr.id}`)
                                    }} key={index} className="odd:bg-transparent even:bg-[#00276] pb-2 dark:border-b cursor-pointer group">
                                        <th className="py-3 overflow-hidden text-ellipsis whitespace-nowrap group-hover:underline">{index + 1}</th>
                                        <td className="text-[1.1rem] py-3 group-hover:underline font-poppins">{curr.name}</td>
                                        <td className="text-[1.1rem] py-3 group-hover:underline font-poppins">{curr.participants.length}</td>
                                        <td className="text-[1.1rem] py-3 group-hover:underline font-poppins">{curr.stocks.length}</td>
                                        <td className="text-[1.1rem]">
                                            <div className='py-3 flex justify-start'>
                                                {
                                                    curr.status === 'scheduled' &&
                                                    <div className='text-white bg-opacity-25 text-center font-medium  bg-white border-white border px-3 rounded-full font-poppins'>
                                                        {capitalize(curr.status)}
                                                    </div>
                                                }
                                                {
                                                    curr.status === 'running' &&
                                                    <div className='text-green-500 bg-opacity-25 text-center font-medium  bg-green-500 border-green-500 border px-3 rounded-full font-poppins'>
                                                        {capitalize(curr.status)}
                                                    </div>
                                                }
                                                {
                                                    curr.status === 'finished' &&
                                                    <div className='text-red-300 bg-opacity-25 text-center font-medium  bg-red-600 border-red-700 border px-3 rounded-full'>
                                                        {capitalize(curr.status)}
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