import axios from "../axios";

export const getShopsByArea = async (areaId: string) => {
  const response = await axios.get(`/shops?areaId=${areaId}`);
  return response.data;
};

export const createShop = async (
  areaId: string,
  shop: { name: string; description: string }
) => {
  const response = await axios.post(`/shops?areaId=${areaId}`, shop);
  return response.data;
};
