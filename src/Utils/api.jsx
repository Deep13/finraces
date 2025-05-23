import { data } from "autoprefixer";
import axios from "axios";
import { globalUrl } from "../Config";
import { MdCommentsDisabled } from "react-icons/md";

let GlobalURL = globalUrl;

export const RegisterUser = async (
  email,
  password,
  firstName,
  lastName,
  gender,
  onError = () => {},
  onSuccess = () => {}
) => {
  // Validate all required fields
  const payload = {
    email,
    password,
    firstName,
    lastName: lastName === "" ? " " : lastName,
    gender,
    is_guest: false,
  };

  console.log("payload", payload);
  console.log("input", gender);
  try {
    // console.log('Registration payload', payload);
    const response = await axios.post(
      `${GlobalURL}/api/v1/auth/email/register`,
      payload
    );
    const data = await response.data;
    console.log("Registration successful", data);
    onSuccess();
  } catch (error) {
    console.error(
      "Registration failed:",
      error.response ? error.response.data : error.message
    );
    onError();
  }
};

export const Login = async (
  email,
  password,
  onSuccess = () => {},
  onError = () => {}
) => {
  const payload = {
    email: email,
    password: password,
  };

  try {
    console.log("login payload", payload);

    const response = await axios.post(
      `${GlobalURL}/api/v1/auth/email/login`,
      payload
    );

    console.log("response", response.data);

    localStorage.setItem("token", response.data.token);
    localStorage.removeItem("fin_userDetails");
    localStorage.setItem("refreshToken", response.data.refreshToken);
    // localStorage.setItem('userName', response.data.user.firstName)
    // localStorage.setItem('Photo', response.data.user.photo)
    let loginUserDetails = {
      userName: response.data.user.firstName,
      userId: response.data.user.id,
      photo: response.data.user.photo,
      gender: response.data.user.gender,
    };
    localStorage.setItem(
      "fin_userDetails",
      btoa(JSON.stringify(loginUserDetails))
    );
    localStorage.removeItem("guest_details");
    onSuccess();
  } catch (error) {
    console.error(
      "Login failed:",
      error.response ? error.response.data : error.message
    );
    onError();
  }
};

export const getStocks = async (onSuccess = () => {}, onError = () => {}) => {
  let token = localStorage.getItem("token");
  try {
    let response = await axios.get(`${GlobalURL}/api/v1/stocks`, {
      headers: {
        Authorization: `Bearer ${token}`, // Example for passing a token
      },
    });
    let result = await response.data;
    // console.log('result success', result)
    onSuccess(result);
    // setStocks(result.data)
  } catch (e) {
    console.error("stock error", e.response.data.message);
    if (e.response.data.message === "Unauthorized") {
      alert("You are not Authorized");
      onError();
    }
  }
};

export const createRaceAndJoinUser = async (
  raceDetails,
  racePredictions,
  onSuccess = () => {},
  onError = () => {}
) => {
  try {
    const { start_date, start_time, end_date, end_time, name, privacy } =
      raceDetails;

    let stocksArray = racePredictions.map((curr) => curr.stock_id);

    if (!stocksArray || stocksArray.length === 0) {
      throw new Error("No stocks selected for the race.");
    }

    let token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token is missing. Please log in.");
    }

    // Extract year, month, and day from start_date and end_date
    const [startYear, startMonth, startDay] = start_date.split("-");
    const [endYear, endMonth, endDay] = end_date.split("-");

    // Combine extracted date and time into ISO string format
    const startDateTime = new Date(
      `${startYear}-${startMonth}-${startDay}T${start_time}`
    ).toISOString();
    const endDateTime = new Date(
      `${endYear}-${endMonth}-${endDay}T${end_time}`
    ).toISOString();

    let raceData = {
      race: {
        privacy: privacy,
        isSimulation: true,
        end_date: endDateTime,
        start_date: startDateTime,
        name,
        stocks: stocksArray,
      },
      racePredictions,
    };

    console.log("Race Payload object", raceData);
    console.log("Race Payload", JSON.stringify(raceData));

    const response = await axios.post(
      `${GlobalURL}/api/v1/race-users/race`,
      raceData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const result = response.data;
    onSuccess(result);
  } catch (error) {
    console.error("Error during race creation and prediction:", error.message);
    onError(error);
  }
};

export const getRaceList = async (
  status = "scheduled",
  page = 1,
  onSuccess = () => {},
  onError = () => {},
  filters = { endDate: "", selectedStocks: [], startDate: "" }
) => {
  // let token = localStorage.getItem('token')
  let url = `${GlobalURL}/api/v1/public/races/detailed?limit=10&statuses=${status}&page=${page}`;

  if (filters.endDate != "") {
    let formatttedDate = new Date(filters.endDate).toISOString();
    url += `&endDateLessThanEqual=${formatttedDate}`;
  }
  if (filters.startDate != "") {
    let formatttedDate = new Date(filters.startDate).toISOString();
    url += `&endDateGreaterThanEqual=${formatttedDate}`;
  }
  if (filters.selectedStocks.length > 0) {
    filters.selectedStocks.forEach((stock) => {
      url += `&tickersContains=${stock}`;
    });
  }
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    console.log("racelist", responseData);
    onSuccess(responseData);
  } catch (error) {
    console.error("Fetch request failed:", error);
    onError(error);
  }
};

export const fetchRaceData = async (
  // change this to the updated api
  raceId,
  onSuccess = () => {},
  onError = () => {}
) => {
  try {
    // const token = localStorage.getItem('token')
    // if (!token) throw new Error('Authentication token is missing. Please log in.');

    const response = await fetch(`${GlobalURL}/api/v1/public/races/${raceId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${ token }`
      },
    });
    const thisData = await response.json();
    // console.log(thisData)
    // setRaceStartTime(thisData.start_date)
    // const start = new Date(thisData.start_date)
    // const end = new Date(thisData.end_date)
    // setStartTimeString(`${ start.getHours() } : ${ start.getMinutes() }`)
    // setEndTimeString(`${ end.getHours() } : ${ end.getMinutes() }`)
    onSuccess(thisData);
  } catch (e) {
    console.error(e);
    onError(e);
  }
};

