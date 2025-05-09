import React, { useContext, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { DarkModeContext } from "../../Contexts/DarkModeProvider";
import FriendCard from "../../Components/FriendCard";
import { getFollowees, unfollowUser } from "../../Utils/api";

const AllFriends = () => {
  const { darkModeEnabled } = useContext(DarkModeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const userId = JSON.parse(
    atob(localStorage.getItem("fin_userDetails"))
  )?.userId;

  useEffect(() => {
    if (userId) {
      getFollowees((data) => {
        const list = data.data || [];
        setFriends(list);
        setFilteredFriends(list);
      });
    }
  }, [userId]);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const result = friends.filter((friend) => {
      const firstName = friend?.followee?.firstName?.toLowerCase() || "";
      const lastName = friend?.followee?.lastName?.toLowerCase() || "";
      return firstName.includes(query) || lastName.includes(query);
    });
    setFilteredFriends(result);
  }, [searchQuery, friends]);

  const openUnfollowModal = (id, name) => {
    setSelectedUser({ id, name });
    setShowModal(true);
  };

  const confirmUnfollow = () => {
    if (!selectedUser) return;

    unfollowUser(selectedUser.id, () => {
      const updated = friends.filter(
        (friend) => friend?.followee?.id !== selectedUser.id
      );
      setFriends(updated);
      setFilteredFriends(
        updated.filter((f) => {
          const first = f?.followee?.firstName?.toLowerCase() || "";
          const last = f?.followee?.lastName?.toLowerCase() || "";
          return (
            first.includes(searchQuery.toLowerCase()) ||
            last.includes(searchQuery.toLowerCase())
          );
        })
      );
      setShowModal(false);
      setSelectedUser(null);
    });
  };

  return (
    <div className="dark:text-white w-full h-full relative">
      <div className="w-full flex justify-between items-center mb-3">
        <p className="font-semibold text-[1.2rem]">
          All Followees ({filteredFriends.length})
        </p>
        <div className="w-[30rem] bg-slate-200 dark:bg-[#000A2D] self-start rounded-full px-3 py-2 flex gap-3">
          <AiOutlineSearch
            color={darkModeEnabled ? "white" : "black"}
            size={24}
          />
          <input
            autoFocus
            style={{ backgroundColor: "transparent" }}
            placeholder="Search..."
            className="flex-1 p-0 focus:outline-none"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full flex justify-start items-center gap-[1.5rem] flex-wrap">
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend, index) => (
            <FriendCard
              key={index}
              name={`${friend?.followee?.firstName || ""} ${
                friend?.followee?.lastName || ""
              }`}
              image={friend?.followee?.photo?.path}
              id={friend?.followee?.id}
              gender={friend?.followee?.gender}
              allowUnfollow={true}
              onUnfollowClick={openUnfollowModal}
            />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            Not following anyone yet.
          </p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div
            className={`w-[90%] max-w-md rounded-2xl px-6 py-8 shadow-2xl ring-1 ring-gray-300
        ${darkModeEnabled ? "bg-[#0C1A3A] text-white" : "bg-white text-black"}`}
          >
            <p className="text-center text-lg sm:text-xl font-medium mb-6">
              Are you sure you want to unfollow{" "}
              <span className="font-semibold">{selectedUser?.name}</span>?
            </p>

            <div className="flex justify-between mt-4 gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedUser(null);
                }}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition
            ${
              darkModeEnabled
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
              >
                Cancel
              </button>

              <button
                onClick={confirmUnfollow}
                className="flex-1 py-2 rounded-full text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition"
              >
                Unfollow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllFriends;
