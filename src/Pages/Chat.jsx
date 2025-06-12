import { AiOutlineSearch } from "react-icons/ai";
import { RxMixerVertical } from "react-icons/rx";
import { MdArrowBackIos } from "react-icons/md";
import { FaPaperPlane } from "react-icons/fa";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  getAllChats,
  getChats,
  getUser,
  markChatsAsRead,
  postChats,
  searchUsers,
} from "../Utils/api";
import Sidebar from "../Components/Sidebar";
import { debounce } from "lodash";
import { globalUrl } from "../Config";
import { io } from "socket.io-client";
import { useRef } from "react";
import malePlaceholder from "../assets/images/manPlaceholder.jpg";
import femalePlaceholder from "../assets/images/womanPlaceholder.jpg";
import { DarkModeContext } from "../Contexts/DarkModeProvider";
import { useSocket } from "../Contexts/SocketProvider";
import { useCommunity } from "../Contexts/CommunityProvider";

const Chat = () => {
  const userId = JSON.parse(
    atob(localStorage.getItem("fin_userDetails"))
  ).userId;
  // const [friends, setFriends] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false); // Track if more messages exist
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState(""); // For message input
  const [searchMode, setSearchMode] = useState(false); // Indicates whether we're searching globally or among friends
  const [chatUsers, setChatUsers] = useState([]);
  const [chatData, setChatData] = useState();
  const { selectedUser2, setSelectedUser2 } = useCommunity();
  const [messages, setMessages] = useState([]); // Chat messages
  const chatContainerRef = useRef(null);
  const userDetails = JSON.parse(atob(localStorage.getItem("fin_userDetails")));
  const { setShowLoginForm } = useContext(DarkModeContext);
  const selectedRef = useRef(null);

  const socket = useSocket();
  // const [socket, setSocket] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem("token");
    // let ud=localStorage.getItem('fin_userDetails');

    if (!token) {
      setShowLoginForm(true);
    }
  }, []);

  useEffect(() => {
    getAllChats(
      (data) => {
        console.log(data);
        setChatUsers(data.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  const scrollToBottom = () => {
    if (selectedUser2) {
      requestAnimationFrame(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      });
    }
  };

  // handle Scrolling
  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedUser2]);

  // Initialize socket connection

  const handleNewMessage = (socketResponse) => {
    const { fromUserId, message } = socketResponse;

    // Case 1: Message is from the user currently opened in chat
    if (selectedRef.current?.id === fromUserId) {
      const newMessage = {
        content: message.message,
        receiver: { isBot: false },
        sender: {
          id: fromUserId,
          firstName: selectedRef.current.firstName,
          lastName: selectedRef.current.lastName,
          isBot: false,
          gender: selectedRef.current.gender,
        },
        id: crypto.randomUUID(), // Generate a unique ID for the frontend
        createdAt: message.createdAt,
        updatedAt: message.createdAt,
      };

      // Update state to reflect the new message
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
    } else {
      // Case 2 & 3: Message is from someone else (either in contacts or not)
      setChatUsers((prevChatUsers) => {
        const userIndex = prevChatUsers.findIndex(
          (chat) => chat.user.id === fromUserId
        );

        if (userIndex !== -1) {
          // Case 2: User is in contact list, update unread count
          return prevChatUsers.map((chat, index) =>
            index === userIndex
              ? {
                  ...chat,
                  unreadCount: (parseInt(chat.unreadCount, 10) + 1).toString(),
                }
              : chat
          );
        }

        // Case 3: User is not in the contact list, fetch user data
        getUser(
          fromUserId,
          (userData) => {
            if (!userData) {
              console.log("User not found");
              return;
            }

            setChatUsers((prevChatUsers) => {
              // **Check if user already exists**
              const userExists = prevChatUsers.some(
                (chat) => chat.user.id === userData.id
              );
              if (userExists) {
                console.log("User already exists in chat list, skipping add.");
                return prevChatUsers; // Do nothing, return existing state
              }

              // **Create new user**
              const newUser = {
                user: {
                  id: userData.id,
                  firstName: userData.firstName || "Unknown",
                  lastName: userData.lastName || "",
                  gender: userData.gender || null,
                  photo: userData.photo || null,
                  email: userData.email || "",
                  role: userData.role?.name || "User",
                  status: userData.status?.name || "Active",
                },
                unreadCount: 1,
              };

              // **Add the new user and return new state**
              return [...prevChatUsers, newUser];
            });
          },
          (error) => {
            console.log("Error fetching user:", error);
          }
        );

        return prevChatUsers; // Keep the current state unchanged while waiting for `getUser`
      });
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("receive-chat-message", (data) => {
      console.log("New message received:", data);

      handleNewMessage(data);
    });

    return () => {
      socket.off("receive-chat-message");
    };
  }, [socket]);

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
        // setFilteredFriends(friends);
        setFilteredFriends([]);
      }
    }, 300),
    [userId]
  );

  // Handle search query changes
  useEffect(() => {
    performSearch(searchQuery);
    return () => performSearch.cancel(); // Clean up debounce on unmount
  }, [searchQuery, performSearch]);

  // const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (!selectedUser2 || !selectedUser2.id) {
      console.error("Error: No user selected for chat.");
      return;
    }

    if (message.trim() !== "") {
      postChats(
        message,
        selectedUser2.id,
        (response) => {
          console.log("Message Sent:", response);

          // Append new message to state
          setMessages((prevMessages) => [response, ...prevMessages]);

          // Clear input field
          setMessage("");
        },
        (error) => {
          console.error("Error sending message:", error);
        }
      );
    }
  };

  // console.log(filteredFriends)

  // useEffect(()=>{

  //   if(selectedUser && selectedUser.id){
  //     getChats(
  //       (data) => {
  //         console.log("chats", data);
  //         setHasNextPage(data.hasNextPage);
  //         setChatData(data)

  //         // Extract unique users from chat messages
  //         const users = new Map(); // Store unique users
  //         data.data.forEach((msg) => {
  //           const otherUser =
  //             msg.sender.id === userDetails.userId ? msg.receiver : msg.sender;
  //           // if (!users.has(otherUser.id)) {
  //           //   users.set(otherUser.id, otherUser);
  //           // }
  //           users.set(otherUser.id, otherUser);
  //         });
  //         console.log("chat user",users)
  //         // setChatUsers([...users.values()]); // Convert Map to array
  //       },
  //       (error) => {
  //         console.error("Error fetching chats:", error);
  //       },
  //       selectedUser.id
  //     );
  //   }
  // },[selectedUser])

  useEffect(() => {
    console.log("Selected user changed:", selectedUser2);
  }, [selectedUser2]);

  const handleSelectUser = (user) => {
    if (user != selectedUser2) {
      setSelectedUser2(user);
    }
    selectedRef.current = user;
    setFilteredFriends([]);
    setSearchQuery("");

    // Update unreadCount of selected user to 0
    setChatUsers((prevChatUsers) =>
      prevChatUsers.map((chat) =>
        chat.user.id === user.id ? { ...chat, unreadCount: 0 } : chat
      )
    );

    getChats(
      (res) => {
        console.log("chats", res);
        // scrollToBottom()
        const userMessages = res.data.filter(
          (msg) =>
            (msg.sender.id === userDetails.userId &&
              msg.receiver.id === user.id) ||
            (msg.sender.id === user.id &&
              msg.receiver.id === userDetails.userId)
        );

        setMessages((prevMessages) => {
          const newMessages = userMessages.filter(
            (msg) => !prevMessages.some((prevMsg) => prevMsg.id === msg.id)
          );
          return [...newMessages];
        });
        // setMessage([...userMessages])

        setHasNextPage(res.hasNextPage);

        for (let i = 0; i < res.data.length; i++) {
          if (!res.data[i].is_read) {
            markChatsAsRead(
              res.data[i].id,
              (data) => {
                console.log("chat marked as read", data);
              },
              (error) => {
                console.log("Error marking chat as read", error);
              }
            );
          }
        }
      },
      (error) => {
        console.error("Error fetching chats:", error);
      },
      user.id
    );
  };

  const fetchChats = (pageNumber = 1) => {
    if (!selectedUser2) return;

    getChats(
      (res) => {
        console.log("Chats fetched:", res.data);

        setMessages((prevMessages) => {
          const newMessages = res.data.filter(
            (msg) => !prevMessages.some((prevMsg) => prevMsg.id === msg.id)
          );
          return [...prevMessages, ...newMessages]; // Append older messages at the top
        });

        setHasNextPage(res.hasNextPage); // Update pagination status
      },
      (error) => {
        console.error("Error fetching chats:", error);
      },
      selectedUser2.id,
      pageNumber
    );
  };

  // Handle scroll event
  const handleScroll = () => {
    if (!chatContainerRef.current || !hasNextPage) return;

    if (chatContainerRef.current.scrollTop < 1) {
      console.log("Fetching older messages...");
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const chatDiv = chatContainerRef.current;
    if (!chatDiv) return;

    const handleScroll = () => {
      if (!hasNextPage) return; // Stop if there's no more data to load

      if (chatDiv.scrollTop <= 20) {
        // Adjusted threshold
        console.log("Fetching older messages...");
        setPage((prevPage) => prevPage + 1);
      }
    };

    chatDiv.addEventListener("scroll", handleScroll);

    return () => {
      chatDiv.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage]); // Removed chatContainerRef.current from dependencies

  // Fetch older messages when `page` increases
  useEffect(() => {
    if (page > 1) {
      fetchChats(page);
    }
  }, [page]);

  useEffect(() => {
    if (selectedUser2) {
      handleSelectUser(selectedUser2);
    }
  }, []);

  return (
    <div className="w-full relative h-[40rem] flex pb-8 pt-8 dark:bg-[#000924]">
      <Sidebar />
      <div className="dark:bg-[#000D38] h-[35rem] py-5 md:px-10 mx-[1rem] md:mx-[7rem] flex flex-1 flex-row rounded-xl border dark:border-[#00387E] dark:text-white">
        {/* Left Panel */}
        <div className="w-[40%] pr-5">
          <span className="font-semibold text-[1.5rem] font-poppins flex flex-row items-center mb-5">
            {/* <MdArrowBackIos /> */}
            Messages
          </span>
          <div className="flex relative flex-row justify-between text-slate-400 mb-5">
            <div className="relative w-[67%]">
              <input
                className="w-full h-8 pl-10 px-4 font-poppins text-sm dark:bg-[#001a50] rounded-xl dark:text-white"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <AiOutlineSearch className="absolute left-3 top-[0.5rem] dark:text-gray-400 text-lg" />

              {/* Dropdown for filtered users */}
              {filteredFriends.length > 0 && (
                <div className="absolute w-full mt-1 bg-white dark:bg-[#001a50] border border-gray-300 dark:border-gray-600 rounded-lg shadow-md max-h-60 overflow-y-auto z-50 notificationScrollbar">
                  {filteredFriends.map((user) => (
                    <div
                      key={user.id}
                      className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-[#002763] cursor-pointer"
                      onClick={() => handleSelectUser(user)}
                    >
                      {user.firstName} {user.lastName}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-[31%] flex flex-row justify-center items-center bg-[#e5f4ff] dark:bg-[#001a50] rounded-xl py-2 cursor-pointer">
              <span className="mr-2 text-sm">Filter By</span>
              <RxMixerVertical />
            </div>
          </div>

          <div className="overflow-y-auto h-[24rem] pr-3 notificationScrollbar">
            {chatUsers
              .filter((user) => user.user.id !== userDetails.userId) // Exclude the logged-in user
              .map((user) => (
                <div
                  key={user.user.id}
                  className="flex flex-row items-center gap-5 px-3 py-4 mb-2 rounded-lg bg-[#e5f4ff] dark:bg-[#002763] cursor-pointer"
                  onClick={() => handleSelectUser(user.user)}
                >
                  <img
                    className="rounded-full h-12 w-12"
                    src={
                      user?.user?.photo?.path
                        ? user.user.photo.path
                        : user?.user?.gender === "female"
                        ? femalePlaceholder
                        : malePlaceholder
                    }
                    alt={`${user.user.firstName} ${user.user.lastName}`}
                  />
                  <div>
                    {user.user.firstName} {user.user.lastName}
                  </div>
                  {user.unreadCount != "0" && (
                    <div className="rounded-full bg-slate-300 dark:bg-red-600 w-6 text-center">
                      {user.unreadCount}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Right Panel (Chat Messages) */}
        <div className="w-[60%] h-[32rem] dark:bg-[#001B51] border dark:border-[#00387E] rounded-xl pl-3 pr-1 py-2 flex flex-col">
          {selectedUser2 && (
            <div className="flex items-center gap-4 border-b border-gray-200 dark:border-[#00387E] pb-3 mb-2">
              <img
                className="rounded-full h-10 w-10 object-cover"
                src={
                  selectedUser2?.photo?.path
                    ? selectedUser2.photo.path
                    : selectedUser2?.gender === "female"
                    ? femalePlaceholder
                    : malePlaceholder
                }
                alt="User"
              />
              <span className="font-semibold text-lg">
                {selectedUser2.firstName} {selectedUser2.lastName}
              </span>
            </div>
          )}
          {/* Chat messages */}
          <div
            ref={chatContainerRef}
            className="overflow-y-auto h-[30rem] flex flex-col gap-4 notificationScrollbar px-3"
          >
            {messages.length > 0 ? (
              [...messages].reverse().map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-xl max-w-[70%] ${
                    msg?.sender?.id === userDetails.userId
                      ? "self-end bg-blue-500 text-white" // Sent message
                      : "self-start bg-gray-200 text-black" // Received message
                  }`}
                >
                  {msg.content}
                  <br />
                  <small className="text-xs mt-1 opacity-75 flex justify-end">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </small>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center mt-5">
                {selectedUser2 ? "No messages yet." : "Please select a User."}
              </p>
            )}
          </div>

          {/* Message Input Box */}
          <div className="flex items-center mt-5">
            <input
              className="w-[90%] h-10 px-4 rounded-full dark:bg-[#000D38] text-white"
              placeholder="Type message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // Prevent newline if shift not pressed
                  console.log("Enter pressed: Submit action here");
                  // You can call your submit function here
                  handleSendMessage();
                }
              }}
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
