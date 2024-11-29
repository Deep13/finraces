import { useState, useCallback, useEffect, useContext } from 'react'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import { RxCross1 } from "react-icons/rx";
import { searchStock } from '../Utils/api';
import { debounce } from 'lodash';
import { DarkModeContext } from '../Contexts/DarkModeProvider';

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

  const findStockPrice = (id) => {
    return stockList.find(stock => stock.id === id);
  }


  // const loadOptions = async (
  //   inputValue,
  //   callback
  // ) => {
  //   // Only proceed if inputValue has 3 or more characters
  //   if (inputValue.length >= 3) {
  //     callback([]);
  //     return;
  //   }

  //   try {
  //     const options = await searchStock(inputValue);
  //     // callback(options);
  //     setTimeout(() => {
  //       callback(options);
  //     }, 1500);
  //   } catch (error) {
  //     console.error('Error fetching stocks:', error);
  //     callback([]);
  //   }
  // };


  const _loadSuggestions = async (prefix) => {
    if (prefix.length < 2) {
      return [];
    }

    try {
      const data = await searchStock(prefix);
      // selectedStockList(data)
      if (Array.isArray(data)) {
        return data.map(stock => ({
          label: stock.name,
          value: stock.id,
        }));
      } else if (data && Array.isArray(data.results)) {
        // If the API nests the array under `results`
        return data.results.map(stock => ({
          label: stock.name,
          value: stock.id,
        }));
      }
      return [];
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      return [];
    }
  };


  const loadSuggestions = debounce(_loadSuggestions, 300);


  useEffect(() => {
    console.log(value)
    console.log(selectedStockList)
  }, [value])



  return (
    <>
      <div className="w-full flex gap-[1.5rem] mb-[1.2rem] items-center">
        <div className="flex flex-col">
          <label className="mb-[10px] dark:text-white" htmlFor="race_name">Rank</label>
          {/* <input value={prediction_rank} onChange={(e) => handleRacePredictionsChange(index, 'prediction_rank', e.target.value)} className="px-[0.7rem] rounded-[4px] py-[8px] shadow-inner" type="number" id="race_name" /> */}
          <div className="rounded-[4px] py-[8px] dark:text-white font-semibold text-center">
            {prediction_rank}
          </div>
          {/* <p>1.</p> */}
        </div>
        <div className="flex flex-col w-[15rem]">
          <label className="mb-[10px] dark:text-white" htmlFor="race_name">Select Stock</label>
          {/* <input className="px-[1.1rem] rounded-[4px] py-[15px] shadow-inner" type="text" id="race_name" /> */}
          <Select
            onChange={(arg) => {
              handleRacePredictionsChange(index, 'stock_id', arg.value)
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
            isClearable />
          {/* <AsyncSelect
            cacheOptions
            defaultOptions
            placeholder='Search for a stock'
            loadOptions={loadSuggestions}
            value={value}
            classNames={{
              control: () => 'px-[1.1rem] bg-[#f5f5f5] rounded-[4px] py-[3px] shadow-inner'
            }}
            onChange={e => {
              handleRacePredictionsChange(index, 'stock_id', e.value)
              setValue(e)
            }}
          /> */}
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-[10px] dark:text-white" htmlFor="race_name">Current Price</label>
          <div className="px-[1.1rem] rounded-[4px] py-[8px] text-start dark:text-white" type="number" id="race_name" >
            {currentStockId ? findStockPrice(currentStockId)?.price : 0}
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-[10px] dark:text-white" htmlFor="race_name">{percentageTrue === 'percentage' ? 'Percentage (%)' : 'Target Price ($)'}</label>
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