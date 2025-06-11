import { CgChevronDown } from "react-icons/cg";
import React, { useState } from 'react'
import { Switch } from '@headlessui/react';

const AlertRow = ({ label, onClick }) => {

    const [enabled, setEnabled] = useState(false)

    return (
        <div className="dark:bg-[#002763] rounded-[15px] dark:border w-full dark:border-[#00387E] dark:text-white flex gap-[4rem] py-4 px-6">
            <p className="text-4 font-medium w-[12rem]">{label}</p>
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
    )
};


const Security = () => {
    const [enabled, setEnabled] = useState(false);
    const alerts = [
        'Enable 2FA',
    ];

    return (
        <div className="w-full h-full flex gap-4 flex-col">
            {alerts.map((alert) => (
                <AlertRow key={alert} label={alert} enabled={enabled} setEnabled={setEnabled} />
            ))}
            <div className="dark:bg-[#002763] rounded-[15px] dark:border w-full dark:border-[#00387E] dark:text-white flex gap-3 py-4 px-6 flex-col">
                <div className="flex justify-between items-center w-full mb-3">
                    <p className="text-4 font-medium w-[12rem]">Login History</p>
                    {/* <CgChevronDown size={24} color="white" /> */}
                </div>
                <div className="w-full dark:border dark:border-[#00387E] rounded-[15px] px-6 py-4 justify-between flex">
                    <p className="text-[0.9rem]">Logged in from <span className="font-medium">Windows 10</span></p>
                    <p className="text-[0.9rem]">1053 GMT Calirfonia</p>
                </div>
                <div className="w-full dark:border dark:border-[#00387E] rounded-[15px] px-6 py-4 justify-between flex">
                    <p className="text-[0.9rem]">Logged in from <span className="font-medium">IPhone 16</span></p>
                    <p className="text-[0.9rem]">1053 GMT Calirfonia</p>
                </div>
                <div className="w-full dark:border dark:border-[#00387E] rounded-[15px] px-6 py-4 justify-between flex">
                    <p className="text-[0.9rem]">Logged in from <span className="font-medium">Windows 10</span></p>
                    <p className="text-[0.9rem]">1053 GMT Calirfonia</p>
                </div>
            </div>

            <div className="dark:bg-[#002763] rounded-[15px] dark:border w-full dark:border-[#00387E] dark:text-white flex gap-3 py-4 px-6 flex-col">
                <div className="flex justify-between items-center w-full mb-3">
                    <p className="text-4 font-medium w-[12rem]">Logged In Devices </p>
                    {/* <CgChevronDown size={24} color="white" /> */}
                </div>
                <div className="w-full dark:border dark:border-[#00387E] rounded-[15px] px-6 py-4 justify-between flex">
                    <p className="text-[0.9rem]">Desktop X102Dr52</p>
                    <p className="text-[0.9rem]">Last Login : 1053 GMT Calafornia</p>
                </div>
                <div className="w-full dark:border dark:border-[#00387E] rounded-[15px] px-6 py-4 justify-between flex">
                    <p className="text-[0.9rem]">iPhone 16 Pro max</p>
                    <p className="text-[0.9rem]">Last Login : 1053 GMT Calafornia</p>
                </div>
            </div>
        </div>
    );
}

export default Security