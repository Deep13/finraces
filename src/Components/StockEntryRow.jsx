import React, { useState } from 'react'
import Select from 'react-select'
import { Switch } from '@headlessui/react'
import { RxCross1 } from "react-icons/rx";

const StockEntryRow = ({
  prediction_rank,
  prediction_price,
  handleRacePredictionsChange,
  index,
  transformedData,
  removeStock,

}) => {

  const [closed, setClosed] = useState(false)

  return (
    <>
      <div className="w-full flex gap-[2.5rem] mb-[1.2rem] items-center">
        <div className="flex flex-col w-[4rem]">
          <label className="mb-[10px]" htmlFor="race_name">Rank</label>
          <input value={prediction_rank} onChange={(e) => handleRacePredictionsChange(index, 'prediction_rank', e.target.value)} className="px-[0.7rem] rounded-[4px] py-[15px] shadow-inner" type="number" id="race_name" />
          {/* <p>1.</p> */}
        </div>
        <div className="flex flex-col w-[15rem]">
          <label className="mb-[10px]" htmlFor="race_name">Select Stock</label>
          {/* <input className="px-[1.1rem] rounded-[4px] py-[15px] shadow-inner" type="text" id="race_name" /> */}
          <Select
            onChange={(arg) => handleRacePredictionsChange(index, 'stock_id', arg.value)}
            classNames={{
              control: () => 'px-[1.1rem] bg-[#f5f5f5] rounded-[4px] py-[8px] shadow-inner'
            }}
            options={transformedData} isSearchable isClearable />
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-[10px]" htmlFor="percentage_toogle">Value type</label>
          <Switch
            checked={closed}
            onChange={setClosed}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600 shadow-inner">
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch>
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-[10px]" htmlFor="race_name">{closed ? 'Percentage (%)' : 'Price value (₹)'}</label>
          <input value={prediction_price} onChange={(e) => handleRacePredictionsChange(index, 'prediction_price', e.target.value)} className="px-[1.1rem] rounded-[4px] py-[15px] shadow-inner" type="number" id="race_name" />
        </div>

        <button className="p-2 rounded-full bg-red-400 text-white relative top-4" onClick={() => {
          removeStock(index)
        }}>
          <RxCross1 size={12} />
        </button>
      </div>
    </>
  )
}

export default StockEntryRow