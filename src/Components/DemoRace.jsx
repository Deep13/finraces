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
        className=" bg-[#e4eaf0] dark:text-white dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] px-4 h-[2.35rem] text-[0.7rem] md:text-[0.9rem] rounded-[8px] flex gap-2 items-center text-black font-semibold absolute top-24 right-5"
      >
        Join
      </button>
      <h2 className="text-[2.14rem] text-center font-bold mb-[1.4rem] dark:text-white">
        Demo Race
      </h2>
      {joinRaceFormVisible && (
        <JoinRace
          raceName={race?.name}
          closeForm={setJoinRaceFormVisible}
          race_id={race?.id}
          demo={true}
        />
      )}
      <h2 className="text-[2.14rem] text-center font-bold mb-[1.4rem] dark:text-white">
        <RaceCardHomepage2
          start_Date={race?.start_date}
          end_date={race?.end_date}
          raceName={race?.name}
          raceId={race?.id}
          onRaceFinished={() => {}}
          participants={race?.participantCount}
        />
      </h2>
      <div className="w-full gap-[1.4rem] grid grid-cols-1 mb-5">Here</div>
    </div>
  );
};

export default DemoRace;
