import React from "react";

const AllPopup = ({
  title,
  message = "You dont have a profile",
  setPopupVisible,
  extra = () => {},
}) => {
  return (
    <div className="fixed w-full h-screen top-0 left-0 z-[100] bg-black bg-opacity-50 grid place-items-center">
      <div className="p-4 rounded-lg bg-white shadow-xl relative grid place-items-center w-[20rem] dark:bg-[#002763]">
        <h3 className="w-full text-center font-bold text-[2rem] dark:text-white mb-4 pb-[10px] border-b-2 border-opacity-35 border-b-white ">
          {title}
        </h3>
        <hr />
        <p className="w-full text-center text-xl dark:text-white mb-4">
          {message}
        </p>
        <button
          onClick={() => {
            setPopupVisible(false);
            extra(false);
          }}
          className="hover:underline text-[rgba(225,225,225,0.6)] cursor-pointer"
        >
          back
        </button>
      </div>
    </div>
  );
};

export default AllPopup;
