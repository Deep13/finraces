import React, { useState } from 'react'
import Select from 'react-select'
import { Switch } from '@headlessui/react'
import { RxCross1 } from "react-icons/rx";

const StockEntryRow2 = ({
  handleRacePredictionsChange,
  index,
  stockName,
  currentPrice,
  percentageTrue,
  prediction_price,
  prediction_rank,
}) => {


  return (
    <>
      <div className="w-full flex gap-[2.5rem] mb-[1.2rem] items-center">
        <div className="flex flex-col w-[4rem]">
          <label className="mb-[10px]" htmlFor="race_name">Rank</label>
          <input
            value={prediction_rank} 
            onChange={(e) => handleRacePredictionsChange(index, 'prediction_rank', e.target.value)} 
            className="px-[0.7rem] rounded-[4px] py-[8px] shadow-inner" type="number" id="race_name" />
          {/* <p>1.</p> */}
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-[10px]" htmlFor="race_name">Stock Name</label>
          <div className="px-[1.1rem] rounded-[4px] py-[8px]" >{stockName}</div>
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-[10px]" htmlFor="race_name">Current Price</label>
          <div className="px-[1.1rem] rounded-[4px] py-[8px] shadow-inner" >{currentPrice}</div>
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-[10px]" htmlFor="race_name">{percentageTrue ? 'Percentage (%)' : 'Price value (₹)'}</label>
          <input
            value={prediction_price} 
            onChange={(e) => handleRacePredictionsChange(index, 'prediction_price', e.target.value)} 
            className="px-[1.1rem] rounded-[4px] py-[8px]" type="number" id="race_name" />
        </div>
      </div>
    </>
  )
}

export default StockEntryRow2