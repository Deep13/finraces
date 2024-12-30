import React, { useEffect, useState } from 'react'
import Person from '../../assets/images/person2.png'
import SelectDropdownStatic from '../../Components/Combobox'
import { countries } from '../../Utils/Countries'
import PicUploadPopUpd from '../../Components/PicUploadPopUpd'
import { Oval } from 'react-loader-spinner'
import { getUserDetails, updateProfile } from '../../Utils/api'
import ChangePasswordPopup from '../../Components/ChangePasswordPopup'
import DeleteAccountPopup from '../../Components/DeleteAccountPopup'

const AccountManagement = () => {

    const [imageUrl, setImageUrl] = useState('')
    const [userName, setUserName] = useState('')
    const [uploadPopup, setUploadPopup] = useState(false)
    const [imageIsLoading, setImageIsLoading] = useState(false)
    const [changePasswordPopup, setChangePasswordPopup] = useState(false)
    const [deleteAccountPopup, setDeleteAccountPopup] = useState(false)
    const [userData, setUserData] = useState({})

    useEffect(() => {
        setImageIsLoading(true)
        getUserDetails((data) => {
            setImageUrl(data?.photo?.path)
            setUserName(data?.firstName + " " + data?.lastName)
            setUserData(data)
            setTimeout(() => setImageIsLoading(false), 3000)
        })

    }, [])

    const handleSaveInfo = () => {
        updateProfile(userData, () => {
            console.log('Profile Updated')
        }, () => {
            console.log('Error Updating Profile')
        })
    }

    function findCountryIndex(countryName) {
        return countries.findIndex(country => country.name === countryName);
    }


    return (
        <>
            {
                deleteAccountPopup &&
                <DeleteAccountPopup
                    exit={setDeleteAccountPopup}
                />
            }
            {
                uploadPopup &&
                <PicUploadPopUpd
                    setImageUrl={setImageUrl}
                    setImageIsLoading={setImageIsLoading}
                    exit={setUploadPopup}
                />
            }
            {
                changePasswordPopup &&
                <ChangePasswordPopup
                    exit={setChangePasswordPopup}
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
                            <button onClick={() => setDeleteAccountPopup(true)} className="w-[10rem] bg-red-500 text-white px-[1.5rem] h-[2.35rem] text-[0.7rem] rounded-[8px] grid place-items-center font-semibold">Delete Your Account</button>
                        </div>
                    </div>
                    <div className='dark:bg-[#002763] bg-slate-200 rounded-[12px] py-[10px] px-[20px] flex-1 flex flex-col'>
                        <h4 className='dark:text-white font-bold text-[1.1rem] mb-4'>General</h4>
                        <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                            <label htmlFor="username" className='dark:text-white'>User ID</label>
                            {/* <input className='px-[20px] py-[9px] bg-white dark:bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='username' /> */}
                            <p className='font-semibold text-lg font-poppins'>{userData.id}</p>
                        </div>
                        <div className='w-full flex justify-between'>
                            {/* <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                                <label htmlFor="profilename" className='dark:text-white'>First Name</label>
                                <input value={userData.firstName} onChange={e => setUserData(prev => ({ ...prev, firstName: e.target.value }))} className='px-[20px] py-[9px] bg-white dark:bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='profilename' />
                                <p className='font-semibold dark:text-white font-poppins'>{userData.firstName}</p>
                            </div> */}
                            <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                                <label htmlFor="profilename" className='dark:text-white'>Full Name</label>
                                {/* <input value={userData.lastName} onChange={e => setUserData(prev => ({ ...prev, lastName: e.target.value }))} className='px-[20px] py-[9px] bg-white dark:bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='profilename' /> */}
                                <p className='font-semibold dark:text-white'>{userData.firstName + " " + userData.lastName}</p>
                                {/* <p className='font-semibold dark:text-white'>{userData.lastN}</p> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='dark:bg-[#002763] bg-slate-200 rounded-[12px] py-[10px] px-[20px] flex-1 flex flex-col'>
                    <h4 className='dark:text-white font-bold text-[1.1rem] mb-4'>Location</h4>
                    <div className='flex gap-[4rem] flex-1'>
                        <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                            <label htmlFor="username" className='dark:text-white'>Country</label>
                            {/* <input className='px-[20px] py-[9px] bg-white dark:bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='username' /> */}
                            <SelectDropdownStatic value={countries[findCountryIndex(userData.country)]} setUserData={setUserData} data={countries} />
                        </div>
                        <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                            <label htmlFor="profilename" className='dark:text-white'>State</label>
                            <input value={userData.address} onChange={e => setUserData(prev => ({ ...prev, address: e.target.value }))} className='px-[20px] py-[9px] bg-white dark:bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='profilename' />
                        </div>
                    </div>
                    <div className='flex gap-[4rem] flex-1'>
                        <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                            <label htmlFor="username" className='dark:text-white'>City</label>
                            <input value={userData.city} onChange={e => setUserData(prev => ({ ...prev, city: e.target.value }))} className='px-[20px] py-[9px] bg-white dark:bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='username' />
                        </div>
                        <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                            <label htmlFor="profilename" className='dark:text-white'>Zip</label>
                            <input value={userData.zipcode} onChange={e => setUserData(prev => ({ ...prev, zipcode: e.target.value }))} className='px-[20px] py-[9px] bg-white dark:bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='profilename' />
                        </div>
                    </div>
                </div>

                <div className='dark:bg-[#002763] bg-slate-200 rounded-[12px] py-[10px] px-[20px] flex-1'>
                    <h4 className='dark:text-white font-bold text-[1.1rem] mb-4'>Security</h4>
                    <div className='flex gap-[4rem]'>
                        <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                            <label htmlFor="username" className='dark:text-white'>Email</label>
                            {/* <input value={userData.email} onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))} className='px-[20px] py-[9px] bg-white dark:bg-[#010B2C] text-[1rem] dark:border dark:border-[#00387E] rounded' type="text" name='username' /> */}
                            <p className='font-semibold dark:text-white font-poppins'>{userData.email}</p>
                        </div>
                        <div className='flex flex-col gap-[10px] mb-[0.7rem] flex-1'>
                            <label htmlFor="profilename" className='dark:text-white'>Password</label>
                            <button onClick={() => setChangePasswordPopup(true)} className="bg-[#e4eaf0] self-start dark:bg-transparent border border-black dark:border-[#e4eaf0] dark:text-[#e4eaf0] px-[1.5rem] h-[2.35rem] text-[0.9rem] rounded-[8px] grid place-items-center text-black font-semibold">Change Password</button>
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
                <button onClick={handleSaveInfo} className="darktext-[#e4eaf0] bg-[#e4eaf0] dark:text-white dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] px-[1rem] h-[2.35rem] text-[0.7rem] md:text-[0.9rem] rounded-[8px] flex gap-2 items-center text-black font-semibold self-start">
                    Save
                </button>
            </div>
        </>
    )
}

export default AccountManagement