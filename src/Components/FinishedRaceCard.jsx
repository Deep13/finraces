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


    return (
        <div onClick={() => navigate(`/race/${raceData?.id}`)} className='rounded-[24px] border border-black px-[1.1rem] py-[1rem] bg-[#edf7ff] dark:bg-[#002864] flex flex-col overflow-hidden cursor-pointer dark:border dark:border-[#00397E]'>
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

            <div className='w-full flex justify-center items-center mb-[25px] relative'>
                {/* absolute elements */}
                <div className='absolute left-0 top-1/2 -scale-100'>
                    <img src={darkModeEnabled ? linedark : line_beside_medals} alt="" />
                </div>

                <div className='w-full flex justify-center items-center'>
                    {/* <div className='relative aspect-square p-[22px]'>
                    <img src={person2} alt="silver medal position" />
                    <img src={silver_crown} alt="1st position person" />
                    <p >Nik</p>
                </div> */}

                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                            if (!raceData?.stocks[1]?.participants[0]?.user) return
                            navigate(`/userprofile/${raceData?.stocks[1]?.participants[0]?.user?.id}`)
                        }}
                        title={raceData?.stocks[1]?.participants[0]?.user && (raceData?.stocks[1]?.participants[0]?.user.firstName + " " + raceData?.stocks[1]?.participants[0]?.user.lastName)}
                        className='relative aspect-square p-[10px] scale-90 z-[5] flex justify-center item-center flex-col'>
                        <div className='relative flex justify-center items-center'>
                            {raceData?.stocks[1]?.participants[0]?.user?.photo?.path && <img className='absolute z-[-1] w-[50%] rounded-[50%]' src={raceData?.stocks[1]?.participants[0]?.user?.photo?.path} />}
                            {!raceData?.stocks[1]?.participants[0]?.user?.photo?.path && <img className='absolute z-[-1] w-[50%] rounded-[50%]' src={placeholder} />}
                            <img className='w-full h-full object-cover w-[100px]' src={silver_crown} alt="1st position person" />
                        </div>
                        {/* <p className='relative  text-center font-semibold text-[12px] dark:text-white'>{rankList[0].user_name}</p> */}
                    </div>

                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                            if (!raceData?.stocks[0]?.participants[0]?.user) return
                            navigate(`/userprofile/${raceData?.stocks[0]?.participants[0]?.user?.id}`)
                        }}
                        title={raceData?.stocks[0]?.participants[0]?.user && (raceData?.stocks[0]?.participants[0]?.user.firstName + " " + raceData?.stocks[0]?.participants[0]?.user.lastName)}
                        className='relative aspect-square p-[10px] z-[5] flex justify-center item-center flex-col'>
                        <div className='relative flex justify-center items-center'>
                            {raceData?.stocks[0]?.participants[0]?.user?.photo?.path && <img className='absolute z-[-1] w-[50%] rounded-[50%]' src={raceData?.stocks[0]?.participants[0]?.user?.photo?.path} />}
                            {!raceData?.stocks[0]?.participants[0]?.user?.photo?.path && <img className='absolute z-[-1] w-[50%] rounded-[50%]' src={placeholder} />}
                            <img className='w-full h-full object-cover w-[110px]' src={gold_crown} alt="1st position person" />
                        </div>
                        {/* <p className='relative text-center font-semibold text-[12px] dark:text-white'>{rankList[1].user_name}</p> */}
                    </div>

                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                            if (!raceData?.stocks[2]?.participants[0]?.user) return
                            navigate(`/userprofile/${raceData?.stocks[2]?.participants[0]?.user?.id}`)
                        }}
                        title={raceData?.stocks[2]?.participants[0]?.user && (raceData?.stocks[2]?.participants[0]?.user.firstName + " " + raceData?.stocks[2]?.participants[0]?.user.lastName)}
                        className='relative aspect-square p-[10px] scale-90 z-[5] flex justify-center item-center flex-col'>
                        <div className='relative flex justify-center items-center'>
                            {raceData?.stocks[2]?.participants[0]?.user?.photo?.path && <img className='absolute z-[-1] w-[50%] rounded-[50%]' src={raceData?.stocks[2]?.participants[0]?.user?.photo?.path} />}
                            {!raceData?.stocks[2]?.participants[0]?.user?.photo?.path && <img className='absolute z-[-1] w-[50%] rounded-[50%]' src={placeholder} />}
                            <img className='w-full h-full object-cover w-[100px]' src={bronze_corwn} alt="1st position person" />
                        </div>
                        {/* <p className='relative  text-center font-semibold text-[12px] dark:text-white'>{rankList[2].user_name}</p> */}
                    </div>

                    {/* <div className='relative aspect-square p-[22px]'>
                    <img src={person2} alt="bronze medal position" />
                    <img src={bronze_corwn} alt="1st position person" />
                    <p>dave</p>
                </div> */}

                    {/* absolute elements */}
                    <div className='absolute right-0 top-1/2'>
                        <img src={darkModeEnabled ? linedark : line_beside_medals} alt="" />
                    </div>
                </div>
            </div>

            {/* <h3 className='text-[1rem] font-bold dark:text-white text-center'>Stocks</h3> */}
            <div className='w-full flex-1 mt-3 relative  border-black  bg-[#edf7ff] flex justify-center items-center pb-[1rem] dark:bg-[#002864] gap-6'>

                <div className='relative aspect-square p-[10px] scale-100 z-[5] flex justify-center item-center flex-col'>
                    <div className='relative flex justify-center items-center'>
                        {raceData?.stocks[1]?.icon_url && <img className='absolute z-[-1] w-[50%] rounded-[50%]' src={raceData?.stocks[1]?.icon_url} />}
                        {!raceData?.stocks[1]?.icon_url && <img className='absolute z-[-1] w-[50%] rounded-[50%]' src={placeholder} />}
                        <img className='w-full h-full object-cover w-[100px]' src={silver_crown} alt="1st position person" />
                    </div>
                    {/* <p className='relative  text-center font-semibold text-[12px] dark:text-white'>{raceData?.stocks[0]?.name}</p> */}
                </div>

                <div className='relative aspect-square p-[10px] z-[5] flex justify-center item-center flex-col'>
                    <div className='relative flex justify-center items-center'>
                        {raceData?.stocks[0]?.icon_url && <img className='absolute scale-125 z-[-1] w-[50%] rounded-[50%]' src={raceData?.stocks[0]?.icon_url} />}
                        {!raceData?.stocks[0]?.icon_url && <img className='absolute z-[-1] w-[50%] rounded-[50%]' src={placeholder} />}
                        <img className='w-full h-full object-cover w-[110px]' src={gold_crown} alt="1st position person" />
                    </div>
                    {/* <p className='relative text-center font-semibold text-[12px] dark:text-white w-[8rem] line-clamp-3'>{raceData?.stocks[0]?.name}</p> */}
                </div>

                <div className='relative aspect-square p-[10px] scale-100 z-[5] flex justify-center item-center flex-col'>
                    <div className='relative flex justify-center items-center'>
                        {raceData?.stocks[2]?.icon_url && <img className='absolute z-[-1] w-[50%] rounded-[50%]' src={raceData?.stocks[2]?.icon_url} />}
                        {!raceData?.stocks[2]?.icon_url && <img className='absolute z-[-1] w-[50%] rounded-[50%]' src={placeholder} />}
                        <img className='w-full h-full object-cover w-[100px]' src={bronze_corwn} alt="1st position person" />
                    </div>
                    {/* <p className='relative  text-center font-semibold text-[12px] dark:text-white'>{raceData?.stocks[2]?.name}</p> */}
                </div>

                {/* {
                    raceData?.stocks?.slice(0, 3).map((curr, index) => {
                        return (
                            <div key={curr.id} className='flex flex-col gap-3 items-center'>
                                <div className='h-[6rem] w-[6rem] rounded-full overflow-hidden  bg-[#e4eaf0] dark:text-white dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] grid place-items-center'>
                                    {curr.icon_url && <img className='w-full h-full object-cover' src={curr?.icon_url} alt="" />}
                                    {!curr.icon_url && <div className='text-3xl font-bold'>{curr?.name.substring(0, 2)}</div>}
                                </div>
                                <p className='dark:text-white text-xs w-[6rem] text-center line-clamp-3'>{curr?.ticker}</p>
                            </div>
                        )
                    })
                } */}
            </div>
        </div>
    )
}

export default FinishedRaceCard