import axios from "axios";

// ✅ Make sure .env file has: VITE_API_URL=http://localhost:5000/api
const API_URL = import.meta.env.VITE_API_URL?.trim() || "http://localhost:5000/api";


export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Add token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Handle unauthorized access
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Debug network errors
    if (!error.response) {
      console.error("Network error or backend not reachable:", error);
    }

    if (error.response?.status === 401) {
      // 🚨 FIXED: Do NOT use window.location.href here!
      // Simply clean up the local storage and allow the component's catch block 
      // or AuthContext listener to handle the redirect.
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);
