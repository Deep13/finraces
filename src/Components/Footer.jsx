import React, { useContext } from 'react'
import shape from '../assets/images/Footer/shape.svg'
import shapedark from '../assets/images/shapedark.svg'
import fb from '../assets/images/fb.svg'
import fbdark from '../assets/images/fbdark.svg'
import g from '../assets/images/g.svg'
import gdark from '../assets/images/gdark.svg'
import Youtube from '../assets/images/Youtube.svg'
// import Youtubedark from '../assets/images/Youtubedark.svg'
import insta from '../assets/images/insta.svg'
import instadark from '../assets/images/instadark.svg'
import whatsapp from '../assets/images/whatsapp.svg'
import whatsappdark from '../assets/images/whatsappdark.svg'
import telegram from '../assets/images/telegram.svg'
import telegramdark from '../assets/images/telegramdark.svg'
import { DarkModeContext } from '../Contexts/DarkModeProvider'
import { useNavigate } from 'react-router-dom'




const Footer = () => {
  const { darkModeEnabled } = useContext(DarkModeContext)
  const navigate=useNavigate();
  return (
    <footer className="bg-[#e5f4ff] dark:bg-[#002763] dark:text-white py-4 px-6 text-center">
    <p className="font-bold text-lg mb-2">
        © Copyright 2025 FinRaces | All rights reserved
    </p>
    {/* <p className="text-sm opacity-75">95.86% Payout rate in 2023.</p> */}
    <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm">
        <div onClick={()=>{navigate('/')}} className="hover:underline cursor-pointer">Home</div>
        <div onClick={()=>{navigate('/allraces',{ state: 'Upcoming Races' })}} className="hover:underline cursor-pointer">Upcoming Races</div>
        <div onClick={()=>{navigate('/allraces',{ state: 'Ongoing Races' })}} className="hover:underline cursor-pointer">Ongoing Races</div>
        <div onClick={()=>{navigate('/allraces',{ state: 'Finished Races' })}} className="hover:underline cursor-pointer">Finished Races</div>
        <div onClick={()=>{navigate('/market')}} className="hover:underline cursor-pointer">Market Research</div>
        <div onClick={()=>{navigate('/stockComparison')}} className="hover:underline cursor-pointer">Stock Comparison</div>
        {/* <div onClick={()=>{navigate('/')}} className="hover:underline">Twitter</div>
        <div onClick={()=>{navigate('/')}} className="hover:underline">Instagram</div>
        <div onClick={()=>{navigate('/')}} className="hover:underline">Affiliate Program</div>
        <div onClick={()=>{navigate('/')}} className="hover:underline">Game Reviews</div> */}
        <div onClick={()=>{navigate('/auth')}} className="hover:underline cursor-pointer">Log In</div>
        {/* <a onClick={()=>{navigate('/')}} className="hover:underline">Consent Choices</div> */}
    </div>
</footer>

  )
}

export default Footer