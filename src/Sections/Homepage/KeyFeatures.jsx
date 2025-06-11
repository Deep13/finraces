import React from 'react'
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
    <div className='max-w-[1400px] mx-auto relative mb-20 md:mb-14 px-4 md:px-8 lg:px-12'>
      <h2 className='text-3xl md:text-4xl font-bold text-center mb-6 dark:text-white'>Key Features</h2>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 mb-12">
        {[{
          number: '01',
          title: 'Live Market Races',
          description: 'Join real-time competitions where you predict the performance of stocks, crypto, and other assets, racing against others to see who can spot the winners fastest.'
        }, {
          number: '02',
          title: 'Customizable Leaderboards',
          description: 'Track your ranking, wins, and earnings on dynamic leaderboards tailored to your favourite markets or challenge types, fuelling your competitive edge.'
        }, {
          number: '03',
          title: 'Prize Pools & Rewards',
          description: 'Win cash, crypto, or exclusive perks by outpacing opponents in daily, weekly, or special event races tied to market movements.'
        }, {
          number: '04',
          title: 'Strategy Playbook',
          description: 'Access tools and insights to sharpen your predictions, from market trends to historical data, turning financial know-how into race-ready tactics.'
        }].map(({ number, title, description }) => (
          <div key={number} className='flex gap-6 md:gap-10 items-start'>
            <div className='text-5xl md:text-6xl font-medium text-gradient dark:bg-clip-text text-transparent dark:bg-gradient-to-r from-[#66D9FF] to-[#125399]'>
              {number}
            </div>
            <div className='flex-1'>
              <p className='text-lg md:text-xl font-semibold dark:text-white'>{title}</p>
              <p className='text-sm md:text-base leading-6 md:leading-7 dark:text-white'>{description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* How does it work? */}
      <div className='w-full rounded-xl bg-[#e5f4ff] px-6 py-6 md:px-8 md:py-8 dark:bg-transparent dark:border dark:border-white'>
        <div className='flex items-center gap-4 mb-6'>
          <img src={darkModeEnabled ? newsdark : news_icon} alt="News Icon" className="w-8 h-8" />
          <h3 className='text-xl md:text-2xl font-semibold dark:text-white'>How does it work?</h3>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {keyFeaturesData.map(curr => (
            <KeyFeaturesCard
              key={curr.id}
              title={curr.title}
              cardImage={curr.cardImage}
              description={curr.description}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default KeyFeatures
