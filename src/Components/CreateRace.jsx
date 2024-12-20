import { BiError } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import React, { useState, useEffect, useRef, useContext } from 'react'
import box from '../assets/images/ongoingRaces/focus_box.svg'
import boxdark from '../assets/images/boxdark.svg'
import info from '../assets/images/ongoingRaces/info_icon.svg'
import { Switch } from "@headlessui/react";
import Select from 'react-select'
import { createRaceAndJoinUser, getStocks } from "../Utils/api";
import { useNavigate } from "react-router-dom";
import StockEntryRow from "./StockEntryRow";
import SegmentedControl from '../Components/SegmentedControl'
import { DarkModeContext } from "../Contexts/DarkModeProvider";

const CreateRace = ({
  setCreateRace = () => { },
}) => {


  const hasUniqueIds = (array) => {
    if (!Array.isArray(array)) {
      throw new Error("Input must be an array.");
    }

    const ids = array.map(item => item.stock_id);
    const uniqueIds = new Set(ids);

    return ids.length === uniqueIds.size;
  }


  const today = new Date().toISOString().split("T")[0];
  const generateRandomStockRaceName = () => {
    // Get user details from localStorage
    let encodedUserDetails = localStorage.getItem('userDetails');
    if (!encodedUserDetails) {
      // throw new Error("User details not found in localStorage");
      // probably be guest
      encodedUserDetails = localStorage.getItem('guest_details')
      if (!encodedUserDetails) {
        throw new Error("User details not found in localStorage");

      }
    }

    // Decode and parse user details
    const decodedUserDetails = JSON.parse(atob(encodedUserDetails));
    const userName = decodedUserDetails.userName;

    if (!userName) {
      throw new Error("Username not found in userDetails");
    }

    // Creative stock-related phrases
    const stockPhrases = [
      "Charge of the Bulls",
      "Bear's Retreat",
      "Portfolio Blitz",
      "Trader's Triumph",
      "Capital Crusade",
      "Equity Escapade",
      "Stock Surge Showdown",
      "Investor's Arena",
      "Exchange Frenzy",
      "Market Mayhem"
    ];

    // Generate a random phrase
    const randomPhrase = stockPhrases[Math.floor(Math.random() * stockPhrases.length)];
    let today = Date.now()
    // Generate the race name
    return `${userName}'s ${randomPhrase} ${today}`;
  };

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
    "end_date": "",
    "start_date": "",
    "start_time": "",
    "end_time": "",
    "name": generateRandomStockRaceName()
  })
  const [validation, setValidation] = useState({ // this will only contain bool value
    // true means ok you can proceed forward and false means you should correct the values
    start_date: true,
    end_date: true,
    name: true,
    start_time: true,
    end_time: true,
  })
  const navigate = useNavigate()
  const { darkModeEnabled } = useContext(DarkModeContext)



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
    console.log("Race Predictions: ==>>", racePredictions);

  }, [racePredictions])

  useEffect(() => {
    // console.log(raceDetails);
    let { start_date, end_date, name } = raceDetails
    if (!name) {
      setValidation(prev => ({ ...prev, name: false }))
    } else {
      setValidation(prev => ({ ...prev, name: true }))
    }
    if (start_date && end_date) {
      let start = new Date(start_date)
      let end = new Date(end_date)
      if (start > end) {
        // alert('Starting Date cannot be more than Ending Date')
        setValidation(prev => ({ ...prev, start_date: false, end_date: false }))
      } else {
        setValidation(prev => ({ ...prev, start_date: true, end_date: true }))
      }
    }

  }, [raceDetails])

  return (
    <div className='w-screen h-screen fixed top-0 left-0 z-50 grid place-items-center backdrop-blur-lg bg-transparent py-[3%] overflow-auto'>
      <div className='rounded-[10px] shadow-xl bg-white px-[1.8rem] py-[3rem] dark:bg-[#002763]'>
        {/* heading  */}
        <div className='flex justify-between items-center gap-[450px] mb-[1.8rem]'>
          <div className='flex gap-[0.76rem] justify-center items-center'>
            <img className="w-14 h-14" src={darkModeEnabled ? boxdark : box} alt="box icon" />
            <div className='h-full'>
              <h3 className='text-[1.75rem] font-semibold dark:text-white'>Create Race</h3>
            </div>
            <div className='relative'>
              <img src={info} alt="info icon" />
            </div>
          </div>
          <button onClick={() => setCreateRace(false)}>
            <RxCross2 color={darkModeEnabled ? 'white' : 'black'} size={35} />
          </button>
        </div>

        {/* Race details section  */}
        <div className="">
          <h4 className="font-semibold text-[1.2rem] mb-[1.2rem] dark:text-white">
            Race Details
          </h4>
          {/* inputs  */}
          <div className="w-full flex gap-[2.5rem] mb-[1.2rem]">
            <div className="flex flex-col flex-1">
              <label className="mb-[10px] dark:text-white" htmlFor="race_name"> Race Name</label>
              <input placeholder="Enter the name for Race here" value={raceDetails.name} onChange={e => handleRaceDetails('name', e.target.value)} className="px-[1.1rem] rounded-[4px] py-[8px] shadow-inner" type="text" id="race_name" />
              {!validation.name && <p className="text-xs text-red-400 font-semibold mt-1 flex gap-1"><span><BiError size={15} /></span>Race Name is Required</p>}
            </div>
          </div>

          <div className="w-full flex gap-[2.5rem] mb-[1.2rem]">
            <div className="flex flex-col flex-1">
              <label className="mb-[10px] dark:text-white" htmlFor="race-start-date">Start Date</label>
              <input
                id='race-start-date'
                placeholder="Race Starting Date"
                value={raceDetails.start_date}
                onChange={e => handleRaceDetails('start_date', e.target.value)}
                className="px-[1.1rem] rounded-[4px] py-[8px] shadow-inner" type="date"
                min={today}
              />
              {!validation.start_date && <p className="text-xs text-red-400 font-semibold mt-1 flex gap-1"><span><BiError size={15} /></span>Start Date should be less than or equal to End Date</p>}
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-[10px] dark:text-white" htmlFor="race-start-time">Start Time</label>
              {/* <input className="px-[1.1rem] rounded-[4px] py-[15px] shadow-inner" type="time" defaultValue={} id="race-start-time" /> */}
              <input
                placeholder="Race Starting time"
                value={raceDetails.start_time} onChange={e => handleRaceDetails('start_time', e.target.value)}
                id="race-start-time"
                className="px-[1.1rem] rounded-[4px] py-[8px] shadow-inner"
                type="time"
              // step="1"
              />
              {!validation.start_time && <p className="text-xs text-red-400 font-semibold mt-1 flex gap-1"><span><BiError size={15} /></span>Start time is Required</p>}
            </div>
          </div>

          <div className="w-full flex gap-[2.5rem] mb-[1.2rem]">
            <div className="flex flex-col flex-1">
              <label className="mb-[10px] dark:text-white" htmlFor="race-end-date">End Date</label>
              <input
                id='race-end-date'
                placeholder="Race Ending Date"
                value={raceDetails.end_date}
                onChange={e => handleRaceDetails('end_date', e.target.value)}
                className="px-[1.1rem] rounded-[4px] py-[8px] shadow-inner" type="date"
                min={today}
              />
              {!validation.end_date && <p className="text-xs text-red-400 font-semibold mt-1 flex gap-1"><span><BiError size={15} /></span>Start Date should be less than End Date</p>}
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-[10px] dark:text-white" htmlFor="race-end-time">End Time</label>
              {/* <input className="px-[1.1rem] rounded-[4px] py-[15px] shadow-inner" type="time" defaultValue={} id="race-end-time" /> */}
              <input
                placeholder="Race Starting time"
                value={raceDetails.end_time} onChange={e => handleRaceDetails('end_time', e.target.value)}
                id="race-end-time"
                className="px-[1.1rem] rounded-[4px] py-[8px] shadow-inner"
                type="time"
              // step="1"
              />
              {!validation.end_time && <p className="text-xs text-red-400 font-semibold mt-1 flex gap-1"><span><BiError size={15} /></span>End time is required</p>}

            </div>
          </div>


          <div className="w-full flex flex-col gap-4 mb-[14px]">
            <div className="flex items-center gap-[10px]">
              <p className="dark:text-white">Race Type</p>
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
          <p className="font-semibold mt-12 mb-4 dark:text-white">Add Stocks <span className="text-[#838386]">(upto 10)</span></p>
          <div className="flex mb-8 w-full justify-between items-end">
            <div className="flex flex-col flex-1 gap-[10px] items-baseline">
              {/* <label className="mb-[10px] dark:text-white" htmlFor="percentage_toogle">Value type </label> */}
              {/* <SegmentedControl
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
              /> */}
            </div>
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
            }) : <div className="w-full text-center text-slate-500 dark:text-white">Add some Stocks</div>
          }
          <div className="w-full flex justify-center items-center mt-4">
            <button title="Click to add more stocks entries" onClick={addStock} className="pl-[1.5rem] pr-[0.7rem] py-[8px] font-semibold flex gap-2 rounded-[8px] active:scale-95 border border-slate-500 dark:text-white">Add Stocks <IoIosAdd size={24} /></button>
          </div>

        </div>
        <div className="w-full flex justify-center items-center mt-4">
          <button onClick={() => {
            let { start_date, end_date, name, start_time, end_time } = raceDetails
            if (!(start_date && end_date && name && start_time, end_time)) {
              alert('fill all the fields')
              return
            }
            if (start_date && end_date) {
              let start = new Date(start_date)
              let end = new Date(end_date)
              if (start > end) {
                alert('Start Date must be less than or equal to End Date')
                return
              }
              if (start_date == end_date) {
                if (end_time < start_time) {
                  alert('The time is not correct for the race Ending in Same Day')
                  return
                }
              }

            }
            // now for the race predictions
            if (racePredictions.length === 0) {
              alert('Stocks Predicitions are required')
              return
            } else {
              racePredictions.forEach(element => {
                if (element.stock_id === '') {
                  alert('You should select the stock for an Entry')
                  return
                }
              })
            }

            if (!hasUniqueIds(racePredictions)) {
              alert('You can Enter a pertiction for stock only once')
              return
            }

            createRaceAndJoinUser(raceDetails, racePredictions, (res) => {
              setRaceDetails({
                "isSimulation": false,
                "end_date": "2024-11-07T02:04:00.570Z",
                "start_date": "2024-11-07T02:04:00.570Z",
                "name": ""
              }, (error) => {
                alert(error.message)
              })
              setRacePredicitons([])
              setCreateRace(false)
              res.id && navigate(`/race/${res.id}`)
            })
          }} className="px-[1.5rem] py-[.7rem] font-semibold flex gap-2 bg-[#e4eaf0] rounded-[8px] active:scale-95 dark:text-white dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF]">
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateRace