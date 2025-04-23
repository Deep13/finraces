import { useContext, useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Post from "../Components/Post";

import malePlaceholder from '../assets/images/manPlaceholder.jpg'
import femalePlaceholder from '../assets/images/womanPlaceholder.jpg'
import { BiMedal } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getRaceList, getTop4 } from "../Utils/api";
import { DarkModeContext } from "../Contexts/DarkModeProvider";
import JoinRace from "../Components/JoinRace";
import { FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { giphyKey } from "../Config";
import {uploadImage, postCommunityPost,getPosts} from "../Utils/api";
import { FaPlusCircle } from "react-icons/fa";

const Community = () => {
  const tabs = ["All", "Following", "My posts"];  
  const { setShowLoginForm } = useContext(DarkModeContext)
  const guestDetails = localStorage.getItem('guest_details')
  //grab userDetails for posting
  let userDetails=JSON.parse(atob(localStorage.getItem("fin_userDetails")))

  const [activeTab,setActiveTab]=useState("All");
  const [postContent,setPostContent]=useState("");
  const [bannerImg,setBannerImg]=useState("");

  const [joinRaceFormVisible,setJoinRaceFormVisible]=useState(false);
  const [selectedRaceId,setSelectedRaceId]=useState();
  const [selectedRaceName,setSelectedRaceName]=useState("");

  // Proper Post Data
  const [posts, setPosts] = useState([]);
  // {
  //   id: 1,
  //   userName: "John Doe",
  //   userImg: "https://randomuser.me/api/portraits/men/1.jpg",
  //   time: "2h ago",
  //   content: "Exploring new AI advancements in tech!",
  //   coverImg: "https://cdn.pixabay.com/photo/2023/08/15/14/05/banner-8192025_1280.png",
  //   likes: 32,
  // },
  // {
  //   id: 2,
  //   userName: "Jane Smith",
  //   userImg: "https://randomuser.me/api/portraits/women/2.jpg",
  //   time: "5h ago",
  //   content: "Just hit a new milestone in my project!",
  //   coverImg: "https://img.freepik.com/free-vector/high-tech-futuristic-lines-technology-banner_1017-23966.jpg",
  //   likes: 20,
  // },
  // {
  //   id: 3,
  //   userName: "Alex Johnson",
  //   userImg: "https://randomuser.me/api/portraits/men/3.jpg",
  //   time: "1 day ago",
  //   content: "Blockchain is the future. What do you think?",
  //   coverImg: "https://img.freepik.com/free-vector/vector-blockchain-poster_1441-1999.jpg",
  //   likes: 15,
  // },

// State for Experts to follow
const [expertsToFollow, setExpertsToFollow] = useState([]);

// State for Upcoming Races
const [upcomingRaces, setUpcomingRaces] = useState([]);
const [showGifPicker, setShowGifPicker] = useState(false);
const [gifSearch, setGifSearch] = useState("");
const [gifResults, setGifResults] = useState([]);
const [selectedMedia, setSelectedMedia] = useState([]);
const [selectedFile,setSelectedFile]=useState();

// console.log("ud",userDetails)

const sendPost = () => {
  if(selectedFile){
    uploadImage(selectedFile,(data)=>{
      postCommunityPost("title test",postContent,data.file.id,(data)=>{
        console.log("posted successfully",data)
      },(error)=>{
        console.log("error in posting",error)
      })
    },(error)=>{
      console.log("Error in uploading image to server",error)
    })
  }
  
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
  setSelectedFile(file)
  if (file) {
    const imgUrl = URL.createObjectURL(file);
    setBannerImg(imgUrl);
  }
};

const navigate=useNavigate();
const [showEmojiPicker, setShowEmojiPicker] = useState(false);

const handleEmojiClick = (emojiData) => {
  setPostContent(prev => prev + emojiData.emoji);
};

const fetchGifs = async (query) => {
  if (!query) return;
  try {
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&q=${query}&limit=20`
    );
    const data = await res.json();
    setGifResults(data.data);
  } catch (err) {
    console.error("Failed to fetch GIFs", err);
  }
};


//fetchData for experts to follow and upcoming races

useEffect(()=>{
  getTop4(1,2,
    (data)=>{
      setExpertsToFollow(data.data)
    },(error)=>{
      console.log("error",error)
    },10)

  getRaceList('scheduled',
    (data)=>{
      setUpcomingRaces(data)
    },
  (error)=>{
    console.log("Error",error)
  })

  getPosts("None",(data)=>{
    setPosts(data.data);
  });
},[])

useEffect(()=>{
  getPosts(activeTab,(data)=>{
    setPosts(data.data);
  });
},[activeTab])

  return (
    <div className="w-full relative min-h-screen flex pb-8 pt-8 dark:bg-[#000924]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col w-[70rem] gap-4 dark:bg-[#000D38] py-6 md:px-10 mx-[1rem] md:mx-[7rem] flex-1 rounded-xl border dark:border-[#00387E] dark:text-white">
        {
          joinRaceFormVisible && <JoinRace
          raceName={selectedRaceName}
          closeForm={setJoinRaceFormVisible}
          race_id={selectedRaceId} />
      }
        {/* Title */}
        <h2 className="font-semibold text-[1.5rem] font-poppins">Community</h2>

        {/* Content Section */}
        <div className="flex items-start justify-center m-2 w-full gap-5">
          {/* Left Section - Post Creation + Posts */}
        <div className="flex items-start justify-center m-2 w-full gap-5">
          <div className="flex-1 flex flex-col gap-5 px-2">
            {/* Post Creation Box */}
            <div className="dark:bg-[#002763] border dark:border-0 rounded-xl flex flex-col gap-4 p-5 w-full">
              <div className="flex gap-4 p-5 w-full">
                {/* User Avatar */}
              <div className="rounded-full w-16 h-16 bg-gray-300 overflow-hidden">
              <img
                alt="userImg"
                src={userDetails?.photo?.path || (userDetails?.gender && userDetails?.gender=='female'?femalePlaceholder:malePlaceholder)}
                className="object-cover w-full h-full"
              />

              </div>

              {/* Input & Actions */}
              <div className="flex flex-col gap-3 flex-1 relative">
  {/* Input Box */}
  <input 
    type="text" 
    value={postContent} 
    onChange={(e) => setPostContent(e.target.value)} 
    className="rounded-xl px-4 py-3 bg-slate-200 dark:bg-[#001B51] text-white placeholder-gray-400 focus:outline-none" 
    placeholder="Start a post..." 
  />

  {/* Actions (Media, Emoji, etc.) */}
  <div className="flex items-center justify-evenly dark:text-white">
    <button
      className="hover:text-gray-300 transition-all flex items-center gap-1"
      onClick={() => document.getElementById("bannerUpload").click()}
    >
      <input
        type="file"
        accept="image/*"
        id="bannerUpload"
        className="hidden"
        onChange={handleImageUpload}
      />
      <CiImageOn size={24} /> Image
    </button>
    
    <button onClick={()=>{setShowGifPicker(true)}} className="hover:text-gray-300 transition-all flex items-center gap-1">
      <CiImageOn size={24} /> GIF
    </button>

    {/* <button className="hover:text-gray-300 transition-all flex items-center gap-1">
      <IoDocumentTextOutline size={24} /> Article
    </button> */}

    {/* Emoji Toggle Button */}
    <button
      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      className="hover:text-gray-300 transition-all flex items-center gap-1"
    >
      <FaSmile size={22} /> Emoji
    </button>
  </div>

  {/* Emoji Picker */}
  {showEmojiPicker && (
    <div className="absolute top-[6rem] left-0 z-50">
      <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
    </div>
  )}

{showGifPicker && (
  <div className="absolute top-[12rem] left-0 z-50 w-96 bg-white dark:bg-[#001B51] p-3 rounded-xl shadow-xl">
    <input 
      type="text" 
      value={gifSearch} 
      onChange={(e) => {
        setGifSearch(e.target.value); 
        fetchGifs(e.target.value);
      }} 
      placeholder="Search GIFs..." 
      className="w-full mb-3 p-2 rounded-md dark:bg-[#002763] dark:text-white"
    />
    <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
      {gifResults?.map(gif => (
        <img 
          key={gif.id} 
          src={gif.images.fixed_height_small.url} 
          alt={gif.title}
          className="cursor-pointer rounded-md hover:scale-105 transition-all"
          onClick={() => {
            setBannerImg(gif.images.fixed_height.url); // Set as post media
            setShowGifPicker(false);
          }}
        />
      ))}
    </div>
  </div>
)}

  
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
<div className="sticky top-0 z-10 flex items-center justify-center gap-2 w-full p-3 rounded-xl border dark:border-0 dark:bg-[#002763] dark:text-white font-semibold">
  {tabs.map((tab, index) => (
    <span
      key={index}
      className={`cursor-pointer transition-all ${
        activeTab === tab ? "text-blue-400" : "dark:text-gray-300"
      }`}
      onClick={() => setActiveTab(tab)}
    >
      {tab}
    </span>
  )).reduce((prev, curr) => prev === null ? [curr] : [...prev, <span key={`sep-${prev.length}`} className="text-gray-500"> | </span>, curr], null)}
</div>


            {/* Posts Section (Scrollable) */}
            <div className="max-h-[55rem] p-2 overflow-y-auto flex flex-col gap-5 notificationScrollbar">
              {posts?.map((post) => (
                <Post key={post.id} postData={post} commentVisibility={false} />
              ))}
            </div>
          </div>
        </div>

          {/* Right Section - Top Leaders & Top Stocks */}
          <div className="w-96 flex flex-col items-center justify-center gap-5">
  
            {/* Top Leaders Section */}
            <div className="dark:bg-[#002763] p-4 rounded-xl w-full dark:text-white overflow-y-auto flex flex-col gap-4">
              
              {/* Section Title */}
              <h3 className="text-xl font-semibold dark:text-slate-300">Experts</h3>
              
              {/* Leaders List */}
              <div className="flex-1 flex flex-col gap-1">
                {expertsToFollow.map((leader) => (
                  <div key={leader?.user?.id} className="flex items-center justify-between p-3 border dark:border-[#00387E] w-full rounded-xl h-20 bg-[#e5f4ff] dark:bg-[#001B51]">
                    
                    {/* User Image */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-300">
                      <img src={leader?.user?.photo?.path} alt={leader?.user?.firstName} className="w-full h-full object-cover"/>
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col flex-1 ml-3">
                      <span className="text-md font-semibold">{leader?.user?.firstName}  {leader?.user?.lastName}</span>
                      {/* <div className="flex gap-2 items-center">
                        <span className={`h-2 w-2 rounded-full ${leader.status === "Online" ? "bg-green-400" : "bg-red-400"}`}></span>
                        <span className={`text-sm ${leader.status === "Online" ? "text-green-400" : "text-red-400"}`}>{leader.status}</span>
                      </div>  */}
                    </div>

                    {/* Fllow Button */}
                    <button className="p-2 ml-3 border-2 border-[#00387E]  rounded-xl dark:hover:bg-[#00387E] transition">
                    <FaPlusCircle />
                    </button>
                  </div>
                ))}
              </div>

              <div onClick={()=>{navigate('/leaderboard')}} className="w-full mx-auto dark:text-slate-300 text-center text-lg font-semibold cursor-pointer">Show More</div>
            </div>

            {/* Top Stocks Section */}
            <div className="dark:bg-[#002763] p-3 rounded-xl w-full dark:text-white overflow-y-auto flex flex-col gap-4">
              
              {/* Section Title */}
              <h3 className="text-xl font-semibold dark:text-slate-300">Upcoming Races</h3>
              
              {/* Stocks List */}
              <div className="flex-1 flex flex-col gap-1">
                {upcomingRaces.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                    No upcoming races right now.
                  </div>
                ) : (
                  upcomingRaces.slice(0, 5).map((stock) => (
                    <div
                      key={stock.id}
                      className="flex items-center justify-between p-2 border dark:border-[#00387E] w-full rounded-2xl bg-[#e5f4ff] dark:bg-[#001B51] shadow-md hover:shadow-lg transition"
                    >
                      {/* Info Section */}
                      <div className="flex flex-col flex-1 overflow-hidden">
                        <span className="text-lg font-semibold dark:text-white line-clamp-2">
                          {stock.name}
                        </span>
                        <span className="text-sm text-gray-400 font-semibold">
                          Starts:{" "}
                          {new Intl.DateTimeFormat("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          }).format(new Date(stock.start_date))}
                        </span>
                        <span className="text-sm text-gray-400 font-semibold">
                          Participants: {stock.participants.length}
                        </span>
                      </div>

                      {/* Join Button */}
                      <button
                        onClick={() => {
                          if (userDetails || guestDetails) {
                            setSelectedRaceId(stock.id);
                            setSelectedRaceName(stock.name);
                            setJoinRaceFormVisible(true);
                          } else {
                            setShowLoginForm(true);
                          }
                        }}
                        className="ml-4 px-4 py-2 border-2 border-[#00387E] dark:bg-[#00387E] dark:text-white text-sm rounded-xl dark:hover:bg-[#0050b3] transition"
                      >
                        Join
                      </button>
                    </div>
                  ))
                )}
              </div>


              <div onClick={()=>{navigate('/allraces', { state: 'Upcoming Races' })}} className="w-full mx-auto dark:text-slate-400 text-center text-lg font-semibold cursor-pointer">Show More</div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Community;


