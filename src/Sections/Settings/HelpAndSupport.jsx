import { BsTelephone } from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";
import { CgChevronRight, CgChevronDown } from "react-icons/cg";
import React, { useContext, useState } from "react";
import { DarkModeContext } from "../../Contexts/DarkModeProvider";

const HelpAndSupport = () => {
    const { darkModeEnabled } = useContext(DarkModeContext)
    const [openAccordion, setOpenAccordion] = useState(null); // Track the open accordion

    // Toggle a specific accordion
    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index); // Close if already open, else open
    };

    const faqs = [
        "Pellentesque ac bibendum tortor?",
        "Quisque tincidunt vehicula arcu?",
        "Donec vel ligula id magna?",
        "Nulla facilisi sed cursus?"
    ];

    return (
        <div className="w-full h-full flex gap-4 flex-col">
            <div className="dark:bg-[#002763] rounded-[15px] dark:border w-full dark:border-[#00387E] dark:text-white flex gap-3 py-4 px-6 flex-col">
                <div className="flex justify-between items-center w-full mb-3">
                    <p className="text-4 font-medium w-[12rem]">FAQs</p>
                    <CgChevronDown size={24} color="white" />
                </div>

                {/* Loop through FAQ items */}
                {faqs.map((faq, index) => (
                    <div key={index} className="w-full dark:border dark:border-[#00387E] rounded-[15px] border border-black">
                        <div
                            onClick={() => toggleAccordion(index)}
                            className="w-full px-6 py-4 justify-between flex cursor-pointer"
                        >
                            <div>
                                <p className="text-[0.9rem] font-semibold">{faq}</p>
                            </div>
                            {openAccordion === index ? (
                                <CgChevronDown size={24} color={darkModeEnabled ? 'white' : 'black'} />
                            ) : (
                                <CgChevronRight size={24} color={darkModeEnabled ? 'white' : 'black'} />
                            )}
                        </div>
                        {openAccordion === index && (
                            <p className="px-6 pb-4 dark:text-[#CDCDCD]">
                                Vivamus sit amet interdum elit. Proin lacinia erat ac velit
                                tempus auctor.
                            </p>
                        )}
                    </div>
                ))}
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
};

export default HelpAndSupport;
