import { PropsWithChildren } from "react";
import { Toaster } from 'sonner';
import DialogProvider from "./dialog";
import AuthProvider from "./auth";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <DialogProvider>
        <Toaster
          richColors
          position="top-right"
        />
        {children}
      </DialogProvider>
    </AuthProvider>
  )
}