"use client";

import { getInventory } from "@/api/admin/inventory";
import AddProduct from "@/components/Inventory/AddProduct";
import InventoryProductList from "@/components/Inventory/ProductList";
import { InventoryProduct } from "@/lib/types";
import { useEffect, useState } from "react";


export default function InventoryPage() {
    const [products, setProducts] = useState<InventoryProduct[]>([])
    useEffect(() => {
        (async() => {
            try{
                const inventory = await getInventory();
                setProducts(inventory.products);
            }catch(e)
            {
                console.log(e);
            }
        })()
    }, [])
  return (
    <div className="flex flex-col">
        <div className="ml-auto">
            <AddProduct />
        </div>
        <InventoryProductList InventoryProduct={products}/>
    </div>
  );
}
