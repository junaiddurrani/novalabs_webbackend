import axios from "axios"; 
const API_URL = "http://localhost:5000/api/auth";

const signup = (email, password, name, designation, timeslots) => {
  return axios.post(API_URL + "/createUser",
      {
          'name': name,
          'email': email,
          'password': password,
          'designation': designation,
          'timeslots': timeslots
        })
    .then((response) => {
      if (response.data.authToken) {
        localStorage.setItem("token", response.data.authToken);
        localStorage.setItem("userid", response.data.userid);
      }

      return response.data.authToken;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/login", {
      'email': email,
      'password': password
    })
    .then((response) => {
      if (response.data.authToken) {
        localStorage.setItem("token", response.data.authToken);
        localStorage.setItem("userid", response.data.userid);
      }

      return response.data.authToken;
    });
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userid');
};

const getCurrentUser = () => {
  return localStorage.getItem('token');
};

const getCurrentUserId = () => {
  return localStorage.getItem('userid');
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  getCurrentUserId
};

export default authService;