import React from 'react';

const CreateBlog = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-start py-10 px-5">
      <div className="flex flex-col dark:text-white gap-5 w-[60vw] rounded-xl border dark:border-[#00387E] dark:bg-[#000A2D] p-5 ">
        <div className="font-semibold text-lg">Create Blog</div>

        <div className="flex-1 rounded-xl bg-[#00387E] p-5 flex flex-col gap-3">
          {/* Top Inputs */}
          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex flex-col">
              <label>Blog Name</label>
              <input type="text" className="rounded-sm w-64 h-10 dark:text-white px-2" />
            </div>
            <div className="flex flex-col">
              <label>Blog Subtitle</label>
              <input type="text" className="rounded-sm w-64 h-10 dark:text-white px-2" />
            </div>
            <div className="flex flex-col">
              <label>Categories</label>
              <select className="cursor-pointer w-64 h-10 p-2 rounded-sm bg-[#001B51] text-white">
                <option>Crypto</option>
                <option>Stocks</option>
                <option>Investing</option>
                <option>Races</option>
              </select>
            </div>
          </div>

          {/* Visibility & Comments */}
          <div className="flex gap-10 mt-4 items-center flex-wrap">
            <div className="flex gap-3 items-center">
              <span className="font-semibold">Visibility</span>
              <div>
                <button className="px-4 py-1 rounded-l-md bg-[#001B51] border border-slate-400">Public</button>
                <button className="px-4 py-1 rounded-r-md bg-[#0053F0]">Private</button>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <span className="font-semibold">Comments</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0053F0]"></div>
              </label>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="text-sm mb-1 block">Blog Content <span className="text-slate-400">(i)</span></label>
            <textarea
              rows={6}
              className="w-full rounded-md px-3 py-2 bg-[#001B51] border border-slate-600 outline-none resize-none"
              placeholder="Write your blog content here..."
            ></textarea>
          </div>

          {/* Media */}
          <div>
            <label className="text-sm mb-2 block">Add Media <span className="text-slate-400">(i)</span></label>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="h-32 rounded-lg border border-dashed border-slate-500 flex items-center justify-center bg-[#001B51]">
                  <img src="" alt="Upload" className="h-12 w-12 opacity-50" />
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button onClick={onClose} className="px-6 py-2 rounded-md border border-slate-400">Cancel</button>
            <button className="px-6 py-2 rounded-md bg-[#0053F0] text-white">Post Blog</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
