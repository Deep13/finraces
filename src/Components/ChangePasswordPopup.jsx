import { RxCross1 } from "react-icons/rx";
import React, { useContext, useState } from 'react'
import { DarkModeContext } from "../Contexts/DarkModeProvider";
import { updatePassword } from "../Utils/api";

const ChangePasswordPopup = ({
    exit = () => { },
}) => {
    const { darkModeEnabled } = useContext(DarkModeContext)
    const [values, setValues] = useState({
        password: '',
        newPassword: '',
        confirmNewPassword: ''
    })

    const handleChangePassword = () => {
        // API call to change password
        if (!values.password || !values.newPassword || !values.confirmNewPassword) {
            alert('All fields are required')
            return
        }

        if (values.newPassword !== values.confirmNewPassword) {
            alert('New password and confirm password should be same')
            return
        }

        if (values.newPassword.length < 8) {
            alert('Password should be atleast 8 characters long')
            return
        }

        if (values.newPassword === values.password) {
            alert('New password should be different from old password')
            return
        }

        console.log('change password called', values);

        updatePassword(values.password, values.newPassword, (data) => {
            // alert('Password changed successfully')
            console.log('')
        }, () => {
            alert('Failed to change password')
        })


        exit(false)

    }
    return (
        <div className='w-full h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-50 flex justify-center items-center'>
            <div className='w-[500px] bg-white dark:bg-[#00387e] rounded-[20px] p-[20px] flex flex-col gap-[20px] relative'>
                <button onClick={() => exit(false)} className='absolute top-4 right-4 p-[10px]'>
                    <RxCross1 color={darkModeEnabled ? 'white' : 'black'} size={18} />
                </button>
                <h2 className='text-[1.5rem] dark:text-white font-bold'>Change Password</h2>
                <input value={values.password} onChange={(e) => setValues(prev => ({ ...prev, password: e.target.value }))} type="password" placeholder='Old Password' className='border border-[#00387E] rounded-[10px] p-[10px]' />
                <input value={values.newPassword} onChange={(e) => setValues(prev => ({ ...prev, newPassword: e.target.value }))} type="password" placeholder='New Password' className='border border-[#00387E] rounded-[10px] p-[10px]' />
                <input value={values.confirmNewPassword} onChange={(e) => setValues(prev => ({ ...prev, confirmNewPassword: e.target.value }))} type="password" placeholder='Confirm New Password' className='border border-[#00387E] rounded-[10px] p-[10px]' />
                <button onClick={() => handleChangePassword()} className=' dark:text-white bg-[#e4eaf0] dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] rounded-[10px] p-[10px]'>Change Password</button>
            </div>
        </div>
    )
}

export default ChangePasswordPopup