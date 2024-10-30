import React from 'react'
import ProfileCardHomepage from '../../Components/ProfileCardHomepage'

const Leaderboard = () => {
  return (
        <div className='w-full relative mb-[3.29rem]'>
            <a className='absolute right-0 top-2 text-[#8d8d8d] text-[0.94rem] font-semibold hover:underline' href="">
            See All >
            </a>
            <h2 className='text-[2.14rem] text-center font-bold mb-[1.4rem]'>LeaderBoard</h2>
            {/* Tab layout  */}
          <div className='w-full gap-[0.7rem] flex justify-center items-center mb-[1.4rem]'>
               <button className='flex justify-center items-center w-[9rem] py-[0.76rem] rounded-[70px] shadow-xl font-semibold text-[0.94rem] bg-[#e5f4ff]'>
                Tech Stocks
               </button>
               <button className='flex justify-center items-center w-[9rem] py-[0.76rem] rounded-[70px] shadow-xl font-semibold text-[0.94rem]'>
                NFT
               </button>
               <button className='flex justify-center items-center w-[9rem] py-[0.76rem] rounded-[70px] shadow-xl font-semibold text-[0.94rem]'>
                Crypto
               </button>
               <button className='flex justify-center items-center w-[9rem] py-[0.76rem] rounded-[70px] shadow-xl font-semibold text-[0.94rem]'>
                Finance
               </button>
               <button className='flex justify-center items-center w-[9rem] py-[0.76rem] rounded-[70px] shadow-xl font-semibold text-[0.94rem]'>
                Agro
               </button>
            </div>

            {/* Top players profile cards  */}
            <div className='bg-[#e5f4ff] w-full rounded-[20px] flex justify-center items-center gap-[1.3rem] px-[1.3rem] py-[1.11rem]'>
                <ProfileCardHomepage isFirst />
                <ProfileCardHomepage/>
                <ProfileCardHomepage/>
                <ProfileCardHomepage/>
            </div>
        </div>
  )
}

export default Leaderboard