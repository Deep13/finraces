import React from 'react'
import mobile from '../../assets/images/mocupmobile.png'

const Heading = () => {
    return (
        <div className='w-full relative mb-[3.29rem]'>
            <h2 className='text-[2.14rem] text-center font-bold mb-[2.06rem]'>Heading</h2>
            <div className='w-full'>
                <div></div>
                <div>
                    <img src={mobile} alt="exaampler mobile image" />
                </div>
            </div>
        </div>
    )
}

export default Heading