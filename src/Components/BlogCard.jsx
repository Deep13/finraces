import {useNavigate} from 'react-router-dom';

const BlogCard = ({ data }) => {
  const navigate=useNavigate();
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white dark:bg-[#001B4E] p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="h-40 w-full">
        <img
          src={data.image}
          alt="Blog"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-semibold text-lg dark:text-white">{data.title}</div>
        <div className="text-slate-600 dark:text-slate-300 line-clamp-2 text-sm">
          {data.description}
        </div>
        <div onClick={()=>{navigate('/blog/1')}} className="cursor-pointer font-semibold text-blue-600 dark:text-blue-400 hover:underline text-sm">
          Read Now
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
