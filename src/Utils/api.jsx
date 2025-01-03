import axios from "axios";
let URL = 'https://www.missionatal.com'


export const RegisterUser = async (
  email,
  password,
  firstName,
  lastName,
  onError = () => { },
  onSuccess = () => { }) => {
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
  onSuccess = () => { },
  onError = () => { },
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
    // localStorage.setItem('userName', response.data.user.firstName)
    // localStorage.setItem('Photo', response.data.user.photo)
    let loginUserDetails = {
      userName: response.data.user.firstName,
      userId: response.data.user.id,
      photo: response.data.user.photo
    }
    localStorage.setItem('userDetails', btoa(JSON.stringify(loginUserDetails)))
    localStorage.removeItem('guest_details')
    onSuccess()

  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    onError()
  }
};

export const getStocks = async (
  onSuccess = () => { },
  onError = () => { },
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


export const createRaceAndJoinUser = async (
  raceDetails,
  racePredictions,
  onSuccess = () => { },
  onError = () => { },
) => {
  try {
    const { start_date, start_time, end_date, end_time, name, privacy } = raceDetails;

    let stocksArray = racePredictions.map(curr => curr.stock_id);

    if (!stocksArray || stocksArray.length === 0) {
      throw new Error('No stocks selected for the race.');
    }

    let token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token is missing. Please log in.');
    }

    // Extract year, month, and day from start_date and end_date
    const [startYear, startMonth, startDay] = start_date.split('-');
    const [endYear, endMonth, endDay] = end_date.split('-');

    // Combine extracted date and time into ISO string format
    const startDateTime = new Date(`${startYear}-${startMonth}-${startDay}T${start_time}`).toISOString();
    const endDateTime = new Date(`${endYear}-${endMonth}-${endDay}T${end_time}`).toISOString();

    let raceData = {
      race: {
        privacy,
        isSimulation: true,
        end_date: endDateTime,
        start_date: startDateTime,
        name,
        stocks: stocksArray
      },
      racePredictions
    };

    console.log('Race Payload object', raceData);
    console.log('Race Payload', JSON.stringify(raceData));

    const response = await axios.post(
      `https://www.missionatal.com/api/v1/race-users/race`,
      raceData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const result = response.data;
    onSuccess(result);
  } catch (error) {
    console.error('Error during race creation and prediction:', error.message);
    onError(error);
  }
};



export const getRaceList = async (
  status = 'scheduled',
  onSuccess = () => { },
  onError = () => { }
) => {

  let token = localStorage.getItem('token')
  try {
    const response = await fetch(`https://www.missionatal.com/api/v1/public/races/detailed?limit=10&statuses=${status}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json()
    const data = await responseData.data
    console.log('racelist', data)
    onSuccess(data)

  } catch (error) {
    console.error('Fetch request failed:', error);
    onError(error)
  }
};


export const fetchRaceData = async ( // change this to the updated api
  raceId,
  onSuccess = () => { },
  onError = () => { },
) => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Authentication token is missing. Please log in.');

    const response = await fetch(`https://www.missionatal.com/api/v1/public/races/${raceId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${ token }`
      }
    })
    const thisData = await response.json()
    // console.log(thisData)
    // setRaceStartTime(thisData.start_date)
    const start = new Date(thisData.start_date)
    const end = new Date(thisData.end_date)
    // setStartTimeString(`${ start.getHours() } : ${ start.getMinutes() }`)
    // setEndTimeString(`${ end.getHours() } : ${ end.getMinutes() }`)
    onSuccess(thisData)

  } catch (e) {
    console.error(e)
    onError(e)
  }
}

