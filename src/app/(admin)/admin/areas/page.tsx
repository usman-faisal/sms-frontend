"use client";
import { getAllAreas } from "@/api/admin/areas";
import AddArea from "@/components/Area/AddArea";
import AreaList from "@/components/Area/AreaList";
import { DialogCommon } from "@/components/common/Dialog";
import { useEffect, useState } from "react";

export default function Home() {
  const [areas, setAreas] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await getAllAreas();
      console.log(response);
      setAreas(response);
    })();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="ml-auto">
        <AddArea />
      </div>
      <AreaList areas={areas || []} renderActions={true} />
    </div>
  );
}
