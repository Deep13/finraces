import React, { useContext } from 'react'
import { DarkModeContext } from '../Contexts/DarkModeProvider'
import Person from '../assets/images/person2.png'
import userplus from '../assets/images/userplus.svg'

const AddFriendCard = () => {
    const { darkModeEnabled } = useContext(DarkModeContext)
    return (
        <div className='p-[10px] rounded-[20px] h-[4.2rem] w-[17.2rem] justify-between bg-[#002763] flex shadow-lg dark:shadow-none items-center gap-[20px]'>
            <div className="flex gap-3">
                <div className='h-full w-12 rounded-xl overflow-hidden'>
                    <img className='w-full h-full object-cover' src={Person} alt="" />
                </div>
                <div className='flex flex-col justify-between'>
                    <p className='text-[0.9rem] font-semibold dark:text-white'>Burt Macklin</p>
                    <p className='text-[0.9rem] font-semibold dark:text-white'>Ambassador</p>
                </div>
            </div>
            <div>
                <img src={userplus} alt="" />
            </div>
        </div>
    )
}

export default AddFriendCard