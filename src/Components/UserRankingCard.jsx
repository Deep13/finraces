import React from 'react'
import rank from '../assets/images/rank_badge.svg'
import vector from '../assets/images/vector_badge.svg'
import person2 from '../assets/images/person2.png'
import { useNavigate } from 'react-router-dom'


const UserRankingCard = ({
    userName,
    pos,
    userRank,
    total,
    userPhoto,
    lastItem,
    id
}) => {
    const navigate = useNavigate()
    const userData = localStorage.getItem('userDetails')
    const selfId = userData && JSON.parse(atob(userData)).userId

    const userDetails = userData && JSON.parse(atob(userData))
    const gd = localStorage.getItem('guest_details')
    const guestDetails = gd && JSON.parse(atob(gd))
    let actualDetail = userDetails || guestDetails
    console.log(actualDetail)

    return (
        <div onClick={() => {
            if (userData && id === selfId) {
                !guestDetails && navigate('/profile')
                return
            }
            navigate(`/userprofile/${id}`)
        }} className={`rounded-[10px] cursor-pointer flex justify-between w-full items-center px-[10px] py-[7px] border shadow-md dark:border-[#00387E] dark:bg-[#002763]`}>
            <div className='flex gap-[15px] items-center'>
                <div className='w-[2.8rem] aspect-square'>
                    <img className='w-full h-full object-cover' src={userPhoto} alt="" />
                </div>
                <div className='flex flex-col items-center'>
                    <p className='text-[1rem] font-semibold dark:text-white hover:underline'>{actualDetail.userName === userName.split(" ")[0] ? 'You' : userName}</p>
                    {/* <div className='flex gap-[4px] items-baseline'>
                        <div>
                            <img src={vector} alt="" />
                        </div>
                        <p className='text-[0.75rem] dark:text-white'>{(pos + 1)}/{total}</p>
                    </div> */}
                </div>
            </div>
            <div className='flex items-center justify-between gap-[8px]'>
                {userRank !== '-' && <div>
                    {userRank <= 3 && <img src={rank} alt="" />}
                </div>}
                <p className='text-[1rem] font-medium dark:text-white'>{!(userRank === '-') ? `#${userRank}` : userRank}</p>
            </div>
        </div>
    )
}

export default UserRankingCard