export const fetchParticipantsData = async (
  raceId,
  onSuccess = () => { },
  onError = () => { },
) => {
  try {
    // const token = localStorage.getItem('token')
    // if (!token) throw new Error('Authentication token is missing. Please log in.');

    const response = await fetch(`https://www.missionatal.com/api/v1/public/races/${raceId}/details`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      }
    })
    const thisData = await response.json()
    // console.log(thisData)
    // setRaceStartTime(thisData.start_date)
    // const start = new Date(thisData.start_date)
    // const end = new Date(thisData.end_date)
    // setStartTimeString(`${start.getHours()} : ${start.getMinutes()}`)
    // setEndTimeString(`${end.getHours()} : ${end.getMinutes()}`)
    onSuccess(thisData)
    return thisData

  } catch (e) {
    console.error(e)
    onError(e)
  }
}

export const fetchAlreadyJoinedUsers = async (
  race_id,
  onSuccess = () => { },
  onError = () => { }
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
    console.log("Already joined users list: ", responseData)
    // setMessage(userList)
    onSuccess(responseData)
  } catch (e) {
    console.log('users that aleready joined error: ', e)
    onError(e)
  }
}

export const joinAsGuest = async (
  onSuccess = () => { },
  onError = () => { },
) => {

  try {
    // console.log('Registration payload', payload);

    const response = await axios.post('https://www.missionatal.com/api/v1/auth/email/guest')
    const data = await response.data
    console.log('Registration successful', data);
    // localStorage.setItem('guest_email', data.email)
    // localStorage.setItem('guest_password', data.password)
    // localStorage.setItem('userName', data.firstName)
    // localStorage.setItem('userId', data.id)
    let details = {
      userName: data.firstName,
      userId: data.id,
      guest_email: data.email,
      guest_password: data.password
    }
    console.log(details)
    localStorage.setItem('guest_details', btoa(JSON.stringify(details)))
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

export const fetchStocks = async (
  race_id,
  onSuccess = () => { },
  onError = () => { }
) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found in localStorage');

    const response = await fetch(
      `https://www.missionatal.com/api/v1/race-stocks/search?race_id=${race_id}`,
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
    // const result = responseData.map((curr) => ({
    //   id: curr.stock.id,
    //   ticker: curr.stock.ticker,
    //   currentPrice: curr.stock_start_rate
    // }));
    console.log('stocks here for joining race', responseData)
    onSuccess(responseData)
    // setStocks(result);
    // setPredictionPrices(new Array(result.length).fill(0)); // Initialize predictionPrices with zeros
  } catch (error) {
    console.error('Fetch request failed:', error.message);
    onError(error)
  }
};


export const joinUserToRace = async (
  raceId,
  racePredictions,
  onSuccess = () => { },
  onError = () => { },
) => {
  try {
    if (!raceId) throw new Error('Race ID is missing.');
    // if (!predictionPrices || predictionPrices.length !== stocks.length) {
    //   throw new Error('Prediction prices must match the number of stocks.');
    // }

    const data = {
      race_id: raceId,
      racePredictions,
    };

    let token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication token is missing. Please log in.');

    const response = await axios.post(
      'https://www.missionatal.com/api/v1/race-users',
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(await response.data);
    const thisData = await response.data
    console.log(thisData.race.id)
    onSuccess(response.data)
    // return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Server responded with an error:', error.response.data);
      console.error(`Joining race failed: ${error.response.data.message || error.response.statusText}`);
    }
    console.error('Error joining race:', error.message);
    onError(error)
    console.log(`Join race error: ${error.message}`);
  }
};


export const RefreshToken = async (
  onSuccess = () => { },
  onError = () => { },
) => {

  let refreshToken = localStorage.getItem('refreshToken')
  const headers = {
    'Content-Type': 'application/json', // Adjust if needed
    'Authorization': `Bearer ${refreshToken}`, // Example for Bearer token
    // Add any other headers you need here
  };

  try {
    const response = await axios.post('https://www.missionatal.com/api/v1/auth/refresh', {}, { headers });

    // console.log('response', response.data);

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    onSuccess()

  } catch (error) {
    // console.error('Login failed:', error.response ? error.response.data : error.message);
    onError(error)
  }
};

export const getStocksDataForRace = async (race_id, onSuccess, onError) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authorization token not found in localStorage");
    }

    const response = await fetch(`https://www.missionatal.com/api/v1/stocks/race/${race_id}`, {
      method: "GET", // Adjust the method if needed (e.g., POST, PUT, DELETE)
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("API Response:", data);
    onSuccess(data)
  } catch (error) {
    console.error("Error fetching stocks data for race:", error.message);
    onError(error)
  }
};


