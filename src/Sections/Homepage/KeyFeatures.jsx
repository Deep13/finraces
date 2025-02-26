import React, { useContext } from 'react'
import cardImage from '../../assets/images/card_video_image.png'
import news_icon from '../../assets/images/news_icon.svg'
import newsdark from '../../assets/images/newsdark.svg'
import KeyFeaturesCard from '../../Components/KeyFeaturesCard'
import stock1 from '../../assets/images/stock11.jpg'
import stock1111 from '../../assets/images/stock1111.jpg'
import crypto from '../../assets/images/crypto.jpg'
import { DarkModeContext } from '../../Contexts/DarkModeProvider'

const keyFeaturesData = [
  {
    id: 1,
    cardImage: cardImage,
    title: 'Create Your Race ',
    description: 'Start by selecting "Create Race," pick your stocks or crypto, assign them predicted ranks and target values, then set the race’s start date and time to kick things off.'
  },
  {
    id: 2,
    cardImage: crypto,
    title: 'Invite or Join the Competition ',
    description: 'Share your race with friends via invite or let others jump in from their dashboard, building a crew of challengers ready to test their financial instincts.'
  },
  {
    id: 3,
    cardImage: stock1,
    title: 'Race in Real Time',
    description: 'Once the race begins at the scheduled time, watch the stocks battle it out based on live market data—ranks shift as values climb or drop, keeping the tension high.'
  },
  {
    id: 4,
    cardImage: stock1111,
    title: 'Win and Climb the Ranks',
    description: 'When the race ends, the user whose predictions for rank and value come closest to the final results takes the victory, earning points and a boost on the leaderboard.'
  },
];




const KeyFeatures = () => {

  const { darkModeEnabled } = React.useContext(DarkModeContext)
  return (
    <div className='max-w-[1400px] relative mb-[5rem] md:mb-[3.29rem]'>
      {/* <a className='absolute right-0 top-2 text-[#8d8d8d] text-[0.94rem] font-semibold hover:underline flex items-center' href="">
        See All <BiChevronRight size={18} />
      </a> */}
      <h2 className='text-[2.14rem] text-center font-bold mb-[1.4rem] dark:text-white'>Key Features</h2>
      {/* info section  */}
      <div className="w-full gap-[22px] mb-[3.5rem]">
        <div className="gap-[23px] grid grid-cols-1 md:grid-cols-2">
          {/* card  */}
          <div className='flex gap-[5rem] px-20'>
            <div className='py-[27.3px] font-medium text-[64px] text-gradient dark:bg-clip-text text-transparent dark:bg-gradient-to-r from-[#66D9FF] to-[#125399]'>01</div>
            <div className='w-[433.1px] h-full flex flex-col gap-[15px] py-[15px]'>
              <p className='text-[19.7px] font-semibold dark:text-white'>Live Market Races</p>
              <p className='text-[15.15px] leading-[30.3px] dark:text-white'>Join real-time competitions where you predict the performance of stocks, crypto, and other assets, racing against others to see who can spot the winners fastest.</p>
            </div>
          </div>
          {/* card  */}
          <div className='flex gap-[5rem] px-20'>
            <div className='py-[27.3px] font-medium text-[64px] text-gradient dark:bg-clip-text text-transparent dark:bg-gradient-to-r from-[#66D9FF] to-[#125399]'>02</div>
            <div className='w-[433.1px] h-full flex flex-col gap-[15px] py-[15px]'>
              <p className='text-[19.7px] font-semibold dark:text-white'>Customizable Leaderboards</p>
              <p className='text-[15.15px] leading-[30.3px] dark:text-white'>Track your ranking, wins, and earnings on dynamic leaderboards tailored to your favourite markets or challenge types, fuelling your competitive edge. </p>
            </div>
          </div>
        </div>
        <div className="gap-[23px] grid grid-cols-1 md:grid-cols-2">
          {/* card  */}
          <div className='flex gap-[5rem] px-20'>
            <div className='py-[27.3px] font-medium text-[64px] text-gradient dark:bg-clip-text text-transparent dark:bg-gradient-to-r from-[#66D9FF] to-[#125399]'>03</div>
            <div className='w-[433.1px] h-full flex flex-col gap-[15px] py-[15px]'>
              <p className='text-[19.7px] font-semibold dark:text-white'>Prize Pools & Rewards</p>
              <p className='text-[15.15px] leading-[30.3px] dark:text-white'>Win cash, crypto, or exclusive perks by outpacing opponents in daily, weekly, or special event races tied to market movements. </p>
            </div>
          </div>
          {/* card  */}
          <div className='flex gap-[5rem] px-20'>
            <div className='py-[27.3px] font-medium text-[64px] text-gradient dark:bg-clip-text text-transparent dark:bg-gradient-to-r from-[#66D9FF] to-[#125399]'>04</div>
            <div className='w-[433.1px] h-full flex flex-col gap-[15px] py-[15px]'>
              <p className='text-[19.7px] font-semibold dark:text-white'>Strategy Playboo</p>
              <p className='text-[15.15px] leading-[30.3px] dark:text-white'>Access tools and insights to sharpen your predictions, from market trends to historical data, turning financial know-how into race-ready tactics. </p>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full rounded-[10px] bg-[#e5f4ff] px-[1.56rem] pt-[1.18rem] mb-[3rem] dark:bg-transparent dark:border dark:border-white'>
        <div className='flex gap-[10px] mb-[2.1rem]'>
          <img src={darkModeEnabled ? newsdark : news_icon} alt="video to show How does it work" />
          <h3 className='text-[2rem] font-semibold dark:text-white'>How does it work ?</h3>
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