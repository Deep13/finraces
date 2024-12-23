import React from 'react';
import Person from '../../assets/images/person2.png';
import person2 from '../../assets/images/kirayoshikage.png';
import person3 from '../../assets/images/person3.png';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../Components/Pagination';

const FriendsLeaderBoard = () => {

  const navigate = useNavigate()

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
              <tr className="odd:bg-transparent even:bg-[#00276]">
                <th className="text-[1.5rem] py-3">1</th>
                <td className="py-3">
                  <div onClick={() => navigate(`/userprofile/1`, {
                    state: {
                      userName: 'Burt Macklin',
                      email: 'burt.macklin@gmail.com',
                      image: Person
                    }
                  })} className="w-full flex gap-3 justify-start items-center cursor-pointer">
                    {/* image */}
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img className="w-full h-full object-cover" src={Person} alt="" />
                    </div>
                    {/* name and badge */}
                    <div className="flex flex-col justify-between gap-1">
                      <p className="text-4 font-medium">Burt Macklin</p>
                      <p className="text-4 text-[#B5B4B4]">Skale Enjoyoor</p>
                    </div>
                  </div>
                </td>
                <td className="text-[1.1rem] py-3">152</td>
                <td className="text-[1.1rem] py-3">Blue</td>
              </tr>

              {/* row 2 */}
              <tr className="odd:bg-transparent even:bg-[#00276]">
                <th className="text-[1.5rem] py-3">2</th>
                <td className="py-3">
                  <div onClick={() => navigate(`/userprofile/1`, {
                    state: {
                      userName: 'Burt Macklin',
                      email: 'burt.macklin@gmail.com',
                      image: person2
                    }
                  })} className="w-full flex gap-3 justify-start items-center cursor-pointer">
                    {/* image */}
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img className="w-full h-full object-cover" src={person2} alt="" />
                    </div>
                    {/* name and badge */}
                    <div className="flex flex-col justify-between gap-1">
                      <p className="text-[1.3rem] font-bold">You</p>
                      <p className="text-4 text-[#B5B4B4]">Skale Enjoyoor</p>
                    </div>
                  </div>
                </td>
                <td className="text-[1.1rem] py-3">152</td>
                <td className="text-[1.1rem] py-3">Blue</td>
              </tr>

              {/* row 3 */}
              <tr className="odd:bg-transparent even:bg-[#00276]">
                <th className="text-[1.5rem] py-3">3</th>
                <td className="py-3">
                  <div onClick={() => navigate(`/userprofile/1`, {
                    state: {
                      userName: 'Burt Macklin',
                      email: 'burt.macklin@gmail.com',
                      image: person3
                    }
                  })} className="w-full flex gap-3 justify-start items-center cursor-pointer">
                    {/* image */}
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img className="w-full h-full object-cover" src={person3} alt="" />
                    </div>
                    {/* name and badge */}
                    <div className="flex flex-col justify-between gap-1">
                      <p className="text-4 font-medium">Burt Macklin</p>
                      <p className="text-4 text-[#B5B4B4]">Skale Enjoyoor</p>
                    </div>
                  </div>
                </td>
                <td className="text-[1.1rem] py-3">152</td>
                <td className="text-[1.1rem] py-3">Blue</td>
              </tr>
            </tbody>
          </table>
          <Pagination currentPage={2} totalPages={10} onPageChange={() => { }} />
        </div>
      </div>
    </div>
  );
};

export default FriendsLeaderBoard;
