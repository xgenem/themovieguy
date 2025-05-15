import axios from "axios";

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_TMDB_API_URL,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN}`,
  },
  params: {
    language: "en-US",
  },
});

API.interceptors.request.use(
  (config) => {
    if (__DEV__) {
      console.log("Request: ", config);
    }

    return config;
  },
  (error) => {
    if (__DEV__) {
      console.error("Request error: ", error);
    }

    return Promise.reject(error);
  }
);

export default API;
