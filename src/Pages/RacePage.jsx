import { CgChevronRightO } from "react-icons/cg";
import React, { useEffect, useRef, useState } from 'react'
import compass from '../assets/icons/sidebar/compass.svg'
import finance_idea from '../assets/icons/sidebar/finance_idea.svg'
import stats from '../assets/icons/sidebar/stats.svg'
import live_streaming from '../assets/icons/sidebar/live_streaming.svg'
import forward from '../assets/icons/sidebar/forward.svg'
import eth from '../assets/icons/sidebar/eth.svg'
import recent from '../assets/icons/sidebar/recent.svg'
import UserRankingCard from "../Components/UserRankingCard";
import box from '../assets/images/ongoingRaces/focus_box.svg'
import info from '../assets/images/ongoingRaces/info_icon.svg'
import start from '../assets/images/start.svg'
import finish from '../assets/images/finish.svg'
import StockPriceCard from "../Components/StockPriceCard";
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
import { fetchRaceData, fetchAlreadyJoinedUsers } from "../Utils/api";
import io from 'socket.io-client'
import Countdown from "react-countdown";
import { ColorRing } from "react-loader-spinner";
import { Line } from 'react-chartjs-2';
import { motion } from "framer-motion";
import google from '../assets/images/g.svg'
import fb from '../assets/images/f.png'
import a from '../assets/images/a.png'
import g from '../assets/images/g.png'

