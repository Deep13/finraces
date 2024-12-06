import React, { useContext } from 'react'
import { DarkModeContext } from '../../Contexts/DarkModeProvider'
import { AiOutlineSearch } from 'react-icons/ai'
import AddFriendCard from '../../Components/AddFriendCard'

const AddFriend = () => {

  const { darkModeEnabled } = useContext(DarkModeContext)

  return (
    <div className='dark:text-white w-full h-full'>
      <div className='w-full flex flex-col gap-4 justify-start mb-3'>
        <p className='font-semibold text-[1.2rem]'>Add A Friend</p>
        <div className='w-[30rem] bg-slate-200 dark:bg-[#000A2D] self-start rounded-full px-3 py-2 flex gap-3'>
          <AiOutlineSearch color={darkModeEnabled ? 'white' : 'black'} size={24} />
          <input autoFocus style={{ backgroundColor: 'transparent' }} placeholder="Search..." className="flex-1 p-0 focus:outline-none" type="text" />
        </div>
      </div>
      <div className='w-full flex justify-center items-center gap-[1.5rem] flex-wrap'>
        <AddFriendCard />
        <AddFriendCard />
        <AddFriendCard />
        <AddFriendCard />
        <AddFriendCard />
        <AddFriendCard />
      </div>
    </div>
  )
}

export default AddFriend