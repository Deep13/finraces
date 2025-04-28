import React, { useEffect, useLayoutEffect, useState } from 'react'
import coin from '../assets/images/coin2.png'
import { getFollowers, getFriends, getUserDetails } from "../Utils/api";
import PicUploadPopUpd from "../Components/PicUploadPopUpd";
import { Oval } from "react-loader-spinner";
import Sidebar from '../Components/Sidebar'
import UserProfile from '../Sections/Profile/UserProfile'
import Friends from '../Sections/Profile/Friends'
import EditProfile from '../Sections/Profile/EditProfile'
import { useNavigate } from 'react-router-dom';
import graphrate from '../../src/assets/images/graphrate.svg'
import { getRacesCountByRank } from '../Utils/api';
import avatarplaceholder from '../assets/images/avatarplaceholder.png'
import malePlaceholder from '../assets/images/manPlaceholder.jpg'
import femalePlaceholder from '../assets/images/womanPlaceholder.jpg'
import NoProfilePopup from '../Components/NoProfilePopup';
import friends from '../assets/icons/friends_Icon.png'
import followers from '../assets/icons/followers_Icon.png'

const superTabsStrings = {
  Profile: 'Profile',
  EditProfile: 'Edit Profile',
  Friends: 'Friends'
}

const Profile = () => {



  const [data, setData] = useState(null)
  const [uploadPopup, setUploadPopup] = useState(false)
  const [imageIsLoading, setImageIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(data?.photo?.path)
  const [superTabs, setSuperTabs] = useState(superTabsStrings.Profile)
  const [NoUserPopup, setNoUserPopup] = useState(false)
  const [friendsCount,setFriendsCount]=useState(0);
  const [followersCount,setFollowersCount]=useState(0);
  const navigate = useNavigate()


  useLayoutEffect(() => {
    setImageIsLoading(true)
    getUserDetails((data) => {
      setData(data)
      if (data.is_guest) {
        setNoProfilePopup(true)
      }
      setImageUrl(data?.photo?.path)
      // if specific to user then get all badges here
      setTimeout(() => setImageIsLoading(false), 4000)
    })

    getFriends((data)=>{
      setFriendsCount(data.total)
    },(error)=>{
      console.log(error)
    })
    getFollowers((data)=>{
      setFollowersCount(data.total)
    },(error)=>{
      console.log(error)
    })
    window.scrollTo(0, 0);
  }, [])


  return (
    <>
      {
        NoUserPopup && <NoProfilePopup setPopupVisible={setNoUserPopup} message={"You don't have an account"} />
      }
      {/* {
        uploadPopup &&
        <PicUploadPopUpd
          setImageUrl={setImageUrl}
          setImageIsLoading={setImageIsLoading}
          exit={setUploadPopup}
        />
      } */}
      <div className='w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]'>
        {/* Ensure sidebar is inside a container with sufficient height */}
        <Sidebar />

        <div className='flex-1 px-[2%] md:px-[6%]'>
          <div className='w-full rounded-xl bg-slate-200 p-4 flex flex-col gap-4 dark:bg-[#000D38]'>
            {/* profile picture and buttons  */}
            <div className='flex gap-4 flex-wrap'>
              <div className=' overflow-hidden'>
                <div className="relative overflow-hidden h-[14rem] w-[14rem] rounded-lg group aspect-square">
                  {/* <div className="absolute bg-black bg-opacity-30 place-items-center hidden group-hover:grid top-0 left-0 w-full h-full transition-all ease-in-out duration-200">
                    <button
                      onClick={() => {
                        // upload or change profile pic
                        setUploadPopup(true)
                      }}
                      className=" rounded-full text-sm font-bold px-2 py-1 text-white border-2 border-white">
                      Edit Profile Pic
                    </button>
                  </div> */}
                  {/* {imageIsLoading && <div className="absolute bg-black bg-opacity-30 place-items-center grid top-0 left-0 w-full h-full transition-all ease-in-out duration-200">
                    <Oval
                      visible={true}
                      height="35"
                      width="35"
                      color="#000"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>} */}
                  <img loading="lazy" className="w-full h-full object-cover" src={imageUrl || (data?.gender && data.gender=='female'?femalePlaceholder:malePlaceholder)} alt="" />
                  {/* <img className="z-[5]" src={golden_frame} alt="" /> */}
                </div>
              </div>
              <div className='flex-1 bg-white rounded-lg p-[1.5rem] flex justify-between dark:bg-[#001B51] dark:border dark:border-[#00387E]'>
                <div className='flex justify-between w-full'>
                  <div className="flex flex-col gap-[0.75rem]">
                    <p className="font-semibold text-[2rem] dark:text-white">{data && data.firstName + " " + data.lastName}</p>
                    <p className="font-semibold text-[1rem] -mt-4 text-slate-500 dark:text-white font-poppins">{data?.email}</p>
                    {/* <p className="font-semibold text-[1rem] dark:text-white">AKA Samuel <span className="ml-3">L.A, Calirfonia</span></p> */}
                    <div className="self-start flex gap-4">
                      {/* XP card here  */}
                      <div className="py-[0.5rem] px-[0.8rem] bg-slate-200 rounded-xl flex gap-[7px] dark:bg-[#002763] dark:text-white">
                        {/* <div>
                          <img src={coin} alt="" />
                        </div> */}
                        <div className="font-semibold text-[0.9rem] flex flex-col">
                          <p className="font-semibold text-[0.9rem]">Explorer</p>
                          {/* <p className="font-semibold text-[0.9rem]">250 XP</p> */}
                        </div>
                      </div>
                      {/* <div className="flex gap-2 items-center">
                        <div className="rounded-full bg-green-700 w-2 h-2 dark:bg-green-500" />
                        <p className="font-bold text-[1rem] text-green-700 dark:text-green-500">Currently Online</p>
                      </div> */}
                    </div>
                  </div>
                  <div className="flex gap-20 dark:text-white mt-2 mr-2">
                    {/* Followers */}
                    <div className="flex items-center gap-4">
                      <img src={followers} alt="Followers" className="w-20 h-20" />
                      <div className="flex flex-col gap-1 items-center">
                        <div className="text-xl font-semibold">Followers</div>
                        <div className="text-lg">{followersCount}</div>
                      </div>
                    </div>

                    {/* Friends */}
                    <div className="flex items-center gap-4">
                      <img src={friends} alt="Friends" className="w-20 h-20" />
                      <div className="flex flex-col gap-1 items-center">
                        <div className="text-xl font-semibold">Friends</div>
                        <div className="text-lg">{friendsCount}</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <button onClick={() => setSuperTabs(superTabsStrings.Profile)} className={superTabs === superTabsStrings.Profile ? 'w-[9rem] flex justify-center items-center py-[12.25px] bg-blue-600 text-white font-semibold rounded-[70px] text-[14px] dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF]' : 'w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px] dark:border-[#00387E] dark:text-white'} >Profile</button>
                <button onClick={() => setSuperTabs(superTabsStrings.Friends)} className={superTabs === superTabsStrings.Friends ? 'w-[9rem] flex justify-center items-center py-[12.25px] bg-blue-600 text-white font-semibold rounded-[70px] text-[14px] dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF]' : 'w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px] dark:border-[#00387E] dark:text-white'} >Friends</button>
                <button onClick={() => navigate('/settings')} className={superTabs === superTabsStrings.EditProfile ? 'w-[9rem] flex justify-center items-center py-[12.25px] bg-blue-600 text-white font-semibold rounded-[70px] text-[14px] dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF]' : 'w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px] dark:border-[#00387E] dark:text-white'}>Edit Profile</button>
                <button onClick={() => {
                  localStorage.removeItem('token')
                  localStorage.removeItem('refreshToken')
                  localStorage.removeItem('fin_userDetails')
                  navigate('/auth')
                }} className='w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px] dark:border-[#00387E] dark:text-white hover:bg-red-500 hover:text-white hover:border-red-500'>Log out</button>
              </div>
            </div>

            {/* bento layout for some stats  */}
            {
              superTabs === superTabsStrings.Profile && <UserProfile userId={data?.id} />
            }
            {
              superTabs === superTabsStrings.Friends && <Friends />
            }
            {
              superTabs === superTabsStrings.EditProfile && <EditProfile />
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default Profile