import axios from "../axios";

export const getAreas = async () => {
  const response = await axios.get("/my-areas");
  return response.data;
};
