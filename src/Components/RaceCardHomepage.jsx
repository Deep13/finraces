import React, { useEffect, useState } from 'react'
import box from '../assets/images/ongoingRaces/focus_box.svg'
import info from '../assets/images/ongoingRaces/info_icon.svg'
// import dashed_line from '../assets/images/dashed_line.svg'
// import dashedline_breaks from '../assets/images/dashedline_breaks.svg'
import gold_crown from '../assets/images/gold_crown.svg'
import silver_crown from '../assets/images/silver_corwn.svg'
import bronze_corwn from '../assets/images/bronze_corwn.svg'
import line_beside_medals from '../assets/images/line_beside_medals.png'
import person2 from '../assets/images/person2.png'
import start from '../assets/images/start.svg'
import finish from '../assets/images/finish.svg'
// import a from '../assets/images/a.png'
// import f from '../assets/images/f.png'
// import g from '../assets/images/g.png'
import { useNavigate } from 'react-router-dom'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { io } from 'socket.io-client'
import RaceTile from '../Components/RaceTile'
import { getStocksDataForRace } from '../Utils/api'


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

    useEffect(() => {
        getStocksDataForRace(raceId, (data) => {
            setStocksDataForRace(data)
        })
    }, [])

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
                // setRankList(getParticipantsWithRanks(data.data['race_result'], data.data['participantsWithNoRank']))
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
                <RaceTile
                    stocksData={stocksDataForRace}
                    stockRankList={stockRankList} />
                <div className='bg-[#edf7ff] z-20 relative -left-2'>
                    <img src={start} alt="" />
                </div>
                <div className='flex-1 border-dashed border-black border-t relative'>
                    <div className='absolute -top-[1.5rem] left-8 flex justify-center gap-2'>

                    </div>
                </div>
                <div className='bg-[#edf7ff] z-20 relative -right-2'>
                    <img src={finish} alt="" />
                </div>
            </div>
        </div>
    )
}

export default RaceCardHomepage