import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import TableCommon from "../common/Table";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Shop } from "@/lib/types";

export default function ShopList({
  shops,
  renderActions = false,
}: {
  shops: Shop[];
  renderActions?: boolean;
}) {
  const router = useRouter();
  async function handleDeleteClick(e: React.MouseEvent) {
    e.stopPropagation();
    console.log("Delete");
  }
  if (shops.length <= 0) return;
  return (
    <TableCommon
      caption="List of your shops"
      tableHeads={
        renderActions
          ? ["Name", "Description", "Shops", "Actions"]
          : ["Name", "Description", "Shops"]
      }
    >
      {shops.map((shop) => {
        return (
          <TableRow
            role="button"
            onClick={() => router.push(`/shop/${shop._id}`)}
            className="cursor-pointer"
            key={shop._id}
          >
            <TableCell>{shop.name}</TableCell>
            <TableCell>{shop.description}</TableCell>
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
