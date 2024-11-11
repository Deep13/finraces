import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';

const CountDownTimer = ({ deadline }) => {
    // Parse the ISO8601 deadline into a Date object

    const renderer = ({days, hours,minutes, seconds, completed}) => {
        if (completed) {
            return 'Timer Finished';
          } else {
            // Render a countdown
            return (
                <div className='w-full flex justify-center items-center gap-[0.5rem] mb-[1.5rem]'>
                    <div className='text-[2.1rem] text-[#2177cb] relative'>{days} : <p className='absolute -top-3 -left-2 w-full text-center text-[0.7rem] text-black'>Days</p></div>
                    <div className='text-[2.1rem] text-[#2177cb] relative'>{hours} : <p className='absolute -top-3 -left-2 w-full text-center text-[0.7rem] text-black'>Hours</p></div>
                    <div className='text-[2.1rem] text-[#2177cb] relative'>{minutes} : <p className='absolute -top-3 -left-2 w-full text-center text-[0.7rem] text-black'>Minutes</p></div>
                    <div className='text-[2.1rem] text-[#2177cb] relative'>{seconds} <p className='absolute -top-3 -left-2 w-full text-center text-[0.7rem] text-black'>Seconds</p></div>
                </div>
            );
          }
    } 

    useEffect(() => {
        if(!deadline) {
            console.log('not getting the date');
        }
        console.log('deadline',deadline);
        
    },[])
   
    return (
        <Countdown
            daysInHours={false}
            date={deadline}
            renderer={renderer}
        />
    );
};

export default CountDownTimer;
