import { RxCross2 } from "react-icons/rx";
import React, { useEffect } from 'react';
import image from '../assets/images/illustration.svg';
import CountDown from '../Components/CountDown'

const RaceWaitingZone = ({
    closeCard = () => { },
    start_date,
    joinedUsersList,
    status,
}) => {



    useEffect(() => {
        // if(countdownComplete) {
        //     closeCard(true)
        // }
    }, [])

    return (
        <div className='fixed top-0 left-0 w-full h-screen py-[3%] backdrop-blur-md z-[25] grid place-items-center'>
            <div className='bg-white rounded-md h-full py-[2rem] flex flex-col items-center px-[5rem] z-[30] shadow-lg relative'>
                <button onClick={closeCard} className="absolute top-8 right-8"><RxCross2 size={25} /></button>
                <h2 className='font-semibold text-[1.5rem] mb-[0.5rem]'>Race Name</h2>
                <p className='font-medium text-[1rem] text-[#919191] mb-[1rem]'>{status}</p>
                <div>
                    <img src={image} alt="" />
                </div>
                <p className='w-full text-center font-bold text-[#2177cb] uppercase my-[1rem] text-[1.2rem]'>Ready to launch in...</p>
                {/* <div className='w-full flex justify-center items-center gap-[0.5rem] mb-[1.5rem]'>
                    <div className='text-[2.1rem] text-[#2177cb] relative'>{days} : <p className='absolute -top-3 -left-2 w-full text-center text-[0.7rem] text-black'>Days</p></div>
                    <div className='text-[2.1rem] text-[#2177cb] relative'>{hours} : <p className='absolute -top-3 -left-2 w-full text-center text-[0.7rem] text-black'>Hours</p></div>
                    <div className='text-[2.1rem] text-[#2177cb] relative'>{minutes} : <p className='absolute -top-3 -left-2 w-full text-center text-[0.7rem] text-black'>Minutes</p></div>
                    <div className='text-[2.1rem] text-[#2177cb] relative'>{seconds} <p className='absolute -top-3 -left-2 w-full text-center text-[0.7rem] text-black'>Seconds</p></div>
                </div> */}
                <CountDown deadline={start_date}/>
                {/* live joining users tile  */}
                <p className='w-full text-center text-[#2177cb] uppercase text-[1.2rem] font-semibold'>Users joining</p>
                <div className='w-full flex-1 text-center flex flex-col items-center gap-[5px] overflow-y-auto joining-users' style={{ maxHeight: '180px' }}>
                    {
                        joinedUsersList?.map((curr, index) => {
                            return(
                                <p key={index+1}>{curr.user.firstName} has joined successfully</p>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default RaceWaitingZone;
