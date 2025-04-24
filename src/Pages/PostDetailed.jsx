import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Post from "../Components/Post";
import { IoArrowBackCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getPostDetailed, getUserLikes } from "../Utils/api";
import { ColorRing } from "react-loader-spinner";

const PostDetailed = () => {
    const { post_id } = useParams();
    const navigate = useNavigate();
    const [postData,setPostData]=useState({});
    const [loading,setLoading]=useState(true);
    const [userLikes,setUserLikes]=useState([]);

    useEffect(()=>{
        getPostDetailed(post_id,(data)=>{
            setPostData(data);
            console.log(data);
            setLoading(false)
        },(error)=>{
            console.log("Error fetching post details",error)
        })

        getUserLikes((data)=>{
            setUserLikes(data.data.map(item => item.post.id))
            console.log(data.data.map(item => item.post.id),data)
          },(error)=>{
            console.log(error)
          })
    },[])

    return (
        <div className="w-full relative min-h-screen flex pb-8 pt-8 dark:bg-[#000924]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex flex-col w-[70rem] gap-4 dark:bg-[#000D38] py-6 md:px-10 mx-[1rem] md:mx-[7rem] flex-1 rounded-xl border dark:border-[#00387E] dark:text-white">
                
                {/* Back Button */}
                <button 
                    onClick={() => navigate('/community')} 
                    className="px-2 py-1 mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-fit"
                >
                    <IoArrowBackCircle size={32}/>
                </button>

                {loading?(
                    <div className="w-full h-full flex items-center justify-center">
                        <ColorRing
                    visible={true}
                    height="85"
                    width="85"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#e15b64', '#f47e60',]}
                    />
                    </div>
                ):(
                    <Post postData={postData} commentVisibility={true} likesArray={userLikes} setLikesArray={setUserLikes} />
                )}

            </div>
        </div>
    );
};

export default PostDetailed;
