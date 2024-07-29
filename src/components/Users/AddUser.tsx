"use client";
import { useForm } from "react-hook-form";
import { DialogCommon } from "../common/Dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { createUser } from "@/api/admin/users";
import { isAxiosError } from "axios";
import { toast } from "sonner";

interface Form {
  username: string;
  password: string;
}
export default function AddUser() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Form>();
  async function onSubmit(data: Form) {
    try {
      const response = await createUser(data.username, data.password);
      toast("User added successfully");
    } catch (error) {
      if (isAxiosError(error)) {
        setError("username", {
          type: "manual",
          message: error.response?.data.message ?? "something went wrong",
        });
      }
    }
  }
  return (
    <DialogCommon title="Add User">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input {...register("username")} id="username" type="text" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input {...register("password")} id="password" type="text" required />
        </div>
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
        <Button className="mt-2 ml-auto" type="submit">
          Save
        </Button>
      </form>
    </DialogCommon>
  );
}
