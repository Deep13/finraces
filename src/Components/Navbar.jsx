import { FaRegBell } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { BsMoon } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import logo from '../assets/icons/logofinraces.svg'
import globe from '../assets/icons/globe_icon.svg'
import searchIcon from '../assets/icons/search_icon.svg'
import support from '../assets/icons/support_icon.svg'
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import CreateRace from "./CreateRace";
// import { Switch } from "antd";
import darkLogo from '../assets/images/darklogo.png'
import { DarkModeContext } from "../Contexts/DarkModeProvider";
import PopupForm from "./PopupForm";
// import { GlobalContext } from "../Contexts";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import PopupSearch from "./PopupSearch";
import SimpleSwitch from "./Switch";
import avatarplaceholder from '../assets/images/avatarplaceholder.png'
import malePlaceholder from '../assets/images/manPlaceholder.jpg'
import femalePlaceholder from '../assets/images/womanPlaceholder.jpg'
import { getUser } from "../Utils/api";
import io from 'socket.io-client'

  
const Navbar = () => {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        let ud = localStorage.getItem('fin_userDetails');
        let userDetails = ud && JSON.parse(atob(ud));
        let { userId } = userDetails || {}; // Handle possible null values
        let token = localStorage.getItem("token");
    
        if (!userId || !token) {
        //   console.error("User ID or token is missing");
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
            
            setNotifications((prevNotifications) => [...prevNotifications, data]);
        //   console.log("Notification from server:", data);
        });
    
        // Cleanup socket connection on component unmount
        return () => {
          socket.disconnect();
        };
      }, []); // ✅ Empty dependency array means this runs only once when the component mounts
    
 
    const { darkModeEnabled, toggle, createRace, setCreateRace, showLoginForm, setShowLoginForm, profileImage, setReport } = useContext(DarkModeContext)
    const [dropdown, setDropdown] = useState(false)
    const [notificationToggle, setNotificationToggle] = useState(false)
    const [search, setSearch] = useState(false)
    const navigate = useNavigate();
    const [unseenNotifications,setUnseenNotifications] = useState([]);
    const token = localStorage.getItem('token')
    const userDetails = localStorage.getItem('fin_userDetails')
    const guestDetails = localStorage.getItem('guest_details')
    const [userDetailsObject, setUserDetailsObject] = useState(null)
    const dropdownRef = useRef(null)
    const notificationRef = useRef(null)
    const thisLocation = useLocation()


    useEffect(() => {
        let thisUserDetails = userDetails || guestDetails
        if (thisUserDetails) {
            console.log("user deatails", JSON.parse(atob(thisUserDetails)))
            setUserDetailsObject(JSON.parse(atob(thisUserDetails)))
        }

    }, [])

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (event.target.id === 'profileButton' || event.target.id === 'profileButtonP' || event.target.id === 'profileButtonD' || event.target.id === 'profileButtonI') {
                return
            }
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdown(false);
            }
        };

        if (dropdown) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [dropdown]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            event.stopPropagation()
            if (notificationToggle && !notificationRef.current.contains(event.target)) {
                setNotificationToggle(false);
            }
        };

        if (notificationToggle) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [notificationToggle])

    useEffect(() => {
        const unseen = notifications.filter(n => !n.notification.is_read); // No unnecessary 'if' statement
        setUnseenNotifications(unseen);
    }, [notifications]);

    // useEffect(()=>{
    //     console.log("useEffect running")
    //     const unseen=notifications.filter((n)=>{
    //         if(!n.notification.is_read)return true;
    //     })
    //     setUnseenNotifications(unseen)
    // },[notifications])
    
    return (
        <>
            {createRace && <CreateRace setCreateRace={setCreateRace} />}
            {showLoginForm && <PopupForm closePopup={setShowLoginForm} />}
            <AnimatePresence>
                {search && <PopupSearch setPopupSearch={setSearch} />}
            </AnimatePresence>
            <nav className='w-full px-[1.5rem] py-[0.8rem] bg-[#e5f4ff] dark:bg-[#002864] flex items-center justify-between sticky top-0 z-40'>
                <div className="flex items-center">
                    {/* <button onClick={() => setToggle(prev => !prev)} className='w-[2.9rem] h-[2.9rem] grid place-items-center rounded-[8px] mr-[106px]'>
                    <HiMenu size={24} color="black" />
                    </button> */}
                    <div onClick={() => navigate('/')} className="cursor-pointer">
                        {
                            darkModeEnabled ?
                                <img src={darkLogo} alt="Finraces logo" />
                                :
                                <img src={logo} alt="Finraces logo" />
                        }
                    </div>
                </div>
                <div className="flex gap-[12px] justify-start items-center">
                    <div className="flex gap-2 items-center">
                        <button title="Toggle Dark Mode" onClick={toggle} className='aspect-square h-[2.35rem] grid place-items-center rounded-[8px]'>
                            {
                                !darkModeEnabled ?
                                    <BsMoon color="black" size={18} /> :
                                    <BsSunFill color="white" size={18} />
                            }
                        </button>
                    </div>
                    <button onClick={() => setSearch(prev => !prev)} className='aspect-square h-[2.35rem] dark:bg-[#001a50] grid place-items-center rounded-[8px]'>
                        <img src={searchIcon} alt="Search" />
                    </button>
                    {
                        !userDetails &&
                        <button onClick={() => {
                            // navigate('/auth')
                            setShowLoginForm(true)
                        }} className="bg-[#e4eaf0] dark:bg-transparent dark:border dark:border-[#e4eaf0] dark:text-[#e4eaf0] px-[1.5rem] h-[2.35rem] text-[0.9rem] rounded-[8px] grid place-items-center text-black font-semibold">
                            Log in
                        </button>
                    }
                    <button onClick={() => {
                        // create Race
                        if (!token) {
                            setShowLoginForm(true)
                            // navigate('/auth')
                            return
                        }
                        setCreateRace(true)
                    }} className="darktext-[#e4eaf0] bg-[#e4eaf0] dark:text-white dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] pl-[1.5rem] pr-[0.8rem] h-[2.35rem] text-[0.7rem] md:text-[0.9rem] rounded-[8px] flex gap-2 items-center text-black font-semibold">
                        Create Race
                        <IoIosAdd size={20} />
                    </button>
                    {userDetails &&<button onClick={()=>{navigate('/chat')}} className='aspect-square dark:bg-[#001a50] h-[2.35rem] grid place-items-center rounded-[8px] dark:text-white'>
                        {/* <img src={support} alt="Search" /> */}
                        <IoChatboxEllipsesOutline size={28} />
                    </button>}
                    {userDetails && <div onClick={() => {
                        setNotificationToggle(prev => !prev)
                        // setDropdown(false)
                    }} role="button" className={`aspect-square ${notificationToggle && 'dark:bg-opacity-25'} dark:bg-[#001a50] h-[2.35rem] grid place-items-center rounded-[8px] relative cursor-pointer`}>
                        <FaRegBell color={darkModeEnabled ? 'white' : 'black'} size={18} />
                        {unseenNotifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-s font-bold px-2 rounded-full">
                                {unseenNotifications.length}
                            </span>
                        )}
                        <AnimatePresence>

                            {notificationToggle && <motion.div
                                ref={notificationRef}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className={`absolute top-14 -right-4 p-3 dark:bg-[#164286] shalxl dark:shadow-none bg-white w-[23.3rem] rounded-xl flex flex-col gap-3 items-center`}>
                                {/* place notifications here  */}
                                {unseenNotifications.slice(0, 5).map((notification)=>{
                                    return(
                                        <div key={notification.notification.id} className="w-full bg-slate-200 dark:bg-[#002763] py-2 px-4 rounded-lg">
                                            <p className="text-[1rem] font-medium dark:text-white">{notification.notification.message.split(": ")[1]}</p>
                                            <p className="text-[0.8rem] dark:text-white">{notification.notification.message.split(": ")[0]}</p>
                                        </div>
                                    )
                                })}
                                {/* <div className="w-full bg-slate-200 dark:bg-[#002763] py-2 px-4 rounded-lg">
                                    <p className="text-[1rem] font-medium dark:text-white">🎊 Congratulations 🏆</p>
                                    <p className="text-[0.8rem] dark:text-white">You have won the 'High Stakes Hustle' race! 🚀</p>
                                </div> */}
                                {unseenNotifications.length==0&&
                                    <div className="text-white font-semibold text-lg">No new notifications</div>
                                }
                                <button onClick={()=>{
                                    navigate('/notifications')
                                    setUnseenNotifications([])
                                    }} className="w-full bg-slate-300 dark:bg-[#002763] py-2 px-4 rounded-lg flex-shrink-0 font-semibold dark:text-white text-[0.7rem]">
                                    Show all
                                </button>
                               

                            </motion.div>}
                        </AnimatePresence>
                    </div>}
                    {/* <div onClick={() => {
                        let userDetails = localStorage.getItem('fin_userDetails')
                        if (!userDetails) {
                            // alert('first create a profile')
                            setShowForm(true)
                            return
                        }
                        navigate('/profile')
                    }} className='aspect-square dark:bg-[#001a50] h-[2.35rem] grid place-items-center rounded-[8px]'>
                        <img src={globe} alt="Search" />
                    </div> */}
                    {
                        userDetails && userDetailsObject && <div id="profileButton" onClick={(e) => {
                            // set dropdown
                            e.stopPropagation();
                            // console.log(e.target.id)
                            userDetails && setDropdown(prev => !prev)
                            guestDetails && setShowLoginForm(true)
                            setNotificationToggle(false)
                        }} className={`flex ${dropdown && 'dark:bg-blue-900 bg-slate-300'} justify-center items-center gap-2 relative p-2 px-4 rounded-lg cursor-pointer`}>
                            <p id="profileButtonP" className="dark:text-white">{userDetailsObject.userName}</p>
                            <div id="profileButtonD" className="bg-white w-9 h-9 rounded-full overflow-hidden">
                                <img id="profileButtonI" className="w-full h-full object-cover" src={profileImage || (userDetailsObject.gender && userDetailsObject.gender=='female'?femalePlaceholder:malePlaceholder)} alt="" />
                            </div>
                            <AnimatePresence>
                                {dropdown && <motion.div
                                    ref={dropdownRef}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    className={`absolute top-16 bg-white rounded-lg right-0 w-[130%] overflow-hidden shadow-2xl dark:bg-[#002864]`}>
                                    <button onClick={() => navigate('/profile')} className="w-full p-3 hover:bg-slate-200 transition-opacity duration-100 ease-linear text-start dark:text-white dark:hover:bg-opacity-20">Profile</button>
                                    <p onClick={() => navigate('/settings')} className="w-full p-3 hover:bg-slate-200 transition-opacity duration-100 ease-linear dark:text-white dark:hover:bg-opacity-20">Settings</p>
                                    <p onClick={() => setReport(true)} className="w-full p-3 hover:bg-slate-200 transition-opacity duration-100 ease-linear dark:text-white dark:hover:bg-opacity-20">Support</p>
                                    <p title="Log out button" onClick={() => {
                                        localStorage.removeItem('token')
                                        localStorage.removeItem('refreshToken')
                                        localStorage.removeItem('fin_userDetails')
                                        setUserDetailsObject(null);
                                        setUnseenNotifications([])
                                        window.dispatchEvent(new Event("storage")); // 🔄 Ensure other tabs update
                                        navigate('/')
                                    }} className="w-full p-3 dark:font-semibold hover:bg-red-500 hover:text-white transition-opacity duration-100 ease-linear dark:text-white">Log out</p>
                                </motion.div>}
                            </AnimatePresence>
                        </div>
                    }
                    {
                        guestDetails && userDetailsObject && <div id="profileButton" onClick={(e) => {
                            // set dropdown
                            e.stopPropagation();
                            // console.log(e.target.id)
                            setDropdown(prev => !prev)
                            // guestDetails && setShowLoginForm(true)
                            setNotificationToggle(false)
                        }} className={`flex ${dropdown && 'dark:bg-blue-900 bg-slate-300'} justify-center items-center gap-2 relative p-2 px-4 rounded-lg cursor-pointer`}>
                            <p id="profileButtonP" className="dark:text-white">{userDetailsObject.userName}</p>
                            <div id="profileButtonD" className="bg-white w-9 h-9 rounded-full overflow-hidden">
                                <img id="profileButtonI" className="w-full h-full object-cover" src={profileImage || (userDetailsObject.gender && userDetailsObject.gender=='female'?femalePlaceholder:malePlaceholder)} alt="" />
                            </div>
                            <AnimatePresence>
                                {dropdown && <motion.div
                                    ref={dropdownRef}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    className={`absolute top-16 bg-white rounded-lg right-0 w-[130%] overflow-hidden shadow-2xl dark:bg-[#002864]`}>
                                    {/* <button onClick={() => navigate('/profile')} className="w-full p-3 hover:bg-slate-200 transition-opacity duration-100 ease-linear text-start dark:text-white dark:hover:bg-opacity-20">Profile</button>
                                    <p onClick={() => navigate('/settings')} className="w-full p-3 hover:bg-slate-200 transition-opacity duration-100 ease-linear dark:text-white dark:hover:bg-opacity-20">Settings</p> */}
                                    <p onClick={() => setReport(true)} className="w-full p-3 hover:bg-slate-200 transition-opacity duration-100 ease-linear dark:text-white dark:hover:bg-opacity-20">Support</p>
                                    <p title="Log out button" onClick={() => {
                                        localStorage.removeItem('token')
                                        localStorage.removeItem('refreshToken')
                                        localStorage.removeItem('guest_details')
                                        setUserDetailsObject(null);
                                        setUnseenNotifications([])
                                        window.dispatchEvent(new Event("storage")); // 🔄 Ensure other tabs update
                                        navigate('/')
                                    }} className="w-full p-3 dark:font-semibold hover:bg-red-500 hover:text-white transition-opacity duration-100 ease-linear dark:text-white">Log out</p>
                                </motion.div>}
                            </AnimatePresence>
                        </div>
                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar