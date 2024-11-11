import React, { useEffect, useState, useRef } from 'react'
import { IoIosAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import box from '../assets/images/ongoingRaces/focus_box.svg'
import info from '../assets/images/ongoingRaces/info_icon.svg'
import { Switch } from "@headlessui/react";
import Select from 'react-select'
import { fetchStocks, joinUserToRace } from "../Utils/api";
import { useNavigate } from "react-router-dom";
import StockEntryRow2 from "./StockEntryRow2";
import SegmentedControl from './SegmentedControl'

const JoinRace = ({
  closeForm = () => { },
  race_id = "fi9eofjisf309oj09rj4fm",
  raceName = 'Any Race',
}) => {

  // this is join race so here we will only get stocks and their curent values not the 
  // inputs will be only prediction price and rank rest are static.


  const [stockList, setStockList] = useState([])
  const [percentage, setPercentage] = useState('')
  const [racePredictions, setRacePredicitons] = useState([
    {
      "prediction_price": 0,
      "prediction_rank": 1,
      "stock_id": ""
    },
    {
      "prediction_price": 0,
      "prediction_rank": 1,
      "stock_id": ""
    },
    {
      "prediction_price": 0,
      "prediction_rank": 1,
      "stock_id": ""
    },
  ])
  const navigate = useNavigate()

  const handleRacePredictionsChange = (index, field, value) => {
    setStockList(prevPredictions => {
      const updatedPredictions = [...prevPredictions]; // Copy the array
      updatedPredictions[index] = {
        ...updatedPredictions[index], // Copy the object
        [field]: parseFloat(value), // Update the specific field
      };
      return updatedPredictions;
    });
  };


  useEffect(() => {
    // fetch the race details and stock here together with their current price 
    fetchStocks(race_id, (res) => {
      setStockList(res)
    })
  }, [])


  return (
    <div className='w-screen h-screen fixed top-0 left-0 z-[20] grid place-items-center backdrop-blur-lg bg-transparent py-[3%] overflow-auto'>
      <div className='rounded-[10px] shadow-xl bg-white px-[1.8rem] py-[3rem]'>

        {/* heading  */}
        <div className='flex items-center mb-[1.8rem] relative'>
          <div className='flex gap-[12px] items-center'>
            <img src={box} alt="box icon" />
            <div className='flex-1 flex gap-[8px]'>
              <h3 className='text-[1.75rem] font-semibold'>Join {raceName}</h3>
              <div className='relative'>
                <img src={info} alt="info icon" />
              </div>
            </div>
            <p className='text-sm font-semibold flex-1'>#{race_id}</p>
          </div>
          <button className='absolute right-0 top-0' onClick={() => {
            closeForm(false)
          }}>
            <RxCross2 size={35} />
          </button>
        </div>


        {/* Race details section  */}
        <div className="">

          {/* inputs  */}

          <div className="flex flex-col flex-1">
            <label className="mb-[10px]" htmlFor="percentage_toogle">Value type </label>
            <SegmentedControl
              name="group-1"
              callback={(val) => setPercentage(val)}
              controlRef={useRef()}
              segments={[
                {
                  label: "Percentage",
                  value: "percentage",
                  ref: useRef()
                },
                {
                  label: "Price",
                  value: "price",
                  ref: useRef()
                }
              ]}/>
          </div>

          <hr className="my-[1.2rem] border-t border-solid border-black" />

          {/* stocks with prices and values  */}
          {
            stockList[0] ? stockList?.map((curr, index) => {
              return (
                <StockEntryRow2
                  key={curr.id}
                  index={index}
                  stockName={curr.stock.name}
                  currentPrice={curr.stock.price}
                  percentageTrue={percentage}
                  prediction_price={curr.prediction_price} // these are generated from nothingness haha
                  prediction_rank={curr.prediction_rank} // these are generated from nothingness haha
                  handleRacePredictionsChange={handleRacePredictionsChange}
                />
              )
            }) : <div className="w-full text-center text-slate-500">Add some Stocks</div>
          }

        </div>
        <button onClick={() => {
          let racePredictions = stockList.map(curr => {
            return {
              stock_id: curr.stock.id,
              prediction_price: curr.prediction_price,
              prediction_rank: curr.prediction_rank
            }
          })
          // console.log(racePredictions)
          // console.log(race_id)
          joinUserToRace(race_id, racePredictions, () => {
            navigate(`/race/${race_id}`)
          })

        }} className="px-[1.5rem] py-[.7rem] font-semibold flex gap-2 bg-[#e4eaf0] rounded-[8px] active:scale-95">
          Submit
        </button>
      </div>
    </div>
  )
}

export default JoinRace