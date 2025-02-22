import React, { useEffect, useState } from 'react'
import badges from '../../assets/images/badges.png'
import diamond from '../../assets/images/crownCoin.png'
import trophy from '../../assets/images/trophy.png'
import trophy1st from '../../assets/images/1st-prize.png' 
import trophy2nd from '../../assets/images/2nd-place.png' 
import trophy3rd from '../../assets/images/3rd-place.png' 
import flags from '../../assets/images/racing-flag.png'
import winRateGraph from  '../../assets/images/winRateGraph.svg'
import coinsGif from '../../assets/images/coinsGif.gif'
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
import { ColorRing } from 'react-loader-spinner'
import GoldenDiamond from "../../Components/GoldDiamond.jsx"
import { TbSum } from "react-icons/tb";

import { GiPodiumWinner, GiPodiumSecond,GiPodiumThird } from "react-icons/gi";




const UserProfile = ({
    userId
}) => {
    const [total, setTotal] = useState(0)
    const [races, setRaces] = useState([])
    const [loadingRaces, setLoadingRaces] = useState(true)
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
                setLoadingRaces(false)
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
                        <div className='h-full p-[10px] w-[150px]'>
                            <img src={diamond} alt="" />
                            



                   
                        </div>
                        <div className='flex flex-col gap-[8px]'>
                            <p className='text-[1.5rem]'>Total Points</p>
                            <p className='text-[3.5rem] font-poppins'>{totalPoints}</p>
                            {/* <div className='flex font-semibold gap-2 rounded-full border border-green-600 justify-start self-start items-center px-2 py-1'>
                                <FiArrowUpRight color="green" size={15} />
                                <p className="text-green-600">4.8%</p>
                            </div> */}
                        </div>
                    </div>

                    <div className="col-span-1 row-span-1 bg-white rounded-lg p-[1.5rem] flex gap-8 dark:bg-[#001B51] dark:border dark:border-[#00387E] dark:text-white">
                        <div className='flex flex-col gap-[8px]'>
                            <p className='text-[1.5rem]'>Win Rate</p>
                            <p className='text-[2rem] font-bold font-poppins'>{(winningRate * 100).toFixed(2)}%</p>
                            {/* <div className='flex font-semibold gap-2 rounded-full border border-green-600 justify-start self-start items-center px-2 py-1'>
                                <FiArrowUpRight color="green" size={15} />
                                <p className="text-green-600">1.8%</p>
                            </div> */}
                        </div>
                        <div className='h-full w-[150px] p-[10px] z-10'>
                            <img src={flags} alt="" />
                        </div>
                    </div>

                    <div className="col-span-2 row-span-1 rounded-lg flex flex-col justify-between gap-3 bg-white px-5 dark:bg-[#001B51] dark:border dark:border-[#00387E] dark:text-white">
                        <div className="text-semibold text-[2rem]">Races</div>
                        <div className='flex justify-between items-center p-2'>
                            <div className="flex flex-col items-center justify-center gap-2">
                                <div className='w-12 h-10'>
                                  <img src={trophy} alt='totalImg'></img>
                                </div>
                                <div className='font-semibold text-lg'>Total</div>
                                <div className='text-[1.2rem]'>{total}</div>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-3">
                                <div className='w-12 h-10'>
                                  <img src={trophy1st} alt='totalImg'></img>
                                </div>
                                <div className='font-semibold text-lg'>1st</div>
                                <div className='text-[1.2rem]'>{raceCounts[1]}</div>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-3">
                                <div className='w-12 h-10'>
                                  <img src={trophy2nd} alt='totalImg'></img>
                                </div>
                                <div className='font-semibold text-lg'>2nd</div>
                                <div className='text-[1.2rem]'>{raceCounts[2]}</div>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-3">
                                <div className='w-12 h-10'>
                                  <img src={trophy3rd} alt='3rdImg'></img>
                                </div>
                                <div className='font-semibold text-lg'>3rd</div>
                                <div className='text-[1.2rem]'>{raceCounts[3]}</div>
                            </div>
                        </div>
                        {/* <div className="flex-1 rounded-lg flex flex-col justify-between items-center text-center">
                            <p className="text-[1rem]">Race Participated</p>
                            <p><TbSum  size={48}/></p>
                            <p className="text-[1.5rem] font-semibold font-poppins">{total}</p>
                        </div>
                        <div className="flex-1 rounded-lg flex flex-col justify-between items-center text-center">
                            <p className="text-[1rem]">Races with 1st place</p>
                            <p><GiPodiumWinner size={48}/></p>
                            <p className="text-[1.5rem] font-semibold font-poppins">{raceCounts[1]}</p>
                        </div>
                        <div className="flex-1 rounded-lg flex flex-col justify-between items-center text-center">
                            <p className="text-[1rem]">Races with 2nd place</p>
                            <p><GiPodiumSecond size={48}/></p>
                            <p className="text-[1.5rem] font-semibold font-poppins">{raceCounts[2]}</p>
                        </div>
                        <div className="flex-1 rounded-lg flex flex-col justify-between items-center text-center">
                            <p className="text-[1rem] mx-auto">Races with 3rd place</p>
                            <p><GiPodiumThird size={48}/></p>
                            <p className="text-[1.5rem] font-semibold font-poppins">{raceCounts[3]}</p>
                        </div> */}
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
                            races.length > 0 ?
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
                                }) :
                                (!loadingRaces && <p>There are no recent Races</p>)
                        }

                    </tbody>
                </table>
                {
                    loadingRaces &&
                    <div className='w-full flex justify-center items-center'>
                        <ColorRing
                            visible={true}
                            height="40"
                            width="40"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />
                    </div>
                }
            </div>
        </>
    )
}

export default UserProfile