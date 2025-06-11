import React from 'react'
import { useNavigate } from 'react-router-dom'

const Fallback = () => {
    const navigate = useNavigate()

    return (
        <div className='w-full h-[100vh] relative backdrop-blur-lg gird place-items-center z-[100]'>
            <div className='p-10 text-xl font font-semibold rounded-md bg-white shadow-lg mb-4'>
                Something went wrong! while loading this page
            </div>
            <button onClick={() => {
                navigate('/')
                location.reload()
            }} className='px-8 py-2 bg-blue-500 text-white rounded-lg hover:opacity-70'>
                Go to home page
            </button>
        </div>
    )
}

export default Fallback