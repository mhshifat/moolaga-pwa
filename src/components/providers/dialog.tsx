"use client";

import { createContext, PropsWithChildren, ReactElement, useCallback, useContext, useEffect, useRef, useState } from "react";
import Dialog from "../ui/dialog";
import Divider from "../ui/divider";
import { cn } from "@/utils/helpers";

interface DialogState {
  height?: number;
  className?: string;
  position?: "left" | "right" | "center";
  title?: string;
  description?: string;
  content: ReactElement;
  disabled?: boolean;
}

interface DialogCtxState {
  openDialog: (params: DialogState) => void;
  closeDialog: () => void;
}

const DialogCtx = createContext<DialogCtxState | null>(null)

export default function DialogProvider({ children }: PropsWithChildren) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const currentDialogRef = useRef<HTMLDivElement>(null);
  const [dialogState, setDialogState] = useState<DialogState[]>([]);

  const openDialog = useCallback((params: DialogState) => {
    if (!currentDialogRef?.current) overlayRef.current?.classList?.add("opacity-100", "pointer-events-auto");
    const handleTransitionEnd = () => {
      setTimeout(() => {
        setDialogState(values => values.map((v, idx) => idx === values.length - 1 ? ({
          ...v,
          className: v.position === "right" ? "opacity-100 pointer-events-auto !translate-x-0 !-translate-y-1/2" : "opacity-100 pointer-events-auto scale-100"
        }) : v));
      }, 0);
    }
    overlayRef?.current?.addEventListener("transitionend", handleTransitionEnd);
    currentDialogRef?.current?.addEventListener("transitionend", handleTransitionEnd);
    setDialogState((values) => [...values.map((v, idx) => idx === values.length - 1 ? ({
      ...v,
      className: v.position === 'right' ? "opacity-50 pointer-events-none scale-90 translate-x-[-10px]" : "opacity-50 pointer-events-none scale-90 translate-y-[calc(-50%-10px)]",
    }) : v), params]);
    document.body.style.overflow = 'hidden';
    // document.body.style.paddingRight = '17px';
  }, []);

  const closeDialog = useCallback(() => {
    currentDialogRef?.current?.addEventListener("transitionend", (e) => {
      if (e.propertyName === 'transform') {
        setTimeout(() => {
          setDialogState(values => {
            const data = values.slice(0, -1).map((v, idx) => idx === values.length - 2 ? ({
              ...v,
              className: v.position === "right" ? "opacity-100 pointer-events-auto !translate-x-0 !-translate-y-1/2" : "opacity-100 pointer-events-auto scale-100"
            }) : v);
            if (!data.length) setTimeout(() => {
              overlayRef.current?.classList?.remove("opacity-100", "pointer-events-auto");
            }, 200);
            return data;
          });
        }, 0);
      }
    });
    setTimeout(() => {
      setDialogState(values => values.map((v, idx) => idx === values.length - 1 ? ({
        ...v,
        className: "opacity-100 pointer-events-none scale-110"
      }) : v));
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0';
    }, 0);
  }, [dialogState]);

  return (
    <DialogCtx.Provider value={{
      openDialog,
      closeDialog
    }}>
      {children}

      <Dialog>
        <Dialog.Overlay
          ref={overlayRef}
          onClick={() => !dialogState?.some(item => item.disabled) && closeDialog()}
        />
        {dialogState.map((dialog, dialogIdx) => (
          <Dialog.Item
            key={"Dialog_" + dialogIdx + "_" + dialog.title}
            className={cn(dialog.className)}
            {...dialogIdx===(dialogState.length - 1) ? {
              ref: currentDialogRef
            } : {}}
            position={dialog.position}
          >
            {(dialog.title || dialog.description) && (
              <>
                <Dialog.Header onClose={() => !dialog?.disabled && closeDialog()}>
                  <h3 className="font-geist-mono font-medium text-foreground text-xl capitalize tracking-tighter">{dialog.title}</h3>
                  <p className="font-geist font-medium text-foreground/60 text-sm mt-[2px]">{dialog.description}</p>
                </Dialog.Header>
                <Divider />
              </>
            )}
            <Dialog.Body>
              {dialog.content}
            </Dialog.Body>
          </Dialog.Item>
        ))}
      </Dialog>
    </DialogCtx.Provider>
  )
}

export function useDialog() {
  const res = useContext(DialogCtx);
  if (!res) throw new Error("Component needs to be wrapped with `DialogProvider`")
  return res;
}