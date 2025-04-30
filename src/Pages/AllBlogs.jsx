import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from "../Components/Sidebar";
import BlogCard from '../Components/BlogCard';
import Pagination from '../Components/Pagination'
import blogImg from "../assets/images/blogImg1.png"

// Fake blog data
const blogData = Array.from({ length: 12 }, (_, i) => ({
  title: `Blog Title ${i + 1}`,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque...',
  image: blogImg,
}));

const AllBlogs = () => {
  const categories = {
    'My Blogs': 'My Blogs',
    'Trending Blogs': 'Trending Blogs',
    'Featured Blogs': 'Featured Blogs',
  };

  const thisLocation = useLocation();
  const [activeCategory, setActiveCategory] = useState(
    categories[thisLocation?.state?.toString()] || 'My Blogs'
  );
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [page,setPage]=useState(1);
  const [totalRaces,setTotalRaces]=useState(1);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleAuthorChange = (e) => {
    setSearchAuthor(e.target.value);
  };

  const handleTitleChange = (e) => {
    setSearchTitle(e.target.value);
  };

  return (
    <div className="w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924] min-h-[100vh]">
      <Sidebar />

      <div className="flex flex-col w-[70rem] gap-6 dark:bg-[#000D38] py-5 md:px-10 mx-[1rem] md:mx-[7rem] flex-1 rounded-xl border dark:border-[#00387E] dark:text-white">

        {/* <div className="flex items-center justify-between">
          <span className="font-semibold text-[1.5rem] font-poppins flex flex-row items-center">
            Blogs
          </span>
        </div> */}

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row gap-6 w-full">

          {/* Categories Section */}
          <div className="flex flex-col w-full">
            <label className="font-semibold mb-1 text-sm">Categories</label>
            <div className="flex overflow-x-auto gap-3 w-full pb-1">
              {Object.keys(categories).map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`flex-shrink-0 whitespace-nowrap dark:text-white justify-center items-center px-[0.9rem] py-[0.76rem] rounded-[70px] shadow-xl font-semibold text-[0.6rem] md:text-[0.94rem] 
                  ${activeCategory === category
                    ? 'bg-[#e5f4ff] dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff]'
                    : 'bg-white dark:bg-transparent dark:border dark:border-[#00387E]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Search by Title */}
          <div className="flex flex-col w-full md:max-w-[16rem]">
            <label className="font-semibold mb-1 text-sm">Search by Title</label>
            <input
              type="text"
              value={searchTitle}
              onChange={handleTitleChange}
              placeholder="Enter blog title..."
              className="w-full bg-white dark:bg-[#001B4E] text-black dark:text-white p-3 rounded-lg border dark:border-[#00387E] focus:outline-none"
            />
          </div>

          {/* Search by Author */}
          <div className="flex flex-col w-full md:max-w-[16rem]">
            <label className="font-semibold mb-1 text-sm">Search by Author</label>
            <input
              type="text"
              value={searchAuthor}
              onChange={handleAuthorChange}
              placeholder="Enter author name..."
              className="w-full bg-white dark:bg-[#001B4E] text-black dark:text-white p-3 rounded-lg border dark:border-[#00387E] focus:outline-none"
            />
          </div>

        </div>

        {/* Blogs Display Section */}
        <div className="flex flex-col gap-4 mt-8">
          <h2 className="text-xl font-bold">
            Showing: {activeCategory}
            {searchTitle && ` | Title: "${searchTitle}"`}
            {searchAuthor && ` | Author: "${searchAuthor}"`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogData.map((blog, idx) => (
              <BlogCard key={idx} data={blog} />
            ))}
          </div>

        </div>

        <Pagination currentPage={page} totalPages={totalRaces} onPageChange={(newPage) => setPage(newPage)} />
      </div>
    </div>
  );
};

export default AllBlogs;
