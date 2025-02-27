import { BiUpArrowAlt } from "react-icons/bi";
import React, { useContext } from 'react'
import fb from '../assets/images/fb.svg'
import { useNavigate } from "react-router-dom";
import DarkModeProvider, { DarkModeContext } from "../Contexts/DarkModeProvider";


const StockWatchlistCard = (data) => {
    console.log("ok",data)
    const {setSelectedStock}=useContext(DarkModeContext)
    const navigate=useNavigate()
    return (
        <div onClick={() => {
            const stockData = {
            icon_url: "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
            logo_url: "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
            price: 297.46,
            type: "CS",
            primary_exchange: "XNAS",
            market: "stocks",
            currency_name: "usd",
            active: true,
            name: "Tesla, Inc. Common Stock",
            ticker_root: null,
            ticker: "TSLA",
            id: "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
            createdAt: "2025-02-23T11:38:50.932Z",
            updatedAt: "2025-02-23T11:38:50.932Z",
            };

            setSelectedStock(stockData);
            navigate(`/stock/${stockData.id}`);
        }} className=' cursor-pointer w-[15rem] h-[10rem]  min-w-[15rem] p-4 dark:text-white dark:bg-[#002763] rounded-xl shadow-lg dark:shadow-none border-[#00387E] flex flex-col gap-[9px] justify-between mr-3'>
            {/* name with icons and up down */}
            <div className='flex justify-between items-center w-full'>
                <div className='flex gap-2 items-center'>
                    {/* icon  */}
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <img className="w-full h-full object-cover" src={data.data.logo_url} alt={data.data.ticker} />
                    </div>
                    <div className='text-[0.9rem] font-semibold'>
                       {data.data.ticker}
                    </div>
                </div>
                <BiUpArrowAlt size={25} color="green" />
            </div>
            {/* website url  */}
            <div className="font-semibold dark:text-white text-[0.7rem]">
                {data.data.name}
            </div>
            {/* price previous and current  */}
            <div className="flex gap-2">
                {/* <p className="dark:text-white text-[0.9rem] font-poppins">$221</p> */}
                <p className="dark:text-white text-[0.9rem] font-poppins font-semibold">{data.data.price}$</p>
            </div>
            {/* <p className="text-green font-poppins">50%</p> */}

        </div>
    )
}

export default StockWatchlistCard