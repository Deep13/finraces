import { CgChevronRightO } from "react-icons/cg";
import React, { useContext, useEffect, useRef, useState } from 'react'
import compass from '../assets/icons/sidebar/compass.svg'
import finance_idea from '../assets/icons/sidebar/finance_idea.svg'
import stats from '../assets/icons/sidebar/stats.svg'
import live_streaming from '../assets/icons/sidebar/live_streaming.svg'
import forward from '../assets/icons/sidebar/forward.svg'
import eth from '../assets/icons/sidebar/eth.svg'
import recent from '../assets/icons/sidebar/recent.svg'
import box from '../assets/images/ongoingRaces/focus_box.svg'
import info from '../assets/images/ongoingRaces/info_icon.svg'
import start from '../assets/images/start.svg'
import startdark from '../assets/images/startdark.svg'
import finishdark from '../assets/images/finishdark.svg'
import finish from '../assets/images/finish.svg'
import golden_frame from '../assets/images/golden_frame.png'
import silver_frame from '../assets/images/silver_frame.png'
import bronze_frame from '../assets/images/bronze_frame.png'
import golden_king_corwn from '../assets/images/golden_king_corwn.svg'
import silver_king_crown from '../assets/images/silver_king_crown.svg'
import bronze_king_crown from '../assets/images/bronze_king_crown.svg'
import Polygon7 from '../assets/images/Polygon7.svg'
import Person from '../assets/images/person2.png'
import diamond from '../assets/images/kerechi_diamondo.png'
import RaceWaitingZone from "../Components/RaceWaitingZone";
import { useParams } from "react-router-dom";
import { fetchRaceData, fetchAlreadyJoinedUsers, getRaceResults } from "../Utils/api";
import io from 'socket.io-client'
import Countdown from "react-countdown";
import { ColorRing } from "react-loader-spinner";
import { Line } from 'react-chartjs-2';
import google from '../assets/images/g.svg'
import StockRankList from '../Components/StockRankList'
import UserRankingList from "../Components/UserRankingList";
import RaceTile from "../Components/RaceTile";
import avatar from '../assets/images/placeholderavatar.png'
import { getStocksDataForRace } from "../Utils/api";
import ConfettiExplosion from 'react-confetti-explosion';
import { motion } from "motion/react";
import Sidebar from "../Components/Sidebar";
import { DarkModeContext } from "../Contexts/DarkModeProvider";