export const getRaceResults = async (race_id, onSuccess, onError,) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authorization token not found in localStorage");
    }

    const response = await fetch(`https://www.missionatal.com/api/v1/public/race-result-data/race/${race_id}`, {
      method: "GET", // Adjust the method if needed (e.g., POST, PUT, DELETE)
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("API Response:", data);
    onSuccess(data)
  } catch (error) {
    console.error("Error fetching stocks data for race:", error.message);
    onError(error)
  }
};



export const getUserDetails = async (onSuccess, onError) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found in localStorage');
    }

    // Make the GET request with the authorization header
    const response = await fetch('https://www.missionatal.com/api/v1/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Optional, adjust if needed
      },
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    // Parse and return the JSON data
    const data = await response.json();
    console.log("user", data)
    onSuccess(data)
  } catch (error) {
    // Handle and log errors
    console.error('Error fetching data:', error.message);
    // throw error; // Re-throw to allow further handling if needed
    onError(error)
  }
};

export const uploadProfilePicture = async (file, onSuccess, onError) => {
  const UPLOAD_URL = 'https://www.missionatal.com/api/v1/files/upload'; // Replace with your upload endpoint
  const token = localStorage.getItem('token')
  let userDetails = JSON.parse(atob(localStorage.getItem('userDetails')))
  // console.log(JSON.parse(atob(userDetails)))

  try {
    // Create FormData object and append file
    const formData = new FormData();
    formData.append('file', file);

    // Make the fetch request with Authorization header
    const response = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`, // Add the Bearer token
      },
    });

    // Check if the response is OK(status in the range 200 - 299)
    if (!response.ok) {
      const errorText = await response.text(); // Extract error message from server if any
      console.error('Server error:', errorText);
      throw new Error(`Failed to upload file: ${response.status} ${response.statusText}`);
    }

    // Parse response JSON
    const data = await response.json();
    console.log('File uploaded successfully:', data);
    userDetails.profilePic = data.file
    await console.log(userDetails)
    await localStorage.setItem('userDetails', btoa(JSON.stringify(userDetails)))
    onSuccess(data)

  } catch (error) {
    // Catch network or other unexpected errors
    console.error('Upload failed:', error.message || error);
    // throw new Error(`An error occurred while uploading: ${error.message}`);
    onError(error)
  }
};


export const updatePhoto = async (photoId, onSuccess, onError) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User is not authenticated. Token is missing.');
    }

    // Define the API endpoint
    const url = 'https://www.missionatal.com/api/v1/auth/me'

    // Create the payload
    const payload = {
      photo: {
        id: photoId,
      },
    };

    // Make the PATCH request
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message}`);
    }

    // Parse and return the response data
    const data = await response.json();
    console.log('Photo updated successfully:', data);
    onSuccess(data)
    // return data;
  } catch (error) {
    // Handle errors
    console.error('Error updating photo:', error.message);
    // return null; // Or handle the error further as needed
    onError(error)
  }
};

export const searchStock = async (prefix) => {

  const transformedList = (data) => {
    return data.map(item => ({
      value: item.id,
      label: item.name
    }))
  }

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User is not authenticated. Token is missing.');
    }

    const url = `https://www.missionatal.com/api/v1/stocks/search?prefix=${prefix}`

    // Make the PATCH request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message}`);
    }

    // Parse and return the response data
    const data = await response.json();
    console.log('Searched Stock with prefix', data);
    // onSuccess(transformedList(data))
    // return transformedList(data)
    return data
  } catch (error) {
    // Handle errors
    console.error('Something went wrong:', error.message);
    // onError(error)
  }
};


