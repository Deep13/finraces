import React from 'react'
import { ColorRing } from 'react-loader-spinner'
import StockPriceCard from './StockPriceCard'

const StockRankList = ({
    stockRankList
}) => {
      
    return (
        <div className="flex-1 flex justify-start gap-[10px] custom-scrollbar overflow-auto">
            {
                stockRankList ?
                    stockRankList?.map((curr, index) => {
                        return (<StockPriceCard
                            key={curr.stock_id}
                            stockName={curr.stock_name}
                            rank={index+1}
                            percentChange={curr.percent_change}
                            stockId={curr.stock_id}
                            stockLastRate={curr.stock_last_rate}
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
        </div>
    )
}

export default StockRankList