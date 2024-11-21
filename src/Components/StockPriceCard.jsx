import React from 'react'
import fb from '../assets/images/facebook.svg'

const StockPriceCard = ({
  stockName = 'AnyStock',
  rank = 1,
  percentChange = 50,
  stockId = 'asfdsfalkfl',
  stockLastRate = '445',
  imageUrl,
  tickerName
}) => {
  return (
    <div className='h-auto w-[11rem] rounded-[10px] py-[0.9rem] px-[0.8rem] border border-solid border-[#e1e4e5] flex flex-col gap-[0.7rem] flex-shrink-0 bg-[#f5f5f5]'>
      <div className='flex justify-between w-full items-center'>
        <div className='font-semibold text-[1.1rem]'>{rank}. {tickerName}</div>
        <div className='w-8 h-8 overflow-hidden border border-black rounded-full'>
          {imageUrl && <img src={imageUrl} alt="" />}
          {!imageUrl && <div className='grid place-items-center font-bold text-blace bg-blue-300 text-white w-full h-full'>{tickerName?.substring(0, 2)}</div>}
          {/* image is needed  */}
        </div>
      </div>
      <p className='font-semibold text-[0.7rem] line-clamp-2'>{stockName}</p>
      {/* url of company is needed  */}
      <p className='text-[1.3rem] font-medium'>${parseFloat(stockLastRate).toFixed(3)}</p>
      {/* last price  */}
      <p className={`font-semibold text-[0.9rem] ${percentChange > 0 ? 'text-[#15af4d]' : 'text-[#ff0000]'}`}>{parseFloat(percentChange).toFixed(3)}%</p>
      {/* percent change  */}
    </div>
  )
}

export default StockPriceCard