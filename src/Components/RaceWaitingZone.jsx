import { AiOutlineLeft, AiOutlineArrowLeft } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import React, { useContext, useEffect, useState } from "react";
import image from "../assets/images/illustration.svg";
import CountDownTimer from "../Components/CountDown";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { getFriends, sendRaceInvite } from "../Utils/api";
import { DarkModeContext } from "../Contexts/DarkModeProvider";
import JoinRace from "./JoinRace";
import {
  FacebookShareButton,
  WhatsappShareButton,
  RedditShareButton,
  FacebookIcon,
  WhatsappIcon,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
  MailruShareButton,
  XIcon,
} from "react-share";
import { MailIcon } from "lucide-react";

// Get current URL
const currentUrl = window.location.href;
const shareMessage = `Hey there,\nJoin this race on Finraces: ${currentUrl}`;

const RaceWaitingZone = ({
  closeCard = () => {},
  start_date,
  joinedUsersList,
  status,
  race_id,
  liveUsers,
  raceName,
}) => {
  const [isTimerFinished, setIsTimerFinished] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [inviteSent, setInviteSent] = useState(false);

  const ud = localStorage.getItem("fin_userDetails");
  const gd = localStorage.getItem("guest_details");
  const userDetails = ud && JSON.parse(atob(ud));
  const guestDetails = gd && JSON.parse(atob(gd));
  const det = userDetails || guestDetails;
  const navigate = useNavigate();

  const checkSelf = (id, firstName) => {
    if (id === det?.userId) {
      return "You have";
    }
    return `${firstName} has`;
  };

  useEffect(() => {
    if (status === "finished" || status === "running") {
      closeCard(true);
    }
  }, [status]);

  useEffect(() => {
    if (isTimerFinished && status !== "scheduled") {
      closeCard(true);
    }
  }, [isTimerFinished]);

  const [joinRaceFormVisible, setJoinRaceFormVisible] = useState(false);
  const { setShowLoginForm } = useContext(DarkModeContext);
  const hasJoined =
    joinedUsersList?.some((curr) => curr?.id === det?.userId) ||
    liveUsers?.some((curr) => curr?.id === det?.userId);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        exit={{ opacity: 0 }}
        className="fixed top-0 left-0 w-full h-screen py-[3%] backdrop-blur-md z-[100] grid place-items-center"
      >
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="bg-white rounded-md h-full py-[2rem] flex flex-col items-center px-[2rem] w-[25rem] shadow-lg relative"
        >
          <button onClick={closeCard} className="absolute top-3 right-3">
            <RxCross2 size={25} />
          </button>
          <h2 className="font-semibold text-[1.5rem] text-center mb-3 font-poppins">
            {raceName}
          </h2>
          <div>
            <img src={image} alt="" />
          </div>
          <p className="w-full text-center font-bold text-[#2177cb] uppercase mt-[1rem] text-[1.2rem]">
            Ready to launch in...
          </p>
          <CountDownTimer
            setIsTimerFinished={setIsTimerFinished}
            deadline={start_date}
          />

          {/* Friend search and selection */}
          {/* Friend search and selection */}
          {det &&
            (inviteSent ? (
              <div className="flex justify-center items-center flex-col my-4">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-xl">
                  ✓
                </div>
                <p className="text-green-600 font-semibold mt-2 text-xl">
                  Invite sent!
                </p>
                <p
                  onClick={() => setInviteSent(false)}
                  className="text-blue-500 hover:underline cursor-pointer text-sm"
                >
                  Invite More Friends
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-between mb-2 mt-4 w-full">
                <div>Invite your friends</div>
                <input
                  value={searchQuery}
                  onChange={(e) => {
                    const query = e.target.value;
                    setSearchQuery(query);

                    if (query.length > 0) {
                      getFriends(
                        (data) => {
                          setFriendList(data.data);
                        },
                        (error) => {
                          console.error("Error fetching friends:", error);
                          setFriendList([]);
                        },
                        query
                      );
                    } else {
                      setFriendList([]);
                    }
                  }}
                  className="w-52 h-8 rounded-xl dark:bg-white dark:text-black border-2 border-black px-2 mt-2"
                  placeholder="Search your friends..."
                  type="text"
                />

                <div className="w-[60%] max-h-40 overflow-y-auto mt-2">
                  {friendList?.length > 0
                    ? friendList
                        .filter((friend) =>
                          friend?.firstName
                            ?.toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                        .map((friend) => {
                          const isSelected = selectedFriends.some(
                            (f) => f.id === friend.id
                          );

                          return (
                            <div
                              key={friend.id}
                              onClick={() => {
                                setSelectedFriends((prev) =>
                                  isSelected
                                    ? prev.filter((f) => f.id !== friend.id)
                                    : [
                                        ...prev,
                                        {
                                          id: friend.id,
                                          name: `${friend.firstName} ${friend.lastName}`,
                                        },
                                      ]
                                );
                                setSearchQuery("");
                                setFriendList([]);
                              }}
                              className={`w-full px-4 py-2 cursor-pointer rounded-md flex justify-between items-center bg-gray-100 font-semibold hover:bg-gray-300`}
                            >
                              <span>
                                {friend.firstName} {friend.lastName}
                              </span>
                            </div>
                          );
                        })
                    : searchQuery.length > 0 && (
                        <p className="text-sm text-gray-400 text-center">
                          No friends found.
                        </p>
                      )}

                  {selectedFriends.length > 0 && (
                    <div className="mt-3 w-full">
                      <p className="font-semibold mb-1 text-center">
                        Selected Friends:
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center mb-2">
                        {selectedFriends.map(({ id, name }) => (
                          <div
                            key={id}
                            className="relative group bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium cursor-default"
                          >
                            {name}
                            <button
                              onClick={() =>
                                setSelectedFriends((prev) =>
                                  prev.filter((f) => f.id !== id)
                                )
                              }
                              className="absolute top-[-6px] right-[-6px] w-5 h-5 text-xs rounded-full bg-red-500 text-white hidden group-hover:flex items-center justify-center"
                              title="Remove"
                            >
                              −
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center">
                        <button
                          onClick={() => {
                            sendRaceInvite(
                              race_id,
                              selectedFriends,
                              () => {
                                setSelectedFriends([]);
                                setInviteSent(true);
                              },
                              (error) => {
                                console.log(error);
                              }
                            );
                          }}
                          className="bg-[#2177cb] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1a5ba0]"
                        >
                          Invite
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

          <div className="mt-4 w-full flex flex-col items-center mb-2">
            <p className="text-center font-semibold text-gray-700 mb-2">
              Share with friends
            </p>
            <div className="flex gap-4 justify-center">
              <WhatsappShareButton url={currentUrl} title="Join my race:">
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <FacebookShareButton url={currentUrl} quote="Join my race:">
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <RedditShareButton url={currentUrl} title="Join my race:">
                <RedditIcon size={32} round />
              </RedditShareButton>

              <TwitterShareButton url={currentUrl} title="Join my race:">
                <XIcon size={32} round />
              </TwitterShareButton>
              {/* <MailruShareButton url={currentUrl} title="Join my race:">
                <MailIcon size={32} round />
              </MailruShareButton> */}
            </div>
          </div>

          {/* Joined Users */}
          <p className="w-full text-center text-[#2177cb] uppercase text-[1.2rem] font-semibold font-poppins">
            Users joined : {joinedUsersList?.length + liveUsers?.length}
          </p>
          <div
            className="w-full flex-1 text-center flex flex-col items-center gap-[5px] overflow-y-auto joining-users max-h-60"
            style={{ maxHeight: "180px" }}
          >
            {joinedUsersList?.map((curr, index) => (
              <p key={index}>
                {checkSelf(curr?.id, curr?.firstName)} joined successfully
              </p>
            ))}
            {liveUsers?.map((curr, index) => (
              <p key={`live-${index}`}>
                {checkSelf(curr?.id, curr?.firstName)} joined successfully
              </p>
            ))}
          </div>

          <div className="flex items-center justify-center gap-10">
            {!hasJoined && (
              <div className="mt-3">
                <button
                  onClick={() => {
                    if (!userDetails) {
                      setShowLoginForm(true);
                    } else {
                      setJoinRaceFormVisible(true);
                    }
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
                >
                  Join Race
                </button>
              </div>
            )}

            {joinRaceFormVisible && (
              <JoinRace
                raceName={raceName}
                closeForm={() => setJoinRaceFormVisible(false)}
                race_id={race_id}
              />
            )}

            {/* Back Button */}
            <div
              onClick={() => {
                navigate("/allraces", { state: "Upcoming Races" });
              }}
              className="bg-[#2177cb] text-white p-2 rounded-lg font-semibold hover:underline cursor-pointer mt-4"
            >
              Back
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RaceWaitingZone;
