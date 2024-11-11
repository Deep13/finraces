import React, { useState, useEffect } from 'react';

const CountDown = ({ deadline }) => {
    // Parse the ISO8601 deadline into a Date object
    const deadlineDate = new Date(deadline);

    // Function to calculate time remaining in seconds
    const calculateTimeRemaining = () => {
        const now = new Date();
        const timeDifference = Math.floor((deadlineDate - now) / 1000); // difference in seconds
        return timeDifference > 0 ? timeDifference : 0;
    };

    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
    const [isComplete, setIsComplete] = useState(false); // Track if the countdown is complete

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timerInterval);
                    setIsComplete(true); // Set complete state when countdown ends
                    console.log('Countdown complete!');
                    return 0;
                } else {
                    return prevTime - 1;
                }
            });
        }, 1000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(timerInterval);
    }, [deadlineDate]); // Recalculate if the deadline changes

    // Convert seconds to days, hours, minutes, and seconds
    const days = Math.floor(timeRemaining / (3600 * 24));
    const hours = Math.floor((timeRemaining % (3600 * 24)) / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;

    return (
        <div className='w-full flex justify-center items-center gap-[0.5rem] mb-[1.5rem]'>
            <div className='text-[2.1rem] text-[#2177cb] relative'>{days} : <p className='absolute -top-3 -left-2 w-full text-center text-[0.7rem] text-black'>Days</p></div>
            <div className='text-[2.1rem] text-[#2177cb] relative'>{hours} : <p className='absolute -top-3 -left-2 w-full text-center text-[0.7rem] text-black'>Hours</p></div>
            <div className='text-[2.1rem] text-[#2177cb] relative'>{minutes} : <p className='absolute -top-3 -left-2 w-full text-center text-[0.7rem] text-black'>Minutes</p></div>
            <div className='text-[2.1rem] text-[#2177cb] relative'>{seconds} <p className='absolute -top-3 -left-2 w-full text-center text-[0.7rem] text-black'>Seconds</p></div>
        </div>
    );
};

export default CountDown;
