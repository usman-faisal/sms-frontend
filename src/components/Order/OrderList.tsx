import { Order } from "@/lib/types";
import { Card } from "../ui/card";
import CardList from "../common/CardList";
import { useRouter } from "next/navigation";
import { Edit, Table, Trash } from "lucide-react";
import TableCommon from "../common/Table";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";

export default function InventoryProductList({
  orders,
  renderActions = false,
}: {
  orders: Order[];
  renderActions?: boolean;
}) {
  const router = useRouter();
  async function handleDeleteClick(e: React.MouseEvent) {
    e.stopPropagation();
    console.log("Delete");
  }
  if (orders.length <= 0) return;
  return (
    <TableCommon
      caption="List of your Orders"
      tableHeads={
        renderActions
          ? ["Items", "Date", "Approved", "Actions"]
          : ["Items", "Date", "Approved"]
      }
    >
      {orders.map((order) => {
        return (
          <TableRow
            role="button"
            onClick={() => router.push(`/order/${order._id}`)}
            className="cursor-pointer"
            key={order._id}
          >
            <TableCell>{order.items}</TableCell>
            <TableCell>{order.date.toString()}</TableCell>
            <TableCell>{order.approved}</TableCell>
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
