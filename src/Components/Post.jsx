import PropTypes from "prop-types";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt, FaShare, FaRegSmile, FaReply } from "react-icons/fa";
import { BsThreeDots, BsFillSendFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState,useCallback } from "react";
import { IoMdCamera } from "react-icons/io";
import { MdOutlineGifBox } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { giphyKey } from "../Config";
import {searchUsers,debounceStockSearchj} from "../Utils/api"
import {debounce} from "lodash"

const Post = ({ postData, commentVisibility }) => {
  const navigate = useNavigate();
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([
    {
      text: "Easily craft all of your Social posts for the whole month in Figma",
      user: "User Name",
      level: 10,
      avatar: postData?.userImg,
    },
  ]);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [gifSearch, setGifSearch] = useState("");
  const [gifResults, setGifResults] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [tagSuggestions, setTagSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [references,setReferences] = useState([]);

  const dummyUsers = ["john_doe", "jane_smith", "elon_musk"];
  const dummyStocks = ["AAPL", "TSLA", "GOOGL"];

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
    setCommentInput((prev) => prev + emojiData.emoji);
  };

  const fetchStocks = useCallback(
    debounce(async (query) => {
        if (query.length > 2) {
            try {
                await debounceStockSearchj(query, (data) => {
                    // Extract stock names from API response
                    const stockNames = data.map((stock) => stock.name);
                    
                    // Set tag suggestions using extracted names
                    setTagSuggestions(stockNames.filter((name) =>
                        name.toLowerCase().includes(query.toLowerCase())
                    ));
                    
                    setShowSuggestions(true);
                });
            } catch (error) {
                console.error("Error fetching stocks:", error);
            } finally {
                console.log("final");
            }
        } else {
            console.log("A");
        }
    }, 500),
    []
);



  const handleImageUpload = async(e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedMedia((prev) => [...prev, ...imageUrls]);
  };

  const handleCommentChange = async(e) => {
    const value = e.target.value;
    setCommentInput(value);
  
    // Regex to find the last @username or $stock symbol before the cursor
    const atMatch = value.match(/@(\w*)$/);
    const dollarMatch = value.match(/\$(\w*)$/);
  
    if (atMatch) {
      const query = atMatch[1].toLowerCase(); // Extract everything after @
      const data = await searchUsers(query, 5); // API call (adjust as needed)
      const extractedUsernames = data.data.map(
        (user) => `${user.firstName} ${user.lastName}`.trim()
      );
      setTagSuggestions(extractedUsernames);
      setShowSuggestions(true);
    } else if (dollarMatch) {
      const query = dollarMatch[1].toLowerCase(); // Extract everything after $
      fetchStocks(query);
      
    } else {
      setShowSuggestions(false);
    }
  };
  

  // Function to highlight tags
  const formatCommentText = (text) => {
    const words = text.split(" ");
    const formatted = [];
    let i = 0;
  
    while (i < words.length) {
      let matched = false;
  
      for (let ref of references) {
        const refWords = ref.split(" ");
        const segment = words.slice(i, i + refWords.length).join(" ");
  
        if (segment === ref) {
          // Found a match in references
          const colorClass = ref.startsWith("@") ? "text-blue-500" : "text-teal-500";
          formatted.push(
            <span key={i} className={colorClass}>
              {segment + " "}
            </span>
          );
          i += refWords.length;
          matched = true;
          break;
        }
      }
  
      if (!matched) {
        formatted.push(words[i] + " ");
        i++;
      }
    }
  
    return formatted;
  };
  
  

  const insertTag = (tag) => {
    const words = commentInput.split(" ");
    const lastWord = words[words.length - 1];
    const formattedTag = lastWord.startsWith("@") ? `@${tag}` : `$${tag}`;
    
    // Replace the last word with the selected tag
    words[words.length - 1] = formattedTag;
    setCommentInput(words.join(" ") + " ");

    // Update the references array
    setReferences((prev) => [...prev, formattedTag]);

    // Hide suggestions
    setShowSuggestions(false);
};


  const handleCommentSubmit = () => {
    if (commentInput.trim() || selectedMedia.length > 0) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          text: commentInput,
          user: "You",
          level: 1,
          avatar: postData?.userImg,
          replies: [],
          media: selectedMedia, // Store media separately
        },
      ]);
      setCommentInput("");
      setSelectedMedia([]);
    }
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
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute top-[40rem] right-60 z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
            </div>
          )}

          {/* GIF Picker */}
          {showGifPicker && (
            <div className="absolute top-[40rem] right-60 bg-[#232223] rounded-xl p-4 shadow-lg z-50 w-[400px]">
              <input
                type="text"
                placeholder="Search GIFs"
                value={gifSearch}
                onChange={(e) => {
                  setGifSearch(e.target.value);
                  fetchGifs(e.target.value);
                  // handleCommentChange(e.target.value)
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
                      setSelectedMedia((prev) => [...prev, gif.images.original.url]);
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
              onChange={handleCommentChange} // Ensure this is set correctly
              placeholder="Write a comment..."
              className="w-full px-5 py-3 pr-16 bg-transparent dark:text-white placeholder-gray-400 focus:outline-none"
            />

{showSuggestions && tagSuggestions.length > 0 && (
  <ul className="absolute left-4 bottom-[110%] bg-white dark:bg-[#1c1c1c] text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md shadow-lg w-64 max-h-40 overflow-y-auto z-50">
    {tagSuggestions.map((tag, idx) => (
      <li
        key={idx}
        onClick={() => insertTag(tag)}
        className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
      >
        {tag}
      </li>
    ))}
  </ul>
)}


            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 flex gap-4 dark:text-gray-400">
              <FaRegSmile
                className="cursor-pointer"
                size={26}
                onClick={() => {
                  setShowEmojiPicker(!showEmojiPicker);
                  setShowGifPicker(false);
                }}
              />
              <label>
                <IoMdCamera className="cursor-pointer" size={26} />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <MdOutlineGifBox
                className="cursor-pointer"
                size={26}
                onClick={() => {
                  setShowGifPicker(!showGifPicker);
                  setShowEmojiPicker(false);
                }}
              />
            </div>
            <button
              onClick={handleCommentSubmit}
              className="text-white bg-blue-500 p-2 rounded-full hover:bg-blue-600"
            >
              <BsFillSendFill size={20} />
            </button>
          </div>
          {showSuggestions && tagSuggestions.length > 0 && (
              <ul className="absolute left-4 bottom-[110%] bg-white dark:bg-[#1c1c1c] text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md shadow-lg w-64 max-h-40 overflow-y-auto z-50">
                {tagSuggestions.map((tag, idx) => (
                  <li
                    key={idx}
                    onClick={() => insertTag(tag)}
                    className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}

          {/* Media Preview */}
          {selectedMedia.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-3">
              {selectedMedia.map((media, idx) => (
                <img
                  key={idx}
                  src={media}
                  alt="preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          {/* Comments List */}
          <div className="mt-4 flex flex-col gap-3 max-h-[40rem] w-full overflow-y-auto notificationScrollbar">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div
                  key={index}
                  className="flex gap-3 w-full items-start bg-slate-300 dark:bg-[#002763] p-3 rounded-lg"
                >
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
                      <p>{formatCommentText(comment.text)}</p>
                        {/* Render attached media if present */}
                        {comment.media?.map((url, i) => (
                          <img
                            key={i}
                            src={url}
                            alt="attached"
                            className="rounded-xl max-w-[300px] object-cover"
                          />
                        ))}
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
