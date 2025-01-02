import { BsPersonCircle } from "react-icons/bs";
import { BiCheckCircle } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import React, { useEffect, useState } from 'react'
import facebook_icon from '../../assets/icons/facebook_icon.svg'
import Verified from '../../assets/icons/Featured_icon.svg'
import { RegisterUser, Login as LoginUser } from "../../Utils/api";
import { useNavigate, useLocation } from "react-router-dom";
import { joinAsGuest } from "../../Utils/api";
import { BiChevronRight } from "react-icons/bi";



const tabs = {
  signup: 'signup',
  login: 'login',
  success: 'success',
}


const Form = ({
  closeForm = () => { }
}) => {

  const [activeTab, setActiveTab] = useState(tabs.signup)
  const [signupCreds, setSignupCreds] = useState({
    fullName: '',
    email: '',
    password: '',
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
    if (!fullName || !email || !password) {
      // alert('Please fill all the fields')
      return false
    }

    const isEmail = email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!isEmail) {
      // alert('Incorrect Email')
      return false
    }


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
    if (!validateSignup()) {
      return
    }
    // here the signup function is called
    // alert('ok your are registered')
    let { email, password, fullName } = signupCreds
    const { firstName, lastName } = splitFullName(fullName)
    RegisterUser(email, password, firstName, lastName, () => {
      alert('Something went wrong')
    }, () => {
      setActiveTab(tabs.success)
      setSignupCreds({
        fullName: '',
        email: '',
        password: '',
      })
    })
  }

  const Login = () => {
    if (!validateLogin()) {
      // error handling
      return
    }
    // alert('ok your are Loggedin')
    const { email, password } = loginCreds
    LoginUser(email, password, () => {
      closeForm(false)
      if (thisLocation.pathname === '/auth') {
        navigate('/')
      } else {
        window.location.reload()
      }
      // thisLocation === '/auth' ? navigate('/') : window.location.reload()
    }, () => {
      alert('something went wrong')
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
  }, [])

  return (

    <>
      {activeTab === tabs.success ?
        <div className={`w-full flex justify-center items-center ${thisLocation.pathname === '/' ? 'py-8' : ''}`}>
          <div className={`w-full  ${thisLocation.pathname === '/' ? 'scale-75' : 'scale-100'} relative flex items-center flex-col gap-[29px]`}>
            <div className="w-full py-4">
              <h2 className="text-center text-[30px] text-[#292d32] dark:text-white">Email Verified!</h2>
              <p className="text-[#384453] dark:text-white text-center">We have sent you a 6 digit code. Please enter here to Verify email.</p>
            </div>
            <div>
              <img src={Verified} alt="verified_mark" />
            </div>
            <div className='text-[24px] text-[#1a1e25] font-semibold text-center dark:text-white'>Congratulations</div>
            <p className="text-[#384453] dark:text-white">Your email has been successfully verified</p>
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
                <label className="text-start mb-2 dark:text-white" htmlFor="">Full Name</label>
                <input name="fullName" value={signupCreds.fullName} onChange={handleInput} placeholder='Enter your name' type="text" />
              </div>
              <div className='text-start flex flex-col w-full'>
                <label className="text-start mb-2 dark:text-white" htmlFor="">Email</label>
                <input name="email" value={signupCreds.email} onChange={handleInput} className='' placeholder='Enter your email' type="text" />
              </div>
              <div className='text-start flex flex-col w-full'>
                <label className="text-start mb-2 dark:text-white" htmlFor="">Create Password</label>
                <input name="password" value={signupCreds.password} onChange={handleInput} className='' type='password' placeholder='Enter your Password' />
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
                <label className="text-start mb-2 dark:text-white" htmlFor="">Create Password</label>
                <input name="password" value={loginCreds.password} onChange={handleInput} className='' type='password' placeholder='Enter your Password' />
              </div>
              <button onClick={Login} disabled={buttonStates.login} className={`${loginActive ? 'bg-[#0d5ce5]' : 'bg-[#d2d2d2]'} rounded-[10px] text-white text-[24px] w-full px-[22px] py-[20px] flex items-center justify-center dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF] dark:font-semibold`}>
                Login <BiChevronRight size={18} />
              </button>
            </>
          }
          {/* login form end  */}

          <div className="w-full flex flex-col gap-[24px]">
            {!localStorage.getItem('guest_details') &&
              <a onClick={() => {
                joinAsGuest(() => {
                  closeForm(false)
                  if (thisLocation.pathname === '/auth') {
                    navigate('/')
                  } else {
                    window.location.reload()
                  }
                  // thisLocation === '/auth' ? navigate('/') : window.location.reload()
                }, () => {
                  alert('something went wrong')
                })
              }} className="px-[16px] py-[10px] text-[#344054] flex gap-2 font-semibold cursor-pointer justify-center items-center border rounded-[8px] border-[#d0d5dd] dark:bg-white">
                <BsPersonCircle size={24} />
                Login as Guest User
              </a>
            }
            {/* <a className="px-[16px] py-[10px] text-[#344054] flex gap-2 font-semibold cursor-pointer justify-center items-center border rounded-[8px] border-[#d0d5dd] dark:bg-white">
              <FcGoogle size={24} />
              Sign in with Google
            </a>
            <a className="px-[16px] py-[10px] text-[#344054] flex gap-2 font-semibold cursor-pointer justify-center items-center border rounded-[8px] border-[#d0d5dd] dark:bg-white">
              <img className="w-[24px] h-[24px]" src={facebook_icon} alt="facebook_icon" />
              Sign in with Facebook
            </a> */}
          </div>
        </div>}
    </>
  )
}

export default Form