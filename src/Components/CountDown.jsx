import React, { useEffect } from 'react';
import Countdown from 'react-countdown';

const CountDownTimer = ({ deadline, setIsTimerFinished }) => {
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            setIsTimerFinished(true)
            return 'Timer Finished';
        } else {
            // Format each unit to always display two digits
            const formatTime = (time) => String(time).padStart(2, '0');

            return (
                <div className='w-full flex justify-center items-center gap-[0.5rem] mb-[1.5rem]'>
                    <div className='text-[2.1rem] text-[#2177cb] relative'>{formatTime(days)} : <p className='absolute -top-3 -left-2 w-full text-center text-[0.7rem] text-black'>Days</p></div>
                    <div className='text-[2.1rem] text-[#2177cb] relative'>{formatTime(hours)} : <p className='absolute -top-3 -left-2 w-full text-center text-[0.7rem] text-black'>Hours</p></div>
                    <div className='text-[2.1rem] text-[#2177cb] relative'>{formatTime(minutes)} : <p className='absolute -top-3 -left-2 w-full text-center text-[0.7rem] text-black'>Minutes</p></div>
                    <div className='text-[2.1rem] text-[#2177cb] relative'>{formatTime(seconds)} <p className='absolute -top-3 -left-2 w-full text-center text-[0.7rem] text-black'>Seconds</p></div>
                </div>
            );
        }
    };

    useEffect(() => {
        if (!deadline) {
            console.log('not getting the date');
        }
        console.log('deadline', deadline);
    }, []);

    return (
        <Countdown
            daysInHours={false}
            date={deadline}
            renderer={renderer}
        />
    );
};

export default CountDownTimer;
