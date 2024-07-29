import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DialogCommonProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  open?: boolean;
  setOpen?: () => void;
  renderTrigger?: boolean;
}

export function DialogCommon({
  children,
  title,
  description,
  open,
  setOpen,
  renderTrigger = true,
}: DialogCommonProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {renderTrigger && (
        <DialogTrigger>
          <Button>{title}</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description ??
              "Make changes to your profile here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
