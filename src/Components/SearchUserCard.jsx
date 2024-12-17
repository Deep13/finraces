const SearchUserCard = ({ user }) => {
    return (
        <div className="p-[10px] rounded-[20px] w-[11.6rem] bg-[#002763] flex gap-5 shadow-lg dark:shadow-none">
            <div className="h-full w-10 rounded-xl overflow-hidden">
                <img className="w-full h-full object-cover" src={user.image} alt={user.name} />
            </div>
            <div className="flex flex-col justify-between">
                <p className="text-[0.9rem] font-semibold dark:text-white">{user.name}</p>
                <p className="text-[0.9rem] font-semibold dark:text-white">{user.role}</p>
            </div>
        </div>
    );
};


export default SearchUserCard