export const reportBug = async (
  reportData,
  onSuccess = () => { },
  onError = () => { }
) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User is not authenticated. Token is missing.');
    }

    // Define the API endpoint
    const url = 'https://www.missionatal.com/api/v1/issues'

    // Create the payload
    const payload = {
      ...reportData,
      status: 'string',
    };

    // Make the PATCH request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message}`);
    }

    // Parse and return the response data
    const data = await response.json();
    console.log('Bug reported successfully:', data);
    onSuccess(data)
    // return data;
  } catch (error) {
    // Handle errors
    console.error('Error reporting bug:', error.message);
    // return null; // Or handle the error further as needed
    onError(error)
  }
};

export const racesDataByUser = async (
  userId,
  onSuccess = () => { },
  onError = () => { }
) => {

  if (!userId) return

  let token = localStorage.getItem('token')
  try {
    const response = await fetch(`https://www.missionatal.com/api/v1/public/races/detailed?participatedBy=${userId}`, {
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
    return data

  } catch (error) {
    console.error('Fetch request failed:', error);
    onError(error)
  }
};

export const lastRaceDataByUser = async (
  userId,
  onSuccess = () => { },
  onError = () => { }
) => {

  if (!userId) return

  let token = localStorage.getItem('token')
  try {
    const response = await fetch(`https://www.missionatal.com/api/v1/races/detailed?participatedBy=${userId}&limit=1`, {
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
    return data

  } catch (error) {
    console.error('Fetch request failed:', error);
    onError(error)
  }
};



export const updatePassword = async (oldPassword, newPassword, onSuccess, onError) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User is not authenticated. Token is missing.');
    }

    // Define the API endpoint
    const url = 'https://www.missionatal.com/api/v1/auth/me'

    // Create the payload
    const payload = {
      password: newPassword,
      oldPassword: oldPassword
    };

    // Make the PATCH request
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message}`);
    }

    // Parse and return the response data
    const data = await response.json();
    console.log('Photo updated successfully:', data);
    onSuccess(data)
    // return data;
  } catch (error) {
    // Handle errors
    console.error('Error updating photo:', error.message);
    // return null; // Or handle the error further as needed
    onError(error)
  }
};



export const updateProfile = async (payload, onSuccess, onError) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User is not authenticated. Token is missing.');
    }

    // Define the API endpoint
    const url = 'https://www.missionatal.com/api/v1/auth/me'


    // Make the PATCH request
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message}`);
    }

    // Parse and return the response data
    const data = await response.json();
    console.log('Photo updated successfully:', data);
    onSuccess(data)
    // return data;
  } catch (error) {
    // Handle errors
    console.error('Error updating photo:', error.message);
    // return null; // Or handle the error further as needed
    onError(error)
  }
};