export const fetchParticipantsData = async (
  raceId,
  onSuccess = () => {},
  onError = () => {}
) => {
  try {
    // const token = localStorage.getItem('token')
    // if (!token) throw new Error('Authentication token is missing. Please log in.');

    const response = await fetch(
      `${GlobalURL}/api/v1/public/races/${raceId}/details`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${token}`
        },
      }
    );
    const thisData = await response.json();
    // console.log(thisData)
    // setRaceStartTime(thisData.start_date)
    // const start = new Date(thisData.start_date)
    // const end = new Date(thisData.end_date)
    // setStartTimeString(`${start.getHours()} : ${start.getMinutes()}`)
    // setEndTimeString(`${end.getHours()} : ${end.getMinutes()}`)
    onSuccess(thisData);
    return thisData;
  } catch (e) {
    console.error(e);
    onError(e);
  }
};

export const fetchAlreadyJoinedUsers = async (
  race_id,
  onSuccess = () => {},
  onError = () => {}
) => {
  try {
    // const token = localStorage.getItem('token');
    // if (!token) throw new Error('No token found in localStorage');

    const response = await fetch(
      `${GlobalURL}/api/v1/public/race-users/search/?race_id=${race_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const responseData = await response.json();
    let userList = responseData.map((curr) => {
      return (
        curr.user.firstName + " " + curr.user.lastName + " has joined the Race"
      );
    });
    console.log("Already joined users list: ", responseData);
    // setMessage(userList)
    onSuccess(responseData);
  } catch (e) {
    console.log("users that aleready joined error: ", e);
    onError(e);
  }
};

export const joinAsGuest = async (
  payload,
  onSuccess = () => {},
  onError = () => {}
) => {
  try {
    console.log("Registration payload", payload);

    const response = await axios.post(
      `${GlobalURL}/api/v1/auth/email/guest`,
      payload
    );
    const data = await response.data;
    console.log("Registration successful", data);
    // localStorage.setItem('guest_email', data.email)
    // localStorage.setItem('guest_password', data.password)
    // localStorage.setItem('userName', data.firstName)
    // localStorage.setItem('userId', data.id)
    let details = {
      userName: data.firstName,
      userId: data.id,
      guest_email: data.email,
      guest_password: data.password,
    };
    console.log(details);
    localStorage.setItem("guest_details", btoa(JSON.stringify(details)));
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    // right now there is no token recieved when registering a user so I use login function
    // just after signing up
    onSuccess(data);
  } catch (error) {
    console.error(
      "Registration failed:",
      error.response ? error.response.data : error.message
    );
    onError(error);
  }
};

export const fetchStocks = async (
  race_id,
  onSuccess = () => {},
  onError = () => {}
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found in localStorage");

    const response = await fetch(
      `${GlobalURL}/api/v1/race-stocks/search?race_id=${race_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
    console.log("stocks here for joining race", responseData);
    onSuccess(responseData);
    // setStocks(result);
    // setPredictionPrices(new Array(result.length).fill(0)); // Initialize predictionPrices with zeros
  } catch (error) {
    console.error("Fetch request failed:", error.message);
    onError(error);
  }
};

export const joinUserToRace = async (
  raceId,
  racePredictions,
  onSuccess = () => {},
  onError = () => {}
) => {
  try {
    if (!raceId) throw new Error("Race ID is missing.");
    // if (!predictionPrices || predictionPrices.length !== stocks.length) {
    //   throw new Error('Prediction prices must match the number of stocks.');
    // }

    const data = {
      race_id: raceId,
      racePredictions,
    };

    let token = localStorage.getItem("token");
    if (!token)
      throw new Error("Authentication token is missing. Please log in.");

    const response = await axios.post(`${GlobalURL}/api/v1/race-users`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(await response.data);
    const thisData = await response.data;
    console.log(thisData.race.id);
    onSuccess(response.data);
    // return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
      console.error(
        `Joining race failed: ${
          error.response.data.message || error.response.statusText
        }`
      );
    }
    console.error("Error joining race:", error.message);
    onError(error);
    console.log(`Join race error: ${error.message}`);
  }
};

export const RefreshToken = async (
  onSuccess = () => {},
  onError = () => {}
) => {
  let refreshToken = localStorage.getItem("refreshToken");
  const headers = {
    "Content-Type": "application/json", // Adjust if needed
    Authorization: `Bearer ${refreshToken}`, // Example for Bearer token
    // Add any other headers you need here
  };

  try {
    const response = await axios.post(
      `${GlobalURL}/api/v1/auth/refresh`,
      {},
      { headers }
    );

    // console.log('response', response.data);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    onSuccess();
  } catch (error) {
    // console.error('Login failed:', error.response ? error.response.data : error.message);
    onError(error);
  }
};

export const getStocksDataForRace = async (race_id, onSuccess, onError) => {
  try {
    // Retrieve the token from localStorage
    // const token = localStorage.getItem("token");

    // if (!token) {
    //   throw new Error("Authorization token not found in localStorage");
    // }

    const response = await fetch(
      `${GlobalURL}/api/v1/public/stocks/race/${race_id}`,
      {
        method: "GET", // Adjust the method if needed (e.g., POST, PUT, DELETE)
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("API Response:", data);
    onSuccess(data);
  } catch (error) {
    console.error("Error fetching stocks data for race:", error.message);
    onError(error);
  }
};

export const updateNotification = async (
  notificationIDs,
  onSuccess,
  onError
) => {
  try {
    const payload = {
      ids: notificationIDs,
    };
    const token = localStorage.getItem("token");
    const response = await fetch(`${GlobalURL}/api/v1/notifications`, {
      method: "PATCH", // Adjust the method if needed (e.g., POST, PUT, DELETE)
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // console.log("API Response:", data);
    onSuccess();
  } catch (error) {
    onError(error);
  }
};

export const getRaceResults = async (race_id, onSuccess, onError) => {
  try {
    // Retrieve the token from localStorage
    // const token = localStorage.getItem("token");

    // if (!token) {
    //   throw new Error("Authorization token not found in localStorage");
    // }

    const response = await fetch(
      `${GlobalURL}/api/v1/public/race-result-data/race/${race_id}`,
      {
        method: "GET", // Adjust the method if needed (e.g., POST, PUT, DELETE)
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("API Response:", data);
    onSuccess(data);
  } catch (error) {
    console.error("Error fetching stocks data for race:", error.message);
    onError(error);
  }
};

export const getUserDetails = async (onSuccess, onError) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found in localStorage");
    }

    // Make the GET request with the authorization header
    const response = await fetch(`${GlobalURL}/api/v1/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Optional, adjust if needed
      },
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );
    }

    // Parse and return the JSON data
    const data = await response.json();
    console.log("user", data);
    onSuccess(data);
  } catch (error) {
    // Handle and log errors
    console.error("Error fetching data:", error.message);
    // throw error; // Re-throw to allow further handling if needed
    onError(error);
  }
};

