import React from 'react'
import Form from '../Sections/Auth/Form'
import formImage from '../assets/images/finraceformimage.jpg'
import finrace_logo from '../assets/images/finraces_logo_auth.svg'
import pattern from '../assets/images/pattern.svg'

const Auth = () => {
  return (
    <div className='w-screen h-screen  relative flex overflow-auto'>
      <div className='flex-1 flex justify-center items-start py-24 overflow-auto'>
        <Form />
      </div>
      <div className='flex-1 h-full bg-[#171624] flex justify-center items-center relative overflow-hidden'>
        <img className='absolute -top-[130px] right-0' src={pattern} alt="" />
        <img className='absolute -bottom-[160px] -left-8' src={pattern} alt="" />
        <div className='flex flex-col gap-[42px]'>
          <img className='w-[281px]' src={finrace_logo} alt="" />
          <div className='flex flex-col gap-[9px]'>
            <h2 className='text-center text-[1.31rem] text-white'>Welcome to Finraces</h2>
            <p className='text-[1.31rem] text-[#94cee7]'>Sign in for better experience</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth