import { IoIosAdd } from "react-icons/io"; 
import { HiMenu } from "react-icons/hi";
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import logo from '../assets/icons/logofinraces.svg'
import globe from '../assets/icons/globe_icon.svg'
import search from '../assets/icons/search_icon.svg'
import support from '../assets/icons/support_icon.svg'
import compass from '../assets/icons/sidebar/compass.svg'
import finance_idea from '../assets/icons/sidebar/finance_idea.svg'
import stats from '../assets/icons/sidebar/stats.svg'
import live_streaming from '../assets/icons/sidebar/live_streaming.svg'
import forward from '../assets/icons/sidebar/forward.svg'
import eth from '../assets/icons/sidebar/eth.svg'
import recent from '../assets/icons/sidebar/recent.svg'

const Navbar = () => {

    const [toggle, setToggle] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    return (
        <>
            <nav className='w-full px-[1.5rem] py-[0.8rem] bg-[#e5f4ff] flex items-center justify-between sticky top-0 z-[10]'>
                <div className="flex items-center">
                    {/* <button onClick={() => setToggle(prev => !prev)} className='w-[2.9rem] h-[2.9rem] grid place-items-center rounded-[8px] mr-[106px]'>
                        <HiMenu size={24} color="black" />
                    </button> */}
                    <div>
                        <img src={logo} alt="Finraces logo" />
                    </div>
                </div>
                <div className="flex gap-[12px] justify-start items-center">
                    <button className='aspect-square h-[2.35rem] grid place-items-center bg-white rounded-[8px]'>
                        <img src={search} alt="Search" />
                    </button>
                    {
                    !token ?
                    <button onClick={() => navigate('/auth')} className="bg-[#e4eaf0] px-[1.5rem] h-[2.35rem] text-[0.9rem] rounded-[8px] grid place-items-center text-black font-semibold">
                        Log in / Sign up
                    </button> : 
                    <>
                    <button onClick={() =>{
                        localStorage.removeItem('token')
                        navigate('/auth')
                    }} className="bg-[#e4eaf0] px-[1.5rem] h-[2.35rem] text-[0.9rem] rounded-[8px] grid place-items-center text-black font-semibold">
                        Log out
                    </button>
                    <button onClick={() => {
                        // create Race
                    }} className="bg-[#e4eaf0] pl-[1.5rem] pr-[0.8rem] h-[2.35rem] text-[0.9rem] rounded-[8px] flex gap-2 items-center text-black font-semibold">
                        Create Race
                        <IoIosAdd size={20}/>
                    </button>
                    </>
                    }
                    <button className='aspect-square h-[2.35rem] grid place-items-center bg-white rounded-[8px]'>
                        <img src={support} alt="Search" />
                    </button>
                    <button className='aspect-square h-[2.35rem] grid place-items-center bg-white rounded-[8px]'>
                        <img src={globe} alt="Search" />
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Navbar