export const uploadProfilePicture = async (file, onSuccess, onError) => {
  const UPLOAD_URL = `${GlobalURL}/api/v1/files/upload`; // Replace with your upload endpoint
  const token = localStorage.getItem("token");
  let userDetails = JSON.parse(atob(localStorage.getItem("fin_userDetails")));
  // console.log(JSON.parse(atob(userDetails)))

  try {
    // Create FormData object and append file
    const formData = new FormData();
    formData.append("file", file);

    // Make the fetch request with Authorization header
    const response = await fetch(UPLOAD_URL, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`, // Add the Bearer token
      },
    });

    // Check if the response is OK(status in the range 200 - 299)
    if (!response.ok) {
      const errorText = await response.text(); // Extract error message from server if any
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to upload file: ${response.status} ${response.statusText}`
      );
    }

    // Parse response JSON
    const data = await response.json();
    console.log("File uploaded successfully:", data);
    userDetails.profilePic = data.file;
    await console.log(userDetails);
    await localStorage.setItem(
      "fin_userDetails",
      btoa(JSON.stringify(userDetails))
    );
    onSuccess(data);
  } catch (error) {
    // Catch network or other unexpected errors
    console.error("Upload failed:", error.message || error);
    // throw new Error(`An error occurred while uploading: ${error.message}`);
    onError(error);
  }
};

export const updatePhoto = async (photoId, onSuccess, onError) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated. Token is missing.");
    }

    // Define the API endpoint
    const url = `${GlobalURL}/api/v1/auth/me`;

    // Create the payload
    const payload = {
      photo: {
        id: photoId,
      },
    };

    // Make the PATCH request
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
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
    console.log("Photo updated successfully:", data);
    onSuccess(data);
    // return data;
  } catch (error) {
    // Handle errors
    console.error("Error updating photo:", error.message);
    // return null; // Or handle the error further as needed
    onError(error);
  }
};

export const searchStock = async (prefix) => {
  const transformedList = (data) => {
    return data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  };

  try {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   throw new Error('User is not authenticated. Token is missing.');
    // }

    const url = `${GlobalURL}/api/v1/public/stocks/search?prefix=${prefix}`;

    // Make the PATCH request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
    console.log("Searched Stock with prefix", data);
    // onSuccess(transformedList(data))
    // return transformedList(data)
    return data;
  } catch (error) {
    // Handle errors
    console.error("Something went wrong:", error.message);
    // onError(error)
  }
};

export const searchIndiStock = async (
  stockId,
  onSuccess = () => {},
  onError = () => {}
) => {
  try {
    const url = `${GlobalURL}/api/v1/public/stocks/${stockId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Parse and return the response data
    const data = await response.json();
    console.log("Searched Stock with prefix", data);
    onSuccess(data);
    return data;
  } catch (error) {
    // Handle errors
    console.error("Something went wrong:", error.message);
    onError(error);
  }
};

export const debounceStockSearchj = async (
  prefix,
  onSuccess = () => {},
  onError = () => {}
) => {
  try {
    const url = `${GlobalURL}/api/v1/public/stocks?filters=${JSON.stringify({
      namePrefix: prefix,
    })}`;

    // Make the PATCH request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });

    // Parse and return the response data
    const data = await response.json();
    console.log("Searched Stock with prefix", data.data);
    onSuccess(data.data);
    return data;
  } catch (error) {
    // Handle errors
    console.error("Something went wrong:", error.message);
    // onError(error)
  }
};

export const reportBug = async (
  reportData,
  onSuccess = () => {},
  onError = () => {}
) => {
  try {
    // Retrieve the token from localStorage
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   throw new Error('User is not authenticated. Token is missing.');
    // }

    // Define the API endpoint
    const url = `${GlobalURL}/api/v1/public/issues`;

    // Create the payload
    const payload = {
      ...reportData,
      status: "string",
    };

    // Make the PATCH request
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
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
    console.log("Bug reported successfully:", data);
    onSuccess(data);
    // return data;
  } catch (error) {
    // Handle errors
    console.error("Error reporting bug:", error.message);
    // return null; // Or handle the error further as needed
    onError(error);
  }
};

export const racesDataByUser = async (
  userId,
  onSuccess = () => {},
  onError = () => {}
) => {
  if (!userId) return;

  let token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `${GlobalURL}/api/v1/public/races/detailed?participatedBy=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    const data = await responseData.data;
    // console.log('racelist', data)
    onSuccess(data);
    return data;
  } catch (error) {
    console.error("Fetch request failed:", error);
    onError(error);
  }
};

export const lastRaceDataByUser = async (
  userId,
  onSuccess = () => {},
  onError = () => {}
) => {
  if (!userId) return;

  let token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `${GlobalURL}/api/v1/races/detailed?participatedBy=${userId}&limit=1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    const data = await responseData.data;
    // console.log('racelist', data)
    onSuccess(data);
    return data;
  } catch (error) {
    console.error("Fetch request failed:", error);
    onError(error);
  }
};

export const updatePassword = async (
  oldPassword,
  newPassword,
  onSuccess,
  onError
) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated. Token is missing.");
    }

    // Define the API endpoint
    const url = `${GlobalURL}/api/v1/auth/me`;

    // Create the payload
    const payload = {
      password: newPassword,
      oldPassword: oldPassword,
    };

    // Make the PATCH request
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
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
    console.log("Photo updated successfully:", data);
    onSuccess(data);
    // return data;
  } catch (error) {
    // Handle errors
    console.error("Error updating photo:", error.message);
    // return null; // Or handle the error further as needed
    onError(error);
  }
};

export const updateProfile = async (payload, onSuccess, onError) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated. Token is missing.");
    }

    // Define the API endpoint
    const url = `${GlobalURL}/api/v1/auth/me`;
    const replaceEmptyStrings = (obj) => {
      return JSON.parse(
        JSON.stringify(obj, (key, value) => (value === "" ? " " : value))
      );
    };

    const updatedPayload = replaceEmptyStrings(payload);

    // Make the PATCH request
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedPayload),
    });

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message}`);
    }

    // Parse and return the response data
    const data = await response.json();
    console.log("Photo updated successfully:", data);
    onSuccess(data);
    // return data;
  } catch (error) {
    // Handle errors
    console.error("Error updating photo:", error.message);
    // return null; // Or handle the error further as needed
    onError(error);
  }
};

export const getTop4 = async (
  startDate,
  endDate,
  onSuccess = () => {},
  onError = () => {},
  limit = 4
) => {
  // let token = localStorage.getItem('token')
  try {
    let response = await axios.get(
      `${GlobalURL}/api/v1/public/race-results/stats?limit=${limit}`,
      {
        headers: {
          // 'Authorization': `Bearer ${token}`, // Example for passing a token
        },
      }
    );
    let result = await response.data;
    // console.log('result success', result)
    onSuccess(result);
    // setStocks(result.data)
  } catch (e) {
    console.error("stock error", e.response.data.message);
    if (e.response.data.message === "Unauthorized") {
      alert("You are not Authorized");
      onError();
    }
  }
};

