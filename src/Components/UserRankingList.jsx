import React from 'react'
import { ColorRing } from 'react-loader-spinner'
import UserRankingCard from './UserRankingCard'

const UserRankingList = ({
    rankList,status=""
}) => {
    
    console.log('Ranklist item structure', rankList?.[0])


    return (
        <div className="w-full flex flex-col gap-[9px] items-center overflow-auto">
            {
                rankList ?
                    (
                        status=="f"?rankList?.map((curr, index) =>
                            <UserRankingCard
                                key={index}
                                pos={index}
                                id={curr.user.id}
                                total={rankList.length}
                                userName={curr.user.firstName+" "+curr.user.lastName}
                                userPhoto={curr.user.photo.path}
                                userRank={index+1}
                                lastItem={rankList?.length === index}
                            />) :
                            rankList?.map((curr, index) =>
                                <UserRankingCard
                                    key={index}
                                    pos={index}
                                    id={curr.user_id}
                                    total={rankList.length}
                                    userName={curr.user_name}
                                    userPhoto={curr.user_photo}
                                    userRank={curr.rank}
                                    lastItem={rankList?.length === index}
                                />) 
                    ):
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