// import axios from "axios";
// import AppConfig from "./app-config";

// const axiosInstance = axios.create({
//   baseURL: AppConfig.api_baseurl,
//   timeout: 10000, // Set a timeout limit for requests
//   headers: AppConfig.headers,
// });

// // Request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Add any custom logic before the request is sent
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Token"] = `${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     // Handle request error
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     // Any custom logic for handling successful responses
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Example: Redirect to login if unauthorized
//       localStorage.clear();
//       // window.location.href = "/";
//       // window.location.reload();
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

import axios from "axios";
import AppConfig from "./app-config";
import { toast } from "react-toastify";


const axiosInstance = axios.create({
  baseURL: AppConfig.api_baseurl,
  timeout: 10000, // Set a timeout limit for requests
  headers: AppConfig.headers,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Token"] = `${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    toast.error("Request failed. Please try again.");
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Handle unauthorized access
          // toast.error("Unauthorized access. Redirecting to login.");
          localStorage.clear();
          // Optionally redirect
          // window.location.href = "/";
          break;
        case 403:
          toast.error("Forbidden access. You don't have permission.");
          break;
        case 404:
          toast.error("Resource not found.");
          break;
        case 500:
          toast.error("Internal server error. Please try again later.");
          break;
        default:
          // toast.error(data?.message || "An unexpected error occurred.");
      }
    } else if (error.request) {
      // No response was received
      toast.error("No response from the server. Please check your connection.");
    } else {
      // Something else caused the error
      toast.error("Request failed. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

