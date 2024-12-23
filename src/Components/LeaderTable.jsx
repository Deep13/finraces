import { Table } from 'antd'
import React from 'react'
import person from '../assets/images/person2.png'
import { useNavigate } from 'react-router-dom'

const LeaderTable = () => {

    const navigate = useNavigate()


    const thisData = [
        {
            "rank": 1,
            "player": "John Doe",
            "most_races_won": 15,
            "total_points": 3200,
            "email": "john.doe@gmail.com",
            "image": person,
        },
        {
            "rank": 2,
            "player": "Jane Smith",
            "most_races_won": 12,
            "total_points": 2950,
            "email": "jane.Smith@gmail.com",
            "image": person
        },
        {
            "rank": 3,
            "player": "Mike Johnson",
            "most_races_won": 10,
            "total_points": 2700,
            "email": "mike.johnson@gmail.com",
            "image": person
        },
        {
            "rank": 4,
            "player": "Emily Davis",
            "most_races_won": 8,
            "total_points": 2500,
            "email": "emily.davis@gmail.com",
            "image": person
        },
        {
            "rank": 5,
            "player": "Chris Lee",
            "most_races_won": 7,
            "total_points": 2300,
            "email": "chris.lee@gmail.com",
            "image": person
        }
    ]



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
                        thisData?.map((curr, index) => {
                            return (
                                <tr key={index} className="odd:bg-transparent even:bg-[#002760]">
                                    <td className="text-[1.5rem] py-3 px-4 text-center">{curr.rank}</td>
                                    <td className="py-3">
                                        <div onClick={() => {
                                            navigate(`/userprofile/${curr.rank}`, {
                                                state: {
                                                    userName: curr.player,
                                                    email: curr.email,
                                                    image: curr.image,
                                                }
                                            })
                                        }} className="w-full flex gap-3 justify-start items-center cursor-pointer">
                                            {/* image */}
                                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                                <img className="w-full h-full object-cover" src={person} alt="" />
                                            </div>
                                            {/* name and badge */}
                                            <div className="flex flex-col justify-between gap-1">
                                                <p className="text-4 font-medium">{curr.player}</p>
                                                <p className="text-4 text-[#B5B4B4]">Skale Enjoyoor</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-[1.1rem] py-3">{curr.most_races_won}</td>
                                    <td className="text-[1.1rem] py-3">{curr.total_points}</td>
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