const RacePage = () => {

    const [isRaceStarted, setIsRaceStarted] = useState(false)
    const [raceDetails, setRaceDetails] = useState(null)
    const [isLoading, setisLoading] = useState(true)
    const [participantsCount, setParticipantsCount] = useState(0)
    const [joinedUsers, setJoinedUsers] = useState([])
    const [liveUsers, setLiveUsers] = useState([])
    const [Refresh, setRefresh] = useState('')
    const [stockRankList, setStockRankList] = useState(null)
    const [rankList, setRankList] = useState(null)
    const { race_id } = useParams()
    const joinedUsersRef = useRef([])
    const [raceResults, setRaceResults] = useState(null)
    const [stocksDataForRace, setStocksDataForRace] = useState(null)
    const [raceStatus, setRaceStatus] = useState('')
    const [ranks, setRanks] = useState({
        1: Math.floor(Math.random() * 3) + 1,
        2: Math.floor(Math.random() * 3) + 1,
        3: Math.floor(Math.random() * 3) + 1,
    })
    const [isExploding, setIsExploding] = useState(false)
    const { darkModeEnabled } = useContext(DarkModeContext)





    const getParticipantsWithRanks = (raceResult, participantsWithNoRank) => {
        // console.log(raceResult, participantsWithNoRank)
        const result = [];

        // Add participants with ranks from race_result
        Object.entries(raceResult).forEach(([rank, rankData]) => {
            rankData?.participants?.forEach(participant => {
                result.push({
                    user_id: participant.user_id,
                    user_name: participant.user_name,
                    rank: rank || "-" // Use the key as rank, or "-" if rank is not found
                });
            });
        });

        // Add participants with no rank, assigning rank as "-"
        participantsWithNoRank?.forEach(participant => {
            result.push({
                user_id: participant.user_id,
                user_name: participant.user_name,
                rank: "-"
            });
        });

        return result;
    }


    useEffect(() => {
        let interval = setInterval(() => {
            setRanks({
                1: Math.floor(Math.random() * 3) + 1,
                2: Math.floor(Math.random() * 3) + 1,
                3: Math.floor(Math.random() * 3) + 1,
            })
        }, 4000)

        fetchRaceData(race_id, (res) => {
            // console.log('racedata:', res);
            setRaceDetails(res)
            if (res.status === 'running') {
                setIsRaceStarted(true)
            } else {
                setIsRaceStarted(false)
                if (res.status === 'finished') {
                    getRaceResults(race_id, (data) => {
                        console.log("These are finished race results", data.result)
                        // just like when you get the race data in socket
                        // setFinishedRaceResults(data.result)
                        setRaceResults(data.result)
                        setIsExploding(true)
                        setRaceStatus('finished')
                        setStockRankList(data.result.stocks)
                        setRankList(getParticipantsWithRanks(data.result['race_result'], data.result['participantsWithNoRank']))
                        setTimeout(() => {
                            setIsExploding(false)
                        }, 4000)
                    })
                }
            }
            setisLoading(false)
        })
        fetchAlreadyJoinedUsers(race_id, (result) => {
            // console.log(result)
            setParticipantsCount(result.length)
            setJoinedUsers(result)
        })

        getStocksDataForRace(race_id, (data) => {
            console.log("API Response ", data)
            setStocksDataForRace(data)
        })

        // console.log('animation box width', box.current ? box.current.offsetWidth : 'no width is displayed')

        return () => {
            clearInterval(interval)
        }
    }, [])

    useEffect(() => {
        setLiveUsers(joinedUsersRef.current)
    }, [Refresh])

    useEffect(() => {
        console.log("This is race status >>>>>>>>", raceStatus);
        if (raceStatus === 'finished') {
            setIsExploding(true)
            setTimeout(() => {
                setIsExploding(false)
            }, 4000)
        }
    }, [raceStatus])



    // can you try this

    useEffect(() => {
        // Connect to the Nest.js Socket.IO server (replace the URL with your server's URL)
        const socket = io('http://3.90.114.42:3000', {
            reconnection: true, // Automatically reconnect if the connection is lost
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            transports: ['websocket'], // Use WebSocket transport
        });

        // Event listeners for the connection
        socket.on('connect', () => {
            // console.log('Connected to the server with id:', socket.id);

            const joinData = {
                raceId: race_id
            };

            socket.emit('watch-race', joinData);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from the server');
        });

        socket.on('reconnect_attempt', () => {
            console.log('Attempting to reconnect...');
        });

        socket.on('reconnect', (attemptNumber) => {
            console.log('Reconnected to the server after', attemptNumber, 'attempts');
        });

        socket.on('reconnect_failed', () => {
            console.log('Failed to reconnect to the server');
        });

        // Listening for any custom event (for example, a message event)
        socket.on('message', (data) => {
            // console.log('Message from server:', JSON.stringify(data, null, 2));
            if (data.event === 'user-joined') {
                console.log(data.data.firstName)
                if (data.data.firstName) {
                    // setJoinedUsers(previous => ([...previous, data.data.firstName]))
                    const objectAlreadyThere = joinedUsersRef.current.filter(curr => curr.id === data.data.id)

                    if (objectAlreadyThere.length === 0) {
                        joinedUsersRef.current = [...joinedUsersRef.current, data.data]
                        setRefresh('1')
                    }
                }
                // setMessage(prev => [...prev, ${data.data.firstName} ${data.data.lastName} has joined the race.])
            }
            if (data.event === 'race-data') {
                // console.log(JSON.stringify(data.data))
                setRaceResults(data.data)
                setRaceStatus(data.data.status)
                setRankList(getParticipantsWithRanks(data.data['race_result'], data.data['participantsWithNoRank']))
                setStockRankList(data.data['stocks'])
            }
        });

        // Sending a message to the server
        setTimeout(() => {
            console.log('Sending message to server...');

            socket.emit('events', { content: 'Hello from client!' });
        }, 2000);

        // Cleanup the socket connection when the component unmounts
        return () => {
            socket.disconnect();
            console.log('Socket disconnected');
        };
    }, [race_id])

    return (
        <>
            {
                isLoading ? <div className="fixed bg-black opacity-40 w-full h-screen top-0 left-0 grid place-items-center z-[999]">
                    <div>
                        <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />
                    </div>
                </div> :
                    !isRaceStarted && raceDetails && <RaceWaitingZone
                        start_date={raceDetails?.start_date}
                        raceStarted={isRaceStarted}
                        joinedUsersList={joinedUsers}
                        liveUsers={liveUsers}
                        race_id={race_id}
                        status={raceDetails?.status}
                        // raceEnded = {false}
                        closeCard={setIsRaceStarted} />
            }
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
                className='w-full relative h-auto flex pb-8 dark:bg-[#000924]'>
                {/* Ensure sidebar is inside a container with sufficient height */}
                <Sidebar />

                {/* dashboard  */}
                <div className='flex-1 px-[2%] md:px-[6%] pt-[2.1rem]'>
                    {/* this is full width container cuz we need the sidebar to remain at correct place */}
                    <div className='max-w-[1400px] w-full py-[11px] px-[20px] flex flex-col lg:flex-row gap-[15px] rounded-[24px] dark:bg-[#000D38] bg-[#faebff]'>

                        {/* actual dashboard  */}
                        <div className='flex-1 px-[22px] py-[18px]'>

                            <div className='w-full flex justify-between mb-[3.8rem]'>
                                <div className='flex gap-[0.76rem]'>
                                    <div></div>
                                    <div className='h-full'>
                                        <h3 className='text-[1.05rem] font-bold dark:text-white'>{raceDetails?.name}</h3>
                                        <p className='text-[0.7rem] dark:text-white'>
                                            Remaining time
                                            <span className="font-semibold ml-2">
                                                {raceDetails && <Countdown
                                                    date={raceDetails && raceDetails['end_date']}
                                                    renderer={({ hours, minutes, seconds }) => {
                                                        const formatTime = (time) => String(time).padStart(2, '0');
                                                        return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
                                                    }}
                                                />}
                                            </span>
                                        </p>
                                    </div>
                                    <div className='relative top-1'>
                                        <img src={info} alt="info icon" />
                                    </div>
                                </div>
                                <div>
                                    {isExploding && <ConfettiExplosion
                                        particleCount={200}
                                        particleSize={5}
                                        duration={2800}
                                    />}
                                </div>
                                <div className='h-full flex flex-col justify-between items-end'>
                                    <h3 className='text-[1.05rem] font-bold dark:text-white'>Tech Stocks</h3>
                                    <p className='text-[0.7rem] dark:text-white'>{participantsCount} Participants</p>
                                </div>
                            </div>

                            {/* top 3 users  */}
                            <div className="flex-1 flex justify-center items-center gap-[2rem]">
                                <div className="flex justify-center flex-col items-center">
                                    <div>
                                        <img src={silver_king_crown} alt="" />
                                        <div className="flex justify-center items-center">
                                            <img src={Polygon7} alt="" />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        {/* raceResults?.race_result['3']?.participants[0]?.user_name  */}
                                        {
                                            raceResults?.race_result[3]?.participants?.length > 0 ?
                                                <img className="absolute w-full h-full object-cover top-0 left-0 z-[4] scale-75" src={Person} alt="" /> :
                                                <img className="absolute w-full h-full object-cover top-0 left-0 z-[4] scale-75" src={avatar} alt="" />
                                        }
                                        <img className="z-[5]" src={silver_frame} alt="" />
                                    </div>
                                    <p className="font-medium text-3 mt-[10px] dark:text-white">{raceResults?.race_result['3']?.participants?.[0]?.user_name}</p>
                                </div>
                                <div className="flex justify-center flex-col items-center relative bottom-8">
                                    <div className="mb-[1rem]">
                                        <img src={golden_king_corwn} alt="" />
                                        <div className="flex justify-center items-center">
                                            <img src={Polygon7} alt="" />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <img className="absolute w-full h-full object-cover top-0 left-0 z-[4] scale-[80%]" src={raceResults?.race_result['1']?.participants?.[0]?.user_name ? Person : avatar} alt="" />
                                        <img className="z-[5]" src={golden_frame} alt="" />
                                    </div>
                                    <p className="font-medium text-3 mt-[10px] dark:text-white">{raceResults?.race_result['1']?.participants?.[0]?.user_name}</p>
                                </div>
                                {/* {raceResults?.race_result[2]?.participants[0]?.user_name !== undefined && <div className="flex justify-center flex-col items-center">
                                    <div>
                                        <img src={bronze_king_crown} alt="" />
                                        <div className="flex justify-center items-center">
                                            <img src={Polygon7} alt="" />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <img className="absolute w-full h-full object-cover top-0 left-0 z-[4] scale-75" src={Person} alt="" />
                                        <img className="z-[5]" src={bronze_frame} alt="" />
                                    </div>
                                    <p className="font-medium text-3 mt-[10px]">{raceResults?.race_result[2]?.participants[0]?.user_name}</p>
                                </div>} */}
                                <div className="flex justify-center flex-col items-center">
                                    <div>
                                        <img src={bronze_king_crown} alt="" />
                                        <div className="flex justify-center items-center">
                                            <img src={Polygon7} alt="" />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        {
                                            raceResults?.race_result['2']?.participants?.length > 0 ?
                                                <img className="absolute w-full h-full object-cover top-0 left-0 z-[4] scale-75" src={Person} alt="" /> :
                                                <img className="absolute w-full h-full object-cover top-0 left-0 z-[4] scale-75" src={avatar} alt="" />
                                        }
                                        <img className="z-[5]" src={bronze_frame} alt="" />
                                    </div>
                                    <p className="font-medium text-3 mt-[10px] dark:text-white">{raceResults?.race_result['2']?.participants?.[0]?.user_name}</p>
                                </div>
                            </div>

                            <div className="flex-1 flex justify-center items-end gap-[2rem]">

                                <div className="w-[10rem] flex flex-col pt-[8px] pb-[1.5rem] items-center rounded-t-[10px] bg-[#eaf5f5] dark:bg-gradient-to-b from-[#012864] from-10% to-100% to-[#002763] dark:text-white">
                                    <div className="gap-[4px] flex mb-[0.7rem]">
                                        <img src={diamond} alt="" />
                                        <p className="text-[12px] font-medium">1500</p>
                                    </div>
                                    <p className="font-medium text-4">WR: #12</p>
                                </div>
                                <div className="w-[10rem] flex flex-col pt-[8px] pb-[3rem] items-center rounded-t-[10px] bg-[#eaf5f5] dark:bg-gradient-to-b from-[#012864] from-10% to-100% to-[#002763] dark:text-white">
                                    <div className="gap-[4px] flex mb-[0.7rem]">
                                        <img src={diamond} alt="" />
                                        <p className="text-[12px] font-medium">1500</p>
                                    </div>
                                    <p className="font-medium text-4">WR: #12</p>
                                </div>
                                <div className="w-[10rem] flex flex-col pt-[8px] pb-[1.5rem] items-center rounded-t-[10px] bg-[#eaf5f5] dark:bg-gradient-to-b from-[#012864] from-10% to-100% to-[#002763] dark:text-white">
                                    <div className="gap-[4px] flex mb-[0.7rem]">
                                        <img src={diamond} alt="" />
                                        <p className="text-[12px] font-medium">1500</p>
                                    </div>
                                    <p className="font-medium text-4">WR: #12</p>
                                </div>
                            </div>

                            <div className="flex-1 rounded-[20px] bg-[#f5f5f5] py-[13px] px-[16px] mb-4 shadow-md dark:bg-[#002763] dark:border dark:border-[#00387E]">
                                <div className="flex justify-between w-full items-center mb-[18px] dark:text-white">
                                    <p className="font-medium text-[0.9rem]">Race created by- {raceResults?.created_by?.firstName + " " + raceResults?.created_by?.lastName}</p>
                                    <p className="font-medium text-[0.9rem]">60 Minutes</p>
                                </div>

                                {/* race tile  */}
                                <div className="w-full h-auto flex justify-between border-dashed dark:border-white border-black border py-[3rem] relative items-center">
                                    <div className="bg-[#f5f5f5] relative right-2 z-10 dark:bg-[#002763]">
                                        <img src={darkModeEnabled ? startdark : start} alt="" />
                                    </div>
                                    {/* here happens the magic  */}
                                    {/* each time socket fires data you extract stocks from that data and
                                    assign rank  */}
                                    {/* logic here will be like I will be extracging all the stocks 
                                    and then assign rank each time data is upadated to each of them.
                                    make sure the list of stocks you are bringing here is in sorted
                                     order   only the rank field is changing for them*/}
                                    {/* we should supply here only the array of stocks with rank field  */}
                                    {/* it is coming from the stocksList  */}
                                    <RaceTile
                                        raceStatus={raceStatus}
                                        ranks={ranks} // these are arbitrary ranks
                                        stocksData={stocksDataForRace}
                                        stockRankList={stockRankList} />

                                    {/* absolute elements  */}
                                    <div className="absolute w-full top-1/2 border-dashed border-black border dark:border-white" />
                                    <div className="absolute top-0 left-0 w-full h-full">
                                        <div className="border-r border-solid w-1/4"></div>
                                    </div>


                                    <div className="bg-[#f5f5f5] relative left-2 dark:bg-[#002763]">
                                        <img src={darkModeEnabled ? finishdark : finish} alt="" />
                                    </div>
                                </div>
                            </div>

                            {/* other stocks rally  */}
                            <div className="flex-1 rounded-[20px] py-[13px] px-[16px] sm:max-w-[500px]  md:max-w-[650px] lg:max-w-[800px]">
                                <div className="flex justify-between w-full items-center mb-[18px]">
                                    <p className="font-medium text-[0.9rem] dark:text-white">Stock Ranking</p>
                                    <button><CgChevronRightO color={darkModeEnabled ? 'white' : 'black'} size={20} /></button>
                                </div>

                                <StockRankList
                                    stocksData={stocksDataForRace} // data from api below is data from socket
                                    stockRankList={stockRankList} />
                            </div>

                        </div>

                        {/* leaderboard  */}
                        <div className='flex flex-col'>
                            <div className='flex gap-[6px] mb-[11px]'>
                                <button className='w-[9rem] flex justify-center items-center py-[12.25px] bg-blue-600 text-white font-semibold rounded-[70px] text-[14px] dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF]' >Leaderboard</button>
                                <button className='w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px] dark:text-white' >Your Bets</button>
                            </div>
                            <div className='w-full rounded-[24px] p-[16px] bg-[#f5f5f5] max-h-screen overflow-auto custom-scrollbar dark:bg-[#001A50]'>
                                <div className='w-full flex justify-between items-center mb-[14px]'>
                                    <p className="font-semibold text-4 dark:text-white">View all</p>
                                    <CgChevronRightO color={darkModeEnabled ? 'white' : 'black'} size={20} />
                                </div>
                                <UserRankingList rankList={rankList} />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default RacePage