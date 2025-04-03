import PropTypes from "prop-types";
import { AiOutlineLike} from "react-icons/ai";
import { FaRegCommentAlt, FaShare, FaRegSmile, FaReply } from "react-icons/fa";
import { BsThreeDots, BsFillSendFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoMdCamera } from "react-icons/io";
import { MdOutlineGifBox } from "react-icons/md";
import { LucideSticker } from "lucide-react";

const Post = ({ postData, commentVisibility }) => {
  const navigate = useNavigate();
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([
    { text: "Easily craft all of your Social posts for the whole month in Figma", user: "User Name", level: 10, avatar: postData?.userImg },
    { text: "Easily craft all of your Social posts for the whole month in Figma", user: "User Name", level: 10, avatar: postData?.userImg }
  ]);

  const handleCommentSubmit = () => {
    if (commentInput.trim()) {
      setComments([...comments, { text: commentInput, user: "You", level: 1, avatar: postData?.userImg }]);
      setCommentInput("");
    }
  };

  return (
    <div
      onClick={() => {
        if (!commentVisibility) navigate(`/post/${postData?.id}`);
      }}
      className={`flex flex-col gap-4 p-4 rounded-xl w-full h-auto dark:bg-[#002763] shadow-lg ${!commentVisibility ? "cursor-pointer" : ""}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
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
          <FaRegCommentAlt size={20} /> <span>Comment</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-white">
          <FaShare size={20} /> <span>Share</span>
        </div>
      </div>

      {/* Comment Section */}
      {commentVisibility && (
        <div className="mt-4 p-4 rounded-xl">
          {/* Comment Input */}
          <div className="flex items-center gap-3 bg-[#002763] p-2 rounded-xl relative">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Write a comment..."
              className="w-full px-5 py-3 pr-16 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 flex gap-4 text-gray-400">
              <FaRegSmile className="cursor-pointer" size={26} />
              <IoMdCamera className="cursor-pointer" size={26} />
              <MdOutlineGifBox className="cursor-pointer" size={26} />
              <LucideSticker className="cursor-pointer" size={26} />
            </div>
            <button
              onClick={handleCommentSubmit}
              className="text-white bg-blue-500 p-2 rounded-full hover:bg-blue-600"
            >
              <BsFillSendFill size={20} />
            </button>
          </div>

          {/* Comments List */}
          <div className="mt-4 flex flex-col gap-3 max-h-[40rem] w-full overflow-y-auto notificationScrollbar">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="flex gap-3 w-full items-start bg-[#002763] p-3 rounded-lg">
                  <img
                    src={comment.avatar}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full bg-gray-400 object-cover"
                  />
                  <div className="text-white w-full">
                    <div className="flex justify-between items-center">
                      <div>
                        <strong>{comment.user}</strong>
                        <span className="text-gray-400 text-sm ml-2">Level {comment.level}</span>
                      </div>
                      <BsThreeDots className="text-gray-400 cursor-pointer" size={18} />
                    </div>
                    <span className="text-gray-400 text-sm">Ambassador</span>
                    <div className="mt-3 flex items-center justify-between w-full">
                      <div className="flex-1 mr-5 max-w-[40rem]">
                        <p>{comment.text}</p>
                      </div>
                      <div className="flex items-center gap-5 text-gray-400 cursor-pointer">
                        <div className="flex items-center gap-1 hover:text-white">
                          <AiOutlineLike size={18} /> <span>Like</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-white">
                          <FaReply size={18} /> <span>Reply</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">No comments yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Prop Validation
Post.propTypes = {
  postData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userImg: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    coverImg: PropTypes.string,
    likes: PropTypes.number,
  }).isRequired,
  commentVisibility: PropTypes.bool,
};

export default Post;
