import React from 'react'
import shape from '../assets/images/Footer/shape.svg'
import fb from '../assets/images/fb.svg'
import g from '../assets/images/g.svg'
import Youtube from '../assets/images/Youtube.svg'
import insta from '../assets/images/insta.svg'
import whatsapp from '../assets/images/whatsapp.svg'
import telegram from '../assets/images/telegram.svg'



const Footer = () => {
  return (
    <footer className='w-full bg-[#e5f4ff] gap-[1.9rem] grid grid-cols-1 md:grid-cols-2 pt-[2.8rem] px-[5%] relative'>
      <div className='absolute bottom-0 left-0 w-full'>
        <img className='w-[34.23rem]' src={shape} alt="shape" />
      </div>

      {/* first column  */}
      <div className='w-[34.23rem] h-full relative'>
        <h5 className='text-[1rem] mb-[1rem] font-semibold'>Navigation</h5>
        <div className='flex w-full gap-[5.64rem]'>
          <div className='flex flex-col gap-[6px]'>
            <p className='text-[0.82rem]'>Lorem, ipsum</p>
            <p className='text-[0.82rem]'>Lorem, ipsum</p>
            <p className='text-[0.82rem]'>Lorem, ipsum</p>
            <p className='text-[0.82rem]'>Lorem, ipsum</p>
            <p className='text-[0.82rem]'>Lorem, ipsum</p>
            <p className='text-[0.82rem]'>Lorem, ipsum</p>
          </div>
          <div className='flex flex-col gap-[6px]'>
            <p className='text-[0.82rem]'>Lorem, ipsum</p>
            <p className='text-[0.82rem]'>Lorem, ipsum</p>
            <p className='text-[0.82rem]'>Lorem, ipsum</p>
          </div>
        </div>
        {/* copyrights  */}
        {/* <div className='absolute left-0 bottom-0 flex flex-col gap-[5px]'>
          <p className='text-[0.9rem]'>Copyright</p>
          <p className='text-[0.9rem]'>Privacy</p>
          <p className='text-[0.9rem]'>All rights reserved</p>
        </div> */}
      </div>

      {/* second column  */}
      <div className='w-[34rem] h-full flex flex-col gap-[3.77rem] relative pb-[3rem]'>
        <h5 className='text-[1rem] mb-[1rem] font-semibold'>Contact us</h5>
        <div className='flex w-full gap-[5.64rem]'>
          <div className='flex flex-col gap-[6px]'>
            <p className='text-[0.82rem]'>+1 (406) 555-0120</p>
            <p className='text-[0.82rem]'>+1 (406) 555-0120</p>
          </div>
          <div className='flex flex-col gap-[6px]'>
            <p className='text-[0.82rem]'>hello@logoipsum.com</p>
          </div>
        </div>

        {/* 64 px GAP HERE  */}

        <div className='w-full gap-[5.64rem] grid grid-cols-1 lg:grid-cols-2'>
          <div className='flex flex-col gap-[6px]'>
            <h5 className='text-[1rem] mb-[1.4rem] font-semibold'>follow us</h5>
            <div className='w-full flex gap-[10px]'>
              <img src={fb} alt="" />
              <img src={g} alt="" />
              <img src={insta} alt="" />
              <img src={Youtube} alt="" />
            </div>
          </div>
          <div className='flex flex-col gap-[6px]'>
            <h5 className='text-[1rem] mb-[1.4rem] text-start font-semibold'>Lets chat</h5>
            <div className='flex gap-[10px]'>
              <img src={telegram} alt="" />
              <img src={whatsapp} alt="" />
            </div>
          </div>
        </div>

        {/* 64 px GAP HERE  */}

        <div className='flex w-full gap-[5.64rem]'>
          <div className='flex flex-col gap-[6px]'>
            <h5 className='text-[1rem] mb-[1.4rem] font-semibold'>Location</h5>
            <div className='text-[0.82rem]'>
              2259 Westheimer Rd. Santa Ana, Illinois 85486
            </div>
          </div>
        </div>

        {/* copyrights  */}
        <div className='absolute left-0 bottom-0 flex flex-col gap-[5px]'>
          <p className='text-[0.9rem]'>© 2024 — Logoipsum</p>
        </div>
      </div>

    </footer>
  )
}

export default Footer