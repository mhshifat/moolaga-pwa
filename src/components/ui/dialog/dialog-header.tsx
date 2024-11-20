import { PropsWithChildren } from "react";
import { X } from "lucide-react";
import Button from "../button";

interface DialogHeaderProps {
  onClose?: () => void;
}

export default function DialogHeader({ children, onClose }: PropsWithChildren<DialogHeaderProps>) {
  return (
    <div className="w-full py-2 px-3 flex items-start gap-5 sticky top-0 left-0 z-50 bg-background-secondary">
      <div className="flex-1">
        {children}
      </div>
      <Button onClick={onClose} size="icon" variant="ghost" className="shrink-0 p-0 w-auto flex items-center justify-center">
        <X className="size-4 text-foreground" />
      </Button>
    </div>
  )
}