const formatLocalDateTime = (dateStr) => {
  const date = new Date(dateStr);
  const pad = (n) => n.toString().padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
};

export const getTopRankers = async (
  startDate,
  endDate,
  limit = 10,
  page = 1,
  searchQuery = "",
  onSuccess = () => {},
  onError = () => {},
  filterType = "rank",
  direction = "ASC"
) => {
  try {
    let url = `${GlobalURL}/api/v1/public/race-results/stats?limit=${limit}&page=${page}&sortOrder=${direction}`;

    if (filterType == "Points") {
      url += `&sortBy=points`;
    }
    if (filterType == "Name") {
      url += `&sortBy=name`;
    }
    if (filterType == "Races") {
      url += `&sortBy=races_won`;
    }

    if (startDate) url += `&from=${formatLocalDateTime(startDate)}`;
    if (endDate) url += `&to=${formatLocalDateTime(endDate)}`;
    if (searchQuery) url += `&nameContains=${searchQuery}`;

    console.log("Final URL:", JSON.stringify(url));

    const response = await axios.get(url);
    onSuccess(response.data);
  } catch (e) {
    const errorMsg = e?.response?.data?.message || e.message || "Unknown error";
    console.error("getTopRankers error:", errorMsg);

    if (errorMsg === "Unauthorized") {
      alert("You are not authorized");
    }

    onError(errorMsg);
  }
};

export const getUser = async (id, onSuccess = () => {}, onError = () => {}) => {
  try {
    const response = await axios.get(`${GlobalURL}/api/v1/public/users/${id}`);
    const result = await response.data;
    onSuccess(result);
    return result;
  } catch (error) {
    console.error(
      "User fetch error:",
      error.response?.data?.message || error.message
    );
    onError(error);
    throw error;
  }
};

export const getTotalPointsUser = async (
  id,
  onSuccess = () => {},
  onError = () => {}
) => {
  try {
    const response = await axios.get(
      `${GlobalURL}/api/v1/public/race-results/count?userId=${id}`
    );
    const result = await response.data;
    onSuccess(result);
    return result;
  } catch (error) {
    console.error(
      "User fetch error:",
      error.response?.data?.message || error.message
    );
    onError(error);
    throw error;
  }
};

export const getWinningRate = async (
  id,
  onSuccess = () => {},
  onError = () => {}
) => {
  try {
    const response = await axios.get(
      `${GlobalURL}/api/v1/public/race-results/users/${id}/winning-rate`
    );
    const result = await response.data;
    onSuccess(result);
    return result;
  } catch (error) {
    console.error(
      "User fetch error:",
      error.response?.data?.message || error.message
    );
    onError(error);
    throw error;
  }
};

export const sendFriendRequest = async (recieverId, onSuccess, onError) => {
  const UPLOAD_URL = `${GlobalURL}/api/v1/friends`; // Replace with your upload endpoint
  const token = localStorage.getItem("token");

  try {
    // Make the fetch request with Authorization header
    const response = await fetch(UPLOAD_URL, {
      method: "POST",
      body: JSON.stringify({
        receiver: Number(recieverId), // Ensure recieverId is converted to a number
      }),
      headers: {
        Authorization: `Bearer ${token}`, // Add the Bearer token
        "Content-Type": "application/json", // Correctly placed Content-Type header
      },
    });

    // Check if the response is OK (status in the range 200 - 299)
    if (!response.ok) {
      throw new Error(
        `Failed to send request: ${response.status} ${response.statusText}`
      );
    }

    // Parse response JSON
    const data = await response.json();
    console.log("Request sent successfully:", data);
    onSuccess(data);
  } catch (error) {
    console.error("Request failed:", error.message || error);
    onError(error);
  }
};

export const getRacesCountByRank = async (
  id,
  rank,
  onSuccess = () => {},
  onError = () => {}
) => {
  try {
    const response = await axios.get(
      `${GlobalURL}/api/v1/public/race-results/count?userId=${id}&rank=${rank}`
    );
    const result = await response.data;
    onSuccess(result);
    return result;
  } catch (error) {
    console.error(
      "User fetch error:",
      error.response?.data?.message || error.message
    );
    onError(error);
    throw error;
  }
};

export const getAllBadges = async (
  userId,
  onSuccess = () => {},
  onError = () => {}
) => {
  // let token = localStorage.getItem('token')
  try {
    let response = await axios.get(
      `${GlobalURL}/api/v1/public/user-badges?userId=${userId}`,
      {
        headers: {
          // 'Authorization': `Bearer ${token}`, // Example for passing a token
        },
      }
    );
    let result = await response.data;
    // console.log('result success', result)
    onSuccess(result);
    // setStocks(result.data)
  } catch (e) {
    console.error("stock error", e.response.data.message);
    if (e.response.data.message === "Unauthorized") {
      alert("You are not Authorized");
      onError();
    }
  }
};

export const fuzzySearch = async (prefix) => {
  try {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   throw new Error('User is not authenticated. Token is missing.');
    // }

    const url = `${GlobalURL}/api/v1/public/search/race-users?nameContains=${prefix}`;

    // Make the PATCH request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
    console.log("Searched Stock with prefix", data);
    // onSuccess(transformedList(data))
    // return transformedList(data)
    return data;
  } catch (error) {
    // Handle errors
    console.error("Something went wrong:", error.message);
    // onError(error)
  }
};

export const searchUsers = async (prefix, limit = "") => {
  try {
    let url = `${GlobalURL}/api/v1/public/search/users?nameContains=${prefix}`;
    if (limit != "") {
      url += `&limit=${limit}`;
    }

    // Make the PATCH request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message}`);
    }

    // Parse and return the response data
    const data = await response.json();
    console.log("Searched Users with prefix", data);
    // onSuccess(transformedList(data))
    // return transformedList(data)
    return data;
  } catch (error) {
    // Handle errors
    console.error("Something went wrong:", error.message);
    // onError(error)
  }
};

