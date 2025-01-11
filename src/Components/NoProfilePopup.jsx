import React from 'react'
import { useNavigate } from 'react-router-dom'

const NoProfilePopup = ({
    message = 'You dont have a profile',
    setPopupVisible
}) => {
    const navigate = useNavigate()
    return (
        <div className='fixed w-full h-screen top-0 left-0 z-[100] bg-black bg-opacity-50 grid place-items-center'>
            <div className='py-8 px-6 rounded-lg h-[10rem] bg-white shadow-xl relative grid place-items-center w-[20rem] dark:bg-[#002763]'>
                <p className='w-full text-center font-bold text-xl dark:text-white mb-4'>{message}</p>
                <button onClick={() => {
                    navigate(-1)
                    setPopupVisible(false)
                }} className='hover:underline text-[rgba(225,225,225,0.6)] cursor-pointer'>back</button>
            </div>
        </div>
    )
}

export default NoProfilePopup