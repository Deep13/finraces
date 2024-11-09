import React, { useState, useEffect } from 'react';

const CountDown = ( deadline ) => {
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
                    // setRaceStartTime(0)
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

    // Determine if the countdown should be complete based on days
    const countdownComplete = timeRemaining <= 0 || days > 0;

    // return (
    //     <div className='mb-4'>
    //         <p className='text-lg font-semibold text-center'>Remaining Time</p>
    //         {/* {countdownComplete ? (
    //             <p>The countdown is complete!</p>
    //         ) : ( */}
    //             <p className='text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-blue-600'>{`${days}d ${hours}h ${minutes}m ${seconds}s`}</p>
    //         {/* )} */}
    //     </div>
    // );

    return {
        days,
        hours, 
        minutes,
        seconds,
        countdownComplete
    }
};

export default CountDown
