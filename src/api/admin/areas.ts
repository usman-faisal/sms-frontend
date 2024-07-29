import axios from "../axios";

export const getAllAreas = async () => {
  const response = await axios.get("/areas");
  return response.data;
};

export const addArea = async (name: string, description: string) => {
  const response = await axios.post("/areas", { name, description });
  return response.data;
};

export const getAvailableAreas = async (id: string) => {
  const response = await axios.get("/areas/available?id=" + id);
  return response.data;
};
