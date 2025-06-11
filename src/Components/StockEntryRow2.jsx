import React, { useState } from 'react'
import Select from 'react-select'
import { Switch } from '@headlessui/react'
import { RxCross1 } from "react-icons/rx";

const StockEntryRow2 = ({
  handleRacePredictionsChange,
  index,
  stockName,
  currentPrice,
  // percentageTrue,
  prediction_price,
  prediction_rank,
}) => {

  const [enabled, setEnabled] = useState(false)


  return (
    <>
      <div className="w-full flex gap-[2.5rem] mb-[1.2rem] items-center">
        <div className="flex flex-col w-[4rem]">
          <label className="mb-[10px] dark:text-white text-center" htmlFor="race_name">Rank</label>
          <input
            value={prediction_rank}
            min={1}
            onChange={(e) => handleRacePredictionsChange(index, 'prediction_rank', e.target.value)}
            className="px-[0.7rem] rounded-[4px] py-[8px] shadow-inner" type="number" id="race_name" />
          {/* <p>1.</p> */}
        </div>
        <div className="flex flex-col flex-1 dark:text-white">
          <label className="mb-[10px]" htmlFor="race_name">Stock Name</label>
          <div className="px-[1.1rem] rounded-[4px] py-[8px]" >{stockName}</div>
        </div>
        <div className="flex flex-col">
          <label className="mb-[10px] dark:text-white" htmlFor="race_name">Current Price</label>
          <div className="px-[1.1rem] rounded-[4px] py-[8px] dark:text-white" >{currentPrice}</div>
        </div>
        <div className="flex flex-col">
          <label className="mb-[15px] dark:text-white" htmlFor="race_name">Value Type %</label>
          {/* <input value={prediction_rank} onChange={(e) => handleRacePredictionsChange(index, 'prediction_rank', e.target.value)} className="px-[0.7rem] rounded-[4px] py-[8px] shadow-inner" type="number" id="race_name" /> */}
          <div className="rounded-[4px] py-[8px] w-full grid place-items-center dark:text-white font-semibold text-center">
            <Switch
              checked={enabled}
              onChange={() => {
                setEnabled(prev => {
                  handleRacePredictionsChange(index, 'value_type_percent', !prev)
                  return !prev
                })
              }}
              className="group relative data-[checked]:bg-green-600 flex h-4 w-10 cursor-pointer rounded-full dark:bg-[#000924] dark:data-[checked]:bg-green-600 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white border border-black dark:border-none top-1"
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block size-5 -translate-x-1 rounded-full ${enabled ? 'bg-white' : 'dark:bg-[#001A50] bg-slate-300'} ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5 relative -top-[0.4rem]`}
              />
            </Switch>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-[10px] dark:text-white" htmlFor="race_name">{enabled ? 'Percentage (%)' : 'Price value (₹)'}</label>
          <input
            value={prediction_price}
            min={0}
            onChange={(e) => handleRacePredictionsChange(index, 'prediction_price', e.target.value)}
            className="px-[1.1rem] rounded-[4px] py-[8px]" type="number" id="race_name" />
        </div>
      </div>
    </>
  )
}

export default StockEntryRow2