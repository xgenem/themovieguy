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
    console.log("Request: ", config);
    return config;
  },
  (error) => {
    console.error("Request error: ", error);
    return Promise.reject(error);
  }
);

export default API;
