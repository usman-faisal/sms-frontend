import { InventoryProduct } from "@/lib/types";
import { Card } from "../ui/card";
import CardList from "../common/CardList";
import { useRouter } from "next/navigation";
import { Edit, Table, Trash } from "lucide-react";
import TableCommon from "../common/Table";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";

export default function InventoryProductList({
  InventoryProduct,
  renderActions = false,
}: {
  InventoryProduct: InventoryProduct[];
  renderActions?: boolean;
}) {
  const router = useRouter();
  async function handleDeleteClick(e: React.MouseEvent) {
    e.stopPropagation();
    console.log("Delete");
  }
  if (InventoryProduct.length <= 0) return;
  return (
    <TableCommon
      caption="List of your InventoryProduct"
      tableHeads={
        renderActions
          ? ["Name", "Price", "Quantity", "Actions"]
          : ["Name", "Price", "Quantity"]
      }
    >
      {InventoryProduct.map((InventoryProduct) => {
        return (
          <TableRow
            role="button"
            onClick={() => router.push(`/InventoryProduct/${InventoryProduct._id}`)}
            className="cursor-pointer"
            key={InventoryProduct._id}
          >
            <TableCell>{InventoryProduct.name}</TableCell>
            <TableCell>{InventoryProduct.price}</TableCell>
            <TableCell>{InventoryProduct.quantity}</TableCell>
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
