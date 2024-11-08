import { RxCross1 } from "react-icons/rx"; 
import { IoIosAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import React, { useState, useEffect } from 'react'
import box from '../assets/images/ongoingRaces/focus_box.svg'
import info from '../assets/images/ongoingRaces/info_icon.svg'
import { Switch } from "@headlessui/react";
import Select from 'react-select'
import { createRaceAndJoinUser, getStocks } from "../Utils/api";
import { useNavigate } from "react-router-dom";

const CreateRace = ({
  setCreateRace = () => { },
}) => {

  const [closed, setClosed] = useState(false) // race type will be open initially
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

  // race data schema
  // const [raceData, setRaceData] = useState({
  //   "race": {
  //     "isSimulation": false,
  //     "end_date": "2024-11-07T02:04:00.570Z",
  //     "start_date": "2024-11-07T02:04:00.570Z",
  //     "name": "string",
  //     "stocks": [
  // "string"  this will be stock id
  //     ]
  //   },
  //   "racePredictions": [
  // {
  //   "prediction_price": 0,
  //   "prediction_rank": 0,
  //   "stock_id": "string"
  // }
  //   ]
  // })



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
    if(field === 'prediction_price') {
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
              <label className="mb-[10px]" htmlFor="race-date">Date</label>
              <input placeholder="Race Starting Date" value={raceDetails.start_date} onChange={e => handleRaceDetails('start_date', e.target.value)} className="px-[1.1rem] rounded-[4px] py-[15px] shadow-inner" type="date" id="race-date" />
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-[10px]" htmlFor="race-time">Time</label>
              {/* <input className="px-[1.1rem] rounded-[4px] py-[15px] shadow-inner" type="time" defaultValue={} id="race-time" /> */}
              <input
                placeholder="Race Starting time"
                value={raceDetails.start_time} onChange={e => handleRaceDetails('start_time', e.target.value)}
                id="race-time"
                className="px-[1.1rem] rounded-[4px] py-[15px] shadow-inner"
                type="time"
                step="1"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-[10px]" htmlFor="duration-input">Duration</label>
              <input
                value={raceDetails.duration} 
                onChange={e => handleRaceDetails('duration', e.target.value)}
                className="px-[1.1rem] rounded-[4px] py-[15px] shadow-inner"
                id="duration-input"
                type="time"
                // required
                // pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
                // defaultValue="00:00:00"
                title="Write a duration in the format hh:mm:ss"
              />
            </div>
          </div>

          <div className="w-full flex justify-start items-center gap-4 mb-[14px]">
            <p>Race Type</p>
            <div title="Anyone can join open race but only authorized members can join closed race." className='relative'>
              <img src={info} alt="info icon" />
            </div>
          </div>
          <Switch
            checked={closed}
            onChange={setClosed}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600 shadow-inner">

            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch>
          {closed ? <p>Closed Race</p> : <p>Open Race</p>}
          <hr className="my-[1.2rem] border-t border-solid border-black" />

          {/* stocks with prices and values  */}
          <div className="mb-[19px] flex w-full justify-between">
            <p className="mb-[19px] font-semibold">Add Stocks <span className="text-[#838386]">(upto 10)</span></p>
            <button title="Click to add more stocks entries" onClick={addStock} className="pl-[1.5rem] pr-[0.7rem] py-[.7rem] font-semibold flex gap-2 bg-[#e4eaf0] rounded-[8px] active:scale-95">Add Stocks <IoIosAdd size={24} /></button>
          </div>
          {
            racePredictions[0] ? racePredictions?.map((curr, index) => {
              return (
                <>
                  <div key={index + 1} className="w-full flex gap-[2.5rem] mb-[1.2rem] items-center">
                    <div className="flex flex-col w-[4rem]">
                      <label className="mb-[10px]" htmlFor="race_name">Rank</label>
                      <input value={curr.prediction_rank} onChange={(e) => handleRacePredictionsChange(index, 'prediction_rank', e.target.value)} className="px-[0.7rem] rounded-[4px] py-[15px] shadow-inner" type="number" id="race_name" />
                      {/* <p>1.</p> */}
                    </div>
                    <div className="flex flex-col flex-1">
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
                      <label className="mb-[10px]" htmlFor="race_name">Percentage / Value</label>
                      <input value={curr.prediction_price} onChange={(e) => handleRacePredictionsChange(index, 'prediction_price', e.target.value)} className="px-[1.1rem] rounded-[4px] py-[15px] shadow-inner" type="number" id="race_name" />
                    </div>

                    <button className="p-2 rounded-full bg-red-400 text-white relative top-4" onClick={() => {
                      removeStock(index)
                    }}>
                      <RxCross1 size={12}/>
                    </button>
                  </div>
                </>
              )
            }) : <div className="w-full text-center text-slate-500">Add some Stocks</div>
          }

        </div>
        <button onClick={() => {
          createRaceAndJoinUser(raceDetails, racePredictions, () => {
            setRaceDetails({
              "isSimulation": false,
              "end_date": "2024-11-07T02:04:00.570Z",
              "start_date": "2024-11-07T02:04:00.570Z",
              "name": ""
            })
            setRacePredicitons([])
          })
        }} className="px-[1.5rem] py-[.7rem] font-semibold flex gap-2 bg-[#e4eaf0] rounded-[8px] active:scale-95">
          Submit
        </button>
      </div>
    </div>
  )
}

export default CreateRace