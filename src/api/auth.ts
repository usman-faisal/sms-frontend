import axios from "./axios";

export const login = async (username: string, password: string) => {
  const response = await axios.post("/auth/login", {
    username,
    password,
  });
  return response.data;
};

export const loginAdmin = async (username: string, password: string) => {
  const response = await axios.post("/auth/login-admin", {
    username,
    password,
  });
  return response.data;
};

export const me = async () => {
  const response = await axios.get("/auth/me");
  return response.data;
};
