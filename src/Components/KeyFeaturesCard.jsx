import React from 'react'
import cardImage from '../assets/images/card_video_image.png'

const KeyFeaturesCard = () => {
    return (
        <div className='w-[233px] flex flex-col gap-[16px]'>
            <div className='w-full h-[167px]'>
                <img className='w-full h-full object-cover' src={cardImage} alt="card video iamge that you can click" />
            </div>
            <div className='w-full'>
                {/* text content */}
                <p className='text-[16px] font-bold mb-[8px]'>How does it work ?</p>
                <p className='text-[14px] pr-[25px] text-[#b1a7a7]'>Use a simplified login system to enjoy all  gaming experience.</p>
            </div>
        </div>
    )
}

export default KeyFeaturesCard