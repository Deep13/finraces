import { CgChevronRightO } from "react-icons/cg"; 
import React from 'react'
import compass from '../assets/icons/sidebar/compass.svg'
import finance_idea from '../assets/icons/sidebar/finance_idea.svg'
import stats from '../assets/icons/sidebar/stats.svg'
import live_streaming from '../assets/icons/sidebar/live_streaming.svg'
import forward from '../assets/icons/sidebar/forward.svg'
import eth from '../assets/icons/sidebar/eth.svg'
import recent from '../assets/icons/sidebar/recent.svg'
import UserRankingCard from "../Components/UserRankingCard";
import box from '../assets/images/ongoingRaces/focus_box.svg'
import info from '../assets/images/ongoingRaces/info_icon.svg'
import start from '../assets/images/start.svg'
import finish from '../assets/images/finish.svg'
import StockPriceCard from "../Components/StockPriceCard";
import golden_frame from '../assets/images/golden_frame.png'
import silver_frame from '../assets/images/silver_frame.png'
import bronze_frame from '../assets/images/bronze_frame.png'
import golden_king_corwn from '../assets/images/golden_king_corwn.svg'
import silver_king_crown from '../assets/images/silver_king_crown.svg'
import bronze_king_crown from '../assets/images/bronze_king_crown.svg'
import Polygon7 from '../assets/images/Polygon7.svg'
import Person from '../assets/images/person2.png'
import diamond from '../assets/images/kerechi_diamondo.png'

