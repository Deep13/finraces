import React from 'react'
import Sidebar from '../Components/Sidebar'
import CreateBlog from '../Components/CreateBlog'

const WriteBlog = () => {
  return (
    <div className="w-full relative min-h-screen flex pb-8 pt-8 dark:bg-[#000924]">
        {/* Sidebar */}
        <Sidebar />
    
        {/* Main Content */}
        <CreateBlog/>
    </div>
  )
}

export default WriteBlog