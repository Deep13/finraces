import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

const AllBlogs = () => {
  const tabs = {
    'My Blogs': 'Ongoing Races',
    'Upcoming Races': 'Upcoming Races',
    'Finished Races': 'Finished Races',
};
  const thisLocation = useLocation()
  const [activeTab, setActiveTab] = useState(tabs[thisLocation?.state?.toString()]); // Corrected default tab
  return (
    <div>

    </div>
  )
}

export default AllBlogs