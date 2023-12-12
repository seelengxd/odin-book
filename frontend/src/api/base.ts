import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 && window.location.pathname !== "/") {
      window.location.href = "/";
      return Promise.resolve();
    }
    return error;
  }
);

export default client;
