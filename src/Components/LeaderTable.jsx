import { useEffect, useState } from 'react';
import person from '../assets/images/person2.png';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../Utils/api';
import { HiArrowNarrowUp, HiArrowNarrowDown } from 'react-icons/hi';

const LeaderTable = ({ data, setSortType,setSortDirection }) => {
  const navigate = useNavigate();
  const [YourDetails, setYourDetails] = useState(null);
  const [activeSort, setActiveSort] = useState({ key: null, direction: 'ASC' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    token && getUserDetails((data) => setYourDetails(data));
  }, []);

  const handleSortClick = (key) => {
    const isSameKey = activeSort.key === key;
    const newDirection = isSameKey && activeSort.direction === 'ASC' ? 'DESC' : 'ASC';
    setActiveSort({ key, direction: newDirection });
    setSortType(key)
    setSortDirection(newDirection)
  };

  const renderArrow = (key) => {
    if (activeSort.key === key) {
      return activeSort.direction === 'ASC' ? <HiArrowNarrowUp/> : <HiArrowNarrowDown/>;
    }
    return ''; // show ↑ on hover via CSS
  };

  return (
    <div className='w-full mt-8 flex'>
      <table className="table border-separate border-spacing-0 w-full text-left dark:text-white">
        <thead>
          <tr>
            {['Rank', 'Name', 'Races', 'Points'].map((label, index) => {
              const key = label;
              const labelMap = {
                Rank: 'Rank',
                Name: 'Player',
                Races: 'Total Races',
                Points: 'Total Points',
              };

              return (
                <th
                  key={index}
                  onClick={() => handleSortClick(key)}
                  className="font-semibold py-4 px-4 text-center text-[1.1rem] cursor-pointer hover:underline relative group"
                >
                  <span className="flex justify-center items-center gap-1">
                    {labelMap[label]}
                    <span className="transition-all group-hover:opacity-100 opacity-0">
                      {renderArrow(key) || '↑'}
                    </span>
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {data?.map((curr, index) => (
            <tr
              key={index}
              className="odd:bg-transparent dark:even:bg-[#002760] even:bg-slate-200 group"
            >
              <td className="text-[1.5rem] py-3 px-4 text-center">{curr.rank}</td>
              <td className="py-3">
                <div className="flex gap-3 items-center cursor-pointer">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={curr?.user?.photo?.path || person}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    {YourDetails?.id !== curr?.user?.id ? (
                      <p
                        onClick={() =>
                          navigate(`/userprofile/${curr?.user?.id}`, {
                            state: {
                              id: curr?.user?.id,
                              email: curr?.user?.email,
                              image: curr?.user?.photo?.path,
                              userName: curr?.user?.firstName + ' ' + curr?.user?.lastName,
                            },
                          })
                        }
                        className="text-4 font-medium group-hover:underline"
                      >
                        {curr.user.firstName + ' ' + curr.user.lastName}
                      </p>
                    ) : (
                      <p
                        onClick={() => navigate('/profile')}
                        className="text-xl font-bold underline text-yellow-400 group-hover:underline"
                      >
                        You
                      </p>
                    )}
                  </div>
                </div>
              </td>
              <td className="text-[1.1rem] py-3 text-center">{curr?.races_played}</td>
              <td className="text-[1.1rem] py-3 text-center">{curr?.total_points || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderTable;
