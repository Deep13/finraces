import { BsSunFill } from "react-icons/bs";
import { BsMoon } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import logo from '../assets/icons/logofinraces.svg'
import globe from '../assets/icons/globe_icon.svg'
import search from '../assets/icons/search_icon.svg'
import support from '../assets/icons/support_icon.svg'
import CreateRace from "./CreateRace";
// import { Switch } from "antd";
import darkLogo from '../assets/images/darklogo.png'
import { DarkModeContext } from "../Contexts/DarkModeProvider";
import PopupForm from "./PopupForm";
// import { GlobalContext } from "../Contexts";
import { useLocation } from "react-router-dom";

const Navbar = () => {

    const { darkModeEnabled, toggle } = useContext(DarkModeContext)
    const [createRaceState, setCreateRaceState] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [darkMode, setDarkMode] = useState(darkModeEnabled)
    // const { setCreateRaceState } = useContext(GlobalContext)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const userDetails = localStorage.getItem('userDetails')
    const thisLocation = useLocation()


    return (
        <>
            {createRaceState && <CreateRace setCreateRace={setCreateRaceState} />}
            {showForm && <PopupForm closePopup={setShowForm} />}
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
                        {/* <Switch
                            checked={darkMode}
                            onChange={setDarkMode}
                            onClick={toggle}
                            className="group relative flex w-11 h-[1.4rem] cursor-pointer rounded-full bg-white/10 p-0 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10 items-center bg-blue-200"
                        >
                            <span aria-hidden="true" className="pointer-events-none relative top-2 inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7 m-auto" />
                        </Switch> */}
                        <button onClick={toggle} className='aspect-square h-[2.35rem] grid place-items-center rounded-[8px]'>
                            {
                                darkModeEnabled ?
                                    <BsMoon color="white" size={18} /> :
                                    <BsSunFill size={18} />
                            }
                        </button>
                    </div>
                    <button className='aspect-square h-[2.35rem] dark:bg-[#001a50] grid place-items-center rounded-[8px]'>
                        <img src={search} alt="Search" />
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
                    <button onClick={() => {
                        let userDetails = localStorage.getItem('userDetails')
                        if (!userDetails) {
                            // alert('first create a profile')
                            setShowForm(true)
                            return
                        }
                        navigate('/profile')
                    }} className='aspect-square dark:bg-[#001a50] h-[2.35rem] grid place-items-center rounded-[8px]'>
                        <img src={globe} alt="Search" />
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Navbar