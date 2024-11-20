import { cn } from "@/utils/helpers";
import { forwardRef, HTMLAttributes, Ref } from "react";

interface DialogOverlayProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function DialogOverlay({ className, ...props }: DialogOverlayProps, ref: Ref<HTMLDivElement>) {
  return (
    <div ref={ref} className={cn("fixed inset-0 w-full h-full bg-foreground/60 z-50 isolate duration-200 ease-in-out transition opacity-0 pointer-events-none", className)} {...props} />
  )
}

export default forwardRef(DialogOverlay);