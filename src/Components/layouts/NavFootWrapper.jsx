import { useContext, useEffect, useState} from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Outlet,useNavigate } from 'react-router-dom'
import { postCommunityPost, RefreshToken, reportBug } from '../../Utils/api'
import { DarkModeContext } from '../../Contexts/DarkModeProvider'
import { useCommunity } from '../../Contexts/CommunityProvider';

const NavFootWrapper = () => {

  useEffect(() => {
    // see if the token is valid now or not if not then request refresh token here
    let token = localStorage.getItem('token')
    token && RefreshToken(() => {
      console.log('refreshed successfully')
    }, () => {
      console.log('refresh token was invalid');
    })
  }, [])

  const { report, setReport } = useContext(DarkModeContext)
  const [successModel, setSuccessModel] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [reportData, setReportData] = useState({
    title: '',
    email: '',
    priority: 'Low',
    area: 'Bug',
    description: ''
  });

  const {shareModal,setShareModal,modalText,setModalText,modalImg,setModalImg}=useCommunity()
  const navigate=useNavigate()

  const submitBugReport = async () => {
    console.log('Submitting Report:', reportData);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate fields
    if (!reportData.title || !reportData.email || !reportData.priority || !reportData.area || !reportData.description) {
      // alert("All fields are required!");
      setErrorMsg("All fields are required!")
      return;
    }

    // Validate email format
    if (!emailRegex.test(reportData.email)) {
      // alert("Please enter a valid email address!");
      setErrorMsg("Please enter a valid email address!");
      return;
    }

    await reportBug(reportData, (data) => {
      setSuccessModel(true);
      setReportData({
        title: '',
        email: '',
        priority: 'Low',
        area: 'Bug',
        description: ''
      })
    })
    setReport(false); // Close modal after submission
    setErrorMsg("");
  };

  const shareWithCommunity = () => {
    let finalContent = modalImg;
  
    if (modalText) {
      finalContent = `
        <div class="shared-post-wrapper">
          <p class="postContent">${modalText}</p>
          ${modalImg}
        </div>
      `;
    }
  
    postCommunityPost("", finalContent, "", () => {
      setModalText("");
      setModalImg("");
      setShareModal(false);
      navigate("/community");
    });
  };
  

  return (
    <div className='w-full relative dark:bg-[#000924] flex flex-col min-h-[100vh]'>
      <Navbar />

      <Outlet />
      <Footer />
      {successModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            role="dialog"
            aria-modal="true"
            className="w-[30rem] max-w-[90%] p-6 bg-white dark:bg-[#00387E] rounded-2xl flex flex-col items-center justify-center gap-4 shadow-lg"
          >
            <p className="text-3xl font-semibold text-green-500">Success!</p>
            <p className="text-lg text-center text-gray-700 dark:text-white">
              Thank you for your feedback.
            </p>
            <button
              onClick={() => setSuccessModel(false)}
              className="px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF] dark:hover:opacity-90 transition-all"
            >
              Okay
            </button>
          </div>
        </div>
      )}
      {shareModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white dark:bg-[#010B2C] rounded-lg shadow-lg p-6 w-[90%] md:w-[500px]">
            <h2 className="text-xl font-bold dark:text-white mb-4">Share in Community</h2>

            <div className="flex flex-col gap-3">
                
                {/* Image Preview */}
                {modalImg && (
  <div className="w-full max-h-[32rem] overflow-auto">
    <div className="flex justify-center">
      <div className="max-w-full" dangerouslySetInnerHTML={{ __html: modalImg }} />
    </div>
  </div>
)}


                {/* Description */}
                <div className="flex flex-col">
                    <textarea
                        className="p-2 border rounded-md dark:bg-[#001F52] dark:text-white"
                        value={modalText}
                        onChange={(e) => setModalText(e.target.value)}
                        placeholder="Write a description..."
                        rows="3"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={() => setShareModal(false)}
                        className="px-4 py-2 rounded-md bg-gray-300 text-black"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={shareWithCommunity}
                        className="px-4 py-2 rounded-md dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] text-white"
                    >
                        Share
                    </button>
                </div>
            </div>
        </div>
    </div>
)}

      
      {report && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-[#010B2C] rounded-lg shadow-lg p-6 w-[90%] md:w-[500px]">
            <h2 className="text-xl font-bold dark:text-white mb-4">Report A Bug</h2>

            {errorMsg != "" &&
              <h2 className='text-red-600 font-poppins font-semibold'>{errorMsg}</h2>
            }
            <div className="flex flex-col gap-3">
              {/* Title */}
              <div className="flex flex-col">
                <label className="dark:text-white">Title</label>
                <input
                  className="p-2 border rounded-md dark:bg-[#001F52] dark:text-white"
                  value={reportData.title}
                  onChange={e => setReportData(prev => ({ ...prev, title: e.target.value }))}
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="dark:text-white">Email</label>
                <input
                  className="p-2 border rounded-md dark:bg-[#001F52] dark:text-white"
                  value={reportData.email}
                  onChange={e => setReportData(prev => ({ ...prev, email: e.target.value }))}
                  type="email"
                />
              </div>

              {/* Priority */}
              <div className="flex flex-col">
                <label className="dark:text-white">Priority</label>
                <select
                  className="p-2 border rounded-md dark:bg-[#001F52] dark:text-white cursor-pointer"
                  onChange={e => setReportData(prev => ({ ...prev, priority: e.target.value }))}
                >
                  <option className='cursor-pointer' value="Low">Low</option>
                  <option className='cursor-pointer' value="Medium">Medium</option>
                  <option className='cursor-pointer' value="High">High</option>
                </select>
              </div>

              {/* Area */}
              <div className="flex flex-col">
                <label className="dark:text-white">Area</label>
                <select
                  className="p-2 border rounded-md dark:bg-[#001F52] dark:text-white cursor-pointer"
                  onChange={e => setReportData(prev => ({ ...prev, area: e.target.value }))}
                >
                  <option className='cursor-pointer' value="Bug">Bug</option>
                  <option className='cursor-pointer' value="Account Not Accessible">Account Not Accessible</option>
                  <option className='cursor-pointer' value="Ranking is Not showing">Ranking is Not showing</option>
                </select>
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label className="dark:text-white">Description</label>
                <textarea
                  className="p-2 border rounded-md dark:bg-[#001F52] dark:text-white"
                  value={reportData.description}
                  onChange={e => setReportData(prev => ({ ...prev, description: e.target.value }))}
                  rows="3"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setReport(false)}
                  className="px-4 py-2 rounded-md bg-gray-300 text-black"
                >
                  Cancel
                </button>
                <button
                  onClick={submitBugReport}
                  className="px-4 py-2 rounded-md dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavFootWrapper