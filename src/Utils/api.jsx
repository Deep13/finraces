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