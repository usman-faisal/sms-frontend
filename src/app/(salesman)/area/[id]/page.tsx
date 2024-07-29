"use client";

import { getShopsByArea } from "@/api/salesman/shops";
import AddShop from "@/components/Shops/AddShop";
import ShopList from "@/components/Shops/ShopList";
import { Shop } from "@/lib/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function () {
  const { id } = useParams();
  const [shops, setShops] = useState<Shop[]>([]);
  useEffect(() => {
    (async () => {
      const response = await getShopsByArea(id as string);
      console.log(response);
      setShops(response);
    })();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="ml-auto">
        <AddShop areaId={id as string} />
      </div>
      <ShopList shops={shops || []} renderActions={true} />
    </div>
  );
}
