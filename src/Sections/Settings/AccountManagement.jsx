import React, { useEffect, useState } from 'react'
import Person from '../../assets/images/person2.png'
import SelectDropdownStatic from '../../Components/Combobox'
import { countries } from '../../Utils/Countries'
import PicUploadPopUpd from '../../Components/PicUploadPopUpd'
import { Oval } from 'react-loader-spinner'
import { getUserDetails } from '../../Utils/api'

const AccountManagement = () => {

    const [imageUrl, setImageUrl] = useState('')
    const [userName, setUserName] = useState('')
    const [uploadPopup, setUploadPopup] = useState(false)
    const [imageIsLoading, setImageIsLoading] = useState(false)

    useEffect(() => {
        setImageIsLoading(true)
        getUserDetails((data) => {
            setImageUrl(data?.photo?.path)
            setUserName(data?.firstName + " " + data?.lastName)
            setTimeout(() => setImageIsLoading(false), 3000)
        })

    }, [])

    return (
        <>
            {
                uploadPopup &&
                <PicUploadPopUpd
                    setImageUrl={setImageUrl}
                    setImageIsLoading={setImageIsLoading}
                    exit={setUploadPopup}
                />
            }
            <div className='h-full w-full flex flex-col gap-[12px]'>
                <div className='w-full flex gap-[12px] flex-wrap'>
                    <div className='dakr:bg-[#002763] flex-1 rounded-[20px] py-[20px] px-[20px] flex gap-[22px]'>
                        <div className='h-[11rem] overflow-hidden rounded-[10px] w-[11.2rem] relative'>
                            {imageIsLoading && <div className="absolute bg-black bg-opacity-30 place-items-center grid top-0 left-0 w-full h-full transition-all ease-in-out duration-200">
                                <Oval
                                    visible={true}
                                    height="35"
                                    width="35"
                                    color="#000"
                                    ariaLabel="oval-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                />
                            </div>}
                            <img className='w-full h-full object-cover' src={imageUrl} alt="" />
                        </div>

                        <div className='flex flex-col gap-[12px] flex-1 justify-center items-center'>

                            <button
                                onClick={() => {
                                    // upload or change profile pic
                                    setUploadPopup(true)
                                }}
                                className="bg-[#e4eaf0] dark:bg-transparent border w-[10rem] border-black dark:border-[#e4eaf0] dark:text-[#e4eaf0] px-[1.5rem] h-[2.35rem] text-[0.9rem] rounded-[8px] grid place-items-center text-black font-semibold">Change Image</button>
                            <button className="bg-[#e4eaf0] w-[10rem] dark:bg-transparent border border-black dark:border-[#e4eaf0] dark:text-[#e4eaf0] px-[1.5rem] h-[2.35rem] text-[0.9rem] rounded-[8px] grid place-items-center text-black font-semibold">Delete</button>
                        </div>
                    </div>
                    <div className='dark:bg-[#002763] bg-slate-200 rounded-[12px] py-[10px] px-[20px] flex-1 flex flex-col'>
                        <h4 className='dark:text-white font-bold text-[1.1rem] mb-4'>General</h4>
                        <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                            <label htmlFor="username" className='dark:text-white'>User Name</label>
                            {/* <input className='px-[20px] py-[9px] bg-white dark:bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='username' /> */}
                            <p className='font-semibold text-lg'>{userName}</p>
                        </div>
                        <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                            <label htmlFor="profilename" className='dark:text-white'>Profile Name</label>
                            <input className='px-[20px] py-[9px] bg-white dark:bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='profilename' />
                        </div>
                    </div>
                </div>
                <div className='dark:bg-[#002763] bg-slate-200 rounded-[12px] py-[10px] px-[20px] flex-1 flex flex-col'>
                    <h4 className='dark:text-white font-bold text-[1.1rem] mb-4'>Location</h4>
                    <div className='flex gap-[4rem] flex-1'>
                        <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                            <label htmlFor="username" className='dark:text-white'>Country</label>
                            {/* <input className='px-[20px] py-[9px] bg-white dark:bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='username' /> */}
                            <SelectDropdownStatic data={countries} />
                        </div>
                        <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                            <label htmlFor="profilename" className='dark:text-white'>State</label>
                            <input className='px-[20px] py-[9px] bg-white dark:bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='profilename' />
                        </div>
                    </div>
                    <div className='flex gap-[4rem] flex-1'>
                        <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                            <label htmlFor="username" className='dark:text-white'>City</label>
                            <input className='px-[20px] py-[9px] bg-white dark:bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='username' />
                        </div>
                        <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                            <label htmlFor="profilename" className='dark:text-white'>Zip</label>
                            <input className='px-[20px] py-[9px] bg-white dark:bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='profilename' />
                        </div>
                    </div>
                </div>

                <div className='dark:bg-[#002763] bg-slate-200 rounded-[12px] py-[10px] px-[20px] flex-1'>
                    <h4 className='dark:text-white font-bold text-[1.1rem] mb-4'>Security</h4>
                    <div className='flex gap-[4rem]'>
                        <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                            <label htmlFor="username" className='dark:text-white'>Email</label>
                            <input className='px-[20px] py-[9px] bg-white dark:bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='username' />
                        </div>
                        <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                            <label htmlFor="profilename" className='dark:text-white'>Password</label>
                            <button className="bg-[#e4eaf0] self-start dark:bg-transparent border border-black dark:border-[#e4eaf0] dark:text-[#e4eaf0] px-[1.5rem] h-[2.35rem] text-[0.9rem] rounded-[8px] grid place-items-center text-black font-semibold">Change Password</button>
                            {/* <input className='px-[20px] py-[9px] bg-white dark:bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='profilename' /> */}
                        </div>
                    </div>
                </div>

                {/* <div className='dark:bg-[#002763] bg-slate-200 rounded-[12px] py-[10px] px-[20px] flex-1'>
                    <h4 className='dark:text-white font-bold text-[1.1rem] mb-4'>Accounts</h4>
                    <div className='flex gap-[4rem]'>
                        <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                            <label htmlFor="username" className='dark:text-white'>Google</label>
                            <input className='px-[20px] py-[9px] bg-white dark:bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='username' />
                        </div>
                        <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                            <label htmlFor="profilename" className='dark:text-white'>Facebook</label>
                            <input className='px-[20px] py-[9px] bg-white dark:bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='profilename' />
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default AccountManagement