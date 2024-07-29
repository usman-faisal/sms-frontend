import { Area } from "@/lib/types";
import { Card } from "../ui/card";
import CardList from "../common/CardList";
import { useRouter } from "next/navigation";
import { Edit, Table, Trash } from "lucide-react";
import TableCommon from "../common/Table";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";

export default function AreaList({
  areas,
  renderActions = false,
}: {
  areas: Area[];
  renderActions?: boolean;
}) {
  const router = useRouter();
  async function handleDeleteClick(e: React.MouseEvent) {
    e.stopPropagation();
    console.log("Delete");
  }
  if (areas.length <= 0) return;
  return (
    <TableCommon
      caption="List of your areas"
      tableHeads={
        renderActions
          ? ["Name", "Description", "Shops", "Actions"]
          : ["Name", "Description", "Shops"]
      }
    >
      {areas.map((area) => {
        return (
          <TableRow
            role="button"
            onClick={() => router.push(`/area/${area._id}`)}
            className="cursor-pointer"
            key={area._id}
          >
            <TableCell>{area.name}</TableCell>
            <TableCell>{area.description}</TableCell>
            <TableCell>{area.shops.length}</TableCell>
            {renderActions && (
              <TableCell onClick={handleDeleteClick} className="flex gap-2">
                <Button className="bg-red-700 p-1 h-max">
                  <Trash className="size-4" />
                </Button>
              </TableCell>
            )}
          </TableRow>
        );
      })}
    </TableCommon>
  );
}
