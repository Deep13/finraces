import React from 'react'
import cardImage from '../../assets/images/card_video_image.png'
import news_icon from '../../assets/images/news_icon.svg'
import KeyFeaturesCard from '../../Components/KeyFeaturesCard'
import { BiChevronRight } from "react-icons/bi"; 

const KeyFeatures = () => {
  return (
    <div className='max-h-[1400px] relative mb-[5rem] md:mb-[3.29rem]'>
      <a className='absolute right-0 top-2 text-[#8d8d8d] text-[0.94rem] font-semibold hover:underline flex items-center' href="">
            See All <BiChevronRight size={18} />
      </a>
      <h2 className='text-[2.14rem] text-center font-bold mb-[1.4rem]'>Key Features</h2>
      {/* info section  */}
      <div className="w-full gap-[22px] mb-[3.5rem]">
        <div className="gap-[23px] grid grid-cols-1 md:grid-cols-2">
          {/* card  */}
          <div className='flex gap-[23px]'>
            <div className='py-[27.3px] flex-1 font-medium text-[64px] text-gradient'>01</div>
            <div className='w-[433.1px] h-full flex flex-col gap-[15px] py-[15px]'>
              <p className='text-[19.7px] font-semibold'>AI Powered:</p>
              <p className='text-[15.15px] leading-[30.3px]'>Lorem ipsum dolor sit amet consectetur. Lectus lobortis bibendum erat purus ut pharetra in massa elementum.  </p>
            </div>
          </div>
          {/* card  */}
          <div className='flex gap-[23px]'>
            <div className='py-[27.3px] flex-1 font-medium text-[64px] text-gradient'>02</div>
            <div className='w-[433.1px] h-full flex flex-col gap-[15px] py-[15px]'>
              <p className='text-[19.7px] font-semibold'>Intuitive Dashboard</p>
              <p className='text-[15.15px] leading-[30.3px]'>Manage your resources with a user-friendly interface that puts you in control.  </p>
            </div>
          </div>
        </div>
        <div className="gap-[23px] grid grid-cols-1 md:grid-cols-2">
          {/* card  */}
          <div className='flex gap-[23px]'>
            <div className='py-[27.3px] flex-1 font-medium text-[64px] text-gradient'>03</div>
            <div className='w-[433.1px] h-full flex flex-col gap-[15px] py-[15px]'>
              <p className='text-[19.7px] font-semibold'>Customizable Solutions</p>
              <p className='text-[15.15px] leading-[30.3px]'>Tailor the cloud experience to meet your specific needs with flexible plans and options.  </p>
            </div>
          </div>
          {/* card  */}
          <div className='flex gap-[23px]'>
            <div className='py-[27.3px] flex-1 font-medium text-[64px] text-gradient'>04</div>
            <div className='w-[433.1px] h-full flex flex-col gap-[15px] py-[15px]'>
              <p className='text-[19.7px] font-semibold'>Advanced</p>
              <p className='text-[15.15px] leading-[30.3px]'> Gain valuable insights with powerful analytics tools designed to help you make data-driven decisions.</p>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full rounded-[10px] bg-[#e5f4ff] px-[1.56rem] pt-[1.18rem] mb-[3rem]'>
        <div className='flex gap-[10px] mb-[2.1rem]'>
          <img src={news_icon} alt="video to show How does it work" />
          <h3 className='text-[1.25rem] font-medium'>How does it work ?</h3>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-[36px] pb-[48px]'>
          {/* here will be the cards */}
          {/* card */}
          <KeyFeaturesCard />
          <KeyFeaturesCard />
          <KeyFeaturesCard />
          <KeyFeaturesCard />
        </div>
      </div>

    </div>
  )
}

export default KeyFeatures