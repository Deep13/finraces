import { useNavigate } from 'react-router-dom';
import placeholder from '../assets/images/person2.png'

const SearchUserCard = ({
    name = "Some Name",
    image = placeholder,
    id,
    exitSearch,
    // role = "default"

}) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => {
            navigate(`/userprofile/${id}`)
            exitSearch(false)
            location.reload()
        }} className="p-[10px] rounded-[20px] w-[11.6rem] bg-[#002763] flex gap-5 shadow-lg dark:shadow-none cursor-pointer">
            <div className="h-[3rem] w-[3rem] rounded-xl overflow-hidden">
                <img className="w-full h-full object-cover" src={image} alt={name} />
            </div>
            <div className="flex flex-col justify-center flex-1">
                <p className="text-[0.9rem] font-semibold dark:text-white">{name}</p>
                {/* <p className="text-[0.9rem] font-semibold dark:text-white">{role}</p> */}
            </div>
        </div>
    );
};


export default SearchUserCard