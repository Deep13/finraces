import React from 'react'
import box from '../assets/images/ongoingRaces/focus_box.svg'
import info from '../assets/images/ongoingRaces/info_icon.svg'

const RaceCardHomepage = () => {
  return (
    <div className='w-[29.7rem] h-[23.7rem] rounded-[24px] border border-black px-[1.1rem] py-[1rem] bg-[#edf7ff]'>
        <div className='w-full flex justify-between'>
            <div className='flex gap-[0.76rem]'>
                <img src={box} alt="box icon" />
                <div className='h-full'>
                    <h3 className='text-[1.05rem] font-bold'>Race Card</h3>
                    <p className='text-[0.7rem]'>XYZ</p>
                </div>
                <div className='relative top-1'>
                    <img src={info} alt="info icon" />
                </div>
            </div>
              <div className='h-full flex flex-col justify-between items-end'>
                  <h3 className='text-[1.05rem] font-bold'>Tech Stocks</h3>
                  <p className='text-[0.7rem]'>20 Participants</p>
              </div>
        </div>
    </div>
  )
}

export default RaceCardHomepage