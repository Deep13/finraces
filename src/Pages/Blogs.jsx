import Sidebar from "../Components/Sidebar"
import blogImg from "../assets/images/blogImg1.png"
import {useState} from "react";
import CreateBlog from "../Components/CreateBlog"
import { useNavigate } from "react-router-dom";

const Blogs = () => {
    const [showModal,setShowModal]=useState(false);
    const navigate=useNavigate();
    
  return (
    <div className='w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]'>
        {/* Ensure sidebar is inside a container with sufficient height */}
            <Sidebar />
            
            {/* {
                showModal &&<CreateBlog onClose={()=>{setShowModal(false)}}/>
            } */}
            <div className='flex flex-col w-[70rem] gap-2 dark:bg-[#000D38] py-5 md:px-10 mx-[1rem] md:mx-[7rem] flex-1 rounded-xl border dark:border-[#00387E]  dark:text-white'>
               <div className="flex items-center justify-between">
                    <span className='font-semibold text-[1.5rem] font-poppins flex flex-row items-center'>
                        Blogs
                    </span>
                    <div onClick={()=>{
                        navigate('/write_blogs')
                    }} className="px-3 py-1 cursor-pointer rounded-xl border dark:border-slate-300 dark:text-white dark:bg-[#001B51]">
                        Create Blog
                    </div>
               </div>

               <div className="border dark:border-[#000D38] dark:text-white dark:bg-[#001B51] rounded-2xl px-5 py-3 flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <div className="font-semibold text-xl">
                            Featured Blogs
                        </div>
                        <div className="font-light text-sm text-slate-300 cursor-pointer">
                            Show More
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-4 gap-5">
                        {[1, 2, 3, 4].map((_, idx) => (
                            <div key={idx} className="flex flex-col gap-3 rounded-2xl">
                            <div className="h-40 w-full">
                                <img src={blogImg} className="w-full h-full object-cover rounded-2xl" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="font-semibold text-lg">Title</div>
                                <div className="text-slate-600 dark:text-slate-300 line-clamp-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque...
                                </div>
                                <div className="cursor-pointer font-semibold">Read Now</div>
                            </div>
                            </div>
                        ))}
                        </div>

                </div>
                <div className="border  px-5 py-3 dark:border-[#000D38] dark:text-white dark:bg-[#001B51] rounded-2xl p-2 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                        <div className="font-semibold text-xl">
                            My Blogs
                        </div>
                        <div className="font-light text-sm text-slate-300 cursor-pointer">
                            Show More
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-4 gap-5">
                        {[1, 2, 3, 4].map((_, idx) => (
                            <div key={idx} className="flex flex-col gap-3 rounded-2xl">
                            <div className="h-40 w-full">
                                <img src={blogImg} className="w-full h-full object-cover rounded-2xl" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="font-semibold text-lg">Title</div>
                                <div className="text-slate-600 dark:text-slate-300 line-clamp-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque...
                                </div>
                                <div className="cursor-pointer font-semibold">Read Now</div>
                            </div>
                            </div>
                        ))}
                        </div>

                </div>

               <div className="grid grid-cols-2 grid-rows-1 gap-4 w-full h-[30rem]">
                    {/* <div className="border dark:border-[#000D38] dark:text-white dark:bg-[#001B51] rounded-2xl p-2 flex flex-col gap-5">
                        <img src={blogImg} className="w-full rounded-2xl"/>
                        <div className="flex flex-col justify-center gap-4">
                            <div className="font-semibold text-lg">Title</div>
                            <div className="text-slate-300 h-10">Random stuff jknjdcnkdsmcklsmcklsdm cklds clds cjsnjn</div>
                            <div className="font-semibold cursor-pointer">Read Now</div>
                        </div>
                    </div>
                    <div className="border dark:border-[#000D38] dark:text-white dark:bg-[#001B51] rounded-2xl p-2 flex flex-col gap-5">
                        <img src={blogImg} className="w-full rounded-2xl"/>
                        <div className="flex flex-col justify-center gap-4">
                            <div className="font-semibold text-lg">Title</div>
                            <div className="text-slate-300 h-10">Random stuff jknjdcnkdsmcklsmcklsdm cklds clds cjsnjn</div>
                            <div className="font-semibold cursor-pointer">Read Now</div>
                        </div>
                    </div> */}
                    <div className="border dark:border-[#000D38] dark:text-white dark:bg-[#001B51] rounded-2xl p-2 flex flex-col gap-5">
                        <img src={blogImg} className="w-full rounded-2xl h-[70%]"/>
                        <div className="flex flex-col justify-center gap-4">
                            <div className="font-semibold text-lg">Title</div>
                            <div className="text-slate-300 h-10">Random stuff jknjdcnkdsmcklsmcklsdm cklds clds cjsnjn</div>
                            <div className="font-semibold cursor-pointer">Read Now</div>
                        </div>
                    </div>
                    <div className="border dark:border-[#000D38] dark:text-white dark:bg-[#001B51] rounded-2xl p-2 flex flex-col gap-5">
                        <div className="flex gap-5 font-semibold text-xl py-2">
                            Check Famous Blogs
                        </div>
                        <div className="flex flex-col flex-1 overflow-y-scroll notificationScrollbar">
                            {[1, 2, 3, 4].map((_, idx) => (
                                <div key={idx} className="flex gap-4 py-1">
                                <div className="h-32 w-32">
                                    <img src={blogImg} className="w-full rounded-2xl" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="font-semibold text-lg">Title</div>
                                    <div className="text-slate-600 dark:text-slate-300 line-clamp-2">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque...
                                    </div>
                                    <div className="cursor-pointer font-semibold">Read Now</div>
                                </div>
                                </div>
                            ))}
                            </div>

                    </div>
                </div>

            
                <div className="border  px-5 py-3 dark:border-[#000D38] dark:text-white dark:bg-[#001B51] rounded-2xl p-2 flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <div className="font-semibold text-xl">
                           Trending Blogs
                        </div>
                        <div className="font-light text-sm text-slate-300 cursor-pointer">
                            Show More
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-4 gap-5">
                        {[1, 2, 3, 4].map((_, idx) => (
                            <div key={idx} className="flex flex-col gap-3 rounded-2xl">
                            <div className="h-40 w-full">
                                <img src={blogImg} className="w-full h-full object-cover rounded-2xl" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="font-semibold text-lg">Title</div>
                                <div className="text-slate-600 dark:text-slate-300 line-clamp-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque...
                                </div>
                                <div className="cursor-pointer font-semibold">Read Now</div>
                            </div>
                            </div>
                        ))}
                        </div>

                </div>
            </div>
    </div>
  )
}

export default Blogs