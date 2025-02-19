import Sidebar from "../Components/Sidebar";
import { FaPlay } from "react-icons/fa";
import cardImg from '../assets/images/card_video_image.png'
import cardBigImg from '../assets/images/stonks2.png'
import { IoNewspaperOutline } from "react-icons/io5";

const Learn = () => {
  return (
    <div className="w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]">
      <Sidebar />

      <div className="dark:bg-[#000D38] flex flex-1 flex-col mx-[1rem] md:mx-[7rem] py-5 md:px-10 rounded-xl border dark:border-[#00387E] dark:text-white">
        {/* Section 1: Learn the Basics */}
        
        <div className= "h-[30rem] mb-5 dark:bg-[#002763] rounded-lg p-5">
            <span className="text-[1rem] gap-1 font-poppins flex flex-row items-center mb-5">
            <IoNewspaperOutline/>
                Learn the Basics
            </span>

            <div className="relative h-72 bg-gray-700 rounded-lg">
            {/* Video Thumbnail */}
            <img
              src={cardBigImg}
              alt="Learn the Basics"
              className="w-full h-full object-cover rounded-lg"
            />
            {/* Play Button */}
            <FaPlay className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white bg-black bg-opacity-50 p-2 rounded-full" />
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-bold text-slate-200">Learn the Basics</h2>
            <p className="text-slate-200 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              euismod, nulla id tincidunt ultricies, urna lorem luctus sapien,
              eget tempus lorem lectus et risus.
            </p>
          </div>
        </div>
        <div className= "h-[22rem] mb-5 dark:bg-[#002763] rounded-lg p-5">
            <span className="text-[1rem] gap-1 font-poppins flex flex-row items-center mb-5">
                <IoNewspaperOutline/>
                How does it work ?
            </span>

            <div className="flex justify-between items-center ">
                <div className=" rounded-lg h-40 w-[23%]">
                    <img
                        src={cardImg}
                        alt="Learn the Basics"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="mt-4">
                        <h2 className="text-lg font-bold text-slate-200">Learn the Basics</h2>
                        <p className="text-slate-400 mt-1 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                </div>
                <div className=" rounded-lg h-40 w-[23%]">
                    <img
                        src={cardImg}
                        alt="Learn the Basics"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="mt-4">
                        <h2 className="text-lg font-bold text-slate-200">Learn the Basics</h2>
                        <p className="text-slate-400 mt-1 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                </div>
                <div className=" rounded-lg h-40 w-[23%]">
                    <img
                        src={cardImg}
                        alt="Learn the Basics"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="mt-4">
                        <h2 className="text-lg font-bold text-slate-200">Learn the Basics</h2>
                        <p className="text-slate-400 mt-1 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                </div>
                <div className=" rounded-lg h-40 w-[23%]">
                    <img
                        src={cardImg}
                        alt="Learn the Basics"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="mt-4">
                        <h2 className="text-lg font-bold text-slate-200">Learn the Basics</h2>
                        <p className="text-slate-400 mt-1 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className= "h-[22rem] mb-5 dark:bg-[#002763] rounded-lg p-5">
            <span className="text-[1rem] gap-1 font-poppins flex flex-row items-center mb-5">
                <IoNewspaperOutline/>
                How does it work ?
            </span>

            <div className="flex justify-between items-center ">
                <div className=" rounded-lg h-40 w-[23%]">
                    <img
                        src={cardImg}
                        alt="Learn the Basics"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="mt-4">
                        <h2 className="text-lg font-bold text-slate-200">Learn the Basics</h2>
                        <p className="text-slate-400 mt-1 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                </div>
                <div className=" rounded-lg h-40 w-[23%]">
                    <img
                        src={cardImg}
                        alt="Learn the Basics"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="mt-4">
                        <h2 className="text-lg font-bold text-slate-200">Learn the Basics</h2>
                        <p className="text-slate-400 mt-1 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                </div>
                <div className=" rounded-lg h-40 w-[23%]">
                    <img
                        src={cardImg}
                        alt="Learn the Basics"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="mt-4">
                        <h2 className="text-lg font-bold text-slate-200">Learn the Basics</h2>
                        <p className="text-slate-400 mt-1 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                </div>
                <div className=" rounded-lg h-40 w-[23%]">
                    <img
                        src={cardImg}
                        alt="Learn the Basics"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="mt-4">
                        <h2 className="text-lg font-bold text-slate-200">Learn the Basics</h2>
                        <p className="text-slate-400 mt-1 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                </div>
            </div>
        </div>
       
      </div>
    </div>
  );
};

export default Learn;
