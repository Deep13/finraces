import React from 'react'
import coin1 from '../../assets/images/Hero/Coins1.png'
import coin2 from '../../assets/images/Hero/Coins2.png'
import person from '../../assets/images/Excited_person_image.png'

const Hero = () => {
  return (
    <div className='max-w-[1400px] h-auto py-[2.2rem] px-[2.52rem] hero-gradient mb-[3.3rem] grid md:grid-cols-2 gird-cols-1'>
        <div className='py-[1.76rem] flex-1 flex flex-col col-span-1 order-2 md:order-1'>
              <h1 className='text-[2.35rem] font-bold leading-10 mb-[1rem]'>Simplifying Direct Stock Investing for You</h1>
              <p className='text-[0.94rem] mb-[1rem]'>Explore community-driven stock ideas and receive expert recommendations from SEC Registered professionals.</p>
              <p className='text-[0.94rem] mb-[1.6rem] pr-[8rem]'>We provide you with the best prices, the highest quality most reliable supors.</p>
              <button className='w-[8.9rem] font-bold text-[0.82rem] px-[2rem] py-[0.82rem] border border-black bg-[#e5f4ff] rounded-[33px]'>Learn More</button>
        </div>

        <div className='flex-1 relative overflow-visible md:relative md:top-9 col-span-1 order-1 md:order-2'>
            <img  src={person} alt="" />
        </div>
    </div>
  )
}

export default Hero