import { FiArrowUpRight } from "react-icons/fi";
import React, { useLayoutEffect, useState } from 'react'
import compass from '../assets/icons/sidebar/compass.svg'
import finance_idea from '../assets/icons/sidebar/finance_idea.svg'
import stats from '../assets/icons/sidebar/stats.svg'
import live_streaming from '../assets/icons/sidebar/live_streaming.svg'
import forward from '../assets/icons/sidebar/forward.svg'
import eth from '../assets/icons/sidebar/eth.svg'
import recent from '../assets/icons/sidebar/recent.svg'
import Person from '../assets/images/person2.png'
import golden_frame from '../assets/images/silver_frame.png'
import diamond from '../assets/images/diamondIcon.svg'
import growthIndicator from '../assets/images/growthIndicator.png'
import badges from '../assets/images/badges.png'
import coin from '../assets/images/coin2.png'
import { getUserDetails } from "../Utils/api";
import PicUploadPopUpd from "../Components/PicUploadPopUpd";
import { Oval } from "react-loader-spinner";


const Profile = () => {

  const [data, setData] = useState(null)
  const [uploadPopup, setUploadPopup] = useState(false)
  const [imageIsLoading, setImageIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("http://3.90.114.42:3020" + data?.photo?.path.substring(data.photo.path.indexOf('/api')))


  useLayoutEffect(() => {
    setImageIsLoading(true)
    getUserDetails((data) => {
      setData(data)
      setImageUrl("http://3.90.114.42:3020" + data?.photo?.path.substring(data.photo.path.indexOf('/api')))
      setTimeout(() => setImageIsLoading(false), 2500)
    })
  }, [])

  return (
    <>
      {
        uploadPopup &&
        <PicUploadPopUpd
          setImageUrl={setImageUrl}
          setImageIsLoading={setImageIsLoading}
          exit={setUploadPopup}
        />
      }
      <div className='w-full relative h-auto flex pb-8 pt-8'>
        {/* Ensure sidebar is inside a container with sufficient height */}
        <div className="w-[4rem] flex-shrink-0 relative left-4 z-[9]"> {/* Prevent sidebar from flexing */}
          <div className={`sticky top-24 left-6 transition-transform ease-out duration-300 flex flex-col gap-[0.7rem] z-[10]`}>
            <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
              <img src={compass} alt="discover" />
              Discover
            </button>
            <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
              <img src={stats} alt="stocks" />
              Stocks
            </button>
            <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
              <img src={eth} alt="crypto" />
              Crypto
            </button>
            <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
              <img src={live_streaming} alt="live races" />
              Live Races
            </button>
            <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
              <img src={recent} alt="upcoming races" />
              Upcoming Races
            </button>
            <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
              <img src={finance_idea} alt="my races" />
              My Races
            </button>
            <button className="w-[3.35rem] h-[4.1rem] rounded-[10px] bg-[#e5f4ff] gap-[5px] text-[0.6rem] font-bold flex flex-col justify-center items-center">
              <img src={forward} alt="my watchlist" />
              My Watchlist
            </button>
          </div>
        </div>

        <div className='flex-1 px-[2%] md:px-[6%] max-w-[1400px]'>
          <div className='w-full rounded-xl bg-slate-200 p-4 flex flex-col gap-4'>
            {/* profile picture and buttons  */}
            <div className='flex gap-4 flex-wrap'>
              <div className=' overflow-hidden'>
                <div className="relative w-[200px] overflow-hidden h-[15rem] rounded-lg group">
                  <div className="absolute bg-black bg-opacity-30 place-items-center hidden group-hover:grid top-0 left-0 w-full h-full transition-all ease-in-out duration-200">
                    <button
                      onClick={() => {
                        // upload or change profile pic
                        setUploadPopup(true)
                      }}
                      className=" rounded-full text-sm font-bold px-2 py-1 text-white border-2 border-white">
                      Edit Profile Pic
                    </button>
                  </div>
                  {imageIsLoading && <div className="absolute bg-black bg-opacity-30 place-items-center grid top-0 left-0 w-full h-full transition-all ease-in-out duration-200">
                    <Oval
                      visible={true}
                      height="35"
                      width="35"
                      color="#000"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>}
                  <img loading="lazy" className="w-full h-full object-cover" src={imageUrl} alt="" />
                  {/* <img className="z-[5]" src={golden_frame} alt="" /> */}
                </div>
              </div>
              <div className='flex-1 bg-white rounded-lg p-[1.5rem] flex flex-col gap-[0.75rem]'>
                <p className="font-semibold text-[2rem]">{data && data.firstName + " " + data.lastName}</p>
                <p className="font-semibold text-[1rem] -mt-4 text-slate-500">{data?.email}</p>
                <p className="font-semibold text-[1rem]">AKA Samuel <span className="ml-3">L.A, Calirfonia</span></p>
                <div className="self-start flex gap-4">
                  {/* XP card here  */}
                  <div className="py-[0.5rem] px-[0.8rem] bg-slate-200 rounded-xl flex gap-[7px]">
                    <div>
                      <img src={coin} alt="" />
                    </div>
                    <div className="font-semibold text-[0.9rem] flex flex-col">
                      <p className="font-semibold text-[0.9rem]">Community Ambassador</p>
                      <p className="font-semibold text-[0.9rem]">250 XP</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="rounded-full bg-green-700 w-2 h-2" />
                    <p className="font-bold text-[1rem] text-green-700">Currently Online</p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-3 justify-end'>
                <button className='w-[9rem] flex justify-center items-center py-[12.25px] bg-blue-600 text-white font-semibold rounded-[70px] text-[14px]' >Add Friend</button>
                <button className='w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px]' >Message</button>
              </div>
            </div>

            {/* bento layout for some stats  */}
            <div className='grid grid-cols-3 md:grid-cols-5 gap-4'>
              <div className='col-span-3 rounded-lg grid gap-4 grid-cols-2 grid-rows-2'>
                <div className="col-span-1 row-span-1 bg-white rounded-lg p-[1.5rem] flex gap-8">
                  <div className='h-full'>
                    <img src={diamond} alt="" />
                  </div>
                  <div className='flex flex-col gap-[8px]'>
                    <p className='text-[1rem]'>Total Points</p>
                    <p className='text-[1.5rem]'>15,000,000</p>
                    <div className='flex font-semibold gap-2 rounded-full border border-green-600 justify-start self-start items-center px-2 py-1'>
                      <FiArrowUpRight color="green" size={15} />
                      <p className="text-green-600">4.8%</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-1 row-span-1 bg-white rounded-lg p-[1.5rem] flex gap-8">
                  <div className='flex flex-col gap-[8px]'>
                    <p className='text-[1rem]'>Win Rate</p>
                    <p className='text-[1.5rem] font-bold'>7590</p>
                    <div className='flex font-semibold gap-2 rounded-full border border-green-600 justify-start self-start items-center px-2 py-1'>
                      <FiArrowUpRight color="green" size={15} />
                      <p className="text-green-600">1.8%</p>
                    </div>
                  </div>
                  <div className='h-full'>
                    <img src={diamond} alt="" />
                  </div>
                </div>

                <div className="col-span-2 row-span-1 rounded-lg flex justify-between gap-4 bg-white p-[1.5rem]">
                  <div className="flex-1 rounded-lg">
                    <p className="text-[1rem]">Race Participated</p>
                    <p className="text-[1.5rem] font-semibold">450</p>
                  </div>
                  <div className="flex-1 rounded-lg">
                    <p className="text-[1rem]">Best Stock</p>
                    <p className="text-[1.5rem] font-semibold">Apple</p>
                  </div>
                  <div className="flex-1 rounded-lg">
                    <p className="text-[1rem]">Best Prediction</p>
                    <p className="text-[1.5rem] font-semibold">Google</p>
                  </div>
                </div>
              </div>
              <div className='col-span-2 bg-white rounded-lg p-[1.5rem] flex justify-center items-center flex-col'>
                <p className="mb-[8px] text-[1rem] self-start">Achievements</p>
                <div>
                  <img src={badges} alt="" />
                </div>
              </div>
            </div>

            {/* table  */}


          </div>
        </div>
      </div>
    </>
  )
}

export default Profile