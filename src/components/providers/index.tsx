import { PropsWithChildren } from "react";
import { Toaster } from 'sonner';
import DialogProvider from "./dialog";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <DialogProvider>
      <Toaster
        richColors
        position="top-right"
      />
      {children}
    </DialogProvider>
  )
}