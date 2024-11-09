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

  export const getStocks = async (
    onSuccess = () => {},
    onError = () => {},
  ) => {
    let token = localStorage.getItem('token')
    try {
        let response = await axios.get(`https://www.missionatal.com/api/v1/stocks`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Example for passing a token
            }
        })
        let result = await response.data
        // console.log('result success', result)
        onSuccess(result)
        // setStocks(result.data)
    } catch (e) {
        console.error('stock error', e.response.data.message)
        if (e.response.data.message === 'Unauthorized') {
            alert('You are not Authorized')
            onError()
        }
    }
}

export  const createRaceAndJoinUser = async (
    raceDetails, 
    racePredictions,
    onSuccess = () => {},
    onError = () => {},
) => {
  try {

    const {start_date, duration, start_time} = raceDetails

    const startDateTimeString = `${start_date}T${start_time}`;

    const startDateTime = new Date(startDateTimeString);
    let [hours, minutes] = duration.split(':').map(Number)
    console.log('This is da time', hours + " " + minutes)
    const endTime = new Date(startDateTime.getTime() + (hours*3600 + minutes*60) * 1000);

    let stocksArray = racePredictions.map(curr => {
        return curr.stock_id
    })
     
      if (!stocksArray || stocksArray.length === 0) {
          throw new Error('No stocks selected for the race.');
      }


      let token = localStorage.getItem('token');
      if (!token) {
          throw new Error('Authentication token is missing. Please log in.');
      }

      let raceData = {
        race: {
            "isSimulation": false,
            "end_date": endTime,
            "start_date": startDateTime,
            "name": raceDetails.name,
            "stocks": stocksArray
        },
        racePredictions
      }

      console.log('Race Payload object',raceData)
      console.log('Race Payload',JSON.stringify(raceData))
    //   return

      const response = await axios.post(
          `https://www.missionatal.com/api/v1/race-users/race`,
          raceData,
          { headers: { Authorization: `Bearer ${token}` } }
      );

      const result = response.data
      onSuccess(result)
    //   navigate(`/race/${response.data.id}`);
  } catch (error) {
      console.error('Error during race creation and prediction:', error.message);
      onError(error)
  }
};


export const getRaceList = async (
  status = 'scheduled',
  onSuccess = () => {},  
  onError = () => {}
) => {

  let token = localStorage.getItem('token')
  try {
      const response = await fetch(`https://www.missionatal.com/api/v1/races?limit=10&statuses=${status}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json()
      const data = await responseData.data
      // console.log('racelist', data)
      onSuccess(data)

  } catch (error) {
      console.error('Fetch request failed:', error);
      onError(error)
  }
};


export const fetchRaceData = async (
  raceId, 
  onSuccess = () => {},
  onError = () => {},
) => {
  try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Authentication token is missing. Please log in.');

      const response = await fetch(`https://www.missionatal.com/api/v1/races/${raceId}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      })
      const thisData = await response.json()
      // console.log(thisData)
      // setRaceStartTime(thisData.start_date)
      const start = new Date(thisData.start_date)
      const end = new Date(thisData.end_date)
      // setStartTimeString(`${start.getHours()} : ${start.getMinutes()}`)
      // setEndTimeString(`${end.getHours()} : ${end.getMinutes()}`)
      onSuccess(thisData)

  } catch (e) {
      console.error(e)
      onError(e)
  }
}

export const fetchAlreadyJoinedUsers = async (
  race_id, 
  onSuccess = () => {},
  onError = () => {}
) => {
  try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found in localStorage');

      const response = await fetch(
          `https://www.missionatal.com/api/v1/race-users/search/?race_id=${race_id}`,
          {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
              },
          }
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const responseData = await response.json();
      let userList = responseData.map(curr => {
          return curr.user.firstName + " " + curr.user.lastName + " has joined the Race"
      })
      console.log("Already joined users list: ", userList)
      // setMessage(userList)
      onSuccess(responseData)
  } catch (e) {
      console.log('users that aleready joined error: ', e)
      onError(e)
  }
}

export const joinAsGuest = async (
    onSuccess = () => {},
    onError = () => {},
) => {

    try {
      // console.log('Registration payload', payload);

      const response = await axios.post('https://www.missionatal.com/api/v1/auth/email/guest')
      const data = await response.data
      console.log('Registration successful', data);
      localStorage.setItem('guest_email', data.email)
      localStorage.setItem('guest_password', data.password)
      localStorage.setItem('userName', data.firstName)
      localStorage.setItem('userId', data.id)
      localStorage.setItem('token', data.token)
      localStorage.setItem('refreshToken', data.refreshToken)
      // right now there is no token recieved when registering a user so I use login function 
      // just after signing up
      onSuccess(data)
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      onError(error)
    }
  }