export const getTop4 = async (
  startDate,
  endDate,
  onSuccess = () => { },
  onError = () => { },
) => {
  // let token = localStorage.getItem('token')
  try {
    let response = await axios.get(`https://www.missionatal.com/api/v1/public/race-results/stats?limit=4`, {
      headers: {
        // 'Authorization': `Bearer ${token}`, // Example for passing a token
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


export const getTopRankers = async (
  startDate,
  endDate,
  limit,
  page,
  onSuccess = () => { },
  onError = () => { },
) => {
  let token = localStorage.getItem('token')
  try {
    let response = await axios.get(`https://www.missionatal.com/api/v1/race-results/stats?limit=${limit}`, {
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


export const getUser = async (
  id,
  onSuccess = () => { },
  onError = () => { }
) => {
  try {
    const response = await axios.get(`https://www.missionatal.com/api/v1/public/users/${id}`)
    const result = await response.data
    onSuccess(result)
    return result
  } catch (error) {
    console.error('User fetch error:', error.response?.data?.message || error.message)
    onError(error)
    throw error
  }
}

export const getTotalPointsUser = async (
  id,
  onSuccess = () => { },
  onError = () => { }
) => {
  try {
    const response = await axios.get(`https://www.missionatal.com/api/v1/public/race-results/count?userId=${id}`)
    const result = await response.data
    onSuccess(result)
    return result
  } catch (error) {
    console.error('User fetch error:', error.response?.data?.message || error.message)
    onError(error)
    throw error
  }
}

export const getWinningRate = async (
  id,
  onSuccess = () => { },
  onError = () => { }
) => {
  try {
    const response = await axios.get(`https://www.missionatal.com/api/v1/public/race-results/users/${id}/winning-rate`)
    const result = await response.data
    onSuccess(result)
    return result
  } catch (error) {
    console.error('User fetch error:', error.response?.data?.message || error.message)
    onError(error)
    throw error
  }
}


export const sendFriendRequest = async (recieverId, onSuccess, onError) => {
  const UPLOAD_URL = 'https://www.missionatal.com/api/v1/friends'; // Replace with your upload endpoint
  const token = localStorage.getItem('token');

  try {
    // Make the fetch request with Authorization header
    const response = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: JSON.stringify({
        receiver: Number(recieverId), // Ensure recieverId is converted to a number
      }),
      headers: {
        Authorization: `Bearer ${token}`, // Add the Bearer token
        'Content-Type': 'application/json', // Correctly placed Content-Type header
      },
    });

    // Check if the response is OK (status in the range 200 - 299)
    if (!response.ok) {
      throw new Error(`Failed to send request: ${response.status} ${response.statusText}`);
    }

    // Parse response JSON
    const data = await response.json();
    console.log('Request sent successfully:', data);
    onSuccess(data);
  } catch (error) {
    console.error('Request failed:', error.message || error);
    onError(error);
  }
};

export const getRacesCountByRank = async (
  id,
  rank,
  onSuccess = () => { },
  onError = () => { }
) => {
  try {
    const response = await axios.get(`https://www.missionatal.com/api/v1/public/race-results/count?userId=${id}&rank=${rank}`)
    const result = await response.data
    onSuccess(result)
    return result
  } catch (error) {
    console.error('User fetch error:', error.response?.data?.message || error.message)
    onError(error)
    throw error
  }
}


export const getAllBadges = async (
  onSuccess = () => { },
  onError = () => { },
) => {
  // let token = localStorage.getItem('token')
  try {
    let response = await axios.get(`https://www.missionatal.com/api/v1/public/user-badges`, {
      headers: {
        // 'Authorization': `Bearer ${token}`, // Example for passing a token
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


export const fuzzySearch = async (prefix) => {


  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User is not authenticated. Token is missing.');
    }

    const url = `https://www.missionatal.com/api/v1/public/search/race-users?nameContains=${prefix}`

    // Make the PATCH request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
    });

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message}`);
    }

    // Parse and return the response data
    const data = await response.json();
    console.log('Searched Stock with prefix', data);
    // onSuccess(transformedList(data))
    // return transformedList(data)
    return data
  } catch (error) {
    // Handle errors
    console.error('Something went wrong:', error.message);
    // onError(error)
  }
};


export const searchUsers = async (prefix) => {


  try {


    const url = `https://www.missionatal.com/api/v1/public/search/users?nameContains=${prefix}`

    // Make the PATCH request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message}`);
    }

    // Parse and return the response data
    const data = await response.json();
    console.log('Searched Users with prefix', data);
    // onSuccess(transformedList(data))
    // return transformedList(data)
    return data
  } catch (error) {
    // Handle errors
    console.error('Something went wrong:', error.message);
    // onError(error)
  }
};

export const fetchRaceDataDetailed = async ( // change this to the updated api
  raceId,
  onSuccess = () => { },
  onError = () => { },
) => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Authentication token is missing. Please log in.');

    const response = await fetch(`https://www.missionatal.com/api/v1/public/races/${raceId}/details`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
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

export const fetchFriendsLeaderboard = async (
  friendOfUserId,
  onSuccess = () => { },
  onError = () => { }
) => {

  const token = localStorage.getItem('token')
  try {
    let response = await axios.get(`https://www.missionatal.com/api/v1/race-results/stats?friendOfUserId=${Number(friendOfUserId)}`, {
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


export const checkFriendRequestStatus = async ( // change this to the updated api
  userId,
  onSuccess = () => { },
  onError = () => { },
) => {
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(`https://www.missionatal.com/api/v1/friends/${userId}/request`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const thisData = await response.json()
    onSuccess(thisData)
  } catch (e) {
    console.error(e)
    onError(e)
  }
}


export const settings = async ( // change this to the updated api
  onSuccess = () => { },
  onError = () => { },
) => {
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(`https://www.missionatal.com/api/v1/settings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const thisData = await response.json()
    onSuccess(thisData)
  } catch (e) {
    console.error(e)
    onError(e)
  }
}


export const getSettings = async (
  onSuccess = () => { },
  onError = () => { },
) => {
  let token = localStorage.getItem('token')
  try {
    let response = await axios.get(`https://www.missionatal.com/api/v1/settings`, {
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


export const changeSettings = async (payload, onSuccess = () => { }, onError = () => { }) => {
  const UPLOAD_URL = 'https://www.missionatal.com/api/v1/settings'; // Replace with your upload endpoint
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Authorization token is missing');
    onError(new Error('Authorization token is missing'));
    return;
  }

  try {
    // Make the fetch request with Authorization header
    const response = await fetch(UPLOAD_URL, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json', // Specify JSON payload
        Authorization: `Bearer ${token}`, // Add the Bearer token
      },
    });

    // Check if the response is OK (status in the range 200 - 299)
    if (!response.ok) {
      const errorText = await response.text(); // Extract error message from server if any
      console.error('Server error:', errorText);
      throw new Error(errorText || 'Failed to update');
    }

    // Parse response JSON
    const data = await response.json();
    onSuccess(data); // Invoke success callback with data
  } catch (error) {
    // Catch network or other unexpected errors
    console.error('Upload failed:', error.message || error);
    onError(error); // Invoke error callback with the error object
  }
};


export const deleteAccount = async (payload, onSuccess, onError) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found in localStorage');
    }

    // Make the GET request with the authorization header
    const response = await fetch('https://www.missionatal.com/api/v1/auth/me', {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Optional, adjust if needed
      },
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    // Parse and return the JSON data
    const data = await response.json();
    console.log("user", data)
    onSuccess(data)
  } catch (error) {
    // Handle and log errors
    console.error('Error fetching data:', error.message);
    // throw error; // Re-throw to allow further handling if needed
    onError(error)
  }
};


export const getAllPendingRequests = async (
  onSuccess = () => { },
  onError = () => { },
) => {
  let token = localStorage.getItem('token')
  try {
    let response = await axios.get(`https://www.missionatal.com/api/v1/friends/pending-requests`, {
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

export const approveRequest = async (
  id,
  onSuccess = () => { },
  onError = () => { },
) => {
  let token = localStorage.getItem('token')
  try {
    let response = fetch(`https://www.missionatal.com/api/v1/friends/${id}/approve`, {
      method: 'PATCH',
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

export const rejectRequest = async (
  id,
  onSuccess = () => { },
  onError = () => { },
) => {
  let token = localStorage.getItem('token')
  try {
    let response = await fetch(`https://www.missionatal.com/api/v1/friends/${id}/reject`, {
      method: 'PATCH',
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