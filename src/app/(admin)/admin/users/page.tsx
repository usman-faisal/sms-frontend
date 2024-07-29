"use client";
import { getAllUser } from "@/api/admin/users";
import AddUser from "@/components/Users/AddUser";
import UserList from "@/components/Users/UserList";
import { Salesman } from "@/lib/types";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<Salesman[]>([]);
  useEffect(() => {
    (async () => {
      const response = await getAllUser();
      setUsers(response);
    })();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="ml-auto">
        <AddUser />
      </div>
      <UserList users={users || []} />
    </div>
  );
}
