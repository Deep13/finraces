import React, { useContext } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { DarkModeContext } from '../../Contexts/DarkModeProvider'
import FriendCard from '../../Components/FriendCard'

const AllFirends = () => {

  const { darkModeEnabled } = useContext(DarkModeContext)

  return (
    <div className='dark:text-white w-full h-full'>
      <div className='w-full flex justify-between items-center mb-3'>
        <p className='font-semibold text-[1.2rem]'>All Friends (56)</p>
        <div className='w-[30rem] bg-slate-200 dark:bg-[#000A2D] self-start rounded-full px-3 py-2 flex gap-3'>
          <AiOutlineSearch color={darkModeEnabled ? 'white' : 'black'} size={24} />
          <input autoFocus style={{ backgroundColor: 'transparent' }} placeholder="Search..." className="flex-1 p-0 focus:outline-none" type="text" />
        </div>
      </div>
      <div className='w-full flex justify-start items-center gap-[1.5rem] flex-wrap'>
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
      </div>
    </div>
  )
}

export default AllFirends