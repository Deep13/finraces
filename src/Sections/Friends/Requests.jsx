import React, { useEffect, useState } from 'react'
import RequestCard from '../../Components/RequestCard'
import { getAllPendingRequests } from '../../Utils/api'

const Requests = () => {

    const [requests, setRequests] = useState(null)

    const removeRequest = (id) => {
        setRequests(requests.filter((curr) => curr.id !== id))
    }

    useEffect(() => {
        getAllPendingRequests((data) => {
            console.log("All Pending Requests: ", data)
            setRequests(data.data)
        })
    }, [])

    return (
        <div className='w=full'>
            <div className='w-full flex flex-col gap-4 justify-start mb-3'>
                <p className='font-semibold text-[1.2rem]'>All Requests</p>
            </div>
            <div className='w-full flex flex-wrap justify-start gap-4'>
                {
                    requests?.length > 0 ?
                        requests?.map((curr, index) => {
                            return (
                                <RequestCard
                                    id={curr.id}
                                    key={curr.id}
                                    removeRequest={removeRequest}
                                    image={curr.sender.photo.path}
                                    name={curr.sender.firstName + " " + curr.sender.lastName}
                                    userId={curr.sender.id}
                                />
                            )
                        }) :
                        <p>No Pending Requests</p>
                }
            </div>
        </div>
    )
}

export default Requests