export const fetchRaceDataDetailed = async (
  // change this to the updated api
  raceId,
  onSuccess = () => {},
  onError = () => {}
) => {
  try {
    // const token = localStorage.getItem('token')
    // if (!token) throw new Error('Authentication token is missing. Please log in.');

    const response = await fetch(
      `${GlobalURL}/api/v1/public/races/${raceId}/details`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${token}`
        },
      }
    );
    const thisData = await response.json();
    // console.log(thisData)
    // setRaceStartTime(thisData.start_date)
    const start = new Date(thisData.start_date);
    const end = new Date(thisData.end_date);
    // setStartTimeString(`${start.getHours()} : ${start.getMinutes()}`)
    // setEndTimeString(`${end.getHours()} : ${end.getMinutes()}`)
    onSuccess(thisData);
  } catch (e) {
    console.error(e);
    onError(e);
  }
};

export const fetchFriendsLeaderboard = async (
  friendOfUserId,
  onSuccess = () => {},
  onError = () => {}
) => {
  const token = localStorage.getItem("token");
  try {
    let response = await axios.get(
      `${GlobalURL}/api/v1/user-leaderboards?friendOfUserId=${Number(
        friendOfUserId
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Example for passing a token
        },
      }
    );
    let result = await response.data;
    // console.log('result success', result)
    onSuccess(result);
    // setStocks(result.data)
  } catch (e) {
    console.error("stock error", e.response.data.message);
    if (e.response.data.message === "Unauthorized") {
      alert("You are not Authorized");
      onError();
    }
  }
};

export const checkFriendRequestStatus = async (
  userId,
  onSuccess = () => {},
  onError = () => {}
) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${GlobalURL}/api/v1/friends/${userId}/request`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("status response", response);

    // Check if the response has a body
    let thisData = null;
    if (response.ok) {
      try {
        const contentLength = response.headers.get("Content-Length");
        if (contentLength && parseInt(contentLength) > 0) {
          thisData = await response.json();
        }
      } catch (jsonError) {
        console.warn("Failed to parse JSON:", jsonError);
      }

      if (!thisData) {
        onSuccess({ status: "not initiated" });
      } else {
        onSuccess(thisData);
      }
    } else {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (e) {
    console.error(e);
    onError(e);
  }
};

export const settings = async (
  // change this to the updated api
  onSuccess = () => {},
  onError = () => {}
) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${GlobalURL}/api/v1/settings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const thisData = await response.json();
    onSuccess(thisData);
  } catch (e) {
    console.error(e);
    onError(e);
  }
};

export const getSettings = async (onSuccess = () => {}, onError = () => {}) => {
  let token = localStorage.getItem("token");
  try {
    let response = await axios.get(`${GlobalURL}/api/v1/settings`, {
      headers: {
        Authorization: `Bearer ${token}`, // Example for passing a token
      },
    });
    let result = await response.data;
    // console.log('result success', result)
    onSuccess(result);
    // setStocks(result.data)
  } catch (e) {
    console.error("stock error", e.response.data.message);
    if (e.response.data.message === "Unauthorized") {
      alert("You are not Authorized");
      onError();
    }
  }
};

export const changeSettings = async (
  payload,
  onSuccess = () => {},
  onError = () => {}
) => {
  const UPLOAD_URL = `${GlobalURL}/api/v1/settings`; // Replace with your upload endpoint
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Authorization token is missing");
    onError(new Error("Authorization token is missing"));
    return;
  }

  try {
    // Make the fetch request with Authorization header
    const response = await fetch(UPLOAD_URL, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json", // Specify JSON payload
        Authorization: `Bearer ${token}`, // Add the Bearer token
      },
    });

    // Check if the response is OK (status in the range 200 - 299)
    if (!response.ok) {
      const errorText = await response.text(); // Extract error message from server if any
      console.error("Server error:", errorText);
      throw new Error(errorText || "Failed to update");
    }

    // Parse response JSON
    const data = await response.json();
    onSuccess(data); // Invoke success callback with data
  } catch (error) {
    // Catch network or other unexpected errors
    console.error("Upload failed:", error.message || error);
    onError(error); // Invoke error callback with the error object
  }
};

export const deleteAccount = async (payload, onSuccess, onError) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found in localStorage");
    }

    // Make the GET request with the authorization header
    const response = await fetch(`${GlobalURL}/api/v1/auth/me`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Optional, adjust if needed
      },
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );
    }

    // Parse and return the JSON data
    const data = await response.json();
    console.log("user", data);
    onSuccess(data);
  } catch (error) {
    // Handle and log errors
    console.error("Error fetching data:", error.message);
    // throw error; // Re-throw to allow further handling if needed
    onError(error);
  }
};

export const getAllPendingRequests = async (
  onSuccess = () => {},
  onError = () => {}
) => {
  let token = localStorage.getItem("token");
  try {
    let response = await axios.get(
      `${GlobalURL}/api/v1/friends/pending-requests`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Example for passing a token
        },
      }
    );
    let result = await response.data;
    // console.log('result success', result)
    onSuccess(result);
    // setStocks(result.data)
  } catch (e) {
    console.error("stock error", e.response.data.message);
    if (e.response.data.message === "Unauthorized") {
      alert("You are not Authorized");
      onError();
    }
  }
};

export const approveRequest = async (
  id,
  onSuccess = () => {},
  onError = () => {}
) => {
  let token = localStorage.getItem("token");
  try {
    let response = fetch(`${GlobalURL}/api/v1/friends/${id}/approve`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`, // Example for passing a token
      },
    });
    let result = await response.data;
    // console.log('result success', result)
    onSuccess(result);
    // setStocks(result.data)
  } catch (e) {
    console.error("stock error", e.response.data.message);
    if (e.response.data.message === "Unauthorized") {
      alert("You are not Authorized");
      onError();
    }
  }
};

export const rejectRequest = async (
  id,
  onSuccess = () => {},
  onError = () => {}
) => {
  let token = localStorage.getItem("token");
  try {
    let response = await fetch(`${GlobalURL}/api/v1/friends/${id}/reject`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`, // Example for passing a token
      },
    });
    let result = await response.data;
    // console.log('result success', result)
    onSuccess(result);
    // setStocks(result.data)
  } catch (e) {
    console.error("stock error", e.response.data.message);
    if (e.response.data.message === "Unauthorized") {
      alert("You are not Authorized");
      onError();
    }
  }
};

export const unfriend = async (
  userId,
  onSuccess = () => {},
  onError = () => {}
) => {
  let token = localStorage.getItem("token");
  try {
    let response = await fetch(
      `${GlobalURL}/api/v1/friends/${userId}/unfriend`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`, // Example for passing a token
        },
      }
    );
    let result = await response.data;
    // console.log('result success', result)
    onSuccess(result);
    // setStocks(result.data)
  } catch (e) {
    console.error("stock error", e.response.data.message);
    if (e.response.data.message === "Unauthorized") {
      alert("You are not Authorized");
      onError();
    }
  }
};

