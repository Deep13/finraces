import React from "react";
import { ColorRing } from "react-loader-spinner";
import StockPriceCard from "./StockPriceCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../Components/ui/carousel";
import { useNavigate } from "react-router-dom";

const StockRankList = ({ stockRankList, stocksData }) => {
  const navigate = useNavigate();

  const renderCard = (stock, rank = null) => {
    if (!stock) return null;

    const {
      id,
      name,
      ticker,
      icon_url: imageUrl,
      price: stockLastRate,
    } = stock;

    return (
      <StockPriceCard
        key={id}
        stockName={name}
        tickerName={name}
        ticker={ticker}
        rank={rank}
        percentChange={null} // If needed from stockRankList
        stockId={id}
        stockLastRate={stockLastRate}
        imageUrl={imageUrl}
        onClick={() => {
          navigate(`/stock/${ticker}/${id}`);
        }}
        className="cursor-pointer"
      />
    );
  };

  return (
    <Carousel
      opts={{
        align: "start",
        slidesToShow: 3,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
      }}
      className="mb-20"
    >
      <CarouselContent className="ml-1 w-full">
        {stockRankList && Array.isArray(stockRankList) ? (
          stockRankList.map((curr, index) => {
            const stock =
              stocksData && typeof stocksData === "object"
                ? stocksData[curr.stock_id]
                : null;

            return (
              <StockPriceCard
                key={curr.stock_id}
                stockName={stock?.name}
                tickerName={curr.stock_name}
                ticker={curr.stock_ticker}
                rank={index + 1}
                percentChange={curr.percent_change}
                stockId={curr.stock_id}
                stockLastRate={curr.stock_last_rate}
                imageUrl={stock?.icon_url}
                onClick={() => {
                  navigate(`/stock/${curr.stock_ticker}/${curr.stock_id}`);
                }}
                className="cursor-pointer"
              />
            );
          })
        ) : stocksData && typeof stocksData === "object" ? (
          Object.values(stocksData).map((stock, index) =>
            renderCard(stock, index + 1)
          )
        ) : (
          <ColorRing
            visible={true}
            height="25"
            width="25"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60"]}
          />
        )}
      </CarouselContent>
      <CarouselPrevious className="dark:bg-white" />
      <CarouselNext className="dark:bg-white" />
    </Carousel>
  );
};

export default StockRankList;
