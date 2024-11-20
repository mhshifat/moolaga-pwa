import { cn } from "@/utils/helpers";
import { PropsWithChildren } from "react";

interface LabelProps {
  title: string;
  error?: string;
  preventDefault?: boolean;
  className?: string;
}

export default function Label({ children, title, error, preventDefault, className }: PropsWithChildren<LabelProps>) {
  return (
    <label className={cn("flex flex-col gap-1", className)} {
      ...preventDefault?{
        onClick: (e) => e.preventDefault()
      }:{}
    }>
      <span className="font-geist font-medium text-sm text-foreground/80">{title}</span>
      {children}
      {error && <p className="font-geist text-sm font-medium text-danger mt-1">{error}</p>}
    </label>
  )
}