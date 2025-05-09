import { useState, Fragment, useEffect } from "react";
import { getRacePredictionsTable } from "../Utils/api";

export default function RacePredictionsTable({ userId }) {
  const [expanded, setExpanded] = useState(null);
  const [races, setRaces] = useState([]);

  useEffect(() => {
    getRacePredictionsTable(
      userId,
      (data) => {
        setRaces(data);
        console.log(data);
      },
      (error) => {
        console.log("Error fetching races data for predictions table ", error);
      }
    );
  }, []);
  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <table className="w-full border-separate border-spacing-y-2 text-left font-poppins dark:text-white">
      <thead>
        <tr>
          <th className="py-4 text-[0.9rem] text-gray-400">Date</th>
          <th className="py-4 text-[0.9rem] text-gray-400">Race Status</th>
          <th className="py-4 text-[0.9rem] text-gray-400">Race Name</th>
        </tr>
      </thead>
      <tbody>
        {races?.data?.map((race) => (
          <Fragment key={race?.id}>
            <tr
              onClick={() => toggleExpand(race?.id)}
              className="cursor-pointer hover:shadow-md hover:shadow-white/10 rounded-xl transition duration-200"
            >
              <td className="py-3 px-4 rounded-l-xl">{race?.start_date}</td>
              <td className="py-3 px-4">{race?.status}</td>
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
                        <th className="p-2 text-left">Exact Value</th>
                        <th className="p-2 text-left">Accuracy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {race.predictions.map((p, i) => (
                        <tr
                          key={i}
                          className="text-sm border-t border-gray-600"
                        >
                          <td className="p-2">{p.stock}</td>
                          <td className="p-2">{p.prediction}</td>
                          <td className="p-2">{p.exact ?? "—"}</td>
                          <td className="p-2">{p.accuracy}</td>
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
  );
}
