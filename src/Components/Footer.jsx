import  { useContext } from 'react'

import { DarkModeContext } from '../Contexts/DarkModeProvider'
import { useNavigate } from 'react-router-dom'




const Footer = () => {
  const { setReport } = useContext(DarkModeContext)
  const navigate=useNavigate();
  return (
    <footer className="bg-[#e5f4ff] dark:bg-[#002763] dark:text-white py-4 px-6 text-center h-28">
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
    <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm">
        <div onClick={()=>{navigate('/terms')}} className="hover:underline cursor-pointer">Terms and Conditions</div>
        <div onClick={()=>{navigate('/policy')}} className="hover:underline cursor-pointer">Privacy Policy</div>
        <div onClick={()=>{navigate('/how_to_use_finraces')}} className="hover:underline cursor-pointer">How to use Finraces</div>
        <div onClick={()=>{setReport(true)}} className="hover:underline cursor-pointer">Report an Issue</div>
        
    </div>
</footer>

  )
}

export default Footer