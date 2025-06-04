import React, { useEffect, useState, useRef, useContext } from "react";
// import { IoIosAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import box from "../assets/images/ongoingRaces/focus_box.svg";
import boxdark from "../assets/images/boxdark.svg";
import info from "../assets/images/ongoingRaces/info_icon.svg";
import { Switch } from "@headlessui/react";
import Select from "react-select";
import { fetchStocks, joinDemoRace, joinUserToRace } from "../Utils/api";
import { useNavigate } from "react-router-dom";
import StockEntryRow2 from "./StockEntryRow2";
import SegmentedControl from "./SegmentedControl";
import { DarkModeContext } from "../Contexts/DarkModeProvider";
import { useCommunity } from "../Contexts/CommunityProvider";

const JoinRace = ({
  closeForm = () => {},
  race_id = "fi9eofjisf309oj09rj4fm",
  raceName = "Any Race",
  setStatus,
  demo = false,
}) => {
  // this is join race so here we will only get stocks and their curent values not the
  // inputs will be only prediction price and rank rest are static.

  const [stockList, setStockList] = useState([]);
  // const [percentage, setPercentage] = useState('')
  //tesst only
  const { setTest } = useCommunity();
  const [racePredictions, setRacePredicitons] = useState([
    {
      prediction_price: 0,
      prediction_rank: 1,
      stock_id: "",
    },
  ]);
  const navigate = useNavigate();
  const { darkModeEnabled } = useContext(DarkModeContext);

  const handleRacePredictionsChange = (index, field, value) => {
    setStockList((prevStockList) => {
      const updatedStockList = [...prevStockList]; // Use stockList correctly
      updatedStockList[index] = {
        ...updatedStockList[index],
        [field]: field === "value_type_percent" ? value : parseFloat(value),
      };
      return updatedStockList;
    });
  };

  useEffect(() => {
    // fetch the race details and stock here together with their current price
    fetchStocks(race_id, (res) => {
      setStockList(res);
    });
  }, []);

  useEffect(() => {
    console.log("stock predictions in stockList", stockList);
  }, [stockList]);

  return (
    <div className="fixed inset-0 z-[50] overflow-y-auto bg-black/30 backdrop-blur-sm flex justify-center items-start py-10">
      <div className="rounded-[10px] shadow-xl bg-white px-[1.8rem] py-[3rem] dark:bg-[#002763]">
        {/* heading  */}
        <div className="flex items-center mb-[1.8rem] relative">
          <div className="flex gap-[12px] items-center">
            <img
              className="w-12 h-12"
              src={darkModeEnabled ? boxdark : box}
              alt="box icon"
            />
            <div className="flex-1 flex gap-[8px]">
              <h3 className="text-[1.75rem] font-semibold dark:text-white w-full max-w-[80%]">
                Join {raceName}
              </h3>
            </div>
          </div>
          <button
            className="absolute right-0 top-0"
            onClick={() => {
              closeForm(false);
              if (setStatus) {
                setStatus(false);
              }
            }}
          >
            <RxCross2 color={darkModeEnabled ? "white" : "black"} size={35} />
          </button>
        </div>

        {/* Race details section  */}
        <div className="">
          {/* inputs  */}

          <hr className="my-[1.2rem] border-t border-solid border-black" />

          {/* stocks with prices and values  */}
          {stockList[0] ? (
            stockList?.map((curr, index) => {
              return (
                <StockEntryRow2
                  key={curr.id}
                  index={index}
                  stockName={curr.stock.name}
                  currentPrice={curr.stock.price}
                  prediction_price={curr.prediction_price} // these are generated from nothingness haha
                  prediction_rank={curr.prediction_rank} // these are generated from nothingness haha
                  handleRacePredictionsChange={handleRacePredictionsChange}
                />
              );
            })
          ) : (
            <div className="w-full text-center text-slate-500">
              Add some Stocks
            </div>
          )}
        </div>
        <button
          onClick={() => {
            let racePredictions = stockList.map((curr) => {
              if (curr.value_type_percent) {
                return {
                  stock_id: curr.stock.id,
                  prediction_price: Number(
                    curr.prediction_price * (curr.stock.price / 100) +
                      curr.stock.price
                  ),
                  prediction_rank: curr.prediction_rank,
                };
              } else {
                return {
                  stock_id: curr.stock.id,
                  prediction_price: curr.prediction_price,
                  prediction_rank: curr.prediction_rank,
                };
              }
            });
            // console.log(racePredictions)
            // console.log(race_id)
            if (demo) {
              setTest(true);
              joinDemoRace(
                racePredictions,
                (data) => {
                  console.log("Joined Successfully ", data);
                  navigate(`/race/${race_id}`);
                },
                (error) => {
                  console.log("Failed to join the race ", error);
                }
              );
            } else {
              joinUserToRace(race_id, racePredictions, () => {
                navigate(`/race/${race_id}`);
              });
            }
          }}
          className="px-[1.5rem] py-[.7rem] font-semibold flex gap-2 bg-[#e4eaf0] rounded-[8px] active:scale-95 dark:text-white dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF]"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default JoinRace;
