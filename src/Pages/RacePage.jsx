import { CgChevronRightO } from "react-icons/cg";
import React, { useEffect, useRef, useState } from 'react'
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
import { fetchRaceData, fetchAlreadyJoinedUsers } from "../Utils/api";
import io from 'socket.io-client'
import Countdown from "react-countdown";
import { ColorRing } from "react-loader-spinner";
import { Line } from 'react-chartjs-2';
import google from '../assets/images/g.svg'
import StockRankList from '../Components/StockRankList'
import UserRankingList from "../Components/UserRankingList";
import RaceTile from "../Components/RaceTile";
import avatar from '../assets/images/placeholderavatar.png'


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
    const [ranks, setRanks] = useState({
        1: Math.floor(Math.random() * 3) + 1,
        2: Math.floor(Math.random() * 3) + 1,
        3: Math.floor(Math.random() * 3) + 1,
    })





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


    // useEffect(() => {
    //     const fetchRankingData = async () => {
    //         try {
    //             // Example API call to fetch updated player rankings
    //             const response = await fetch('https://www.missionatal.com/api/your-ranking-endpoint'); // Replace with your API endpoint
    //             const data = await response.json();

    //             // Process data to extract player names and ranks
    //             const playerNames = data.map(player => player.name);
    //             const rankings = data.map(player => player.rank);

    //             setChartData({
    //                 labels: rankings.map(rank => rank.toString()), // X-axis (ranking from 1 to 10)
    //                 datasets: [
    //                     {
    //                         label: 'Player Rankings',
    //                         data: playerNames, // Y-axis (player names)
    //                         borderColor: 'blue',
    //                         backgroundColor: 'blue',
    //                         pointBackgroundColor: 'blue',
    //                         pointBorderColor: 'white',
    //                         pointRadius: 5,
    //                         pointHoverRadius: 7,
    //                     },
    //                 ],
    //             });
    //         } catch (error) {
    //             console.error('Error fetching ranking data:', error);
    //         }
    //     };

    //     // Initial data fetch
    //     fetchRankingData();

    //     // Refresh data every 5 seconds
    //     const intervalId = setInterval(fetchRankingData, 5000);

    //     // Clear interval on component unmount
    //     return () => clearInterval(intervalId);
    // }, []);


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
            }
            setisLoading(false)
        })
        fetchAlreadyJoinedUsers(race_id, (result) => {
            // console.log(result)
            setParticipantsCount(result.length)
            setJoinedUsers(result)
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
                // setMessage(prev => [...prev, `${data.data.firstName} ${data.data.lastName} has joined the race.`])
            }
            if (data.event === 'race-data') {
                // console.log(JSON.stringify(data.data))
                setRaceResults(data.data)
                setRankList(getParticipantsWithRanks(data.data['race_result'], data.data['participantsWithNoRank']))
                setStockRankList(data.data['stocks'])
            }
        });

        // Sending a message to the server
        setTimeout(() => {
            console.log('Sending message to server...');

            socket.emit('events', { content: 'Hello from client!' });
        }, 2000);
    }, [])


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
                                        <img className="absolute w-full h-full object-cover top-0 left-0 z-[4] scale-75" src={raceResults?.race_result[3]?.participants[0]?.user_name ? Person : avatar} alt="" />
                                        <img className="z-[5]" src={silver_frame} alt="" />
                                    </div>
                                    <p className="font-medium text-3 mt-[10px]">{raceResults?.race_result[3]?.participants[0]?.user_name}</p>
                                </div>
                                <div className="flex justify-center flex-col items-center relative bottom-8">
                                    <div className="mb-[1rem]">
                                        <img src={golden_king_corwn} alt="" />
                                        <div className="flex justify-center items-center">
                                            <img src={Polygon7} alt="" />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <img className="absolute w-full h-full object-cover top-0 left-0 z-[4] scale-[80%]" src={raceResults?.race_result[1]?.participants[0]?.user_name ? Person : avatar} alt="" />
                                        <img className="z-[5]" src={golden_frame} alt="" />
                                    </div>
                                    <p className="font-medium text-3 mt-[10px]">{raceResults?.race_result[1]?.participants[0]?.user_name}</p>
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
                                        <img className="absolute w-full h-full object-cover top-0 left-0 z-[4] scale-75" src={raceResults?.race_result[2]?.participants[0]?.user_name ? Person : avatar} alt="" />
                                        <img className="z-[5]" src={bronze_frame} alt="" />
                                    </div>
                                    <p className="font-medium text-3 mt-[10px]">{raceResults?.race_result[2]?.participants[0]?.user_name}</p>
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
                                    <p className="font-medium text-[0.9rem]">Race created by- {raceResults?.created_by?.firstName + " " + raceResults?.created_by?.lastName}</p>
                                    <p className="font-medium text-[0.9rem]">60 Minutes</p>
                                </div>

                                {/* race tile  */}
                                <div className="w-full flex justify-between border-dashed border-black border py-[3rem] relative">
                                    <div className="bg-[#f5f5f5] relative right-2 z-10">
                                        <img src={start} alt="" />
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
                                        ranks={ranks} // these are arbitrary ranks
                                        stockRankList={stockRankList} />

                                    {/* absolute elements  */}
                                    <div className="absolute w-full top-1/2 border-dashed border-black border">
                                    </div>
                                    <div className="absolute top-0 left-0 w-full h-full">
                                        <div className="border-r border-solid w-1/4"></div>
                                    </div>


                                    <div className="bg-[#f5f5f5] relative left-2">
                                        <img src={finish} alt="" />
                                    </div>
                                </div>
                            </div>

                            {/* other stocks rally  */}
                            <div className="flex-1 rounded-[20px] py-[13px] px-[16px] sm:max-w-[500px]  md:max-w-[650px] lg:max-w-[800px]">
                                <div className="flex justify-between w-full items-center mb-[18px]">
                                    <p className="font-medium text-[0.9rem]">Stock Ranking</p>
                                    <button><CgChevronRightO size={20} /></button>
                                </div>

                                <StockRankList stockRankList={stockRankList} />
                            </div>

                        </div>

                        {/* leaderboard  */}
                        <div className='flex flex-col'>
                            <div className='flex gap-[6px] mb-[11px]'>
                                <button className='w-[9rem] flex justify-center items-center py-[12.25px] bg-blue-600 text-white font-semibold rounded-[70px] text-[14px]' >Leaderboard</button>
                                <button className='w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px]' >Your Bets</button>
                            </div>
                            <div className='w-full rounded-[24px] p-[16px] bg-[#f5f5f5] max-h-screen'>
                                <div className='w-full flex justify-between items-center mb-[14px]'>
                                    <p className="font-semibold text-4">View all</p>
                                    <CgChevronRightO size={20} />
                                </div>
                                <UserRankingList rankList={rankList} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RacePage