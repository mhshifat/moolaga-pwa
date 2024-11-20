import { PropsWithChildren } from "react";

export default function DialogBody({ children }: PropsWithChildren) {
  return (
    <div className="w-full py-3 px-3">
      {children}
    </div>
  )
}