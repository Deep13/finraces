import React from 'react'
import stocks from '../assets/images/stonks.svg'

const UpcomingRaceCardHomepage = () => {
  return (
    <div className='rounded-[15px] bg-[#E5f4ff] w-[534px] h-auto pl-[30px] px-[38px] pt-[31px] pb-[24.92px]'>
        <div className='w-full flex justify-between items-center mb-[5px]'>
            <div className='flex justify-between'>
                <p className='font-bold text-[20px]'>Race will start at 2PM</p>
            </div>
            <div className='flex gap-[6px] items-center'>
                <img src={stocks} alt="stocks images" />
                <p className='font-semibold text-[16px] text-[#b5b5b5]'>+10</p>
            </div>
        </div>
        <div className='flex flex-col gap-[5px] mb-[14px]'>
            <p className='text-[12px] font-bold'>1.2k Participants</p>
            <p className='text-[12px]'>Duration 10Min</p>
        </div>
        <p className='text-[14px] mb-[43.51px]'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        </p>
        <div className='flex gap-[20px]'>
            <button className='px-[19px] py-[10px] text-[14px] font-normal rounded-[25px] border borer-[0.76px] border-black'>Join</button>
            <button className='px-[19px] py-[10px] text-[14px] font-normal rounded-[25px] border borer-[0.76px] border-black'>View Details</button>
        </div>
    </div>
  )
}

export default UpcomingRaceCardHomepage