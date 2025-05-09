import { useState, Fragment, useEffect } from "react";
import { getRacePredictionsTable } from "../Utils/api";
import { ColorRing } from "react-loader-spinner";

export default function RacePredictionsTable({ userId }) {
  const [expanded, setExpanded] = useState(null);
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRacePredictionsTable(
      userId,
      (data) => {
        setRaces(data);
        setLoading(false);
      },
      (error) => {
        console.log("Error fetching races data for predictions table ", error);
      }
    );
  }, []);

  function capitalize(s) {
    return String(s[0]).toUpperCase() + String(s).slice(1);
  }

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center items-center">
          <ColorRing
            visible={true}
            height="40"
            width="40"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : races.data?.length > 0 ? (
        <table className="w-full border-separate border-spacing-y-2 text-left font-poppins dark:text-white">
          <thead>
            <tr>
              <th className="py-4 px-4 text-[0.9rem] text-gray-400">
                Start Date
              </th>
              <th className="py-4 px-4 text-[0.9rem] text-gray-400">
                End Date
              </th>
              <th className="py-4 px-4 text-[0.9rem] text-gray-400">
                Race Status
              </th>
              <th className="py-4 px-4 text-[0.9rem] text-gray-400">
                Race Name
              </th>
            </tr>
          </thead>
          <tbody>
            {races?.data?.map((race) => (
              <Fragment key={race?.id}>
                <tr
                  onClick={() => toggleExpand(race?.id)}
                  className="cursor-pointer hover:shadow-md hover:shadow-white/10 rounded-xl transition duration-200"
                >
                  <td className="py-3 px-4 rounded-l-xl">
                    {new Date(race?.start_date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 rounded-l-xl">
                    {new Date(race?.end_date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="py-3 flex justify-start">
                      {race?.status === "scheduled" && (
                        <div className="text-white bg-opacity-25 text-center font-medium  bg-white border-white border px-3 rounded-full font-poppins">
                          {capitalize(race?.status)}
                        </div>
                      )}
                      {race?.status === "running" && (
                        <div className="text-green-500 bg-opacity-25 text-center font-medium  bg-green-500 border-green-500 border px-3 rounded-full font-poppins">
                          {capitalize(race?.status)}
                        </div>
                      )}
                      {race?.status === "finished" && (
                        <div className="text-red-300 bg-opacity-25 text-center font-medium  bg-red-600 border-red-700 border px-3 rounded-full">
                          {capitalize(race?.status)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold rounded-r-xl">
                    {race?.name}
                  </td>
                </tr>
                {expanded === race?.id && (
                  <tr>
                    <td colSpan={3} className="px-6 pt-2">
                      <table className="w-[95%] ml-2 mt-2rounded-lg ">
                        <thead>
                          <tr className=" text-md text-gray-400">
                            <th className="p-2 text-left">Stock Name</th>
                            <th className="p-2 text-left">Prediction</th>
                            <th className="p-2 text-left">Accuracy</th>
                          </tr>
                        </thead>
                        <tbody>
                          {race?.participants
                            ?.find((participant) => participant.id === userId)
                            ?.stocks?.map((p, i) => (
                              <tr
                                key={i}
                                className="text-sm border-t border-gray-600"
                              >
                                <td className="p-2">{p?.stock?.name}</td>
                                <td className="p-2">
                                  {p?.stock?.prediction_rank}
                                </td>
                                <td className="p-2">0</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-lg font-semibold dark:text-white">
          No date available. Strat racing today.
        </div>
      )}
    </>
  );
}
