import axios from "axios";

const axiosClient = axios.create({
<<<<<<< HEAD
  baseURL: "http://192.168.1.194:5000/",
=======
  baseURL: "http://192.168.0.13:5000/",
>>>>>>> f370ea94bbf5e2ff023f52ff62523bd0c99ef510
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
