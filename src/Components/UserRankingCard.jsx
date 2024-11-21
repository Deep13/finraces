import React from 'react'
import rank from '../assets/images/rank_badge.svg'
import vector from '../assets/images/vector_badge.svg'
import person2 from '../assets/images/person2.png'


const UserRankingCard = ({
    userName,
    userRank,
    lastItem
}) => {
    return (
        <div className={`rounded-[10px] flex justify-between w-full items-center px-[10px] py-[7px] border shadow-md`}>
            <div className='flex gap-[15px]'>
                <div className='w-[2.8rem] aspect-square'>
                    <img className='w-full h-full object-cover' src={person2} alt="" />
                </div>
                <div className='flex flex-col justify-between items-start'>
                    <p className='text-[1rem] font-semibold'>{userName}</p>
                    <div className='flex gap-[4px] items-baseline'>
                        <div>
                            <img src={vector} alt="" />
                        </div>
                        <p className='text-[0.75rem]'>8/10</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-between gap-[8px]'>
                {userRank !== '-' && <div>
                    <img src={rank} alt="" />
                </div>}
                <p className='text-[1rem] font-medium'>{!(userRank === '-') ? `#${userRank}` : userRank}</p>
            </div>
        </div>
    )
}

export default UserRankingCard