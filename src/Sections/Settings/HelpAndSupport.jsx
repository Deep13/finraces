// import { BsTelephone } from "react-icons/bs";
// import { FiMessageSquare } from "react-icons/fi";
import { CgChevronRight, CgChevronDown } from "react-icons/cg";
import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../Contexts/DarkModeProvider";
import { accordionData } from "../../Utils/Data";
// import { transform } from "lodash";
import { reportBug } from "../../Utils/api";

const HelpAndSupport = () => {
    const { darkModeEnabled } = useContext(DarkModeContext)
    const [openAccordion, setOpenAccordion] = useState(null); // Track the open accordion
    const [report, setReport] = useState(false)
    const [reportData, setReportData] = useState({
        title: "",
        priority: "Low",
        description: "",
        area: "Bug"
    })

    // Toggle a specific accordion
    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index); // Close if already open, else open
    };

    const submitBugReport = async () => {
        console.log(reportData)
        await reportBug(reportData)
        setReportData({
            title: "",
            priority: "",
            description: ""
        }) // clear all inputs
    }

    useEffect(() => {
        console.log(reportData);

    }, [reportData])


    return (
        <div className="w-full h-full flex gap-4 flex-col">
            <div className="dark:bg-[#002763] rounded-[15px] dark:border w-full dark:border-[#00387E] dark:text-white flex gap-3 py-4 px-6 flex-col">
                <div className="flex justify-between items-center w-full mb-3">
                    <p className="text-4 font-medium w-[12rem]">FAQs</p>
                    {/* <CgChevronDown size={24} color="white" /> */}
                </div>

                {/* Loop through FAQ items */}
                {accordionData.map((faq, index) => (
                    <div key={index} className="w-full dark:border dark:border-[#00387E] rounded-[15px] border border-black">
                        <div
                            onClick={() => toggleAccordion(index)}
                            className="w-full px-6 py-4 justify-between flex cursor-pointer"
                        >
                            <div>
                                <p className="text-[0.9rem] font-semibold">{faq.title}</p>
                            </div>
                            {openAccordion === index ? (
                                <CgChevronDown size={24} color={darkModeEnabled ? 'white' : 'black'} />
                            ) : (
                                <CgChevronRight size={24} color={darkModeEnabled ? 'white' : 'black'} />
                            )}
                        </div>
                        {openAccordion === index && (
                            <p className="px-6 pb-4 dark:text-[#CDCDCD]">
                                {faq.content}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <div className="w-full dark:bg-[#002763] rounded-[15px] dark:border dark:border-[#00387E] dark:text-white">
                <div onClick={() => setReport(prev => !prev)} className=" flex gap-3 py-4 px-6 justify-between cursor-pointer">
                    <p className="text-4 font-medium w-[12rem]">Report A Bug</p>
                    <div style={{ transform: report ? 'rotate(90deg)' : 'rotate(0deg)' }} className="transition-transform">
                        <CgChevronRight size={24} color="white" />
                    </div>
                </div>
                {
                    report &&
                    <div className="px-6 w-full py-4">
                        <div className="w-full flex justify-between gap-3 mb-3">
                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="title">Title</label>
                                <input value={reportData.title} onChange={e => setReportData(prev => ({ ...prev, title: e.target.value }))} type="text" />
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="priority">Priority</label>
                                <div className="placeholder-[#b3bfbc] rounded-[14px] dark:bg-[#010B2C] dark:text-white bg-[#f5f5f5] px-[13px] py-[14px] text-[#292D32] focus:outline-none">

                                    <select className="w-full bg-transparent focus:outline-none" onChange={e => setReportData(prev => ({ ...prev, priority: e.target.value }))} type="text" >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-between gap-3 mb-3">
                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="area">Area</label>
                                <div className="placeholder-[#b3bfbc] rounded-[14px] dark:bg-[#010B2C] dark:text-white bg-[#f5f5f5] px-[13px] py-[14px] text-[#292D32] focus:outline-none">

                                    <select className="w-full bg-transparent focus:outline-none" onChange={e => setReportData(prev => ({ ...prev, area: e.target.value }))} type="text" >
                                        <option value="Low">Bug</option>
                                        <option value="Medium">Account Not Accessible</option>
                                        <option value="High">Ranking is Not showing</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                            </div>
                        </div>
                        <div className="w-full flex justify-between gap-3 mb-4">
                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="title">Description</label>
                                <textarea value={reportData.description} onChange={e => setReportData(prev => ({ ...prev, description: e.target.value }))} type="text" />
                            </div>
                        </div>
                        <button onClick={submitBugReport} className="darktext-[#e4eaf0] bg-[#e4eaf0] dark:text-white dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] px-[1rem] h-[2.35rem] text-[0.7rem] md:text-[0.9rem] rounded-[8px] flex gap-2 items-center text-black font-semibold">Submit</button>
                    </div>
                }
            </div>

            {/* <div className="dark:bg-[#002763] rounded-[15px] dark:border w-full dark:border-[#00387E] dark:text-white flex gap-[4rem] py-4 px-6">
                <p className="text-4 font-medium w-[12rem]">Contact Us</p>
                <div className="flex gap-4">
                    <FiMessageSquare color="white" size={24} />
                    <BsTelephone color="white" size={24} />
                </div>
            </div> */}
        </div >
    );
};

export default HelpAndSupport;
