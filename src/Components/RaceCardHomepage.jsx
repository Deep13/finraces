import React, { useEffect } from 'react'
import box from '../assets/images/ongoingRaces/focus_box.svg'
import info from '../assets/images/ongoingRaces/info_icon.svg'
import dashed_line from '../assets/images/dashed_line.svg'
import dashedline_breaks from '../assets/images/dashedline_breaks.svg'
import gold_crown from '../assets/images/gold_crown.svg'
import silver_crown from '../assets/images/silver_corwn.svg'
import bronze_corwn from '../assets/images/bronze_corwn.svg'
import line_beside_medals from '../assets/images/line_beside_medals.png'
import person2 from '../assets/images/person2.png'
import start from '../assets/images/start.svg'
import finish from '../assets/images/finish.svg'
import a from '../assets/images/a.png'
import f from '../assets/images/f.png'
import g from '../assets/images/g.png'
import { useNavigate } from 'react-router-dom'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


const RaceCardHomepage = ({
    raceId = '54asdffasaFSf',
    raceName = 'Abstrace Race',
    end_date,
    start_Date
    // participants,
}) => {

    const navigate = useNavigate()

    const getRemainingSeconds = (targetDate, initial_date) => {
        const targetTime = new Date(targetDate).getTime(); // Convert target date to milliseconds
        const currentTime = new Date(initial_date).getTime(); // Get current time in milliseconds

        // Calculate difference in seconds
        const remainingSeconds = Math.floor((targetTime - currentTime) / 1000);

        return remainingSeconds > 0 ? remainingSeconds : 0; // Return 0 if the date has passed
    }


    return (
        <div onClick={() => navigate(`/race/${raceId}`)} className='rounded-[24px] border border-black px-[1.1rem] py-[1rem] bg-[#edf7ff] flex flex-col overflow-hidden cursor-pointer'>
            <div className='w-full flex justify-between mb-[14px]'>
                <div className='flex gap-[0.76rem] flex-1'>
                    <img src={box} alt="box icon" />
                    <div className='h-full'>
                        <h3 className='text-[1.05rem] font-bold'>{raceName}</h3>
                        {/* <p className='text-[0.7rem]'>XYZ</p> */}
                    </div>
                    <div className=''>
                        <img className='w-[10px] h-[10px]' src={info} alt="info icon" />
                    </div>
                </div>
                <div className='flex-1 flex justify-center'>
                    <CountdownCircleTimer
                        isPlaying
                        size={50}
                        strokeWidth={3}
                        duration={getRemainingSeconds(end_date, start_Date)} // total duration depcits a full circle.
                        colors={['#004777']}
                        initialRemainingTime={getRemainingSeconds(end_date, new Date())} // time that is remaining from now
                        colorsTime={[7]}>
                        {({ remainingTime }) => {
                            const hours = Math.floor(remainingTime / 3600)
                            const minutes = Math.floor((remainingTime % 3600) / 60)
                            const seconds = remainingTime % 60

                            return <div className='text-[0.7rem] font-semibold'>
                                {hours}:{minutes}:{seconds}`
                            </div>
                        }}
                    </CountdownCircleTimer>
                </div>
                <div className='h-full flex flex-col justify-between items-end flex-1'>
                    <h3 className='text-[1.05rem] font-bold'>Tech Stocks</h3>
                    <p className='text-[0.7rem]'>20Participants</p>
                </div>
            </div>

            <div className='w-full flex justify-center items-center mb-[25px] relative'>
                {/* absolute elements */}
                <div className='absolute left-0 top-1/2'>
                    <img src={line_beside_medals} alt="" />
                </div>

                <div className='w-full flex justify-center items-center gap-[25px]'>
                    {/* <div className='relative aspect-square p-[22px]'>
                    <img src={person2} alt="silver medal position" />
                    <img src={silver_crown} alt="1st position person" />
                    <p >Nik</p>
                </div> */}

                    <div className='relative aspect-square p-[22px] scale-90 z-[5]'>
                        <div className='absolute top-4 left-0 scale-75'>
                            <img className='w-full h-full object-cover' src={person2} alt="silver medal position" />
                        </div>
                        <div className='absolute top-0 left-0 scale-125'>
                            <img className='w-full h-full object-cover' src={silver_crown} alt="1st position person" />
                        </div>
                        <p className='relative top-[3.5rem] font-semibold text-[12px]'>Nik</p>
                    </div>

                    <div className='relative aspect-square p-[22px] z-[5]'>
                        <div className='absolute top-2 left-0 scale-75'>
                            <img className='w-full h-full object-cover' src={person2} alt="silver medal position" />
                        </div>
                        <div className='absolute top-0 left-0 scale-125'>
                            <img className='w-full h-full object-cover' src={gold_crown} alt="1st position person" />
                        </div>
                        <p className='relative top-[3rem] font-semibold text-[12px]'>Jon</p>
                    </div>

                    <div className='relative aspect-square p-[22px] scale-90 z-[5]'>
                        <div className='absolute top-4 left-0 scale-75'>
                            <img className='w-full h-full object-cover' src={person2} alt="silver medal position" />
                        </div>
                        <div className='absolute top-0 left-0 scale-125'>
                            <img className='w-full h-full object-cover' src={bronze_corwn} alt="1st position person" />
                        </div>
                        <p className='relative top-[3.5rem] font-semibold text-[12px]'>Saif</p>
                    </div>

                    {/* <div className='relative aspect-square p-[22px]'>
                    <img src={person2} alt="bronze medal position" />
                    <img src={bronze_corwn} alt="1st position person" />
                    <p>dave</p>
                </div> */}

                    {/* absolute elements */}
                    <div className='absolute right-0 top-1/2'>
                        <img className='-scale-100' src={line_beside_medals} alt="" />
                    </div>
                </div>
            </div>

            <div className='w-full flex-1 relative border border-dashed border-black  bg-[#edf7ff] flex justify-between items-center py-[2rem]'>
                <div className='bg-[#edf7ff]'>
                    <img src={start} alt="" />
                </div>
                <div className='flex-1 border-dashed border-black border-t relative'>
                    <div className='absolute -top-[1.5rem] left-8 flex justify-center gap-2'>
                        <div className='w-[45px] aspect-square'>
                            <img src={a} alt="" />
                            <p className='font-semibold relative -top-[4.5rem] text-center text-[20px] text-black'>3</p>
                        </div>
                        <div className='w-[45px] aspect-square'>
                            <img src={g} alt="" />
                            <p className='font-semibold relative -top-[4.5rem] text-center text-[20px] text-black'>2</p>
                        </div>
                        <div className='w-[45px] aspect-square'>
                            <img src={f} alt="" />
                            <p className='font-semibold relative -top-[4.5rem] text-center text-[20px] text-black'>1</p>
                        </div>
                    </div>
                </div>
                <div className='bg-[#edf7ff]'>
                    <img src={finish} alt="" />
                </div>

                {/* <div className='absolute top-0 left-0 w-full'>
                <img src={dashed_line} alt="" />
            </div> */}
                {/* race line  */}
                {/* <div className='absolute top-1/2 left-0 w-full'> */}
                {/* <div className='w-full relative'> */}
                {/* <img src={dashed_line} alt="" /> */}

                {/* stocks icons with text  */}
                {/* <div className='relative flex gap-3 -top-6 w-full justify-center'>
                        <div className='relative w-[45px] aspect-square'>
                            <img src={a} alt="" />
                            <p className='font-semibold absolute -top-[2rem] left-0 w-full text-center text-[20px] text-black'>3</p>
                        </div>
                        <div className='relative w-[45px] aspect-square'>
                            <img src={g} alt="" />
                            <p className='font-semibold absolute -top-[2rem] left-0 w-full text-center text-[20px] text-black'>2</p>
                        </div>
                        <div className='relative w-[45px] aspect-square'>
                            <img src={f} alt="" />
                            <p className='font-semibold absolute -top-[2rem] left-0 w-full text-center text-[20px] text-black'>1</p>
                        </div>
                    </div> */}
                {/* </div> */}
                {/* </div> */}
                {/* <div className='absolute bottom-0 left-0 w-full'>
                <img src={dashed_line} alt="" />
            </div>
            <div className='absolute bottom-0 right-0 w-full'>
                <img src={dashedline_breaks} alt="" />
            </div> */}

                {/* absolute  */}
                {/* <div className='absolute top-[40px] -left-[8px] bg-[#edf7ff] px-[4]'>
                <img src={start} alt="" />
            </div>
            <div className='absolute top-[40px] -right-[8px] bg-[#edf7ff] px-[4]'>
                <img src={finish} alt="" />
            </div> */}
            </div>
        </div>
    )
}

export default RaceCardHomepage