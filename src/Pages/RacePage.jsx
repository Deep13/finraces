import { CgChevronRightO } from "react-icons/cg";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import info from "../assets/images/ongoingRaces/info_icon.svg";
import start from "../assets/images/start.svg";
import startdark from "../assets/images/startdark.svg";
import finishdark from "../assets/images/finishdark.svg";
import finish from "../assets/images/finish.svg";
import golden_frame from "../assets/images/golden_frame.png";
import silver_frame from "../assets/images/silver_frame.png";
import bronze_frame from "../assets/images/bronze_frame.png";
import golden_king_corwn from "../assets/images/golden_king_corwn.svg";
import silver_king_crown from "../assets/images/silver_king_crown.svg";
import bronze_king_crown from "../assets/images/bronze_king_crown.svg";
import Polygon7 from "../assets/images/Polygon7.svg";
import Person from "../assets/images/person3.png";
import { HiInformationCircle } from "react-icons/hi";
import { IoMdShare } from "react-icons/io";
import Placeholder from "../assets/images/placeholder.png";
import malePlaceholder from "../assets/images/manPlaceholder.jpg";
import femalePlaceholder from "../assets/images/womanPlaceholder.jpg";
import Person2 from "../assets/images/person23.png";
import { motion, AnimatePresence } from "motion/react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import diamond from "../assets/images/kerechi_diamondo.png";
import RaceWaitingZone from "../Components/RaceWaitingZone";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchRaceData,
  fetchAlreadyJoinedUsers,
  getRaceResults,
  fetchParticipantsData,
  fetchRaceDataDetailed,
  getStocksDataForRace,
  getStockChartData,
} from "../Utils/api";
import io from "socket.io-client";
import Countdown from "react-countdown";
import { ColorRing } from "react-loader-spinner";
import { Line } from "react-chartjs-2";
import google from "../assets/images/g.svg";
import StockRankList from "../Components/StockRankList";
import UserRankingList from "../Components/UserRankingList";
import RaceTile from "../Components/RaceTile";
import ConfettiExplosion from "react-confetti-explosion";
import Sidebar from "../Components/Sidebar";
import { DarkModeContext } from "../Contexts/DarkModeProvider";
import ImageSlider from "../Components/ImageSlider";
import YourBetsCard from "../Components/YourBetsCard";
import Crown_1 from "../assets/images/Crown_1.png";
import Crown_2 from "../assets/images/Crown_2.png";
import Crown_3 from "../assets/images/Crown_3.png";
import malePlceholder from "../assets/images/manPlaceholder.jpg";
import femalePlceholder from "../assets/images/womanPlaceholder.jpg";
import box from "../assets/images/ongoingRaces/focus_box.svg";
import boxdark from "../assets/images/boxdark.svg";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import RankChart from "../Components/RaceLineChart";
import StockRaceChart from "../Components/StockRaceChart";
import RacePriceChart from "../Components/RacePriceChart";
import BumpChart from "../Components/BumpChart";
import JoinRace from "../Components/JoinRace";