const RacePage = () => {

    const [isRaceStarted, setIsRaceStarted] = useState(false)
    const [raceDetails, setRaceDetails] = useState(null)
    const [isLoading, setisLoading] = useState(true)
    const [participantsCount, setParticipantsCount] = useState(0)
    const [joinedUsers, setJoinedUsers] = useState([])
    const [liveUsers, setLiveUsers] = useState([])
    const [Refresh, setRefresh] = useState('')
    const { race_id } = useParams()
    const joinedUsersRef = useRef([])
    const animationBoxRef = useRef()
    const [values, setValues] = useState([0, 0, 0])
    const [chartData, setChartData] = useState({
        labels: Array.from({ length: 10 }, (_, i) => (i + 1).toString()), // Ranking from 1 to 10
        datasets: [
            {
                label: 'Player Rankings',
                data: Array(10).fill(null),
                borderColor: 'blue',
                backgroundColor: 'blue',
                pointBackgroundColor: 'blue',
                pointBorderColor: 'white',
                pointRadius: 5,
                pointHoverRadius: 7,
            },
        ],
    });

    const getValue = (arg) => {
        // Prevent further execution if any value is 500 or more
        // if(!isRaceStarted) return
        if (values[0] >= 700 || values[1] >= 700 || values[2] >= 700) {
            return;
        }

        let nu3 = Math.floor(Math.random() * 3) + 1;

        setValues(prev => {
            let [val1, val2, val3] = prev;

            // Create a new set of updated values based on the random choice
            let newVal1 = val1, newVal2 = val2, newVal3 = val3;

            if (nu3 === 1) {
                newVal1 = Math.min(val1 + 200, 700);  // Larger step
                newVal2 = Math.min(val2 + 50, 700);   // Larger step
            } else if (nu3 === 2) {
                newVal1 = Math.min(val1 + 50, 700);   // Larger step
                newVal3 = Math.min(val3 + 50, 700);   // Larger step
            } else if (nu3 === 3) {
                newVal1 = Math.min(val1 + 100, 700);  // Larger step
                newVal2 = Math.min(val2 + 75, 700);   // Larger step
                newVal3 = Math.min(val3 + 150, 700);  // Larger step
            }

            // Ensure no two values are equal after the update
            if (newVal1 === newVal2 || newVal1 === newVal3 || newVal2 === newVal3) {
                return prev;  // If they would meet, return the original values (no update)
            }

            // Return the updated values
            return [newVal1, newVal2, newVal3];
        });
    };



    useEffect(() => {
        setInterval(getValue, 5000)
    }, [])

    useEffect(() => {
        const fetchRankingData = async () => {
            try {
                // Example API call to fetch updated player rankings
                const response = await fetch('/api/your-ranking-endpoint'); // Replace with your API endpoint
                const data = await response.json();

                // Process data to extract player names and ranks
                const playerNames = data.map(player => player.name);
                const rankings = data.map(player => player.rank);

                setChartData({
                    labels: rankings.map(rank => rank.toString()), // X-axis (ranking from 1 to 10)
                    datasets: [
                        {
                            label: 'Player Rankings',
                            data: playerNames, // Y-axis (player names)
                            borderColor: 'blue',
                            backgroundColor: 'blue',
                            pointBackgroundColor: 'blue',
                            pointBorderColor: 'white',
                            pointRadius: 5,
                            pointHoverRadius: 7,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching ranking data:', error);
            }
        };

        // Initial data fetch
        fetchRankingData();

        // Refresh data every 5 seconds
        const intervalId = setInterval(fetchRankingData, 5000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);


    useEffect(() => {
        // check if race started or not and then set the state of waiting card.
        // socket connection will be established here 
        fetchRaceData(race_id, (res) => {
            console.log('racedata:', res);
            setRaceDetails(res)
            if (res.status === 'running') {
                setIsRaceStarted(true)
            } else {
                setIsRaceStarted(false)
            }
            setisLoading(false)
        })
        fetchAlreadyJoinedUsers(race_id, (result) => {
            console.log(result)
            setParticipantsCount(result.length)
            setJoinedUsers(result)
        })
    }, [])

    useEffect(() => {
        setLiveUsers(joinedUsersRef.current)
    }, [Refresh])


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
            console.log('Connected to the server with id:', socket.id);

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
                // setMessage(prev => [...prev, `${data.data.firstName} ${data.data.lastName} has joined the race.`])
            }
            if (data.event === 'race-data') {
                // setLiveData(data)
                // var thesePositions = Object.keys(data.data.race_result).reduce((acc, rank) => {
                //     const stockNames = (data.data.race_result[rank].stocks || []).map(stock => stock.stock_name);
                //     acc[`rank${rank}`] = stockNames;
                //     return acc;
                // }, {});
                // setPositions(thesePositions)
                // setAnimationTrigger(prev => prev + 1);
            }
        });

        // Sending a message to the server
        setTimeout(() => {
            console.log('Sending message to server...');

            socket.emit('events', { content: 'Hello from client!' });
        }, 2000);
    }, [])

    useEffect(() => {
        console.log(raceDetails);

    }, [raceDetails])

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
                        status={raceDetails?.status}
                        // raceEnded = {false}
                        closeCard={setIsRaceStarted} />
            }
            <div className='w-full relative h-auto flex pb-8'>
                {/* Ensure sidebar is inside a container with sufficient height */}
                <div className="w-[4rem] flex-shrink-0 relative left-4 z-[9]"> {/* Prevent sidebar from flexing */}
                    <div className={`sticky top-24 left-6 transition-transform ease-out duration-300 flex flex-col gap-[0.7rem] z-[10]`}>
                        <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                            <img src={compass} alt="discover" />
                            Discover
                        </button>
                        <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                            <img src={stats} alt="stocks" />
                            Stocks
                        </button>
                        <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                            <img src={eth} alt="crypto" />
                            Crypto
                        </button>
                        <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                            <img src={live_streaming} alt="live races" />
                            Live Races
                        </button>
                        <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                            <img src={recent} alt="upcoming races" />
                            Upcoming Races
                        </button>
                        <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                            <img src={finance_idea} alt="my races" />
                            My Races
                        </button>
                        <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
                            <img src={forward} alt="my watchlist" />
                            My Watchlist
                        </button>
                    </div>
                </div>

                {/* dashboard  */}
                <div className='flex-1 px-[2%] md:px-[6%] pt-[2.1rem]'>
                    {/* this is full width container cuz we need the sidebar to remain at correct place */}
                    <div className='max-w-[1400px] w-full py-[11px] px-[20px] flex flex-col lg:flex-row gap-[15px] rounded-[24px] bg-[#faebff]'>

                        {/* actual dashboard  */}
                        <div className='flex-1 px-[22px] py-[18px]'>

                            <div className='w-full flex justify-between mb-[3.8rem]'>
                                <div className='flex gap-[0.76rem]'>
                                    <div></div>
                                    <div className='h-full'>
                                        <h3 className='text-[1.05rem] font-bold'>{raceDetails?.name}</h3>
                                        <p className='text-[0.7rem]'>
                                            Remaining time
                                            <span className="font-semibold ml-2">
                                                {raceDetails && <Countdown
                                                    date={raceDetails && raceDetails['end_date']}
                                                    renderer={({ hours, minutes, seconds }) => {
                                                        return `${hours}:${minutes}:${seconds}`
                                                    }}
                                                />}
                                            </span>
                                        </p>
                                    </div>
                                    <div className='relative top-1'>
                                        <img src={info} alt="info icon" />
                                    </div>
                                </div>
                                <div className='h-full flex flex-col justify-between items-end'>
                                    <h3 className='text-[1.05rem] font-bold'>Tech Stocks</h3>
                                    <p className='text-[0.7rem]'>{participantsCount} Participants</p>
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
                                        <img className="absolute w-full h-full object-cover top-0 left-0 z-[4] scale-75" src={Person} alt="" />
                                        <img className="z-[5]" src={silver_frame} alt="" />
                                    </div>
                                    <p className="font-medium text-3 mt-[10px]">David Copper</p>
                                </div>
                                <div className="flex justify-center flex-col items-center relative bottom-8">
                                    <div className="mb-[1rem]">
                                        <img src={golden_king_corwn} alt="" />
                                        <div className="flex justify-center items-center">
                                            <img src={Polygon7} alt="" />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <img className="absolute w-full h-full object-cover top-0 left-0 z-[4] scale-[80%]" src={Person} alt="" />
                                        <img className="z-[5]" src={golden_frame} alt="" />
                                    </div>
                                    <p className="font-medium text-3 mt-[10px]">Burt Macklin</p>
                                </div>
                                <div className="flex justify-center flex-col items-center">
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
                                    <p className="font-medium text-3 mt-[10px]">David Goggin</p>
                                </div>
                            </div>

                            <div className="flex-1 flex justify-center items-end gap-[2rem]">

                                <div className="w-[10rem] flex flex-col pt-[8px] pb-[1.5rem] items-center rounded-t-[10px] bg-[#eaf5f5]">
                                    <div className="gap-[4px] flex mb-[0.7rem]">
                                        <img src={diamond} alt="" />
                                        <p className="text-[12px] font-medium">1500</p>
                                    </div>
                                    <p className="font-medium text-4">WR: #12</p>
                                </div>
                                <div className="w-[10rem] flex flex-col pt-[8px] pb-[3rem] items-center rounded-t-[10px] bg-[#eaf5f5]">
                                    <div className="gap-[4px] flex mb-[0.7rem]">
                                        <img src={diamond} alt="" />
                                        <p className="text-[12px] font-medium">1500</p>
                                    </div>
                                    <p className="font-medium text-4">WR: #12</p>
                                </div>
                                <div className="w-[10rem] flex flex-col pt-[8px] pb-[1.5rem] items-center rounded-t-[10px] bg-[#eaf5f5]">
                                    <div className="gap-[4px] flex mb-[0.7rem]">
                                        <img src={diamond} alt="" />
                                        <p className="text-[12px] font-medium">1500</p>
                                    </div>
                                    <p className="font-medium text-4">WR: #12</p>
                                </div>

                            </div>

                            <div className="flex-1 rounded-[20px] bg-[#f5f5f5] py-[13px] px-[16px] mb-4 shadow-md">
                                <div className="flex justify-between w-full items-center mb-[18px]">
                                    <p className="font-medium text-[0.9rem]">Race created by- Max</p>
                                    <p className="font-medium text-[0.9rem]">60 Minutes</p>
                                </div>

                                {/* race tile  */}
                                <div className="w-full flex justify-between border-dashed border-black border py-[3rem] relative">
                                    <div className="bg-[#f5f5f5] relative -left-2 top-5">
                                        <img src={start} alt="" />
                                    </div>

                                    {/* here happens the magic  */}
                                    <div ref={animationBoxRef} id="animationBox" className="flex-1 flex flex-col w-full">

                                        <motion.div
                                            initial={{ x: 0, }}
                                            animate={{ x: values[0] }}
                                            transition={{ duration: 1, }}
                                            className="top-4 z-20 left-4 w-[3rem] h-[3rem] rounded-full bg-blue-400 flex">
                                            <img className="w-full h-full" src={fb} alt="" />
                                        </motion.div>
                                        <motion.div
                                            initial={{ x: 0, }}
                                            animate={{ x: values[1] }}
                                            transition={{ duration: 1, }}
                                            className="top-4 z-20 left-4 w-[3rem] h-[3rem] rounded-full bg-blue-400 flex">
                                            <img className="w-full h-full" src={a} alt="" />
                                        </motion.div>
                                        <motion.div
                                            initial={{ x: 0, }}
                                            animate={{ x: values[2] }}
                                            transition={{ duration: 1, }}
                                            className="top-4 z-20 left-4 w-[3rem] h-[3rem] rounded-full bg-blue-400 flex">
                                            <img className="w-full h-full" src={g} alt="" />
                                        </motion.div>

                                    </div>


                                    {/* absolute elements  */}
                                    <div className="absolute w-full top-1/2 border-dashed border-black border">
                                    </div>
                                    <div className="absolute top-0 left-0 w-full h-full">
                                        <div className="border-r border-solid w-1/4"></div>
                                    </div>


                                    <div className="bg-[#f5f5f5] relative -right-2 top-5">
                                        <img src={finish} alt="" />
                                    </div>
                                </div>
                            </div>

                            {/* other stocks rally  */}
                            <div className="flex-1 rounded-[20px] bg-[#f5f5f5] py-[13px] px-[16px] shadow-md">
                                <div className="flex justify-between w-full items-center mb-[18px]">
                                    <p className="font-medium text-[0.9rem]">Stock Ranking</p>
                                    <button><CgChevronRightO size={20} /></button>
                                </div>
                                <div className="w-full overflow-hidden flex gap-[10px]">
                                    <StockPriceCard />
                                    <StockPriceCard />
                                    <StockPriceCard />
                                </div>
                            </div>

                        </div>

                        {/* leaderboard  */}
                        <div className='flex flex-col'>
                            <div className='flex gap-[6px] mb-[11px]'>
                                <button className='w-[9rem] flex justify-center items-center py-[12.25px] bg-blue-600 text-white font-semibold rounded-[70px] text-[14px]' >Leaderboard</button>
                                <button className='w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px]' >Your Bets</button>
                            </div>
                            <div className='w-full rounded-[24px] p-[16px] bg-[#f5f5f5]'>
                                <div className='w-full flex justify-between items-center mb-[14px]'>
                                    <p className="font-semibold text-4">View all</p>
                                    <CgChevronRightO size={20} />
                                </div>
                                <div className="w-full flex flex-col gap-[9px]">
                                    <UserRankingCard />
                                    <UserRankingCard />
                                    <UserRankingCard />
                                    <UserRankingCard />
                                    <UserRankingCard />
                                    <UserRankingCard />
                                    <UserRankingCard />
                                    <UserRankingCard />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RacePage