import { useEffect, useState } from "react";
import { createDemoRace } from "../Utils/api";
import RaceCardHomepage2 from "./RaceCardHomepage2";
import JoinRace from "./JoinRace";
// import { useSocket } from "../Contexts/SocketProvider";

const DemoRace = () => {
  const [race, setRace] = useState({});
  const [joinRaceFormVisible, setJoinRaceFormVisible] = useState(false);
  // const socket = useSocket();

  //  Step 1: Create demo race initially
  useEffect(() => {
    createDemoRace(
      (data) => {
        console.log("Data of Demo race", data);
        setRace(data.data[0]);
      },
      (error) => {
        console.log("Error creating demo race", error);
      }
    );
  }, []);

  // Step 2: Update dem0 race via socket
  // useEffect(() => {
  //   if (!socket) return;

  //   const handleNotification = (data) => {
  //     console.log("Socket notification data", data);
  //     const raceObj = data?.notification?.payload?.race;

  //     if (raceObj?.is_demo_race) {
  //       setRace(raceObj);
  //     }
  //   };

  //   socket.on("notifications", handleNotification);
  // }, [socket]);

  return (
    <div className="max-w-[1400px] relative my-[3.3rem]">
      <button
        onClick={() => {
          setJoinRaceFormVisible(true);
        }}
        className=" bg-[#e4eaf0] dark:text-white dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] px-6 h-[2.5rem] text-md md:text-[1.3rem] rounded-[8px] flex gap-2 items-center text-black font-semibold absolute top-24 right-5"
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
          demo={true}
        />
      </h2>
      <div className="w-full gap-[1.4rem] grid grid-cols-1 mb-5">Here</div>
    </div>
  );
};

export default DemoRace;
