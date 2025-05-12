import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Post from "../Components/Post";

import malePlaceholder from "../assets/images/manPlaceholder.jpg";
import femalePlaceholder from "../assets/images/womanPlaceholder.jpg";
import { BiMedal } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import {
  debounceStockSearchj,
  getRaceList,
  getTop4,
  getUserLikes,
  searchUsers,
} from "../Utils/api";
import { DarkModeContext } from "../Contexts/DarkModeProvider";
import JoinRace from "../Components/JoinRace";
import { FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { giphyKey } from "../Config";
import {
  uploadImage,
  postCommunityPost,
  getPosts,
  getFollowees,
  followUser,
  unFollowUser,
} from "../Utils/api";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { ColorRing } from "react-loader-spinner";
import { debounce } from "lodash";
import { useCommunity } from "../Contexts/CommunityProvider";

const Community = () => {
  const tabs = ["All", "Following", "My posts"];
  const { setShowLoginForm } = useContext(DarkModeContext);
  const { selectedUser, setSelectedUser } = useCommunity();
  const guestDetails = localStorage.getItem("guest_details");
  //grab userDetails for posting
  let userDetails = null;
  const storedData = localStorage.getItem("fin_userDetails");
  if (storedData) {
    userDetails = JSON.parse(atob(storedData));
  }

  const [activeTab, setActiveTab] = useState("All");
  const [postContent, setPostContent] = useState("");
  const [bannerImg, setBannerImg] = useState("");

  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingExperts, setLoadingExperts] = useState(true);
  const [loadingRaces, setLoadingRaces] = useState(true);

  const [joinRaceFormVisible, setJoinRaceFormVisible] = useState(false);
  const [selectedRaceId, setSelectedRaceId] = useState();
  const [selectedRaceName, setSelectedRaceName] = useState("");
  const [followees, setFollowees] = useState([]);

  // Proper Post Data
  const [posts, setPosts] = useState([]);

  const emojiPickerRef = useRef(null);
  const gifPickerRef = useRef(null);

  // State for Experts to follow
  const [expertsToFollow, setExpertsToFollow] = useState([]);

  // State for Upcoming Races
  const [upcomingRaces, setUpcomingRaces] = useState([]);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [gifSearch, setGifSearch] = useState("");
  const [gifResults, setGifResults] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const navigate = useNavigate();

  // State for search Users
  const [userList, setUserList] = useState([]);
  const [userSearchQuery, setUserSearchQuery] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    // let ud=localStorage.getItem('fin_userDetails');

    if (!token) {
      setShowLoginForm(true);
    }
  }, []);

  const formatter = (text, references) => {
    const escapedRefs = references.map((ref) => {
      const name = ref.split("<-->")[0];
      return name.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    });
    escapedRefs.sort((a, b) => b.length - a.length);

    const regex = new RegExp(`(${escapedRefs.join("|")})`, "gi");

    let formatted = text.replace(regex, (match) => {
      const matchedRef = references.find((ref) => ref.startsWith(match));
      let id = matchedRef ? matchedRef.split("<-->")[1] : "";
      if (match.startsWith("$")) {
        id += `<-->${matchedRef ? matchedRef.split("<-->")[2] : ""}`;
      }

      if (match.startsWith("@")) {
        return `<span class="text-blue-300 font-semibold cursor-pointer tagged-user" data-id="${id}">${match}</span>`;
      } else if (match.startsWith("$")) {
        return `<span class="text-teal-300 font-semibold cursor-pointer tagged-stock" data-id="${id}">${match}</span>`;
      }
      return match;
    });

    //replace \n with <br/>
    formatted = formatted.replace(/\n/g, "<br/>");

    return `<p class="postContent">${formatted}</p>`;
  };

  useEffect(() => {
    const clickHandler = (e) => {
      const target = e.target;
      if (target.classList.contains("tagged-user")) {
        const userId = target.getAttribute("data-id");
        if (userId && userId != userDetails?.userId) {
          navigate(`/userprofile/${userId}`);
        }
      }
    };

    document.addEventListener("click", clickHandler);

    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, [navigate]);

  const sendPost = () => {
    const formattedText = formatter(postContent, references);
    const resetState = () => {
      setPostContent("");
      setBannerImg("");
      setReferences([]);
    };

    if (selectedFile) {
      uploadImage(
        selectedFile,
        (data) => {
          // const mediaTag = `<img src="${data.file.url}" class="rounded-md my-4 w-fit" />`;
          const finalContent = formattedText;

          postCommunityPost(
            "",
            finalContent,
            data.file.id,
            (data) => {
              console.log("posted successfully", [data, ...posts]);
              setPosts([data, ...posts]);
              resetState();
            },
            (error) => {
              console.log("error in posting", error);
            }
          );
        },
        (error) => {
          console.log("Error in uploading image to server", error);
        }
      );
    } else {
      // 🟡 This handles GIF image embed
      let gifTag = "";
      if (bannerImg && bannerImg.includes("giphy")) {
        gifTag = `<img src="${bannerImg}" class="rounded-md my-4 w-fit" />`;
      }

      const finalContent = formattedText + gifTag;

      postCommunityPost(
        "",
        finalContent,
        "",
        (data) => {
          console.log("posted successfully", data);
          setPosts([data, ...posts]);
          resetState();
        },
        (error) => {
          console.log("error in posting", error);
        }
      );
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setBannerImg(imgUrl);
    }
  };

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [tagSuggestions, setTagSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [references, setReferences] = useState([]);
  const fileRef = useRef(null);
  const loaderRef = useRef(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setPostContent((prev) => prev + emojiData.emoji);
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

  useEffect(() => {
    fetchGifs("default");
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showEmojiPicker &&
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
      if (
        showGifPicker &&
        gifPickerRef.current &&
        !gifPickerRef.current.contains(event.target)
      ) {
        setShowGifPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    // return () => {
    //   document.removeEventListener("mousedown", handleClickOutside);
    // };
  }, [showEmojiPicker, showGifPicker]);

  //fetchData for experts to follow and upcoming races

  useEffect(() => {
    getTop4(
      1,
      2,
      (data) => {
        setExpertsToFollow(data.data);
        setLoadingExperts(false);
      },
      (error) => {
        console.log("error", error);
      },
      10
    );

    getRaceList(
      "scheduled",
      1,
      (data) => {
        setLoadingRaces(false);
        setUpcomingRaces(data.data);
      },
      (error) => {
        console.log("Error", error);
      }
    );

    if (!selectedUser) {
      getPosts(
        "All",
        (data) => {
          console.log(data);
          setLoadingPosts(false);
          setPosts(data.data);
        },
        (errrr) => {
          console.log(errrr);
        },
        1,
        -1
      );
    }

    getFollowees(
      (data) => {
        const followeeIds = data.data.map((item) => item?.followee?.id);
        setFollowees(followeeIds);
        console.log("followees", followeeIds);
      },
      (error) => {
        console.log(error);
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

  useEffect(() => {
    if (selectedUser) return;

    setLoadingPosts(true);
    getPosts(
      activeTab,
      (data) => {
        setPosts(data.data);
        setHasMore(data.hasNextPage);
        setLoadingPosts(false);
      },
      (error) => {
        console.log(error);
      },
      page,
      -1
    );
  }, [activeTab]);

  useEffect(() => {
    if (selectedUser) return;

    setLoadingPosts(true);
    getPosts(
      activeTab,
      (data) => {
        setPosts([...posts, ...data.data]);
        setHasMore(data.hasNextPage);
        setLoadingPosts(false);
      },
      (error) => {
        console.log(error);
      },
      page,
      -1
    );
  }, [page]);

  const handleFollow = async (isFollowed, leader) => {
    const leaderId = leader?.user?.id;

    if (!leaderId) return; // safety check

    if (isFollowed) {
      unFollowUser(
        leaderId,
        () => {
          setFollowees((prev) => {
            const safePrev = Array.isArray(prev) ? prev : [];
            return safePrev.filter((f) => f !== leaderId);
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      followUser(
        leaderId,
        (data) => {
          setFollowees((prev) => {
            const safePrev = Array.isArray(prev) ? prev : [];
            return [...safePrev, leaderId];
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  const fetchStocks = useCallback(
    debounce(async (query) => {
      if (query.length > 2) {
        try {
          await debounceStockSearchj(query, (data) => {
            // Extract stock names from API response
            console.log(data[0].id);
            const stockNames = data.map(
              (stock) => stock.name + `<-->${stock.id}` + `<-->${stock.ticker}`
            );

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

  const handleCommentChange = async (e) => {
    const value = e.target.value;
    setPostContent(value);

    // Regex to find the last @username or $stock symbol before the cursor
    const atMatch = value.match(/@(\w*)$/);
    const dollarMatch = value.match(/\$(\w*)$/);

    if (atMatch) {
      const query = atMatch[1].toLowerCase(); // Extract everything after @
      const data = await searchUsers(query, 5); // API call (adjust as needed)
      const extractedUsernames = data.data.map(
        (user) => `${user.firstName} ${user.lastName}`.trim() + `<-->${user.id}`
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

  const insertTag = (tag) => {
    const words = postContent.split(" ");
    const lastWord = words[words.length - 1];
    const formattedTag = lastWord.startsWith("@")
      ? `@${tag.split("<-->")[0]}`
      : `$${tag.split("<-->")[0]}`;
    const format2 = lastWord.startsWith("@") ? `@${tag}` : `$${tag}`;

    // Replace the last word with the selected tag
    words[words.length - 1] = formattedTag;
    setPostContent(words.join(" ") + " ");

    // Update the references array
    setReferences((prev) => [...prev, format2]);

    // Hide suggestions
    setShowSuggestions(false);
  };

  let flag = 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loadingPosts) {
          if (flag == 0) {
            setPage((prev) => prev + 1);
            flag = 1;
          }
        } else {
          flag = 0;
        }
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 1.0, // trigger when fully visible
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, loadingPosts]);

  const handleUserSearch = async (query) => {
    const data = await searchUsers(query);
    setUserList(data.data);
  };
  useEffect(() => {
    if (userSearchQuery.length > 2) handleUserSearch(userSearchQuery);
  }, [userSearchQuery]);

  useEffect(() => {
    console.log("selectedUser", selectedUser);
    if (selectedUser) {
      setLoadingPosts(true);
      getPosts(
        "Search",
        (data) => {
          setPosts(data.data);
          setUserSearchQuery("");
          setUserList([]);
          setLoadingPosts(false);
        },
        (error) => {
          console.log(error);
        },
        1,
        selectedUser.id
      );
    }
  }, [selectedUser]);

  return (
    <div className="w-full relative min-h-screen flex pb-8 pt-8 dark:bg-[#000924]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col w-[70rem] gap-4 dark:bg-[#000D38] p-4 md:mx-10 flex-1 rounded-xl border dark:border-[#00387E] dark:text-white">
        {joinRaceFormVisible && (
          <JoinRace
            raceName={selectedRaceName}
            closeForm={setJoinRaceFormVisible}
            race_id={selectedRaceId}
          />
        )}
        {/* Title */}
        {/* <h2 className="font-semibold text-[1.5rem] font-poppins">Engage</h2> */}
        {/* Content Section */}
        <div className="flex items-start justify-center m-2 w-full gap-3">
          {/* Left Section - Post Creation + Posts */}
          <div className="flex items-start justify-center m-2 w-full gap-5">
            <div className="flex-1 flex flex-col gap-5 px-2">
              {/* Post Creation Box */}
              <div className="dark:bg-[#002763] border dark:border-0 rounded-xl flex flex-col gap-4 p-4 w-full">
                <div className="flex gap-4 p-5 w-full">
                  {/* User Avatar */}
                  <div className="rounded-full w-16 h-16 bg-gray-300 overflow-hidden">
                    <img
                      alt="userImg"
                      src={
                        userDetails?.photo?.path ||
                        userDetails?.profilePic?.path ||
                        (userDetails?.gender && userDetails?.gender == "female"
                          ? femalePlaceholder
                          : malePlaceholder)
                      }
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Input & Actions */}
                  <div className="flex flex-col gap-3 flex-1 relative">
                    {/* Input Box */}
                    <textarea
                      type="text"
                      value={postContent}
                      onChange={handleCommentChange}
                      className="rounded-xl px-4 py-3 resize-none max-h-[180px] notificationScrollbar bg-slate-200 dark:bg-[#001B51] text-white placeholder-gray-400 focus:outline-none "
                      placeholder="Start a post..."
                    />

                    {/* Actions (Media, Emoji, etc.) */}
                    <div className="flex items-center justify-evenly dark:text-white">
                      <button
                        className="hover:text-gray-300 transition-all flex items-center gap-1"
                        onClick={() =>
                          document.getElementById("bannerUpload").click()
                        }
                      >
                        <input
                          type="file"
                          accept="image/*"
                          id="bannerUpload"
                          className="hidden"
                          onChange={handleImageUpload}
                          ref={fileRef}
                        />
                        <CiImageOn size={24} /> Image
                      </button>

                      <button
                        onClick={() => {
                          setShowGifPicker(!showGifPicker);
                        }}
                        className="hover:text-gray-300 transition-all flex items-center gap-1"
                      >
                        <CiImageOn size={24} /> GIF
                      </button>

                      {/* <button className="hover:text-gray-300 transition-all flex items-center gap-1">
      <IoDocumentTextOutline size={24} /> Article
    </button> */}

                      {/* Emoji Toggle Button */}
                    </div>
                    {bannerImg && (
                      <img
                        src={bannerImg}
                        alt="Banner Preview"
                        className="max-h-[36rem] mt-3 w-fit rounded-lg"
                      />
                    )}

                    {showSuggestions && tagSuggestions.length > 0 && (
                      <ul className="absolute left-4 bottom-[110%] bg-white dark:bg-[#1c1c1c] text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md shadow-lg w-64 max-h-40 overflow-y-auto z-50">
                        {tagSuggestions.map((tag, idx) => (
                          <li
                            key={idx}
                            onClick={() => insertTag(tag)}
                            className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                          >
                            {tag.split("<-->")[0]}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Emoji Picker */}
                    {showEmojiPicker && (
                      <div
                        ref={emojiPickerRef}
                        className="absolute top-[3.5rem] -right-24 z-50"
                      >
                        <EmojiPicker
                          onEmojiClick={handleEmojiClick}
                          theme="dark"
                        />
                      </div>
                    )}

                    {showGifPicker && (
                      <div
                        ref={gifPickerRef}
                        className="absolute top-[6rem] left-28 z-50 w-96 bg-white dark:bg-[#001B51] p-3 rounded-xl shadow-xl"
                      >
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
                          {gifResults?.map((gif) => (
                            <img
                              key={gif.id}
                              src={gif.images.fixed_height_small.url}
                              alt={gif.title}
                              className="cursor-pointer rounded-md hover:scale-105 transition-all"
                              onClick={() => {
                                setBannerImg(gif.images.original.url);
                                setShowGifPicker(false);
                                setSelectedFile(null);
                                setGifSearch("");
                                setGifResults([]);
                                fileRef.current.value = "";
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="hover:text-gray-300 transition-all flex gap-1"
                  >
                    <FaSmile size={48} />
                  </button>

                  <button
                    onClick={() => sendPost()}
                    disabled={!postContent?.trim()}
                    className={`dark:text-white p-2 rounded-full h-12 w-12 flex items-center justify-center transition-all 
                  ${
                    postContent?.trim()
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  >
                    <BsFillSendFill size={20} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border dark:border-0 dark:bg-[#002763] dark:text-white font-semibold">
                {/* Sticky Navigation Tabs */}
                <div className="sticky top-0 z-10 flex items-center justify-center gap-2 w-full ">
                  {tabs
                    .map((tab, index) => (
                      <span
                        key={index}
                        className={`cursor-pointer transition-all ${
                          activeTab === tab && !selectedUser
                            ? "text-blue-400"
                            : "dark:text-gray-300"
                        }`}
                        onClick={() => {
                          setSelectedUser(null);
                          setActiveTab(tab);
                        }}
                      >
                        {tab}
                      </span>
                    ))
                    .reduce(
                      (prev, curr) =>
                        prev === null
                          ? [curr]
                          : [
                              ...prev,
                              <span
                                key={`sep-${prev.length}`}
                                className="text-gray-500"
                              >
                                {" "}
                                |{" "}
                              </span>,
                              curr,
                            ],
                      null
                    )}
                </div>
                {/* User Search */}
                <div className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border dark:border-0 dark:bg-[#002763] dark:text-white font-semibold">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-4 py-2 relative rounded-lg bg-slate-200 dark:bg-[#001B51] text-white placeholder-gray-400 focus:outline-none"
                    value={userSearchQuery}
                    onChange={(e) => {
                      setUserSearchQuery(e.target.value);
                    }}
                  />
                  {/* User search results dropdown */}
                  {userSearchQuery.length > 2 && userList.length > 0 && (
                    <div className="absolute top-[21rem] w-full notificationScrollbar max-w-[28rem] bg-white dark:bg-[#001B51] border border-gray-300 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
                      {userList.map((user) => (
                        <div
                          key={user.id}
                          className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-[#00387E] cursor-pointer flex items-center gap-2"
                          onClick={() => {
                            setSelectedUser(user);
                          }}
                        >
                          <img
                            src={
                              user?.photo?.path
                                ? user.photo.path
                                : user?.gender === "female"
                                ? femalePlaceholder
                                : malePlaceholder
                            }
                            alt={user.firstName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span>
                            {user.firstName} {user.lastName}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Posts Section (Scrollable) */}
              <div className="overflow-y-auto flex flex-col gap-5">
                {selectedUser && (
                  <div>
                    <h3 className="text-xl font-semibold dark:text-slate-300">
                      Posts by {selectedUser?.firstName}{" "}
                      {selectedUser?.lastName}
                    </h3>
                  </div>
                )}
                {/* Posts List */}
                {posts && posts.length > 0 ? (
                  <>
                    {posts.map((post) => (
                      <Post
                        key={post.id}
                        postData={post}
                        commentVisibility={false}
                        likesArray={userLikes}
                        setLikesArray={setUserLikes}
                      />
                    ))}

                    {/* Loader sentinel for infinite scroll */}
                    <div
                      ref={loaderRef}
                      className="h-10 flex justify-center items-center"
                    >
                      {loadingPosts && (
                        <ColorRing
                          visible={true}
                          height="40"
                          width="40"
                          ariaLabel="color-ring-loading"
                          wrapperStyle={{}}
                          wrapperClass="color-ring-wrapper"
                          colors={["#e15b64", "#f47e60"]}
                        />
                      )}
                    </div>
                  </>
                ) : loadingPosts ? (
                  <div className="flex items-center justify-center">
                    <ColorRing
                      visible={true}
                      height="65"
                      width="65"
                      ariaLabel="color-ring-loading"
                      wrapperStyle={{}}
                      wrapperClass="color-ring-wrapper"
                      colors={["#e15b64", "#f47e60"]}
                    />
                  </div>
                ) : (
                  <div className="text-center text-gray-500 mt-10">
                    No posts yet.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Top Leaders & Top Stocks */}
          <div className="w-96 flex flex-col items-center justify-center gap-5 mt-1">
            {/* Top Leaders Section */}
            <div className="dark:bg-[#002763] p-4 rounded-xl w-full dark:text-white overflow-y-auto flex flex-col gap-4">
              {/* Section Title */}
              <h3 className="text-xl font-semibold dark:text-slate-300">
                Follow Experts
              </h3>

              {/* Leaders List */}
              {loadingExperts ? (
                <div className="flex items-center justify-center">
                  <ColorRing
                    visible={true}
                    height="65"
                    width="65"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={["#e15b64", "#f47e60"]}
                  />
                </div>
              ) : (
                <div className="flex-1 flex flex-col gap-1">
                  {expertsToFollow.map((leader) => {
                    const leaderId = leader?.user?.id;

                    const isFollowed =
                      Array.isArray(followees) && followees.includes(leaderId);

                    return (
                      <div
                        key={leaderId}
                        onClick={() => {
                          navigate(`/userprofile/${leaderId}`);
                        }}
                        className="flex cursor-pointer items-center justify-between px-3 py-1 group"
                      >
                        {/* User Image */}
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-300">
                          <img
                            src={leader?.user?.photo?.path}
                            alt={leader?.user?.firstName}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* User Info */}
                        <div className="flex flex-col flex-1 ml-3">
                          <span className="text-md font-semibold">
                            {leader?.user?.firstName} {leader?.user?.lastName}
                          </span>
                        </div>

                        {/* Follow/Unfollow Button */}
                        <button
                          className={`p-2 z-10 ml-3 border-2 border-[#00387E] rounded-xl dark:hover:bg-[#00387E] transition ${
                            isFollowed ? "hidden group-hover:block" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFollow(isFollowed, leader);
                          }}
                        >
                          {isFollowed ? (
                            <FaMinusCircle className=" text-red-500 hidden group-hover:block" />
                          ) : (
                            <FaPlusCircle className="text-green-500" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              <div
                onClick={() => {
                  navigate("/leaderboard");
                }}
                className="w-full mx-auto dark:text-slate-300 text-center text-lg font-semibold cursor-pointer"
              >
                Show More
              </div>
            </div>

            {/* Top Stocks Section */}
            <div className="dark:bg-[#002763] p-3 rounded-xl w-full dark:text-white overflow-y-auto flex flex-col gap-4">
              {/* Section Title */}
              <h3 className="text-xl font-semibold dark:text-slate-300">
                Upcoming Races
              </h3>

              {/* Stocks List */}
              {loadingRaces ? (
                <div className="flex items-center justify-center">
                  <ColorRing
                    visible={true}
                    height="65"
                    width="65"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={["#e15b64", "#f47e60"]}
                  />
                </div>
              ) : (
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
              )}

              <div
                onClick={() => {
                  navigate("/allraces", { state: "Upcoming Races" });
                }}
                className="w-full mx-auto dark:text-slate-400 text-center text-lg font-semibold cursor-pointer"
              >
                Show More
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
