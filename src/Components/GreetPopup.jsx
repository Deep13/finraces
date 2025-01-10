import React, { useEffect, useState } from 'react'
import { joinAsGuest } from '../Utils/api'
import { useLocation, useNavigate } from 'react-router-dom'

const GreetPopup = ({
    setPopupVisible
}) => {

    const [guestInfo, setGuestInfo] = useState({})
    const [inputValue, setInputValue] = useState('')
    const thisLocation = useLocation()
    const navigate = useNavigate()


    useEffect(() => {
        let guestDetails = localStorage.getItem('guest_details')
        let guestdetail = guestDetails && JSON.parse(atob(guestDetails))
        if (guestdetail && guestDetails) {
            setGuestInfo(guestdetail)
        }
    }, [])

    return (
        <div className='fixed w-full h-screen top-0 left-0 z-[100] bg-black bg-opacity-50 grid place-items-center'>
            <div className='py-8 px-6 rounded-lg bg-white shadow-xl relative grid place-items-center w-[20rem] dark:bg-[#002763]'>
                <div className='w-full flex flex-col text-start gap-3'>
                    <p className='font-semibold text-lg dark:text-white'>Hello Guest User,</p>
                    <p className='font-semibold text-lg dark:text-white'>What should we call you ?</p>
                    <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='rounded-lg' type="text" />
                    <div className='flex gap-3'>
                        <div onClick={() => setInputValue('John')} className='rounded-full border cursor-pointer dark:border-white text-sm px-3 py-1 dark:text-white'>
                            John
                        </div>
                        <div onClick={() => setInputValue('Dick')} className='rounded-full border dark:border-white text-sm px-3 py-1 dark:text-white cursor-pointer'>
                            Dick
                        </div>
                        <div onClick={() => setInputValue('Harry')} className='rounded-full border dark:border-white text-sm px-3 py-1 dark:text-white cursor-pointer'>
                            Harry
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            joinAsGuest(() => {
                                setPopupVisible(false)
                                if (thisLocation.pathname === '/auth') {
                                    navigate('/')
                                } else {
                                    window.location.reload()
                                }
                            }, () => {
                                alert('something went wrong')
                            })
                        }}
                        disabled={inputValue === ''}
                        className="darktext-[#e4eaf0] mt-3 bg-[#e4eaf0] dark:text-white dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] disabled:opacity-65 pl-[1.5rem] pr-[0.8rem] h-[2.35rem] text-[0.7rem] md:text-[0.9rem] rounded-[8px] text-black font-semibold text-center">Continue
                    </button>
                    <p onClick={() => setPopupVisible(false)} className='hover:underline dark:text-[rgba(255,255,255,0.6)] text-center w-full cursor-pointer'>Cancel</p>

                </div>
            </div>
        </div>
    )
}

export default GreetPopup