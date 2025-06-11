import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import React, { useState } from 'react'
import placeholder from '../assets/images/person2.png'
import { useNavigate } from "react-router-dom";
import { approveRequest, rejectRequest } from "../Utils/api";
import { data } from "autoprefixer";

const RequestCard = ({
    name = "Burt Macklin",
    image = placeholder,
    id,
    removeRequest = () => { },
    userId
}) => {

    const [action, setAction] = useState(false)
    const navigate = useNavigate()


    return (
        <div onClick={() => {
            navigate(`/userprofile/${userId}`)
        }} className="p-[10px] pr-[15px] items-center rounded-[20px] self-start bg-[#002763] flex gap-5 shadow-lg dark:shadow-none cursor-pointer flex-col">
            <div className='flex gap-3 justify-start items-center'>
                <div className="h-[3rem] w-[3rem] rounded-xl overflow-hidden">
                    <img className="w-full h-full object-cover" src={image} alt='nothing' />
                </div>
                <div className="flex flex-col justify-center flex-1">
                    <p className="text-[1rem] hover:underline font-semibold dark:text-white">{name}</p>
                </div>
            </div>
            {!action && <div className='flex gap-3 w-full'>
                <button onClick={(e) => {
                    e.stopPropagation()
                    setAction(true)
                    approveRequest(id, (data) => {
                        console.log(`Request for ${id} approved`, data)
                        removeRequest(id)
                    })
                }} className='text-green-500 flex-1 bg-opacity-25 text-center font-medium  bg-green-500 border-green-500 border p-3 rounded-lg font-poppins flex gap-2 justify-center items-center text-sm'>
                    <IoMdCheckmark size={15} color="green" />
                </button>
                <button onClick={(e) => {
                    e.stopPropagation()
                    setAction(true)
                    rejectRequest(id, (data) => {
                        console.log(`Request for ${id} rejected`, data)
                        removeRequest(id)
                    })
                }} className='text-red-500 flex-1 bg-opacity-25 text-center font-medium  bg-red-500 border-red-500 border p-3 rounded-lg font-poppins flex gap-2 items-center text-sm justify-center'>
                    <RxCross2 size={15} color="red" />
                </button>
            </div>}
        </div >
    )
}

export default RequestCard