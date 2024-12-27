import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import person from '../assets/images/person2.png'
import { useNavigate } from 'react-router-dom'
import { getUserDetails } from '../Utils/api'

const LeaderTable = ({
    data
}) => {

    const navigate = useNavigate()
    const [YourDetails, setYourDetails] = useState(null)


    useEffect(() => { console.log(data) }, [data])

    useEffect(() => {
        getUserDetails((data) => {
            setYourDetails(data)
        })
    }, [])



    return (
        <div className='w-full mt-8 flex'>
            <table className="table border-separate border-spacing-0 w-full text-left dark:text-white">
                {/* head */}
                <thead>
                    <tr>
                        <th className="font-semibold py-4 dark:text-white text-[1.1rem] px-4 text-center">Rank</th>
                        <th className="font-semibold py-4 dark:text-white text-[1.1rem]">Player</th>
                        <th className="font-semibold py-4 dark:text-white text-[1.1rem]">Most Races Won</th>
                        <th className="font-semibold py-4 dark:text-white text-[1.1rem]">Total Points</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        data?.map((curr, index) => {
                            return (
                                <tr style={{
                                    // background: `${userId === curr?.user?.id ? 'yellow' : 'transparent'}`
                                }} key={index} className="odd:bg-transparent dark:even:bg-[#002760] even:bg-slate-200 group">
                                    <td className="text-[1.5rem] py-3 px-4 text-center group-hover:underline">{index + 5}</td>
                                    <td className="py-3">
                                        <div onClick={() => {
                                            navigate(`/userprofile/${curr?.user?.id}`, {
                                                state: {
                                                    id: curr.user.id, // this is mandatory
                                                    email: curr.user.email,
                                                    image: curr.user.photo.path,
                                                    userName: curr.user.firstName + " " + curr.user.lastName,
                                                }
                                            })
                                        }} className="w-full flex gap-3 justify-start items-center cursor-pointer">
                                            {/* image */}
                                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                                <img className="w-full h-full object-cover" src={curr?.user?.photo?.path ? curr?.user?.photo?.path : person} alt="" />
                                            </div>
                                            {/* name and badge */}
                                            <div className="flex flex-col justify-between gap-1">
                                                {YourDetails?.id !== curr?.user?.id && <p className="text-4 font-medium group-hover:underline">{curr.user.firstName + " " + curr.user.lastName}</p>}
                                                {YourDetails?.id === curr?.user?.id && <p className="text-xl font-bold underline text-yellow-400 group-hover:underline">You</p>}
                                                {/* <p className="text-4 text-[#B5B4B4]">Skale Enjoyoor</p> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-[1.1rem] py-3 group-hover:underline">{curr.num_races_won}</td>
                                    <td className="text-[1.1rem] py-3 group-hover:underline">{!curr?.total_points ? 0 : curr.total_points}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>
        </div>
    )
}

export default LeaderTable