import React from 'react'
import avatar from '../assets/images/avatar.png'
import person2 from '../assets/images/person2.png'
import dollar from '../assets/images/dollar.png'

const ProfileCardHomepage = ({
    isFirst = false,
}) => {

    // cards must be designed in pixels
    return (
        <div className='h-[332px] bg-white rounded-[18px] px-[13px] py-[0.5rem] flex flex-col'>

            {/* div for profile username and avatar */}
            <div className='w-full flex gap-[8px] justify-start items-center mb-[10px]'>
                <div className='w-[31px] h-[31px]'>
                    <img className='w-full h-full object-cover' src={avatar} alt="avatar image" />
                </div>
                <p>@Aslace</p>
            </div>
            <div className='w-full flex-1 overflow-hidden rounded-[10px] mb-[4px]'>
                <img className='w-full h-full object-cover' src={person2} alt="a seedha saadha person" />
            </div>
            <div className='w-full flex justify-between'>
                <div className='flex-1 h-full'>
                    <p className={`${isFirst ? 'text-[#ff0000]' : 'text-black'} text-[12px] font-normal`}>Hippi Monster <span className='text-[15px] font-bold'>#1</span></p>
                    <div className='flex justify-start items-center'>
                        <img src={dollar} alt="dollar icon" />
                        <p className='text-[16px] font-bold text-[#bdbdbd]'>40,25425</p>
                    </div>
                </div>
                <div className='flex-1 h-full flex justify-center items-center'>
                    <button className={`${isFirst ? 'text-[#ff0000]' : 'text-black'} rounded-[33px] w-[96px] flex justify-center items-center text-[14px] py-[7.5px] font-medium shadow-lg profile_card_button_grad`}>View Profile</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileCardHomepage