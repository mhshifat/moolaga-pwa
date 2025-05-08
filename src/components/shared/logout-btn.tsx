"use client";

import { LogOutIcon } from "lucide-react";
import Button from "../ui/button";

export default function LogoutBtn() {
  function handleLogout() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <Button onClick={handleLogout} title="Logout" variant="ghost" className="h-auto w-auto border-none">
      <LogOutIcon className="text-background" />
    </Button>
  )
}