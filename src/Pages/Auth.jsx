import React from 'react'
import Form from '../Sections/Auth/Form'
import formImage from '../assets/images/finraceformimage.jpg'

const Auth = () => {
  return (
    <div className='w-screen h-screen  relative flex overflow-auto'>
      <div className='flex-1 flex justify-center items-start py-24 overflow-auto'>
        <Form />
      </div>
      <div className='flex-1 h-full'>
        <img className='w-full h-full object-cover' src={formImage} alt="Finraces" />
      </div>
    </div>
  )
}

export default Auth