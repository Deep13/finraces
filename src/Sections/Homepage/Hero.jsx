import React from 'react'
import coin1 from '../../assets/images/Hero/Coins1.png'
import coin2 from '../../assets/images/Hero/Coins2.png'
import person from '../../assets/images/Excited_person_image.png'
import finraces from "../../assets/videos/Finraces.mp4"

const Hero = () => {
  return (
    <div className='max-w-[1400px] dark:bg-gradient-to-l dark:from-[rgba(0,0,0,0.25)] dark:to-[#0a0d2b] h-auto pt-[2.2rem] px-[2.52rem] hero-gradient mb-[3.3rem] grid md:grid-cols-2 gird-cols-1 rounded-lg dark:border dark:border-[#00387E]'>
      <div className='py-[1.76rem] flex-1 flex flex-col col-span-1 order-2 md:order-1'>
        <h1 className='text-[3.8rem] font-bold leading-[55px] mb-[5rem] dark:text-white'>Finraces: Where Wealth Meets the Finish Line</h1>
        <p className='text-[1.3rem] mb-[1rem] dark:text-white'>Compete, Predict, and Profit in the Ultimate Financial Race.</p>
        {/* <p className='text-[0.94rem] mb-[1.6rem] pr-[8rem] dark:text-white'>We provide you with the best prices, the highest quality most reliable supors.</p> */}
        {/* <button onClick={() => {
          window.scrollTo(0,0)
        }} className='w-[8.9rem] dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] dark:text-white font-bold text-[0.82rem] px-[2rem] py-[0.82rem] border border-black bg-[#e5f4ff] rounded-[33px]'>Learn More</button> */}
      </div>

      <div className='flex overflow-visible justify-end items-center col-span-1 order-1 md:order-2'>
        {/* <img src={person} alt="" /> */}
        <div className="w-full aspect-w-16 rounded-lg overflow-hidden mb-10">
          <video
            autoPlay
            loop
            muted
            controls=""
            width="100%"
          >
            <source src={finraces} type="video/mp4" />
            Your browser does not support the video tag.

          </video>
          {/* <iframe
          src="https://www.veed.io/embed/43102a89-b158-4f70-b8a5-8138a7058b98?title=0&autoplay=1&loop=1&controls=0"
          frameBorder="0"
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          title="Finraces Video"
        ></iframe> */}

        </div>

      </div>
    </div>
  )
}

export default Hero