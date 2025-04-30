import React from "react";
import Sidebar from "../Components/Sidebar";
import blogImg from "../assets/images/blogImg1.png";

const SingleBlog = () => {
  const blog = {
    title: "The Journey to Clean Code",
    author: {
      name: "Jane Doe",
      avatar: "https://i.pravatar.cc/150?img=3",
      date: "April 29, 2025",
    },
    banner: blogImg,
    content: `
      <p>Writing clean code is not just about using correct syntax; it’s about writing code that is readable, maintainable, and elegant. Whether you're working solo or in a team, clean code is crucial.</p>
      <p>Start by using meaningful variable names, keeping functions small, and avoiding code repetition. Comment only where necessary. If your code needs a comment to explain what it does, maybe refactor the code instead.</p>
      <p>Remember, <strong>code is read more often than it is written</strong>. Make the reader's job easier.</p>
    `,
  };

  const recentBlogs = [
    {
      img: blogImg,
      title: "Mastering React in 30 Days",
      author: "John Smith",
    },
    {
      img: blogImg,
      title: "Intro to Web3 and Crypto",
      author: "Alice Lee",
    },
    {
      img: blogImg,
      title: "Top 5 Stock Market Tips",
      author: "Robert Brown",
    },
  ];

  return (
    <div className="w-full min-h-screen flex dark:bg-[#000924]">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex items-center justify-center gap-2 w-[90%] mx-auto">
        {/* Blog Content Container */}
        <div className="flex-1 py-8 px-4 mx-auto dark:text-white">
          {/* Blog Card */}
          <div className="bg-white dark:bg-[#000D38] rounded-xl border dark:border-[#00387E] p-6 md:p-10 shadow-md">
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold mb-6">{blog.title}</h1>

            {/* Author Info */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={blog.author.avatar}
                alt="Author"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-sm">
                <div className="font-semibold">{blog.author.name}</div>
                <div className="text-slate-500 dark:text-slate-400">{blog.author.date}</div>
              </div>
            </div>

            {/* Banner */}
            <div className="w-full h-64 md:h-[28rem] rounded-lg overflow-hidden mb-10">
              <img
                src={blog.banner}
                alt="Blog Banner"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Blog Content */}
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
            <div className="text-3xl font-bold mb-3">Categories</div>
            <ul className="list-none space-y-2">
              {["Crypto", "Races", "Stocks"].map((cat, idx) => (
                <li key={idx} className="flex items-center gap-2 text-lg cursor-pointer">
                  <span className="text-blue-500">➤</span> {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Blogs Section */}
          <div>
            <div className="text-3xl font-bold mb-3">Recent Blogs</div>
            <div className="space-y-4">
              {recentBlogs.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <img
                    src={item.img}
                    alt="Recent Blog"
                    className="w-14 h-14 rounded-md object-cover"
                  />
                  <div className="text-xl">
                    <div className="font-semibold line-clamp-2">{item.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{item.author}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
