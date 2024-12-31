import React, { useEffect, useState } from 'react';
import Person from '../../assets/images/person2.png';
import person2 from '../../assets/images/kirayoshikage.png';
import person3 from '../../assets/images/person3.png';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../Components/Pagination';
import { fetchFriendsLeaderboard } from '../../Utils/api';

const FriendsLeaderBoard = () => {

  const navigate = useNavigate()
  const [leaderboardData, setLeaderboardData] = useState(null)
  let userId = JSON.parse(atob(localStorage.getItem('userDetails'))).userId

  useEffect(() => {
    // console.log(userId)
    userId && fetchFriendsLeaderboard(userId, (data) => {
      console.log(data)
      setLeaderboardData(data)
    })
  }, [])

  return (
    <div className="dark:text-white w-full h-full">
      <div className="w-full flex justify-between items-center mb-3">
        <p className="font-semibold text-[1.2rem]">Friends Leaderboard</p>
      </div>
      <div className="w-full flex justify-start items-center gap-[1.5rem] flex-wrap">
        <div className="overflow-x-auto w-full">
          <table className="table border-separate border-spacing-0 w-full text-left">
            {/* head */}
            <thead>
              <tr>
                <th className="font-semibold py-4 dark:text-white text-[1.1rem]">Rank</th>
                <th className="font-semibold py-4 dark:text-white text-[1.1rem]">Player</th>
                <th className="font-semibold py-4 dark:text-white text-[1.1rem]">Most Races Won</th>
                <th className="font-semibold py-4 dark:text-white text-[1.1rem]">Total Points</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {
                leaderboardData?.data?.data?.map((curr, index) => {
                  return (
                    <tr key={curr.user.id} className="odd:bg-transparent even:bg-[#00276] group">
                      <th className="text-[1.5rem] py-3 font-poppins group-hover:underline">1</th>
                      <td className="py-3">
                        <div onClick={() => navigate(`/userprofile/${curr.user.id}`, {
                          state: {
                            userName: curr.user.firstName + " " + curr.user.lastName,
                            // email: 'burt.macklin@gmail.com',
                            image: curr.user.photo.path
                          }
                        })} className="w-full flex gap-3 justify-start items-center cursor-pointer">
                          {/* image */}
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img className="w-full h-full object-cover" src={curr.user.photo.path} alt="" />
                          </div>
                          {/* name and badge */}
                          <div className="flex flex-col justify-between gap-1">
                            {userId === curr.user.id && <p className="text-xl text-yellow-400 font-poppins font-bold group-hover:underline">You</p>}
                            {userId !== curr.user.id && <p className="text-4 font-medium font-poppins group-hover:underline">{curr.user.firstName + " " + curr.user.lastName}</p>}
                            {/* <p className="text-4 text-[#B5B4B4]">Skale Enjoyoor</p> */}
                          </div>
                        </div>
                      </td>
                      <td className="text-[1.1rem] py-3 font-poppins group-hover:underline">{curr.num_races_won}</td>
                      <td className="text-[1.1rem] py-3 font-poppins group-hover:underline">{curr.total_points}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          {leaderboardData?.data?.data?.length > 30 && <Pagination currentPage={2} totalPages={10} onPageChange={() => { }} />}
        </div>
      </div>
    </div>
  );
};

export default FriendsLeaderBoard;
