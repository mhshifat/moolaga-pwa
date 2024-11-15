import { ButtonHTMLAttributes, ForwardedRef, forwardRef, PropsWithChildren } from "react";

import { cva } from "class-variance-authority";
import { cn } from "@/utils/helpers";

const buttonVariants = cva(
  "w-max rounded-md flex item-center justify-center border border-white text-sm font-medium leading-[227%]",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-emerald-500 to-emerald-700 text-white",
      },
      size: {
        default: "h-[35px] px-[20px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default";
  size?: "default";
}

function Button({ children, className, variant = "default", size = "default", ...restProps }: PropsWithChildren<ButtonProps>, ref: ForwardedRef<HTMLButtonElement>) {
  return (
    <button {...restProps} className={cn(buttonVariants({ className, variant, size }))} ref={ref}>{children}</button>
  )
}

export default forwardRef(Button);

Button.displayName = "Button";