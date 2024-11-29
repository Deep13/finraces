import React, { useEffect } from 'react'

const YourBetsCard = ({
    imageUrl,
    stockName = "Example Stock",
    yourRank = 0,
    participants
}) => {
    const findUserRank = () => {
        let userDetails = localStorage.getItem('userDetails')
        if (!userDetails) {
            userDetails = localStorage.getItem('guest_details')
            if (!userDetails) {
                throw new Error('There was nothing like userDetails here');
            }
        }
        // console.log(JSON.parse(atob(userDetails)))
        let userId = JSON.parse(atob(userDetails)).userId
        let rank = participants.find(curr => curr.user_id === userId).rank
        // console.log(rank)
        return rank > 0 ? rank : '-'
    }
    // useEffect(() => {
    //     // console.log();
    //     findUserRank()
    // }, [])
    return (
        <div className='p-4 dark:bg-[#002763] dark:border dark:border-[#00387E] rounded-[15px] flex justify-between'>
            <div className='flex gap-2'>
                <div className='rounded-full bg-white overflow-hidden'>
                    {!imageUrl && <div className='w-12 h-12 bg-gradient-to-l from-[#005BFF] to-[#5B89FF] dark:text-white font-bold grid place-items-center'>{stockName.substring(0, 2)}</div>}
                    {imageUrl && <img className='w-12 h-12 bg-white object-cover' src={imageUrl} alt="" />}
                </div>
                <div className='flex flex-col justify-center items-start'>
                    <p className='text-[0.8rem] font-semibold dark:text-white max-w-16 truncate line-clamp-2'>{stockName}</p>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <p className='text-xs font-semibold dark:text-white'>Your Rank</p>
                <p className='font-bold text-xl dark:text-white'>{findUserRank()}</p>
            </div>
        </div>
    )
}

export default YourBetsCard