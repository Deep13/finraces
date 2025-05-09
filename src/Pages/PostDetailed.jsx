import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Post from "../Components/Post";
import { IoArrowBackCircle, IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getPostDetailed, getUserLikes } from "../Utils/api";
import { ColorRing } from "react-loader-spinner";

const PostDetailed = () => {
  const { post_id } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);
  const [userLikes, setUserLikes] = useState([]);

  useEffect(() => {
    getPostDetailed(
      post_id,
      (data) => {
        setPostData(data);
        console.log(data);
        setLoading(false);
      },
      (error) => {
        console.log("Error fetching post details", error);
      }
    );

    getUserLikes(
      (data) => {
        setUserLikes(data.data.map((item) => item.post.id));
        console.log(
          data.data.map((item) => item.post.id),
          data
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div className="w-full relative min-h-screen flex pb-8 pt-8 dark:bg-[#000924]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content (no outer box) */}
      <div className="flex flex-col flex-1 mx-[1rem] md:mx-[7rem] dark:text-white relative">
        {/* Close Button Above Post */}
        <div className="w-full flex justify-end mb-4">
          <button onClick={() => navigate("/community")} className="text-white">
            <IoClose size={32} />
          </button>
        </div>

        {loading ? (
          <div className="w-full h-full flex items-center justify-center mt-20">
            <ColorRing
              visible={true}
              height="85"
              width="85"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#e15b64", "#f47e60"]}
            />
          </div>
        ) : (
          <Post
            postData={postData}
            commentVisibility={true}
            likesArray={userLikes}
            setLikesArray={setUserLikes}
          />
        )}
      </div>
    </div>
  );
};

export default PostDetailed;
