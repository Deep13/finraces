import React from 'react'

const KeyFeaturesCard = ({
    cardImage,
    description,
    title
}) => {
    return (
        <div className='flex flex-col gap-[16px]'>
            <div className='w-full rounded-[1rem] overflow-hidden h-[11rem]'>
                <img className='w-full h-full object-cover' src={cardImage} alt="card video iamge that you can click" />
            </div>
            <div className='w-full'>
                {/* text content */}
                <p className='text-[16px] font-bold mb-[8px] dark:text-white'>{title}</p>
                <p className='text-[14px] pr-[25px] text-[#b1a7a7] dark:text-white'>{description}</p>
            </div>
        </div>
    )
}

export default KeyFeaturesCard