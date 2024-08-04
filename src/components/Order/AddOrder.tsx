import { useForm } from "react-hook-form";
import { DialogCommon } from "../common/Dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { addProduct } from "@/api/admin/inventory";
import { toast } from "sonner";

interface Form {
  name: string;
  quantity: string;
  price: string;
}
export default function AddProduct() {
  const { register, handleSubmit, setError } = useForm<Form>();
  async function onSubmit(data: Form) {
    try {
      const response = await addProduct({
        name: data.name,
        quantity: Number.parseInt(data.quantity) ?? 0,
        price: Number.parseInt(data.price)  
      });
      console.log(response);
      toast("product added successfully");
    } catch (error) {
      setError("name", {
        type: "manual",
        message: "Failed to add product",
      });
    }
  }
  return (
    <DialogCommon title="Add product">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input {...register("name")} id="name" type="text" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            {...register("price")}
            id="price"
            type="number"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            {...register("quantity")}
            id="quantity"
            type="number"
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
