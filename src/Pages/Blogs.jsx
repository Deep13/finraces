import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import blogImg from "../assets/images/blogImg1.png";
import { getBlogCategories, getBlogs } from "../Utils/api";

const Blogs = () => {
  const [blogCategories, setBlogCategories] = useState([]);
  const [raceBlogs, setRaceBlogs] = useState(null);
  const [stockBlogs, setStockBlogs] = useState(null);
  const [cryptoBlogs, setCryptoBlogs] = useState(null);
  const [investingBlogs, setInvestingBlogs] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [famousBlogs, setFamousBlogs] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getBlogCategories(
      (data) => {
        setBlogCategories(data.data);

        const categories = data.data;

        // Auto-select the first category for Famous Blogs
        if (categories.length > 0) {
          const firstCategory = categories[0];
          setSelectedCategory(firstCategory.id);
          getBlogs(
            (data) => {
              setFamousBlogs(data.data);
              if (data.data.length > 0) {
                setFeaturedBlog(data.data[0]);
              } else {
                setFeaturedBlog(null);
              }
            },
            (error) => console.log(error),
            firstCategory.id
          );
        }

        // Handle Races/Stocks/Crypto fetch
        const racesCategory = categories.find(
          (cat) => cat.name.toLowerCase() === "races"
        );
        const stocksCategory = categories.find(
          (cat) => cat.name.toLowerCase() === "stocks"
        );
        const cryptoCategory = categories.find(
          (cat) => cat.name.toLowerCase() === "crypto"
        );
        const investingCategory = categories.find(
          (cat) => cat.name.toLowerCase() === "investing"
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
        if (investingCategory) {
          getBlogs(
            (data) => {
              setInvestingBlogs(data.data.slice(0, 4));
            },
            (error) => console.log(error),
            investingCategory.id
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);

    if (categoryId) {
      getBlogs(
        (data) => {
          setFamousBlogs(data.data);
          if (data.data.length > 0) {
            setFeaturedBlog(data.data[0]);
          } else {
            setFeaturedBlog(null);
          }
        },
        (error) => console.log(error),
        categoryId
      );
    }
  };

  const getTextFromHTML = (html) => {
    var plainString = html.replace(/<[^>]+>/g, '');
    plainString = plainString.replaceAll('&nbsp', '');
    return plainString;
  }


  const renderBlogs = (blogs) => {
    return blogs.length > 0 ? blogs.map((blog, idx) => (
      <div key={idx} className="cursor-pointer flex flex-col gap-3 rounded-2xl" onClick={() => navigate(`/blog/${blog.id}`)}>
        <div className="h-40 w-full">
          {/* Show the blog image path if available */}
          <img
            src={blog?.image?.path || blogImg}
            className="w-full h-full object-cover rounded-2xl"
            alt={blog.title}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-semibold text-lg">{blog.title.length > 90 ? `${blog.title.slice(0, 90)}...` : blog.title}</div>
          <div className="text-slate-600 dark:text-slate-300 line-clamp-2">
            {/* Display the first 100 characters of the content */}
            {blog.content ? `${getTextFromHTML(blog.content).slice(0, 100)}...` : ""}
          </div>
          <div
            className="cursor-pointer font-semibold text-blue-400"
            onClick={() => navigate(`/blog/${blog.id}`)}
          >
            Read Now
          </div>
        </div>
      </div>
    )) : (
      <div className="text-slate-400">No blogs available in this category.</div>
    );
  };



  return (
    <div className="w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924]">
      <Sidebar />

      <div className="flex flex-col w-[70rem] gap-5 dark:bg-[#000D38] py-5 md:px-10 mx-[1rem] md:mx-[7rem] flex-1 rounded-xl border dark:border-[#00387E] dark:text-white">
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
            <div className="font-semibold text-xl">Races</div>
            <div
              onClick={() =>
                navigate("/allBlogs?type=Races", {
                  state: "Races",
                })
              }
              className="font-light text-sm text-slate-300 cursor-pointer"
            >
              Show More
            </div>
          </div>
          <div className="w-full grid grid-cols-4 gap-5">
            {raceBlogs ? raceBlogs.length > 0 ? (
              renderBlogs(raceBlogs)
            ) : (
              <div className="text-slate-400 w-[200%] flex items-center justif-center">No blogs in this category. Be the first to write one.</div>
            ) : <div className="text-slate-400">Loading blogs...</div>}
          </div>
        </div>

        {/* Stocks Section */}
        <div className="border px-5 py-3 dark:border-[#000D38] dark:text-white dark:bg-[#001B51] rounded-2xl p-2 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">Stocks</div>
            <div
              className="font-light text-sm text-slate-300 cursor-pointer"
              onClick={() =>
                navigate("/allBlogs?type=Stocks", {
                  state: "Stocks",
                })
              }
            >
              Show More
            </div>
          </div>
          <div className="w-full grid grid-cols-4 gap-5">
            {stockBlogs ? stockBlogs.length > 0 ? (
              renderBlogs(stockBlogs)
            ) : (
              <div className="text-slate-400 w-[200%] flex items-center justif-center">No blogs in this category. Be the first to write one.</div>
            ) : <div className="text-slate-400 w-[200%] flex items-center justif-center">Loading blogs...</div>}
          </div>
        </div>

        {/* Investment Blogs Section */}
        <div className="border px-5 py-3 dark:border-[#000D38] dark:text-white dark:bg-[#001B51] rounded-2xl p-2 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">Investment</div>
            <div
              className="font-light text-sm text-slate-300 cursor-pointer"
              onClick={() =>
                navigate("/allBlogs?type=Crypto", {
                  state: "Crypto",
                })
              }
            >
              Show More
            </div>
          </div>
          <div className="w-full grid grid-cols-4 gap-5">
            {investingBlogs ? investingBlogs.length > 0 ? (
              renderBlogs(investingBlogs)
            ) : (
              <div className="text-slate-400 w-[200%] flex items-center justif-center">No blogs in this category. Be the first to write one.</div>
            ) : <div className="text-slate-400 w-[200%] flex items-center justif-center">Loading blogs...</div>}
          </div>
        </div>

        {/* Trending Blogs - Crypto */}
        <div className="border px-5 py-3 dark:border-[#000D38] dark:text-white dark:bg-[#001B51] rounded-2xl p-2 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-xl">Crypto</div>
            <div
              className="font-light text-sm text-slate-300 cursor-pointer"
              onClick={() =>
                navigate("/allBlogs?type=Crypto", {
                  state: "Crypto",
                })
              }
            >
              Show More
            </div>
          </div>
          <div className="w-full grid grid-cols-4 gap-5">
            {cryptoBlogs ? cryptoBlogs.length > 0 ? (
              renderBlogs(cryptoBlogs)
            ) : (
              <div className="text-slate-400 w-[200%] flex items-center justif-center">No blogs in this category. Be the first to write one.</div>
            ) : <div className="text-slate-400 w-[200%] flex items-center justif-center">Loading blogs...</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
