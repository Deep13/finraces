import { useState,useEffect } from 'react';
import Sidebar from '../Components/Sidebar'
import { MdArrowBackIos } from "react-icons/md";
import io from 'socket.io-client'
import { updateNotification } from '../Utils/api';

const Notification = () => {
    const [activeTab,setActiveTab]=useState("All")
    const notifications = [
        { id: 1, title: '🎉 Congratulations! 🏆', message: 'You\'ve won the "High Stakes Hustle" race! 🚀', category: 'Races' },
        { id: 2, title: '📩 New Message Received!', message: 'User: "Hey, congrats on your recent win! Let\'s team up for the next race?"', category: 'Requests' },
        { id: 3, title: '📈 Achievement Unlocked!', message: 'The tech sector is on fire! Stocks are up by 15% today. Time to act fast! 🚀', category: 'Invites' },
        { id: 4, title: '🌟 Level Up!', message: 'You\'ve reached Level 10 🎉', category: 'Races' },
      ];

      const [notifications2, setNotifications] = useState([]);
      const [notificationIds,setNotificationIds] = useState([]);
    useEffect(() => {
        let ud = localStorage.getItem("userDetails");
        let userDetails = ud && JSON.parse(atob(ud));
        let { userId } = userDetails || {}; // Handle possible null values
        let token = localStorage.getItem("token");
    
        if (!userId || !token) {
          console.error("User ID or token is missing");
          return; // Stop execution if userId or token is missing
        }
    
        const socket = io("https://www.missionatal.com", {
          auth: {
            token: token,
          },
          query: { userId },
          reconnection: true,
          reconnectionAttempts: Infinity,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          transports: ["websocket"],
        });

        socket.on("connect", () => {
            console.log("✅ Connected to WebSocket Server");
          });
        
          socket.on("connect_error", (err) => {
            console.error("❌ Connection Error:", err);
          });
        
          socket.on("disconnect", (reason) => {
            console.warn("⚠️ Disconnected from server:", reason);
            setNotifications([]);
          });
    
        socket.on("notifications", (data) => {
            console.log("Here")
            if(!data.notification.is_read){
              setNotificationIds((prev)=>[...prev,data.notification.id])
            }
            setNotifications((prevNotifications) => [...prevNotifications, data]);
          console.log("Notification from server:", data);
        });
    
        // Cleanup socket connection on component unmount
        return () => {
          socket.disconnect();
        };
      }, []); // ✅ Empty dependency array means this runs only once when the component mounts
    
      useEffect(() => {
        console.log("Updated notifications:", notifications2);
      }, [notifications2]); // ✅ Log state changes correctly
    
      useEffect(()=>{
        console.log(notificationIds)
       updateNotification(notificationIds,
        (data)=>{console.log(data)},
        (error)=>{console.log(error)}
       )
      },[notificationIds])
  
  return (
    <div className='w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]'>
    {/* Ensure sidebar is inside a container with sufficient height */}
        <Sidebar />
        
        <div className='dark:bg-[#000D38] h-[45rem] py-5 md:px-10 mx-[1rem] md:mx-[7rem] flex-1 rounded-xl border dark:border-[#00387E]  dark:text-white'>
            <span className='font-semibold text-[1.5rem] font-poppins flex flex-row items-center'>
                <MdArrowBackIos/>
                All notifications
            </span>
            <div className='flex mt-7 flex-col md:flex-row'>
                <div className='  w-auto md:w-[14%]  flex flex-row md:flex-col overflow-x-auto md:overflow-visible'>
                    {['All', 'Races', 'Requests', 'Invites'].map((category) => (
                        <button onClick={() => setActiveTab(category)} key={category} className={`w-full h-[2.7rem] mr-3 dark:bg-[#001a50] border dark:border-[#00387E]  dark:text-white rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[1rem] flex flex-col justify-center pl-2 md:pl-5 font-poppins mb-2 ${category==activeTab?'dark:bg-[#002763]':'dark:bg-[#001a50]'}`}>
                            {category}
                        </button>
                    ))}
                </div>
                <div className='w-[86%] h-[38rem] dark:bg-[#001B51] border dark:border-[#00387E] rounded-xl flex flex-col gap-2 ml-5 px-5 py-2 overflow-y-auto notificationScrollbar'>
                    {notifications2?.map((notification)=>(
                        <div key={notification.notification.id} className="w-full bg-slate-200 dark:bg-[#002763] py-2 px-4 rounded-lg">
                        <p className="text-[1rem] font-medium dark:text-white">{notification.notification.message.split(": ")[1]}</p>
                        <p className="text-[0.8rem] dark:text-white">{notification.notification.message.split(": ")[0]}</p>
                    </div>

                    ))}
                    {/* {notifications.map((notification)=>(
                        <div key={notification.id} className=' w-60%  bg-slate-200 rounded-xl px-[1.5rem] py-[0.5rem] flex flex-col gap-[0.75rem] dark:bg-[#002763] border dark:border-[#00387E] mt-3'>
                            <h3 className="font-semibold text-">{notification.title}</h3>
                            <p className="text-sm text-gray-400 ">{notification.message}</p>
                        </div>

                    ))} */}
                    {/* <div className=' w-60%  bg-white rounded-xl px-[1.5rem] py-[0.5rem] flex flex-col gap-[0.75rem] dark:bg-[#002763] dark:border dark:border-[#00387E] mb-3'>
                        <h3 className="font-semibold text-lg">🎉 Congratulations! 🏆</h3>
                        <p className="text-sm text-gray-400 mt-1">You\'ve won the "High Stakes Hustle" race! 🚀</p>
                    </div>
                    <div className=' w-60%  bg-white rounded-xl px-[1.5rem] py-[0.5rem] flex flex-col gap-[0.75rem] dark:bg-[#002763] dark:border dark:border-[#00387E]'>
                        <h3 className="font-semibold text-lg">🎉 Congratulations! 🏆</h3>
                        <p className="text-sm text-gray-400 mt-1">You\'ve won the "High Stakes Hustle" race! 🚀</p>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Notification