const RacePage = () => {
    return (
        <div className='w-full relative overflow-auto flex pb-8'>
            {/* Ensure sidebar is inside a container with sufficient height */}
            <div className="w-[4rem] flex-shrink-0 relative left-4 z-[9]"> {/* Prevent sidebar from flexing */}
                <div className={`sticky top-24 left-6 transition-transform ease-out duration-300 flex flex-col gap-[0.7rem] z-[10]`}>
                    <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                        <img src={compass} alt="discover" />
                        Discover
                    </button>
                    <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                        <img src={stats} alt="stocks" />
                        Stocks
                    </button>
                    <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                        <img src={eth} alt="crypto" />
                        Crypto
                    </button>
                    <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                        <img src={live_streaming} alt="live races" />
                        Live Races
                    </button>
                    <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                        <img src={recent} alt="upcoming races" />
                        Upcoming Races
                    </button>
                    <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                        <img src={finance_idea} alt="my races" />
                        My Races
                    </button>
                    <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                        <img src={forward} alt="my watchlist" />
                        My Watchlist
                    </button>
                </div>
            </div>

            {/* dashboard  */}
            <div className='flex-1 px-[2%] md:px-[6%] pt-[2.1rem] flex justify-center h-auto'> 
                {/* this is full width container cuz we need the sidebar to remain at correct place */}
                <div className='max-w-[1400px] w-full py-[11px] px-[20px] flex gap-[15px] rounded-[24px] bg-[#faebff]'>

                    {/* actual dashboard  */}
                    <div className='flex-1 px-[22px] py-[18px]'>
                        
                        <div className='w-full flex justify-between mb-[3.8rem]'>
                            <div className='flex gap-[0.76rem]'>
                                <img src={box} alt="box icon" />
                                <div className='h-full'>
                                    <h3 className='text-[1.05rem] font-bold'>Race Card</h3>
                                    <p className='text-[0.7rem]'>Remaining time <span className="font-semibold">6.55</span></p>
                                </div>
                                <div className='relative top-1'>
                                    <img src={info} alt="info icon" />
                                </div>
                            </div>
                            <div className='h-full flex flex-col justify-between items-end'>
                                <h3 className='text-[1.05rem] font-bold'>Tech Stocks</h3>
                                <p className='text-[0.7rem]'>20 Participants</p>
                            </div>
                        </div>

                        {/* top 3 users  */}
                        <div className="flex-1 flex justify-center items-center gap-[2rem]">
                            <div className="flex justify-center flex-col items-center">
                                <div>
                                    <img src={silver_king_crown} alt="" />
                                    <div className="flex justify-center items-center">
                                        <img src={Polygon7} alt="" />
                                    </div>
                                </div>
                                <div className="relative">
                                    <img className="absolute w-full h-full object-cover top-0 left-0 z-[4] scale-75" src={Person} alt="" />
                                    <img className="z-[5]" src={silver_frame} alt="" />
                                </div>
                                <p className="font-medium text-3 mt-[10px]">David Copper</p>
                            </div>
                            <div className="flex justify-center flex-col items-center relative bottom-8">
                                <div className="mb-[1rem]">
                                    <img src={golden_king_corwn} alt="" />
                                    <div className="flex justify-center items-center">
                                        <img src={Polygon7} alt="" />
                                    </div>
                                </div>
                                <div className="relative">
                                    <img className="absolute w-full h-full object-cover top-0 left-0 z-[4] scale-[80%]" src={Person} alt="" />
                                    <img className="z-[5]" src={golden_frame} alt="" />
                                </div>
                                <p className="font-medium text-3 mt-[10px]">Burt Macklin</p>
                            </div>
                            <div className="flex justify-center flex-col items-center">
                                <div>
                                    <img src={bronze_king_crown} alt="" />
                                    <div className="flex justify-center items-center">
                                        <img src={Polygon7} alt="" />
                                    </div>
                                </div>
                                <div className="relative">
                                    <img className="absolute w-full h-full object-cover top-0 left-0 z-[4] scale-75" src={Person} alt="" />
                                    <img className="z-[5]" src={bronze_frame} alt="" />
                                </div>
                                <p className="font-medium text-3 mt-[10px]">David Goggin</p>
                            </div>
                        </div>

                        <div className="flex-1 flex justify-center items-end gap-[2rem]">

                            <div className="w-[10rem] flex flex-col pt-[8px] pb-[1.5rem] items-center rounded-t-[10px] bg-[#eaf5f5]">
                                <div className="gap-[4px] flex mb-[0.7rem]">
                                    <img src={diamond} alt="" />
                                    <p className="text-[12px] font-medium">1500</p>
                                </div>
                                <p className="font-medium text-4">WR: #12</p>
                            </div>
                            <div className="w-[10rem] flex flex-col pt-[8px] pb-[3rem] items-center rounded-t-[10px] bg-[#eaf5f5]">
                                <div className="gap-[4px] flex mb-[0.7rem]">
                                    <img src={diamond} alt="" />
                                    <p className="text-[12px] font-medium">1500</p>
                                </div>
                                <p className="font-medium text-4">WR: #12</p>
                            </div>
                            <div className="w-[10rem] flex flex-col pt-[8px] pb-[1.5rem] items-center rounded-t-[10px] bg-[#eaf5f5]">
                                <div className="gap-[4px] flex mb-[0.7rem]">
                                    <img src={diamond} alt="" />
                                    <p className="text-[12px] font-medium">1500</p>
                                </div>
                                <p className="font-medium text-4">WR: #12</p>
                            </div>

                        </div>

                        <div className="flex-1 rounded-[20px] bg-[#f5f5f5] py-[13px] px-[16px] mb-4 shadow-md">
                            <div className="flex justify-between w-full items-center mb-[18px]">
                                <p className="font-medium text-[0.9rem]">Race created by- Max</p>
                                <p className="font-medium text-[0.9rem]">60 Minutes</p>
                            </div>

                            {/* race tile  */}
                            <div className="w-full flex justify-between border-dashed border-black border py-[3rem] relative">
                                <div className="bg-[#f5f5f5] relative -left-2">
                                    <img src={start} alt="" />
                                </div>

                                {/* absolute elements  */}
                                <div className="absolute w-full top-1/2 border-dashed border-black border">
                                </div>
                                <div className="absolute top-0 left-0 w-full h-full">
                                    <div className="border-r border-solid w-1/4"></div>
                                </div>


                                <div className="bg-[#f5f5f5] relative -right-2">
                                    <img src={finish} alt="" />
                                </div>
                            </div>
                        </div>

                        {/* other stocks rally  */}
                        <div className="flex-1 rounded-[20px] bg-[#f5f5f5] py-[13px] px-[16px] shadow-md">
                            <div className="flex justify-between w-full items-center mb-[18px]">
                                <p className="font-medium text-[0.9rem]">Stock Ranking</p>
                                <button><CgChevronRightO size={20} /></button>
                            </div>
                            <div className="w-full overflow-auto flex gap-[10px]">
                                <StockPriceCard/>
                                <StockPriceCard/>
                                <StockPriceCard/>
                                <StockPriceCard/>
                            </div>
                        </div>

                    </div>

                    {/* leaderboard  */}
                    <div className='flex flex-col'>
                        <div className='flex gap-[6px] mb-[11px]'>
                            <button className='w-[9rem] flex justify-center items-center py-[12.25px] bg-blue-600 text-white font-semibold rounded-[70px] text-[14px]' >Leaderboard</button>
                            <button className='w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px]' >Your Bets</button>
                        </div>
                        <div className='w-full rounded-[24px] p-[16px] bg-[#f5f5f5]'>
                            <div className='w-full flex justify-between items-center mb-[14px]'>
                                <p className="font-semibold text-4">View all</p>
                                <CgChevronRightO size={20} />
                            </div>
                            <div className="w-full flex flex-col gap-[9px]">
                                <UserRankingCard/>
                                <UserRankingCard/>
                                <UserRankingCard/>
                                <UserRankingCard/>
                                <UserRankingCard/>
                                <UserRankingCard/>
                                <UserRankingCard/>
                                <UserRankingCard/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RacePage