"use client";
import { getAreas } from "@/api/salesman/areas";
import AreaList from "@/components/Area/AreaList";
import { useEffect, useState } from "react";

export default function Home() {
  const [areas, setAreas] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await getAreas();
      console.log(response);
      setAreas(response);
    })();
  }, []);
  return <AreaList areas={areas || []} />;
}
