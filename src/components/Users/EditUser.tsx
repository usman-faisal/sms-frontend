import { useForm } from "react-hook-form";
import { DialogCommon } from "../common/Dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { createUser, updateSalesman } from "@/api/admin/users";
import { isAxiosError } from "axios";
import { Area, Salesman, User } from "@/lib/types";
import { useEffect, useReducer, useState } from "react";
import { getAvailableAreas } from "@/api/admin/areas";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AreaSelect from "../Area/AreaSelect";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
interface Form {
  areas: string[];
  username: string;
}
export default function EditUser({
  user,
  onClose,
}: {
  user: Salesman;
  onClose: () => void;
}) {
  const router = useRouter();
  const [areas, setAreas] = useState<Area[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  useEffect(() => {
    setSelectedAreas(user.areas.map((area) => area._id));
  }, [user.areas]);

  const [loading, setLoading] = useState(true);
  if (!user) return null;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      areas: user.areas.map((area) => area._id),
      username: user.user.username,
    },
  });
  useEffect(() => {
    (async () => {
      setOpen(true);
      setLoading(true);
      const response = await getAvailableAreas(user._id);
      setAreas(response);
      setLoading(false);
    })();
  }, [user._id]);

  async function onSubmit(data: Form) {
    try {
      await updateSalesman(user._id, {
        username: data.username,
        areas: selectedAreas,
      });
      toast("User updated successfully");
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
    <DialogCommon
      open={open}
      setOpen={() => {
        setOpen(!open);
        if (open) onClose();
      }}
      renderTrigger={false}
      title="Edit User"
    >
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input {...register("username")} id="username" type="text" required />
        </div>
        <div className="space-y-2 mt-2">
          <AreaSelect
            areas={areas || []}
            selectedAreas={selectedAreas}
            setSelectedAreas={setSelectedAreas}
          />
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
