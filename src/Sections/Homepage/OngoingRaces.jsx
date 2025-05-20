import { BiChevronRight } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import RaceCardHomepage from "../../Components/RaceCardHomepage";
import { getRaceList } from "../../Utils/api";
import { useNavigate } from "react-router-dom";
import RaceCardHomepage2 from "../../Components/RaceCardHomepage2";

const OngoingRaces = () => {
  const [raceList, setRaceList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRaceList(
      "running",
      1,
      (data) => {
        // alert('success')
        console.log("running races", data);
        setRaceList(data.data);
      },
      () => {
        // alert('failure')
      }
    );
  }, []);

  return (
    <div className="max-w-[1400px] relative mb-[3.3rem]">
      <a
        onClick={() => navigate("/allraces", { state: "Ongoing Races" })}
        className="absolute right-0 top-2 text-[#8d8d8d] text-[0.94rem] font-semibold hover:underline flex items-center"
        href=""
      >
        See All <BiChevronRight size={18} />
      </a>
      <h2 className="text-[2.14rem] text-center font-bold mb-[1.4rem] dark:text-white">
        Ongoing Races
      </h2>
      <div className="w-full gap-[1.4rem] grid grid-cols-1 mb-5">
        {raceList.length > 0 &&
          raceList.slice(0, 2).map((curr, index) => {
            return (
              <RaceCardHomepage2
                start_Date={curr.start_date}
                end_date={curr.end_date}
                raceName={curr.name}
                raceId={curr.id}
                key={index + 1}
                onRaceFinished={() =>
                  setRaceList([
                    ...raceList.slice(0, index),
                    ...raceList.slice(index + 1),
                  ])
                }
                participants={curr.participants}
              />
            );
          })}
      </div>
      {/* <div className="w-full gap-[1.4rem] grid grid-cols-1 md:grid-cols-2">
        {raceList.length > 0 &&
          raceList.slice(1, 4).map((curr, index) => {
            return (
              <RaceCardHomepage
                start_Date={curr.start_date}
                end_date={curr.end_date}
                raceName={curr.name}
                raceId={curr.id}
                key={index + 1}
                onRaceFinished={() =>
                  setRaceList([
                    ...raceList.slice(1, index + 1),
                    ...raceList.slice(index + 2),
                  ])
                }
              />
            );
          })}
      </div> */}
      {raceList.length === 0 && (
        <p className="dark:text-white text-center">
          There are no recent ongoing races
        </p>
      )}
    </div>
  );
};

export default OngoingRaces;
