import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Post from "../Components/Post";

import { BiMedal } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";

const Community = () => {
  const tabs = ["Recent", "Following", "Trending", "My posts"];  
  //grab userDetails for posting
  let userDetails=JSON.parse(atob(localStorage.getItem("fin_userDetails")))

  const [activeTab,setActiveTab]=useState("Recent");
  const [postContent,setPostContent]=useState("");
  const [bannerImg,setBannerImg]=useState("");
  const [newPost,setNewPost]=useState({
    id: 4,
    userName: userDetails?.userName,
    userImg: userDetails?.photo?.path,
    time: "Now",
    content: postContent,
    coverImg: bannerImg,
    likes: 0,
  })

  // Proper Post Data
  const [posts, setPosts] = useState([
    {
      id: 1,
      userName: "John Doe",
      userImg: "https://randomuser.me/api/portraits/men/1.jpg",
      time: "2h ago",
      content: "Exploring new AI advancements in tech!",
      coverImg: "https://cdn.pixabay.com/photo/2023/08/15/14/05/banner-8192025_1280.png",
      likes: 32,
    },
    {
      id: 2,
      userName: "Jane Smith",
      userImg: "https://randomuser.me/api/portraits/women/2.jpg",
      time: "5h ago",
      content: "Just hit a new milestone in my project!",
      coverImg: "https://img.freepik.com/free-vector/high-tech-futuristic-lines-technology-banner_1017-23966.jpg",
      likes: 20,
    },
    {
      id: 3,
      userName: "Alex Johnson",
      userImg: "https://randomuser.me/api/portraits/men/3.jpg",
      time: "1 day ago",
      content: "Blockchain is the future. What do you think?",
      coverImg: "https://img.freepik.com/free-vector/vector-blockchain-poster_1441-1999.jpg",
      likes: 15,
    },
  ]);

// State for Top Leaders
const [topLeaders, setTopLeaders] = useState([
  { id: 1, name: "John Doe", status: "Online", img: "https://randomuser.me/api/portraits/men/3.jpg" },
  { id: 2, name: "Jane Smith", status: "Offline", img: "https://randomuser.me/api/portraits/women/2.jpg" },
  { id: 3, name: "Alex Johnson", status: "Online", img: "https://randomuser.me/api/portraits/men/3.jpg" },
]);

// State for Top Stocks
const [topStocks, setTopStocks] = useState([
  { id: 1, name: "Tesla", desc: "Electric Vehicles", img: "https://media.designrush.com/inspiration_images/269907/conversions/3_Tesla_Logo_Design_f404d330ce81-mobile.jpg" },
  { id: 2, name: "Apple", desc: "Technology", img: "https://cdn-icons-png.freepik.com/256/2504/2504884.png?semt=ais_hybrid" },
  { id: 3, name: "Amazon", desc: "E-commerce", img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEX///8EBwf4mB0AAAD4lxgAAwP4kwD4kQCpqqr4lRDa2trR0dHGx8e0tbWdnp7h4eGLjIx/gID95tHBwcE7PT1eX1+TlJT827n6t2pFRkb+79381Kn7xo35ojpqa2sqLCz4nil0dXX8z5/6vXkcHh76sFj95MhVVlYUFRQjJSX5p0X5rE705FvFAAAIoklEQVR4nO2d6baiOhBGj0wRnHEAFRVR9Azv/34dBhWBVEACCb3y/ep7VwPZppIaqNBfX1JSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUkLJWg43x/t2df1WI11P2/t5MxnzHhYjLTcrNSs98+fBcWLxHl8zWfOfhGpQqgT23Nu5HJ1PZLiXIqs993Emh9vICqsJ/83tkPeAa2pTZfbe7fU04T3oGhpWn77sRN5HvAdeUaPVB3wJ44b32Ctp8SHfILLVLe/R02X91Fp/xWkU3VInn0/gA3HJmwHUtCmg6Iib5oARorjuf9NoCWYQeYOQNGEDiBHvvFHKNWJhoimimCHcNzNAQe10zQ4QIy544xQ1ZAmIgxvePEUxtNFI6pw3UF5ntoAD9Zs3UV4DOmGmUlMFUbDIZkEDxFw/8+lkOV5Opscq2aN65s30LsqQVXU1zf71yZ3KqK54sZQK3kh1dVUoUCxPFETBdtMfaLhq+b54pCAKtRAtGJBQYaIgCuX0p8BYdZVY74UNVajwewUMVZ0SLxvBhKcOCWgCNkZ1DVx3B6170Nn4qVqSB6qD+foYIhRpM90AUwj77Ss4ibOOxk8XeVMEtplYsJmKU64hE9LWEhjsUX6dLjUkhtLqEb5yAhIK9KZmkb7QrT1I0F+IRPg1XhzvmVfZzzHStkMLSqRELEdZk+livbq+UGmz0DvCp6zlZLNe0V8HznpLWFWSsP+ShP2XJOy/xv8p4Ww8nJ/XW1pLWP8IZ6PJJgVTSYFsbwmX0/P9WhGsd4Sj4bHG24q+EVrTe51J6xvhaHH6nK4HhHFvcLPWDJEJrXNjPKEJZ+dGxik+4ZzB9IlMOGYzf+ISNuie7QfhllVnm6CEVoWGjF4TjhlaqJCEdQD1KkG4aIRWJcAH2vfP6r5en8FuP9EIKwDGeKfFJFMo7lGOv6UCYrrVJlcF71GdpkrX17xY5O8P4YjmBwldQ/0hpDhClfSmtDeEUMdQDEgaa28IKX6NfJSpL4RAt8kAPgLTF0K4xRvqMezJO2B4FYI9Qz0hhNt+wI70nhDCU0huTfyidZuIQjhv0GDYD0KouZTWFAV0NQpECDpDSrM22AEvCiFoaDqlgxLu3BOEEPQVtLM9vciA4UFSjoXAa1gQQjD1Bbu8sXTwYtDRdCfwSAHlzASlWV+QT0iAQSnlFCHoSqkG0JVgZwETgoeJRDmOAOY/lFZ92Ejx1V1BgAJj5wH8qRJa+UqMVnYK4RW6llq+EuIsMIUQMjR4n6H+Pl0JXoeQoc3oVXIxuvUpVSiyodFOWA5E8ReUIg3R0MDDJM/LRdhrKOd5icFlpVdVQhx3BoNn8iTCzv51uQCxKe2DH+VZPuV3eV0tgNeHy8GD0s3GqjiDA1rM0InAc6DJIPMJRq3PZQlwpLvCxy232S1xWa8lRed/Lp/2cYQIUd0O47czs/H8VLdjg/9SpL7+TYYZg33UcMrd79NyoFT6J43Q6ZW8PzRYwUybibtTpPqLxoTcCzZgxYwBIP9j69RED5JOPVgiQt20Qcuerk7hzVgVIr+g9GKAgHM4AVOvYnw7onqcmQeMNhGg30iYj9RUa0wsjj/1A6SFrAv0wS/yhyNAwEcdpjyZIrSKcVKl2C0P8IxVSm1AiE00o7qfFdTfKhQlL4PF2ESzWtQyVDWX9xVsQP3h7ucLqpHY6sUPPueqIUJ9B+up0XfFaVTL9shs45EujJfI61xlGlX1XrrCXogieYm8RndKEhj9SxakssTDUHX+yQQka01M5OMkeA1sIOe0ECCWlyjRZDvIHRdJj1n80P5FmWn8DwmJ5iVKNZ4et5mPzqrX+3GzrLD9W9O5EO+bqsoajbFGjBzbzgm8i4t18QJnx+aeL9ke6zvWfH4QaoZhmKnwH32PLaSPDIfpDWtpf0CGqSlv0gxks3zGQdPQheUNa8jTjBxdIoOpXTkI39G/sbxl1Sf75XyKYrL9yQOMyGMaPaRpycJ76GmujAnxoyLD8LtejQdk/oauF+yd28227Zuz9/5QSsh697tEN9aQy/i2NJXsmE5LhF+uEd/XDFjfuP5IzHin2bO/cYyoIC47Tlb7eCBGC8NIETUUMg8paiklbGMQ7mORs97HqukxaV5kpdqhlWc8EBXT6Jpx5xrITEdhtuAsHro8EPE8Mo4MQe0uBsZKf9ZfraVlGMt7IiqG1hVjwod/1TD+z+TxrT1tj15RFF6PHTDuXNNMnodiB3GLfmTzr70H3gwzExyi35Z9x+0XPZ5nJptLvAxRm4/dHTKI2HccWkweA/9lMkZio18+/j9ae0YaK0RKltHQ3FbiVcdVMonFI2C0I2/INnUqkYfeUxrTUC6Mzcb2/Gzaq6EHU+QN257CryhtM98QFc1EfsAs67axdb5l9aby/AHjKewiOH631MRaDZ/FTN7w7OXSXuPw3LOjnbSleCavvKUmM2kof0EDD7JzQr9Yk8nmbNFOijpKU+2DUUDEw9EMpP0FH8zlLgj9YskJW6iWBXqFNl3IM8wSxthgkfF7qb4u7f0lVMroCkk3zivMbmw00e2vsBqzFosx3Uvg2GSztW97z/3TMFwZXWEC8fLHf6/b3C0gTeMDM6oimYp/CC9esN87sfb7IPDc34OflHkJxbSIL181sfE8d56cujBjApqvmMVgGhktucr4y9u5h3wO2bcdluyqzaWhssoep9I7jo5ZM+JQkH/JKyvnUMFW6/ApYvFFckLEihGnZOLxRbLdfLD1ibCTCTm+56LJUxpOpIm0LsoGTXRztY9XJA5qQ97V5kpyQq00/gKFjVMT2Trzci6lMTSZDvmXHuEl2gWuAodkCRyOdBR3L/jaI2qHU4ZDHFbnQrQ0ikMaDlfZ91V0Ltvx3DAJs1Ek7FN8P3rvuWfaayCGdrF4j0JKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkrqP9U/keqAfqWw/gAAAAAASUVORK5CYII=" },
]);

// console.log("ud",userDetails)

const sendPost = () => {
  const newPost = {
    id: posts.length + 1,
    userName: userDetails?.userName,
    userImg: userDetails?.photo?.path,
    time: "Now",
    content: postContent,
    coverImg: bannerImg,
    likes: 0,
  };
  setPosts([newPost, ...posts]);
  setPostContent("");
  setBannerImg("");
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imgUrl = URL.createObjectURL(file);
    setBannerImg(imgUrl);
  }
};

  return (
    <div className="w-full relative min-h-screen flex pb-8 pt-8 dark:bg-[#000924]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col w-[70rem] gap-4 bg-[#e5f4ff] dark:bg-[#000D38] py-6 md:px-10 mx-[1rem] md:mx-[7rem] flex-1 rounded-xl border dark:border-[#00387E] dark:text-white">
        
        {/* Title */}
        <h2 className="font-semibold text-[1.5rem] font-poppins">Community</h2>

        {/* Content Section */}
        <div className="flex items-start justify-center m-2 w-full gap-5">
          {/* Left Section - Post Creation + Posts */}
        <div className="flex items-start justify-center m-2 w-full gap-5">
          <div className="flex-1 flex flex-col gap-5 px-2">
            {/* Post Creation Box */}
            <div className="dark:bg-[#002763] rounded-xl flex flex-col gap-4 p-5 w-full">
              <div className="flex gap-4 p-5 w-full">
                {/* User Avatar */}
              <div className="rounded-full w-16 h-16 bg-gray-300 overflow-hidden">
                <img alt='userImg' src={userDetails?.photo?.path} className="object-cover w-full h-full"/>
              </div>

              {/* Input & Actions */}
              <div className="flex flex-col gap-3 flex-1">
                <input type="text" value={postContent} onChange={(e)=>{setPostContent(e.target.value)}} className="rounded-xl px-4 py-3 bg-[#001B51] text-white placeholder-gray-400 focus:outline-none" placeholder="Start a post..." />
                <div onClick={() => document.getElementById("bannerUpload").click()} className="flex items-center justify-evenly dark:text-white">
                  <button className="hover:text-gray-300 transition-all flex items-center gap-1"><input
                    type="file"
                    accept="image/*"
                    id="bannerUpload"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  {/* Medal icon triggers file input */}
                  <BiMedal
                    size={24}
                    
                  /> Media</button>
                  <button className="hover:text-gray-300 transition-all flex items-center gap-1"><CiImageOn size={24}/> Achievement</button>
                  <button className="hover:text-gray-300 transition-all flex items-center gap-1"><IoDocumentTextOutline size={24}/> Article</button>
                </div>
                  
              </div>
              <button 
                onClick={() => sendPost()} 
                disabled={!postContent?.trim()} 
                className={`dark:text-white p-2 rounded-full h-12 w-12 flex items-center justify-center transition-all 
                  ${postContent?.trim() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
              >
                <BsFillSendFill size={20} />
              </button>

              </div>

              {bannerImg && (
            <img src={bannerImg} alt="Banner Preview" className="w-full h-60 rounded-lg" />
          )}

            </div>

            {/* Sticky Navigation Tabs */}
<div className="sticky top-0 z-10 flex items-center justify-center gap-2 w-full p-3 rounded-xl dark:bg-[#002763] dark:text-white font-semibold">
  {tabs.map((tab, index) => (
    <span
      key={index}
      className={`cursor-pointer transition-all ${
        activeTab === tab ? "text-blue-400" : "text-gray-300"
      }`}
      onClick={() => setActiveTab(tab)}
    >
      {tab}
    </span>
  )).reduce((prev, curr) => prev === null ? [curr] : [...prev, <span key={`sep-${prev.length}`} className="text-gray-500"> | </span>, curr], null)}
</div>


            {/* Posts Section (Scrollable) */}
            <div className="max-h-[55rem] p-2 overflow-y-auto flex flex-col gap-5 notificationScrollbar">
              {posts.map((post) => (
                <Post key={post.id} postData={post} commentVisibility={false} />
              ))}
            </div>
          </div>
        </div>

          {/* Right Section - Top Leaders & Top Stocks */}
          <div className="w-96 flex flex-col items-center justify-center gap-5">
  
            {/* Top Leaders Section */}
            <div className="dark:bg-[#002763] p-4 rounded-xl w-full dark:text-white min-h-[25rem] max-h-[30rem] overflow-y-auto flex flex-col gap-4">
              
              {/* Section Title */}
              <h3 className="text-xl font-semibold text-slate-300">Top Leaders</h3>
              
              {/* Leaders List */}
              <div className="flex-1 flex flex-col gap-3">
                {topLeaders.map((leader) => (
                  <div key={leader.id} className="flex items-center justify-between p-3 border border-[#00387E] w-full rounded-xl h-20 bg-[#001B51]">
                    
                    {/* User Image */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-300">
                      <img src={leader.img} alt={leader.name} className="w-full h-full object-cover"/>
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col flex-1 ml-3">
                      <span className="text-lg font-semibold">{leader.name}</span>
                      <div className="flex gap-2 items-center">
                        <span className={`h-2 w-2 rounded-full ${leader.status === "Online" ? "bg-green-400" : "bg-red-400"}`}></span>
                        <span className={`text-sm ${leader.status === "Online" ? "text-green-400" : "text-red-400"}`}>{leader.status}</span>
                      </div> 
                    </div>

                    {/* Message Icon */}
                    <button className="p-2 rounded-full hover:bg-[#00387E] transition">
                      <FaRegCommentAlt size={22} className="dark:text-white"/>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Stocks Section */}
            <div className="dark:bg-[#002763] p-4 rounded-xl w-full dark:text-white min-h-[25rem] max-h-[30rem] overflow-y-auto flex flex-col gap-4">
              
              {/* Section Title */}
              <h3 className="text-xl font-semibold text-slate-300">Top Stocks</h3>
              
              {/* Stocks List */}
              <div className="flex-1 flex flex-col gap-3">
                {topStocks.map((stock) => (
                  <div key={stock.id} className="flex items-center justify-between p-3 border border-[#00387E] w-full rounded-xl h-20 bg-[#001B51]">
                    
                    {/* Stock Image */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-300">
                      <img src={stock.img} alt={stock.name} className="w-full h-full object-cover"/>
                    </div>

                    {/* Stock Info */}
                    <div className="flex flex-col flex-1 ml-3">
                      <span className="text-lg font-semibold">{stock.name}</span>
                      <span className="text-sm text-slate-400">{stock.desc}</span>
                    </div>

                    {/* Arrow Icon */}
                    <button className="p-2 rounded-full hover:bg-[#00387E] transition">
                      <MdKeyboardArrowRight size={32} className="dark:text-white"/>
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Community;



