import React from 'react'
import Person from '../../assets/images/person2.png'

const AccountManagement = () => {
    return (
        <div className='h-full w-full flex flex-col gap-[12px]'>
            <div className='w-full flex gap-[12px]'>
                <div className='bg-[#002763] flex-1 rounded-[20px] py-[20px] px-[20px] flex gap-[22px]'>
                    <div className='h-[11rem] overflow-hidden rounded-[10px] w-[11.2rem]'>
                        <img className='w-full h-full object-cover' src={Person} alt="" />
                    </div>

                    <div className='flex flex-col gap-[12px] flex-1 justify-center items-center'>
                        <button className="bg-[#e4eaf0] dark:bg-transparent dark:border dark:border-[#e4eaf0] dark:text-[#e4eaf0] px-[1.5rem] h-[2.35rem] text-[0.9rem] rounded-[8px] grid place-items-center text-black font-semibold">Change Image</button>
                        <button className="bg-[#e4eaf0] w-[9.2rem] dark:bg-transparent dark:border dark:border-[#e4eaf0] dark:text-[#e4eaf0] px-[1.5rem] h-[2.35rem] text-[0.9rem] rounded-[8px] grid place-items-center text-black font-semibold">Delete</button>
                    </div>
                </div>
                <div className='bg-[#002763] rounded-[12px] py-[10px] px-[20px] flex-1 flex flex-col'>
                    <h4 className='dark:text-white font-bold text-[1.1rem] mb-4'>General</h4>
                    <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                        <label htmlFor="username" className='dark:text-white'>User Name</label>
                        <input className='px-[20px] py-[9px] bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='username' />
                    </div>
                    <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                        <label htmlFor="profilename" className='dark:text-white'>Profile Name</label>
                        <input className='px-[20px] py-[9px] bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='profilename' />
                    </div>
                </div>
            </div>
            <div className='bg-[#002763] rounded-[12px] py-[10px] px-[20px] flex-1 flex flex-col'>
                <h4 className='dark:text-white font-bold text-[1.1rem] mb-4'>Location</h4>
                <div className='flex gap-[4rem] flex-1'>
                    <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                        <label htmlFor="username" className='dark:text-white'>Country</label>
                        <input className='px-[20px] py-[9px] bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='username' />
                    </div>
                    <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                        <label htmlFor="profilename" className='dark:text-white'>State</label>
                        <input className='px-[20px] py-[9px] bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='profilename' />
                    </div>
                </div>
                <div className='flex gap-[4rem] flex-1'>
                    <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                        <label htmlFor="username" className='dark:text-white'>City</label>
                        <input className='px-[20px] py-[9px] bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='username' />
                    </div>
                    <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                        <label htmlFor="profilename" className='dark:text-white'>Zip</label>
                        <input className='px-[20px] py-[9px] bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='profilename' />
                    </div>
                </div>
            </div>

            <div className='bg-[#002763] rounded-[12px] py-[10px] px-[20px] flex-1'>
                <h4 className='dark:text-white font-bold text-[1.1rem] mb-4'>Security</h4>
                <div className='flex gap-[4rem]'>
                    <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                        <label htmlFor="username" className='dark:text-white'>Email</label>
                        <input className='px-[20px] py-[9px] bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='username' />
                    </div>
                    <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                        <label htmlFor="profilename" className='dark:text-white'>Password</label>
                        <input className='px-[20px] py-[9px] bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='profilename' />
                    </div>
                </div>
            </div>

            <div className='bg-[#002763] rounded-[12px] py-[10px] px-[20px] flex-1'>
                <h4 className='dark:text-white font-bold text-[1.1rem] mb-4'>Accounts</h4>
                <div className='flex gap-[4rem]'>
                    <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                        <label htmlFor="username" className='dark:text-white'>Google</label>
                        <input className='px-[20px] py-[9px] bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='username' />
                    </div>
                    <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                        <label htmlFor="profilename" className='dark:text-white'>Facebook</label>
                        <input className='px-[20px] py-[9px] bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='profilename' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountManagement