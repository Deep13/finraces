import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'

const NavFootWrapper = () => {
  return (
    <div className='w-full relative'>
        <Navbar/>
            <Outlet/>
        <Footer/>
    </div>
  )
}

export default NavFootWrapper