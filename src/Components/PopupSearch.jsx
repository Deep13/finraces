import { RxCross2 } from "react-icons/rx";
import { AiOutlineSearch } from "react-icons/ai";
import React, { useContext } from 'react'
import { DarkModeContext } from "../Contexts/DarkModeProvider";
import SearchRaceCard from "./SearchRaceCard";
import SearchUserCard from "./SearchUserCard";
import { motion } from "motion/react";

const PopupSearch = ({
    setPopupSearch
}) => {

    const { darkModeEnabled } = useContext(DarkModeContext)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className='fixed top-0 left-0 w-full h-screen backdrop-blur-md pt-24 pb-8 z-40 flex justify-center'>
            <div className='bg-transparent w-full rounded-xl'>
                {/* search bar  */}
                <div className="flex gap-4 justify-center self-start items-center">
                    <div className='w-[30rem] bg-white dark:bg-[#001B51] dark:border dark:border-white self-start rounded-full px-3 py-3 flex gap-3'>
                        <AiOutlineSearch color={darkModeEnabled ? 'white' : 'black'} size={24} />
                        <input autoFocus style={{ backgroundColor: 'transparent' }} placeholder="Search..." className="flex-1 p-0 focus:outline-none" type="text" />
                    </div>
                    <button onClick={() => setPopupSearch(false)} className='aspect-square dark:bg-[#001a50] h-[2.35rem] grid place-items-center rounded-full'>
                        <RxCross2 color={darkModeEnabled ? 'white' : 'black'} size={20} />
                    </button>
                </div>

                {/* search results for users  */}
                <div className="flex-1 pt-4 mb-4 flex flex-col gap-4 items-center">
                    <div className="max-w-[39rem] py-8 rounded-xl bg-[#001B51] p-4 flex justify flex-wrap gap-4">
                        <SearchUserCard />
                        <SearchUserCard />
                        <SearchUserCard />
                        <SearchUserCard />
                    </div>
                </div>

                {/* search results for races  */}
                <div className="flex-1 pt-4 mb-4 flex flex-col gap-4 items-center">
                    <div className="max-w-[39rem] py-8 rounded-xl bg-[#001B51] p-4 flex justify flex-wrap gap-4">
                        <SearchRaceCard />
                        <SearchRaceCard />
                        <SearchRaceCard />
                        <SearchRaceCard />
                    </div>
                </div>

            </div>
        </motion.div>
    )
}

export default PopupSearch