import { useEffect, useState } from "react";
import { createDemoRace } from "../Utils/api";
import RaceCardHomepage2 from "./RaceCardHomepage2";
import JoinRace from "./JoinRace";

const DemoRace = () => {
  const [race, setRace] = useState({});
  const [joinRaceFormVisible, setJoinRaceFormVisible] = useState(false);

  useEffect(() => {
    createDemoRace(
      (data) => {
        console.log("Data of Demo race", data);
        setRace(data);
      },
      (error) => {
        console.log("Error creatring demo race", error);
      }
    );
  }, []);

  return (
    <div className="max-w-[1400px] relative my-[3.3rem]">
      <button
        onClick={() => {
          setJoinRaceFormVisible(true);
        }}
        className=" bg-[#e4eaf0] dark:text-white dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] px-4 h-[2.35rem] text-[0.7rem] md:text-[0.9rem] rounded-[8px] flex gap-2 items-center text-black font-semibold absolute top-5 right-5"
      >
        Join
      </button>
      {joinRaceFormVisible && (
        <JoinRace
          raceName={"test user 's Investor's Arena 1749040135341"}
          closeForm={setJoinRaceFormVisible}
          race_id={"d7a525f0-de95-4d51-9b1b-75108f0a1401"}
          demo={true}
        />
      )}
      <h2 className="text-[2.14rem] text-center font-bold mb-[1.4rem] dark:text-white">
        <RaceCardHomepage2
          start_Date={"2025-06-04T12:34:00.000Z"}
          end_date={"2025-06-05T12:34:00.000Z"}
          raceName={"test user 's Investor's Arena 1749040135341"}
          raceId={"d7a525f0-de95-4d51-9b1b-75108f0a1401"}
          onRaceFinished={() => {}}
          participants={race?.participantCount}
        />
      </h2>
      <div className="w-full gap-[1.4rem] grid grid-cols-1 mb-5">Here</div>
    </div>
  );
};

export default DemoRace;
