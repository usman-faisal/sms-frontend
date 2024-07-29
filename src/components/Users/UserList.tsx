import { Salesman } from "@/lib/types";
import { useRouter } from "next/navigation";
import TableCommon from "../common/Table";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Edit, Trash } from "lucide-react";
import { SyntheticEvent, useState } from "react";
import { deleteUser } from "@/api/admin/users";
import { toast } from "sonner";
import EditUser from "./EditUser";

export default function UserList({ users }: { users: Salesman[] }) {
  const router = useRouter();
  const [activeUser, setActiveUser] = useState<Salesman | null>(null);
  async function handleDeleteClick(
    e: SyntheticEvent,
    userId: string
  ): Promise<void> {
    e.stopPropagation();
    try {
      await deleteUser(userId);
      toast("User deleted successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }
  if (users.length <= 0) return;
  return (
    <TableCommon caption="Users List" tableHeads={["Name", "Areas", "Actions"]}>
      {users.map((user) => {
        return (
          <TableRow
            role="button"
            // onClick={() => router.push(`/admin/user/${user._id}`)}
            className="cursor-pointer"
            key={user._id}
          >
            <TableCell>{user.user?.username}</TableCell>
            <TableCell>
              {user.areas.map((area) => area.name).join(", ")}
            </TableCell>
            <TableCell className="flex gap-2 items-center">
              <Button className="p-1 h-max">
                <Edit onClick={() => setActiveUser(user)} className="size-4" />
              </Button>
              <Button
                onClick={(e: SyntheticEvent) =>
                  handleDeleteClick(e, user.user._id)
                }
                className="bg-red-700 p-1 h-max"
              >
                <Trash className="size-4" />
              </Button>
              {activeUser && (
                <EditUser
                  user={activeUser}
                  onClose={() => setActiveUser(null)}
                />
              )}
            </TableCell>
          </TableRow>
        );
      })}
      <TableRow></TableRow>
    </TableCommon>
  );
}
