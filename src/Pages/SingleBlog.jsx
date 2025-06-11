import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { useParams, Link } from "react-router-dom";
import { getBlogCategories, getBlogDetailed, getBlogs } from "../Utils/api";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    setLoading(true);
    // Fetch the single blog
    getBlogDetailed(
      id,
      (data) => {
        setBlog(data);
        setLoading(false);

        // After fetching the blog, fetch recent blogs of the same category
        if (data.category?.id) {
          getBlogs(
            (blogsData) => {
              // Exclude the current blog itself from the list
              const filteredBlogs = blogsData.data.filter((b) => b.id !== data.id);
              setRecentBlogs(filteredBlogs);
            },
            (error) => {
              console.error("Failed to fetch recent blogs:", error);
            },
            data.category.id
          );
        }
      },
      (error) => {
        setError("Failed to fetch blog.", error);
        setLoading(false);
      }
    );

    // Fetch all categories
    getBlogCategories(
      (data) => {
        setCategories(data.data);
      },
      (error) => {
        console.error("Failed to fetch categories:", error);
      }
    );
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center dark:bg-[#000924]">
        <p className="text-lg dark:text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center dark:bg-[#000924]">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex dark:bg-[#000924]">
      <Sidebar />

      <div className="flex items-start justify-between gap-4 w-[90%] mx-auto p-5">
        {/* Blog Content Container */}
        <div className="flex-1 px-4 mx-auto dark:text-white">
          <div className="bg-white dark:bg-[#000D38] rounded-xl border dark:border-[#00387E] p-6 md:p-10 shadow-md">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">{blog.title}</h1>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={blog.user?.photo?.path || "https://i.pravatar.cc/150?img=3"}
                alt="Author"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-sm">
                <div className="font-semibold">
                  {`${blog.user?.firstName || "Jane"} ${blog.user?.lastName || "Doe"}`}
                </div>
                <div className="text-slate-500 dark:text-slate-400">
                  {new Date(blog.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>

            <div className="w-full h-64 md:h-[28rem] rounded-lg overflow-hidden mb-10">
              <img
                src={blog.image?.path}
                alt="Blog Banner"
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className="prose dark:prose-invert prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[25%] dark:text-white bg-white dark:bg-[#000D38] rounded-xl border dark:border-[#00387E] p-4 shadow-md min-h-[94%] flex flex-col gap-8">
          {/* Categories Section */}
          <div>
            <div className="text-xl font-bold mb-3">Categories</div>
            <ul className="list-none space-y-2">
              {categories.map((cat) => (
                <li key={cat.id} className="flex items-center gap-2 text-md cursor-pointer hover:text-blue-500 transition">
                  <span className="text-blue-500">➤</span>
                  <Link to={`/allBlogs?type=${cat.name}`} className="flex-1">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Blogs Section */}
          <div>
            <div className="text-xl font-bold mb-3">Recent Blogs</div>
            <div className="space-y-4">
              {recentBlogs.length > 0 ? (
                recentBlogs.map((item) => (
                  <Link
                    key={item.id}
                    to={`/blog/${item.id}`}
                    className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-[#001b43] p-2 rounded-md transition"
                  >
                    <img
                      src={item.image?.path || "/assets/images/blogImg1.png"}
                      alt="Recent Blog"
                      className="w-14 h-14 rounded-md object-cover"
                    />
                    <div className="text-sm">
                      <div className="font-semibold line-clamp-2">{item.title}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {`${item.user?.firstName || ""} ${item.user?.lastName || ""}`}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-slate-500 dark:text-slate-400 text-sm">No recent blogs found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
