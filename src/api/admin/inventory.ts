import { InventoryProduct } from "@/lib/types";
import axios from "../axios";


export const getInventory = async() => {
    const response = await axios.get('/inventory');
    return response.data;
}
export const addProduct = async(product: Omit<InventoryProduct, '_id'>) => {
    const response = await axios.post('inventory', product)
    return response.data;
}

