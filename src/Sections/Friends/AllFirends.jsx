import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { DarkModeContext } from '../../Contexts/DarkModeProvider';
import FriendCard from '../../Components/FriendCard';
import Person from '../../assets/images/person2.png';
import { friendsList } from '../../Utils/dummyFirends';
import { fetchFriendsLeaderboard } from '../../Utils/api';



const AllFriends = () => {
  const { darkModeEnabled } = useContext(DarkModeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState([]);

  // Update the friends list as the search query changes
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const filteredFriends = friendsList.filter(friend =>
      friend.name.toLowerCase().includes(query.toLowerCase())
    );
    setFriends(filteredFriends);
  };
  let userId = JSON.parse(atob(localStorage.getItem('userDetails'))).userId

  useEffect(() => {
    userId && fetchFriendsLeaderboard(userId, (data) => {
      setFriends(data.data.data)
    })
  }, [])

  return (
    <div className="dark:text-white w-full h-full">
      <div className="w-full flex justify-between items-center mb-3">
        <p className="font-semibold text-[1.2rem]">
          All Friends ({friends.length - 1})
        </p>
        <div className="w-[30rem] bg-slate-200 dark:bg-[#000A2D] self-start rounded-full px-3 py-2 flex gap-3">
          <AiOutlineSearch
            color={darkModeEnabled ? 'white' : 'black'}
            size={24}
          />
          <input
            autoFocus
            style={{ backgroundColor: 'transparent' }}
            placeholder="Search..."
            className="flex-1 p-0 focus:outline-none"
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex justify-start items-center gap-[1.5rem] flex-wrap">
        {friends?.length > 0 && friends?.some(friend => friend?.user?.id !== userId) ? (
          friends
            .filter(friend => friend?.use?.id !== userId)?.map((friend, index) => (
              <FriendCard
                key={index}
                name={friend.name}
                role={friend.role}
                image={Person}
              />
            ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No friends found.</p>
        )}
      </div>
    </div>
  );
};

export default AllFriends;
