import React, { useContext, useEffect, useState } from 'react'
import box from '../assets/images/ongoingRaces/focus_box.svg'
import boxdark from '../assets/images/boxdark.svg'
import info from '../assets/images/ongoingRaces/info_icon.svg'
import gold_crown from '../assets/images/gold_crown.svg'
import silver_crown from '../assets/images/silver_corwn.svg'
import Crown_1 from '../assets/images/Crown_1.png'
import Crown_2 from '../assets/images/Crown_2.png'
import Crown_3 from '../assets/images/Crown_3.png'
import bronze_corwn from '../assets/images/bronze_corwn.svg'
import line_beside_medals from '../assets/images/line_beside_medals.png'
import linedark from '../assets/images/linedark.svg'
import person2 from '../assets/images/person2.png'
import placeholder from '../assets/images/placeholder.png'
import malePlaceholder from '../assets/images/manPlaceholder.jpg'
import femalePlaceholder from '../assets/images/womanPlaceholder.jpg'
import start from '../assets/images/start.svg'
import startdark from '../assets/images/startdark.svg'
import finish from '../assets/images/finish.svg'
import finishdark from '../assets/images/finishdark.svg'
import { useNavigate } from 'react-router-dom'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { io } from 'socket.io-client'
import RaceTile from '../Components/RaceTile'
import { fetchRaceDataDetailed } from '../Utils/api'
import { DarkModeContext } from '../Contexts/DarkModeProvider'
import { Bar } from "react-chartjs-2";
import { ColorRing } from 'react-loader-spinner'


