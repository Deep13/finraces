import React, { useContext, useEffect, useState } from "react";
import box from "../assets/images/ongoingRaces/focus_box.svg";
import boxdark from "../assets/images/boxdark.svg";
import info from "../assets/images/ongoingRaces/info_icon.svg";
import gold_crown from "../assets/images/gold_crown.svg";
import silver_crown from "../assets/images/silver_corwn.svg";
import Crown_1 from "../assets/images/Crown_1.png";
import Crown_2 from "../assets/images/Crown_2.png";
import Crown_3 from "../assets/images/Crown_3.png";
import bronze_corwn from "../assets/images/bronze_corwn.svg";
import line_beside_medals from "../assets/images/line_beside_medals.png";
import linedark from "../assets/images/linedark.svg";
import person2 from "../assets/images/person2.png";
import placeholder from "../assets/images/placeholder.png";
import malePlaceholder from "../assets/images/manPlaceholder.jpg";
import femalePlaceholder from "../assets/images/womanPlaceholder.jpg";
import start from "../assets/images/start.svg";
import startdark from "../assets/images/startdark.svg";
import finish from "../assets/images/finish.svg";
import finishdark from "../assets/images/finishdark.svg";
import { useNavigate } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { io } from "socket.io-client";
import RaceTile from "../Components/RaceTile";
import { fetchRaceDataDetailed } from "../Utils/api";
import { DarkModeContext } from "../Contexts/DarkModeProvider";
import { Bar } from "react-chartjs-2";
import { ColorRing } from "react-loader-spinner";
import ProgressDemo from "./ProgressBar";

import Bg from "../assets/images/stockRace/bgStockRanks.jpg";
import Arrow from "../assets/images/stockRace/arrow.jpg";
import First from "../assets/images/stockRace/1st.jpg";
import Second from "../assets/images/stockRace/2nd.jpg";
import Third from "../assets/images/stockRace/3rd.jpg";
import Fourth from "../assets/images/stockRace/4th.jpg";
import Fifth from "../assets/images/stockRace/5th.jpg";
import Sixth from "../assets/images/stockRace/6th.png";
import Seventh from "../assets/images/stockRace/7th.png";
import Eightth from "../assets/images/stockRace/8th.png";
import Ningth from "../assets/images/stockRace/9th.png";
import Tenth from "../assets/images/stockRace/10th.png";

import rank1 from "../assets/images/stockRace/rank1.png";
import rank2 from "../assets/images/stockRace/rank2.png";
import rank3 from "../assets/images/stockRace/rank3.png";
import CountDownTimer from "./CountDown";

const rankImages = {
  1: First,
  2: Second,
  3: Third,
  4: Fourth,
  5: Fifth,
  6: Sixth,
  7: Seventh,
  8: Eightth,
  9: Ningth,
  10: Tenth,
};

const RaceCardHomepage2 = ({
  raceId = "54asdffasaFSf",
  raceName = "Abstrace Race",
  end_date,
  start_Date,
  onRaceFinished,
  participants,
}) => {
  const { darkModeEnabled } = useContext(DarkModeContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isTimerFinished, setIsTimerFinished] = useState(false);

  const iframeRef = React.useRef(null);
  const getRemainingSeconds = (targetDate, initial_date) => {
    const targetTime = new Date(targetDate).getTime(); // Convert target date to milliseconds
    const currentTime = new Date(initial_date).getTime(); // Get current time in milliseconds

    // Calculate difference in seconds
    const remainingSeconds = Math.floor((targetTime - currentTime) / 1000);

    return remainingSeconds > 0 ? remainingSeconds : 0; // Return 0 if the date has passed
  };

  console.log(
    "Data Recieved",
    raceName,
    raceId,
    start_Date,
    end_date,
    participants
  );

  return (
    <>
      {loading ? (
        <div
          onClick={() => navigate(`/race/${raceId}`)}
          className="rounded-[24px] border border-black px-[1.1rem] py-[1rem] bg-[#edf7ff] dark:bg-[#002864] flex flex-col overflow-hidden cursor-pointer dark:border dark:border-[#00397E] items-center justify-center w-full"
        >
          <ColorRing
            visible={true}
            height="45"
            width="45"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60"]}
          />
        </div>
      ) : (
        <div
          onClick={() => navigate(`/race/${raceId}`)}
          className="rounded-[24px] border border-black px-[1.1rem] py-[1rem] bg-[#edf7ff] dark:bg-[#002864] flex flex-col overflow-hidden cursor-pointer dark:border dark:border-[#00397E]"
        >
          <div className="w-full flex justify-between mb-[14px]">
            <div className="flex gap-[0.76rem] flex-1">
              <img
                className="w-12 h-12"
                src={darkModeEnabled ? boxdark : box}
                alt="box icon"
              />
              <div className="h-full">
                <h3 className="text-[0.85rem] line-clamp-3 font-bold dark:text-white">
                  {raceName}
                </h3>
                {/* <p className='text-[0.7rem]'>XYZ</p> */}
              </div>
              {/* <div className=''>
                        <img className='w-[10px] h-[10px]' src={info} alt="info icon" />
                    </div> */}
            </div>
            <div className="flex-1 flex justify-center">
              {/* <CountdownCircleTimer
                isPlaying
                size={50}
                strokeWidth={3}
                duration={getRemainingSeconds(end_date, start_Date)} // total duration depcits a full circle.
                colors={["#5b89ff"]}
                initialRemainingTime={getRemainingSeconds(end_date, new Date())} // time that is remaining from now
                colorsTime={[7]}
              >
                
                {({ remainingTime }) => {
                  const hours = Math.floor(remainingTime / 3600);
                  const minutes = Math.floor((remainingTime % 3600) / 60);
                  const seconds = remainingTime % 60;

                  return (
                    <div className="text-[0.63rem] font-semibold dark:text-white font-poppins">
                      {hours}:{minutes}:{seconds}
                    </div>
                  );
                }}
              </CountdownCircleTimer> */}
              <CountDownTimer
                deadline={end_date}
                setIsTimerFinished={setIsTimerFinished}
                mode={"Home"}
              />
            </div>
            <div className="h-full flex flex-col justify-start items-end flex-1">
              {participants && (
                <h3 className="text-[1.05rem] font-bold dark:text-white">{`${participants} ${
                  participants > 1 ? "participants" : "participant"
                } `}</h3>
              )}
              {/* <p className='text-[0.7rem] dark:text-white'>{`${participants?.length} participants`}</p> */}
            </div>
          </div>

          {/* <ProgressDemo progress={progress} /> */}

          {/* {data.labels.length > 0 && (
                        // <Bar data={data} options={options} plugins={[customPlugin]} />
                        // <iframe className="w-[100%] h-[400px]" height="832px" src={`/v4/index.html?raceId=${raceId}`} />
                    )} */}

          <div
            className="w-full min-h-[200px] h-[27rem] cursor-pointer"
            onClick={() => navigate(`/race/${raceId}`)}
          >
            <iframe
              className="w-full h-full pointer-events-none"
              src={`/game/index.html?raceId=${raceId}`}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RaceCardHomepage2;
