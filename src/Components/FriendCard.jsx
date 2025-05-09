import { HiOutlineChevronDown } from "react-icons/hi";
import React, { useContext } from "react";
import malePlaceholder from "../assets/images/manPlaceholder.jpg";
import femalePlaceholder from "../assets/images/womanPlaceholder.jpg";
import { DarkModeContext } from "../Contexts/DarkModeProvider";
import { useNavigate } from "react-router-dom";
import { FiMinusCircle } from "react-icons/fi";
import { unfollowUser } from "../Utils/api";

const FriendCard = ({
  name = "Burt Macklin",
  id = 87451,
  role,
  image = malePlaceholder,
  email = "burt.macklin@gmail.com",
  gender = "",
  allowUnfollow = false,
  onUnfollowClick,
}) => {
  const { darkModeEnabled } = useContext(DarkModeContext);
  const navigate = useNavigate();
  let userId = JSON.parse(atob(localStorage.getItem("fin_userDetails"))).userId;

  if (gender == "female") {
    image = femalePlaceholder;
  }

  return (
    <div
      onClick={() => {
        if (id === userId) {
          navigate(`/profile`);
          return;
        }

        navigate(`/userprofile/${id}`, {
          state: {
            userName: name,
            email,
            image,
          },
        });
      }}
      className="p-[10px] cursor-pointer rounded-[20px] h-[4.2rem] justify-between w-[17rem] bg-slate-200 dark:bg-[#002763] flex shadow-lg dark:shadow-none items-center gap-[20px] group"
    >
      <div className="flex gap-3">
        <div className="h-full w-12 rounded-xl overflow-hidden bg-white">
          <img
            className="aspect-square w-12 h-12 object-cover"
            src={image}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-between">
          <p className="text-[0.9rem] font-semibold dark:text-white">{name}</p>
          <p className="text-[0.9rem] font-semibold dark:text-white">{role}</p>
        </div>
        {allowUnfollow && (
          <div className="hidden group-hover:flex">
            <FiMinusCircle
              color="red"
              size={28}
              className="cursor-pointer ml-10 mt-2"
              onClick={(e) => {
                e.stopPropagation();
                onUnfollowClick(id, name);
              }}
            />
          </div>
        )}
      </div>
      {/* <HiOutlineChevronDown size={24} color={darkModeEnabled ? 'white' : 'black'} /> */}
    </div>
  );
};

export default FriendCard;
