import React, { useCallback, useContext, useEffect, useState } from 'react'
import { DarkModeContext } from '../../Contexts/DarkModeProvider'
import { AiOutlineSearch } from 'react-icons/ai'
import AddFriendCard from '../../Components/AddFriendCard'
import { debounce } from 'lodash'
import { searchUsers } from '../../Utils/api'

const AddFriend = () => {

  const { darkModeEnabled } = useContext(DarkModeContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterdResults, setFilterdResults] = useState([])

  const updateFilteredResults = useCallback(
    debounce(async (query) => {
      if (query.length > 2) {
        try {
          const results = await searchUsers(query)
          setFilterdResults(results)
        } catch (error) {
          console.error("Error fetching stocks:", error);
          setFilterdResults([]); // Handle error case
        }
      } else {
        setFilterdResults([])
      }
    }, 300)
    , [])



  useEffect(() => {
    updateFilteredResults(searchQuery)

    return () => updateFilteredResults.cancel()
  }, [searchQuery, updateFilteredResults])

  useEffect(() => {
    console.log(filterdResults);

  }, [filterdResults])

  return (
    <div className='dark:text-white w-full h-full'>
      <div className='w-full flex flex-col gap-4 justify-start mb-3'>
        <p className='font-semibold text-[1.2rem]'>Add A Friend</p>
        <div className='w-[30rem] bg-slate-200 dark:bg-[#000A2D] self-start rounded-full px-3 py-2 flex gap-3'>
          <AiOutlineSearch color={darkModeEnabled ? 'white' : 'black'} size={24} />
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} autoFocus style={{ backgroundColor: 'transparent' }} placeholder="Search User..." className="flex-1 p-0 focus:outline-none" type="text" />
        </div>
      </div>
      <div className='w-full flex justify-start items-center gap-[1.5rem] flex-wrap'>
        {
          filterdResults?.data?.length > 0 &&
          filterdResults?.data?.map(curr => {
            return (
              <AddFriendCard
                key={curr.id}
                userName={curr?.firstName + " " + curr?.lastName}
                image={curr?.photo?.path}
                id={curr?.id}
              />
            )
          })
        }
        {/* <AddFriendCard />
        <AddFriendCard />
        <AddFriendCard />
        <AddFriendCard />
        <AddFriendCard /> */}
      </div>
    </div>
  )
}

export default AddFriend