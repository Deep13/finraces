import React, { useContext } from 'react'
import { DarkModeContext } from '../Contexts/DarkModeProvider'
import Person from '../assets/images/person2.png'
import userplus from '../assets/images/userplus.svg'
import { useNavigate } from 'react-router-dom'

const AddFriendCard = ({
    id = 8745,
    userName = 'Burt Macklin',
    email = 'burt.macklin@gmail.com',
    image = Person
}) => {
    const { darkModeEnabled } = useContext(DarkModeContext)
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/userprofile/${id}`, {
            state: {
                userName,
                email,
                image
            }
        })} className='p-[10px] rounded-[20px] h-[4.2rem] w-[17.2rem] justify-between bg-slate-200 dark:bg-[#002763] flex shadow-lg dark:shadow-none items-center gap-[20px] cursor-pointer'>
            <div className="flex gap-3">
                <div className='h-full w-12 rounded-xl overflow-hidden'>
                    <img className='w-full h-full object-cover' src={Person} alt="" />
                </div>
                <div className='flex flex-col justify-between'>
                    <p className='text-[0.9rem] font-semibold dark:text-white'>Burt Macklin</p>
                    <p className='text-[0.9rem] font-semibold dark:text-white'>Ambassador</p>
                </div>
            </div>
        </div>
    )
}

export default AddFriendCard