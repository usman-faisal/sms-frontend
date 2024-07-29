import axiosDefault from "axios";

const axios = axiosDefault.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (
      error.response.status === 401 &&
      window.location.pathname !== "/auth" &&
      window.location.pathname !== "/auth/admin"
    ) {
      localStorage.removeItem("access_token");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default axios;
