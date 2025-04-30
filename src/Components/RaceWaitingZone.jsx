import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import React, { useEffect, useState, useLayoutEffect } from 'react';
import image from '../assets/images/illustration.svg';
import CountDownTimer from '../Components/CountDown'
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { getFriends } from "../Utils/api";
// import RaceResult from "./RaceResult";

const RaceWaitingZone = ({
    closeCard = () => { },
    start_date,
    joinedUsersList, // api call
    status,
    race_id,
    liveUsers, // socket
    raceName
}) => {

    const [isTimerFinished, setIsTimerFinished] = useState(false)
    const [searchQuery,setSearchQuery]=useState("");
    const [friendList,setFriendList]=useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);


    const ud = localStorage.getItem('fin_userDetails')
    const gd = localStorage.getItem('guest_details')
    const userDetails = ud && JSON.parse(atob(ud))
    const guestDetails = gd && JSON.parse(atob(gd))
    const det = userDetails || guestDetails
    const navigate=useNavigate()

    const checkSelf = (id, firstName) => {
        if (id === det?.userId) {
            return 'You have'
        }
        return `${firstName} has`
    }

    useEffect(() => { // this case useLayouteffect is really effective
        // if(countdownComplete) {
        //     closeCard(true)
        // }
        if (status === 'finished' || status === 'running') {
            closeCard(true)
        }

    }, [status])

    useEffect(() => {
        if (isTimerFinished && status !== 'scheduled') {
            closeCard(true)
        }
    }, [isTimerFinished])

    useEffect(()=>{
        if(searchQuery.length>0){
            getFriends((data)=>{
                console.log(data)
                setFriendList(data.data)
            },(error)=>{
                console.log(error)
            },searchQuery)
        }
    },[searchQuery])

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
                    className='fixed top-0 left-0 w-full h-screen py-[3%] backdrop-blur-md z-[100] grid place-items-center'>
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
                        className='bg-white rounded-md h-full py-[2rem] flex flex-col items-center px-[2rem] w-[25rem] shadow-lg relative'>

                         <button onClick={closeCard} className="absolute top-3 right-3"><RxCross2 size={25} /></button>
                        <h2 className='font-semibold text-[1.5rem] text-center mb-3 font-poppins'>{raceName}</h2>
                        {/* <p className='font-medium text-[1rem] text-[#919191] mb-[1rem]'>{status}</p> */}
                        <div>
                            <img src={image} alt="" />
                        </div>
                        <p className='w-full text-center font-bold text-[#2177cb] uppercase my-[1rem] text-[1.2rem]'>Ready to launch in...</p>
                        <CountDownTimer setIsTimerFinished={setIsTimerFinished} deadline={start_date} />
                        {/* live joining users tile  */}
                        <div className="flex flex-col items-center justify-between mt-2 mb-2">
                            <div>Invite your friends</div>
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-52 h-8 rounded-xl dark:bg-white dark:text-black border-2 border-black px-2 mt-2"
                                placeholder="Search your friends..."
                                type="text"
                            />
                            <div className="w-full max-h-40 overflow-y-auto mt-2">
                                {
                                    friendList?.length > 0 ? (
                                    friendList
                                        .filter(friend =>
                                        friend?.firstName?.toLowerCase().includes(searchQuery.toLowerCase())
                                        )
                                        .map((friend) => {
                                        const isSelected = selectedFriends.includes(friend.id);
                                        return (
                                            <div
                                            key={friend.id}
                                            onClick={() => {
                                                setSelectedFriends(prev =>
                                                isSelected
                                                    ? prev.filter(id => id !== friend.id)
                                                    : [...prev, friend.id]
                                                );
                                            }}
                                            className={`w-full px-4 py-2 cursor-pointer rounded-md flex justify-between items-center
                                            ${isSelected ? 'bg-blue-100 font-semibold' : 'hover:bg-gray-100'}`}
                                            >
                                            <span>{friend.firstName}</span>
                                            {isSelected && <span className="text-blue-500 text-sm">Selected</span>}
                                            </div>
                                        );
                                        })
                                    ) : (
                                    searchQuery.length>0 && <p className="text-sm text-gray-400 text-center">No friends found.</p>
                                    )
                                }
                                </div>

                        </div>
                        <p className='w-full text-center text-[#2177cb] uppercase text-[1.2rem] font-semibold'>Users joining</p>
                        <div className='w-full flex-1 text-center flex flex-col items-center gap-[5px] overflow-y-auto joining-users' style={{ maxHeight: '180px' }}>
                            {
                                joinedUsersList?.map((curr, index) => {
                                    return (
                                        <p key={index + 1}>{checkSelf(curr?.user?.id, curr?.user?.firstName)} joined successfully</p>
                                    )
                                })
                            }
                            {
                                liveUsers?.map((curr, index) => {
                                    return (
                                        <p key={index + 1}>{checkSelf(curr?.id, curr?.firstName)} joined successfully</p>
                                    )
                                })
                            }
                        </div>
                        <div
                        onClick={()=>{navigate('/allraces',{ state: 'Upcoming Races' })}}
                     className="bg-[#2177cb] text-white p-2 rounded-lg font-semibold hover:underline cursor-pointer">
                        Back
                    </div>
                    </motion.div>
                    
                </motion.div>
            </AnimatePresence>
        </>
    );
};

export default RaceWaitingZone;
