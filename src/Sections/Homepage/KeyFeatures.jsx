import React from 'react'
import cardImage from '../../assets/images/card_video_image.png'
import news_icon from '../../assets/images/news_icon.svg'
import KeyFeaturesCard from '../../Components/KeyFeaturesCard'
import stock1 from '../../assets/images/stock11.jpg'
import stock1111 from '../../assets/images/stock1111.jpg'
import crypto from '../../assets/images/crypto.jpg'

const keyFeaturesData = [
  {
    id: 1,
    cardImage: cardImage,
    title: 'Simplified Workflows',
    description: 'Discover how our system simplifies workflows with a step-by-step process designed for efficiency.'
  },
  {
    id: 2,
    cardImage: crypto,
    title: 'Benefits of Automation',
    description: 'Learn the key benefits of automation to save time and reduce errors in daily operations.'
  },
  {
    id: 3,
    cardImage: stock1,
    title: 'Real-Time Monitoring',
    description: 'Explore the advanced tools available for real-time monitoring and analytics.'
  },
  {
    id: 4,
    cardImage: stock1111,
    title: 'Seamless Integration',
    description: 'Gain insights on how to integrate our platform seamlessly into your existing systems.'
  },
];




const KeyFeatures = () => {
  return (
    <div className='max-h-[1400px] relative mb-[5rem] md:mb-[3.29rem]'>
      {/* <a className='absolute right-0 top-2 text-[#8d8d8d] text-[0.94rem] font-semibold hover:underline flex items-center' href="">
        See All <BiChevronRight size={18} />
      </a> */}
      <h2 className='text-[2.14rem] text-center font-bold mb-[1.4rem] dark:text-white'>Key Features</h2>
      {/* info section  */}
      <div className="w-full gap-[22px] mb-[3.5rem]">
        <div className="gap-[23px] grid grid-cols-1 md:grid-cols-2">
          {/* card  */}
          <div className='flex gap-[23px]'>
            <div className='py-[27.3px] flex-1 font-medium text-[64px] text-gradient dark:bg-clip-text text-transparent dark:bg-gradient-to-r from-[#66D9FF] to-[#125399]'>01</div>
            <div className='w-[433.1px] h-full flex flex-col gap-[15px] py-[15px]'>
              <p className='text-[19.7px] font-semibold dark:text-white'>AI Powered:</p>
              <p className='text-[15.15px] leading-[30.3px] dark:text-white'>Lorem ipsum dolor sit amet consectetur. Lectus lobortis bibendum erat purus ut pharetra in massa elementum.  </p>
            </div>
          </div>
          {/* card  */}
          <div className='flex gap-[23px]'>
            <div className='py-[27.3px] flex-1 font-medium text-[64px] text-gradient dark:bg-clip-text text-transparent dark:bg-gradient-to-r from-[#66D9FF] to-[#125399]'>02</div>
            <div className='w-[433.1px] h-full flex flex-col gap-[15px] py-[15px]'>
              <p className='text-[19.7px] font-semibold dark:text-white'>Intuitive Dashboard</p>
              <p className='text-[15.15px] leading-[30.3px] dark:text-white'>Manage your resources with a user-friendly interface that puts you in control.  </p>
            </div>
          </div>
        </div>
        <div className="gap-[23px] grid grid-cols-1 md:grid-cols-2">
          {/* card  */}
          <div className='flex gap-[23px]'>
            <div className='py-[27.3px] flex-1 font-medium text-[64px] text-gradient dark:bg-clip-text text-transparent dark:bg-gradient-to-r from-[#66D9FF] to-[#125399]'>03</div>
            <div className='w-[433.1px] h-full flex flex-col gap-[15px] py-[15px]'>
              <p className='text-[19.7px] font-semibold dark:text-white'>Customizable Solutions</p>
              <p className='text-[15.15px] leading-[30.3px] dark:text-white'>Tailor the cloud experience to meet your specific needs with flexible plans and options.  </p>
            </div>
          </div>
          {/* card  */}
          <div className='flex gap-[23px]'>
            <div className='py-[27.3px] flex-1 font-medium text-[64px] text-gradient dark:bg-clip-text text-transparent dark:bg-gradient-to-r from-[#66D9FF] to-[#125399]'>04</div>
            <div className='w-[433.1px] h-full flex flex-col gap-[15px] py-[15px]'>
              <p className='text-[19.7px] font-semibold dark:text-white'>Advanced</p>
              <p className='text-[15.15px] leading-[30.3px] dark:text-white'> Gain valuable insights with powerful analytics tools designed to help you make data-driven decisions.</p>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full rounded-[10px] bg-[#e5f4ff] px-[1.56rem] pt-[1.18rem] mb-[3rem] dark:bg-transparent dark:border dark:border-white'>
        <div className='flex gap-[10px] mb-[2.1rem]'>
          <img src={news_icon} alt="video to show How does it work" />
          <h3 className='text-[1.25rem] font-medium dark:text-white'>How does it work ?</h3>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-[36px] pb-[48px]'>
          {/* here will be the cards */}
          {/* card */}
          {
            keyFeaturesData.map(curr => (
              <KeyFeaturesCard
                key={curr.id}
                title={curr.title}
                cardImage={curr.cardImage}
                description={curr.description}
              />)
            )
          }
        </div>
      </div>

    </div>
  )
}

export default KeyFeatures