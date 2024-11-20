import { cva } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { HTMLAttributes } from "react";
import Typography from "./typography";
import { cn } from "@/utils/helpers";

const spinnerVariants = cva(
  "animate-spin",
  {
    variants: {
      variant: {
        default: "text-background",
        secondary: "text-foreground/50",
      },
      size: {
        default: "size-4",
        layout: "size-10",
        md: "size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary";
  size?: "default" | "layout" | "md";
  fixed?: boolean;
  showTitle?: boolean;
  title?: string;
}

export default function Spinner({ className, title, showTitle, size, variant, fixed, ...restProps }: SpinnerProps) {
  return (
    <div className={cn("w-full flex flex-col justify-center items-center", className, {
      "h-screen overflow-hidden flex justify-center items-center bg-background flex-col gap-2": fixed
    })} {...restProps}>
      <LoaderCircle className={spinnerVariants({ className, variant, size })} />
      {(showTitle || fixed) && <Typography as="label" className="text-foreground/50">{title || "Loading..."}</Typography>}
    </div>
  )
}