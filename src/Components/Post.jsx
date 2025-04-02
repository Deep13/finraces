import PropTypes from "prop-types";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt, FaShare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

const Post = ({ postData }) => {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl w-full h-[30rem] dark:bg-[#002763] shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={postData?.userImg}
            alt="User Avatar"
            className="w-12 h-12 rounded-full bg-gray-300 object-cover"
          />
          <div>
            <div className="font-semibold text-white">{postData?.userName}</div>
            <div className="text-sm text-gray-400">{postData?.time}</div>
          </div>
        </div>
        <BsThreeDots className="text-gray-400 cursor-pointer" size={20} />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-3">
        <p className="text-white">{postData?.content}</p>
        {postData?.coverImg && (
          <img
            src={postData?.coverImg}
            alt="Post"
            className="rounded-xl h-60 w-full object-cover bg-gray-300"
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-around text-gray-300 font-semibold border-t border-gray-600 pt-2">
        <div className="flex items-center gap-2 cursor-pointer hover:text-white">
          <AiOutlineLike size={22} /> <span>{postData?.likes || 0}</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-white">
          <FaRegCommentAlt size={20} /> <span>Comments</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-white">
          <FaShare size={20} /> <span>Share</span>
        </div>
      </div>
    </div>
  );
};

// Prop Validation
Post.propTypes = {
  postData: PropTypes.shape({
    userImg: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    coverImg: PropTypes.string,
    likes: PropTypes.number,
  }).isRequired,
};

export default Post;
