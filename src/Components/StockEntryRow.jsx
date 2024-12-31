import { useState, useCallback, useEffect, useContext } from 'react'
// import Select from 'react-select'
// import AsyncSelect from 'react-select/async'
import { RxCross1 } from "react-icons/rx";
// import { searchStock } from '../Utils/api';
// import { debounce } from 'lodash';
import { DarkModeContext } from '../Contexts/DarkModeProvider';
import SelectSearch from './SelectSearch';
import { Switch } from '@headlessui/react'

const StockEntryRow = ({
  prediction_rank,
  prediction_price,
  handleRacePredictionsChange,
  index,
  transformedData,
  removeStock,
  percentageTrue,
  stockList

}) => {

  const [currentStockId, setCurrentStockId] = useState("")
  const [value, setValue] = useState('')
  const [selectedStockList, setStockList] = useState([])
  const { darkModeEnabled } = useContext(DarkModeContext)
  const [enabled, setEnabled] = useState(false)
  const [currentStock, setCurrentStock] = useState({})

  const findStockPrice = (id) => {
    return stockList.find(stock => stock.id === id);
  }



  useEffect(() => {
    console.log(value)
    console.log(selectedStockList)
  }, [value])

  useEffect(() => {
    handleRacePredictionsChange(index, 'current_price', currentStock?.price)
  }, [currentStock])


  return (
    <>
      <div className="w-full flex gap-[1.5rem] mb-[1.2rem] items-center">
        <div className="flex flex-col">
          <label className="mb-[15px] dark:text-white" htmlFor="race_name">Rank</label>
          {/* <input value={prediction_rank} onChange={(e) => handleRacePredictionsChange(index, 'prediction_rank', e.target.value)} className="px-[0.7rem] rounded-[4px] py-[8px] shadow-inner" type="number" id="race_name" /> */}
          <div className="rounded-[4px] py-[8px] w-full grid place-items-center dark:text-white font-semibold text-center">
            {prediction_rank}
          </div>
          {/* <p>1.</p> */}
        </div>
        <div className="flex flex-col w-[15rem]">
          <label className="mb-[10px] dark:text-white" htmlFor="race_name">Select Stock</label>
          {/* <input className="px-[1.1rem] rounded-[4px] py-[15px] shadow-inner" type="text" id="race_name" /> */}
          {/* <Select
            onChange={(arg) => {
              handleRacePredictionsChange(index, 'stock_id', arg.value) // value is stock_id
              setCurrentStockId(arg.value)
            }}
            classNames={{
              control: () => 'px-[1.1rem] bg-[#f5f5f5] dark:bg-[#010B2C] rounded-[4px] py-[3px] shadow-inner',
              menuList: () => `${darkModeEnabled && 'text-white'}`
            }}
            theme={(theme) => {
              if (darkModeEnabled) {
                return ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: '#5B89FF',
                    primary: '#005BFF',
                    neutral0: '#010B2C',
                    neutral80: '#ffffff',
                  },
                })
              } else {
                return ({
                  ...theme,
                  // colors: {
                  //   ...theme.colors,
                  //   primary25: '#5B89FF',
                  //   primary: '#005BFF',
                  //   neutral0: '#010B2C',
                  //   neutral80: '#ffffff',
                  // },
                })
              }
            }}
            options={transformedData}
            isSearchable
            isClearable /> */}
          <SelectSearch setCurrentStock={setCurrentStock} index={index} handlePredicitonChange={handleRacePredictionsChange} />
        </div>
        <div className="flex flex-col w-[7rem]">
          <label className="mb-[10px] dark:text-white" htmlFor="race_name">Current Price</label>
          <div className="px-[1.1rem] rounded-[4px] py-[8px] text-start dark:text-white font-poppins" type="number" id="race_name" >
            {/* {currentStockId ? findStockPrice(currentStockId)?.price : 0} */}
            {currentStock?.price ? currentStock?.price.toFixed(2) : 0}
          </div>
        </div>
        <div className="flex flex-col">
          <label className="mb-[15px] dark:text-white" htmlFor="race_name">Value Type %</label>
          {/* <input value={prediction_rank} onChange={(e) => handleRacePredictionsChange(index, 'prediction_rank', e.target.value)} className="px-[0.7rem] rounded-[4px] py-[8px] shadow-inner" type="number" id="race_name" /> */}
          <div className="rounded-[4px] py-[8px] w-full grid place-items-center dark:text-white font-semibold text-center">
            <Switch
              checked={enabled}
              onChange={() => {
                setEnabled(prev => !prev)
                handleRacePredictionsChange(index, 'value_type_percent', !enabled)
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
        {/* <p>1.</p> */}
        <div className="flex flex-col flex-1">
          <label className="mb-[10px] dark:text-white" htmlFor="race_name">{enabled ? 'Percentage (%)' : 'Target Price ($)'}</label>
          <input value={prediction_price} onChange={(e) => handleRacePredictionsChange(index, 'prediction_price', e.target.value)} className="px-[1.1rem] rounded-[4px] py-[8px] shadow-inner" type="number" id="race_name" />
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