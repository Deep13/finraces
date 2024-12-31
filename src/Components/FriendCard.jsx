import { HiOutlineChevronDown } from "react-icons/hi";
import React, { useContext } from 'react'
import Person from '../assets/images/person2.png'
import { DarkModeContext } from "../Contexts/DarkModeProvider";
import { useNavigate } from "react-router-dom";

const FriendCard = ({
    name = 'Burt Macklin',
    id = 87451,
    role,
    image = Person,
    email = 'burt.macklin@gmail.com'
}) => {

    const { darkModeEnabled } = useContext(DarkModeContext)
    const navigate = useNavigate()
    let userId = JSON.parse(atob(localStorage.getItem('userDetails'))).userId

    return (
        <div onClick={() => {
            if (id === userId) {
                navigate(`/profile`)
                return
            }

            navigate(`/userprofile/${id}`, {
                state: {
                    userName: name,
                    email,
                    image
                }
            })
        }} className='p-[10px] cursor-pointer rounded-[20px] h-[4.2rem] justify-between w-[17rem] bg-slate-200 dark:bg-[#002763] flex shadow-lg dark:shadow-none items-center gap-[20px]'>
            <div className="flex gap-3">
                <div className='h-full w-12 rounded-xl overflow-hidden'>
                    <img className='w-full h-full object-cover' src={image} alt="" />
                </div>
                <div className='flex flex-col justify-between'>
                    <p className='text-[0.9rem] font-semibold dark:text-white'>{name}</p>
                    <p className='text-[0.9rem] font-semibold dark:text-white'>{role}</p>
                </div>
            </div>
            {/* <HiOutlineChevronDown size={24} color={darkModeEnabled ? 'white' : 'black'} /> */}
        </div>
    )
}

export default FriendCard