export const blockUser = async (userToBlockId, onSuccess, onError) => {
  const UPLOAD_URL = `${GlobalURL}/api/v1/block-users`; // Replace with your upload endpoint
  const token = localStorage.getItem("token");

  try {
    // Make the fetch request with Authorization header
    const response = await fetch(UPLOAD_URL, {
      method: "POST",
      body: JSON.stringify({
        blocked_user: userToBlockId.toString(), // Ensure recieverId is converted to a number
      }),
      headers: {
        Authorization: `Bearer ${token}`, // Add the Bearer token
        "Content-Type": "application/json", // Correctly placed Content-Type header
      },
    });

    // Check if the response is OK (status in the range 200 - 299)
    if (!response.ok) {
      throw new Error(
        `Failed to send request: ${response.status} ${response.statusText}`
      );
    }

    // Parse response JSON
    const data = await response.json();
    console.log("Request sent successfully:", data);
    onSuccess(data);
  } catch (error) {
    console.error("Request failed:", error.message || error);
    onError(error);
  }
};

export const getAllblockedUsers = async (
  userId,
  onSuccess = () => {},
  onError = () => {}
) => {
  let token = localStorage.getItem("token");
  try {
    let response = await axios.get(`${GlobalURL}/api/v1/block-users`, {
      headers: {
        Authorization: `Bearer ${token}`, // Example for passing a token
      },
    });
    let result = await response.data;
    // console.log('result success', result)
    onSuccess(result);
    // setStocks(result.data)
  } catch (e) {
    console.error("stock error", e.response.data.message);
    if (e.response.data.message === "Unauthorized") {
      alert("You are not Authorized");
    }
    onError(e);
  }
};

export const getUsersBlockStatus = async (
  userId,
  onSuccess = () => {},
  onError = () => {}
) => {
  let token = localStorage.getItem("token");
  try {
    let response = await axios.get(
      `${GlobalURL}/api/v1/block-users/${userId}/request`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Example for passing a token
        },
      }
    );
    let result = await response.data;
    // console.log('result success', result)
    onSuccess(result);
    // setStocks(result.data)
  } catch (e) {
    console.error("stock error", e.response.data.message);
    if (e.response.data.message === "Unauthorized") {
      alert("You are not Authorized");
      onError();
    }
  }
};

export const unblockUser = async (userToUnblockId, onSuccess, onError) => {
  const UPLOAD_URL = `${GlobalURL}/api/v1/block-users/${userToUnblockId}`; // Replace with your upload endpoint
  const token = localStorage.getItem("token");

  try {
    // Make the fetch request with Authorization header
    const response = await fetch(UPLOAD_URL, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Add the Bearer token
        "Content-Type": "application/json", // Correctly placed Content-Type header
      },
    });

    // Check if the response is OK (status in the range 200 - 299)
    if (!response.ok) {
      throw new Error(
        `Failed to send request: ${response.status} ${response.statusText}`
      );
    }

    // Parse response JSON
    const data = await response.json();
    console.log("Unblocked successfully:", data);
    // onSuccess(data);
  } catch (error) {
    console.error("Request failed:", error.message || error);
    onError(error);
  }
};

//market losers
export const getMarketLosers = async (
  onSuccess = () => {},
  onError = () => {}
) => {
  // let token = localStorage.getItem('token')
  try {
    let response = await axios.get(`${GlobalURL}/api/v1/public/stocks/losers`, {
      headers: {
        // 'Authorization': `Bearer ${token}`, // Example for passing a token
      },
    });
    let result = await response.data;
    // console.log('result success', result)
    onSuccess(result);
    // setStocks(result.data)
  } catch (e) {
    console.error("stock error", e.response.data.message);
    if (e.response.data.message === "Unauthorized") {
      // alert('You are not Authorized')
      onError();
    }
  }
};

//market gainers
export const getMarketGainers = async (
  onSuccess = () => {},
  onError = () => {}
) => {
  // let token = localStorage.getItem('token')
  try {
    let response = await axios.get(
      `${GlobalURL}/api/v1/public/stocks/gainers`,
      {
        headers: {
          // 'Authorization': `Bearer ${token}`, // Example for passing a token
        },
      }
    );
    let result = await response.data;
    // console.log('result success', result)
    onSuccess(result);
    // setStocks(result.data)
  } catch (e) {
    console.error("stock error", e.response.data.message);
    if (e.response.data.message === "Unauthorized") {
      // alert('You are not Authorized')
      onError();
    }
  }
};

//PE Ratio
export const getPERatio = async (
  onSuccess = () => {},
  onError = () => {},
  ticker
) => {
  let token = localStorage.getItem("token");
  try {
    let response = await axios.get(
      `${GlobalURL}/api/v1/stocks/${ticker}/peratio`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Example for passing a token
        },
      }
    );
    let result = await response.data;
    // console.log('result success', result)
    onSuccess(result);
    // setStocks(result.data)
  } catch (e) {
    console.error("stock error", e.response.data.message);
    if (e.response.data.message === "Unauthorized") {
      // alert('You are not Authorized')
      onError();
    }
  }
};

export const getIncomeStatement = async (
  onSuccess = () => {},
  onError = () => {},
  ticker
) => {
  let token = localStorage.getItem("token");
  try {
    let response = await axios.get(
      `${GlobalURL}/api/v1/stocks/${ticker}/incomestatement`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Example for passing a token
        },
      }
    );
    let result = await response.data;
    // console.log('result success', result)
    onSuccess(result);
    // setStocks(result.data)
  } catch (e) {
    console.error("stock error", e.response.data.message);
    if (e.response.data.message === "Unauthorized") {
      // alert('You are not Authorized')
      onError();
    }
  }
};

export const getStockProfile = async (
  onSuccess = () => {},
  onError = () => {},
  ticker
) => {
  let token = localStorage.getItem("token");
  try {
    let response = await axios.get(
      `${GlobalURL}/api/v1/stocks/${ticker}/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Example for passing a token
        },
      }
    );
    let result = await response.data;
    console.log("result success", ticker);
    onSuccess(result);
    // setStocks(result.data)
  } catch (e) {
    console.error("stock error", e.response.data.message);
    if (e.response.data.message === "Unauthorized") {
      onError();
    }
  }
};

export const getStockHistory = async (
  ticker,
  timeframe,
  startDate,
  endDate,
  onSuccess,
  onError
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${GlobalURL}/api/v1/stocks/${ticker}/history`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { timeframe, startDate, endDate }, // Use `params` for query parameters
      }
    );

    // Check if request was successful
    if (response.status === 200) {
      onSuccess(response.data); // Pass stock history data
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching stock history:", error);

    // If error response exists, pass it, otherwise send a generic error
    onError(
      error.response
        ? error.response.data
        : { message: "An error occurred while fetching stock history." }
    );
  }
};

export const addToWatchList = async (stockId, onSuccess, onError) => {
  try {
    let token = localStorage.getItem("token");
    const payload = { stock: stockId };
    const url = `${GlobalURL}/api/v1/stock-watchlists`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // If response is not successful, throw an error with response status text
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add stock to watchlist");
    }

    const data = await response.json(); // Parse response JSON
    onSuccess(data); // Call success callback with API response
  } catch (error) {
    onError(error.message); // Call error callback with error message
  }
};

