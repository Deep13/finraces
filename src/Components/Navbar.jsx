import { FaRegBell } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { BsMoon } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import logo from '../assets/icons/logofinraces.svg'
import globe from '../assets/icons/globe_icon.svg'
import searchIcon from '../assets/icons/search_icon.svg'
import support from '../assets/icons/support_icon.svg'
import CreateRace from "./CreateRace";
// import { Switch } from "antd";
import darkLogo from '../assets/images/darklogo.png'
import { DarkModeContext } from "../Contexts/DarkModeProvider";
import PopupForm from "./PopupForm";
// import { GlobalContext } from "../Contexts";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import PopupSearch from "./PopupSearch";

const Navbar = () => {

    const { darkModeEnabled, toggle } = useContext(DarkModeContext)
    const [createRaceState, setCreateRaceState] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [darkMode, setDarkMode] = useState(darkModeEnabled)
    // const { setCreateRaceState } = useContext(GlobalContext)
    const [dropdown, setDropdown] = useState(false)
    const [notificationToggle, setNotificationToggle] = useState(false)
    const [search, setSearch] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const userDetails = localStorage.getItem('userDetails')
    const [userDetailsObject, setUserDetailsObject] = useState({})
    const thisLocation = useLocation()


    useEffect(() => {
        // let userDetails = localStorage.getItem('userDetails')
        console.log("user deatails", atob(userDetails))
        setUserDetailsObject(JSON.parse(atob(userDetails)))
    }, [])


    return (
        <>
            {createRaceState && <CreateRace setCreateRace={setCreateRaceState} />}
            {showForm && <PopupForm closePopup={setShowForm} />}
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
                        <button onClick={toggle} className='aspect-square h-[2.35rem] grid place-items-center rounded-[8px]'>
                            {
                                darkModeEnabled ?
                                    <BsMoon color="white" size={18} /> :
                                    <BsSunFill size={18} />
                            }
                        </button>
                    </div>
                    <button onClick={() => setSearch(prev => !prev)} className='aspect-square h-[2.35rem] dark:bg-[#001a50] grid place-items-center rounded-[8px]'>
                        <img src={searchIcon} alt="Search" />
                    </button>
                    {
                        !userDetails ?
                            <button onClick={() => {
                                // navigate('/auth')
                                setShowForm(true)
                            }} className="bg-[#e4eaf0] dark:bg-transparent dark:border dark:border-[#e4eaf0] dark:text-[#e4eaf0] px-[1.5rem] h-[2.35rem] text-[0.9rem] rounded-[8px] grid place-items-center text-black font-semibold">
                                Log in / Sign up
                            </button> :
                            <>
                                <button onClick={() => {
                                    localStorage.removeItem('token')
                                    localStorage.removeItem('refreshToken')
                                    localStorage.removeItem('userDetails')
                                    navigate('/auth')
                                }} className="bg-[#e4eaf0] dark:bg-transparent dark:border dark:border-[#e4eaf0] dark:text-[#e4eaf0] px-[1.5rem] h-[2.35rem] text-[0.9rem] rounded-[8px] grid place-items-center text-black font-semibold">
                                    Log out
                                </button>
                            </>
                    }
                    <button onClick={() => {
                        // create Race
                        if (!token) {
                            setShowForm(true)
                            // navigate('/auth')
                            return
                        }
                        setCreateRaceState(true)
                    }} className="darktext-[#e4eaf0] bg-[#e4eaf0] dark:text-white dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] pl-[1.5rem] pr-[0.8rem] h-[2.35rem] text-[0.9rem] rounded-[8px] flex gap-2 items-center text-black font-semibold">
                        Create Race
                        <IoIosAdd size={20} />
                    </button>
                    <button className='aspect-square dark:bg-[#001a50] h-[2.35rem] grid place-items-center rounded-[8px]'>
                        <img src={support} alt="Search" />
                    </button>
                    <div onClick={() => setNotificationToggle(prev => !prev)} role="button" className={`aspect-square ${notificationToggle && 'dark:bg-opacity-25'} dark:bg-[#001a50] h-[2.35rem] grid place-items-center rounded-[8px] relative cursor-pointer`}>
                        <FaRegBell color={darkModeEnabled ? 'white' : 'black'} size={18} />
                        <AnimatePresence>

                            {notificationToggle && <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className={`absolute top-14 -right-8 p-3 dark:bg-[#164286] shalxl dark:shadow-none bg-white w-[23.3rem] rounded-xl flex flex-col gap-3 items-center`}>
                                {/* place notifications here  */}
                                <div className="w-full bg-slate-200 dark:bg-[#002763] py-2 px-4 rounded-lg">
                                    <p className="text-[1rem] font-medium dark:text-white">🎊 Congratulations 🏆</p>
                                    <p className="text-[0.8rem] dark:text-white">You have won the 'High Stakes Hustle' race! 🚀</p>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-[#002763] py-2 px-4 rounded-lg">
                                    <p className="text-[1rem] font-medium dark:text-white">📩 New Message Received!</p>
                                    <p className="text-[0.8rem] dark:text-white">User : "Hey, congrats on your recent win! Let’s team up for the next race?"</p>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-[#002763] py-2 px-4 rounded-lg">
                                    <p className="text-[1rem] font-medium dark:text-white">🎯 Achievement Unlocked!</p>
                                    <p className="text-[0.8rem] dark:text-white">The tech sector is on fire! Stocks are up by 15% today. Time to act fast! 🚀</p>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-[#002763] py-2 px-4 rounded-lg">
                                    <p className="text-[1rem] font-medium dark:text-white">🌟 Level Up!</p>
                                    <p className="text-[0.8rem] dark:text-white">You’ve reached Level 10  🎮💡</p>
                                </div>
                                <button className="w-full bg-slate-300 dark:bg-[#002763] py-2 px-4 rounded-lg flex-shrink-0 font-semibold dark:text-white text-[0.7rem]">
                                    Show all
                                </button>
                            </motion.div>}
                        </AnimatePresence>
                    </div>
                    <div onClick={() => {
                        let userDetails = localStorage.getItem('userDetails')
                        if (!userDetails) {
                            // alert('first create a profile')
                            setShowForm(true)
                            return
                        }
                        navigate('/profile')
                    }} className='aspect-square dark:bg-[#001a50] h-[2.35rem] grid place-items-center rounded-[8px]'>
                        <img src={globe} alt="Search" />
                    </div>
                    <div onClick={() => {
                        // set dropdown
                        setDropdown(prev => !prev)
                    }} className={`flex ${dropdown && 'dark:bg-blue-900 bg-slate-300'} justify-center items-center gap-2 relative p-2 px-4 rounded-lg cursor-pointer`}>
                        <p className="dark:text-white">{userDetailsObject.userName}</p>
                        <div className="bg-white w-9 h-9 rounded-full overflow-hidden">
                            <img className="w-full h-full object-cover" src={userDetailsObject?.photo?.path} alt="" />
                        </div>
                        <AnimatePresence>
                            {dropdown && <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className={`absolute top-16 bg-white rounded-lg right-0 w-[130%] overflow-hidden shadow-2xl dark:bg-[#002864]`}>
                                <button onClick={() => navigate('/profile')} className="w-full p-3 hover:bg-slate-200 transition-opacity duration-100 ease-linear text-start dark:text-white dark:hover:bg-opacity-20">Profile</button>
                                <p className="w-full p-3 hover:bg-slate-200 transition-opacity duration-100 ease-linear dark:text-white dark:hover:bg-opacity-20">Settings</p>
                                <p className="w-full p-3 dark:font-semibold hover:bg-red-500 hover:text-white transition-opacity duration-100 ease-linear dark:text-white">Log out</p>
                            </motion.div>}
                        </AnimatePresence>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar