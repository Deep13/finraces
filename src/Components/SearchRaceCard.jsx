import { useNavigate } from 'react-router-dom';
import facebook from '../assets/images/facebook.svg'


const SearchRaceCard = ({
  name = 'Abstract race',
  stocksData,
  image = facebook,
  id,
  exitSearch
}) => {

  const navigate = useNavigate()

  return (
    <div onClick={() => {
      navigate(`/race/${id}`)
      exitSearch(false)
      location.reload()
    }} className="p-[10px] cursor-pointer rounded-[20px] w-[11.6rem] bg-[#002763] flex gap-3 shadow-lg dark:shadow-none">
      <div className="h-[3rem] w-[3rem] rounded-xl overflow-hidden bg-white">
        <img className="w-full h-full object-cover" src={image} alt={name} />
      </div>
      <div className="flex flex-col justify-center flex-1">
        <p className="text-[0.9rem] font-semibold dark:text-white line-clamp-2">{name}</p>
        {/* <p className="text-[0.7rem] font-semibold dark:text-white">{stocks}</p> */}
      </div>
    </div>
  );
};

export default SearchRaceCard
