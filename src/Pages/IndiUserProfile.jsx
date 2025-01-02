import React, { useEffect, useLayoutEffect, useState } from 'react'
import coin from '../assets/images/coin2.png'
import Sidebar from '../Components/Sidebar'
import UserProfile from '../Sections/Profile/UserProfile';
import Person from '../assets/images/person2.png'
import { useLocation, useParams } from 'react-router-dom';
import { getUser, sendFriendRequest } from '../Utils/api';
import { checkFriendRequestStatus } from '../Utils/api';


const IndiUserProfile = () => {

    const [requestSent, setRequestSent] = useState(false)
    const [buttonsVisiblity, setButtonsVisiblity] = useState(true)
    const [requestStatus, setRequestStatus] = useState('')
    const thisLocation = useLocation()
    const { user_id } = useParams()
    const [details, setDetails] = useState({
        userName: 'Burt Macklin',
        email: 'person.trader@email.com',
        image: Person
    })
    const [userDetails, setUserDetails] = useState({})
    const [reqSent, setReqSent] = useState(false)

    const requestFriend = () => {
        user_id && sendFriendRequest(user_id, (data) => {
            // console.log("Request Sent", data)
            setRequestStatus(data.status)
        })
    }


    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        console.log(user_id)
        // if (Object.keys(thisLocation.state).length > 0) {
        //     // setDetails(thisLocation.state)
        // }
        getUser(user_id, (data) => {
            // console.log(data)
            setUserDetails(data)
        })
        checkFriendRequestStatus(user_id, (data) => {
            console.log("Request Status", data.status)
            setRequestSent(data.status === 'pending')
            setRequestStatus(data.status)
        }, () => {
            setButtonsVisiblity(false)
        })
    }, [])

    // useEffect(() => {
    //     console.log(details)
    // }, [details])

    return (
        <>
            <div className='w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]'>
                {/* Ensure sidebar is inside a container with sufficient height */}
                <Sidebar />

                <div className='flex-1 px-[2%] md:px-[6%] max-w-[1400px]'>
                    <div className='w-full rounded-xl bg-slate-200 p-4 flex flex-col gap-4 dark:bg-[#000D38]'>
                        {/* profile picture and buttons  */}
                        <div className='flex gap-4 flex-wrap'>
                            <div className=' overflow-hidden'>
                                <div className="relative w-[200px] overflow-hidden h-[15rem] rounded-lg group">
                                    {userDetails?.photo?.path && <img loading="lazy" className="w-full h-full object-cover" src={userDetails?.photo?.path} alt="" />}
                                </div>
                            </div>
                            <div className='flex-1 bg-white rounded-lg p-[1.5rem] flex flex-col gap-[0.75rem] dark:bg-[#001B51] dark:border dark:border-[#00387E]'>
                                {userDetails?.firstName && <p className="font-semibold text-[2rem] dark:text-white">{userDetails?.firstName + " " + userDetails?.lastName}</p>}
                                {userDetails?.email && <p className="font-semibold text-[1rem] -mt-4 text-slate-500 dark:text-white">{userDetails?.email}</p>}
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
                            <div className='flex flex-col gap-3 justify-end'>
                                {requestStatus && requestStatus !== 'accepted' && requestStatus !== 'pending' && <button onClick={() => {
                                    requestFriend()
                                    setRequestSent(true)
                                }} className={'w-[9rem] flex justify-center items-center py-[12.25px] bg-blue-600 text-white font-semibold rounded-[70px] text-[14px] dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF]'} >Add Friend</button>}
                                {requestStatus === 'accepted' && <button onClick={() => { }} className={'w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px] dark:border-[#00387E] dark:text-white'} >Request Accepted</button>}
                                {requestStatus === 'pending' && <button onClick={() => { }} className={'w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px] dark:border-[#00387E] dark:text-white'} >Request Sent</button>}
                                <button onClick={() => { }} className={'w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px] dark:border-[#00387E] dark:text-white'} >Message</button>
                            </div>
                        </div>
                        <UserProfile userId={user_id} />
                    </div>
                </div>
            </div >
        </>
    )
}

export default IndiUserProfile