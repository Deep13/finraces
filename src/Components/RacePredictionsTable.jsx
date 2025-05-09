import { useState, Fragment, useEffect } from "react";
import { getRacePredictionsTable } from "../Utils/api";
import { ColorRing } from "react-loader-spinner";

export default function RacePredictionsTable({ userId }) {
  const [expanded, setExpanded] = useState(null);
  const [races, setRaces] = useState([]);
  const [priceMap, setPriceMap] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRacePredictionsTable(
      userId,
      (data) => {
        setRaces(data);
        setLoading(false);

        const allStocks = data?.data?.flatMap((race) => race?.stocks ?? []);

        const idPriceMap = allStocks.reduce((acc, stock) => {
          if (stock?.id && stock?.price !== undefined) {
            acc[stock.id] = stock.price;
          }
          return acc;
        }, {});

        setPriceMap(idPriceMap);
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
        <table className="w-full table-fixed border-separate border-spacing-y-2 text-left font-poppins dark:text-white">
          <thead>
            <tr className="whitespace-nowrap">
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
                  className="cursor-pointer hover:shadow-md hover:shadow-white/10 rounded-xl transition duration-200 whitespace-nowrap"
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
                        <div className="text-white bg-opacity-25 text-center font-medium bg-white border-white border px-3 rounded-full font-poppins">
                          {capitalize(race?.status)}
                        </div>
                      )}
                      {race?.status === "running" && (
                        <div className="text-green-500 bg-opacity-25 text-center font-medium bg-green-500 border-green-500 border px-3 rounded-full font-poppins">
                          {capitalize(race?.status)}
                        </div>
                      )}
                      {race?.status === "finished" && (
                        <div className="text-red-300 bg-opacity-25 text-center font-medium bg-red-600 border-red-700 border px-3 rounded-full">
                          {capitalize(race?.status)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold rounded-r-xl text-wrap">
                    {race?.name}
                  </td>
                </tr>

                {expanded === race?.id && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 pt-2"
                      style={{ width: "100%" }}
                    >
                      <div className="overflow-x-auto">
                        <table className="w-full table-fixed whitespace-nowrap rounded-lg">
                          <thead>
                            <tr className="text-md text-gray-400">
                              <th className="p-2 mx-auto">Stock Name</th>
                              <th className="p-2 mx-auto">Prediction</th>
                              <th className="p-2 mx-auto">Accuracy</th>
                            </tr>
                          </thead>
                          <tbody>
                            {race?.participants
                              ?.find(
                                (participant) =>
                                  String(participant.id) === String(userId)
                              )
                              ?.stocks?.map((p, i) => (
                                <tr
                                  key={i}
                                  className="text-sm border-t border-gray-600"
                                >
                                  <td className="p-2 mx-auto left text-wrap">
                                    {p?.stock?.name}
                                  </td>
                                  <td className="p-2">
                                    ${p?.prediction_price}
                                  </td>
                                  <td className="p-2 mx-auto">
                                    {priceMap[p?.stock?.id] !== undefined
                                      ? `${(
                                          100 -
                                          Math.abs(
                                            ((priceMap[p.stock.id] -
                                              p.prediction_price) /
                                              priceMap[p.stock.id]) *
                                              100
                                          )
                                        ).toFixed(2)}%`
                                      : "N/A"}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-lg font-semibold dark:text-white">
          No data available. Start racing today.
        </div>
      )}
    </>
  );
}
