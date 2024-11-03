import React from 'react'
import mobile from '../../assets/images/mocupmobile.png'

const Heading = () => {
    return (
        <div className='w-full relative mb-[3.29rem]'>
            <h2 className='text-[2.14rem] text-center font-bold mb-[2.06rem]'>Heading</h2>
            <div className='w-full flex justify-center items-center flex-wrap-reverse'>
                <div className='w-[384px] h-full flex gap-[42px] flex-col'>
                    <p className='text-[22.33px] font-semibold'>Experience the cloud on you phone</p>
                    <p className='text-[15px] lead-[30px]'>Lorem ipsum dolor sit amet consectetur. Lectus lobortis bibendum erat purus ut pharetra in massa elementum. Sagittis tortor non vel etiam. Odio vel placerat egestas dolor sem. Et quam dignissim in accumsan tortor sit.</p>
                
                </div>
                <div>
                    <img src={mobile} alt="exaampler mobile image" />
                </div>
            </div>
        </div>
    )
}

export default Heading