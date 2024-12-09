import React from 'react'
import badges from '../../assets/images/badges.png'
import diamond from '../../assets/images/diamondIcon.svg'
import { FiArrowUpRight } from "react-icons/fi";
import Person from '../../assets/images/person2.png'


const UserProfile = () => {

    const dummyData = [
        {
            "race_id": "R001",
            "image": Person,
            "product_name": "Running Shoes",
            "price": 79.99,
            "total_sales": 1500,
            "stock": 35,
            "status": "In Stock"
        },
        {
            "race_id": "R002",
            "image": Person,
            "product_name": "Fitness Tracker",
            "price": 59.99,
            "total_sales": 1200,
            "stock": 10,
            "status": "Out of Stock"
        },
        {
            "race_id": "R003",
            "image": Person,
            "product_name": "Wireless Earbuds",
            "price": 49.99,
            "total_sales": 800,
            "stock": 25,
            "status": "In Stock"
        }
    ]


    return (
        <>
            <div className='grid grid-cols-3 md:grid-cols-5 gap-4 dark:text-white'>
                <div className='col-span-3 rounded-lg grid gap-4 grid-cols-2 grid-rows-2'>
                    <div className="col-span-1 row-span-1 bg-white rounded-lg p-[1.5rem] flex gap-8 dark:bg-[#001B51] dark:border dark:border-[#00387E]">
                        <div className='h-full'>
                            <img src={diamond} alt="" />
                        </div>
                        <div className='flex flex-col gap-[8px]'>
                            <p className='text-[1rem]'>Total Points</p>
                            <p className='text-[1.5rem]'>15,000,000</p>
                            <div className='flex font-semibold gap-2 rounded-full border border-green-600 justify-start self-start items-center px-2 py-1'>
                                <FiArrowUpRight color="green" size={15} />
                                <p className="text-green-600">4.8%</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 row-span-1 bg-white rounded-lg p-[1.5rem] flex gap-8 dark:bg-[#001B51] dark:border dark:border-[#00387E] dark:text-white">
                        <div className='flex flex-col gap-[8px]'>
                            <p className='text-[1rem]'>Win Rate</p>
                            <p className='text-[1.5rem] font-bold'>7590</p>
                            <div className='flex font-semibold gap-2 rounded-full border border-green-600 justify-start self-start items-center px-2 py-1'>
                                <FiArrowUpRight color="green" size={15} />
                                <p className="text-green-600">1.8%</p>
                            </div>
                        </div>
                        <div className='h-full'>
                            <img src={diamond} alt="" />
                        </div>
                    </div>

                    <div className="col-span-2 row-span-1 rounded-lg flex justify-between gap-4 bg-white p-[1.5rem] dark:bg-[#001B51] dark:border dark:border-[#00387E] dark:text-white">
                        <div className="flex-1 rounded-lg">
                            <p className="text-[1rem]">Race Participated</p>
                            <p className="text-[1.5rem] font-semibold">450</p>
                        </div>
                        <div className="flex-1 rounded-lg">
                            <p className="text-[1rem]">Best Stock</p>
                            <p className="text-[1.5rem] font-semibold">Apple</p>
                        </div>
                        <div className="flex-1 rounded-lg">
                            <p className="text-[1rem]">Best Prediction</p>
                            <p className="text-[1.5rem] font-semibold">Google</p>
                        </div>
                    </div>
                </div>
                <div className='col-span-2 bg-white rounded-lg p-[1.5rem] flex justify-center items-center flex-col dark:bg-[#001B51] dark:border dark:border-[#00387E] dark:text-white'>
                    <p className="mb-[8px] text-[1rem] self-start">Achievements</p>
                    <div>
                        <img src={badges} alt="" />
                    </div>
                </div>
            </div>


            {/* table is remaining  */}
            <div className='w-full p-4 bg-[#001B51] dark:border dark:border-[#00387E] rounded-[20px]'>
                <table className="table border-separate border-spacing-0 w-full text-left dark:text-white">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="py-4 dark:text-[#898989] text-[0.9rem]">Race ID</th>
                            <th className="py-4 dark:text-[#898989] text-[0.9rem]">Image</th>
                            <th className="py-4 dark:text-[#898989] text-[0.9rem]">Product </th>
                            <th className="py-4 dark:text-[#898989] text-[0.9rem]">Price</th>
                            <th className="py-4 dark:text-[#898989] text-[0.9rem]">Total Sales</th>
                            <th className="py-4 dark:text-[#898989] text-[0.9rem]">Stock</th>
                            <th className="py-4 dark:text-[#898989] text-[0.9rem]">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            dummyData?.map((curr, index) => {

                                return (
                                    <tr key={index} className="odd:bg-transparent even:bg-[#00276] pb-2 dark:border-b">
                                        <th className="py-3">{curr.race_id}</th>
                                        <td className="py-3">
                                            <div className='w-14 h-14 rounded-xl overflow-hidden'>
                                                <img className='w-full h-full object-cover' src={Person} alt="" />
                                            </div>
                                        </td>
                                        <td className="text-[1.1rem] py-3">{curr.product_name}</td>
                                        <td className="text-[1.1rem] py-3">{curr.price}</td>
                                        <td className="text-[1.1rem] py-3">{curr.total_sales}</td>
                                        <td className="text-[1.1rem] py-3">{curr.stock}</td>
                                        <td className="text-[1.1rem] py-3 flex justify-start items-center">
                                            <div className='text-green-600 bg-opacity-25 font-medium self-start bg-green-600 border-green-700 border px-2 rounded-full'>
                                                WIN
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UserProfile