import axios from "axios";
let URL = 'https://www.missionatal.com'


export const RegisterUser = async (
    email, 
    password, 
    firstName, 
    lastName, 
    onError = ()=> {}, 
    onSuccess=()=> {}) => {
    // Validate all required fields

    const payload = {
        email,
        password,
        firstName,
        lastName: lastName === "" ? " " : lastName,
        is_guest: false,
    };

    try {
        // console.log('Registration payload', payload);

        const response = await axios.post(`https://www.missionatal.com/api/v1/auth/email/register`, payload);
        const data = await response.data
        console.log('Registration successful', data);
        onSuccess()
    } catch (error) {
        console.error('Registration failed:', error.response ? error.response.data : error.message);
        onError()
    }
};


export const Login = async (
    email, 
    password,
    onSuccess = () => {},
    onError = () => {},
) => {

    const payload = {
      email: email,
      password: password
    };

    try {
      console.log('login payload', payload);

      const response = await axios.post('https://www.missionatal.com/api/v1/auth/email/login', payload);

      console.log('response', response.data);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('userName', response.data.user.firstName)
      localStorage.setItem('userId', response.data.user.id)
      onSuccess()

    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      onError()
    }
  };


// export function isValidEmail(email) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   }