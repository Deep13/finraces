import React, { useContext } from "react";
import compass from "../assets/icons/sidebar/compass.svg";
import compassdark from "../assets/icons/sidebar/compassdark.svg";
import finance_idea from "../assets/icons/sidebar/finance_idea.svg";
import finance_ideadark from "../assets/icons/sidebar/financeideadark.svg";
import stats from "../assets/icons/sidebar/stats.svg";
import statsdark from "../assets/icons/sidebar/statsdark.svg";
import expertsBlack from "../assets/icons/sidebar/eth.svg";
import expertsWhite from "../assets/icons/sidebar/ethdark.svg";
import live_streaming from "../assets/icons/sidebar/live_streaming.svg";
import livestreamingdark from "../assets/icons/sidebar/livestreamingdark.svg";
import recent from "../assets/icons/sidebar/recent.svg";
import recentdark from "../assets/icons/sidebar/recentdark.svg";
import { DarkModeContext } from "../Contexts/DarkModeProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { MdCompare, MdGroups } from "react-icons/md";

const Sidebar = () => {
  const { darkModeEnabled, setShowLoginForm } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const searchParams = new URLSearchParams(location.search);

  const isExactActive = (route) => pathname === route;
  const getAllRacesType = () => searchParams.get("type");
  const isAllRacesType = (type) =>
    pathname === "/allraces" && getAllRacesType() === type;

  const inactiveClass =
    "text-black dark:text-white bg-[#e5f4ff] dark:bg-[#001a50]";
  const activeGlow =
    "dark:text-white drop-shadow-[0_0_0.4rem_#e5f4ff] bg-[#e5f4ff] dark:bg-[#001a50] dark:text-white";
  const baseClass =
    "w-[3.35rem] h-[4.1rem] rounded-[10px] gap-[5px] text-[0.545rem] flex flex-col justify-center items-center transition-all duration-300";

  const ud = localStorage.getItem("fin_userDetails");

  const handleNavigation = (nav) => {
    switch (nav) {
      case "Watchlist":
        if (!ud) setShowLoginForm(true);
        else navigate("/stockComparison");
        break;

      case "My Races":
        if (!ud) setShowLoginForm(true);
        else navigate("/blogs");
        break;

      case "Ongoing":
        navigate("/allraces?type=Ongoing", { state: "Ongoing Races" });
        break;

      case "Upcoming":
        navigate("/allraces?type=Upcoming", { state: "Upcoming Races" });
        break;

      case "Discover":
        navigate("/");
        break;
    }
  };

  return (
    <div className="w-[4rem] flex-shrink-0 relative left-4 z-[9]">
      <div
        className={`sticky top-24 left-6 transition-transform ease-out duration-300 flex flex-col gap-[0.7rem] z-[10]`}
      >
        {/* Discover */}
        <button
          onClick={() => handleNavigation("Discover")}
          className={`${baseClass} ${
            isExactActive("/") ? activeGlow : inactiveClass
          }`}
        >
          <img src={darkModeEnabled ? compassdark : compass} alt="discover" />
          Discover
        </button>

        {/* Community */}
        <button
          onClick={() => {
            if (!ud) {
              setShowLoginForm(true);
            } else {
              navigate("/community");
            }
          }}
          className={`${baseClass} ${
            isExactActive("/community") ? activeGlow : inactiveClass
          }`}
        >
          <MdGroups size={24} />
          Engage
        </button>

        {/* Stocks */}
        <button
          onClick={() => navigate("/market")}
          className={`${baseClass} ${
            isExactActive("/market") ? activeGlow : inactiveClass
          }`}
        >
          <img src={darkModeEnabled ? statsdark : stats} alt="stocks" />
          Stocks
        </button>

        {/*Leaderboard */}
        <button
          onClick={() => navigate("/leaderboard")}
          className={`${baseClass} ${
            isExactActive("/leaderboard") ? activeGlow : inactiveClass
          }`}
        >
          <img
            src={darkModeEnabled ? expertsWhite : expertsBlack}
            alt="stocks"
          />
          Experts
        </button>

        {/* Live Races */}
        <button
          onClick={() => handleNavigation("Ongoing")}
          className={`${baseClass} ${
            isAllRacesType("Ongoing") ? activeGlow : inactiveClass
          }`}
        >
          <img
            src={darkModeEnabled ? livestreamingdark : live_streaming}
            alt="live races"
          />
          Live Races
        </button>

        {/* Upcoming Races */}
        <button
          onClick={() => handleNavigation("Upcoming")}
          className={`${baseClass} ${
            isAllRacesType("Upcoming") ? activeGlow : inactiveClass
          }`}
        >
          <img
            src={darkModeEnabled ? recentdark : recent}
            alt="upcoming races"
          />
          Upcoming Races
        </button>

        {/* My Races */}
        <button
          onClick={() => handleNavigation("My Races")}
          className={`${baseClass} ${
            isExactActive("/blogs") ? activeGlow : inactiveClass
          }`}
        >
          <img
            src={darkModeEnabled ? finance_ideadark : finance_idea}
            alt="my races"
          />
          Blogs
        </button>

        {/* Compare Stocks */}
        <button
          onClick={() => handleNavigation("Watchlist")}
          className={`${baseClass} ${
            isExactActive("/stockComparison") ? activeGlow : inactiveClass
          }`}
        >
          <MdCompare size={24} />
          Compare Stocks
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
