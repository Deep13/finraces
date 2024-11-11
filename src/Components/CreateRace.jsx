import { IoIosAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import React, { useState, useEffect, useRef } from 'react'
import box from '../assets/images/ongoingRaces/focus_box.svg'
import info from '../assets/images/ongoingRaces/info_icon.svg'
import { Switch } from "@headlessui/react";
import Select from 'react-select'
import { createRaceAndJoinUser, getStocks } from "../Utils/api";
import { useNavigate } from "react-router-dom";
import StockEntryRow from "./StockEntryRow";
import SegmentedControl from '../Components/SegmentedControl'

const CreateRace = ({
  setCreateRace = () => { },
}) => {

  // const [closed, setClosed] = useState(false) // race type will be open initially
  const [OpenCloseRaceValue, setOpenCloseRaceValue] = useState("close")
  const [percentValue, setpercentValue] = useState('price')
  const [percentage, setPercentage] = useState(false)
  const [Inputs, setInputs] = useState([
    // {"id": 'somestockId', "value": 0, 'rank': 0}
  ])
  const [stockList, setStockList] = useState([])
  const [racePredictions, setRacePredicitons] = useState([
    {
      "prediction_price": 0,
      "prediction_rank": 1,
      "stock_id": ""
    }
  ])
  const [raceDetails, setRaceDetails] = useState({
    "isSimulation": false,
    "end_date": "2024-11-07T02:04:00.570Z",
    "start_date": "2024-11-07T02:04:00.570Z",
    "name": ""
  })
  const navigate = useNavigate()



  const transformedData = stockList.map(item => ({
    value: item.id,
    label: item.name
  }));

  const addStock = () => {
    let theseItems = [...racePredictions]

    // wall 
    if (theseItems.length >= 10) {
      alert('You can only add upto 10 stocks')
      return
    }

    theseItems.push({ "stock_id": '', "prediction_price": 0, 'prediction_rank': theseItems.length + 1 })
    setRacePredicitons(theseItems)
  }

  const removeStock = (index) => {
    let theseItems = [...racePredictions];

    // Check if index is valid
    if (index < 0 || index >= theseItems.length) {
      console.error('Invalid index');
      return;
    }

    // Remove the item at the specified index
    theseItems.splice(index, 1);

    // Update prediction ranks after removal
    theseItems = theseItems.map((item, i) => ({
      ...item,
      prediction_rank: i + 1 // Adjust ranks to be sequential
    }));

    setRacePredicitons(theseItems);
  };

  const handleRacePredictionsChange = (index, field, value) => {
    if (field === 'prediction_price') {
      setRacePredicitons(prevPredictions => {
        const updatedPredictions = [...prevPredictions]; // Copy the array
        updatedPredictions[index] = {
          ...updatedPredictions[index], // Copy the object
          [field]: parseFloat(value), // Update the specific field
        };
        return updatedPredictions;
      });
      return
    }
    if (field === 'prediction_rank') {
      setRacePredicitons(prevPredictions => {
        const updatedPredictions = [...prevPredictions]; // Copy the array
        updatedPredictions[index] = {
          ...updatedPredictions[index], // Copy the object
          [field]: parseInt(value), // Update the specific field
        };
        return updatedPredictions;
      });
      return
    }
    setRacePredicitons(prevPredictions => {
      const updatedPredictions = [...prevPredictions]; // Copy the array
      updatedPredictions[index] = {
        ...updatedPredictions[index], // Copy the object
        [field]: value, // Update the specific field
      };
      return updatedPredictions;
    });
  };

  const handleRaceDetails = (field, value) => {
    setRaceDetails(prev => ({
      ...prev,
      [field]: value
    }))
  }





  useEffect(() => {
    getStocks((res) => {
      setStockList(res.data)
    }, () => {
      navigate('/auth')
    })
  }, [])

  useEffect(() => {
    console.log(racePredictions);

  }, [racePredictions])

  useEffect(() => {
    console.log(raceDetails);

  }, [raceDetails])

  return (
    <div className='w-screen h-screen fixed top-0 left-0 z-[20] grid place-items-center backdrop-blur-lg bg-transparent py-[3%] overflow-auto'>
      <div className='rounded-[10px] shadow-xl bg-white px-[1.8rem] py-[3rem]'>
        {/* heading  */}
        <div className='flex justify-between items-center gap-[450px] mb-[1.8rem]'>
          <div className='flex gap-[0.76rem] justify-center items-center'>
            <img src={box} alt="box icon" />
            <div className='h-full'>
              <h3 className='text-[1.75rem] font-semibold'>Create Race</h3>
            </div>
            <div className='relative'>
              <img src={info} alt="info icon" />
            </div>
          </div>
          <button onClick={() => setCreateRace(false)}>
            <RxCross2 size={35} />
          </button>
        </div>

        {/* Race details section  */}
        <div className="">
          <h4 className="font-semibold text-[1.2rem] mb-[1.2rem]">
            Race Details
          </h4>
          {/* inputs  */}
          <div className="w-full flex gap-[2.5rem] mb-[1.2rem]">
            <div className="flex flex-col flex-1">
              <label className="mb-[10px]" htmlFor="race_name"> Race Name</label>
              <input placeholder="Enter the name for Race here" value={raceDetails.name} onChange={e => handleRaceDetails('name', e.target.value)} className="px-[1.1rem] rounded-[4px] py-[15px] shadow-inner" type="text" id="race_name" />
            </div>
          </div>

          <div className="w-full flex gap-[2.5rem] mb-[1.2rem]">
            <div className="flex flex-col flex-1">
              <label className="mb-[10px]" htmlFor="race-start-date">Start Date</label>
              <input id='race-start-date' placeholder="Race Starting Date" value={raceDetails.start_date} onChange={e => handleRaceDetails('start_date', e.target.value)} className="px-[1.1rem] rounded-[4px] py-[15px] shadow-inner" type="date" />
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-[10px]" htmlFor="race-start-time">Start Time</label>
              {/* <input className="px-[1.1rem] rounded-[4px] py-[15px] shadow-inner" type="time" defaultValue={} id="race-start-time" /> */}
              <input
                placeholder="Race Starting time"
                value={raceDetails.start_time} onChange={e => handleRaceDetails('start_time', e.target.value)}
                id="race-start-time"
                className="px-[1.1rem] rounded-[4px] py-[15px] shadow-inner"
                type="time"
                step="1"
              />
            </div>
          </div>

          <div className="w-full flex gap-[2.5rem] mb-[1.2rem]">
            <div className="flex flex-col flex-1">
              <label className="mb-[10px]" htmlFor="race-end-date">End Date</label>
              <input id='race-end-date' placeholder="Race Ending Date" value={raceDetails.end_date} onChange={e => handleRaceDetails('end_date', e.target.value)} className="px-[1.1rem] rounded-[4px] py-[15px] shadow-inner" type="date"/>
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-[10px]" htmlFor="race-end-time">End Time</label>
              {/* <input className="px-[1.1rem] rounded-[4px] py-[15px] shadow-inner" type="time" defaultValue={} id="race-end-time" /> */}
              <input
                placeholder="Race Starting time"
                value={raceDetails.end_time} onChange={e => handleRaceDetails('end_time', e.target.value)}
                id="race-end-time"
                className="px-[1.1rem] rounded-[4px] py-[15px] shadow-inner"
                type="time"
                step="1"
              />
            </div>
          </div>


          <div className="w-full flex flex-col gap-4 mb-[14px]">
            <div className="flex items-center gap-[10px]">
              <p>Race Type</p>
              <div title="Anyone can join open race but only authorized members can join closed race." className='relative'>
                <img src={info} alt="info icon" />
              </div>
            </div>
            
            <div className="">
            <SegmentedControl
              name="group-1"
              callback={(val) => setOpenCloseRaceValue(val)}
              controlRef={useRef()}
              segments={[
                {
                  label: "Close",
                  value: "close",
                  ref: useRef()
                },
                {
                  label: "Open",
                  value: "open",
                  ref: useRef()
                }
              ]}
              />
            </div>
          {/* segmented control  */}

          </div>
          {/* <Switch
            checked={closed}
            onChange={setClosed}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600 shadow-inner">

            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch>
          {closed ? <p>Closed Race</p> : <p>Open Race</p>} */}
          {/* <hr className="my-[1.2rem] border-t border-solid border-black" /> */}

          {/* stocks with prices and values  */}
          <p className="font-semibold mt-12 mb-4">Add Stocks <span className="text-[#838386]">(upto 10)</span></p>
          <div className="flex mb-4 w-full justify-between items-center">
              <div className="flex flex-col flex-1 gap-[10px] items-baseline">
                <label className="mb-[10px]" htmlFor="percentage_toogle">Value type </label>
                <SegmentedControl
                name="group-2"
                callback={(val) => setpercentValue(val)}
                controlRef={useRef()}
                segments={[
                  {
                    label: "Price",
                    value: "price",
                    ref: useRef()
                  },
                  {
                    label: "Percentage",
                    value: "percentage",
                    ref: useRef()
                  }
                ]}
                />
              </div>
            <button title="Click to add more stocks entries" onClick={addStock} className="pl-[1.5rem] pr-[0.7rem] py-[.7rem] font-semibold flex gap-2 bg-[#e4eaf0] rounded-[8px] active:scale-95">Add Stocks <IoIosAdd size={24} /></button>
          </div>


          {
            racePredictions[0] ? racePredictions?.map((curr, index) => {
              return (
                <StockEntryRow
                  key={index + 1}
                  prediction_price={curr.prediction_price}
                  prediction_rank={curr.prediction_rank}
                  removeStock={removeStock}
                  index={index}
                  stockList={stockList}
                  percentageTrue={percentValue}
                  transformedData={transformedData}
                  handleRacePredictionsChange={handleRacePredictionsChange}
                />
              )
            }) : <div className="w-full text-center text-slate-500">Add some Stocks</div>
          }

        </div>
        <button onClick={() => {
          createRaceAndJoinUser(raceDetails, racePredictions, (res) => {
            setRaceDetails({
              "isSimulation": false,
              "end_date": "2024-11-07T02:04:00.570Z",
              "start_date": "2024-11-07T02:04:00.570Z",
              "name": ""
            })
            setRacePredicitons([])
            setCreateRace(false)
            res.id && navigate(`/race/${res.id}`)
          })
        }} className="px-[1.5rem] py-[.7rem] font-semibold flex gap-2 bg-[#e4eaf0] rounded-[8px] active:scale-95">
          Submit
        </button>
      </div>
    </div>
  )
}

export default CreateRace