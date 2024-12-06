import React from 'react'
import Person from '../assets/images/person2.png'

const SearchUserCard = () => {
    return (
        <div className='p-[10px] rounded-[20px] w-[11.6rem] bg-[#002763] flex gap-5 shadow-lg dark:shadow-none'>
            <div className='h-full w-10 rounded-xl overflow-hidden'>
                <img className='w-full h-full object-cover' src={Person} alt="" />
            </div>
            <div className='flex flex-col justify-between'>
                <p className='text-[0.9rem] font-semibold dark:text-white'>Burt Macklin</p>
                <p className='text-[0.9rem] font-semibold dark:text-white'>Ambassador</p>
            </div>
        </div>
    )
}

export default SearchUserCard