import React from 'react'
import { ColorRing } from 'react-loader-spinner'
import UserRankingCard from './UserRankingCard'

const UserRankingList = ({
    rankList
}) => {
    return (
        <div className="w-full flex flex-col gap-[9px] items-center overflow-auto">
            {
                rankList ?
                    rankList?.map((curr, index) =>
                        <UserRankingCard
                            key={curr.user_id}
                            userName={curr.user_name}
                            userRank={curr.rank}
                            lastItem = {rankList?.length === index}
                        />) :
                    <ColorRing
                        visible={true}
                        height="25"
                        width="25"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
            }
        </div>
    )
}

export default UserRankingList