import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs"; 
import { AiOutlineArrowRight } from "react-icons/ai"; 
import React, { useState } from 'react'
import line from '../../assets/images/Group.png'
import { accordionData } from "../../Utils/Data";

const FAQ = () => {

    const [activeIndex, setActiveIndex] = useState(null);

  

    const toggleAccordion = (index) => {
        setActiveIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        <div className='max-w-[1400px] relative mb-[3.29rem] grid grid-cols-1 md:grid-cols-2 gap-[2rem]'>
            <div className='mb-[2rem] flex-1'>
                <h4 className='text-[3.1rem] leading-[3.64rem] font-extrabold mb-[21.48px]'>
                    Frequently asked questions
                </h4>
                <img className='mb-[15.2px]' src={line} alt="" />
                {/* links  */}
                <div className='w-[60%] flex flex-col gap-[8px]'>
                    <button className='rounded-[20.62px] bg-[#e5f4ff] text-[1.21rem] font-extrabold text-start px-[1.9rem] py-[1.5rem] relative'>Visit FAQ Center <span className="absolute right-[26.6px] top-[1.75rem]"><AiOutlineArrowRight size={27}/></span></button>
                    <button className='rounded-[20.62px] bg-[#e5f4ff] text-[1.21rem] font-extrabold text-start px-[1.9rem] py-[1.5rem] relative'>Visit our blog<span className="absolute right-[26.6px] top-[1.75rem]"><AiOutlineArrowRight size={27}/></span></button>
                    <button className='rounded-[20.62px] bg-[#e5f4ff] text-[1.21rem] font-extrabold text-start px-[1.9rem] relative py-[1.5rem]'>Ask for more help <span className="absolute right-[26.6px] top-[1.75rem]"><AiOutlineArrowRight size={27}/></span></button>
                </div>
            </div>
            <div className='h-full flex flex-col justify-start gap-[8px]'>
            {accordionData.map((item, index) => (
                    <div key={index} onClick={() => toggleAccordion(index)} className="w-full py-[1.41rem] flex flex-col items-center bg-[#e5f4ff] rounded-[8.6px] px-[2.35rem] relative">
                        <button className="absolute top-[1.7rem] right-[2.26rem]">
                            {activeIndex === index ? <BsChevronCompactUp size={27} className="font-bold" /> : <BsChevronCompactDown size={27} className="font-bold" />}
                        </button>
                        <h5 className="font-semibold text-[20.62px] text-start w-full">{item.title}</h5>
                        {activeIndex === index && <p className="text-[1.21rem] text-start mt-[2.63rem]">{item.content}</p>}
                    </div>
                ))}
                
            </div>
        </div>
    )
}

export default FAQ