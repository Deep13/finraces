import React from 'react'
import UFO from '../assets/images/UFO1.png'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div className='w-full h-screen grid place-items-center'>
            <div className='text-center flex flex-col gap-4 items-center'>
                <img className='scale-75 w-32 h-32' src={UFO} alt="ufo" />
                <div>
                    <h1 className='text-4xl font-bold text-red-400'>Error 404 !</h1>
                    <p className='font-semibold mb-4'>The Page you are looking for doesn't exists</p>
                    <button onClick={() => navigate('/')} className='px-12 py-2 bg-blue-500 text-white rounded-lg hover:opacity-70'>
                        Go to home page
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage