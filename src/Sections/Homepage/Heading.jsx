import React from 'react'
import mobile from '../../assets/images/mocupmobile.png'

const Heading = () => {
    return (
        <div className='w-full relative mb-[3.29rem]'>
            {/* <h2 className='text-[2.14rem] text-center font-bold mb-[2.06rem] dark:text-white'>Heading</h2> */}
            <div className='w-full flex justify-center items-center flex-wrap-reverse'>
                <div className='w-[384px] h-full flex gap-[42px] flex-col dark:text-white'>
                    <p className='text-[22.33px] font-semibold'>Rise as a Top Trader!</p>
                    <p className='text-[15px] lead-[30px]'>
                    Predict stock prices anytime, anywhere during market hours. Compete with peers, climb the rankings, and showcase your skills. Gain industry recognition with features like real-time insights, leaderboards, and personalized analytics designed to help you stand out in the trading community.
                    </p>

                </div>
                <div>
                    <img src={mobile} alt="exaampler mobile image" />
                </div>
            </div>
        </div>
    )
}

export default Heading