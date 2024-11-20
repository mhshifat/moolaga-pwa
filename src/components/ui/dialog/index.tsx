"use client";

import { PropsWithChildren } from "react";
import DialogItem from "./dialog-item";
import DialogOverlay from "./dialog-overlay";
import DialogHeader from "./dialog-header";
import DialogBody from "./dialog-body";
import ClientOnly from "@/components/common/client-only";
import Portal from "@/components/common/portal";

export default function Dialog({ children }: PropsWithChildren) {
  return (
    <ClientOnly>
      <Portal>
        {children}
      </Portal>
    </ClientOnly>
  )
}

Dialog.Item = DialogItem;
Dialog.Header = DialogHeader;
Dialog.Body = DialogBody;
Dialog.Overlay = DialogOverlay;