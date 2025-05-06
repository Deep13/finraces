import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { DarkModeContext } from '../../Contexts/DarkModeProvider';
import FriendCard from '../../Components/FriendCard';
import { getFollowers } from '../../Utils/api';

const AllFriends = () => {
  const { darkModeEnabled } = useContext(DarkModeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);

  let userId = JSON.parse(atob(localStorage.getItem('fin_userDetails'))).userId;

  // Fetch friends from the leaderboard
  useEffect(() => {
    if (userId) {
      getFollowers((data) => {
        setFriends(data.data);
        setFilteredFriends(data.data); // Initialize filteredFriends
      });
    }
  }, [userId]);

  // Update the filtered friends list as the search query changes
  useEffect(() => {
    const result = friends.filter(friend =>
      friend?.follower?.firstName?.toLowerCase().includes(searchQuery.toLowerCase())
      || friend?.follower?.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log('friend list',filteredFriends)
    setFilteredFriends(result);
  }, [searchQuery, friends]);

  return (
    <div className="dark:text-white w-full h-full">
      <div className="w-full flex justify-between items-center mb-3">
        <p className="font-semibold text-[1.2rem]">
          All Followers ({filteredFriends.length })
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
            onChange={(e) => setSearchQuery(e.target.value)} // Directly update the search query
          />
        </div>
      </div>
      <div className="w-full flex justify-start items-center gap-[1.5rem] flex-wrap">
        {filteredFriends?.length > 0 && filteredFriends?.some(friend => friend?.follower?.id !== userId) ? (
          filteredFriends
            .filter(friend => friend?.follower?.id !== userId)?.map((friend, index) => (
              <FriendCard
                key={index}
                name={friend?.follower?.firstName + " " + friend?.follower?.lastName}
                image={friend?.follower?.photo?.path}
                id={friend?.user.id}
              />
            ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No followers yet.</p>
        )}
      </div>
    </div>
  );
};

export default AllFriends;
