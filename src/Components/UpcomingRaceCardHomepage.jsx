import React, { useEffect, useState } from 'react'
import stocks from '../assets/images/stonks.svg'
import { useNavigate } from 'react-router-dom'
import JoinRace from './JoinRace'

const UpcomingRaceCardHomepage = ({
    raceName,
    participants = 4,
    raceId,
    startDate,
    endDate
}) => {

    const navigate = useNavigate()
    const [joinRaceFormVisible, setJoinRaceFormVisible] = useState(false)

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



    return (
        <div className='rounded-[15px] bg-[#E5f4ff] pl-[1.8rem] px-[2.2rem] pt-[1.8rem] pb-[1.4rem]'>
            {
                joinRaceFormVisible && <JoinRace
                    raceName={raceName}
                    closeForm={setJoinRaceFormVisible}
                    race_id={raceId} />
            }
            <p className='mb-[0.4rem] font-bold text-[2rem]'>{raceName}</p>
            <div className='w-full flex justify-between items-center mb-[5px]'>
                <div className='flex justify-between items-baseline'>
                    <p className='font-bold text-[20px] mr-[1rem]'>Race will start at {new Date(startDate).toLocaleTimeString(navigator.language, {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</p>
                    <p className='text-[12px]'>{new Date(startDate).toLocaleDateString()}</p>
                </div>
                <div className='flex gap-[6px] items-center'>
                    <img src={stocks} alt="stocks images" />
                    <p className='font-semibold text-[16px] text-[#b5b5b5]'>+10</p>
                </div>
            </div>
            <div className='flex flex-col gap-[5px] mb-[14px]'>
                <p className='text-[12px] font-bold'>1.2k Participants</p>
                <p className='text-[12px]'>Duration {hours !== 0 && hours + " Hours"} {minutes !== 0 && minutes + " Minutes"}</p>
            </div>
            {/* <p className='text-[14px] mb-[1.8rem]'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            </p> */}
            <div className='flex gap-[20px]'>
                <button
                    // onClick={() => navigate(`/race/${raceId}`)} 
                    onClick={() => setJoinRaceFormVisible(true)}
                    className='px-[19px] py-[10px] text-[14px] font-normal rounded-[25px] border borer-[0.76px] border-black'>Join</button>
                {/* <button className='px-[19px] py-[10px] text-[14px] font-normal rounded-[25px] border borer-[0.76px] border-black'>View Details</button> */}
            </div>
        </div>
    )
}

export default UpcomingRaceCardHomepage