import React from 'react'
import stonks2 from '../../assets/images/stonks2.png'
import Person from '../../assets/images/person2.png'
import coin2 from '../../assets/images/coin2.png'
import diamond from '../../assets/images/diamondIcon.svg'
import { FiArrowUpRight } from 'react-icons/fi'
import StockWatchlistCard from '../../Components/StockWatchlistCard'

const GuestOrLoggedOutHero = () => {
    return (
        <>
            <div className='max-w-[1400px] dark:bg-gradient-to-l dark:from-[rgba(0,0,0,0.25)] dark:to-[#0a0d2b] h-auto py-[2.2rem] px-[2.52rem] hero-gradient mb-[3.3rem] grid md:grid-cols-2 gird-cols-1 rounded-lg dark:border dark:border-[#00387E]'>
                <div className='py-[1.76rem] flex-1 flex flex-col col-span-1 order-2 md:order-1 justify-center gap-4 items-start pl-4'>
                    <h1 className='md:text-[2.35rem] text-[2rem] font-bold leading-10 mb-[1rem] dark:text-[#5988FF] '>Welcome Back !</h1>
                    <p className='text-[0.94rem] mb-[1rem] dark:text-white'>Continue where you left</p>
                    {/* <p className='text-[0.94rem] mb-[1.6rem] pr-[8rem] dark:text-white'>We provide you with the best prices, the highest quality most reliable supors.</p> */}
                    <div className='flex gap-4'>
                        <button className='w-[8.9rem] dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] dark:text-white font-bold text-[0.82rem] px-[2rem] py-[0.82rem] border border-black bg-[#e5f4ff] rounded-[33px]'>Create Race</button>
                        <button className='w-[8.9rem] bg-transparent dark:text-white font-bold text-[0.82rem] px-[2rem] py-[0.82rem] border border-[#00387E] bg-[#e5f4ff] rounded-[33px]'>Join Race</button>
                    </div>
                </div>

                <div className='flex-1  overflow-hidden col-span-2  md:col-span-1 order-1 md:order-2'>
                    <img className='w-full h-full object-cover' src={stonks2} alt="" />
                </div>
            </div>

            <div className='max-w-[1400px] px-[4rem] h-[9.3rem] rounded-lg  mb-[3.3rem] flex gap-[2.8rem] justify-center'>
                <div className='rounded-xl overflow-hidden w-[10rem]'>
                    <img src={Person} alt="" />
                </div>

                <div className='bg-white rounded-lg p-[1.5rem] flex flex-col gap-[0.75rem] dark:bg-transparent dark:border dark:border-[#00387E] justify-center'>
                    <p className="font-semibold text-[2rem] dark:text-white">Brut Macklin</p>
                    <div className="self-start flex gap-4">
                        {/* XP card here  */}
                        <div className="py-[0.5rem] px-[0.8rem] bg-slate-200 rounded-xl flex gap-[7px] dark:bg-[#002763] dark:text-white">
                            <div>
                                <img src={coin2} alt="" />
                            </div>
                            <div className="font-semibold text-[0.9rem] flex flex-col">
                                <p className="font-semibold text-[0.9rem]">Community Ambassador</p>
                                <p className="font-semibold text-[0.9rem]">250 XP</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-span-1 row-span-1 bg-white rounded-lg p-[1.5rem] flex gap-8 dark:bg-transparent dark:border dark:border-[#00387E] items-center">
                    {/* <div className='h-full'>
                        <img src={diamond} alt="" />
                    </div> */}
                    <div className='flex flex-col gap-[8px] py-4'>
                        <p className='text-[1rem] dark:text-[#D1D1D1]'>Last Race</p>
                        <p className='text-[1.5rem] dark:text-white font-bold'>1st google</p>
                        <div className='flex font-semibold gap-2 rounded-full bg-[#6BEBA4] bg-opacity-20  justify-start self-start items-center px-2 py-1'>
                            <FiArrowUpRight color="green" size={15} />
                            <p className="text-[#6BEBA4]">4.8%</p>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 row-span-1 bg-white rounded-lg p-[1.5rem] flex gap-8 dark:bg-transparent dark:border dark:border-[#00387E] items-center">
                    <div className='h-full'>
                        <img src={diamond} alt="" />
                    </div>
                    <div className='flex flex-col gap-[8px]'>
                        <p className='text-[1rem] dark:text-white'>Total Points</p>
                        <p className='text-[1.5rem] dark:text-white'>15,000,000</p>
                        <div className='flex font-semibold gap-2 rounded-full bg-opacity-20 bg-[#6BEBA4] justify-start self-start items-center px-2 py-1'>
                            <FiArrowUpRight color="green" size={15} />
                            <p className="text-[#6BEBA4]">4.8%</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mb-[3.3rem] max-w-[1400px]'>
                <h2 className='text-[2.14rem] text-center font-bold mb-[1.4rem] dark:text-white'>Your Watchlist</h2>
                <div className='w-full flex gap-[10px] justify-center'>
                    <StockWatchlistCard />
                    <StockWatchlistCard />
                    <StockWatchlistCard />
                    <StockWatchlistCard />
                    <StockWatchlistCard />
                </div>
            </div>
        </>
    )
}

export default GuestOrLoggedOutHero