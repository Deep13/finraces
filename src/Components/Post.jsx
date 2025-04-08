import PropTypes from "prop-types";
import { AiOutlineLike} from "react-icons/ai";
import { FaRegCommentAlt, FaShare, FaRegSmile, FaReply } from "react-icons/fa";
import { BsThreeDots, BsFillSendFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoMdCamera } from "react-icons/io";
import { MdOutlineGifBox } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { giphyKey } from "../Config";

const Post = ({ postData, commentVisibility }) => {
  const navigate = useNavigate();
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([
    { text: "Easily craft all of your Social posts for the whole month in Figma", user: "User Name", level: 10, avatar: postData?.userImg },
    { text: "Easily craft all of your Social posts for the whole month in Figma", user: "User Name", level: 10, avatar: postData?.userImg }
  ]);

  
  // Handle comment submission
  const handleCommentSubmit = () => {
    if (commentInput.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          text: commentInput,
          user: "You",
          level: 1,
          avatar: postData?.userImg,
          replies: [],
        },
      ]);
      setCommentInput("");
    }
  };
const [showEmojiPicker, setShowEmojiPicker] = useState(false);
const [gifSearch, setGifSearch] = useState("");
const [gifResults, setGifResults] = useState([]);
const [showGifPicker, setShowGifPicker] = useState(false);

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

const handleEmojiClick = (emojiData) => {
  setCommentInput(prev => prev + emojiData.emoji);
};

  return (
    <div
      onClick={() => {
        if (!commentVisibility) navigate(`/post/${postData?.id}`);
      }}
      className={`flex flex-col gap-4 p-4 rounded-xl w-full h-auto bg-[#e5f4ff] dark:bg-[#002763] border dark:border-0 shadow-lg ${!commentVisibility ? "cursor-pointer" : ""}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <img
            src={postData?.userImg}
            alt="User Avatar"
            className="w-12 h-12 rounded-full dark:bg-gray-300 object-cover"
          />
          <div>
            <div className="font-semibold dark:text-white">{postData?.userName}</div>
            <div className="text-sm dark:text-gray-400">{postData?.time}</div>
          </div>
        </div>
        <BsThreeDots className="dark:text-gray-400 cursor-pointer" size={20} />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-3">
        <p className="dark:text-white">{postData?.content}</p>
        {postData?.coverImg && (
          <img
            src={postData?.coverImg}
            alt="Post"
            className="rounded-xl h-60 w-full object-cover bg-gray-300"
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-around dark:text-gray-300 font-semibold border-t border-gray-600 pt-2">
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
          {showEmojiPicker && (
              <div className="absolute top-[40rem] right-60 z-50">
                <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
              </div>
            )}

{showGifPicker && (
            <div className="absolute top-[40rem] right-60 bg-[#232223] rounded-xl p-4 shadow-lg z-50 w-[400px]">
              <input
                type="text"
                placeholder="Search GIFs"
                value={gifSearch}
                onChange={(e) => {
                  setGifSearch(e.target.value);
                  fetchGifs(e.target.value);
                }}
                className="w-full mb-2 p-2 rounded bg-[#001f4a] text-white placeholder-gray-400"
              />
              <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
                {gifResults.map((gif) => (
                  <img
                    key={gif.id}
                    src={gif.images.fixed_height_small.url}
                    alt="gif"
                    className="rounded cursor-pointer"
                    onClick={() => {
                      setCommentInput((prev) => prev + ` ${gif.images.original.url} `);
                      setShowGifPicker(false);
                      setGifSearch("");
                      setGifResults([]);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          {/* Comment Input */}
          <div className="flex items-center gap-3 bg-slate-300 border dark:border-0 dark:bg-[#002763] p-2 rounded-xl relative">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Write a comment..."
              className="w-full px-5 py-3 pr-16 bg-transparent dark:text-white placeholder-gray-400 focus:outline-none"
            />
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 flex gap-4 dark:text-gray-400">
              <FaRegSmile className="cursor-pointer" size={26}  onClick={() =>{
                 setShowEmojiPicker(!showEmojiPicker)
                 setShowGifPicker(false)
                 }} />
              <IoMdCamera className="cursor-pointer" size={26} />
              <MdOutlineGifBox className="cursor-pointer" size={26} onClick={() =>{ 
                setShowGifPicker(!showGifPicker)
                setShowEmojiPicker(false)
                }} />
              {/* <LucideSticker className="cursor-pointer" size={26} /> */}
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
                <div key={index} className="flex gap-3 w-full items-start bg-slate-300 dark:bg-[#002763] p-3 rounded-lg">
                  <img
                    src={comment.avatar}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full bg-gray-400 object-cover"
                  />
                  <div className="dark:text-white w-full">
                    <div className="flex justify-between items-center">
                      <div>
                        <strong>{comment.user}</strong>
                        <span className="dark:text-gray-400 text-sm ml-2">Level {comment.level}</span>
                      </div>
                      <BsThreeDots className="dark:text-gray-400 cursor-pointer" size={18} />
                    </div>
                    <span className="dark:text-gray-400 text-sm">Ambassador</span>
                    <div className="mt-3 flex items-center justify-between w-full">
                    <div className="flex-1 mr-5 max-w-[40rem] flex flex-col gap-2">
  {/* Show normal text without GIF links */}
  <p>
    {comment.text
      .split(" ")
      .filter((word) => !word.includes("giphy.com") && !word.match(/\.(gif|jpg|jpeg|png)$/i))
      .join(" ")}
  </p>

  {/* Show the GIFs if present */}
  {comment.text.split(" ").map((word, i) =>
    word.includes("giphy.com") || word.match(/\.(gif|jpg|jpeg|png)$/i) ? (
      <img
        key={i}
        src={word.trim()}
        alt="GIF"
        className="rounded-xl max-w-[300px] object-cover"
      />
    ) : null
  )}
</div>

                      <div className="flex items-center gap-5 dark:text-gray-400 cursor-pointer">
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
