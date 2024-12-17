import { RxCross2 } from "react-icons/rx";
import { AiOutlineSearch } from "react-icons/ai";
import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../Contexts/DarkModeProvider";
import SearchRaceCard from "./SearchRaceCard";
import SearchUserCard from "./SearchUserCard";
import { motion } from "motion/react";
import person from '../assets/images/person2.png'
import facebook from '../assets/images/facebook.svg'


const usersData = [
    { id: 1, name: "Burt Macklin", role: "Ambassador", image: person },
    { id: 2, name: "Leslie Knope", role: "Manager", image: person },
    { id: 3, name: "Andy Dwyer", role: "Musician", image: person },
    { id: 4, name: "Ron Swanson", role: "Director", image: person },
    { id: 5, name: "April Ludgate", role: "Assistant", image: person },
    { id: 6, name: "Donna Meagle", role: "Investor", image: person },
    { id: 7, name: "Tom Haverford", role: "Entrepreneur", image: person },
    { id: 8, name: "Chris Traeger", role: "Health Coach", image: person },
    { id: 9, name: "Ben Wyatt", role: "Accountant", image: person },
    { id: 10, name: "Ann Perkins", role: "Nurse", image: person },
];

const racesData = [
    { id: 1, raceId: "Race 101", stocks: "10 stocks", image: facebook },
    { id: 2, raceId: "Race 102", stocks: "5 stocks", image: facebook },
    { id: 3, raceId: "Race 103", stocks: "8 stocks", image: facebook },
    { id: 4, raceId: "Race 104", stocks: "15 stocks", image: facebook },
    { id: 5, raceId: "Race 105", stocks: "20 stocks", image: facebook },
    { id: 6, raceId: "Race 106", stocks: "12 stocks", image: facebook },
    { id: 7, raceId: "Race 107", stocks: "7 stocks", image: facebook },
    { id: 8, raceId: "Race 108", stocks: "25 stocks", image: facebook },
    { id: 9, raceId: "Race 109", stocks: "18 stocks", image: facebook },
    { id: 10, raceId: "Race 110", stocks: "30 stocks", image: facebook },
];


const PopupSearch = ({ setPopupSearch }) => {
    const { darkModeEnabled } = useContext(DarkModeContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([])
    const [races, setRaces] = useState([])


    const handleSearchChange = (query) => {
        setSearchQuery(query);
        if (query === "") {
            setRaces([])
            setUsers([])
            return
        }
        const filteredRaces = racesData.filter(race =>
            race.name.toLowerCase().includes(query.toLowerCase())
        );
        const filteredUsers = usersData.filter(race =>
            race.name.toLowerCase().includes(query.toLowerCase())
        );
        setRaces(filteredRaces)
        setUsers(filteredUsers)

    };


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full h-screen backdrop-blur-md pt-24 pb-8 z-40 flex justify-center"
        >
            <div className="bg-transparent w-full rounded-xl">
                {/* Search bar */}
                <div className="flex gap-4 justify-center self-start items-center">
                    <div className="w-[30rem] bg-white dark:bg-[#001B51] dark:border dark:border-white self-start rounded-full px-3 py-3 flex gap-3">
                        <AiOutlineSearch color={darkModeEnabled ? "white" : "black"} size={24} />
                        <input
                            autoFocus
                            style={{ backgroundColor: "transparent" }}
                            placeholder="Search..."
                            className="flex-1 p-0 focus:outline-none"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setPopupSearch(false)}
                        className="aspect-square dark:bg-[#001a50] h-[2.35rem] grid place-items-center rounded-full"
                    >
                        <RxCross2 color={darkModeEnabled ? "white" : "black"} size={20} />
                    </button>
                </div>

                {/* Search results for users */}
                <div className="flex-1 pt-4 mb-4 flex flex-col gap-4 items-center">
                    <div className="max-w-[39rem] py-8 rounded-xl bg-[#001B51] p-4 flex justify flex-wrap gap-4">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <SearchUserCard key={user.id} user={user} />
                            ))
                        ) : (
                            <p className="text-white">No users found</p>
                        )}
                    </div>
                </div>

                {/* Search results for races */}
                <div className="flex-1 pt-4 mb-4 flex flex-col gap-4 items-center">
                    <div className="max-w-[39rem] py-8 rounded-xl bg-[#001B51] p-4 flex justify flex-wrap gap-4">
                        {races.length > 0 ? (
                            races.map((race) => (
                                <SearchRaceCard key={race.id} race={race} />
                            ))
                        ) : (
                            <p className="text-white">No races found</p>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PopupSearch;
