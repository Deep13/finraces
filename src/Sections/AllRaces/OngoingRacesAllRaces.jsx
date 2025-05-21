import React, { useEffect, useState } from "react";
import RaceCardHomepage from "../../Components/RaceCardHomepage";
import Pagination from "../../Components/Pagination";
import { getRaceList } from "../../Utils/api";
import { ColorRing } from "react-loader-spinner";

const OngoingRacesAllRaces = ({ filters }) => {
  const [raceList, setRaceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRaces, setTotalRaces] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRaceList(
      "running",
      page,
      (data) => {
        // alert('success')
        let total = Math.floor(data.total / 10);
        setTotalRaces(total);
        setHasNextPage(data.hasNextPage);
        console.log("finished races", data);
        setRaceList(data.data);
        setLoading(false);
      },
      (error) => {
        // alert('failure')
        console.log("error", error);
        setLoading(false);
      },
      filters
    );
  }, [filters, page]);
  return (
    <div className="max-w-[1400px] relative mb-[3.3rem]">
      <div className="w-full gap-[1rem] grid grid-cols-1 md:grid-cols-2 min-h-[200px] relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
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
        ) : raceList.length > 0 ? (
          raceList.map((curr, index) => (
            <RaceCardHomepage
              key={curr.id}
              start_Date={curr.start_date}
              end_date={curr.end_date}
              raceName={curr.name}
              raceId={curr.id}
            />
          ))
        ) : (
          <p className="dark:text-white col-span-2 text-center">
            There are no ongoing races right now
          </p>
        )}
      </div>

      {hasNextPage && (
        <Pagination
          currentPage={page}
          totalPages={totalRaces}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
    </div>
  );
};

export default OngoingRacesAllRaces;
