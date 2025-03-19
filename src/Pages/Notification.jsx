import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { MdArrowBackIos } from "react-icons/md";
import io from "socket.io-client";
import { updateNotification } from "../Utils/api";

import allNotification from "../assets/images/allNotifications.png"
import raceNotification from "../assets/images/racing-flag.png"
import requestNotification from "../assets/images/request.png"
import inviteNotification from "../assets/images/invite.png"

const Notification = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [notifications, setNotifications] = useState([]); // Stores all notifications
  const [filteredNotifications, setFilteredNotifications] = useState([]); // Stores filtered notifications
  const [notificationIds, setNotificationIds] = useState([]);

  useEffect(() => {
    let ud = localStorage.getItem('fin_userDetails');
    let userDetails = ud && JSON.parse(atob(ud));
    let { userId } = userDetails || {}; // Handle possible null values
    let token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error("User ID or token is missing");
      return;
    }

    const socket = io("https://www.missionatal.com", {
      auth: { token },
      query: { userId },
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      transports: ["websocket"],
    });

    socket.on("connect", () => console.log("✅ Connected to WebSocket Server"));
    socket.on("connect_error", (err) => console.error("❌ Connection Error:", err));
    socket.on("disconnect", (reason) => {
      console.warn("⚠️ Disconnected from server:", reason);
      setNotifications([]);
      setFilteredNotifications([]);
    });

    socket.on("notifications", (data) => {
      if (!data.notification.is_read) {
        setNotificationIds((prev) => [...prev, data.notification.id]);
      }
      setNotifications((prev) => [...prev, data]);
    });

    return () => socket.disconnect();
  }, []);

  // Update notifications when a new one arrives
  useEffect(() => {
    filterNotifications(activeTab);
  }, [notifications, activeTab]);

  // API Call to Mark Notifications as Read
  useEffect(() => {
    if (notificationIds.length > 0) {
      updateNotification(
        notificationIds,
        (data) => console.log("Notification updated:", data),
        (error) => console.error("Error updating notifications:", error)
      );
    }
  }, [notificationIds]);

  // Function to filter notifications based on category
  const filterNotifications = (category) => {
    if (category === "All") {
      setFilteredNotifications(notifications);
    } else {
      console.log(category.toLowerCase())
      const filtered = notifications.filter((notification) =>
        notification?.type.split('-')[0] === category.toLowerCase()
      );
      setFilteredNotifications(filtered);
    }
  };

  return (
    <div className="w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]">
      <Sidebar />
      <div className="dark:bg-[#000D38] h-[45rem] py-5 md:px-10 mx-[1rem] md:mx-[7rem] flex-1 rounded-xl border dark:border-[#00387E] dark:text-white">
        <span className="font-semibold text-[1.5rem] font-poppins flex flex-row items-center">
          <MdArrowBackIos />
          All notifications
        </span>

        {/* Category Tabs */}
        <div className="flex mt-7 flex-col md:flex-row">
          <div className="w-auto md:w-[14%] flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-visible">
          <button
      onClick={() => setActiveTab("All")}
      className={`w-full flex items-center justify-center text-xl gap-2 h-[2.7rem] px-3 rounded-[10px] border text-[1rem] font-poppins transition-all duration-200 
        dark:border-[#00387E] dark:text-white bg-[#e5f4ff] dark:bg-[#001a50] ${
          activeTab === "All" ? "dark:bg-[#002763]" : ""
        }`}
    >
      <img src={allNotification} alt="All Notifications" className="w-8 h-8" />
      <span>All</span>
    </button>

    {/* Race Notifications Button */}
    <button
      onClick={() => setActiveTab("Race")}
      className={`w-full flex items-center justify-center text-xl gap-2 h-[2.7rem] px-3 rounded-[10px] border text-[1rem] font-poppins transition-all duration-200 
        dark:border-[#00387E] dark:text-white bg-[#e5f4ff] dark:bg-[#001a50] ${
          activeTab === "Race" ? "dark:bg-[#002763]" : ""
        }`}
    >
      <img src={raceNotification} alt="Race Notifications" className="w-8 h-8" />
      <span>Races</span>
    </button>

    {/* Request Notifications Button */}
    <button
      onClick={() => setActiveTab("Request")}
      className={`w-full flex items-center justify-center text-xl gap-2 h-[2.7rem] px-3 rounded-[10px] border text-[1rem] font-poppins transition-all duration-200 
        dark:border-[#00387E] dark:text-white bg-[#e5f4ff] dark:bg-[#001a50] ${
          activeTab === "Request" ? "dark:bg-[#002763]" : ""
        }`}
    >
      <img src={requestNotification} alt="Request Notifications" className="w-8 h-8" />
      <span>Requests</span>
    </button>

    {/* Invite Notifications Button */}
    <button
      onClick={() => setActiveTab("Invite")}
      className={`w-full flex items-center justify-center text-xl gap-2 h-[2.7rem] px-3 rounded-[10px] border text-[1rem] font-poppins transition-all duration-200 
        dark:border-[#00387E] dark:text-white bg-[#e5f4ff] dark:bg-[#001a50] ${
          activeTab === "Invite" ? "dark:bg-[#002763]" : ""
        }`}
    >
      <img src={inviteNotification} alt="Invite Notifications" className="w-8 h-8" />
      <span>Invites</span>
    </button>
          </div>

          {/* Notification List */}
          <div className="w-[86%] h-[38rem] dark:bg-[#001B51] border dark:border-[#00387E] rounded-xl flex flex-col gap-2 ml-5 px-5 py-2 overflow-y-auto notificationScrollbar">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.notification.id}
                  className="w-full bg-slate-200 dark:bg-[#002763] py-2 px-4 rounded-lg"
                >
                  <p className="text-[1rem] font-medium dark:text-white">
                    {notification.notification.message.split(": ")[1]}
                  </p>
                  <p className="text-[0.8rem] dark:text-white">
                    {notification.notification.message.split(": ")[0]}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 dark:text-gray-500">No notifications</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
