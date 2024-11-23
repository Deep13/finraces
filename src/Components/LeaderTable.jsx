import { Table } from 'antd'
import React from 'react'
import person from '../assets/images/person2.png'

const LeaderTable = () => {

    const formatRanks = (data) => {
        return data.map((item) => ({
            ...item,
            rank: String(item.rank).padStart(3, '0'), // Format rank to 3 digits
        }));
    }


    const dataSource = [
        {
            key: '1',
            rank: 1,
            player: {
                name: 'Lewis Hamilton',
                imageUrl: person,
                userName: 'hamilton44',
            },
            mostRacesWon: 10,
            totalPoints: 350,
        },
        {
            key: '2',
            rank: 2,
            player: {
                name: 'Max Verstappen',
                imageUrl: person,
                userName: 'verstappen33',
            },
            mostRacesWon: 8,
            totalPoints: 340,
        },
        {
            key: '3',
            rank: 3,
            player: {
                name: 'Sebastian Vettel',
                imageUrl: person,
                userName: 'vettel5',
            },
            mostRacesWon: 6,
            totalPoints: 300,
        },
        {
            key: '4',
            rank: 4,
            player: {
                name: 'Fernando Alonso',
                imageUrl: person,
                userName: 'alonso14',
            },
            mostRacesWon: 5,
            totalPoints: 280,
        },
    ];

    const columns = [
        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank',
            render: (data) => {
                return (
                    <div className='text-center'>
                        {data}
                    </div>
                )
            }
        },
        {
            title: 'Player',
            dataIndex: 'player',
            key: 'player',
            render: (data) => {
                return (
                    <div className='flex gap-3'>
                        <div className=" w-10 h-10 rounded-full overflow-hidden">
                            <img className='h-full w-full object-cover' src={data.imageUrl} alt={data.userName} />
                        </div>
                        <div className="flex flex-col">
                            <p className='font-semibold text-lg'>{data.name}</p>
                            <p className='font-light text-sm'>{data.userName}</p>
                        </div>
                    </div>
                )
            }
        },
        {
            title: 'Most Races Won',
            dataIndex: 'mostRacesWon',
            key: 'mostRacesWon',
        },
        {
            title: 'Total Points',
            dataIndex: 'totalPoints',
            key: 'totalPoints',
        },
    ];

    const updatedDataSource = formatRanks(dataSource);

    return (
        <div>
            <Table
                // showHeader={false}
                rowClassName={(record, index) => index % 2 === 0 ? 'bg-[#ffffff]' : 'bg-[#f5f5f5]'}
                dataSource={updatedDataSource}
                pagination={false}
                columns={columns} />
        </div>
    )
}

export default LeaderTable