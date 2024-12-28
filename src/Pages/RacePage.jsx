import { CgChevronRightO } from "react-icons/cg";
import React, { useContext, useEffect, useRef, useState } from 'react'
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
import Person from '../assets/images/person3.png'
import Placeholder from '../assets/images/placeholder.png'
import Person2 from '../assets/images/person23.png'
import diamond from '../assets/images/kerechi_diamondo.png'
import RaceWaitingZone from "../Components/RaceWaitingZone";
import { useParams } from "react-router-dom";
import { fetchRaceData, fetchAlreadyJoinedUsers, getRaceResults, fetchParticipantsData, fetchRaceDataDetailed } from "../Utils/api";
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
import ImageSlider from "../Components/ImageSlider";
import YourBetsCard from '../Components/YourBetsCard'
// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     CarouselNext,
//     CarouselPrevious,
// } from "@/components/ui/carousel"



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
    const [tabs, setTabs] = useState('leaderboard')
    const [imageData, setImageData] = useState([Placeholder])
    const [imageData2, setImageData2] = useState([Placeholder])
    const [imageData3, setImageData3] = useState([Placeholder])
    const [currentImage, setCurrentImage] = useState(0)
    const [imageRank, setImageRank] = useState({})
    const [bronzeUser, setBronzeUser] = useState(0)
    const [duration, setDuration] = useState('')
    const flag = useRef(0)
    const userDetails = localStorage.getItem('userDetails')
    const stockChart = useRef()

    const fetchParticipantData = (id) => {
        fetchParticipantsData(id, (data) => {
            // console.log("Race Participants data", data)
            // setRaceUsersData(data.participants)
            setisLoading(false)
            let obj = {}
            let arr = [Placeholder]
            console.log(window.location.origin)
            data?.participants?.map((val, index) => {
                obj[val.id] = {
                    image: val?.photo?.path,
                    position: index + 1
                }
                arr.push(val?.photo?.path)
            })
            setImageData(arr)
            setImageRank(obj)
        })
    }

    function calculateDuration(start_date, end_date) {
        // Parse the start and end dates
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        // Calculate the difference in milliseconds
        const differenceInMs = endDate - startDate;

        // Convert milliseconds to minutes
        const totalMinutes = Math.floor(differenceInMs / (1000 * 60));

        // Get the hours and remaining minutes
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return { hours, minutes };
    }

    function calculateDurationInSeconds(start_date, end_date) {
        // Parse the start and end dates
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        // Calculate the difference in milliseconds
        const differenceInMs = endDate - startDate;

        // Convert milliseconds to seconds
        const totalSeconds = Math.floor(differenceInMs / 1000);

        return totalSeconds;
    }




    const sortAlphabetically = (stockRankList) => stockRankList?.slice().sort((a, b) =>
        a.localeCompare(b)
    )
    const sortAlphabetically2 = (stockRankList) => stockRankList?.slice().sort((a, b) =>
        a.stock_ticker.localeCompare(b.stock_ticker)
    )



    const getParticipantsWithRanks = (raceResult, participantsWithNoRank) => {
        // console.log(raceResult, participantsWithNoRank)
        const result = [];

        // Add participants with ranks from race_result
        Object.entries(raceResult).forEach(([rank, rankData]) => {
            rankData?.participants?.forEach(participant => {
                result.push({
                    user_id: participant.user_id,
                    user_name: participant.user_name,
                    user_photo: participant.user_photo ? participant.user_photo.path : Placeholder,
                    rank: rank || "-" // Use the key as rank, or "-" if rank is not found
                });
            });
        });

        // Add participants with no rank, assigning rank as "-"
        participantsWithNoRank?.forEach(participant => {
            result.push({
                user_id: participant.user_id,
                user_name: participant.user_name,
                user_photo: participant.user_photo ? participant.user_photo.path : Placeholder,
                rank: "-"
            });
        });

        return result;
    }

    const updateUser = () => {
        // let arr = [...imageData]
        // arr[1] = Person2
        // setImageData(arr)
        // setCurrentImage(1)
        setBronzeUser(1)
    }
    const updateUser2 = () => {
        let arr = [...imageData]
        arr[1] = Placeholder
        setImageData2(arr)
        setCurrentImage(1)
    }
    const updateUser3 = () => {
        let arr = [...imageData]
        arr[1] = Placeholder
        setImageData3(arr)
        setCurrentImage(1)
    }

    // const sortedStockRankList = (stockRankList) => stockRankList?.slice().sort((a, b) =>
    //     a.stock_name.localeCompare(b.name)
    // )


    useEffect(() => {
        let interval = setInterval(() => {
            setRanks({
                1: Math.floor(Math.random() * 3) + 1,
                2: Math.floor(Math.random() * 3) + 1,
                3: Math.floor(Math.random() * 3) + 1,
            })
        }, 4000)

        fetchParticipantData(race_id) // this is local


        fetchRaceData(race_id, (res) => {
            // console.log('racedata :', res);
            setRaceDetails(res)
            const { hours, minutes } = calculateDuration(res.start_date, res.end_date)
            // setDuration((hours && (hours + " Hours ")) + (minutes && (minutes + " Minutes")))
            setDuration(() => {
                let str;
                if (hours !== 0) {
                    str = hours + " Hours ";
                }
                if (minutes !== 0) {
                    str = str + minutes + " Minutes"
                }
                return str
            }) // brilliant logic
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

        //fetch all races data
        fetchRaceDataDetailed(race_id, (res) => {
            console.log('racedata detailed:', res);
            const barColors = ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)'];

            // Initialize Chart.js
            const ctx = document.getElementById('stockChart').getContext('2d');
            let stocks = (res.stocks) // this will be the natural position of stocks at first
            let stockNames = stocks.map(curr => (curr.ticker))
            let elapsedTime = calculateDurationInSeconds(res.start_date, new Date().toISOString())
            let positionsOfStocks = stocks?.map((stock, index) => {
                const relativePosition = ((stocks.length - index) / stocks.length) + elapsedTime;    // here 5 is total no. of stocks  *10 is not required here
                return relativePosition;
            })
            console.log('stocks populated names', stockNames)
            let totalSeconds = calculateDurationInSeconds(res.start_date, res.end_date)
            const data = {
                labels: sortAlphabetically(stockNames), // stocks from api extract Name from the response array
                datasets: [
                    {
                        label: 'Relative Positions Over Time',
                        data: [], // Initial data (will be updated dynamically)
                        backgroundColor: barColors, // Assign different colors to each bar
                        borderColor: 'rgba(0, 0, 0, 1)',
                        borderWidth: 1,
                        barThickness: 10, // Reduce the width of the bars
                    },
                ],
            }
            const imagePlugin = {
                id: 'barEndImage',
                beforeDraw: (chart) => {
                    const { ctx, data } = chart;
                    const image = new Image();
                    image.src = 'https://via.placeholder.com/20'; // Replace with your image URL

                    chart.data.datasets.forEach((dataset, datasetIndex) => {
                        const meta = chart.getDatasetMeta(datasetIndex);
                        meta.data.forEach((bar, index) => {
                            const barX = bar.x; // End of the bar on the x-axisconst barY = bar.y; // Center of the bar on the y-axis// Draw image at the end of each bar
                            const barY = bar.y;
                            image.onload = () => {
                                ctx.drawImage(image, barX + 5, barY - 10, 20, 20); // Adjust positioning and size
                            };
                        });
                    });
                },
            };
            stockChart.current = new Chart(ctx, {
                type: 'bar', // Use 'bar' type and set orientation in options
                data: data,
                plugins: [imagePlugin],
                options: {
                    indexAxis: 'y', // Change orientation to horizontal
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                display: false
                            },
                            grid: {
                                drawTicks: false
                            },
                            beginAtZero: true,
                            min: 0,
                            max: totalSeconds, // Set fixed length of x-axis to 2 minutes
                            title: {
                                display: false,
                                text: 'Time (seconds)',
                            },
                        },
                        y: {
                            ticks: {
                                display: false,
                                // padding: 5
                            },
                            grid: {
                                drawTicks: false
                            },
                            beginAtZero: true,
                            title: {
                                display: false,
                                text: 'Stocks',
                            },
                        },
                    },
                },
            });
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

        window.scrollTo(0, 0);
        return () => {
            clearInterval(interval)
        }
    }, [])

    useEffect(() => {
        setLiveUsers(joinedUsersRef.current)
    }, [Refresh])

    useEffect(() => {
        imageRank.length > 0 && setBronzeUser(imageRank[raceResults?.race_result['2']?.participants?.[0]?.user_id].position)
    }, [raceResults])

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
                setRaceResults(data.data)
                setRaceStatus(data.data.status)
                setRankList(getParticipantsWithRanks(data.data['race_result'], data.data['participantsWithNoRank']))
                setStockRankList(data.data['stocks'])
                flag.current += 1
                // console.log('this Race data', data)
                let elapsedTime = calculateDurationInSeconds(data.data.start_date, new Date().toISOString())
                let newPosArr = []
                sortAlphabetically2(data.data['stocks'])?.forEach((stock) => {
                    const relativePosition = ((((data.data['stocks'].length - stock.rank) * 10) / data.data['stocks'].length) + elapsedTime);    // here 5 is total no. of stocks  *10 is not required here
                    newPosArr.push(relativePosition)
                })
                console.log('New Positions Array', newPosArr)
                stockChart.current.data.datasets[0].data = newPosArr; // newPositon is new Array
                stockChart.current.update(); // will be written in in socket
            }
        });

        // Sending a message to the server
        setTimeout(() => {
            console.log('Sending message to server...');

            socket.emit('events', { content: 'Hello from client!' });
        }, 2000);

        // Cleanup the socket connection when the component unmounts
        return () => {
            if (socket) socket.disconnect();
            console.log('Socket disconnected');
        };
    }, [race_id])

    const findImageUrlForStock = (id) => stocksDataForRace[Object.keys(stocksDataForRace).find(element => element === id)]?.icon_url

    useEffect(() => {

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
                        raceName={raceDetails?.name}
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
                    <div className='max-w-[1400px] w-full py-[11px] px-[20px] flex flex-col lg:flex-row gap-[15px] rounded-[24px] dark:bg-[#000D38] bg-[#EDF7FF]'>

                        {/* actual dashboard  */}
                        <div className='flex-1 px-[22px] py-[18px]'>

                            <div className='w-full flex justify-between mb-[3.8rem]'>
                                <div className='flex gap-[0.76rem]'>
                                    <div></div>
                                    <div className='h-full'>
                                        <h3 className='text-[1.05rem] font-bold dark:text-white'>{raceDetails?.name}</h3>
                                        <p className='text-[0.7rem] dark:text-white'>
                                            Race Duration
                                            <span className="font-semibold ml-2">
                                                {duration}
                                            </span>
                                        </p>
                                    </div>
                                    {/* <div className='relative top-1'>
                                        <img src={info} alt="info icon" />
                                    </div> */}
                                </div>
                                <div>
                                    {isExploding && <ConfettiExplosion
                                        particleCount={200}
                                        particleSize={5}
                                        duration={2800}
                                    />}
                                </div>
                                <div className='h-full flex flex-col justify-between items-end'>
                                    <h3 className='text-[1.05rem] font-bold dark:text-white flex gap-1'>{participantsCount} <span>{participantsCount === 1 ? 'Participant' : "Participants"}</span> </h3>
                                    {/* <p className='text-[0.7rem] dark:text-white'>{participantsCount} Participants</p> */}
                                </div>
                            </div>

                            {/* top 3 users  */}
                            <div className="flex-1 flex justify-center items-center gap-[2rem] mb-[20px]">
                                <div className="flex justify-center flex-col items-center">
                                    <div className="z-[10]">
                                        <img src={silver_king_crown} alt="" />
                                        <div className="flex justify-center items-center">
                                            <img src={Polygon7} alt="" />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <img className="z-[5] relative w-[100%] h-[145px]" src={silver_frame} alt="" />
                                        <div className={`w-full ${darkModeEnabled && 'glow'} h-[123px] mt-[14px] pr-[2px] absolute top-0 left-0 overflow-hidden`}>
                                            <ImageSlider
                                                data={imageData}
                                                currentImage={Object.keys(imageRank).length > 0 && raceResults ? imageRank[raceResults?.race_result['2']?.participants?.[0]?.user_id]?.position : 0}
                                            />
                                        </div>
                                    </div>
                                    <p className="font-medium text-3 mt-[10px] dark:text-white">{raceResults?.race_result['2']?.participants?.[0]?.user_name}</p>
                                </div>

                                <div className="flex justify-center flex-col items-center relative bottom-8">
                                    <div className="mb-[1rem]">
                                        <img src={golden_king_corwn} alt="" />
                                        <div className="flex justify-center items-center">
                                            <img src={Polygon7} alt="" />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <img className="z-[5] relative w-[100%] h-[145px]" src={golden_frame} alt="" />
                                        {/* <img className={`absolute ${darkModeEnabled && 'glow'} w-full h-full object-cover top-0 left-0 z-[4] scale-75`} src={raceResults?.race_result['1']?.participants?.[0]?.user_name ? Person : avatar} alt="" /> */}
                                        <div className={`w-full ${darkModeEnabled && 'glow'} h-[123px] mt-[14px] pr-[2px] absolute top-0 left-0 overflow-hidden`}>
                                            <ImageSlider
                                                data={imageData}
                                                currentImage={Object.keys(imageRank).length > 0 && raceResults ? imageRank[raceResults?.race_result[1]?.participants?.[0]?.user_id]?.position : 0}
                                            />
                                        </div>
                                    </div>
                                    <p className="font-medium text-3 mt-[10px] dark:text-white">{raceResults?.race_result[1]?.participants?.[0]?.user_name}</p>
                                </div>

                                <div className="flex justify-center flex-col items-center">
                                    <div className="z-[10]">
                                        <img src={bronze_king_crown} alt="" />
                                        <div className="flex justify-center items-center">
                                            <img src={Polygon7} alt="" />
                                        </div>
                                    </div>
                                    <div className="relative w-full h-full">
                                        <img className="z-[5] relative w-[100%] h-[145px]" src={bronze_frame} alt="" />
                                        <div className={`w-full ${darkModeEnabled && 'glow'} h-[123px] mt-[12px] pr-[2px] absolute top-0 left-0 overflow-hidden`}>
                                            <ImageSlider
                                                data={imageData}
                                                currentImage={Object.keys(imageRank).length > 0 && raceResults ? imageRank[raceResults?.race_result[3]?.participants?.[0]?.user_id]?.position : 0}
                                            />
                                        </div>
                                    </div>
                                    <p className="font-medium text-3 mt-[10px] dark:text-white">{raceResults?.race_result[3]?.participants?.[0]?.user_name}</p>
                                </div>
                            </div>

                            <div className="flex-1 flex justify-center items-end gap-[2rem]">

                                <div className={`w-[10rem] flex flex-col pt-[16px] pb-[1.5rem] items-center rounded-t-[10px] bg-[#eaf5f5] dark:bg-gradient-to-b from-[#012864] from-10% to-100% to-[#002763] dark:text-white ${darkModeEnabled && 'shadowImperial'}`}>
                                    {
                                        stockRankList &&
                                        <div className="mb-[0.7rem] rounded-xl w-[2.5rem] h-[2.5rem] overflow-hidden">
                                            {/* <p className="text-[12px] font-medium">1500</p> */}
                                            {findImageUrlForStock(stockRankList['1']?.stock_id) && <img className="w-full h-full object-cover" src={findImageUrlForStock(stockRankList['1']?.stock_id)} alt="" />}
                                            {!findImageUrlForStock(stockRankList['1']?.stock_id) && <div className='w-full h-full bg-gradient-to-l rounded-lg from-[#005BFF] to-[#5B89FF] dark:text-white font-bold grid place-items-center' src={findImageUrlForStock(stockRankList['1']?.stock_id)} alt="" >{stockRankList['1']?.stock_name.substring(0, 2)}</div>}
                                        </div>
                                    }
                                    <p className="text-xs text-center font-medium px-4 line-clamp-2 text-ellipsis">
                                        {
                                            stockRankList && stockRankList['1']?.stock_name
                                        }
                                    </p>
                                </div>
                                <div className={`w-[10rem] flex flex-col pt-[16px] pb-[4rem] items-center rounded-t-[10px] bg-[#eaf5f5] dark:bg-gradient-to-b from-[#012864] from-10% to-100% to-[#002763] dark:text-white ${darkModeEnabled && 'shadowImperial'} text-center`}>
                                    {
                                        stockRankList &&
                                        <div className="mb-[0.7rem] rounded-xl w-[2.5rem] h-[2.5rem] overflow-hidden">
                                            {/* <p className="text-[12px] font-medium">1500</p> */}
                                            {findImageUrlForStock(stockRankList['0']?.stock_id) && <img className="w-full h-full object-cover" src={findImageUrlForStock(stockRankList['0']?.stock_id)} alt="" />}
                                            {!findImageUrlForStock(stockRankList['0']?.stock_id) && <div className='w-full h-full bg-gradient-to-l rounded-lg from-[#005BFF] to-[#5B89FF] dark:text-white font-bold grid place-items-center' src={findImageUrlForStock(stockRankList['0']?.stock_id)} alt="" >{stockRankList['1']?.stock_name.substring(0, 2)}</div>}
                                        </div>
                                    }
                                    {/* <p className="font-medium text-4">WR: -</p> */}
                                    <p className="text-xs text-center font-medium px-4 line-clamp-2 text-ellipsis">
                                        {
                                            stockRankList && stockRankList['0']?.stock_name
                                        }
                                    </p>
                                </div>
                                <div className={`w-[10rem] flex flex-col pt-[16px] pb-[1.5rem] items-center rounded-t-[10px] bg-[#eaf5f5] dark:bg-gradient-to-b from-[#012864] from-10% to-100% to-[#002763] dark:text-white ${darkModeEnabled && 'shadowImperial'} text-center`}>
                                    {
                                        stockRankList &&
                                        <div className="mb-[0.7rem] rounded-xl w-[2.5rem] h-[2.5rem] overflow-hidden">
                                            {/* <p className="text-[12px] font-medium">1500</p> */}
                                            {findImageUrlForStock(stockRankList['2']?.stock_id) && <img className="w-full h-full object-cover" src={findImageUrlForStock(stockRankList['2']?.stock_id)} alt="" />}
                                            {!findImageUrlForStock(stockRankList['2']?.stock_id) && <div className='w-full h-full bg-gradient-to-l rounded-lg from-[#005BFF] to-[#5B89FF] dark:text-white font-bold grid place-items-center' src={findImageUrlForStock(stockRankList['2']?.stock_id)} alt="" >{stockRankList['1']?.stock_name.substring(0, 2)}</div>}
                                        </div>
                                    }
                                    {/* <p className="font-medium text-4">WR: -</p> */}
                                    <p className="text-xs text-center font-medium px-4 line-clamp-2 text-ellipsis">
                                        {
                                            stockRankList && stockRankList['2']?.stock_name
                                        }
                                    </p>
                                </div>
                            </div>

                            {/* <div className="flex-1 rounded-[20px] bg-[#f5f5f5] py-[13px] px-[16px] mb-4 shadow-md dark:bg-[#002763] dark:border dark:border-[#00387E]">
                                <div className="flex justify-between w-full items-center mb-[18px] dark:text-white">
                                    <p className="font-medium text-[0.9rem]">Race created by- {(raceDetails?.created_by?.firstName ? raceResults?.created_by?.firstName : '') + " " + (raceDetails?.created_by?.lastName ? raceResults?.created_by?.firstName : '')}</p>
                                    <div className="font-medium text-[0.9rem] flex gap-2 items-center">
                                        <p>Remaining Time</p>
                                        <div className="font-semibold">
                                            {
                                                raceDetails && <Countdown
                                                    date={raceDetails && raceDetails['end_date']}
                                                    renderer={({ hours, minutes, seconds }) => {
                                                        const formatTime = (time) => String(time).padStart(2, '0');
                                                        return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
                                                    }}
                                                />
                                            }
                                        </div>
                                    </div>
                                </div> */}

                            {/* race tile  */}
                            {/* <div className="w-full h-auto flex justify-between border-dashed dark:border-white border-black border py-[3rem] relative items-center">
                                    <div className="bg-[#f5f5f5] relative right-2 z-10 dark:bg-[#002763]">
                                        <img src={darkModeEnabled ? startdark : start} alt="" />
                                    </div> */}
                            {/* here happens the magic  */}
                            {/* each time socket fires data you extract stocks from that data and
                                    assign rank  */}
                            {/* logic here will be like I will be extracging all the stocks 
                                    and then assign rank each time data is upadated to each of them.
                                    make sure the list of stocks you are bringing here is in sorted
                                     order   only the rank field is changing for them*/}
                            {/* we should supply here only the array of stocks with rank field  */}
                            {/* it is coming from the stocksList  */}
                            {/* <RaceTile
                                        raceStatus={raceStatus}
                                        ranks={ranks} // these are arbitrary ranks
                                        stocksData={stocksDataForRace}
                                        stockRankList={stockRankList} /> */}


                            {/* absolute elements  */}
                            {/* <div className="absolute w-full top-1/2 border-dashed border-black border dark:border-white" />
                                    <div className="absolute top-0 left-0 w-full h-full">
                                        <div className="border-r border-solid w-1/4"></div>
                                    </div>


                                    <div className="bg-[#f5f5f5] relative left-2 dark:bg-[#002763]">
                                        <img src={darkModeEnabled ? finishdark : finish} alt="" />
                                    </div>
                                </div>
                            </div> */}
                            <canvas id="stockChart" width="600" height="300"></canvas>

                            {/* other stocks rally  */}
                            <div className="flex-1 rounded-[20px] py-[13px] px-[16px] sm:max-w-[500px]  md:max-w-[650px] lg:max-w-[800px]">
                                <div className="flex justify-between w-full items-center mb-[18px]">
                                    <p className="font-medium text-[0.9rem] dark:text-white">Stock Ranking</p>
                                    {/* <button><CgChevronRightO color={darkModeEnabled ? 'white' : 'black'} size={20} /></button> */}
                                </div>

                                <StockRankList
                                    stocksData={stocksDataForRace} // data from api below is data from socket
                                    stockRankList={stockRankList} />
                            </div>

                        </div>

                        {/* leaderboard  */}
                        <div className='flex flex-col max-w-[295px]'>
                            <div className='flex gap-[6px] mb-[11px]'>
                                <button onClick={() => {
                                    updateUser();
                                    updateUser2();
                                    updateUser3();
                                    setTabs('leaderboard')
                                }} className={tabs === 'leaderboard' ? 'w-[9rem] flex justify-center items-center py-[12.25px] bg-blue-600 text-white font-semibold rounded-[70px] text-[14px] dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF]' : 'w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px] dark:text-white'} >Leaderboard</button>
                                {userDetails && <button onClick={() => setTabs('yourbets')} className={tabs === 'yourbets' ? 'w-[9rem] flex justify-center items-center py-[12.25px] bg-blue-600 text-white font-semibold rounded-[70px] text-[14px] dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF]' : 'w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px] dark:text-white'}>Your Bets</button>}
                            </div>
                            {<div className='w-full rounded-[8px] p-[16px] bg-[#f5f5f5] max-h-screen overflow-auto custom-scrollbar dark:bg-[#001A50]'>
                                {
                                    tabs === 'leaderboard' ?
                                        <>
                                            <div className='w-full flex justify-between items-center mb-[14px]'>
                                                <p className="font-semibold text-4 dark:text-white">View all</p>
                                                {/* <CgChevronRightO color={darkModeEnabled ? 'white' : 'black'} size={20} /> */}
                                            </div>
                                            <UserRankingList rankList={rankList} />
                                        </>
                                        :
                                        <div className="w-full flex flex-col gap-4">
                                            {
                                                stockRankList ?
                                                    stockRankList?.map((curr, index) => {
                                                        let stock = stocksDataForRace[Object.keys(stocksDataForRace).find(element => element === curr.stock_id)]
                                                        let imageUrl = stock?.icon_url
                                                        console.log(curr)
                                                        return (
                                                            <YourBetsCard
                                                                key={curr?.stock_id}
                                                                stocksDataForRace={stocksDataForRace}
                                                                stockName={curr?.stock_name}
                                                                imageUrl={imageUrl}
                                                                participants={curr?.participants}
                                                            />
                                                        )
                                                    }) :
                                                    <ColorRing
                                                        visible={true}
                                                        height="25"
                                                        width="25"
                                                        ariaLabel="color-ring-loading"
                                                        wrapperStyle={{}}
                                                        wrapperClass="color-ring-wrapper"
                                                        colors={['#e15b64', '#f47e60',]}
                                                    />
                                            }
                                        </div>
                                }
                            </div>}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default RacePage