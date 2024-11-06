import React from 'react'
import fb from '../assets/images/facebook.svg'

const StockPriceCard = () => {
  return (
    <div className='h-auto w-[11rem] rounded-[10px] py-[0.9rem] px-[0.8rem] border border-solid border-[#e1e4e5] shadow-lg flex flex-col gap-[0.7rem] flex-shrink-0'>
        <div className='flex justify-between w-full items-center'>
            <div className='font-semibold text-[1.1rem]'>1. Facebook</div>
            <div>
                <img src={fb} alt="" />
            </div>
        </div>
        <p className='font-semibold text-[0.9rem]'>facebook.com</p>
        <p className='text-[1.3rem] font-medium'>$229.51</p>
        <p className='font-semibold text-[0.9rem] text-[#15af4d]'>50%</p>
    </div>
  )
}

export default StockPriceCard