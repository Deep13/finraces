import { useParams } from "react-router-dom"
import Sidebar from "../Components/Sidebar";
import Post from "../Components/Post";

const PostDetailed = () => {
    const {post_id}=useParams();
    console.log(post_id);
  return (
    <div className="w-full relative min-h-screen flex pb-8 pt-8 dark:bg-[#000924]">
          {/* Sidebar */}
          <Sidebar />
    
          {/* Main Content */}
          <div className="flex flex-col w-[70rem] gap-4 bg-[#e5f4ff] dark:bg-[#000D38] py-6 md:px-10 mx-[1rem] md:mx-[7rem] flex-1 rounded-xl border dark:border-[#00387E] dark:text-white">
            <Post postData={{
      id: 1,
      userName: "John Doe",
      userImg: "https://randomuser.me/api/portraits/men/1.jpg",
      time: "2h ago",
      content: "Exploring new AI advancements in tech!",
      coverImg: "https://cdn.pixabay.com/photo/2023/08/15/14/05/banner-8192025_1280.png",
      likes: 32,
    }} commentVisibility={true}/>
            
          </div>
        </div>
  )
}

export default PostDetailed