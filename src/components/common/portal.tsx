"use client";

import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }: PropsWithChildren) {
  return createPortal(children, document.querySelector("body")!);
}