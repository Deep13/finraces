import { useState, useEffect, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { postBlog, uploadImage } from '../Utils/api';
import { RxCross2 } from "react-icons/rx";

const CreateBlog = ({ onClose }) => {
  const [content, setContent] = useState('');
  const [formData, setFormdata] = useState({
    title: "",
    category: "",
    visibility: "Private",
    comments: "true",
    bannerImg: ""
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    const tooltips = {
      bold: 'Bold',
      italic: 'Italic',
      underline: 'Underline',
      strike: 'Strikethrough',
      blockquote: 'Blockquote',
      list: 'List',
      bullet: 'Bullet',
      link: 'Insert Link',
      image: 'Insert Image',
      clean: 'Clear Formatting',
      header: 'Header',
    };

    const toolbarButtons = document.querySelectorAll('.ql-toolbar button, .ql-toolbar .ql-picker');
    toolbarButtons.forEach((btn) => {
      const classes = [...btn.classList];
      const qlFormat = classes.find((cls) => cls.startsWith('ql-'))?.replace('ql-', '');
      if (qlFormat && tooltips[qlFormat]) {
        btn.setAttribute('title', tooltips[qlFormat]);
      }
    });
  }, []);

  const sumbitBlog = () => {
    uploadImage(formData.bannerImg, (data) => {
      postBlog(
        "eda4717e-36f6-43ad-8f1a-6630b3e93a9c",
        "6cbae941-fb07-4c5b-8d16-99d655abf681",
        formData.title,
        content,
        data.file.id,
        (data) => {
          console.log("success", data);
          onClose();
        },
        (error) => console.log(error)
      );
    }, (error) => {
      console.log(error);
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-start py-10 px-5">
      <div className="flex flex-col dark:text-white gap-5 w-[60vw] rounded-xl border dark:border-[#00387E] dark:bg-[#000A2D] p-5">
        
        <div className="flex items-center justify-between p-2 relative">
          <div className="font-semibold text-lg">
            Create Blog
          </div>
          <div className="flex items-center gap-4">
            {/* Submit Button */}
            <button
              onClick={sumbitBlog}
              className="px-6 py-2 rounded-md bg-[#0053F0] text-white"
            >
              Post Blog
            </button>

            {/* Close Icon */}
            <button onClick={onClose} className="text-white hover:text-blue-500 absolute -right-4 -top-4">
              <RxCross2 size={24}/>
            </button>
          </div>
        </div>


        <div className="rounded-xl bg-white dark:bg-[#00387E] p-5 flex flex-col gap-5 max-h-[75vh] overflow-y-auto notificationScrollbar">
          {/* Input Section: Inputs + Banner Side by Side */}
          <div className="flex gap-5 flex-wrap">
            {/* Left Inputs */}
            <div className="flex flex-col gap-4 flex-1 min-w-[300px]">
              <div>
                <label>Title</label>
                <input
                  value={formData.title}
                  onChange={(e) => setFormdata(prev => ({ ...prev, title: e.target.value }))}
                  type="text"
                  className="rounded-sm w-full h-10 dark:text-white px-2"
                />
              </div>
              <div>
                {/* <label>Subtitle</label>
                <input
                  value={formData.subtitle}
                  onChange={(e) => setFormdata(prev => ({ ...prev, subtitle: e.target.value }))}
                  type="text"
                  className="rounded-sm w-full h-10 dark:text-white px-2"
                /> */}
              </div>
              <div>
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormdata(prev => ({ ...prev, category: e.target.value }))}
                  className="cursor-pointer w-full h-10 p-2 rounded-sm dark:bg-[#001B51] text-white"
                >
                  <option>Crypto</option>
                  <option>Stocks</option>
                  <option>Investing</option>
                  <option>Races</option>
                </select>
              </div>
              <div className="flex gap-3 items-center">
                <span className="font-semibold">Visibility</span>
                <div>
                  <button
                    onClick={() => setFormdata(prev => ({ ...prev, visibility: 'Public' }))}
                    className={`px-4 py-1 rounded-l-md border border-slate-400 ${formData.visibility === 'Public' ? 'bg-[#0053F0] text-white' : 'bg-[#001B51]'}`}
                  >
                    Public
                  </button>
                  <button
                    onClick={() => setFormdata(prev => ({ ...prev, visibility: 'Private' }))}
                    className={`px-4 py-1 rounded-r-md border border-slate-400 ${formData.visibility === 'Private' ? 'bg-[#0053F0] text-white' : 'bg-[#001B51]'}`}
                  >
                    Private
                  </button>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <span className="font-semibold">Comments</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formData.comments === "true"}
                    onChange={(e) => setFormdata(prev => ({
                      ...prev,
                      comments: e.target.checked ? "true" : "false"
                    }))}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0053F0]"></div>
                </label>
              </div>
            </div>

            {/* Right Banner Image */}
            <div className="w-40 h-40 min-w-[160px] cursor-pointer rounded-lg border border-dashed border-slate-500 bg-[#001B51] overflow-hidden flex items-center justify-center" onClick={() => fileInputRef.current.click()}>
              {formData.bannerImg ? (
                <img src={URL.createObjectURL(formData.bannerImg)} alt="Banner" className="object-cover w-full h-full" />
              ) : (
                <img src="/upload-icon.png" alt="Upload" className="h-12 w-12 opacity-50" />
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFormdata(prev => ({ ...prev, bannerImg: file }));
                  }
                }}
                className="hidden"
              />
            </div>
          </div>

          {/* Content Section */}
          <div>
            <label className="text-sm mb-1 block">Content <span className="text-slate-400">(i)</span></label>
            <div className="dark:bg-[#001B51] bg-white rounded-md overflow-hidden min-h-[200px] max-h-[400px]">
              <ReactQuill
                value={content}
                onChange={setContent}
                theme="snow"
                className="dark:text-white dark:[&_.ql-container]:bg-[#001B51] dark:[&_.ql-editor]:text-white dark:[&_.ql-editor]:bg-[#001B51] border-none min-h-[200px] max-h-[400px] overflow-y-auto"
                modules={{
                  toolbar: {
                    container: [
                      [{ header: [1, 2, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      ['blockquote'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link', 'image'],
                      ['clean'],
                    ]
                  },
                }}
                formats={[
                  'header',
                  'bold',
                  'italic',
                  'underline',
                  'strike',
                  'blockquote',
                  'list',
                  'bullet',
                  'link',
                  'image',
                ]}
              />
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
