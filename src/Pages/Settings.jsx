import { BiChevronRight } from "react-icons/bi";
import React, { useContext, useState } from 'react'
import { motion } from 'motion/react'
import Sidebar from '../Components/Sidebar'
import { DarkModeContext } from "../Contexts/DarkModeProvider";
import UserPreferences from "../Sections/Settings/UserPreferences";
import Security from "../Sections/Settings/Security";
import HelpAndSupport from "../Sections/Settings/HelpAndSupport";
import PrivacySettings from "../Sections/Settings/PrivacySettings";
import AccountManagement from "../Sections/Settings/AccountManagement";
import phone from '../assets/images/settings/phone.png'
import filters from '../assets/images/settings/filters.png'
import shield from '../assets/images/settings/shield.png'
import users from '../assets/images/settings/users.png'
import shield_off from '../assets/images/settings/shield_off.png'

const tabs = {
  "User Preferences": { title: "User Preferences", icon: filters },
  "Account Management": { title: "Account Management", icon: users },
  "Privacy Settings": { title: "Privacy Settings", icon: shield_off },
  // "Security": { title: "Security", icon: shield },
  "Help and Support": { title: "Help and Support", icon: phone },
};

const Settings = () => {

  const { darkModeEnabled } = useContext(DarkModeContext)
  const [activeTab, setActiveTab] = useState(tabs["User Preferences"].title)

  return (
    <motion.div
      initial={{
        y: 120,
        opacity: 0
      }}
      animate={{
        y: 0,
        opacity: 1
      }}
      transition={{
        duration: 0.4,
        ease: 'easeInOut'
      }}
      className='w-full relative h-auto flex py-8 dark:bg-[#000924] overflow-auto'>
      {/* Ensure sidebar is inside a container with sufficient height */}
      <Sidebar />

      <div className='flex-1 px-[2%] md:px-[6%] pt-[2.1rem]'>
        <div className='w-full dark:bg-[#000A2D] dark:border dark:border-[#00387E] rounded-[24px] h-full pb-6'>

          <div className='dark:text-white w-full h-full'>
            <div className='w-full flex flex-col gap-4 justify-start mb-4'>
              <p className='font-semibold text-[1.4rem] py-4 px-6 flex items-center gap-3'><span className="-scale-100">
                {/* <BiChevronRight color={darkModeEnabled ? 'white' : 'black'} size={24} /> */}
              </span> Settings</p>
            </div>
            {/* actual settings  */}
            <div className='w-full flex-1 flex justify-center items-center gap-[1.5rem] flex-wrap px-4'>
              {/* here will be all the juice of settings module */}
              <div className='w-full h-full flex gap-4'>
                {/* this is sidebar  */}
                <div className=" w-[14rem] flex flex-col gap-4 h-full">
                  {
                    Object.keys(tabs).map((curr, index) => {
                      return (
                        <button onClick={() => setActiveTab(tabs[curr].title)} key={curr} className={`w-full flex gap-2 items-center roudned-xl dark:text-white bg-white text-[0.9rem] ${activeTab === tabs[curr].title ? 'dark:bg-[#002763] border border-[#00387E]' : 'dark:bg-[#001B51]'} py-4 px-[1.2rem] rounded-[15px] text-start`}>
                          <img src={tabs[curr].icon} alt="curr" />
                          {tabs[curr].title}
                        </button>
                      )
                    })
                  }
                </div>

                {/* active tab  */}
                <div className="flex-1 bg-white rounded-xl dark:bg-[#001B51] border dark:border-[#00387E] dark:text-white py-4 px-6 h-full">
                  {activeTab === tabs["User Preferences"].title && <UserPreferences />}
                  {/* {activeTab === tabs["Security"].title && <Security />} */}
                  {activeTab === tabs["Help and Support"].title && <HelpAndSupport />}
                  {activeTab === tabs["Privacy Settings"].title && <PrivacySettings />}
                  {activeTab === tabs["Account Management"].title && <AccountManagement />}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  )
}

export default Settings