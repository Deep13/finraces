import React from 'react'
import { deleteAccount } from '../Utils/api'
import { useNavigate } from 'react-router-dom'

const DeleteAccountPopup = ({
    exit = () => { }
}) => {
    const navigate = useNavigate()

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center'>
            <div className='bg-white w-[400px] rounded-[20px] p-[20px] dark:bg-[#00387e] '>
                <h1 className='text-[24px] font-bold text-[#333333] dark:text-white'>Delete Account</h1>
                <p className='text-[#4F4F4F] text-[14px] mt-[10px] dark:text-white'>Are you sure you want to delete your account?</p>
                <div className='flex justify-end gap-[10px] mt-[20px]'>
                    <button onClick={() => exit(false)} className='bg-[#F2F2F2] text-[#333333] text-[14px] font-bold py-[10px] px-[20px] rounded-[10px]'>Cancel</button>
                    <button onClick={() => {
                        deleteAccount({ id: 2 }, (data) => {
                            console.log('Acccount Deleted Successfully', data)
                        })
                        localStorage.removeItem('token')
                        localStorage.removeItem('refreshToken')
                        localStorage.removeItem('userDetails')
                        navigate('/auth')
                        exit(false)
                    }} className='bg-[#FF0000] text-white text-[14px] font-bold py-[10px] px-[20px] rounded-[10px]'>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteAccountPopup