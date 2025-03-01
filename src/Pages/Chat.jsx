import { AiOutlineSearch } from "react-icons/ai";
import { RxMixerVertical } from "react-icons/rx";
import { MdArrowBackIos } from "react-icons/md";
import { FaPaperPlane } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import { fetchFriendsLeaderboard, getChats, searchUsers } from "../Utils/api";
import Sidebar from "../Components/Sidebar";
import { debounce } from "lodash";

const Chat = () => {
  const userId = JSON.parse(atob(localStorage.getItem('userDetails'))).userId;
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState(""); // For message input
  const [searchMode, setSearchMode] = useState(false); // Indicates whether we're searching globally or among friends
  const [chatUsers, setChatUsers] = useState([]);
  const [chatData,setChatData] = useState();
  const [selectedUser, setSelectedUser] = useState(null); // Active chat
  const [messages, setMessages] = useState([]); // Chat messages

  const userDetails = JSON.parse(atob(localStorage.getItem("userDetails")));
  // Fetch friends
  useEffect(() => {
    if (userId) {
      fetchFriendsLeaderboard(userId, (data) => {
        setFriends(data.data.data);
        setFilteredFriends(data.data.data); // Initialize filteredFriends
      });
    }
  }, [userId]);

  // Debounced global search function
  const performSearch = useCallback(
    debounce(async (query) => {
      if (query.length > 2) {
        setSearchMode(true); // Switch to global search
        try {
          const results = await searchUsers(query);
          setFilteredFriends(
            results?.data?.filter((user) => user.id !== userId)
          );
        } catch (error) {
          console.error("Error searching users:", error);
          setFilteredFriends([]);
        }
      } else {
        setSearchMode(false); // Revert to friend list filtering
        setFilteredFriends(friends);
      }
    }, 300),
    [userId, friends]
  );

  // Handle search query changes
  useEffect(() => {
    performSearch(searchQuery);
    return () => performSearch.cancel(); // Clean up debounce on unmount
  }, [searchQuery, performSearch]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      console.log("Message Sent:", message);
      setMessage(""); // Clear input field
    }
  };

  console.log(filteredFriends)

  useEffect(()=>{
    getChats(
      (data) => {
        console.log("chats", data);
        setChatData(data)

        // Extract unique users from chat messages
        const users = new Map(); // Store unique users
        data.data.forEach((msg) => {
          const otherUser =
            msg.sender.id === userDetails.userId ? msg.receiver : msg.sender;
          // if (!users.has(otherUser.id)) {
          //   users.set(otherUser.id, otherUser);
          // }
          users.set(otherUser.id, otherUser);
        });
        console.log("chat user",users)
        setChatUsers([...users.values()]); // Convert Map to array
      },
      (error) => {
        console.error("Error fetching chats:", error);
      }
    );
  },[])

  const handleSelectUser = (user) => {
    setSelectedUser(user);

    // Filter messages between logged-in user & selected user
    const userMessages = chatData.data.filter(
      (msg) =>
        (msg.sender.id === userDetails.userId && msg.receiver.id === user.id) ||
        (msg.sender.id === user.id && msg.receiver.id === userDetails.userId)
    );

    console.log("selected",userMessages,user)
    setMessages(userMessages);
  };

  return (
    <div className="w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]">
      <Sidebar />
      <div className="dark:bg-[#000D38] h-[30rem] py-5 md:px-10 mx-[1rem] md:mx-[7rem] flex flex-1 flex-row rounded-xl border dark:border-[#00387E] dark:text-white">
        {/* Left Panel */}
        <div className="w-[40%] pr-5">
          <span className="font-semibold text-[1.5rem] font-poppins flex flex-row items-center mb-5">
            <MdArrowBackIos />
            Messages
          </span>
          <div className="flex relative flex-row justify-between text-slate-400 mb-5">
            <input
              className="w-[67%] h-8 pl-10 px-4 font-poppins text-sm dark:bg-[#001a50] rounded-xl text-white"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <AiOutlineSearch className="absolute left-3 top-[0.5rem] text-gray-400 text-lg" />
            <div className="w-[31%] flex flex-row justify-center items-center dark:bg-[#001a50] rounded-xl py-2 cursor-pointer">
              <span className="mr-2 text-sm">Filter By</span>
              <RxMixerVertical />
            </div>
          </div>
          <div className="overflow-y-auto h-[20.5rem] pr-3 notificationScrollbar">
            {/* {filteredFriends && filteredFriends.length > 0 ? (
              filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex flex-row items-center p-3 mb-2 rounded-lg bg-slate-200 dark:bg-[#002763] cursor-pointer"
                >
                  <img
                    src={friend?.photo?.path || "/default-avatar.png"}
                    className="w-10 h-10 rounded-full bg-gray-500 mr-3"
                    alt="User"
                  />
                  <div>
                    <p className="font-semibold text-sm">
                      {friend.firstName} {friend.lastName}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">
                {searchMode ? "No users found." : "No friends available."}
              </p>
            )} */}
            {chatUsers.map((user) => (
            <div className="flex flex-row items-center px-3 py-4 mb-2 rounded-lg bg-slate-200 dark:bg-[#002763] cursor-pointer" key={user.id} onClick={() => handleSelectUser(user)} >
              
              {user.firstName} {user.lastName}
            </div>
          ))}
          </div>
        </div>

        {/* Right Panel (Chat Messages) */}
<div className="w-[60%] h-[27.5rem] dark:bg-[#001B51] border dark:border-[#00387E] rounded-xl px-5 py-2 flex flex-col">
  {/* Chat messages */}
  <div className="overflow-y-auto h-[23rem] flex flex-col gap-4">
    {messages.length > 0 ? (
      messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-3 rounded-xl max-w-[70%] ${
            msg.sender.id === userDetails.userId
              ? "self-end bg-blue-500 text-white" // Sent message
              : "self-start bg-gray-200 text-black" // Received message
          }`}
        >
          {msg.content}
          <br />
          <small className="block text-xs mt-1 opacity-75">
            {new Date(msg.createdAt).toLocaleTimeString()}
          </small>
        </div>
      ))
    ) : (
      <p className="text-gray-400 text-center mt-5">No messages yet.</p>
    )}
  </div>

  {/* Message Input Box */}
  <div className="flex items-center mt-auto">
    <input
      className="w-[90%] h-10 px-4 rounded-full dark:bg-[#000D38] text-white"
      placeholder="Type message here..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button
      className="ml-2 p-2 rounded-full bg-blue-500 text-white"
      onClick={handleSendMessage}
    >
      <FaPaperPlane size={20} />
    </button>
  </div>
</div>

      </div>
    </div>
  );
};

export default Chat;
