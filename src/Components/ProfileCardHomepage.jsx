import React, { useEffect, useState } from 'react'
import avatar from '../assets/images/avatar.png'
import person2 from '../assets/images/person2.png'
import dollar from '../assets/images/dollar.png'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { getUserDetails } from '../Utils/api'

const ProfileCardHomepage = ({
    isFirst = false,
    // userName = 'Alysees',
    image = person2,
    fullName = 'Duke Wriothesley',
    rank = 1,
    points = 0,
    index,
    id = 123564,
    email = "duke@email.com",
    activeTab,
}) => {
    const navigate = useNavigate()
    const [YourDetails, setYourDetails] = useState(null)


    const cardAnimation = { // this is a variant
        hidden: { scale: 0, opacity: 0 },
        visible: (i) => ({
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
                delay: i * 0.1
            }
        })
    };


    useEffect(() => {
        getUserDetails((data) => {
            setYourDetails(data)
        })
    }, [])
    // cards must be designed in pixels
    return (
        <motion.div
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardAnimation}
            key={`${index}-${activeTab}`}
            className='h-[332px] bg-white rounded-[18px] px-[13px] py-[0.5rem] flex flex-col dark:bg-[#002763]'>

            {/* div for profile username and avatar */}
            <div className='w-full flex gap-[8px] justify-start items-center mb-[10px]'>
                {/* <div className='w-[31px] h-[31px]'>
                    <img className='w-full h-full object-cover' src={avatar} alt="avatar image" />
                </div> */}
                {YourDetails?.id !== id && <p className='dark:text-white font-semibold flex gap-2'> <span className='text-[1rem] font-bold'>#{rank}</span> {fullName}</p>}
                {YourDetails?.id === id && <p className='dark:text-yellow-400 font-bold text-xl flex gap-2'> <span className='text-[1.2rem] dark:text-yellow-400 font-bold'>#{rank}</span>You</p>}
            </div>
            <div className='w-full flex-1 overflow-hidden rounded-[10px] mb-[4px]'>
                <img className='w-full h-full object-cover' src={image} alt="a seedha saadha person" />
            </div>
            <div className='w-full flex justify-between py-2'>
                <div className='flex-1 h-full'>
                    {/* <p className={`${isFirst ? 'text-[#ff0000]' : 'text-black'} text-[12px] font-normal dark:text-white`}>{fullName}</p> */}
                    <div className='flex justify-start items-center'>
                        <img src={dollar} alt="dollar icon" />
                        <p className='text-[16px] font-bold text-[#bdbdbd]'>{points}</p>
                    </div>
                </div>
                <div className='flex-1 h-full flex justify-end items-center'>
                    <button onClick={() => navigate(`/userprofile/${id}`, {
                        state: {
                            // isFirst,
                            // userName,
                            image,
                            userName: fullName,
                            rank,
                            points,
                            id, // this is mandatory
                            // email,
                        }
                    })} className={`${isFirst ? 'text-[#ff0000]' : 'text-white'} rounded-[33px] w-[96px] flex justify-center items-center text-[14px] py-[7.5px] font-medium shadow-lg profile_card_button_grad`}>View Profile</button>
                </div>
            </div>
        </motion.div>
    )
}

export default ProfileCardHomepage