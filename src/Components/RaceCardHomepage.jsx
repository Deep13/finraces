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


const RaceCardHomepage = ({
    raceId = '54asdffasaFSf',
    raceName = 'Abstrace Race',
    end_date,
    start_Date
    // participants,
}) => {

    const [stockRankList, setStockRankList] = useState(null)
    // const [raceResult, setRaceResult] = useState(null)
    const [stocksDataForRace, setStocksDataForRace] = useState(null)
    const [participants, setParticipants] = useState([])
    const { darkModeEnabled } = useContext(DarkModeContext)
    const [rankList, setRankList] = useState([{ user_name: "-", user_photo: "" }, { user_name: "-", user_photo: "" }, { user_name: "-", user_photo: "" }])

    useEffect(() => {
        getStocksDataForRace(raceId, (data) => {
            setStocksDataForRace(data)
        })
    }, [])

    useEffect(() => {
        // Connect to the Nest.js Socket.IO server (replace the URL with your server's URL)
        const socket = io('https://www.missionatal.com', {
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
                raceId: raceId
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
                // setRaceResults(data.data)
                setParticipants(getParticipants(data.data['race_result'], data.data['participantsWithNoRank']))
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
    }, [raceId])

    const getParticipants = (raceResult, participantsWithNoRank) => {
        // console.log(raceResult, participantsWithNoRank)
        var result = [];
        Object.entries(raceResult).forEach(([rank, rankData]) => {
            rankData?.participants?.forEach(participant => {
                var ifexist = result.filter(val => val.user_id == participant.user_id);

                if (ifexist.length == 0) {
                    result.push({
                        user_id: participant.user_id,
                        user_name: participant.user_name,
                        rank: rank || "-" // Use the key as rank, or "-" if rank is not found
                    });
                }
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

    const getParticipantsWithRanks = (raceResult, participantsWithNoRank) => {
        // console.log(raceResult, participantsWithNoRank)
        var result = [];
        result = [raceResult[1]?.participants?.length > 0 ? raceResult[1]?.participants[0] : { user_name: "-", user_photo: "" }, raceResult[2]?.participants?.length > 0 ? raceResult[2]?.participants[0] : { user_name: "-", user_photo: "" }, raceResult[3]?.participants?.length > 0 ? raceResult[3]?.participants[0] : { user_name: "-", user_photo: "" }]
        return result;
    }


    const navigate = useNavigate()

    const getRemainingSeconds = (targetDate, initial_date) => {
        const targetTime = new Date(targetDate).getTime(); // Convert target date to milliseconds
        const currentTime = new Date(initial_date).getTime(); // Get current time in milliseconds

        // Calculate difference in seconds
        const remainingSeconds = Math.floor((targetTime - currentTime) / 1000);

        return remainingSeconds > 0 ? remainingSeconds : 0; // Return 0 if the date has passed
    }


    return (
        <div onClick={() => navigate(`/race/${raceId}`)} className='rounded-[24px] border border-black px-[1.1rem] py-[1rem] bg-[#edf7ff] dark:bg-[#002864] flex flex-col overflow-hidden cursor-pointer dark:border dark:border-[#00397E]'>
            <div className='w-full flex justify-between mb-[14px]'>
                <div className='flex gap-[0.76rem] flex-1'>
                    <img className='w-12 h-12' src={darkModeEnabled ? boxdark : box} alt="box icon" />
                    <div className='h-full'>
                        <h3 className='text-[0.85rem] line-clamp-3 font-bold dark:text-white'>{raceName}</h3>
                        {/* <p className='text-[0.7rem]'>XYZ</p> */}
                    </div>
                    {/* <div className=''>
                        <img className='w-[10px] h-[10px]' src={info} alt="info icon" />
                    </div> */}
                </div>
                <div className='flex-1 flex justify-center'>
                    <CountdownCircleTimer
                        isPlaying
                        size={50}
                        strokeWidth={3}
                        duration={getRemainingSeconds(end_date, start_Date)} // total duration depcits a full circle.
                        colors={['#5b89ff']}
                        initialRemainingTime={getRemainingSeconds(end_date, new Date())} // time that is remaining from now
                        colorsTime={[7]}>
                        {({ remainingTime }) => {
                            const hours = Math.floor(remainingTime / 3600)
                            const minutes = Math.floor((remainingTime % 3600) / 60)
                            const seconds = remainingTime % 60

                            return <div className='text-[0.7rem] font-semibold dark:text-white'>
                                {hours}:{minutes}:{seconds}`
                            </div>
                        }}
                    </CountdownCircleTimer>
                </div>
                <div className='h-full flex flex-col justify-start items-end flex-1'>
                    <h3 className='text-[1.05rem] font-bold dark:text-white'>{`${participants?.length} participants`}</h3>
                    {/* <p className='text-[0.7rem] dark:text-white'>{`${participants?.length} participants`}</p> */}
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

                    <div className='relative aspect-square p-[10px] scale-90 z-[5] flex justify-center item-center flex-col'>
                        <div className='relative flex justify-center items-center'>
                            <img className='absolute z-[-1] w-[50%] rounded-[50%]' src={rankList[0].user_photo ? rankList[0].user_photo.path : placeholder} />
                            <img className='w-full h-full object-cover w-[100px]' src={silver_crown} alt="1st position person" />
                        </div>
                        <p className='relative  text-center font-semibold text-[12px] dark:text-white'>{rankList[0].user_name}</p>
                    </div>

                    <div className='relative aspect-square p-[10px] z-[5] flex justify-center item-center flex-col'>
                        <div className='relative flex justify-center items-center'>
                            <img className='absolute z-[-1] w-[50%] rounded-[50%]' src={rankList[1].user_photo ? rankList[1].user_photo.path : placeholder} />
                            <img className='w-full h-full object-cover w-[110px]' src={gold_crown} alt="1st position person" />
                        </div>
                        <p className='relative text-center font-semibold text-[12px] dark:text-white'>{rankList[1].user_name}</p>
                    </div>

                    <div className='relative aspect-square p-[10px] scale-90 z-[5] flex justify-center item-center flex-col'>
                        <div className='relative flex justify-center items-center'>
                            <img className='absolute z-[-1] w-[50%] rounded-[50%]' src={rankList[2].user_photo ? rankList[2].user_photo.path : placeholder} />
                            <img className='w-full h-full object-cover w-[100px]' src={bronze_corwn} alt="1st position person" />
                        </div>
                        <p className='relative  text-center font-semibold text-[12px] dark:text-white'>{rankList[2].user_name}</p>
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

            <div className='w-full flex-1 mt-3 relative border border-dashed border-black dark:border-white  bg-[#edf7ff] flex justify-between items-center py-[2rem] dark:bg-[#002864]'>
                <div className='bg-[#edf7ff] z-20 relative -left-2 dark:bg-[#002864]'>
                    <img src={darkModeEnabled ? startdark : start} alt="" />
                </div>
                <RaceTile
                    stocksData={stocksDataForRace}
                    stockRankList={stockRankList} />
                <div className="absolute w-full top-1/2 border-dashed border-black border dark:border-white" />
                <div className='bg-[#edf7ff] z-20 relative -right-2 dark:bg-[#002864]'>
                    <img src={darkModeEnabled ? finishdark : finish} alt="" />
                </div>
            </div>
        </div>
    )
}

export default RaceCardHomepage