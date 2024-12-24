import React, { useState } from 'react'
import { Switch } from '@headlessui/react'
import { CgChevronDown } from 'react-icons/cg'
import Person from '../../assets/images/person2.png'

const PrivacySettings = () => {

    const [enabled, setEnabled] = useState(false)
    const [enabled1, setEnabled1] = useState(false)
    const [enabled2, setEnabled2] = useState(false)

    return (
        <div className="w-full h-full flex gap-4 flex-col">
            <div className="dark:bg-[#002763] rounded-[15px] dark:border w-full dark:border-[#00387E] dark:text-white flex gap-[4rem] py-4 px-6">
                <p className="text-4 font-medium w-[12rem]">Show Achievements</p>
                <div className='flex gap-2'>
                    <p>
                        {enabled ? 'On' : 'Off'}
                    </p>
                    <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        className="group relative data-[checked]:bg-green-600 flex h-4 w-10 cursor-pointer rounded-full dark:bg-[#000924] dark:data-[checked]:bg-green-600 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white border border-black dark:border-none top-1"
                    >
                        <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block size-5 -translate-x-1 rounded-full ${enabled ? 'bg-white' : 'dark:bg-[#001A50] bg-slate-300'} ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5 relative -top-[0.4rem]`}
                        />
                    </Switch>
                </div>
            </div>

            <div className="dark:bg-[#002763] rounded-[15px] dark:border w-full dark:border-[#00387E] dark:text-white flex gap-[4rem] py-4 px-6">
                <p className="text-4 font-medium w-[12rem]">Friend Requests</p>
                <div className='flex gap-2'>
                    <p>
                        {enabled1 ? 'On' : 'Off'}
                    </p>
                    <Switch
                        checked={enabled1}
                        onChange={setEnabled1}
                        className="group relative data-[checked]:bg-green-600 flex h-4 w-10 cursor-pointer rounded-full dark:bg-[#000924] dark:data-[checked]:bg-green-600 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white border border-black dark:border-none top-1"
                    >
                        <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block size-5 -translate-x-1 rounded-full ${enabled1 ? 'bg-white' : 'dark:bg-[#001A50] bg-slate-300'} ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5 relative -top-[0.4rem]`}
                        />
                    </Switch>
                </div>
            </div>

            <div className="dark:bg-[#002763] rounded-[15px] dark:border w-full dark:border-[#00387E] dark:text-white flex gap-[4rem] py-4 px-6">
                <p className="text-4 font-medium w-[12rem]">Messages</p>
                <div className='flex gap-2'>
                    <p>
                        {enabled2 ? 'On' : 'Off'}
                    </p>
                    <Switch
                        checked={enabled2}
                        onChange={setEnabled2}
                        className="group relative data-[checked]:bg-green-600 flex h-4 w-10 cursor-pointer rounded-full dark:bg-[#000924] dark:data-[checked]:bg-green-600 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white border border-black dark:border-none top-1"
                    >
                        <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block size-5 -translate-x-1 rounded-full ${enabled2 ? 'bg-white' : 'dark:bg-[#001A50] bg-slate-300'} ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5 relative -top-[0.4rem]`}
                        />
                    </Switch>
                </div>
            </div>

            <div className="dark:bg-[#002763] rounded-[15px] dark:border w-full dark:border-[#00387E] dark:text-white flex gap-3 py-4 px-6 flex-col">
                <div className="flex justify-between items-center w-full mb-3">
                    <p className="text-4 font-medium w-[12rem]">Blocked accounts list</p>
                    {/* <CgChevronDown size={24} color="white" /> */}
                </div>

                {/* // one player  */}
                <div className="w-full dark:border dark:border-[#00387E] rounded-[15px] px-6 py-4 justify-between flex items-center">
                    <div className="text-[0.9rem] flex gap-4 items-center">
                        <p className='text-4 font-semibold'>1</p>
                        <div className='flex gap-2'>
                            <div className='w-12 h-12 rounded-full overflow-hidden'>
                                <img src={Person} alt="" />
                            </div>
                            <div className='flex flex-col justify-between'>
                                <p className='text-[1.1rem] dark:text-white'>Player2038</p>
                                <p className='text-[0.8rem] dark:text-[#B5B4B4]'>Player2038</p>
                            </div>
                        </div>
                    </div>
                    <button className="bg-[#e4eaf0] dark:bg-transparent dark:border dark:border-[#e4eaf0] dark:text-[#e4eaf0] px-[1.5rem] h-[2.35rem] text-[0.9rem] rounded-[8px] grid place-items-center text-black font-semibold">unblock</button>
                </div>

                {/* // one player  */}
                <div className="w-full dark:border dark:border-[#00387E] rounded-[15px] px-6 py-4 justify-between flex items-center">
                    <div className="text-[0.9rem] flex gap-4 items-center">
                        <p className='text-4 font-semibold'>1</p>
                        <div className='flex gap-2'>
                            <div className='w-12 h-12 rounded-full overflow-hidden'>
                                <img src={Person} alt="" />
                            </div>
                            <div className='flex flex-col justify-between'>
                                <p className='text-[1.1rem] dark:text-white'>Player2038</p>
                                <p className='text-[0.8rem] dark:text-[#B5B4B4]'>Player2038</p>
                            </div>
                        </div>
                    </div>
                    <button className="bg-[#e4eaf0] dark:bg-transparent dark:border dark:border-[#e4eaf0] dark:text-[#e4eaf0] px-[1.5rem] h-[2.35rem] text-[0.9rem] rounded-[8px] grid place-items-center text-black font-semibold">unblock</button>
                </div>


            </div>
        </div>
    )
}

export default PrivacySettings