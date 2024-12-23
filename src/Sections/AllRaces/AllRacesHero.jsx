import React, { useContext } from 'react'
import stonks2 from '../../assets/images/bulls.png'
import { DarkModeContext } from '../../Contexts/DarkModeProvider'


const AllRacesHero = () => {
    const { setCreateRace } = useContext(DarkModeContext)
    return (
        <div className='max-w-[1400px] dark:bg-gradient-to-l dark:from-[rgba(0,0,0,0.25)] dark:to-[#0a0d2b] h-auto py-[2.2rem] px-[2.52rem] hero-gradient mb-[3.3rem] grid md:grid-cols-2 gird-cols-1 rounded-lg dark:border dark:border-[#00387E]'>
            <div className='py-[1.76rem] flex-1 flex flex-col col-span-1 order-2 md:order-1 justify-center gap-4 items-start pl-4'>
                <h1 className='md:text-[2.35rem] text-[2rem] font-bold leading-10 mb-[1rem] dark:text-white '>Simplifying Direct Stock
                    Investing for You</h1>
                {/* <p className='text-[0.94rem] mb-[1rem] dark:text-white'>Continue where you left</p> */}
                {/* <p className='text-[0.94rem] mb-[1.6rem] pr-[8rem] dark:text-white'>We provide you with the best prices, the highest quality most reliable supors.</p> */}
                <div className='flex gap-4'>
                    <button onClick={() => setCreateRace(true)} className='w-[8.9rem] dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] dark:text-white font-bold text-[0.82rem] px-[2rem] py-[0.82rem] border border-black bg-[#e5f4ff] rounded-[33px]'>Create Race</button>
                    {/* <button className='w-[8.9rem] bg-transparent dark:text-white font-bold text-[0.82rem] px-[2rem] py-[0.82rem] border border-[#00387E] bg-[#e5f4ff] rounded-[33px]'>Join Race</button> */}
                </div>
            </div>

            <div className='flex-1  overflow-hidden col-span-2  md:col-span-1 order-1 md:order-2'>
                <img className='w-full h-full object-cover' src={stonks2} alt="" />
            </div>
        </div>
    )
}

export default AllRacesHero