const RaceCardHomepage = ({
    raceId = '54asdffasaFSf',
    raceName = 'Abstrace Race',
    end_date,
    start_Date,
    onRaceFinished
    // participants,
}) => {

    const [stockRankList, setStockRankList] = useState(null)
    // const [raceResult, setRaceResult] = useState(null)
    const [stocksDataForRace, setStocksDataForRace] = useState(null)
    const [participants, setParticipants] = useState([])
    const { darkModeEnabled } = useContext(DarkModeContext)
    const [rankList, setRankList] = useState([{ user_name: "-", user_photo: "" }, { user_name: "-", user_photo: "" }, { user_name: "-", user_photo: "" }])
    const [maxValue, setMaxValue] = useState(120);
    const [logos, setLogos] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
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
    const [data, setData] = useState({
        labels: [], // Initial labels
        datasets: [
            {
                label: "Company Growth",
                data: [], // Initial data
                backgroundColor: [], // Colors for bars
                barThickness: 0.2,
            },
        ],
    });
    useEffect(() => {
        // getStocksDataForRace(raceId, (data) => {
        //     setStocksDataForRace(data)
        // })
        setLoading(true);
        fetchRaceDataDetailed(raceId, (res) => {
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
                image.src = item.icon_url ? item.icon_url : placeholder;
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
                        barThickness: 1,
                    },
                ],
            });
            setMaxValue(totalTime + (newLabels.length * 10))

            // Code by Deepak End /////
        })
    }, [])
    const sortAlphabetically4 = (stockRankList) => stockRankList?.slice().sort((a, b) =>
        a.name.localeCompare(b.name)
    )
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
                if (data.data.status == "finished") {
                    console.log("Race finished");
                    onRaceFinished();
                    // setData({ labels: [] });
                    socket.disconnect();
                    return;
                }
                setParticipants(getParticipants(data.data['race_result'], data.data['participantsWithNoRank']))
                setRankList(getParticipantsWithRanks(data.data['race_result'], data.data['participantsWithNoRank']))
                setStockRankList(data.data['stocks'])

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
                setLoading(false)
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
            socket.disconnect();
            console.log('Socket disconnected');
        };
    }, [raceId])
    const sortAlphabetically3 = (stockRankList) => stockRankList?.slice().sort((a, b) =>
        a.ticker.localeCompare(b.ticker)
    )
    const sortAlphabetically2 = (stockRankList) => stockRankList?.slice().sort((a, b) =>
        a.stock_ticker.localeCompare(b.stock_ticker)
    )
    const sortAlphabetically = (stockRankList) => stockRankList?.slice().sort((a, b) =>
        a.localeCompare(b)
    )
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



    const getRemainingSeconds = (targetDate, initial_date) => {
        const targetTime = new Date(targetDate).getTime(); // Convert target date to milliseconds
        const currentTime = new Date(initial_date).getTime(); // Get current time in milliseconds

        // Calculate difference in seconds
        const remainingSeconds = Math.floor((targetTime - currentTime) / 1000);

        return remainingSeconds > 0 ? remainingSeconds : 0; // Return 0 if the date has passed
    }


    return (
        <>
            {loading ? (
                <div onClick={() => navigate(`/race/${raceId}`)} className='rounded-[24px] border border-black px-[1.1rem] py-[1rem] bg-[#edf7ff] dark:bg-[#002864] flex flex-col overflow-hidden cursor-pointer dark:border dark:border-[#00397E] items-center justify-center h-52 w-full'>
                    <ColorRing
                        visible={true}
                        height="45"
                        width="45"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60',]}
                    />
                </div>

            ) : (
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

                                    return <div className='text-[0.63rem] font-semibold dark:text-white font-poppins'>
                                        {hours}:{minutes}:{seconds}
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
                        {/* <div className='absolute left-0 top-1/2 -scale-100'>
                    <img src={darkModeEnabled ? linedark : line_beside_medals} alt="" />
                </div> */}

                        <div className='w-full flex justify-center items-center gap-[25px]'>
                            <div style={{ position: 'relative', flex: 1 }}> <img className='ongoing-users' src={rankList[0].user_photo ? rankList[0].user_photo.path : rankList[0].gender == 'female' ? femalePlaceholder : malePlaceholder} />
                                <img className='ongoing-rank' src={Crown_1} />
                            </div>
                            <div style={{ position: 'relative', flex: 1 }}><img className='ongoing-users' src={rankList[1].user_photo ? rankList[1].user_photo.path : rankList[1].gender == 'female' ? femalePlaceholder : malePlaceholder} />
                                <img className='ongoing-rank' src={Crown_2} /></div>
                            <div style={{ position: 'relative', flex: 1 }}> <img className='ongoing-users' src={rankList[2].user_photo ? rankList[2].user_photo.path : rankList[2].gender == 'female' ? femalePlaceholder : malePlaceholder} />
                                <img className='ongoing-rank' src={Crown_3} /></div>



                            {/* <div className='relative aspect-square p-[22px]'>
                    <img src={person2} alt="silver medal position" />
                    <img src={silver_crown} alt="1st position person" />
                    <p >Nik</p>
                </div> */}

                            {/* <div
                        onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/userprofile/$`)
                        }}
                        className='relative aspect-square p-[10px] scale-90 z-[5] flex justify-center item-center flex-col'> */}
                            {/* <div className='relative flex justify-center items-center'>
                            <img className='absolute z-[-1] w-[50%] rounded-[50%]' src={rankList[0].user_photo ? rankList[0].user_photo.path : rankList[0].gender=='female'?femalePlaceholder:malePlaceholder} />
                            <img className='w-full h-full object-cover w-[100px]' src={silver_crown} alt="1st position person" />
                        </div>
                        <p className='relative  text-center font-semibold text-[12px] dark:text-white'>{rankList[0].user_name}</p>
                    </div>

                    <div className='relative aspect-square p-[10px] z-[5] flex justify-center item-center flex-col'>
                        <div className='relative flex justify-center items-center'>
                            <img className='absolute z-[-1] w-[50%] rounded-[50%]' src={rankList[1].user_photo ? rankList[1].user_photo.path : rankList[0].gender=='female'?femalePlaceholder:malePlaceholder} />
                            <img className='w-full h-full object-cover w-[110px]' src={gold_crown} alt="1st position person" />
                        </div>
                        <p className='relative text-center font-semibold text-[12px] dark:text-white'>{rankList[1].user_name}</p>
                    </div>

                    <div className='relative aspect-square p-[10px] scale-90 z-[5] flex justify-center item-center flex-col'>
                        <div className='relative flex justify-center items-center'>
                            <img className='absolute z-[-1] w-[50%] rounded-[50%]' src={rankList[2].user_photo ? rankList[2].user_photo.path : rankList[0].gender=='female'?femalePlaceholder:malePlaceholder} />
                            <img className='w-full h-full object-cover w-[100px]' src={bronze_corwn} alt="1st position person" />
                        </div>
                        <p className='relative  text-center font-semibold text-[12px] dark:text-white'>{rankList[2].user_name}</p>
                    </div> */}

                            {/* absolute elements
                    <div className='absolute right-0 top-1/2'>
                        <img src={darkModeEnabled ? linedark : line_beside_medals} alt="" />
                    </div> */}
                        </div>
                    </div>
                    {data.labels.length > 0 && (
                        // <Bar data={data} options={options} plugins={[customPlugin]} />
                        <iframe className="w-[100%] h-[400px]" height="832px" src={`/v4/index.html?raceId=${raceId}`} />
                    )}

                </div>
            )}
        </>
    )
}

export default RaceCardHomepage