import { BsTelephone } from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";
import { CgChevronRight } from "react-icons/cg";
import React, { useState } from 'react'
import { CgChevronDown } from 'react-icons/cg';

const HelpAndSupport = () => {

    const [open, setOpen] = useState(true)


    return (
        <div className="w-full h-full flex gap-4 flex-col">
            <div className="dark:bg-[#002763] rounded-[15px] dark:border w-full dark:border-[#00387E] dark:text-white flex gap-3 py-4 px-6 flex-col">
                <div className="flex justify-between items-center w-full mb-3">
                    <p className="text-4 font-medium w-[12rem]">FAQs</p>
                    <CgChevronDown size={24} color="white" />
                </div>

                {/* one faq  */}
                <div className="w-full dark:border dark:border-[#00387E] rounded-[15px]">
                    <div onClick={() => setOpen(prev => !prev)} className="w-full px-6 py-4 justify-between flex">
                        <div>
                            <p className="text-[0.9rem] font-semibold">Pellentesque ac bibendum tortor?</p>
                        </div>
                        {!open && <CgChevronRight size={24} color="white" />}
                        {open && <CgChevronDown size={24} color="white" />}
                    </div>
                    {open && <p className="px-6 pb-4 text-[#CDCDCD]">
                        Vivamus sit amet interdum elit. Proin lacinia erat ac velit tempus auctor.
                    </p>}
                </div>
                <div className="w-full dark:border dark:border-[#00387E] rounded-[15px]">
                    <div onClick={() => setOpen(prev => !prev)} className="w-full px-6 py-4 justify-between flex">
                        <div>
                            <p className="text-[0.9rem] font-semibold">Pellentesque ac bibendum tortor?</p>
                        </div>
                        {!open && <CgChevronRight size={24} color="white" />}
                        {open && <CgChevronDown size={24} color="white" />}
                    </div>
                    {open && <p className="px-6 pb-4 text-[#CDCDCD]">
                        Vivamus sit amet interdum elit. Proin lacinia erat ac velit tempus auctor.
                    </p>}
                </div>
                <div className="w-full dark:border dark:border-[#00387E] rounded-[15px]">
                    <div onClick={() => setOpen(prev => !prev)} className="w-full px-6 py-4 justify-between flex">
                        <div>
                            <p className="text-[0.9rem] font-semibold">Pellentesque ac bibendum tortor?</p>
                        </div>
                        {!open && <CgChevronRight size={24} color="white" />}
                        {open && <CgChevronDown size={24} color="white" />}
                    </div>
                    {open && <p className="px-6 pb-4 text-[#CDCDCD]">
                        Vivamus sit amet interdum elit. Proin lacinia erat ac velit tempus auctor.
                    </p>}
                </div>
                <div className="w-full dark:border dark:border-[#00387E] rounded-[15px]">
                    <div onClick={() => setOpen(prev => !prev)} className="w-full px-6 py-4 justify-between flex">
                        <div>
                            <p className="text-[0.9rem] font-semibold">Pellentesque ac bibendum tortor?</p>
                        </div>
                        {!open && <CgChevronRight size={24} color="white" />}
                        {open && <CgChevronDown size={24} color="white" />}
                    </div>
                    {open && <p className="px-6 pb-4 text-[#CDCDCD]">
                        Vivamus sit amet interdum elit. Proin lacinia erat ac velit tempus auctor.
                    </p>}
                </div>

            </div>

            <div className="dark:bg-[#002763] rounded-[15px] dark:border w-full dark:border-[#00387E] dark:text-white flex gap-3 py-4 px-6 justify-between">
                <p className="text-4 font-medium w-[12rem]">Report A Bug</p>
                <CgChevronRight size={24} color="white" />
            </div>

            <div className="dark:bg-[#002763] rounded-[15px] dark:border w-full dark:border-[#00387E] dark:text-white flex gap-[4rem] py-4 px-6">
                <p className="text-4 font-medium w-[12rem]">Contact Us</p>
                <div className="flex gap-4">
                    <FiMessageSquare color="white" size={24} />
                    <BsTelephone color="white" size={24} />
                </div>
            </div>

        </div>
    );
}

export default HelpAndSupport