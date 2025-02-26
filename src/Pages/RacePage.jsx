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
// import malePlaceholder from "../assets/images/manPlaceholder.png";
// import femalePlaceholder from "../assets/images/womanPlaceholder.png";
import Person2 from '../assets/images/person23.png'
import diamond from '../assets/images/kerechi_diamondo.png'
import RaceWaitingZone from "../Components/RaceWaitingZone";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRaceData, fetchAlreadyJoinedUsers, getRaceResults, fetchParticipantsData, fetchRaceDataDetailed, getStocksDataForRace } from "../Utils/api";
import io from 'socket.io-client'
import Countdown from "react-countdown";
import { ColorRing } from "react-loader-spinner";
import { Line } from 'react-chartjs-2';
import google from '../assets/images/g.svg'
import StockRankList from '../Components/StockRankList'
import UserRankingList from "../Components/UserRankingList";
import RaceTile from "../Components/RaceTile";
import ConfettiExplosion from 'react-confetti-explosion';
import { motion } from "motion/react";
import Sidebar from "../Components/Sidebar";
import { DarkModeContext } from "../Contexts/DarkModeProvider";
import ImageSlider from "../Components/ImageSlider";
import YourBetsCard from '../Components/YourBetsCard'
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

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
    const [isLoadingRaceTile, setIsLoadingRaceTile] = useState(true)
    const [isLoading, setisLoading] = useState(true)
    const [participantsCount, setParticipantsCount] = useState(0)
    const [joinedUsers, setJoinedUsers] = useState([])
    const [liveUsers, setLiveUsers] = useState([])
    const [Refresh, setRefresh] = useState('')
    const [stockRankList, setStockRankList] = useState(null)
    const [rankList, setRankList] = useState(null)
    const { race_id } = useParams()
    const joinedUsersRef = useRef([])
    const [raceResults, setRaceResults] = useState()
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
    const navigate = useNavigate()
    const stockChart = useRef()
    const iframeRef = useRef(null);

    const ud = localStorage.getItem('userDetails')
    const userDetails2 = ud && JSON.parse(atob(ud))

    const checkSelf = (id, name) => {
        if (!id || !name) return '';

        if (userDetails2 && id === userDetails2?.userId) {
            return 'You'
        }
        return name
    }


    // code by deepak
    const [data, setData] = useState({
        labels: [], // Initial labels
        datasets: [
            {
                label: "Company Growth",
                data: [], // Initial data
                backgroundColor: [], // Colors for bars
                barThickness: 10,
            },
        ],
    });

    const [logos, setLogos] = useState({});
    const [maxValue, setMaxValue] = useState(120);
    const options = {
        indexAxis: "y",
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        scales: {
            x: {
                max: maxValue,
                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    color: 'white',
                    display: true,
                },
                grid: {
                    display: true,
                },
            },
        },
    };

    const customPlugin = {
        id: "endIcons",
        afterDatasetsDraw(chart) {
            const {
                ctx,
                scales: { x, y },
            } = chart;

            chart.data.datasets[0].data.forEach((value, index) => {
                const yPosition = y.getPixelForValue(index) - 15;
                const xPosition = x.getPixelForValue(value) - 10;

                const label = chart.data.labels[index];
                const icon = logos[label];
                if (icon) {
                    // Begin path to draw circular clipping area
                    ctx.save(); // Save the current canvas state
                    ctx.beginPath();
                    ctx.arc(
                        xPosition + 15, // Center X of the icon
                        yPosition + 15, // Center Y of the icon
                        15, // Radius of the circle
                        0, // Start angle
                        2 * Math.PI // End angle
                    );
                    ctx.clip(); // Clip to the circular region

                    // Draw the image inside the clipped region
                    ctx.drawImage(icon, xPosition, yPosition, 30, 30);

                    // Restore the canvas state to remove clipping
                    ctx.restore();
                }
            });
        },
    };
    // code by deepak






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
    const sortAlphabetically4 = (stockRankList) => stockRankList?.slice().sort((a, b) =>
        a.name.localeCompare(b.name)
    )

    const sortAlphabetically3 = (stockRankList) => stockRankList?.slice().sort((a, b) =>
        a.ticker.localeCompare(b.ticker)
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
        if (raceResults) {
            const numStocks = raceResults.stocks.length;
            // const numStocks = 3
            // const stockNames = ["Tesla", "Gooogle", "Deepak"]
            const stockNames = raceResults.stocks.map(curr => curr.stock_ticker)
            const iframe = iframeRef.current;
            if (!iframe) return;

            iframe.onload = () => {
                const gameWindow = iframe.contentWindow;
                if (gameWindow) {
                    gameWindow.postMessage(
                        {
                            action: "start_game",
                            num_horse: numStocks, // total number of
                            name_horse: stockNames, // stocks values 

                        },
                        "*"
                    );
                    setInterval(() => {
                        gameWindow.postMessage(
                            {
                                action: "update_rank",
                                positions: [2, 3, 1, 0], // total number of

                            },
                            "*"
                        );
                    }, 3000)
                }
            };
        }
    }, [raceResults])


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
                let str = '';
                if (hours !== 0) {
                    str = hours + " Hours ";
                }
                if (minutes !== 0) {
                    str = str + minutes + " Minutes"
                }
                return str
            }) // brilliant logic
            if (res.status === 'running') {
                setRaceStatus('running')
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
        }, (error) => {
            console.log('Stocks Error', error)
        })

        fetchRaceDataDetailed(race_id, (res) => {
            console.log('racedata detailed:', res);
            const barColors = ['red', 'blue', 'yellow', 'rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)'];

            let stocks = (res.stocks) // this will be the natural position of stocks at first
            let stockNames = stocks.map(curr => (curr.ticker))
            let totalTime = calculateDurationInSeconds(res.start_date, res.end_date)
            let elapsedTime = calculateDurationInSeconds(res.start_date, new Date().toISOString())

            let newLogoAray = {}
            sortAlphabetically3(stocks).map(stock => {
                newLogoAray[stock.ticker] = new Image();
                newLogoAray[stock.ticker].src = stock.icon_url
            })

            console.log('newLogoAray', newLogoAray)
            console.log('stockPositions', sortAlphabetically(stockNames))
            const newLabels = sortAlphabetically(stockNames);
            const newColors = barColors;
            const newLogos = {};

            sortAlphabetically3(stocks).forEach((item) => {
                const image = new Image();
                image.src = item.icon_url ? item.icon_url : Placeholder;
                newLogos[item.ticker] = image;
            });
            setLogos(newLogos);

            let newPosArr = []
            sortAlphabetically4(stocks)?.forEach((stock, index) => {
                const relativePosition = ((((stocks.length - index)) * (stocks.length * 10) / stocks.length) + elapsedTime);    // here 5 is total no. of stocks  *10 is not required here
                newPosArr.push(relativePosition)
            })
            console.log('New Positions Array', newPosArr);


            let newData = newPosArr
            setData({
                labels: newLabels,
                datasets: [
                    {
                        label: "Company Growth",
                        data: newData, // Initialize with zeros
                        backgroundColor: newColors,
                        barThickness: 10,
                    },
                ],
            });
            setMaxValue(totalTime + (newLabels.length * 10))

            // Code by Deepak End /////
        })
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
                // console.log('race data socket', data.data)
                setRaceStatus(data.data.status) // somehow this is not reflecting
                setIsLoadingRaceTile(false)
                setRankList(getParticipantsWithRanks(data.data['race_result'], data.data['participantsWithNoRank']))
                setStockRankList(data.data['stocks'])
                flag.current += 1
                // console.log('this Race data', data)

                // code by deepak
                let elapsedTime = calculateDurationInSeconds(data.data.start_date, new Date().toISOString())
                let newPosArr = []
                sortAlphabetically2(data.data['stocks'])?.forEach((stock) => {
                    const relativePosition = ((((data.data['stocks'].length - stock.rank)) * (data.data['stocks'].length * 10) / data.data['stocks'].length) + elapsedTime);    // here 5 is total no. of stocks  *10 is not required here
                    newPosArr.push(relativePosition)
                })
                // console.log('New Positions Array', newPosArr);
                setData((prevData) => {
                    const newData = newPosArr;

                    return {
                        ...prevData,
                        datasets: [
                            {
                                ...prevData.datasets[0],
                                data: newData,
                            },
                        ],
                    };
                });
                // code by deepak
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

    const findImageUrlForStock = (id) => stocksDataForRace ? stocksDataForRace[Object.keys(stocksDataForRace)?.find(element => element === id)]?.icon_url : ''

    useEffect(() => {
        console.log('raceDetails', raceDetails)
    }, [raceDetails])

    useEffect(() => {
        console.log('Race status this is pain in >>>>>>>>>>>>>', raceDetails?.status)
    }, [raceStatus])

    console.log("data",data)
    if (isLoadingRaceTile && raceStatus !== 'finished') {
        return (
            <>
                {
                    isLoading ? <div className="fixed bg-black opacity-40 w-full h-screen top-0 left-0 grid place-items-center z-[999]">
                        <div>
                            {/* <ColorRing
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                            /> */}
                        </div>
                    </div> :
                        !isRaceStarted && raceDetails && < RaceWaitingZone
                            start_date={raceDetails?.start_date}
                            raceStarted={isRaceStarted}
                            joinedUsersList={joinedUsers}
                            raceName={raceDetails?.name}
                            liveUsers={liveUsers}
                            race_id={race_id}
                            status={raceStatus}
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
                    className='w-full relative flex pb-8 gap-8 dark:bg-[#000924] justify-center items-center h-[90vh]'>
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                    <p className="text-2xl font-bold dark:text-white">Race is Loading...</p>
                </motion.div>
            </>
        )
    } else {

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
                        !isRaceStarted && raceDetails && < RaceWaitingZone
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
                        <div className='max-w-[1400px] w-full py-[11px] px-[20px] flex flex-col lg:flex-row gap-[15px] rounded-t-[24px] dark:bg-[#000D38] bg-[#EDF7FF]'>

                            {/* actual dashboard  */}
                            <div className='flex-1 px-[22px] py-[18px]'>

                                <div className='w-full flex justify-between mb-[3.8rem]'>
                                    <div className='flex gap-[0.76rem]'>
                                        <div></div>
                                        <div className='h-full'>
                                            <h3 className='text-[1.05rem] font-bold dark:text-white font-poppins'>{raceDetails?.name}</h3>
                                            <p className='text-[0.7rem] dark:text-white'>
                                                Race Duration
                                                <span className="font-semibold ml-2 font-poppins">
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
                                        <h3 className='text-[1.05rem] font-bold dark:text-white flex gap-1 font-poppins'>{participantsCount} <span className="font-sans">{participantsCount === 1 ? 'Participant' : "Participants"}</span> </h3>
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
                                        <p onClick={() => {
                                            if (raceResults?.race_result['2']?.participants[0]?.user_id) {
                                                if (userDetails2.userId === raceResults?.race_result['2']?.participants[0]?.user_id) {
                                                    navigate(`/profile`)
                                                }
                                                else {
                                                    navigate(`/profile/${raceResults?.race_result['2']?.participants[0]?.user_id}`)
                                                }
                                            }
                                        }} className="font-medium text-3 mt-[10px] dark:text-white hover:underline cursor-pointer">{raceResults?.race_result?.['2']?.participants?.['0']?.user_name ? checkSelf(raceResults?.race_result['2']?.participants?.[0]?.user_id, raceResults?.race_result['2']?.participants?.['0']?.user_name) : ''}</p>
                                    </div>

                                    <div className="flex justify-center flex-col items-center relative bottom-8 ">
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
                                        <p onClick={() => {
                                            if (raceResults?.race_result['1']?.participants[0]?.user_id) {
                                                if (userDetails2.userId === raceResults?.race_result['1']?.participants[0]?.user_id) {
                                                    navigate(`/profile`)
                                                }
                                                else {
                                                    navigate(`/profile/${raceResults?.race_result['1']?.participants[0]?.user_id}`)
                                                }
                                            }
                                        }} className="font-medium text-3 mt-[10px] dark:text-white hover:underline cursor-pointer">{raceResults?.race_result['1']?.participants[0]?.user_name ? checkSelf(raceResults?.race_result['1']?.participants[0]?.user_id, raceResults?.race_result['1']?.participants[0]?.user_name) : ''}</p>
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
                                        <p onClick={() => {
                                            if (raceResults?.race_result['3']?.participants[0]?.user_id) {
                                                if (userDetails2.userId === raceResults?.race_result['3']?.participants[0]?.user_id) {
                                                    navigate(`/profile`)
                                                }
                                                else {
                                                    navigate(`/profile/${raceResults?.race_result['3']?.participants[0]?.user_id}`)
                                                }
                                            }
                                        }} className="font-medium text-3 mt-[10px] dark:text-white hover:underline cursor-pointer">{raceResults?.race_result?.['3']?.participants?.[0]?.user_name ? checkSelf(raceResults?.race_result?.['3']?.participants?.[0]?.user_id, raceResults?.race_result?.['3']?.participants?.[0]?.user_name) : ''}</p>
                                    </div>
                                </div>

                                <div className="flex-1 flex justify-center items-end gap-[2rem]">

                                    <div className={`w-[10rem] flex flex-col pt-[16px] pb-[1.5rem] items-center rounded-t-[10px] bg-[#f4f5f4] dark:bg-gradient-to-b from-[#012864] from-10% to-100% to-[#002763] dark:text-white ${darkModeEnabled && 'shadowImperial'}`}>
                                        {
                                            stockRankList && stockRankList['1'] &&
                                            <div className="mb-[0.7rem] rounded-xl w-[2.5rem] h-[2.5rem] overflow-hidden">
                                                {/* <p className="text-[12px] font-medium">1500</p> */}
                                                {findImageUrlForStock(stockRankList['1']?.stock_id) && <img className="w-full h-full object-cover" src={findImageUrlForStock(stockRankList['1']?.stock_id)} alt="" />}
                                                {!findImageUrlForStock(stockRankList['1']?.stock_id) && <div className='w-full h-full bg-gradient-to-l rounded-lg from-[#005BFF] to-[#5B89FF] dark:text-white font-bold grid place-items-center' alt="" >{stockRankList['1']?.stock_name.substring(0, 2)}</div>}
                                            </div>
                                        }
                                        <p className="text-xs text-center font-medium px-4 line-clamp-2 text-ellipsis">
                                            {
                                                stockRankList && stockRankList['1']?.stock_name
                                            }
                                        </p>
                                        {stockRankList && stockRankList['1'] && <p className="text-xs text-center mt-3 px-4 line-clamp-2 text-ellipsis font-semibold">
                                            {
                                                stockRankList && `(${stockRankList['1']?.stock_ticker})`
                                            }
                                        </p>}
                                    </div>
                                    <div className={`w-[10rem] flex flex-col pt-[16px] pb-[4rem] items-center rounded-t-[10px] bg-[#f4f5f4] dark:bg-gradient-to-b from-[#012864] from-10% to-100% to-[#002763] dark:text-white ${darkModeEnabled && 'shadowImperial'} text-center`}>
                                        {
                                            stockRankList &&
                                            <div className="mb-[0.7rem] rounded-xl w-[2.5rem] h-[2.5rem] overflow-hidden">
                                                {/* <p className="text-[12px] font-medium">1500</p> */}
                                                {findImageUrlForStock(stockRankList['0']?.stock_id) && <img className="w-full h-full object-cover" src={findImageUrlForStock(stockRankList['0']?.stock_id)} alt="" />}
                                                {!findImageUrlForStock(stockRankList['0']?.stock_id) && <div className='w-full h-full bg-gradient-to-l rounded-lg from-[#005BFF] to-[#5B89FF] dark:text-white font-bold grid place-items-center' >{stockRankList['0']?.stock_name.substring(0, 2)}</div>}
                                            </div>
                                        }
                                        {/* <p className="font-medium text-4">WR: -</p> */}
                                        <p className="text-xs text-center font-medium px-4 line-clamp-2 text-ellipsis">
                                            {
                                                stockRankList && stockRankList['0']?.stock_name
                                            }
                                        </p>
                                        <p className="text-xs text-center mt-3 px-4 line-clamp-2 text-ellipsis font-semibold">
                                            {
                                                stockRankList && `(${stockRankList['0']?.stock_ticker})`
                                            }
                                        </p>
                                    </div>
                                    <div className={`w-[10rem] flex flex-col pt-[16px] pb-[1.5rem] items-center rounded-t-[10px] bg-[#f4f5f4] dark:bg-gradient-to-b from-[#012864] from-10% to-100% to-[#002763] dark:text-white ${darkModeEnabled && 'shadowImperial'} text-center`}>
                                        {
                                            stockRankList && stockRankList['2'] &&
                                            <div className="mb-[0.7rem] rounded-xl w-[2.5rem] h-[2.5rem] overflow-hidden">
                                                {/* <p className="text-[12px] font-medium">1500</p> */}
                                                {findImageUrlForStock(stockRankList['2']?.stock_id) && <img className="w-full h-full object-cover" src={findImageUrlForStock(stockRankList['2']?.stock_id)} alt="" />}
                                                {!findImageUrlForStock(stockRankList['2']?.stock_id) && <div className='w-full h-full bg-gradient-to-l rounded-lg from-[#005BFF] to-[#5B89FF] dark:text-white font-bold grid place-items-center' >{stockRankList['2']?.stock_name.substring(0, 2)}</div>}
                                            </div>
                                        }
                                        <p className="text-xs text-center font-medium px-4 line-clamp-2 text-ellipsis">
                                            {
                                                stockRankList && stockRankList['2']?.stock_name
                                            }
                                        </p>
                                        {stockRankList && stockRankList['2'] && <p className="text-xs text-center mt-3 px-4 line-clamp-2 text-ellipsis font-semibold">
                                            {
                                                stockRankList && `(${stockRankList['2']?.stock_ticker})`
                                            }
                                        </p>}
                                    </div>
                                </div>

                                <div className="flex-1 rounded-[20px] bg-[#f5f5f5] py-[13px] px-[16px] mb-4 shadow-md dark:bg-[#002763] dark:border dark:border-[#00387E]">
                                    <div className="flex justify-between w-full items-center mb-[18px] dark:text-white">
                                        {raceDetails?.created_by?.firstName && <p className="font-medium text-[0.9rem]">Race created by- {(raceDetails?.created_by?.firstName ? raceResults?.created_by?.firstName : '') + " " + (raceDetails?.created_by?.lastName ? raceResults?.created_by?.lastName : '')}</p>}
                                        <div className="font-medium text-[0.9rem] flex gap-2 items-center">
                                            <p>Remaining Time</p>
                                            <div className="font-semibold font-poppins">
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
                                    </div>


                                    {data.labels.length > 0 && raceStatus !== 'finished' && (
                                        <Bar data={data} options={options} plugins={[customPlugin]} />
                                    )}

                                    {
                                        raceStatus === 'finished' && <div className="w-full h-full flex justify-center items-center">
                                            <div className='rounded-lg bg-white shadow-xl italic px-8 py-4 w-[50%] z-20 grid place-items-center text-3xl font-bold self-center text-center'>
                                                Race Finished
                                            </div>
                                        </div>
                                    }
                                    {raceResults &&
                                        <iframe
                                            className="flex-1 w-full h-[500px]"
                                            ref={iframeRef}
                                            src="/game/game/index.html" // Adjust path based on where you host the game
                                        // width=""
                                        // height="832px"
                                        // frameBorder="0"
                                        />}
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
                                    {<button onClick={() => setTabs('yourbets')} className={tabs === 'yourbets' ? 'w-[9rem] flex justify-center items-center py-[12.25px] bg-blue-600 text-white font-semibold rounded-[70px] text-[14px] dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF]' : 'w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px] dark:text-white'}>Your Bets</button>}
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
                        {/* other stocks rally  */}
                        <div className="w-full py-[13px] px-[70px] rounded-b-[24px] dark:bg-[#000D38] bg-[#EDF7FF]">
                                    <div className="flex justify-between w-full items-center mb-[18px]">
                                        <p className="font-medium text-[0.9rem] dark:text-white">Stock Ranking</p>
                                        {/* <button><CgChevronRightO color={darkModeEnabled ? 'white' : 'black'} size={20} /></button> */}
                                    </div>

                                    <StockRankList
                                        stocksData={stocksDataForRace} // data from api below is data from socket
                                        stockRankList={stockRankList} />
                                </div>
                    </div>
                </motion.div>
            </>
        )
    }
}

export default RacePage