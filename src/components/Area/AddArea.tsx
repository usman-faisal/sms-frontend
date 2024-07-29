import { useForm } from "react-hook-form";
import { DialogCommon } from "../common/Dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { addArea } from "@/api/admin/areas";
import { toast } from "sonner";

interface Form {
  name: string;
  description: string;
}
export default function AddArea() {
  const { register, handleSubmit, setError } = useForm<Form>();
  async function onSubmit(data: Form) {
    try {
      const response = await addArea(data.name, data.description);
      console.log(response);
      toast("Area added successfully");
    } catch (error) {
      setError("name", {
        type: "manual",
        message: "Failed to add area",
      });
    }
  }
  return (
    <DialogCommon title="Add Area">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input {...register("name")} id="name" type="text" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            {...register("description")}
            id="description"
            type="text"
            required
          />
        </div>
        <Button className="mt-2 ml-auto" type="submit">
          Save
        </Button>
      </form>
    </DialogCommon>
  );
}
