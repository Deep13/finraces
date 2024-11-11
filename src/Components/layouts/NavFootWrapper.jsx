import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'
import { RefreshToken } from '../../Utils/api'

const NavFootWrapper = () => {

  useEffect(() => {
    // see if the token is valid now or not if not then request refresh token here
    RefreshToken(() => {
      console.log('refreshed successfully')
    }, () => {
      console.log('refresh token was invalid');
    })
  }, [])

  return (
    <div className='w-full relative'>
        <Navbar/>
            <Outlet/>
        <Footer/>
    </div>
  )
}

export default NavFootWrapper