import React, { useContext, useEffect, useState } from 'react'
import box from '../assets/images/ongoingRaces/focus_box.svg'
import boxdark from '../assets/images/boxdark.svg'
import info from '../assets/images/ongoingRaces/info_icon.svg'
import gold_crown from '../assets/images/gold_crown.svg'
import silver_crown from '../assets/images/silver_corwn.svg'
import bronze_corwn from '../assets/images/bronze_corwn.svg'
import line_beside_medals from '../assets/images/line_beside_medals.png'
import linedark from '../assets/images/linedark.svg'
import person2 from '../assets/images/person2.png'
import placeholder from '../assets/images/placeholder.png'
import start from '../assets/images/start.svg'
import startdark from '../assets/images/startdark.svg'
import finish from '../assets/images/finish.svg'
import finishdark from '../assets/images/finishdark.svg'
import { useNavigate } from 'react-router-dom'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { io } from 'socket.io-client'
import RaceTile from '../Components/RaceTile'
import { getStocksDataForRace } from '../Utils/api'
import { DarkModeContext } from '../Contexts/DarkModeProvider'
import { getRaceList } from '../Utils/api'
import Crown_1 from '../assets/images/Crown_1.png'
import Crown_2 from '../assets/images/Crown_2.png'
import Crown_3 from '../assets/images/Crown_3.png'
import malePlceholder from '../assets/images/manPlaceholder.jpg'
import femalePlceholder from '../assets/images/womanPlaceholder.jpg'


const FinishedRaceCard = ({
    raceId = '54asdffasaFSf',
    raceName = 'Abstrace Race',
    end_date,
    start_Date,
    raceData
}) => {

    const { darkModeEnabled } = useContext(DarkModeContext)
    const [raceList, setRaceList] = useState()
    const navigate = useNavigate()

    console.log("checking here", raceData?.participants?.[0]?.photo?.path)


    return (
        <div onClick={() => navigate(`/race/${raceData?.id}`)} className='rounded-[24px] border border-black px-[1.1rem] py-[1rem] bg-[#edf7ff] dark:bg-[#002864] flex flex-col overflow-hidden cursor-pointer dark:border dark:border-[#00397E] mt-[20px]'>
            <div className='w-full flex justify-between mb-[14px]'>
                <div className='flex gap-[0.76rem] flex-1'>
                    <img className='w-12 h-12' src={darkModeEnabled ? boxdark : box} alt="box icon" />
                    <div className='h-full'>
                        <h3 className='text-[1.05rem] font-bold dark:text-white line-clamp-3'>{raceName}</h3>
                        {/* <p className='text-[0.7rem]'>XYZ</p> */}
                    </div>
                </div>
                <div className='h-full flex flex-col justify-start items-end flex-1'>
                    <h3 className='text-[1.05rem] font-bold dark:text-white'>Created By</h3>
                    <p className='text-[0.7rem] dark:text-white'>{raceData?.created_by?.firstName + " " + raceData?.created_by?.lastName}</p>
                </div>
            </div>

            <div className='w-full flex justify-center items-center mb-[25px] relative flex-col'>

                <div className='w-full flex justify-center items-center gap-[25px]'>

                    <div style={{ position: 'relative', flex: 1 }}>  <img
                        className='ongoing-users'
                        src={raceData?.participants?.[0]?.photo?.path
                            || (raceData?.participants?.[0]?.gender === 'female' ? femalePlceholder : malePlceholder)}
                    />
                        <img className='ongoing-rank' src={Crown_1} />
                    </div>
                    <div style={{ position: 'relative', flex: 1 }}><img
                        className='ongoing-users'
                        src={raceData?.participants?.[1]?.photo?.path
                            || (raceData?.participants?.[1]?.gender === 'female' ? femalePlceholder : malePlceholder)}
                    />
                        <img className='ongoing-rank' src={Crown_2} /></div>
                    <div style={{ position: 'relative', flex: 1 }}> <img
                        className='ongoing-users'
                        src={raceData?.participants?.[2]?.photo?.path
                            || (raceData?.participants?.[2]?.gender === 'female' ? femalePlceholder : malePlceholder)}
                    />
                        <img className='ongoing-rank' src={Crown_3} /></div>
                </div>
                <div className='w-full flex justify-center items-center gap-[25px] mt-[40px] text-white'>
                    <div className='flex flex-1 justify-center'>
                        <p>{raceData?.participants?.[0]?.firstName} {raceData?.participants?.[0]?.lastName}</p>
                    </div>
                    <div className='flex flex-1 justify-center'>
                        <p>{raceData?.participants?.[1]?.firstName} {raceData?.participants?.[1]?.lastName}</p>
                    </div>
                    <div className='flex flex-1 justify-center'>
                        <p>{raceData?.participants?.[2]?.firstName} {raceData?.participants?.[2]?.lastName}</p>
                    </div>
                </div>
                <div className='w-full flex justify-center items-center gap-[25px] mt-[20px]'>
                    <div className='flex flex-1 justify-center'>
                        <img className='finished-stocks'
                            src={raceData?.stocks[0]?.icon_url}
                        />
                    </div>
                    <div className='flex flex-1 justify-center'>
                        <img className='finished-stocks'
                            src={raceData?.stocks[1]?.icon_url}
                        />
                    </div>
                    <div className='flex flex-1 justify-center'>
                        <img className='finished-stocks'
                            src={raceData?.stocks[2]?.icon_url}
                        />
                    </div>
                </div>
            </div>



        </div>
    )
}

export default FinishedRaceCard