import { useSocket } from "../Contexts/SocketProvider";
import { useCommunity } from "../Contexts/CommunityProvider";
import { connectSocket } from "../Utils/socket";
import StockChart from "../Components/StockChart";
import { set } from "lodash";

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
  const [isRaceStarted, setIsRaceStarted] = useState(false);
  const [raceDetails, setRaceDetails] = useState(null);
  const [isLoadingRaceTile, setIsLoadingRaceTile] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [joinedUsers, setJoinedUsers] = useState([]);
  const [liveUsers, setLiveUsers] = useState([]);
  const [Refresh, setRefresh] = useState("");
  const [stockRankList, setStockRankList] = useState(null);
  const [rankList, setRankList] = useState(null);
  const { race_id } = useParams();
  const joinedUsersRef = useRef([]);
  const [raceResults, setRaceResults] = useState();
  const [stocksDataForRace, setStocksDataForRace] = useState(null);
  const [raceStatus, setRaceStatus] = useState("");
  const [graphType, setGraphType] = useState("Race");
  const [tempStocks, setTempStocks] = useState([]);
  const [ranks, setRanks] = useState({
    1: Math.floor(Math.random() * 3) + 1,
    2: Math.floor(Math.random() * 3) + 1,
    3: Math.floor(Math.random() * 3) + 1,
  });
  const [isExploding, setIsExploding] = useState(false);
  const [showDetails, setshowDetails] = useState(false);
  const { darkModeEnabled } = useContext(DarkModeContext);
  const [tabs, setTabs] = useState("leaderboard");
  const [imageData, setImageData] = useState([Placeholder]);
  const [imageData2, setImageData2] = useState([Placeholder]);
  const [imageData3, setImageData3] = useState([Placeholder]);
  const [currentImage, setCurrentImage] = useState(0);
  const [imageRank, setImageRank] = useState({});
  const [bronzeUser, setBronzeUser] = useState(0);
  const [chartData, setChartData] = useState();
  const [labels, setLabels] = useState([]);
  const [dataset, setDataset] = useState([]);
  const [duration, setDuration] = useState("");

  //tesst only
  const { test } = useCommunity();

  const flag = useRef(0);
  const userDetails = localStorage.getItem("fin_userDetails");
  const navigate = useNavigate();
  const stockChart = useRef();
  const cardRef = useRef(null);
  const { setShareModal, setModalImg, setModalText } = useCommunity();

  const iframeRef = useRef(null);
  const { setShowLoginForm, showLoginForm } = useContext(DarkModeContext);

  const ud = localStorage.getItem("fin_userDetails");
  const userDetails2 = ud && JSON.parse(atob(ud));

  const compareFlag = useRef(false);

  const checkSelf = (id, name) => {
    if (!id || !name) return "";

    if (userDetails2 && id === userDetails2?.userId) {
      return "You";
    }
    return name;
  };

  useEffect(() => {
    console.log("status", raceStatus);
  }, [raceStatus]);

  const socket = useSocket();

  useEffect(() => {
    // Connect to the Nest.js Socket.IO server (replace the URL with your server's URL)
    if (!socket) {
      // const ud = localStorage.getItem("fin_userDetails");
      // const userDetails = ud && JSON.parse(atob(ud));
      // const { userId } = userDetails || {};
      // const token = localStorage.getItem("token");
      // connectSocket(userId, token);
      return;
    }

    const joinData = {
      raceId: race_id,
    };

    socket.emit("watch-race", joinData);

    // Event listeners for the connection
    // socket.on("connect", () => {
    //   // console.log('Connected to the server with id:', socket.id);

    //   const joinData = {
    //     raceId: race_id,
    //   };

    //   socket.emit("watch-race", joinData);
    // });

    // socket.on("disconnect", () => {
    //   console.log("Disconnected from the server");
    // });

    // socket.on("reconnect_attempt", () => {
    //   console.log("Attempting to reconnect...");
    // });

    // socket.on("reconnect", (attemptNumber) => {
    //   console.log("Reconnected to the server after", attemptNumber, "attempts");
    // });

    // socket.on("reconnect_failed", () => {
    //   console.log("Failed to reconnect to the server");
    // });

    // Listening for any custom event (for example, a message event)
    socket.on("message", (data) => {
      // console.log('Message from server:', JSON.stringify(data, null, 2));
      if (data.event === "user-joined") {
        // console.log(data.data.firstName);
        if (data.data.firstName) {
          // setJoinedUsers(previous => ([...previous, data.data.firstName]))
          const objectAlreadyThere = joinedUsersRef.current.filter(
            (curr) => curr.id === data.data.id
          );

          if (objectAlreadyThere.length === 0) {
            joinedUsersRef.current = [...joinedUsersRef.current, data.data];
            setRefresh("1");
          }
        }
        // setMessage(prev => [...prev, ${data.data.firstName} ${data.data.lastName} has joined the race.])
      }
      if (data.event === "race-data") {
        setRaceResults(data.data);
        // console.log("race data socket", data.data);
        // console.log("check", transformSocketData(data.data));
        // dataTransform(data.data)
        if (data?.data?.status === "running" && raceStatus !== "running") {
          setRaceStatus("running");
        }
        if (data?.data?.status === "finished" && raceStatus !== "finished") {
          setRaceStatus("finished");
        }
        if (data?.data?.status === "upcoming" && raceStatus !== "upcoming") {
          setRaceStatus("upcoming");
        }
        // if (data?.data?.status && data.data.status != raceStatus) {
        //   setRaceStatus(data.data.status);
        // } // somehow this is not reflecting
        setIsLoadingRaceTile(false);
        setRankList(
          getParticipantsWithRanks(
            data.data["race_result"],
            data.data["participantsWithNoRank"]
          )
        );
        setStockRankList(data.data["stocks"]);

        //stock comparison chart data
        if (!compareFlag.current) {
          compareFlag.current = true;
          fetchData(data.data["stocks"]);
        }
        flag.current += 1;
        // console.log('this Race data', data)

        // code by deepak
        let elapsedTime = calculateDurationInSeconds(
          data.data.start_date,
          new Date().toISOString()
        );
        let newPosArr = [];
        sortAlphabetically2(data.data["stocks"])?.forEach((stock) => {
          const relativePosition =
            ((data.data["stocks"].length - stock.rank) *
              (data.data["stocks"].length * 10)) /
              data.data["stocks"].length +
            elapsedTime; // here 5 is total no. of stocks  *10 is not required here
          newPosArr.push(relativePosition);
        });
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
      console.log("Sending message to server...");

      socket.emit("events", { content: "Hello from client!" });
    }, 2000);

    // Cleanup the socket connection when the component unmounts
    // return () => {
    //   if (socket) socket.disconnect();
    //   console.log("Socket disconnected");
    // };
  }, [race_id, socket]);

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
  const [stockCount, setStockCount] = useState(0);
  const [stopTime, setStopTime] = useState();

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
          color: "white",
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

  // const fetchParticipantData = (id) => {
  //   fetchParticipantsData(id, (data) => {
  //     // console.log("Race Participants data", data)
  //     // setRaceUsersData(data.participants)
  //     setisLoading(false);
  //     let obj = {};
  //     let arr = [Placeholder];
  //     console.log(window.location.origin);
  //     console.log("A", data);
  //     setJoinedUsers(data.participants);
  //     setParticipantsCount(data.participants.length);
  //     data?.participants?.map((val, index) => {
  //       let imgD;
  //       if (val?.photo?.path) {
  //         imgD = val?.photo?.path;
  //       } else {
  //         if (val.gender == "female") {
  //           imgD = femalePlaceholder;
  //         } else {
  //           imgD = malePlaceholder;
  //         }
  //       }
  //       obj[val.id] = {
  //         image: imgD,
  //         position: index + 1,
  //       };

  //       arr.push(imgD);
  //     });
  //     setImageData(arr);
  //     setImageRank(obj);
  //   });
  // };

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

  const sortAlphabetically = (stockRankList) =>
    stockRankList?.slice().sort((a, b) => a.localeCompare(b));
  const sortAlphabetically2 = (stockRankList) =>
    stockRankList
      ?.slice()
      .sort((a, b) => a.stock_ticker.localeCompare(b.stock_ticker));
  const sortAlphabetically4 = (stockRankList) =>
    stockRankList?.slice().sort((a, b) => a.name.localeCompare(b.name));

  const sortAlphabetically3 = (stockRankList) =>
    stockRankList?.slice().sort((a, b) => a.ticker.localeCompare(b.ticker));

  const getParticipantsWithRanks = (raceResult, participantsWithNoRank) => {
    console.log("check", raceResult, participantsWithNoRank);
    const result = [];

    // Helper to clean user_name
    const formatUserName = (name) => {
      let wordsArray = name.split(" ");
      let n = "";

      wordsArray.map((word) => {
        if (word != null && word != "null") {
          n += word + " ";
        }
      });

      return n;
    };

    // Add participants with ranks from race_result
    Object.entries(raceResult).forEach(([rank, rankData]) => {
      rankData?.participants?.forEach((participant) => {
        result.push({
          user_id: participant.user_id,
          user_name: formatUserName(participant.user_name),
          user_photo: participant.user_photo
            ? participant.user_photo.path
            : participant.gender == "female"
            ? femalePlaceholder
            : malePlaceholder,
          rank: rank || "-", // Use the key as rank, or "-" if rank is not found
        });
      });
    });

    // Add participants with no rank, assigning rank as "-"
    participantsWithNoRank?.forEach((participant) => {
      result.push({
        user_id: participant.user_id,
        user_name: formatUserName(participant.user_name),
        user_photo: participant.user_photo
          ? participant.user_photo.path
          : participant.gender == "female"
          ? femalePlaceholder
          : malePlaceholder,
        rank: "-",
      });
    });

    return result;
  };

  const updateUser = () => {
    // let arr = [...imageData]
    // arr[1] = Person2
    // setImageData(arr)
    // setCurrentImage(1)
    setBronzeUser(1);
  };
  const updateUser2 = () => {
    let arr = [...imageData];
    arr[1] = Placeholder;
    setImageData2(arr);
    setCurrentImage(1);
  };
  const updateUser3 = () => {
    let arr = [...imageData];
    arr[1] = Placeholder;
    setImageData3(arr);
    setCurrentImage(1);
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setRanks({
        1: Math.floor(Math.random() * 3) + 1,
        2: Math.floor(Math.random() * 3) + 1,
        3: Math.floor(Math.random() * 3) + 1,
      });
    }, 4000);

    // fetchParticipantData(race_id);

    fetchRaceData(race_id, (res) => {
      console.log("racedata :", res);
      setRaceDetails(res);
      const { hours, minutes } = calculateDuration(
        res.start_date,
        res.end_date
      );
      // setDuration((hours && (hours + " Hours ")) + (minutes && (minutes + " Minutes")))
      setDuration(() => {
        let str = "";
        if (hours !== 0) {
          str = hours + " Hours ";
        }
        if (minutes !== 0) {
          str = str + minutes + " Minutes";
        }
        return str;
      }); // brilliant logic
      if (res.status === "running") {
        setRaceStatus("running");
        setIsRaceStarted(true);
      } else {
        setIsRaceStarted(false);
        if (res.status === "finished") {
          getRaceResults(race_id, (data) => {
            console.log("These are finished race results", data.result);
            // just like when you get the race data in socket
            // setFinishedRaceResults(data.result)
            setRaceResults(data.result);
            setIsExploding(true);
            setRaceStatus("finished");
            setStockRankList(data.result.stocks);
            setRankList(
              getParticipantsWithRanks(
                data.result["race_result"],
                data.result["participantsWithNoRank"]
              )
            );
            setTimeout(() => {
              setIsExploding(false);
            }, 4000);
          });
        } else {
          setRaceStatus("upcoming");
        }
      }
      setisLoading(false);
    });

    // fetchAlreadyJoinedUsers(race_id, (result) => {
    //   // console.log(result)
    //   setParticipantsCount(result.length);
    //   setJoinedUsers(result);
    // });

    getStocksDataForRace(
      race_id,
      (data) => {
        console.log("API Response ", data);
        setStocksDataForRace(data);
      },
      (error) => {
        console.log("Stocks Error", error);
      }
    );

    fetchRaceDataDetailed(race_id, (res) => {
      console.log("racedata detailed:", res);
      setisLoading(false);
      let obj = {};
      let arr = [Placeholder];
      console.log(window.location.origin);
      console.log("A", res);
      setJoinedUsers(res.participants);
      setParticipantsCount(res.participants.length);
      res?.participants?.map((val, index) => {
        let imgD;
        if (val?.photo?.path) {
          imgD = val?.photo?.path;
        } else {
          if (val.gender == "female") {
            imgD = femalePlaceholder;
          } else {
            imgD = malePlaceholder;
          }
        }
        obj[val.id] = {
          image: imgD,
          position: index + 1,
        };

        arr.push(imgD);
      });
      setImageData(arr);
      setImageRank(obj);

      const barColors = [
        "red",
        "blue",
        "yellow",
        "rgba(75, 192, 192, 0.8)",
        "rgba(153, 102, 255, 0.8)",
      ];

      let stocks = res.stocks; // this will be the natural position of stocks at first

      const stockName = res.stocks.map((stock) => stock.name);
      setStockCount(stockName);
      var utcTime = res.end_date; // Assuming UTC time from API
      var utcDate = new Date(utcTime); // Convert string to Date object

      // Convert UTC to local time
      var localTime = new Date(
        utcDate.getTime() - utcDate.getTimezoneOffset() * 60000
      ).toISOString();

      // Debugging
      console.log("Local Time:", localTime);

      setStopTime(localTime);

      let stockNames = stocks.map((curr) => curr.ticker);
      let totalTime = calculateDurationInSeconds(res.start_date, res.end_date);
      let elapsedTime = calculateDurationInSeconds(
        res.start_date,
        new Date().toISOString()
      );

      let newLogoAray = {};
      sortAlphabetically3(stocks).map((stock) => {
        newLogoAray[stock.ticker] = new Image();
        newLogoAray[stock.ticker].src = stock.icon_url;
      });

      console.log("newLogoAray", newLogoAray);
      console.log("stockPositions", sortAlphabetically(stockNames));
      const newLabels = sortAlphabetically(stockNames);
      const newColors = barColors;
      const newLogos = {};

      sortAlphabetically3(stocks).forEach((item) => {
        const image = new Image();
        image.src = item.icon_url ? item.icon_url : Placeholder;
        newLogos[item.ticker] = image;
      });
      setLogos(newLogos);

      let newPosArr = [];
      sortAlphabetically4(stocks)?.forEach((stock, index) => {
        const relativePosition =
          ((stocks.length - index) * (stocks.length * 10)) / stocks.length +
          elapsedTime; // here 5 is total no. of stocks  *10 is not required here
        newPosArr.push(relativePosition);
      });
      console.log("New Positions Array", newPosArr);

      setTempStocks({
        name: "",
        price: "",
        ticker: "",
        icon_url: "",
        id: "",
      });

      let newData = newPosArr;
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
      setMaxValue(totalTime + newLabels.length * 10);

      // Code by Deepak End /////
    });
    window.scrollTo(0, 0);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setLiveUsers(joinedUsersRef.current);
  }, [Refresh]);

  useEffect(() => {
    imageRank.length > 0 &&
      setBronzeUser(
        imageRank[raceResults?.race_result["2"]?.participants?.[0]?.user_id]
          .position
      );
  }, [raceResults]);

  useEffect(() => {
    // console.log("This is race status >>>>>>>>", raceStatus);
    if (raceStatus === "finished") {
      setIsExploding(true);
      setTimeout(() => {
        setIsExploding(false);
      }, 4000);
    }
  }, [raceStatus]);

  // useEffect(() => {
  //   console.log("status", raceStatus);
  // }, [raceStatus]);

  //this prevents rerendering of iframe when race status changes
  const [iframeVisible, setIframeVisible] = useState(false);

  useEffect(() => {
    if (
      (raceStatus == "running" || raceStatus == "upcoming") &&
      !iframeVisible
    ) {
      setIframeVisible(true);
    }
    if (raceStatus == "finished" && iframeVisible) {
      setIframeVisible(false);
    }
  }, [raceStatus, iframeVisible]);

  //this prevents stock comparison chart from flickering

  const handleShareClick = async () => {
    setShareModal(true);
    setModalText(
      `<p class="dark:text-white text-wrap">Check out my rankings in this race. <br/> <span class="race-card cursor-pointer hover:underline" data-id="${raceDetails?.id}">${raceDetails?.name}</span> <p/>`
    );
    const maxUserSlots = Math.min(3, rankList?.length || 0);
    const maxStockSlots = Math.min(3, stockRankList?.length || 0);

    setModalImg(`
  <div class="w-full flex items-center cursor-pointer race-card">
    <div class="rounded-[32px] w-[42rem] px-[2rem] py-[1.5rem] flex flex-col overflow-hidden cursor-pointer mt-[20px]">

      <!-- Leaderboard Section -->
      <div class="w-full flex justify-center items-center mb-[10px] relative flex-col">

        <!-- User Row -->
        <div class="flex justify-center items-start gap-[50px] mb-[30px]">
          ${[...Array(maxUserSlots)]
            .map((_, i) => {
              const user = rankList[i];
              const crown = [
                "https://finracerdev-7891.s3.us-east-1.amazonaws.com/statics/Crown_1.png",
                "https://finracerdev-7891.s3.us-east-1.amazonaws.com/statics/Crown_2.png",
                "https://finracerdev-7891.s3.us-east-1.amazonaws.com/statics/Crown_3.png",
              ][i];
              const userImg =
                user?.user_photo ||
                (user?.gender === "female"
                  ? "https://finracerdev-7891.s3.us-east-1.amazonaws.com/statics/womanPlaceholder.jpg"
                  : "https://finracerdev-7891.s3.us-east-1.amazonaws.com/statics/manPlaceholder.jpg");
              const userName = user?.user_name || "";

              return `
                <div class="flex flex-col items-center gap-4">
                  <div style="position: relative;">
                    <img class="h-36 w-36 rounded-2xl aspect-square" src="${userImg}" />
                    <img class="h-16 absolute -bottom-[12px] -left-[12px]" src="${crown}" />
                  </div>
                  <p class="text-base font-semibold dark:text-white">${userName}</p>
                </div>
              `;
            })
            .join("")}
        </div>

        <!-- Stock Row -->
        <div class="flex justify-center items-start gap-[50px]">
          ${[...Array(maxStockSlots)]
            .map((_, i) => {
              const stockIcon = stockRankList[i]?.stock_icon_url || "";
              return stockIcon
                ? `<img class="rounded-xl w-28 h-28" src="${stockIcon}" />`
                : "";
            })
            .join("")}
        </div>

      </div>

    </div>
  </div>
`);
  };

  <button className="px-4 py-2 rounded-md bg-blue-500 text-white mt-4 absolute text-4xl">
    Share
  </button>;

  // This function transforms socket data for line chart not using it now but maybe needed later
  // const dataTransform = (input) => {
  //     const stockIndexes = {};
  //     const raceResults = input.race_result || {};
  //     const timestamp = input.timestamp || new Date().toISOString(); // Use given timestamp or current time

  //     for (const [rank, details] of Object.entries(raceResults)) {
  //         details.stocks.forEach(stock => {
  //             if (!stockIndexes[stock.stock_ticker]) {
  //                 stockIndexes[stock.stock_ticker] = [];
  //             }
  //             stockIndexes[stock.stock_ticker].push({ x: timestamp, y: parseInt(rank) });
  //         });
  //     }

  //     // Update labels (keep last 30)
  //     setLabels(prevLabels => {
  //         const newLabels = [...prevLabels, timestamp];
  //         return newLabels.slice(-30); // Keep only the last 30 timestamps
  //     });

  //     // Update datasets (keep last 30 points per stock)
  //     setDataset(prevDatasets => {
  //         const updatedDatasets = prevDatasets.map(dataset => {
  //             const newData = stockIndexes[dataset.label] || [];
  //             const updatedData = [...dataset.data, ...newData].slice(-30); // Keep last 30 points
  //             return { ...dataset, data: updatedData };
  //         });

  //         // Add new stocks if they didn't exist before
  //         Object.keys(stockIndexes).forEach(ticker => {
  //             if (!prevDatasets.some(dataset => dataset.label === ticker)) {
  //                 updatedDatasets.push({
  //                     label: ticker,
  //                     data: stockIndexes[ticker].slice(-30), // Ensure new stocks also keep max 30
  //                     borderColor: getColor(ticker),
  //                     backgroundColor: getColor(ticker) + "33",
  //                     fill: false,
  //                 });
  //             }
  //         });

  //         return updatedDatasets;
  //     });
  // };
  const generateStaticDatasets = (stockCountArray) => {
    const barColors = [
      "red",
      "blue",
      "yellow",
      "rgba(75, 192, 192, 0.8)",
      "rgba(153, 102, 255, 0.8)",
    ];
    const stockCount = stockCountArray.length; // Get the number of stocks

    // Generate unique ranks for each timestamp
    const generateUniqueRanks = () => {
      let ranks = Array.from({ length: stockCount }, (_, i) => i + 1);
      return ranks.sort(() => Math.random() - 0.5); // Shuffle array
    };

    // Create dataset where each stock gets a unique rank at each timestamp
    let dataMatrix = Array.from({ length: stockCount }, () => []);

    for (let i = 0; i < 30; i++) {
      let uniqueRanks = generateUniqueRanks();
      let timestamp = (i * 5).toString().padStart(2, "0"); // Generates "0", "05", "10", ..., "145"
      uniqueRanks.forEach((rank, index) => {
        dataMatrix[index].push({ x: timestamp, y: rank });
      });
    }

    return dataMatrix.map((data, index) => ({
      label: stockCountArray[index], // Use stock name from the array
      data,
      borderColor: barColors[index % barColors.length],
      backgroundColor: barColors[index % barColors.length],
      fill: false,
    }));
  };

  // Example usage inside useEffect:
  useEffect(() => {
    setDataset(generateStaticDatasets(stockCount));
  }, [stockCount]); // Regenerate datasets whenever stockCount changes

  // useEffect(() => {
  //   console.log("state of data", labels, dataset);
  // }, [labels, dataset]);

  const transformSocketData = (raceData) => {
    if (!raceData || !raceData.stocks || !raceData.start_date)
      return { labels: [], datasets: [] };

    const startTime = new Date(raceData.start_date).getTime();

    const allTimestamps = new Set();
    const stockData = {};

    raceData?.stocks?.forEach((stock) => {
      stockData[stock.stock_ticker] = [];
      stock?.history?.forEach((entry) => {
        const timeElapsed = (
          (new Date(entry.timestamp).getTime() - startTime) /
          60000
        ).toFixed(2);
        stockData[stock.stock_ticker].push({ x: timeElapsed, y: entry.rank });
        allTimestamps.add(timeElapsed);
      });
    });

    const sortedTimestamps = [...allTimestamps].sort((a, b) => a - b);

    const datasets = Object.entries(stockData).map(([ticker, data], index) => ({
      label: ticker,
      data,
      borderColor: ["#00E396", "#FEB019", "#FF4560", "#775DD0"][index % 4], // Rotate colors
      backgroundColor: ["#00E39633", "#FEB01933", "#FF456033", "#775DD033"][
        index % 4
      ],
      fill: false,
    }));

    return { labels: sortedTimestamps, datasets };
  };

  // can you try this

  const findImageUrlForStock = (id) =>
    stocksDataForRace
      ? stocksDataForRace[
          Object.keys(stocksDataForRace)?.find((element) => element === id)
        ]?.icon_url
      : "";

  // useEffect(() => {
  //   console.log("raceDetails", raceDetails);
  // }, [raceDetails]);

  // useEffect(() => {
  //   console.log(
  //     "Race status this is pain in >>>>>>>>>>>>>",
  //     raceDetails?.status
  //   );
  // }, [raceStatus]);

  // useEffect(()=>{
  //     console.log(isRaceStarted)
  // },[isRaceStarted])

  const canUserJoin = () => {
    if (test) return false;

    let encodedUserDetails =
      localStorage.getItem("fin_userDetails") ||
      localStorage.getItem("guest_details");

    if (!encodedUserDetails) {
      setShowLoginForm(true);
      return;
    }

    const currentUser = JSON.parse(atob(encodedUserDetails));
    if (!currentUser || !raceDetails) return false;

    const raceStartTime = new Date(raceDetails["start_date"]);
    const now = new Date();

    const timeDiffInMinutes = (raceStartTime - now) / 60000;

    const userHasJoined = rankList?.some(
      (entry) => entry?.user?.id === currentUser.id
    );

    // console.log("Time until race (in minutes):", timeDiffInMinutes);
    // console.log("Has user joined:", userHasJoined);

    return !userHasJoined && timeDiffInMinutes > 15;
  };

  const [showJoin, setShowJoin] = useState(false);
  const [canJoinButton, setCanJoinButton] = useState(false);

  useEffect(() => {
    let c = canUserJoin();
    // console.log(c);
    setCanJoinButton(c);
  }, []);

  const stockColors = [
    "#00E396", // Green
    "#FEB019", // Orange
    "#FF4560", // Red
    "#775DD0", // Purple
    "#3F51B5", // Indigo
    "#546E7A", // Blue Grey
    "#26A69A", // Teal
    "#F9A825", // Amber
    "#EC407A", // Pink
    "#29B6F6", // Light Blue
    "#66BB6A", // Light Green
    "#AB47BC", // Deep Purple
    "#FFA726", // Deep Orange
    "#8D6E63", // Brown
    "#42A5F5", // Sky Blue
    "#7E57C2", // Violet
    "#EF5350", // Soft Red
    "#26C6DA", // Cyan
    "#9CCC65", // Lime
    "#FF7043", // Coral
  ];

  // useEffect(() => {
  //   if (compareFlag.current || !listOfStocks?.length) return;

  //   compareFlag.current = true;

  //   fetchData();
  // }, [listOfStocks]);

  const fetchData = async (listOfStocks) => {
    try {
      const formatDate = (date) => date.toISOString().split("T")[0];
      const today = new Date();
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(today.getMonth() - 1);

      const startDate = formatDate(oneMonthAgo);
      const endDate = formatDate(today);

      const allPromises = listOfStocks.map(
        (stock, index) =>
          new Promise((resolve, reject) => {
            getStockChartData(
              stock.stock_ticker,
              startDate,
              endDate,
              "day",
              (data) => resolve({ ticker: stock.stock_ticker, data }),
              (error) => reject(error)
            );
          })
      );

      const results = await Promise.all(allPromises);

      const datasets = [];
      let dateLabels = [];

      results.forEach((stockData, index) => {
        const res = stockData.data?.results;
        if (!res?.length) return;

        const stockPrices = res.map((entry) => entry.c);
        const stockDates = res.map(
          (entry) => new Date(entry.t).toISOString().split("T")[0]
        );

        if (index === 0) {
          dateLabels = stockDates;
        }

        datasets.push({
          label: stockData.ticker,
          data: stockPrices,
          borderColor: stockColors[index % stockColors.length],
          backgroundColor: stockColors[index % stockColors.length] + "33",
          fill: graphType === "area",
        });
      });

      if (datasets.length && dateLabels.length) {
        setLabels((prev) =>
          JSON.stringify(prev) === JSON.stringify(dateLabels)
            ? prev
            : dateLabels
        );
        setChartData((prev) =>
          JSON.stringify(prev) === JSON.stringify(datasets) ? prev : datasets
        );
      }
    } catch (err) {
      console.error("Chart fetch error:", err);
    }
  };

  if (isLoadingRaceTile && raceStatus !== "finished") {
    return (
      <>
        {isLoading ? (
          <div className="fixed bg-black opacity-40 w-full h-screen top-0 left-0 grid place-items-center z-[999]">
            <div>
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </div>
          </div>
        ) : (
          !isRaceStarted &&
          raceDetails &&
          !showLoginForm &&
          !test && (
            <RaceWaitingZone
              start_date={raceDetails?.start_date}
              raceStarted={isRaceStarted}
              joinedUsersList={joinedUsers}
              raceName={raceDetails?.name}
              liveUsers={liveUsers}
              race_id={race_id}
              status={raceStatus}
              // raceEnded = {false}
              closeCard={() => {
                setIsRaceStarted(true);
                setIsLoadingRaceTile(false);
              }}
            />
          )
        )}
        <motion.div
          initial={{
            y: 120,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
          className="w-full relative flex pb-8 gap-8 dark:bg-[#000924] justify-center items-center h-[90vh]"
        >
          {/* <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
          <p className="text-2xl font-bold dark:text-white">
            Race is Loading...
          </p> */}
          {isLoading ? (
            <div className="fixed bg-black opacity-40 w-full h-screen top-0 left-0 grid place-items-center z-[999]">
              <div>
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              </div>
            </div>
          ) : (
            !isRaceStarted &&
            raceDetails &&
            !showLoginForm &&
            !test && (
              <RaceWaitingZone
                start_date={raceDetails?.start_date}
                raceStarted={isRaceStarted}
                joinedUsersList={joinedUsers}
                raceName={raceDetails?.name}
                liveUsers={liveUsers}
                race_id={race_id}
                status={raceDetails?.status}
                // raceEnded = {false}
                closeCard={() => {
                  setIsRaceStarted(true);
                }}
              />
            )
          )}
          <motion.div
            initial={{
              y: 120,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            className="w-full relative h-auto flex pb-8 dark:bg-[#000924]"
          >
            {/* Ensure sidebar is inside a container with sufficient height */}
            <Sidebar />

            {/* dashboard  */}
            <div
              className={`flex-1 px-[2%] md:px-[6%] pt-[2.1rem] ${
                test ? " mt-[10rem]" : "mt-[30rem]"
              } overflow-x-hidden`}
            >
              {/* this is full width container cuz we need the sidebar to remain at correct place */}
              <div className="max-w-[1400px] w-full py-[11px] px-[20px] flex flex-col lg:flex-row gap-[15px] rounded-t-[24px] dark:bg-[#000D38] bg-[#EDF7FF]">
                {showJoin && (
                  <JoinRace
                    raceName={raceDetails?.name}
                    closeForm={setShowJoin}
                    race_id={race_id}
                    setStatus={setShowJoin}
                    start_Time={raceDetails?.start_date}
                  />
                )}
                {/* actual dashboard  */}
                <div className="flex-1 px-[22px] py-[18px]">
                  <div className="w-full flex justify-between mb-[20px]">
                    <div className="flex gap-[0.76rem]">
                      <div></div>
                      <div className="h-full">
                        <h3 className="text-[1.05rem] font-bold dark:text-white font-poppins">
                          {raceDetails?.name?.charAt(0)?.toUpperCase() +
                            raceDetails?.name?.slice(1)}
                        </h3>
                        <div className="font-medium text-[0.9rem] dark:text-white flex gap-4 items-center flex-wrap">
                          {raceDetails?.end_date ? (
                            new Date(raceDetails.end_date).getTime() >
                            Date.now() ? (
                              <>
                                <p>
                                  {new Date(raceDetails.start_date).getTime() >
                                  Date.now()
                                    ? "Race Starts In:"
                                    : "Remaining Time:"}
                                </p>
                                <div className="font-semibold font-poppins">
                                  <Countdown
                                    date={
                                      new Date(
                                        raceDetails.start_date
                                      ).getTime() > Date.now()
                                        ? Date.parse(raceDetails.start_date)
                                        : Date.parse(raceDetails.end_date)
                                    } // Correct UTC-based timestamp
                                    renderer={({
                                      days,
                                      hours,
                                      minutes,
                                      seconds,
                                    }) => {
                                      const formatTime = (time) =>
                                        String(time).padStart(2, "0");

                                      return (
                                        <span>
                                          {days > 0 && `${formatTime(days)}:`}
                                          {formatTime(hours)}:
                                          {formatTime(minutes)}:
                                          {formatTime(seconds)}
                                        </span>
                                      );
                                    }}
                                  />
                                </div>
                              </>
                            ) : (
                              <p className="font-poppins">
                                Race Ended On:{" "}
                                <span>
                                  {new Date(
                                    raceDetails.end_date
                                  ).toLocaleString()}
                                </span>
                              </p>
                            )
                          ) : (
                            <p>Loading race details...</p>
                          )}

                          {canJoinButton && (
                            <div
                              onClick={() => setShowJoin(true)}
                              className="font-semibold text-lg dark:text-white bg-blue-600 px-5 cursor-pointer py-1 rounded-xl"
                            >
                              Join
                            </div>
                          )}
                        </div>
                      </div>
                      {/* <div className='relative top-1'>
                                        <img src={info} alt="info icon" />
                                    </div> */}
                    </div>
                    <div>
                      {isExploding && (
                        <ConfettiExplosion
                          particleCount={200}
                          particleSize={5}
                          duration={2800}
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex-1 rounded-[20px]  mb-4 ">
                    <div className="flex justify-between w-full items-center mb-[10px dark:text-white"></div>

                    {raceStatus === "finished" && (
                      <div
                        ref={cardRef}
                        className="w-full h-full flex justify-center items-center"
                      >
                        <div className="rounded-[24px] w-[90%] px-[1.1rem] py-[1rem] flex flex-col overflow-hidden cursor-pointer mt-[20px]">
                          <div className="w-full flex justify-between mb-[14px]">
                            {/* <div className='flex gap-[0.76rem] flex-1'>
                                                                <img className='w-12 h-12' src={darkModeEnabled ? boxdark : box} alt="box icon" />
                                                                <div className='h-full'>
                                                                    <h3 className='text-[1.05rem] font-bold dark:text-white line-clamp-3'>{raceDetails.name}</h3>
                                                                    
                                                                </div>
                                                            </div> */}

                            {/* <div className='h-full flex flex-col justify-start items-end flex-1'>
                                                                <h3 className='text-[1.05rem] font-bold dark:text-white'>Created By</h3>
                                                                <p className='text-[0.7rem] dark:text-white'>{raceDetails?.created_by?.firstName + " " + raceDetails?.created_by?.lastName}</p>
                                                                <p className='text-[0.7rem] dark:text-white font-poppins'>
                                                                    {raceDetails?.end_date &&
                                                                        (() => {
                                                                            const [year, month, day] = raceDetails.end_date.split("T")[0].split("-");
                                                                            return `${day}/${month}/${year}`;
                                                                        })()
                                                                    }
                                                                </p>
                                                            </div> */}
                          </div>

                          <div className="w-full flex justify-center items-center mb-[25px] relative flex-col">
                            <div className="w-full flex justify-center items-center gap-[25px]">
                              <div style={{ position: "relative", flex: 1 }}>
                                {" "}
                                <img
                                  className="h-80 w-80 rounded-xl aspect-square"
                                  src={
                                    rankList?.[0]?.user_photo ||
                                    (rankList?.[0]?.gender === "female"
                                      ? femalePlceholder
                                      : malePlceholder)
                                  }
                                />
                                <img
                                  className="h-30 absolute -bottom-[40px] -left-[10px]"
                                  src={Crown_1}
                                />
                              </div>
                              <div style={{ position: "relative", flex: 1 }}>
                                <img
                                  className="h-80 w-80 rounded-xl aspect-square"
                                  src={
                                    rankList?.[1]?.user_photo ||
                                    (rankList?.[1]?.gender === "female"
                                      ? femalePlceholder
                                      : malePlceholder)
                                  }
                                />
                                <img
                                  className="h-30 absolute -bottom-[40px] -left-[10px]"
                                  src={Crown_2}
                                />
                              </div>
                              <div style={{ position: "relative", flex: 1 }}>
                                {" "}
                                <img
                                  className="h-80 w-80 rounded-xl aspect-square"
                                  src={
                                    rankList?.[2]?.user_photo ||
                                    (rankList?.[2]?.gender === "female"
                                      ? femalePlceholder
                                      : malePlceholder)
                                  }
                                />
                                <img
                                  className="h-30 absolute -bottom-[40px] -left-[10px]"
                                  src={Crown_3}
                                />
                              </div>
                            </div>
                            <div className="w-full flex justify-center items-center gap-[25px] mt-[40px] text-white">
                              <div className="flex flex-1 justify-center text-xl font-semibold">
                                <p>{rankList?.[0]?.user_name} </p>
                              </div>
                              <div className="flex flex-1 justify-center text-xl font-semibold">
                                <p>{rankList?.[1]?.user_name} </p>
                              </div>
                              <div className="flex flex-1 justify-center text-xl font-semibold">
                                <p>{rankList?.[2]?.user_name} </p>
                              </div>
                            </div>
                            <div className="w-full flex justify-center items-center gap-[25px] mt-[20px]">
                              <div className="flex flex-1 justify-center">
                                <img
                                  className="rounded-xl w-60 h-60"
                                  src={stockRankList?.[0]?.stock_icon_url}
                                />
                              </div>
                              <div className="flex flex-1 justify-center">
                                <img
                                  className="rounded-xl w-60 h-60"
                                  src={stockRankList?.[1]?.stock_icon_url}
                                />
                              </div>
                              <div className="flex flex-1 justify-center">
                                <img
                                  className="rounded-xl w-60 h-60"
                                  src={stockRankList?.[2]?.stock_icon_url}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {graphType == "Ticker" &&
                      data.labels.length > 0 &&
                      raceStatus !== "finished" && (
                        <Bar
                          data={data}
                          options={options}
                          plugins={[customPlugin]}
                        />
                      )}
                    {iframeVisible && (
                      <iframe
                        className="flex-1 w-full h-[700px]"
                        ref={iframeRef}
                        src={`https://missionatal.com/?raceId=${race_id}`}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    )}

                    {graphType == "Price" && (
                      // <StockRaceChart duration={60} stocks={stockCount}/>
                      <RacePriceChart
                        staticData={true}
                        stocks={stockCount}
                        stopTime={stopTime}
                      />
                    )}
                    {graphType == "Rank" && (
                      // <StockRaceChart duration={60} stocks={stockCount}/>
                      <BumpChart stocks={stockCount} />
                      // <RacePriceChart staticData={true} stocks={stockCount} stopTime={"2025-03-20T12:51:00"}/>
                    )}
                  </div>
                </div>
              </div>
              {/* other stocks rally  */}
              {(raceStatus == "running" || raceStatus == "finished") && (
                <div className="w-[100%] py-[13px] px-[70px] rounded-b-[24px] dark:bg-[#000D38] bg-[#EDF7FF]">
                  <div className="flex justify-between w-full items-center mb-[18px]">
                    <p className="font-medium text-[0.9rem] dark:text-white">
                      Stock Ranking
                    </p>
                    {/* <button><CgChevronRightO color={darkModeEnabled ? 'white' : 'black'} size={20} /></button> */}
                  </div>

                  <StockRankList
                    stocksData={stocksDataForRace} // data from api below is data from socket
                    stockRankList={stockRankList}
                  />

                  {raceStatus != "finished" &&
                    userDetails &&
                    labels &&
                    chartData && (
                      <div className="w-full h-[30rem]">
                        <p className="dark:text-slate-300 text-slate-700 font-semibold text-xl font-poppins w-full flex items-center justify-center mb-5">
                          Comparison of Last 30 days
                        </p>
                        <StockChart
                          labels={labels}
                          datasets={chartData}
                          area={false}
                          disableAnimation={true}
                          zoom={true}
                        />
                      </div>
                    )}
                </div>
              )}
            </div>
          </motion.div>
          {showDetails && (
            <AnimatePresence>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                exit={{
                  opacity: 0,
                }}
                className="fixed top-0 left-0 w-full h-screen py-[3%] backdrop-blur-md z-[100] grid place-items-center"
              >
                <div className="bg-[#000D38] h-[100%] text-[white] rounded-[8px] ">
                  <div className="flex justify-end p-[10px]">
                    <IoMdCloseCircleOutline
                      className="text-[30px] cursor-pointer"
                      onClick={() => setshowDetails(false)}
                    />
                  </div>
                  <div className="px-[30px]">
                    {raceDetails?.created_by?.firstName && (
                      <p className="font-medium text-[1.05rem]">
                        Race created by -{" "}
                        {raceDetails.created_by.firstName +
                          (raceDetails.created_by.lastName
                            ? ` ${raceDetails.created_by.lastName}`
                            : "")}
                      </p>
                    )}

                    <p className="text-[0.9rem] dark:text-white">
                      Race Duration:
                      <span className="font-semibold ml-2 font-poppins">
                        {duration}
                      </span>
                    </p>
                    <h3 className="text-[0.9rem] font-bold dark:text-white flex gap-1 font-poppins pb-[20px]">
                      {participantsCount}{" "}
                      <span className="font-sans">
                        {participantsCount === 1
                          ? "Participant"
                          : "Participants"}
                      </span>{" "}
                    </h3>
                    <div className="flex flex-col max-w-[295px]">
                      <div className="flex gap-[6px] mb-[11px]">
                        <button
                          onClick={() => {
                            updateUser();
                            updateUser2();
                            updateUser3();
                            setTabs("leaderboard");
                          }}
                          className={
                            tabs === "leaderboard"
                              ? "w-[9rem] flex justify-center items-center py-[12.25px] bg-blue-600 text-white font-semibold rounded-[70px] text-[14px] dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF]"
                              : "w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px] dark:text-white"
                          }
                        >
                          Leaderboard
                        </button>
                        {(raceStatus == "running" ||
                          raceStatus == "finished") && (
                          <button
                            onClick={() => setTabs("yourbets")}
                            className={
                              tabs === "yourbets"
                                ? "w-[9rem] flex justify-center items-center py-[12.25px] bg-blue-600 text-white font-semibold rounded-[70px] text-[14px] dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF]"
                                : "w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px] dark:text-white"
                            }
                          >
                            Your Bets
                          </button>
                        )}
                      </div>
                      {
                        <div className="w-full rounded-[8px] max-h-scree h-full overflow-auto custom-scrollbar">
                          {tabs === "leaderboard" ? (
                            <>
                              {/* <div className='w-full flex justify-between items-center mb-[14px]'>
                                                            <p className="font-semibold text-4 dark:text-white">View all</p>
                                                        </div> */}
                              {raceStatus == "running" ? (
                                <UserRankingList rankList={rankList} />
                              ) : (
                                <UserRankingList
                                  rankList={joinedUsers}
                                  status="f"
                                />
                              )}
                            </>
                          ) : (
                            <div className="w-full max-h-96 pr-3 flex flex-col gap-4">
                              {stockRankList ? (
                                stockRankList?.map((curr, index) => {
                                  let stock =
                                    stocksDataForRace[
                                      Object.keys(stocksDataForRace).find(
                                        (element) => element === curr.stock_id
                                      )
                                    ];
                                  let imageUrl = stock?.icon_url;
                                  // console.log(curr);
                                  return (
                                    <YourBetsCard
                                      key={curr?.stock_id}
                                      stocksDataForRace={stocksDataForRace}
                                      stockName={curr?.stock_name}
                                      imageUrl={imageUrl}
                                      participants={curr?.participants}
                                    />
                                  );
                                })
                              ) : (
                                <ColorRing
                                  visible={true}
                                  height="25"
                                  width="25"
                                  ariaLabel="color-ring-loading"
                                  wrapperStyle={{}}
                                  wrapperClass="color-ring-wrapper"
                                  colors={["#e15b64", "#f47e60"]}
                                />
                              )}
                            </div>
                          )}
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </>
    );
  } else {
    return (
      <>
        {isLoading ? (
          <div className="fixed bg-black opacity-40 w-full h-screen top-0 left-0 grid place-items-center z-[999]">
            <div>
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </div>
          </div>
        ) : (
          !isRaceStarted &&
          raceDetails &&
          !showLoginForm &&
          !test && (
            <RaceWaitingZone
              start_date={raceDetails?.start_date}
              raceStarted={isRaceStarted}
              joinedUsersList={joinedUsers}
              raceName={raceDetails?.name}
              liveUsers={liveUsers}
              race_id={race_id}
              status={raceDetails?.status}
              // raceEnded = {false}
              closeCard={() => {
                setIsRaceStarted(true);
              }}
            />
          )
        )}
        <motion.div
          initial={{
            y: 120,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
          className="w-full relative h-auto flex pb-8 dark:bg-[#000924]"
        >
          {/* Ensure sidebar is inside a container with sufficient height */}
          <Sidebar />

          {/* dashboard  */}
          <div className="flex-1 px-[2%] md:px-[6%] pt-[2.1rem] overflow-x-hidden">
            {/* this is full width container cuz we need the sidebar to remain at correct place */}
            <div className="max-w-[1400px] w-full py-[11px] px-[20px] flex flex-col lg:flex-row gap-[15px] rounded-t-[24px] dark:bg-[#000D38] bg-[#EDF7FF]">
              {showJoin && (
                <JoinRace
                  raceName={raceDetails?.name}
                  closeForm={setShowJoin}
                  race_id={race_id}
                  setStatus={setShowJoin}
                  start_Time={raceDetails?.start_date}
                />
              )}
              {/* actual dashboard  */}
              <div className="flex-1 px-[22px] py-[18px]">
                <div className="w-full flex justify-between mb-[20px]">
                  <div className="flex gap-[0.76rem]">
                    <div></div>
                    <div className="h-full">
                      <h3 className="text-[1.05rem] font-bold dark:text-white font-poppins">
                        {raceDetails?.name?.charAt(0)?.toUpperCase() +
                          raceDetails?.name?.slice(1)}
                      </h3>
                      <div className="font-medium text-[0.9rem] dark:text-white flex gap-4 items-center flex-wrap">
                        {raceDetails?.end_date ? (
                          new Date(raceDetails.end_date).getTime() >
                          Date.now() ? (
                            <>
                              <p>
                                {new Date(raceDetails.start_date).getTime() >
                                Date.now()
                                  ? "Race Starts In:"
                                  : "Remaining Time:"}
                              </p>
                              <div className="font-semibold font-poppins">
                                <Countdown
                                  date={
                                    new Date(raceDetails.start_date).getTime() >
                                    Date.now()
                                      ? Date.parse(raceDetails.start_date)
                                      : Date.parse(raceDetails.end_date)
                                  } // Correct UTC-based timestamp
                                  renderer={({
                                    days,
                                    hours,
                                    minutes,
                                    seconds,
                                  }) => {
                                    const formatTime = (time) =>
                                      String(time).padStart(2, "0");

                                    return (
                                      <span>
                                        {days > 0 && `${formatTime(days)}:`}
                                        {formatTime(hours)}:
                                        {formatTime(minutes)}:
                                        {formatTime(seconds)}
                                      </span>
                                    );
                                  }}
                                />
                              </div>
                            </>
                          ) : (
                            <p className="font-poppins">
                              Race Ended On:{" "}
                              <span>
                                {new Date(
                                  raceDetails.end_date
                                ).toLocaleString()}
                              </span>
                            </p>
                          )
                        ) : (
                          <p>Loading race details...</p>
                        )}

                        {canJoinButton && (
                          <div
                            onClick={() => setShowJoin(true)}
                            className="font-semibold text-lg dark:text-white bg-blue-600 px-5 cursor-pointer py-1 rounded-xl"
                          >
                            Join
                          </div>
                        )}
                      </div>
                    </div>
                    {/* <div className='relative top-1'>
                                        <img src={info} alt="info icon" />
                                    </div> */}
                  </div>
                  <div>
                    {isExploding && (
                      <ConfettiExplosion
                        particleCount={200}
                        particleSize={5}
                        duration={2800}
                      />
                    )}
                  </div>
                  <div className="h-full flex flex-row justify-center items-end">
                    {/* {raceStatus != "finished" && (
                      <div className="border-2 dark:border-[#00387E] flex items-center rounded-lg gap-2 mr-4 text-[12px] text-[white]">
                        {["Race", "Comparison"].map((item) => (
                          <span
                            key={item}
                            className={`rounded-md cursor-pointer ${
                              item == graphType ? "bg-blue-600" : ""
                            } p-2`}
                            onClick={() => setGraphType(item)}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )} */}
                    {(raceStatus == "finished" || raceStatus == "running") &&
                    ud ? (
                      <div className="group">
                        <div className="hidden group-hover:flex dark:bg-white bg-blue-200 px-2 py-1 absolute rounded-xl top-24 right-32 z-20 opacity-85">
                          Share in Community
                        </div>
                        <IoMdShare
                          className="dark:text-[white] text-slate-500 text-[30px] cursor-pointer mr-5 relative"
                          onClick={handleShareClick}
                        />
                      </div>
                    ) : (
                      ud && (
                        <>
                          <div
                            onClick={() => {
                              setIsRaceStarted(false);
                            }}
                            className="px-2 py-1 rounded-xl mr-3 cursor-pointer bg-blue-600 text-white font-semibold"
                          >
                            Invite
                          </div>
                          {isRaceStarted == false &&
                            raceStatus != "running" &&
                            raceStatus != "finished" &&
                            !test && (
                              <RaceWaitingZone
                                start_date={raceDetails?.start_date}
                                raceStarted={isRaceStarted}
                                joinedUsersList={joinedUsers}
                                raceName={raceDetails?.name}
                                liveUsers={liveUsers}
                                race_id={race_id}
                                status={raceDetails?.status}
                                closeCard={() => {
                                  setIsRaceStarted(true);
                                }}
                              />
                            )}
                        </>
                      )
                    )}

                    <div className="group">
                      <div className="hidden group-hover:flex bg-blue-200 dark:bg-white px-2 py-1 absolute rounded-xl top-24 right-20 z-20 opacity-85">
                        See race stats
                      </div>
                      <HiInformationCircle
                        className="dark:text-[white] text-slate-600 text-[30px] cursor-pointer relative"
                        onClick={() => setshowDetails(true)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1 rounded-[20px]  mb-4 ">
                  <div className="flex justify-between w-full items-center mb-[10px dark:text-white"></div>

                  {raceStatus === "finished" && (
                    <div
                      ref={cardRef}
                      className="w-full h-full flex justify-center items-center"
                    >
                      <div className="rounded-[24px] w-[90%] px-[1.1rem] py-[1rem] flex flex-col overflow-hidden cursor-pointer mt-[20px]">
                        <div className="w-full flex justify-between mb-[14px]">
                          {/* <div className='flex gap-[0.76rem] flex-1'>
                                                                <img className='w-12 h-12' src={darkModeEnabled ? boxdark : box} alt="box icon" />
                                                                <div className='h-full'>
                                                                    <h3 className='text-[1.05rem] font-bold dark:text-white line-clamp-3'>{raceDetails.name}</h3>
                                                                    
                                                                </div>
                                                            </div> */}

                          {/* <div className='h-full flex flex-col justify-start items-end flex-1'>
                                                                <h3 className='text-[1.05rem] font-bold dark:text-white'>Created By</h3>
                                                                <p className='text-[0.7rem] dark:text-white'>{raceDetails?.created_by?.firstName + " " + raceDetails?.created_by?.lastName}</p>
                                                                <p className='text-[0.7rem] dark:text-white font-poppins'>
                                                                    {raceDetails?.end_date &&
                                                                        (() => {
                                                                            const [year, month, day] = raceDetails.end_date.split("T")[0].split("-");
                                                                            return `${day}/${month}/${year}`;
                                                                        })()
                                                                    }
                                                                </p>
                                                            </div> */}
                        </div>

                        <div className="w-full flex justify-center items-center mb-[25px] relative flex-col">
                          <div className="w-full flex justify-center items-center gap-[25px]">
                            <div style={{ position: "relative", flex: 1 }}>
                              {" "}
                              <img
                                className="h-80 w-80 rounded-xl aspect-square"
                                src={
                                  rankList?.[0]?.user_photo ||
                                  (rankList?.[0]?.gender === "female"
                                    ? femalePlceholder
                                    : malePlceholder)
                                }
                              />
                              <img
                                className="h-30 absolute -bottom-[40px] -left-[10px]"
                                src={Crown_1}
                              />
                            </div>
                            <div style={{ position: "relative", flex: 1 }}>
                              <img
                                className="h-80 w-80 rounded-xl aspect-square"
                                src={
                                  rankList?.[1]?.user_photo ||
                                  (rankList?.[1]?.gender === "female"
                                    ? femalePlceholder
                                    : malePlceholder)
                                }
                              />
                              <img
                                className="h-30 absolute -bottom-[40px] -left-[10px]"
                                src={Crown_2}
                              />
                            </div>
                            <div style={{ position: "relative", flex: 1 }}>
                              {" "}
                              <img
                                className="h-80 w-80 rounded-xl aspect-square"
                                src={
                                  rankList?.[2]?.user_photo ||
                                  (rankList?.[2]?.gender === "female"
                                    ? femalePlceholder
                                    : malePlceholder)
                                }
                              />
                              <img
                                className="h-30 absolute -bottom-[40px] -left-[10px]"
                                src={Crown_3}
                              />
                            </div>
                          </div>
                          <div className="w-full flex justify-center items-center gap-[25px] mt-[40px] text-white">
                            <div className="flex flex-1 justify-center text-xl font-semibold">
                              <p>{rankList?.[0]?.user_name} </p>
                            </div>
                            <div className="flex flex-1 justify-center text-xl font-semibold">
                              <p>{rankList?.[1]?.user_name} </p>
                            </div>
                            <div className="flex flex-1 justify-center text-xl font-semibold">
                              <p>{rankList?.[2]?.user_name} </p>
                            </div>
                          </div>
                          <div className="w-full flex justify-center items-center gap-[25px] mt-[20px]">
                            <div className="flex flex-1 justify-center">
                              <img
                                className="rounded-xl w-60 h-60"
                                src={stockRankList?.[0]?.stock_icon_url}
                              />
                            </div>
                            <div className="flex flex-1 justify-center">
                              <img
                                className="rounded-xl w-60 h-60"
                                src={stockRankList?.[1]?.stock_icon_url}
                              />
                            </div>
                            <div className="flex flex-1 justify-center">
                              <img
                                className="rounded-xl w-60 h-60"
                                src={stockRankList?.[2]?.stock_icon_url}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {graphType == "Ticker" &&
                    data.labels.length > 0 &&
                    raceStatus !== "finished" && (
                      <Bar
                        data={data}
                        options={options}
                        plugins={[customPlugin]}
                      />
                    )}
                  {iframeVisible && (
                    <iframe
                      className="flex-1 w-full h-[700px]"
                      ref={iframeRef}
                      src={`https://missionatal.com/?raceId=${race_id}`}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  )}

                  {graphType == "Price" && (
                    // <StockRaceChart duration={60} stocks={stockCount}/>
                    <RacePriceChart
                      staticData={true}
                      stocks={stockCount}
                      stopTime={stopTime}
                    />
                  )}
                  {graphType == "Rank" && (
                    // <StockRaceChart duration={60} stocks={stockCount}/>
                    <BumpChart stocks={stockCount} />
                    // <RacePriceChart staticData={true} stocks={stockCount} stopTime={"2025-03-20T12:51:00"}/>
                  )}
                </div>
              </div>
            </div>
            {/* other stocks rally  */}
            {(raceStatus == "running" || raceStatus == "finished") && (
              <div className="w-[100%] py-[13px] px-[70px] rounded-b-[24px] dark:bg-[#000D38] bg-[#EDF7FF]">
                <div className="flex justify-between w-full items-center mb-[18px]">
                  <p className="font-medium text-[0.9rem] dark:text-white">
                    Stock Ranking
                  </p>
                  {/* <button><CgChevronRightO color={darkModeEnabled ? 'white' : 'black'} size={20} /></button> */}
                </div>

                <StockRankList
                  stocksData={stocksDataForRace} // data from api below is data from socket
                  stockRankList={stockRankList}
                />

                {raceStatus != "finished" && labels && chartData && (
                  <div className="w-full h-[30rem]">
                    <p className="dark:text-slate-300 text-slate-700 font-semibold text-xl font-poppins w-full flex items-center justify-center mb-5">
                      Comparison of Last 30 days
                    </p>
                    <StockChart
                      labels={labels}
                      datasets={chartData}
                      area={false}
                      disableAnimation={true}
                      zoom={true}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
        {showDetails && (
          <AnimatePresence>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              exit={{
                opacity: 0,
              }}
              className="fixed top-0 left-0 w-full h-screen py-[3%] backdrop-blur-md z-[100] grid place-items-center"
            >
              <div className="dark:bg-[#000D38] bg-[#e5f4ff] h-[100%] dark:text-[white] rounded-[8px] ">
                <div className="flex justify-end p-[10px]">
                  <IoMdCloseCircleOutline
                    className="text-[30px] cursor-pointer"
                    onClick={() => setshowDetails(false)}
                  />
                </div>
                <div className="px-[30px]">
                  {raceDetails?.created_by?.firstName && (
                    <p className="font-medium text-[1.05rem]">
                      Race created by -{" "}
                      {raceDetails.created_by.firstName +
                        (raceDetails.created_by.lastName
                          ? ` ${raceDetails.created_by.lastName}`
                          : "")}
                    </p>
                  )}

                  <p className="text-[0.9rem] dark:text-white">
                    Race Duration:
                    <span className="font-semibold ml-2 font-poppins">
                      {duration}
                    </span>
                  </p>
                  <h3 className="text-[0.9rem] font-bold dark:text-white flex gap-1 font-poppins pb-[20px]">
                    {participantsCount}{" "}
                    <span className="font-sans">
                      {participantsCount === 1 ? "Participant" : "Participants"}
                    </span>{" "}
                  </h3>
                  <div className="flex flex-col max-w-[295px]">
                    <div className="flex gap-[6px] mb-[11px]">
                      <button
                        onClick={() => {
                          updateUser();
                          updateUser2();
                          updateUser3();
                          setTabs("leaderboard");
                        }}
                        className={
                          tabs === "leaderboard"
                            ? "w-[9rem] flex justify-center items-center py-[12.25px] bg-blue-600 text-white font-semibold rounded-[70px] text-[14px] dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF]"
                            : "w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px] dark:text-white"
                        }
                      >
                        Leaderboard
                      </button>
                      {(raceStatus == "running" ||
                        raceStatus == "finished") && (
                        <button
                          onClick={() => setTabs("yourbets")}
                          className={
                            tabs === "yourbets"
                              ? "w-[9rem] flex justify-center items-center py-[12.25px] bg-blue-600 text-white font-semibold rounded-[70px] text-[14px] dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF]"
                              : "w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px] dark:text-white"
                          }
                        >
                          Your Bets
                        </button>
                      )}
                    </div>
                    {
                      <div className="w-full rounded-[8px] max-h-scree h-full overflow-auto custom-scrollbar">
                        {tabs === "leaderboard" ? (
                          <>
                            {/* <div className='w-full flex justify-between items-center mb-[14px]'>
                                                            <p className="font-semibold text-4 dark:text-white">View all</p>
                                                        </div> */}
                            {raceStatus == "running" ? (
                              <UserRankingList rankList={rankList} />
                            ) : (
                              <UserRankingList rankList={rankList} />
                            )}
                          </>
                        ) : (
                          <div className="w-full max-h-96 pr-3 flex flex-col gap-4">
                            {stockRankList ? (
                              stockRankList?.map((curr, index) => {
                                let stock =
                                  stocksDataForRace[
                                    Object.keys(stocksDataForRace).find(
                                      (element) => element === curr.stock_id
                                    )
                                  ];
                                let imageUrl = stock?.icon_url;
                                // console.log(curr);
                                return (
                                  <YourBetsCard
                                    key={curr?.stock_id}
                                    stocksDataForRace={stocksDataForRace}
                                    stockName={curr?.stock_name}
                                    imageUrl={imageUrl}
                                    participants={curr?.participants}
                                  />
                                );
                              })
                            ) : (
                              <ColorRing
                                visible={true}
                                height="25"
                                width="25"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={["#e15b64", "#f47e60"]}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    }
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </>
    );
  }
};

export default RacePage;
