import { BiUpArrowAlt } from "react-icons/bi";
import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../Contexts/DarkModeProvider";

const StockWatchlistCard = ({ data }) => {
    const { setSelectedStock } = useContext(DarkModeContext);
    const navigate = useNavigate();

    // console.log("StockWatchlistCard Data:", data); // Debugging

    if (!data) {
        return <p>Loading stock data...</p>;  // Handle missing data
    }

    return (
        <div 
            onClick={() => {
                setSelectedStock(data);
                if(localStorage.getItem('token')){
                    navigate(`/stock/${data.ticker}/${data.id}`);
                }
            }} 
            className='cursor-pointer bg-[#e5f4ff] w-[15rem] h-[10rem] min-w-[15rem] p-4 dark:text-white dark:bg-[#002763] rounded-xl shadow-lg dark:shadow-none border-[#00387E] flex flex-col gap-[9px] justify-between mr-3'
        >
            {/* Name with icon */}
            <div className='flex justify-between items-center w-full'>
                <div className='flex gap-2 items-center'>
                    {/* Stock Icon */}
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <img className="w-full h-full object-cover" src={data.icon_url} alt={data.ticker} />
                    </div>
                    <div className='text-[0.9rem] font-semibold'>{data.ticker}</div>
                </div>
                {/* <BiUpArrowAlt size={25} color="green" /> */}
            </div>

            {/* Stock Name */}
            <div className="font-semibold dark:text-white text-[0.7rem]">{data.name}</div>

            {/* Stock Price */}
            <div className="flex gap-2">
                <p className="dark:text-white text-[0.9rem] font-poppins font-semibold">
                    {data.price !== null ? `${data.price}$` : "N/A"}
                </p>
            </div>
        </div>
    );
};

export default StockWatchlistCard;
