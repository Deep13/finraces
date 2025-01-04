import React, { useEffect, useState } from 'react'
import stocks from '../assets/images/stonks.svg'
import { useNavigate } from 'react-router-dom'
import JoinRace from './JoinRace'
import { motion } from 'motion/react'

const UpcomingRaceCardHomepage = ({
    raceName = "An Arbitrary Race",
    participants = 4,
    raceId,
    startDate,
    endDate,
    index,
    stock1,
    stock2,
    stock3,
    stock1Name,
    stock2Name,
    stock3Name,
    totalStocksCount
}) => {

    const navigate = useNavigate()
    const [joinRaceFormVisible, setJoinRaceFormVisible] = useState(false)
    const userDetails = localStorage.getItem('userDetails')
    const guestDetails = localStorage.getItem('guest_details')

    function calculateDuration(start_date, end_date) {
        // Parse the start and end dates
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        // Calculate the difference in milliseconds
        const differenceInMs = endDate - startDate;

        // Convert milliseconds to minutes
        const totalMinutes = Math.floor(differenceInMs / (1000 * 60));

        // Get the hours and remaining minutes
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return { hours, minutes };
    }

    const { hours, minutes } = calculateDuration(startDate, endDate)

    const cardAnimation = { // this is a variant
        hidden: { scale: 0, opacity: 0 },
        visible: (i) => ({
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
                delay: i * 0.1
            }
        })
    };

    let date = new Date(startDate)
    let StartDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;




    return (
        <motion.div
            custom={index}
            // onClick={() => {
            //     navigate(`/race/${raceId}`)
            // }}
            initial="hidden"
            animate="visible"
            variants={cardAnimation}
            className='rounded-[15px] bg-[#E5f4ff] dark:bg-[#002763] pl-[1.8rem] px-[2.2rem] pt-[1.8rem] pb-[1.4rem] flex flex-col justify-between cursor-pointer'>
            {
                joinRaceFormVisible && <JoinRace
                    raceName={raceName}
                    closeForm={setJoinRaceFormVisible}
                    race_id={raceId} />
            }
            <div className='flex flex-col'>
                <div className='w-full flex justify-between items-center'>
                    <p className='mb-[0.4rem] font-bold text-[2rem] dark:text-white max-w-[75%]'>{raceName}</p>
                    <div className='flex gap-[6px] items-center self-start flex-wrap'>
                        <div className="flex items-center space-x-[-15px]">
                            {/* Stock 1 - Biggest */}
                            {stock1 ? (
                                <img
                                    className="rounded-full w-12 h-12 border-[4px] border-[#002763] z-[10]"
                                    src={stock1}
                                    alt=""
                                />
                            ) : (
                                <div className="rounded-full w-12 h-12 border-[4px] border-[#002763] z-[10] grid place-items-center bg-[#e4eaf0] dark:text-white dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] font-semibold">
                                    {stock1Name?.substring(0, 2)}
                                </div>
                            )}

                            {/* Stock 2 - Medium */}
                            {stock2 ? (
                                <img
                                    className="rounded-full w-10 h-10 border-[4px] border-[#002763] z-[9]"
                                    src={stock2}
                                    alt=""
                                />
                            ) : (
                                stock2Name && (
                                    <div className="rounded-full w-10 h-10 border-[4px] border-[#002763] z-[9] grid place-items-center bg-[#e4eaf0] dark:text-white dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] font-semibold">
                                        {stock2Name?.substring(0, 2)}
                                    </div>
                                )
                            )}

                            {/* Stock 3 - Smallest */}
                            {stock3 ? (
                                <img
                                    className="rounded-full w-8 h-8 border-[4px] border-[#002763] z-[8]"
                                    src={stock3}
                                    alt=""
                                />
                            ) : (
                                stock3Name && (
                                    <div className="rounded-full w-8 h-8 border-[4px] border-[#002763] z-[8] grid place-items-center bg-[#e4eaf0] dark:text-white dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] font-semibold">
                                        {stock3Name?.substring(0, 2)}
                                    </div>
                                )
                            )}
                        </div>

                        <p className='font-semibold text-[16px] text-[#b5b5b5]'>{totalStocksCount > 3 ? `+${totalStocksCount - 3}` : ''}</p>
                    </div>
                </div>
                <div className='w-full flex justify-between items-center mb-[5px]'>
                    <div className='flex justify-between items-baseline'>
                        <p className='font-bold text-[20px] mr-[1rem] dark:text-white'>Race will start at {new Date(startDate).toLocaleTimeString(navigator.language, {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</p>
                        <p className='text-[12px] dark:text-white'>{StartDate}</p>
                    </div>
                </div>
                <div className='flex flex-col gap-[5px] mb-[14px]'>
                    <p className='text-[12px] font-bold dark:text-white'>{participants}{participants > 1 ? ' Participants' : ' Participant'}</p>
                    <p className='text-[12px] dark:text-white'>Duration {hours !== 0 && hours + " Hours"} {minutes !== 0 && minutes + " Minutes"}</p>
                </div>
            </div>
            {/* <p className='text-[14px] mb-[1.8rem]'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            </p> */}
            <div className='flex gap-[20px] justify-self-end'>
                {(userDetails || guestDetails) && <button
                    // onClick={() => navigate(`/race/${raceId}`)} 
                    onClick={(e) => {
                        e.stopPropagation()
                        setJoinRaceFormVisible(true)
                    }}
                    className='px-[19px] py-[10px] text-[14px] font-normal rounded-[25px] border borer-[0.76px] border-black dark:border-white dark:text-white'>
                    Join
                </button>}
                {/* <button
                    onClick={() => navigate(`/race/${raceId}`)}
                    className='px-[19px] py-[10px] text-[14px] font-normal rounded-[25px] border borer-[0.76px] border-black dark:border-white dark:text-white'>Watch Race</button> */}
            </div>
        </motion.div >
    )
}

export default UpcomingRaceCardHomepage