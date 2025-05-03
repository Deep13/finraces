import { BiChevronRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom"
import StockWatchlistCard from "../../Components/StockComparisonCard";
import StockChart from "../../Components/StockChart";

const Comparison = () => {
    const navigate=useNavigate();
    const labels=[
            "2025-04-03",
            "2025-04-04",
            "2025-04-07",
            "2025-04-08",
            "2025-04-09",
            "2025-04-10",
            "2025-04-11",
            "2025-04-14",
            "2025-04-15",
            "2025-04-16",
            "2025-04-17",
            "2025-04-21",
            "2025-04-22",
            "2025-04-23",
            "2025-04-24",
            "2025-04-25",
            "2025-04-28",
            "2025-04-29",
            "2025-04-30",
            "2025-05-01",
            "2025-05-02"
        ]
    const dataset=[
        {
            "label": "TSLA",
            "data": [
                267.28,
                239.43,
                233.29,
                221.86,
                272.2,
                252.4,
                252.31,
                252.35,
                254.11,
                241.55,
                241.37,
                227.5,
                237.97,
                250.74,
                259.51,
                284.95,
                285.88,
                292.03,
                282.16,
                280.52,
                287.21
            ],
            "borderColor": "#00E396",
            "backgroundColor": "#00E39633",
            "fill": false
        },
        {
            "label": "AMZN",
            "data": [
                178.41,
                171,
                175.26,
                170.66,
                191.1,
                181.22,
                184.87,
                182.12,
                179.59,
                174.33,
                172.61,
                167.32,
                173.18,
                180.6,
                186.54,
                188.99,
                187.7,
                187.39,
                184.42,
                190.2,
                189.98
            ],
            "borderColor": "#FEB019",
            "backgroundColor": "#FEB01933",
            "fill": false
        },
        {
            "label": "NFLX",
            "data": [
                917.05,
                855.86,
                867.83,
                870.4,
                945.47,
                921.17,
                918.29,
                931.28,
                976.28,
                961.63,
                973.03,
                987.91,
                1040.34,
                1049.59,
                1096.87,
                1101.53,
                1110.38,
                1125.64,
                1131.72,
                1133.47,
                1156.49
            ],
            "borderColor": "#FF4560",
            "backgroundColor": "#FF456033",
            "fill": false
        },
        {
            "label": "AAPL",
            "data": [
                203.19,
                188.38,
                181.46,
                172.42,
                198.85,
                190.42,
                198.15,
                202.52,
                202.14,
                194.27,
                196.98,
                193.16,
                199.74,
                204.6,
                208.37,
                209.28,
                210.14,
                211.21,
                212.5,
                213.32,
                205.35
            ],
            "borderColor": "#775DD0",
            "backgroundColor": "#775DD033",
            "fill": false
        }
    ]
  return (
    <div className='max-w-[1400px] relative mb-[3.3rem]'>
          <a onClick={() => navigate('/stockComparison', { state: 'Ongoing Races' })} className='absolute right-0 top-2 text-[#8d8d8d] text-[0.94rem] font-semibold hover:underline flex items-center' href="">
            Compare more <BiChevronRight size={18} />
          </a>
          <h2 className='text-[2.14rem] text-center font-bold mb-[1.4rem] dark:text-white'>Compare Stocks</h2>
          <div className="flex flex-col gap-5 ml-10">
            <div className='w-full flex gap-5 items-center justify-center'>
                <StockWatchlistCard data={{
                    "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/AAPL_icon.png",
                    "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/AAPL.svg",
                    "price": 205.04,
                    "type": "CS",
                    "primary_exchange": "XNAS",
                    "market": "stocks",
                    "currency_name": "usd",
                    "active": true,
                    "name": "Apple Inc.",
                    "ticker_root": null,
                    "ticker": "AAPL",
                    "id": "4fc93602-a51a-4220-a55a-6a1e291adf66",
                    "createdAt": "2025-02-23T11:25:09.248Z",
                    "updatedAt": "2025-02-23T11:25:09.248Z"
                }}/>
                        <StockWatchlistCard data={{
        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png",
        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg",
        "price": 288.08,
        "type": "CS",
        "primary_exchange": "XNAS",
        "market": "stocks",
        "currency_name": "usd",
        "active": true,
        "name": "Tesla, Inc. Common Stock",
        "ticker_root": null,
        "ticker": "TSLA",
        "id": "c2b7f3d7-702a-4837-b4d3-a1899edcf8f9",
        "createdAt": "2025-02-23T11:38:50.932Z",
        "updatedAt": "2025-02-23T11:38:50.932Z"
    }}/>
                        <StockWatchlistCard data={{
        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/AMZN_icon.jpeg",
        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/AMZN.svg",
        "price": 189.9,
        "type": "CS",
        "primary_exchange": "XNAS",
        "market": "stocks",
        "currency_name": "usd",
        "active": true,
        "name": "Amazon.Com Inc",
        "ticker_root": null,
        "ticker": "AMZN",
        "id": "3bd7ebff-bf79-4cfd-a2ec-e729460f187a",
        "createdAt": "2025-02-23T11:26:01.191Z",
        "updatedAt": "2025-02-23T11:26:01.191Z"
    }}/>
                        <StockWatchlistCard data={{
        "icon_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/NFLX_icon.jpeg",
        "logo_url": "https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/NFLX.svg",
        "price": 1154.08,
        "type": "CS",
        "primary_exchange": "XNAS",
        "market": "stocks",
        "currency_name": "usd",
        "active": true,
        "name": "NetFlix Inc",
        "ticker_root": null,
        "ticker": "NFLX",
        "id": "57a0e048-43de-4c41-84b7-9bea41de5fe6",
        "createdAt": "2025-02-23T11:34:41.343Z",
        "updatedAt": "2025-02-23T11:34:41.343Z"
    }}/>
            </div>
            <div className="h-[30rem] w-4/5 bg-[#e4eaf0]  dark:bg-[#001a50] flex rounded-xl py-2 px-5 mx-auto">
                <StockChart labels={labels} datasets={dataset}/>
            </div>
          </div>
    </div>
  )
}

export default Comparison
