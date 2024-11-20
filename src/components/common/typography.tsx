import { cn } from "@/utils/helpers";
import { PropsWithChildren } from "react";

interface TypographyProps {
  className?: string;
  as?: "title" | "label" | "error";
}

export default function Typography({ children, className, as }: PropsWithChildren<TypographyProps>) {
  switch (as) {
    case "title":
      return (
        <h3 className={cn("text-foreground font-semibold text-xl font-archivo empty:hidden", className)}>
          {children}
        </h3>
      );
    case "label":
      return (
        <label className={cn("text-foreground font-semibold text-sm font-archivo flex empty:hidden", className)}>
          {children}
        </label>
      );
    case "error":
      return (
        <p className={cn("text-danger font-semibold text-sm font-archivo flex empty:hidden", className)}>
          {children}
        </p>
      );
    default:
      return (
        <p className={cn("text-foreground/50 font-medium text-sm font-archivo empty:hidden", className)}>
          {children}
        </p>
      );
  }
}