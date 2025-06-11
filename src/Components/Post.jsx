import PropTypes from "prop-types";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt, FaShare, FaRegSmile, FaReply } from "react-icons/fa";
import {
  BsThreeDots,
  BsFillSendFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect, useRef } from "react";
import { IoMdCamera } from "react-icons/io";
import { MdOutlineGifBox } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { giphyKey } from "../Config";
import {
  searchUsers,
  debounceStockSearchj,
  getPostComments,
  postComments,
  likePost,
  dislikePost,
  getUserLikedComments,
  likeComment,
  dislikeComment,
  deletePost,
} from "../Utils/api";
import { debounce } from "lodash";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Make sure this is imported
import malePlaceholder from "../assets/images/manPlaceholder.jpg";
import femalePlaceholder from "../assets/images/womanPlaceholder.jpg";
import { GrFormView } from "react-icons/gr";
import { FiPlusCircle } from "react-icons/fi";

const Post = ({
  postData,
  commentVisibility,
  likesArray = [],
  setLikesArray,
}) => {
  const navigate = useNavigate();
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [gifSearch, setGifSearch] = useState("");
  const [gifResults, setGifResults] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [tagSuggestions, setTagSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [references, setReferences] = useState([]);

  const dummyUsers = ["john_doe", "jane_smith", "elon_musk"];
  const dummyStocks = ["AAPL", "TSLA", "GOOGL"];
  const userDetails = JSON.parse(atob(localStorage.getItem("fin_userDetails")));
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // console.log(likesArray)

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
            setTagSuggestions(
              stockNames.filter((name) =>
                name.toLowerCase().includes(query.toLowerCase())
              )
            );

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

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedMedia((prev) => [...prev, ...imageUrls]);
  };

  const handleCommentChange = async (e) => {
    const value = e.target.value;
    setCommentInput(value);

    // Regex to find the last @username or $stock symbol before the cursor
    const atMatch = value.match(/@(\w*)$/);
    const dollarMatch = value.match(/\$(\w*)$/);

    if (atMatch) {
      const query = atMatch[1].toLowerCase(); // Extract everything after @
      const data = await searchUsers(query, 5); // API call (adjust as needed)
      const extractedUsernames = data.data.map((user) =>
        `${user.firstName} ${user.lastName}`.trim()
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

  const handleCommentLikes = (flag, comment) => {
    if (!comment?.id) return;

    if (!flag) {
      // Add comment.id to likesArray (if not already present)
      likeComment(
        comment.id,
        () => {
          comment.post.like_count = comment.post.like_count + 1;
          setLikedComments((prev) => {
            const safePrev = Array.isArray(prev) ? prev : [];
            return [...new Set([...safePrev, comment.id])]; // ✅ return here
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      // Remove comment.id from likesArray
      dislikeComment(
        comment.id,
        () => {
          comment.post.like_count = comment.post.like_count - 1;
          setLikedComments((prev) => {
            const safePrev = Array.isArray(prev) ? prev : [];
            return safePrev.filter((id) => id !== comment.id); // ✅ return here
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }

    console.log("liked:", flag ? "removed" : "added");
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

  const contentRef = useRef(null);
  useEffect(() => {
    const clickHandler = (e) => {
      const target = e.target;
      if (target.classList.contains("tagged-user")) {
        const userId = target.getAttribute("data-id");
        if (userId) {
          navigate(`/userprofile/${userId}`);
        }
      }
      if (target.classList.contains("tagged-stock")) {
        const userId = target.getAttribute("data-id").split("<-->")[0];
        const ticker = target.getAttribute("data-id").split("<-->")[1];
        if (userId && ticker) {
          navigate(`/stock/${ticker}/${userId}`);
        }
      }
      const raceCard = target.closest(".race-card");
      if (raceCard) {
        const raceId = raceCard.getAttribute("data-id");
        if (raceId) {
          navigate(`/race/${raceId}`);
          return;
        }
      }
    };

    const container = contentRef.current;
    if (container) {
      container.addEventListener("click", clickHandler);
    }

    return () => {
      if (container) {
        container.removeEventListener("click", clickHandler);
      }
    };
  }, [postData]);

  const handleCommentSubmit = () => {
    if (commentInput.trim() || selectedMedia.length > 0) {
      function formatter(comment, references) {
        const escapedRefs = references.map((ref) =>
          ref.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
        );
        escapedRefs.sort((a, b) => b.length - a.length);

        const regex = new RegExp(`(${escapedRefs.join("|")})`, "gi");

        const formatted = comment.replace(regex, (match) => {
          if (match.startsWith("@")) {
            return `<span class="text-blue-300 font-semibold">${match}</span>`;
          } else if (match.startsWith("$")) {
            return `<span class="text-teal-300 font-semibold">${match}</span>`;
          }
          return match;
        });

        return `<p class="commentContent">${formatted}</p>`;
      }

      const mediaTags = selectedMedia
        .map((src) => `<img src="${src}" />`)
        .join("");
      const formattedText = formatter(commentInput, references);
      const finalContent = formattedText + mediaTags;

      postComments(
        postData.id,
        "",
        finalContent,
        (data) => {
          // Append new comment to existing list
          setComments((prev) => [data, ...prev]);

          // Clear input
          setCommentInput("");
          setSelectedMedia([]);
          setReferences([]);

          console.log("Success", data);
        },
        (error) => {
          console.log("Post failed", error);
        }
      );
    }
  };

  const [likedComments, setLikedComments] = useState([]);
  useEffect(() => {
    if (postData && postData.id && commentVisibility) {
      getPostComments(
        postData.id,
        (data) => {
          console.log(data);
          setComments(data.data);
        },
        (error) => {
          console.log(error);
        }
      );

      getUserLikedComments(
        (data) => {
          console.log("userlikes these", data);
          const commentIds = data.data.map((item) => item.comment.id);
          setLikedComments(commentIds);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [postData]);

  const handleLike = (flag) => {
    if (!postData?.id) return;

    if (!flag) {
      // Add postData.id to likesArray (if not already present)
      likePost(
        postData.id,
        () => {
          postData.like_count = postData.like_count + 1;
          setLikesArray((prev) => {
            const safePrev = Array.isArray(prev) ? prev : [];
            return [...new Set([...safePrev, postData.id])]; // ✅ return here
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      // Remove postData.id from likesArray
      dislikePost(
        postData.id,
        () => {
          postData.like_count = postData.like_count - 1;
          setLikesArray((prev) => {
            const safePrev = Array.isArray(prev) ? prev : [];
            return safePrev.filter((id) => id !== postData.id); // ✅ return here
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }

    console.log("liked:", flag ? "removed" : "added");
  };

  // console.log(JSON.stringify(userDetails),postData)

  const handleDeletePost = () => {
    deletePost(
      postData.id,
      () => {
        console.log("Success");
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const emojiPickerRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showEmojiPicker &&
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    // return () => {
    //   document.removeEventListener("mousedown", handleClickOutside);
    // };
  }, [showEmojiPicker, showGifPicker]);

  return (
    <div
      className={`relative flex flex-col gap-4 p-4 rounded-xl w-full h-auto bg-[#e5f4ff] dark:bg-[#002763] border dark:border-0 shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <img
            src={
              postData?.user?.photo?.path ||
              (postData?.user?.gender == "female"
                ? femalePlaceholder
                : malePlaceholder)
            }
            alt="User Avatar"
            className="w-12 h-12 rounded-full dark:bg-gray-300 object-cover"
          />
          <div>
            <div
              className={`font-semibold dark:text-white ${
                userDetails?.userId != postData.user.id &&
                "hover:underline cursor-pointer"
              }`}
              onClick={() => {
                if (userDetails?.userId != postData.user.id)
                  navigate(`/userprofile/${postData.user.id}`);
              }}
            >
              {postData?.user?.firstName} {postData?.user?.lastName}
            </div>
            <div className="text-sm dark:text-gray-400 font-poppins">
              {new Date(postData?.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
        {/* <BsThreeDots className="dark:text-gray-400 cursor-pointer" size={20} /> */}
        {userDetails.userId === postData?.user?.id && commentVisibility && (
          <div className="relative group" ref={menuRef}>
            {/* 3 Dots Icon */}
            <button
              className="text-white p-2"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <BsThreeDotsVertical size={20} />
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 z-10 flex flex-col bg-white text-black shadow-lg rounded-md w-28">
                <div
                  onClick={() => {
                    setShowConfirmation(true);
                    setMenuOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-red-100 hover:text-red-600 cursor-pointer"
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showConfirmation && (
        <div className="w-72 bg-[#e5f4ff] dark:bg-[#000D38] h-32 absolute z-10 right-5 top-20 rounded-xl flex flex-col gap-3 p-3">
          <span>Are you sure you want to delete this post ?</span>
          <div className="flex items-center justify-between px-5">
            <div
              onClick={() => {
                setShowConfirmation(false);
              }}
              className="border-2 cursor-pointer px-2 py-1 rounded-xl border-slate-300"
            >
              Cancel
            </div>
            <div
              onClick={() => {
                handleDeletePost();
                setShowConfirmation(false);
                navigate("/community");
              }}
              className="border-2 bg-red-500 cursor-pointer px-2 py-1 rounded-xl border-red-500"
            >
              Delete
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-3">
        {/* <p className="dark:text-white">{postData?.content}</p> */}
        <div
          ref={contentRef}
          // onClick={(e)=>{e.stopPropagation()}}
          className="prose dark:prose-invert w-full"
          dangerouslySetInnerHTML={{ __html: postData?.content }}
        />
        {postData?.image?.path && (
          <img
            src={postData.image.path}
            alt="Post"
            className="rounded-xl max-h-[30rem] bg-gray-300 w-fit"
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-around dark:text-gray-300 font-semibold border-t border-gray-600 pt-2">
        <div className="flex items-center gap-2 cursor-pointer hover:text-white">
          {likesArray?.includes(postData?.id) ? (
            <AiFillLike
              size={22}
              className="text-blue-500"
              onClick={(e) => {
                e.stopPropagation();
                handleLike(true);
              }}
            />
          ) : (
            <AiOutlineLike
              size={22}
              onClick={(e) => {
                e.stopPropagation();
                handleLike(false);
              }}
            />
          )}{" "}
          <span>{postData?.like_count || 0}</span>
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer hover:text-white"
          onClick={() => {
            if (!commentVisibility) navigate(`/post/${postData?.id}`);
          }}
        >
          <FaRegCommentAlt size={20} />
          <span>{postData?.commentsCount || 0}</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-white">
          <GrFormView size={28} /> <span>{postData?.view_count || 0}</span>
        </div>
      </div>

      {/* Comment Section */}
      {commentVisibility && (
        <div className="mt-4 p-4 rounded-xl">
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div
              ref={emojiPickerRef}
              className="absolute top-[17rem] right-24 z-50"
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
            </div>
          )}

          {/* GIF Picker */}
          {showGifPicker && (
            <div className="absolute top-[25rem] right-60 bg-[#232223] rounded-xl p-4 shadow-lg z-50 w-[400px]">
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
                      setSelectedMedia((prev) => [
                        ...prev,
                        gif.images.original.url,
                      ]);
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
            {/* <ReactQuill
            value={commentInput}
            onChange={handleCommentChange}
            placeholder="Write a comment..."
            className="
            dark:text-white 
            dark:[&_.ql-container]:bg-[#001B51] 
            dark:[&_.ql-editor]:text-white 
            dark:[&_.ql-editor]:bg-[#001B51] 
            min-h-[200px] max-h-[400px] overflow-y-auto rounded-xl border-0 w-full"
            theme="snow"
            modules={modules}
          /> */}
            <input
              type="text"
              value={commentInput}
              onChange={handleCommentChange} // Ensure this is set correctly
              placeholder="Write a comment..."
              className="w-full px-5 py-3 pr-16 bg-transparent dark:text-white placeholder-gray-400 focus:outline-none relative"
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
              {/* <label>
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
              /> */}
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
                    src={
                      comment.user?.photo?.path ||
                      (comment.user?.gender && comment.user?.gender == "female"
                        ? femalePlaceholder
                        : malePlaceholder)
                    }
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full bg-gray-400 object-cover"
                  />

                  <div className="dark:text-white w-full flex flex-col justify-between">
                    {/* Top Section: Name and Role */}
                    <div>
                      <strong>
                        {comment.user?.firstName} {comment.user?.lastName}
                      </strong>
                      {/* <div className="dark:text-gray-400 text-sm">User</div> */}
                    </div>

                    {/* Comment Content */}
                    <div className="mt-2 flex-1">
                      <div
                        className="prose dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: comment.content }}
                      />
                    </div>

                    {/* Bottom Right Like Button */}
                    {/* <div className="flex justify-end mt-3">
          <div className="flex items-center gap-1 text-sm dark:text-gray-400 hover:text-white cursor-pointer">
          {likedComments?.includes(comment?.id) ? (
          <AiFillLike size={22} className="text-blue-500" onClick={(e) => {
            e.stopPropagation()
            handleCommentLikes(true,comment)}
          } />
        ) : (
          <AiOutlineLike size={22} onClick={(e) => {
            e.stopPropagation()
            handleCommentLikes(false,comment)}} />
        )}
            <span>{comment.like_count || 0}</span>
          </div>
        </div> */}
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
// Post.propTypes = {
//   postData: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     userImg: PropTypes.string.isRequired,
//     userName: PropTypes.string.isRequired,
//     time: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired,
//     coverImg: PropTypes.string,
//     likes: PropTypes.number,
//   }).isRequired,
//   commentVisibility: PropTypes.bool,
// };

export default Post;
