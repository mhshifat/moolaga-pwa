"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import Spinner from "./spinner";

export default function ClientOnly({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Spinner variant="secondary" />;
  return (
    <>
      {children}
    </>
  )
}