export const getWatchList = async (onSuccess, onError, pageNum = 1) => {
  try {
    let token = localStorage.getItem("token");

    const response = await axios.get(
      `${GlobalURL}/api/v1/stock-watchlists?page=${pageNum}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      onSuccess(response.data); // Pass stock history data
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    onError(error);
  }
};

export const deleteFromWatchlist = async (id, onSuccess, onError) => {
  try {
    let token = localStorage.getItem("token");

    let url = `${GlobalURL}/api/v1/stock-watchlists/${id}`;

    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if request was successful
    if (response.status === 200) {
      onSuccess(response.data); // Pass stock history data
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    onError(error);
  }
};

export const getStockComparisonData = async (ticker, onSuccess, onError) => {
  try {
    let token = localStorage.getItem("token");
    let url = `${GlobalURL}/api/v1/stocks/${ticker}/financials`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if request was successful
    if (response.status === 200) {
      onSuccess(response.data); // Pass stock history data
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    onError(error);
  }
};

export const getChats = async (onSuccess, onError, id, page = 1) => {
  if (!id) return;
  try {
    let token = localStorage.getItem("token");
    let userDetails = JSON.parse(atob(localStorage.getItem("fin_userDetails")));
    console.log("user", userDetails);
    let url = `${GlobalURL}/api/v1/messages?receiver=${id}&page=${page}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if request was successful
    if (response.status === 200) {
      onSuccess(response.data); // Pass stock history data
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    onError(error);
  }
};

export const postChats = async (msg, reciever, onSuccess, onError) => {
  console.log("check", msg, reciever);
  try {
    let token = localStorage.getItem("token");
    const payload = {
      is_read: false,
      content: msg,
      receiver: reciever,
    };
    const url = `${GlobalURL}/api/v1/messages`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // If response is not successful, throw an error with response status text
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json(); // Parse response JSON
    onSuccess(data); // Call success callback with API response
  } catch (error) {
    onError(error);
  }
};

export const markChatsAsRead = async (chatId, onSuccess, onError) => {
  try {
    let token = localStorage.getItem("token");
    const url = `${GlobalURL}/api/v1/messages/${chatId}`;
    const payload = {
      is_read: true,
    };

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // If response is not successful, throw an error with response status text
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json(); // Parse response JSON
    onSuccess(data); // Call success callback with API response
  } catch (error) {
    onError(error);
  }
};

export const getAllChats = async (onSuccess, onError) => {
  try {
    let token = localStorage.getItem("token");
    let userDetails = JSON.parse(atob(localStorage.getItem("fin_userDetails")));
    console.log("user", userDetails);
    let url = `${GlobalURL}/api/v1/messages/users`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if request was successful
    if (response.status === 200) {
      onSuccess(response.data); // Pass stock history data
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    onError(error);
  }
};

export const checkWatchlist = async (ticker, onSuccess, onError) => {
  try {
    let token = localStorage.getItem("token");

    let url = `${GlobalURL}/api/v1/stock-watchlists/ticker/${ticker}/exists`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if request was successful
    if (response.status === 200) {
      onSuccess(response.data); // Pass stock history data
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    onError(error);
  }
};

export const getStockChartData = async (
  ticker,
  startDate,
  endDate,
  units,
  onSuccess,
  onError
) => {
  console.log("inputs", ticker, startDate, endDate, units);
  try {
    let token = localStorage.getItem("token");

    let url = `${GlobalURL}/api/v1/stocks/${ticker}/aggregates?multiplierNum=1&timespanUnit=${units}&startDate=${startDate}&endDate=${endDate}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if request was successful
    if (response.status === 200) {
      onSuccess(response.data); // Pass stock history data
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    onError(error);
  }
};

export const uploadImage = async (file, onSuccess, onError) => {
  const UPLOAD_URL = `${GlobalURL}/api/v1/files/upload`;
  const token = localStorage.getItem("token");

  try {
    if (!file) throw new Error("No file provided");
    if (!token) throw new Error("Missing token in localStorage");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(UPLOAD_URL, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        // Do NOT set Content-Type manually when using FormData.
        // The browser will set it along with the boundary
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Upload failed:", errorText);
      throw new Error(
        `Upload failed with status ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Upload successful:", data);
    onSuccess(data);
  } catch (error) {
    console.error("Error in uploadImage:", error);
    onError(error);
  }
};

export const postCommunityPost = async (
  title,
  content,
  img,
  onSuccess,
  onError
) => {
  try {
    const token = localStorage.getItem("token");
    const url = `${GlobalURL}/api/v1/community-posts`;

    const commonData = {
      seo: {
        id: "eda4717e-36f6-43ad-8f1a-6630b3e93a9c",
      },
      title,
      content,
    };

    const reqBody = img
      ? {
          ...commonData,
          image: {
            id: img,
          },
        }
      : commonData;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reqBody), // ✅ MUST be stringified
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Community post created successfully:", data);
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

export const getPosts = async (
  filterType,
  onSuccess,
  onError,
  page = 1,
  userId
) => {
  try {
    const token = localStorage.getItem("token");
    let url = `${GlobalURL}/api/v1/community-posts?page=${page}`;
    let userDetails = JSON.parse(atob(localStorage.getItem("fin_userDetails")));

    if (filterType == "Search") {
      url += `&userId=${userId}`;
    }
    const params = new URLSearchParams();

    if (filterType === "My posts") {
      // params.append("userId", userDetails.userId);
      url += `&userId=${userDetails.userId}`;
    }

    if (filterType === "Following") {
      url += "&";
      params.append("filterByFollowing", "true"); // stringified boolean
    }
    if ([...params].length > 0) {
      url += `${params.toString()}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

export const deletePost = async (postId, onSuccess, onError) => {
  const token = localStorage.getItem("token");
  let url = `${GlobalURL}/api/v1/community-posts/${postId}`;
  // let userDetails = JSON.parse(atob(localStorage.getItem('fin_userDetails')));

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    // const data = await response.json();
    onSuccess();
  } catch (error) {
    onError(error);
  }
};

export const getPostDetailed = async (postId, onSuccess, onError) => {
  const token = localStorage.getItem("token");
  let url = `${GlobalURL}/api/v1/community-posts/${postId}`;
  // let userDetails = JSON.parse(atob(localStorage.getItem('fin_userDetails')));

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

export const likePost = async (postId, onSuccess, onError) => {
  try {
    const token = localStorage.getItem("token");
    let url = `${GlobalURL}/api/v1/community-post-likes`;
    const reqBody = {
      post: {
        id: postId,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reqBody), // ✅ MUST be stringified
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Community post created successfully:", data);
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};
export const dislikePost = async (postId, onSuccess, onError) => {
  try {
    const token = localStorage.getItem("token");
    let url = `${GlobalURL}/api/v1/community-post-likes/${postId}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    // const data = await response.json();
    // console.log('Community post created successfully:', data);
    onSuccess();
  } catch (error) {
    onError(error);
  }
};

export const getUserLikes = async (onSuccess, onError) => {
  const token = localStorage.getItem("token");

  let userDetails = JSON.parse(atob(localStorage.getItem("fin_userDetails")));
  let url = `${GlobalURL}/api/v1/community-post-likes?userId=${userDetails.userId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

export const getPostComments = async (postId, onSuccess, onError) => {
  const token = localStorage.getItem("token");
  let url = `${GlobalURL}/api/v1/community-post-comments?postId=${postId}`;
  // let userDetails = JSON.parse(atob(localStorage.getItem('fin_userDetails')));

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await response.text(); // Get raw response

    if (!response.ok) {
      console.error("Server error response:", text);
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // ✅ Safely parse JSON if there is content
    const data = text ? JSON.parse(text) : null;
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

export const postComments = async (
  postId,
  title,
  content,
  onSuccess,
  onError
) => {
  try {
    const token = localStorage.getItem("token");
    const url = `${GlobalURL}/api/v1/community-post-comments`;

    const reqBody = {
      title: title, // Make sure this is a plain string
      content: content, // Make sure this is a plain string
      post: {
        id: postId, // Must be a string too
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reqBody), // ✅ MUST be stringified
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Community post created successfully:", data);
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

export const postBlog = async (
  seoId,
  category,
  title,
  excerpt,
  content,
  img,
  onSuccess,
  onError
) => {
  try {
    const token = localStorage.getItem("token");
    const url = `${GlobalURL}/api/v1/blogs`;

    const reqBody = {
      title: title, // Make sure this is a plain string
      content: content,
      excerpt: excerpt, // Make sure this is a plain string
      seo: {
        id: seoId, // Must be a string too
      },
      category: {
        id: category,
      },
      image: {
        id: img,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reqBody), // ✅ MUST be stringified
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Community post created successfully:", data);
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

export const getBlogs = async (onSuccess, onError, category, page = 1) => {
  try {
    const token = localStorage.getItem("token");
    let url = `${GlobalURL}/api/v1/blogs?blogCategoryId=${category}&page=${page}&limit=12`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

export const getBlogDetailed = async (blogId, onSuccess, onError) => {
  const token = localStorage.getItem("token");
  let url = `${GlobalURL}/api/v1/blogs/${blogId}`;
  // let userDetails = JSON.parse(atob(localStorage.getItem('fin_userDetails')));

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

export const followUser = async (followeeId, onSuccess, onError) => {
  let token = localStorage.getItem("token");
  let url = `${GlobalURL}/api/v1/follows`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ followee: String(followeeId) }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

export const unFollowUser = async (followeeId, onSuccess, onError) => {
  let token = localStorage.getItem("token");
  let url = `${GlobalURL}/api/v1/follows/${followeeId}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    // const data = await response.json();
    onSuccess();
  } catch (error) {
    onError(error);
  }
};

export const likeComment = async (commentId, onSuccess, onError) => {
  try {
    const token = localStorage.getItem("token");
    let url = `${GlobalURL}/api/v1/community-comment-likes`;
    const reqBody = {
      post: {
        id: commentId,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reqBody), // ✅ MUST be stringified
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Community post created successfully:", data);
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

export const dislikeComment = async (commentId, onSuccess, onError) => {
  try {
    const token = localStorage.getItem("token");
    let url = `${GlobalURL}/api/v1/community-comment-likes/${commentId}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    // const data = await response.json();
    // console.log('Community post created successfully:', data);
    onSuccess();
  } catch (error) {
    onError(error);
  }
};

export const getUserLikedComments = async (onSuccess, onError) => {
  const token = localStorage.getItem("token");

  let userDetails = JSON.parse(atob(localStorage.getItem("fin_userDetails")));
  let url = `${GlobalURL}/api/v1/community-comment-likes?userId=${userDetails.userId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

export const getFriends = async (onSuccess, onError, name = "") => {
  try {
    let token = localStorage.getItem("token");
    let url = `${GlobalURL}/api/v1/friends`;
    if (name != "") {
      url += `?nameContains=${name}`;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

export const unfollowUser = async (userId, onSuccess, onError) => {
  try {
    const token = localStorage.getItem("token");
    let url = `${GlobalURL}/api/v1/follows/${userId}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    // const data = await response.json();
    // console.log('Community post created successfully:', data);
    onSuccess();
  } catch (error) {
    onError(error);
  }
};
export const getFollowers = async (onSuccess, onError, userId) => {
  try {
    let token = localStorage.getItem("token");
    let url = `${GlobalURL}/api/v1/follows/followers`;
    if (userId) {
      url += `?userId=${userId}`;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

export const getFollowing = async (onSuccess, onError, userId) => {
  try {
    let token = localStorage.getItem("token");
    let url = `${GlobalURL}/api/v1/follows/followees`;

    if (userId) {
      url += `?userId=${userId}`;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

export const getFollowees = async (onSuccess, onError) => {
  try {
    let token = localStorage.getItem("token");
    let url = `${GlobalURL}/api/v1/follows/followees`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

export const sendRaceInvite = async (
  raceId,
  friendList,
  onSuccess,
  onError
) => {
  try {
    const token = localStorage.getItem("token");
    let url = `${GlobalURL}/api/v1/race-invitations`;
    const formattedList = friendList.map((friend) => ({
      id: friend.id,
    }));

    console.log(formattedList); // This will output an array of objects with just the "id" property

    let inviteBody = {
      invited_users: formattedList,
      race: {
        id: raceId,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inviteBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    // const data = await response.json();
    // console.log('Community post created successfully:', data);
    onSuccess();
  } catch (error) {
    onError(error);
  }
};

export const getBlogCategories = async (onSuccess, onError) => {
  try {
    const token = localStorage.getItem("token");
    let url = `${GlobalURL}/api/v1/blog-categories`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

export const getRacePredictionsTable = async (userId, onSuccess, onError) => {
  try {
    let url = `${GlobalURL}/api/v1/races/detailed?participatedBy=${userId}`;
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

export const getFriendsCount = async (userId, onSuccess, onError) => {
  try {
    let url = `${GlobalURL}/api/v1/friends/count?userId=${userId}`;
    let token = localStorage.getItem("token");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(
        `Failed to post: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};
