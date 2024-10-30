import React from 'react'
import shape from '../assets/images/Footer/shape.svg' 


const Footer = () => {
  return (
    <footer className='w-full h-[37.05rem] bg-[#e5f4ff] flex gap-[1.9rem] justify-center items-center pt-[2.8rem] relative'>
      <div className='absolute bottom-0 left-0 w-full'>
        <img className='w-[34.23rem]' src={shape} alt="shape" />
      </div>

      {/* first column  */}
        <div className='w-[34.23rem] h-full relative'>
            <h5 className='text-[0.5rem] mb-[1rem]'>Navigation</h5>
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
            <div className='absolute left-0 bottom-0 flex flex-col gap-[5px]'>
              <p className='text-[0.7rem]'>Copyright</p>
              <p className='text-[0.7rem]'>Privacy</p>
              <p className='text-[0.7rem]'>All rights reserved</p>
            </div>
        </div>

        {/* second column  */}
        <div className='w-[34rem] h-full flex flex-col gap-[3.77rem] relative'>
            <h5 className='text-[0.5rem] mb-[1rem]'>Contact us</h5>
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

            <div className='flex w-full gap-[5.64rem]'>
              <div className='flex flex-col gap-[6px]'>
                <h5 className='text-[0.5rem] mb-[1.4rem]'>follow us</h5>
                <div>

                </div>
              </div>
              <div className='flex flex-col gap-[6px]'>
                <h5 className='text-[0.5rem] mb-[1.4rem] text-center'>Lets chat</h5>
                <p className='text-[0.82rem]'>hello@logoipsum.com</p>
              </div>
            </div>

            {/* 64 px GAP HERE  */}

            <div className='flex w-full gap-[5.64rem]'>
              <div className='flex flex-col gap-[6px]'>
                <h5 className='text-[0.5rem] mb-[1.4rem]'>Location</h5>
                <div className='text-[0.82rem]'>
                  2259 Westheimer Rd. Santa Ana, Illinois 85486 
                </div>
              </div>
            </div>

            {/* copyrights  */}
            <div className='absolute left-0 bottom-0 flex flex-col gap-[5px]'>
          <p className='text-[0.7rem]'>© 2024 — Logoipsum</p>
            </div>
        </div>

    </footer>
  )
}

export default Footer