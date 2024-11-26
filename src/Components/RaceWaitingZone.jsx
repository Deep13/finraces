import { RxCross2 } from "react-icons/rx";
import React, { useEffect, useState, useLayoutEffect } from 'react';
import image from '../assets/images/illustration.svg';
import CountDownTimer from '../Components/CountDown'
import { motion, AnimatePresence } from "motion/react";
// import RaceResult from "./RaceResult";

const RaceWaitingZone = ({
    closeCard = () => { },
    start_date,
    joinedUsersList, // api call
    status,
    race_id,
    liveUsers // socket
}) => {

    const [isTimerFinished, setIsTimerFinished] = useState(false)

    useLayoutEffect(() => { // this case useLayouteffect is really effective
        // if(countdownComplete) {
        //     closeCard(true)
        // }
        if (status === 'finished' || status === 'running') {
            closeCard(true)
        }
    }, [])

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    transition={{
                        duration: 0.4,
                        ease: 'easeInOut'
                    }}
                    exit={{
                        opacity: 0
                    }}
                    className='fixed top-0 left-0 w-full h-screen py-[3%] backdrop-blur-md z-[25] grid place-items-center'>
                    <motion.div
                        initial={{
                            y: 120,
                            opacity: 0
                        }}
                        animate={{
                            y: 0,
                            opacity: 1
                        }}
                        transition={{
                            duration: 0.4,
                            ease: 'easeInOut'
                        }}
                        className='bg-white rounded-md h-full py-[2rem] flex flex-col items-center px-[5rem] z-[30] shadow-lg relative'>
                        {isTimerFinished && <button onClick={closeCard} className="absolute top-8 right-8"><RxCross2 size={25} /></button>}
                        <h2 className='font-semibold text-[1.5rem] mb-[0.5rem]'>Race Name</h2>
                        <p className='font-medium text-[1rem] text-[#919191] mb-[1rem]'>{status}</p>
                        <div>
                            <img src={image} alt="" />
                        </div>
                        <p className='w-full text-center font-bold text-[#2177cb] uppercase my-[1rem] text-[1.2rem]'>Ready to launch in...</p>
                        <CountDownTimer setIsTimerFinished={setIsTimerFinished} deadline={start_date} />
                        {/* live joining users tile  */}
                        <p className='w-full text-center text-[#2177cb] uppercase text-[1.2rem] font-semibold'>Users joining</p>
                        <div className='w-full flex-1 text-center flex flex-col items-center gap-[5px] overflow-y-auto joining-users' style={{ maxHeight: '180px' }}>
                            {
                                joinedUsersList?.map((curr, index) => {
                                    return (
                                        <p key={index + 1}>{curr?.user?.firstName} has joined successfully</p>
                                    )
                                })
                            }
                            {
                                liveUsers?.map((curr, index) => {
                                    return (
                                        <p key={index + 1}>{curr?.firstName} has joined successfully</p>
                                    )
                                })
                            }
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </>
    );
};

export default RaceWaitingZone;
