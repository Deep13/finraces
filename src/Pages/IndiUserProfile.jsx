import React, { useEffect, useLayoutEffect, useState } from "react";
import coin from "../assets/images/coin2.png";
import Sidebar from "../Components/Sidebar";
import UserProfile from "../Sections/Profile/UserProfile";
import Person from "../assets/images/person2.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getAllBadges,
  getFolloweeCount,
  getFollowersCount,
  getUser,
  sendFriendRequest,
} from "../Utils/api";
import avatarplaceholder from "../assets/images/avatarplaceholder.png";
import malePlaceholder from "../assets/images/manPlaceholder.jpg";
import femalePlaceholder from "../assets/images/womanPlaceholder.jpg";
import {
  checkFriendRequestStatus,
  unfriend,
  blockUser,
  unblockUser,
  getUsersBlockStatus,
  getFollowers,
  getFollowing,
  getFriendsCount,
} from "../Utils/api";
import NoProfilePopup from "../Components/NoProfilePopup";
import friends from "../assets/icons/friends_Icon.png";
import followers from "../assets/icons/followers_Icon.png";
import followees from "../assets/icons/followee_Icon.png";
import AnimatedNumber from "../Components/AnimatedNumber";
import { useCommunity } from "../Contexts/CommunityProvider";

const IndiUserProfile = () => {
  const [requestSent, setRequestSent] = useState(false);
  const [buttonsVisiblity, setButtonsVisiblity] = useState(true);
  const [requestStatus, setRequestStatus] = useState("");
  const [blockStatus, setBlockStatus] = useState("");
  const [blockId, setBlockId] = useState("");
  const thisLocation = useLocation();
  const { user_id } = useParams();
  const [details, setDetails] = useState({
    userName: "Burt Macklin",
    email: "person.trader@email.com",
    image: Person,
  });
  const [userDetails, setUserDetails] = useState({});
  const [reqSent, setReqSent] = useState(false);
  const [noProfilePopup, setNoProfilePopup] = useState(false);
  const navigate = useNavigate();
  const [friendsCount, setFriendsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [badges, setBadges] = useState([]);

  const { setSelectedUser } = useCommunity();
  const sd = localStorage.getItem("fin_userDetails");
  let selfDetails = sd && JSON.parse(atob(sd));

  const requestFriend = () => {
    user_id &&
      sendFriendRequest(user_id, (data) => {
        // console.log("Request Sent", data)
        setRequestStatus(data.status);
      });
  };

  const unfriendUser = () => {
    user_id &&
      unfriend(user_id, (data) => {
        console.log("Unfriend Status", data);
        // setRequestStatus(data.status)
      });
  };

  const blockUser1 = () => {
    blockUser(user_id, () => {
      console.log("Blocking the user Successful", user_id);
    });
  };
  const unblockUser1 = () => {
    unblockUser(blockId);
  };

  useLayoutEffect(() => {
    if (user_id === selfDetails?.userId) {
      navigate("/profile");
    }
    window.scrollTo(0, 0);
    console.log(user_id);
    const token = localStorage.getItem("token");

    getUser(user_id, (data) => {
      console.log(data);
      if (data.is_guest) {
        setNoProfilePopup(true);
      }
      getAllBadges(data.id, (data) => {
        console.log("all badges", data.data);
        setBadges(data.data);
      });
      setUserDetails(data);
    });
    token &&
      checkFriendRequestStatus(
        user_id,
        (data) => {
          console.log("Request Status", data.status);
          setRequestSent(data.status === "pending");
          setRequestStatus(data.status);
        },
        () => {
          setButtonsVisiblity(false);
        }
      );
    token &&
      getUsersBlockStatus(user_id, (data) => {
        console.log("users block status", data);
        setBlockStatus(data.status);
        setBlockId(data.id);
      });

    getFriendsCount(
      user_id,
      (data) => {
        setFriendsCount(data);
      },
      (error) => {
        console.log(error);
      }
    );
    getFollowersCount(
      user_id,
      (data) => {
        setFollowersCount(data);
      },
      (error) => {
        console.log(error);
      }
    );

    getFolloweeCount(
      user_id,
      (data) => {
        setFollowingCount(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <>
      {noProfilePopup && (
        <NoProfilePopup
          setPopupVisible={setNoProfilePopup}
          message={"Profile for the user is not available"}
        />
      )}
      <div className="w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]">
        {/* Ensure sidebar is inside a container with sufficient height */}
        <Sidebar />

        <div className="flex-1 px-[2%] md:px-[6%]">
          <div className="w-full rounded-xl bg-slate-200 p-4 flex flex-col gap-4 dark:bg-[#000D38]">
            {/* profile picture and buttons  */}
            <div className="flex gap-4 flex-wrap">
              <div className=" overflow-hidden">
                <div className="relative w-[15rem] overflow-hidden h-[15rem] rounded-lg group">
                  <img
                    loading="lazy"
                    className="w-full h-full object-cover"
                    src={
                      userDetails?.photo?.path
                        ? userDetails?.photo?.path
                        : userDetails?.gender == "female"
                        ? femalePlaceholder
                        : malePlaceholder
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="flex-1 bg-white rounded-lg p-[1.5rem] flex items-center justify-between dark:bg-[#001B51] dark:border dark:border-[#00387E]">
                <div className="flex flex-col gap-[0.75rem]">
                  {userDetails?.firstName && (
                    <p className="font-semibold text-[2rem] dark:text-white">
                      {userDetails?.firstName + " " + userDetails?.lastName}
                    </p>
                  )}
                  {userDetails?.email && (
                    <p className="font-semibold text-[1rem] -mt-4 text-slate-500 dark:text-white">
                      {userDetails?.email}
                    </p>
                  )}
                  {/* <p className="font-semibold text-[1rem] dark:text-white">AKA Samuel <span className="ml-3">L.A, Calirfonia</span></p> */}
                  <div className="self-start flex gap-4">
                    {/* XP card here  */}

                    {/* <div>
                                            <img src={coin} alt="" />
                                        </div> */}

                    {badges.length > 0 && (
                      <div className="py-[0.5rem] px-[0.8rem] bg-slate-200 rounded-xl flex gap-[7px] dark:bg-[#002763] dark:text-white">
                        <div className="font-semibold text-[0.9rem] flex flex-col">
                          <p className="font-semibold text-[0.9rem]">
                            {badges[badges.length - 1]?.badge?.name
                              .charAt(0)
                              .toUpperCase() +
                              badges[badges.length - 1]?.badge?.name.slice(1)}
                          </p>
                        </div>
                      </div>
                    )}
                    {/* <p className="font-semibold text-[0.9rem]">250 XP</p> */}

                    {/* <div className="flex gap-2 items-center">
                                        <div className="rounded-full bg-green-700 w-2 h-2 dark:bg-green-500" />
                                        <p className="font-bold text-[1rem] text-green-700 dark:text-green-500">Currently Online</p>
                                    </div> */}
                  </div>
                </div>
                <div className="flex justify-between md:justify-end gap-10 flex-wrap dark:text-white">
                  {/* Following */}
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={followees}
                      alt="Followers"
                      className="w-16 h-16 md:w-20 md:h-20"
                    />
                    <div className="flex flex-col items-center">
                      <div className="text-lg md:text-xl font-semibold">
                        Following
                      </div>
                      <div className="text-base md:text-lg">
                        <AnimatedNumber to={followingCount} duration={1.5} />
                      </div>
                    </div>
                  </div>

                  {/* Followers */}
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={followers}
                      alt="Followers"
                      className="w-16 h-16 md:w-20 md:h-20"
                    />
                    <div className="flex flex-col items-center">
                      <div className="text-lg md:text-xl font-semibold">
                        Followers
                      </div>
                      <div className="text-base md:text-lg">
                        <AnimatedNumber to={followersCount} duration={1.5} />
                      </div>
                    </div>
                  </div>

                  {/* Friends */}
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={friends}
                      alt="Friends"
                      className="w-16 h-16 md:w-20 md:h-20"
                    />
                    <div className="flex flex-col items-center">
                      <div className="text-lg md:text-xl font-semibold">
                        Friends
                      </div>
                      <div className="text-base md:text-lg">
                        <AnimatedNumber to={friendsCount} duration={1.5} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {selfDetails && selfDetails.userId && (
                <div className="flex flex-col gap-3 justify-end">
                  <button
                    onClick={() => {
                      setSelectedUser(userDetails);
                      navigate("/community");
                    }}
                    className={
                      "w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px] dark:border-[#00387E] dark:text-white"
                    }
                  >
                    Posts
                  </button>
                  {blockStatus && blockStatus === "unblocked" && (
                    <button
                      onClick={() => {
                        blockUser1();
                        setBlockStatus("blocked"); // optimistic update
                      }}
                      className={
                        "w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px] dark:border-[#00387E] dark:text-white"
                      }
                    >
                      Block
                    </button>
                  )}
                  {blockStatus && blockStatus === "blocked" && (
                    <button
                      onClick={() => {
                        blockId.length > 0 && unblockUser1();
                        blockId.length > 0 && setBlockStatus("unblocked");
                      }}
                      className={
                        "w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px] dark:border-[#00387E] dark:text-white"
                      }
                    >
                      Unblock
                    </button>
                  )}
                  {(requestStatus === "not initiated" ||
                    requestStatus === "unfriend") &&
                    !requestSent && (
                      <button
                        onClick={() => {
                          requestFriend();
                          setRequestSent(true);
                        }}
                        className={
                          "w-[9rem] flex justify-center items-center py-[12.25px] bg-blue-600 text-white font-semibold rounded-[70px] text-[14px] dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF]"
                        }
                      >
                        Add Friend
                      </button>
                    )}
                  {requestStatus === "accepted" && (
                    <button
                      onClick={() => {
                        console.log("unfriend pressed");
                        unfriendUser();
                      }}
                      className={
                        "w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px] dark:border-[#00387E] dark:text-white"
                      }
                    >
                      Unfriend
                    </button>
                  )}
                  {requestStatus === "pending" && (
                    <button
                      onClick={() => {}}
                      className={
                        "w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px] dark:border-[#00387E] dark:text-white"
                      }
                    >
                      Request Sent
                    </button>
                  )}
                  <button
                    onClick={() => {}}
                    className={
                      "w-[9rem] flex justify-center items-center py-[12.25px] border-[#00387e] border rounded-[70px] text-[14px] dark:border-[#00387E] dark:text-white"
                    }
                  >
                    Message
                  </button>
                </div>
              )}
            </div>
            <UserProfile userId={user_id} badges={badges} />
          </div>
        </div>
      </div>
    </>
  );
};

export default IndiUserProfile;
