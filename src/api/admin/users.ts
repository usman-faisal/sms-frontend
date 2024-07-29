import axios from "../axios";

export const getAllUser = async () => {
  const response = await axios.get("/salesmen");
  return response.data;
};

export const createUser = async (username: string, password: string) => {
  const response = await axios.post("/users", { username, password });
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axios.delete("/users?userId=" + userId);
  return response.data;
};

interface UpdateSalesmanData {
  username: string;
  areas: string[];
}

export const updateSalesman = async (id: string, data: UpdateSalesmanData) => {
  const response = await axios.put("/salesmen/" + id, data);
  return response.data;
};
