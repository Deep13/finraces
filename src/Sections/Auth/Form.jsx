import { BsPersonCircle } from "react-icons/bs";
import { BiCheckCircle } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import React, { useEffect, useState } from 'react'
import facebook_icon from '../../assets/icons/facebook_icon.svg'
import Verified from '../../assets/icons/Featured_icon.svg'
import { RegisterUser, Login as LoginUser, updateProfile } from "../../Utils/api";
import { useNavigate, useLocation } from "react-router-dom";
// import { joinAsGuest } from "../../Utils/api";
import { BiChevronRight } from "react-icons/bi";
import GreetPopup from "../../Components/GreetPopup";
import AllPopup from "../../Components/AllPopup";



const tabs = {
  signup: 'signup',
  login: 'login',
  success: 'success',
}


const Form = ({
  closeForm = () => { }
}) => {

  const [activeTab, setActiveTab] = useState(tabs.login)
  const [signupCreds, setSignupCreds] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender:'',
  })
  const [loginCreds, setLoginCreds] = useState({
    email: '',
    password: '',
  })
  const [buttonStates, setButtonStates] = useState({
    login: false,
    signup: false
  })
  const [loginActive, setLoginActive] = useState(false)
  const [signupActive, setSignupActive] = useState(false)
  const [showGreetPopup, setShowGreetPopup] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const gD = localStorage.getItem('guest_details')
  const guestDetails = gD && JSON.parse(atob(gD))

  const navigate = useNavigate()
  const thisLocation = useLocation()


  const handleInput = (e) => {
    const { name, value } = e.target;
    if (activeTab === tabs.signup) {
      setSignupCreds((prevCreds) => ({
        ...prevCreds,
        [name]: value,
      }));
    } else if (activeTab === tabs.login) {
      setLoginCreds((prevCreds) => ({
        ...prevCreds,
        [name]: value,
      }));
    }
  }

  const validateSignup = () => {
    const { fullName, email, password } = signupCreds
    // if (!fullName || !email || !password) {
    //   // alert('Please fill all the fields')
    //   return false
    // }

    // const isEmail = email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // if (!isEmail) {
    //   alert('Incorrect Email')
    //   return false
    // }


    // alert('ok your are registered')
    setSignupActive(true)
    return true
  }

  const validateLogin = () => {
    const { email, password } = loginCreds
    if (!email || !password) {
      // alert('Please fill all the fields')
      return false
    }

    const isEmail = email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!isEmail) {
      // alert('Incorrect Email')
      return false
    }

    setLoginActive(true)
    return true
  }

  function splitFullName(fullName) {
    const trimmedName = fullName.trim();
    if (trimmedName.includes(" ")) {
      const [firstName, ...lastNameArray] = trimmedName.split(" ");
      const lastName = lastNameArray.join(" ");

      return { firstName, lastName };
    } else {
      return { firstName: trimmedName, lastName: "" };
    }
  }

  const Signup = () => {

    let { email, password, firstName, lastName,gender } = signupCreds
    if (!email || !password || !firstName || !lastName || !gender) {
      // alert('all fields are required')
      setShowModal(true)
      setModalTitle('Error !')
      setModalMessage('All Fields are required!, Fill all the fields')
      return
    }
    // here the signup function is called
    // alert('ok your are registered')
    // const { firstName, lastName } = splitFullName(fullName)
    guestDetails ?
      updateProfile({ ...signupCreds, is_guest: false, "oldPassword": guestDetails.guest_password }, () => {
        console.log('Profile Updated')
        setActiveTab(tabs.success)
        setSignupCreds({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          gender:'',
        })
      }, (error) => {
        console.log('Error Updating Profile', error)
        setShowModal(true)
        setModalTitle('Error !')
        setModalMessage('some error occured')
      })
      :
      RegisterUser(email, password, firstName, lastName,gender, (error) => {
        // alert('Something went wrong')
        console.log('registration errror', error)
        setShowModal(true)
        setModalTitle('Error !')
        setModalMessage('Some Error occured while Registering the User')
      }, () => {
        setActiveTab(tabs.success)
        setSignupCreds({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          gender:''
        })
      })
  }



  const Login = () => {

    const { email, password } = loginCreds
    if (!email || !password) {
      setShowModal(true)
      setModalMessage('All Fields are required!, Fill all the fields')
      return
    }
    LoginUser(email, password, () => {
      closeForm(false)
      if (thisLocation.pathname === '/auth') {
        navigate('/')
      } else {
        window.location.reload()
      }
    }, (error) => {
      console.log('error', error)
      let OError = error?.response?.data?.errors
      if (OError) {
        if (OError.email || OError.password) {
          setModalMessage('Invalid credentials')
        }
        else {
          setModalMessage('Some Technical Error occured! We will get back to you soon')
        }
      } else {
        setModalMessage('Some Technical Error occured! We will get back to you soon')
      }
      setShowModal(true)
      setModalTitle('Error!')
    })
    setLoginCreds({
      email: '',
      password: '',
    })
  }


  useEffect(() => {
    validateSignup()
    validateLogin()
  }, [signupCreds, loginCreds])

  useEffect(() => {
    // console.log(typeof (thisLocation.pathname))
    setSignupCreds(prev => ({ ...prev, firstName: guestDetails?.userName || "" }))
  }, [])

  return (

    <>
      {
        showModal && <AllPopup message={modalMessage} title={modalTitle} setPopupVisible={setShowModal} />
      }
      {
        showGreetPopup && <GreetPopup setPopupVisible={setShowGreetPopup} />
      }
      {activeTab === tabs.success ?
        <div className={`w-full flex justify-center items-center ${thisLocation.pathname === '/' ? 'py-8' : ''}`}>
          <div className={`w-full  ${thisLocation.pathname === '/' ? 'scale-75' : 'scale-100'} relative flex items-center flex-col gap-[29px]`}>
            <div className="w-full py-4">
              <h2 className="text-center text-[30px] text-[#292d32] dark:text-white">Successful Signup!</h2>
              <p className="text-[#384453] dark:text-white text-center">Kindly login with your Credentials.</p>
            </div>
            <div>
              <img src={Verified} alt="verified_mark" />
            </div>
            <div className='text-[24px] text-[#1a1e25] font-semibold text-center dark:text-white'>Congratulations</div>
            <p className="text-[#384453] dark:text-white">Welcome to finraces</p>
            <button onClick={() => setActiveTab(tabs.login)} className="bg-[#0d5ce5] text-white px-[22px] py-[20px] w-[330px] rounded-[10px] flex gap-1 justify-center">
              Continue
              <BiCheckCircle color="white" size={24} />
            </button>
          </div>
        </div>
        :
        <div className='w-[22.5rem] h-full relative flex items-center flex-col gap-[1.5rem] scale-[80%]'>
          <div className='w-full bg-[#f5f5f5] p-[10px] rounded-full flex justify-center items-center gap-3 dark:bg-[#010B2C]'>
            <button onClick={() => setActiveTab(tabs.signup)} className={`flex-1 rounded-full text-[1rem] py-3 ${activeTab === tabs.signup ? 'bg-[#212121] text-white dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF] font-bold' : 'bg-transparent text-[#212121] dark:text-white'}`}>Sign up</button>
            <button onClick={() => setActiveTab(tabs.login)} className={`flex-1 rounded-full text-[1rem] py-3 ${activeTab === tabs.login ? 'bg-[#212121] text-white dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF] font-bold' : 'bg-transparent text-[#212121] dark:text-white'}`}>Log in</button>
          </div>

          {/* signup form  */}
          {activeTab === tabs.signup &&
            <>
              <div className='text-start flex flex-col w-full'>
                <label className="text-start mb-2 dark:text-white" htmlFor="">First Name</label>
                <input name="firstName" value={signupCreds.firstName} onChange={handleInput} placeholder='Enter your first name' type="text" />
              </div>
              <div className='text-start flex flex-col w-full'>
                <label className="text-start mb-2 dark:text-white" htmlFor="">Last Name</label>
                <input name="lastName" value={signupCreds.lastName} onChange={handleInput} placeholder='Enter your last name' type="text" />
              </div>
              <div className='text-start flex flex-col w-full'>
                <label className="text-start mb-2 dark:text-white" htmlFor="">Email</label>
                <input name="email" value={signupCreds.email} onChange={handleInput} className='' placeholder='Enter your email' type="text" />
              </div>
              <div className='text-start flex flex-col w-full'>
                <label className="text-start mb-2 dark:text-white" htmlFor="">Create Password</label>
                <input name="password" value={signupCreds.password} onChange={handleInput} className='' type='password' placeholder='Enter your Password' />
              </div>
              <div className='text-start flex flex-col w-full'>
                <label className="text-start mb-2 dark:text-white" htmlFor="gender">Gender</label>
                <div className="flex items-center space-x-3">
  <span className="text-gray-700 dark:text-white">Male</span>
  
  <label className="relative inline-flex items-center cursor-pointer">
    <input 
      type="checkbox" 
      className="sr-only peer" 
      checked={signupCreds.gender === "female"} 
      onChange={() => 
        setSignupCreds((prev) => ({
          ...prev,
          gender: prev.gender === "male" ? "female" : "male"
        }))
      }
    />
    <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  </label>

  <span className="text-gray-700 dark:text-white">Female</span>
</div>

              </div>
              <button onClick={Signup} disabled={buttonStates.signup} className={`${signupActive ? 'bg-[#0d5ce5]' : 'bg-[#d2d2d2]'} rounded-[10px] text-white text-[24px] w-full px-[22px] py-[20px] flex items-center justify-center dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF] dark:font-semibold`}>
                Next <BiChevronRight size={18} />
              </button>
            </>
          }
          {/* signup form end  */}

          {/* login form start  */}
          {activeTab === tabs.login &&
            <>
              <div className='text-start flex flex-col w-full'>
                <label className="text-start mb-2 dark:text-white" htmlFor="">Email</label>
                <input name="email" value={loginCreds.email} onChange={handleInput} className='' placeholder='Enter your email' type="text" />
              </div>
              <div className='text-start flex flex-col w-full'>
                <label className="text-start mb-2 dark:text-white" htmlFor=""> Password</label>
                <input name="password" value={loginCreds.password} onChange={handleInput} className='' type='password' placeholder='Enter your Password' />
              </div>
              <button onClick={Login} disabled={buttonStates.login} className={`${loginActive ? 'bg-[#0d5ce5]' : 'bg-[#d2d2d2]'} rounded-[10px] text-white text-[24px] w-full px-[22px] py-[20px] flex items-center justify-center dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF] dark:font-semibold`}>
                Login <BiChevronRight size={18} />
              </button>
            </>
          }
          {/* login form end  */}

          <div className="w-full flex flex-col gap-[24px]">
            {!guestDetails &&
              <a onClick={() => {
                setShowGreetPopup(true)
                // joinAsGuest(() => {
                //   closeForm(false)
                //   if (thisLocation.pathname === '/auth') {
                //     navigate('/')
                //   } else {
                //     window.location.reload()
                //   }
                //   // thisLocation === '/auth' ? navigate('/') : window.location.reload()
                // }, () => {
                //   alert('something went wrong')
                // })
              }} className="px-[16px] py-[10px] text-[#344054] flex gap-2 font-semibold cursor-pointer justify-center items-center border rounded-[8px] border-[#d0d5dd] dark:bg-white">
                <BsPersonCircle size={24} />
                Login as Guest User
              </a>
            }
          </div>
        </div>}
    </>
  )
}

export default Form