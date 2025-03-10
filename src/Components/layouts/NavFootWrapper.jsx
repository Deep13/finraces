import { useContext, useEffect,useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'
import { RefreshToken, reportBug } from '../../Utils/api'
import { DarkModeContext } from '../../Contexts/DarkModeProvider'

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

  const {report,setReport}=useContext(DarkModeContext)
  const [successModel,setSuccessModel]=useState(false);
  const [reportData, setReportData] = useState({
      title: '',
      priority: 'Low',
      area: 'Bug',
      description: ''
  });

  const submitBugReport = async() => {
      console.log('Submitting Report:', reportData);
      await reportBug(reportData, (data) => {
                  setSuccessModel(true)
     })
      setReport(false); // Close modal after submission
  };

  return (
    <div className='w-full relative dark:bg-[#000924]'>
      <Navbar />

      <Outlet />
      <Footer />
      {
                successModel && <div className="w-full h-full fixed top-0 left-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="w-[30rem] h-[15rem] bg-white dark:bg-[#00387e] rounded-[20px] p-[20px] flex flex-col items-center justify-center gap-4">
                        <p className="text-3xl font-semibold text-green-500">Submitted Successfully</p>
                        <p className="text-xl font-semibold">Thank you for your feedback</p>
                        <button onClick={() => setSuccessModel(false)} className="darktext-[#e4eaf0] bg-[#e4eaf0] text-lg dark:text-white dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] px-[1rem] h-[2.35rem] text-[0.7rem] md:text-[0.9rem] rounded-[8px] flex gap-2 items-center text-black font-semibold font-poppins">Okay</button>
                    </div>
                </div>
            }
      {report && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white dark:bg-[#010B2C] rounded-lg shadow-lg p-6 w-[90%] md:w-[500px]">
                        <h2 className="text-xl font-bold dark:text-white mb-4">Report A Bug</h2>
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