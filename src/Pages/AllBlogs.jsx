import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from "../Components/Sidebar";
import BlogCard from '../Components/BlogCard';
import Pagination from '../Components/Pagination';
import { getBlogCategories, getBlogs } from '../Utils/api';

const AllBlogs = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeFromQuery = queryParams.get('type');

  const [categoriesMap, setCategoriesMap] = useState({});
  const [activeCategory, setActiveCategory] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [page, setPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [hasNext,setHasNext]=useState(false);

  // Fetch categories
  useEffect(() => {
    getBlogCategories(
      (data) => {
        const mappedCategories = {};
        data.data.forEach((cat) => {
          mappedCategories[cat.name] = cat.id;
        });
        setCategoriesMap(mappedCategories);

        // Set default category: if type param is valid, else first category
        if (typeFromQuery && mappedCategories[typeFromQuery]) {
          setActiveCategory(typeFromQuery);
        } else {
          const firstCategory = Object.keys(mappedCategories)[0];
          setActiveCategory(firstCategory);
        }
      },
      (error) => {
        console.log("Error fetching categories", error);
      }
    );
  }, [typeFromQuery]);

  // Fetch blogs when activeCategory changes
  useEffect(() => {
    const categoryId = categoriesMap[activeCategory];
    if (!categoryId) return; // Don't fetch until category is set

    getBlogs(
      (data) => {
        setBlogs(data.data);
        setTotalBlogs(data.total-1)
        setHasNext(data.hasNextPage)
      },
      (error) => {
        console.log("Fetching blogs failed", error);
      },
      categoryId,page
    );
  }, [activeCategory, categoriesMap,page]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="w-full relative h-auto flex pb-8 pt-8 dark:bg-[#000924] min-h-[100vh]">
      <Sidebar />

      <div className="flex flex-col w-[70rem] gap-6 dark:bg-[#000D38] py-5 md:px-10 mx-[1rem] md:mx-[7rem] flex-1 rounded-xl border dark:border-[#00387E] dark:text-white">

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Categories Section */}
          <div className="flex flex-col w-full md:max-w-[16rem]">
            <label className="font-semibold mb-1 text-sm">Categories</label>
            <select
              value={activeCategory}
              onChange={(e) => handleCategoryClick(e.target.value)}
              className="w-full bg-white dark:bg-[#001B4E] text-black dark:text-white p-3 rounded-lg border dark:border-[#00387E] focus:outline-none cursor-pointer"
            >
              {Object.keys(categoriesMap).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
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
            {blogs.length > 0 ? (
              blogs.map((blog, idx) => (
                <BlogCard key={idx} data={blog} />
              ))
            ) : (
              <p>No blogs found.</p>
            )}
          </div>
        </div>

        {hasNext && <Pagination
          currentPage={page}
          totalPages={totalBlogs}
          onPageChange={(newPage) => setPage(newPage)}
        />}
      </div>
    </div>
  );
};

export default AllBlogs;
