import React, { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { CgChevronDown } from 'react-icons/cg'
import Person from '../../assets/images/person2.png'
import { getSettings, changeSettings } from '../../Utils/api'
import { getAllblockedUsers, unblockUser } from '../../Utils/api'
import { ColorRing } from 'react-loader-spinner'
import {notification} from 'antd'

const PrivacySettings = () => {

    const [settings, setSettings] = useState({
        "messages_allowed": true,
        "friend_request_allowed": true,
        "show_achievements": true,
        "community_alert": true,
        "achievement_alert": true,
        "race_alert": true,
        "notification_alert": true
    })
    const [blockedUsersList, setBlockedUsersList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getSettings((data) => {
            setSettings(data)
        })
        let userData = localStorage.getItem('userDetails')
        let selfId = userData && JSON.parse(atob(userData)).userId
        selfId && getAllblockedUsers(selfId, (data) => {
            console.log('All the blocked Users--------->', data.data)
            setBlockedUsersList(data.data)
            setIsLoading(false)
        })
    }, [])

    const showNotification = (type, label, key) => {
        console.log(type)
        let status=key?"On":"Off"
        const description=`${label} has been turned ${status}`
        notification[type]({
          label,
          description,
          placement: "topRight", // You can change placement
          duration: 3, // Auto-close after 3 seconds
        });
      };

    // Function to handle changes in each setting
    const handleChangeSettings = (key, value,text) => {
        // Update local settings state
        setSettings(prevSettings => ({
            ...prevSettings,
            [key]: value,
        }));

        console.log("val",value,text)
        showNotification("info",text,value)
        // Send the updated setting to the backend
        changeSettings({ [key]: value }, (data) => {
            console.log(`Updated ${key} setting successfully`, data.data)
        })
    }

    useEffect(() => {
        console.log(blockedUsersList)
    }, [blockedUsersList])

    return (
        <div className="w-full h-full flex gap-4 flex-col">
            {/* Show Achievements */}
            <div className="dark:bg-[#002763] rounded-[15px] dark:border w-full dark:border-[#00387E] dark:text-white flex gap-[4rem] py-4 px-6">
                <p className="text-4 font-medium w-[12rem]">Show Achievements</p>
                <div className='flex gap-2'>
                    <p>{settings.show_achievements ? 'On' : 'Off'}</p>
                    <Switch
                        checked={settings.show_achievements}
                        onChange={(newValue) => handleChangeSettings("show_achievements", newValue,"Show Achievements")}
                        className="group relative data-[checked]:bg-green-600 flex h-4 w-10 cursor-pointer rounded-full dark:bg-[#000924] dark:data-[checked]:bg-green-600 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white border border-black dark:border-none top-1"
                    >
                        <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block size-5 -translate-x-1 rounded-full ${settings.show_achievements ? 'bg-white' : 'dark:bg-[#001A50] bg-slate-300'} ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5 relative -top-[0.4rem]`}
                        />
                    </Switch>
                </div>
            </div>

            {/* Friend Requests */}
            <div className="dark:bg-[#002763] rounded-[15px] dark:border w-full dark:border-[#00387E] dark:text-white flex gap-[4rem] py-4 px-6">
                <p className="text-4 font-medium w-[12rem]">Friend Requests</p>
                <div className='flex gap-2'>
                    <p>{settings.friend_request_allowed ? 'On' : 'Off'}</p>
                    <Switch
                        checked={settings.friend_request_allowed}
                        onChange={(newValue) => handleChangeSettings("friend_request_allowed", newValue,"Friend Requests")}
                        className="group relative data-[checked]:bg-green-600 flex h-4 w-10 cursor-pointer rounded-full dark:bg-[#000924] dark:data-[checked]:bg-green-600 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white border border-black dark:border-none top-1"
                    >
                        <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block size-5 -translate-x-1 rounded-full ${settings.friend_request_allowed ? 'bg-white' : 'dark:bg-[#001A50] bg-slate-300'} ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5 relative -top-[0.4rem]`}
                        />
                    </Switch>
                </div>
            </div>

            {/* Messages */}
            <div className="dark:bg-[#002763] rounded-[15px] dark:border w-full dark:border-[#00387E] dark:text-white flex gap-[4rem] py-4 px-6">
                <p className="text-4 font-medium w-[12rem]">Messages</p>
                <div className='flex gap-2'>
                    <p>{settings.messages_allowed ? 'On' : 'Off'}</p>
                    <Switch
                        checked={settings.messages_allowed}
                        onChange={(newValue) => handleChangeSettings("messages_allowed", newValue,"Messages")}
                        className="group relative data-[checked]:bg-green-600 flex h-4 w-10 cursor-pointer rounded-full dark:bg-[#000924] dark:data-[checked]:bg-green-600 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white border border-black dark:border-none top-1"
                    >
                        <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block size-5 -translate-x-1 rounded-full ${settings.messages_allowed ? 'bg-white' : 'dark:bg-[#001A50] bg-slate-300'} ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5 relative -top-[0.4rem]`}
                        />
                    </Switch>
                </div>
            </div>

            {/* Blocked accounts list */}
            <div className="dark:bg-[#002763] rounded-[15px] dark:border w-full dark:border-[#00387E] dark:text-white flex gap-3 py-4 px-6 flex-col">
                <div className="flex justify-between items-center w-full mb-3">
                    <p className="text-4 font-medium w-[12rem]">Blocked accounts list</p>
                </div>

                {/* Player */}
                {
                    (blockedUsersList &&
                        blockedUsersList?.length > 0) ?
                        blockedUsersList?.map((curr, index) => {
                            console.log(curr)
                            return (
                                <div key={curr?.blocked_user?.id} className="w-full dark:border dark:border-[#00387E] rounded-[15px] px-6 py-4 justify-between flex items-center">
                                    <div className="text-[0.9rem] flex gap-4 items-center">
                                        <p className='text-4 font-semibold'>{index + 1}</p>
                                        <div className='flex gap-2 items-center'>
                                            <div className='w-12 h-12 rounded-full overflow-hidden'>
                                                <img src={curr?.blocked_user?.photo?.path} alt="" />
                                            </div>
                                            <div className='flex flex-col justify-between items-center'>
                                                <p className='text-[1.1rem] dark:text-white'>{curr?.blocked_user?.firstName + " " + curr?.blocked_user?.lastName}</p>
                                                {/* <p className='text-[0.8rem] dark:text-[#B5B4B4]'>Player2038</p> */}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            unblockUser(curr?.id, () => {
                                                // Update the state to remove the unblocked user from the list
                                                setBlockedUsersList((prevList) =>
                                                    prevList.filter((user) => user.id !== curr.id)
                                                );
                                            });
                                        }}
                                        className="bg-[#e4eaf0] dark:bg-transparent dark:border dark:border-[#e4eaf0] dark:text-[#e4eaf0] px-[1.5rem] h-[2.35rem] text-[0.9rem] rounded-[8px] grid place-items-center text-black font-semibold">
                                        Unblock
                                    </button>
                                </div>
                            )
                        }) :
                        (!isLoading && <p>There are No Blocked Users</p>)
                }
                {isLoading &&
                    <ColorRing
                        visible={true}
                        height="30"
                        width="30"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                }

            </div>
        </div>
    )
}

export default PrivacySettings
