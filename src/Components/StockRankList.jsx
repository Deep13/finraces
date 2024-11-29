import React from 'react'
import { ColorRing } from 'react-loader-spinner'
import StockPriceCard from './StockPriceCard'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const StockRankList = ({
    stockRankList, // this is coming from socket connection
    stocksData // this is coming from api
}) => {

    return (
        // <div className="flex-1 flex justify-start gap-[10px] custom-scrollbar overflow-auto">
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full">
            <CarouselContent className='ml-2'>
                {
                    stockRankList ?
                        stockRankList?.map((curr, index) => {
                            let stock = stocksData[Object.keys(stocksData).find(element => element === curr.stock_id)]
                            let imageUrl = stock.icon_url
                            let name = stock.name
                            // console.log(stock)
                            return (<StockPriceCard
                                key={curr.stock_id}
                                stockName={name}
                                tickerName={curr.stock_name}
                                rank={index + 1}
                                percentChange={curr.percent_change}
                                stockId={curr.stock_id}
                                stockLastRate={curr.stock_last_rate}
                                imageUrl={imageUrl}
                            />)
                        }) :
                        <ColorRing
                            visible={true}
                            height="25"
                            width="25"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#e15b64', '#f47e60',]}
                        />
                }
            </CarouselContent>
            <CarouselPrevious className='dark:bg-white' />
            <CarouselNext className='dark:bg-white' />
        </Carousel>
        // </div>
    )
}

export default StockRankList