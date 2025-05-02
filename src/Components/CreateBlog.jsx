import { useState, useEffect, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { getBlogCategories, postBlog, uploadImage } from '../Utils/api';
import { FiPlusCircle } from 'react-icons/fi';

const CreateBlog = () => {
  const [content, setContent] = useState('');
  const [formData, setFormdata] = useState({
    title: "",
    excerpt: "",
    category: "",
    bannerImg: ""
  });
  const [categoriesMap, setCategoriesMap] = useState({});
  const [error, setError] = useState({ show: false, message: "" });
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

    getBlogCategories((data) => {
      const mappedCategories = {};
      data.data.forEach((cat) => {
        mappedCategories[cat.name] = cat.id;
      });
      setCategoriesMap(mappedCategories);
    }, (error) => {
      console.log("Error fetching categories", error)
    })
  }, []);

  const sumbitBlog = () => {
    if (!formData.bannerImg) {
      setError({
        show: true,
        message: 'Banner image is required. Kindly add a banner image to be shown with your blog.'
      });
      return;
    }

    uploadImage(formData.bannerImg, (data) => {
      postBlog(
        "eda4717e-36f6-43ad-8f1a-6630b3e93a9c",
        categoriesMap[formData.category],
        formData.title,
        formData.excerpt,
        content,
        data.file.id,
        (data) => {
          console.log("success", data);
          // onClose(); // optional: clear the form or close modal
        },
        (error) => {
          console.log(error);
          setError({
            show: true,
            message: 'We have run into a backend issue. Kindly report it via Support from your profile.'
          });
        }
      );
    }, (error) => {
      console.log(error);
      setError({
        show: true,
        message: 'We have run into a backend issue. Kindly report it via Support from your profile.'
      });
    });
  };

  return (
    <div className="flex justify-center items-start py-10 px-5 w-full pt-0">
      <div className="flex flex-col dark:text-white gap-5 w-full rounded-xl border dark:border-[#00387E] dark:bg-[#000A2D] p-5">

        <div className="flex items-center justify-between p-2 relative">
          <div className="font-semibold text-lg">
            Create Blog
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={sumbitBlog}
              className="px-6 py-2 rounded-md bg-[#0053F0] text-white"
            >
              Post Blog
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-white dark:bg-[#00387E] p-5 flex flex-col gap-5 overflow-y-auto notificationScrollbar">
          <div className="flex gap-5 flex-wrap">
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
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormdata(prev => ({ ...prev, category: e.target.value }))}
                  className="cursor-pointer w-full h-10 p-2 rounded-sm dark:bg-[#001B51] text-white"
                >
                  <option value="" disabled>Select a category</option>
                  {Object.keys(categoriesMap).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='flex flex-roq gap-4 flex-1 '>
              <div className='flex-1 '>
                <label>Excerpt</label>
                {/* <input
                  value={formData.excerpt}
                  onChange={(e) => setFormdata(prev => ({ ...prev, excerpt: e.target.value }))}
                  type="text"
                  className="rounded-sm w-full h-10 dark:text-white px-2"
                /> */}
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormdata(prev => ({ ...prev, excerpt: e.target.value }))}
                  className="rounded-sm w-full dark:text-white px-2"
                  rows={8}
                  placeholder="Write a short excerpt..."
                />
              </div>
              <div
                className="w-64 h-64 min-w-[160px] cursor-pointer rounded-lg border border-dashed border-slate-500 bg-[#001B51] overflow-hidden flex items-center justify-center"
                onClick={() => fileInputRef.current.click()}
              >
                {formData.bannerImg ? (
                  <img src={URL.createObjectURL(formData.bannerImg)} alt="Banner" className="object-cover w-full h-full" />
                ) : (
                  <FiPlusCircle size={32} className='dark:text-white' />
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
          </div>

          <div>
            <label className="text-sm mb-1 block">Content <span className="text-slate-400">(i)</span></label>
            <div className="dark:bg-[#001B51] bg-white rounded-md overflow-hidden min-h-[200px] h-[500px]">
              <ReactQuill
                value={content}
                onChange={setContent}
                theme="snow"
                style={{
                  minHeight: '300px',
                  height: '100%',
                  border: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1
                }}
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

        {/* Error Modal */}
        {error.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#001B51] p-6 rounded-lg max-w-sm w-full text-center shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-red-600 dark:text-red-400">Error</h2>
              <p className="text-md dark:text-white">{error.message}</p>
              <button
                onClick={() => setError({ show: false, message: "" })}
                className="mt-5 px-4 py-2 bg-[#0053F0] text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;
