import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import blogImg from "../assets/images/blogImg1.png";
import { getBlogCategories, getBlogs } from "../Utils/api";

const Blogs = () => {
  const [blogCategories, setBlogCategories] = useState([]);
  const [raceBlogs, setRaceBlogs] = useState([]);
  const [stockBlogs, setStockBlogs] = useState([]);
  const [cryptoBlogs, setCryptoBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBlogCategories(
      (data) => {
        setBlogCategories(data.data);

        const categories = data.data;

        const racesCategory = categories.find(
          (cat) => cat.name.toLowerCase() === "races"
        );
        const stocksCategory = categories.find(
          (cat) => cat.name.toLowerCase() === "stocks"
        );
        const cryptoCategory = categories.find(
          (cat) => cat.name.toLowerCase() === "crypto"
        );

        if (racesCategory) {
          getBlogs(
            (data) => {
              setRaceBlogs(data.data.slice(0, 4));
            },
            (error) => console.log(error),
            racesCategory.id
          );
        }

        if (stocksCategory) {
          getBlogs(
            (data) => {
              setStockBlogs(data.data.slice(0, 4));
            },
            (error) => console.log(error),
            stocksCategory.id
          );
        }

        if (cryptoCategory) {
          getBlogs(
            (data) => {
              setCryptoBlogs(data.data.slice(0, 4));
            },
            (error) => console.log(error),
            cryptoCategory.id
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const renderBlogs = (blogs) => {
    return blogs.map((blog, idx) => (
      <div key={idx} className="flex flex-col gap-3 rounded-2xl">
        <div className="h-40 w-full">
          <img
            src={blog.coverImage || blogImg}
            className="w-full h-full object-cover rounded-2xl"
            alt={blog.title}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-semibold text-lg">{blog.title}</div>
          <div className="text-slate-600 dark:text-slate-300 line-clamp-2">
            {blog.description || "No description available."}
          </div>
          <div
            className="cursor-pointer font-semibold text-blue-400"
            onClick={() => navigate(`/blog/${blog.id}`)}
          >
            Read Now
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]">
      <Sidebar />

      <div className="flex flex-col w-[70rem] gap-2 dark:bg-[#000D38] py-5 md:px-10 mx-[1rem] md:mx-[7rem] flex-1 rounded-xl border dark:border-[#00387E] dark:text-white">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[1.5rem] font-poppins flex flex-row items-center">
            Blogs
          </span>
          <div
            onClick={() => {
              navigate("/write_blogs");
            }}
            className="px-3 py-1 cursor-pointer rounded-xl border dark:border-slate-300 dark:text-white dark:bg-[#001B51]"
          >
            Create Blog
          </div>
        </div>

        {/* Featured Blogs - Races */}
        <div className="border dark:border-[#000D38] dark:text-white dark:bg-[#001B51] rounded-2xl px-5 py-3 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">Featured Blogs</div>
            <div
              onClick={() =>
                navigate("/allBlogs?type=Featured", {
                  state: "Featured Blogs",
                })
              }
              className="font-light text-sm text-slate-300 cursor-pointer"
            >
              Show More
            </div>
          </div>
          <div className="w-full grid grid-cols-4 gap-5">
            {raceBlogs.length > 0 ? (
              renderBlogs(raceBlogs)
            ) : (
              <div className="text-slate-400">Loading blogs...</div>
            )}
          </div>
        </div>

        {/* My Blogs - Stocks */}
        <div className="border px-5 py-3 dark:border-[#000D38] dark:text-white dark:bg-[#001B51] rounded-2xl p-2 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">My Blogs</div>
            <div className="font-light text-sm text-slate-300 cursor-pointer">
              Show More
            </div>
          </div>
          <div className="w-full grid grid-cols-4 gap-5">
            {stockBlogs.length > 0 ? (
              renderBlogs(stockBlogs)
            ) : (
              <div className="text-slate-400">Loading blogs...</div>
            )}
          </div>
        </div>

        {/* Trending Blogs - Crypto */}
        <div className="border px-5 py-3 dark:border-[#000D38] dark:text-white dark:bg-[#001B51] rounded-2xl p-2 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">Trending Blogs</div>
            <div className="font-light text-sm text-slate-300 cursor-pointer">
              Show More
            </div>
          </div>
          <div className="w-full grid grid-cols-4 gap-5">
            {cryptoBlogs.length > 0 ? (
              renderBlogs(cryptoBlogs)
            ) : (
              <div className="text-slate-400">Loading blogs...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
