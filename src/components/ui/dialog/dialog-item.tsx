import { cn } from "@/utils/helpers";
import { forwardRef, HTMLAttributes, PropsWithChildren, Ref } from "react";

interface DialogItemProps extends HTMLAttributes<HTMLDivElement> {
  position?: "right" | "left" | "center";
}

function DialogItem({ children, className, position = 'center' }: PropsWithChildren<DialogItemProps>, ref: Ref<HTMLDivElement>) {
  return (
    <div ref={ref} className={cn("fixed w-full min-w-[320px] max-w-[500px] overflow-y-auto flex flex-col bg-background-secondary opacity-0 z-50 pointer-events-none transition-all duration-300 ease-in-out", {
      "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-110 max-h-[80dvh] rounded-md border border-border": position === 'center',
      "top-1/2 right-0 translate-x-full -translate-y-1/2 h-screen rounded-tl-md rounded-bl-md border-l border-border": position === 'right',
    }, className)}>
      {children}
    </div>
  )
}

export default forwardRef(DialogItem);