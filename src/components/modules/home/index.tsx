"use client";

import { storage } from "@/utils/storage";
import { useEffect, useState } from "react";
import Camera from "@/components/common/camera";
import { useDialog } from "@/components/providers/dialog";
import SignInForm from "../auth/sign-in-form";
import UploadAttachmentsToMoolaga from "./upload-attachments-to-moolaga";

export default function HomePageContainer() {
  const [hasCredentials, setHasCredentials] = useState(false);
  const { openDialog, closeDialog } = useDialog();

  useEffect(() => {
    (async () => {
      const value = await storage.get("MOOLAGA_PWA_CREDENTIALS");
      if (!value) return;
      setHasCredentials(true);
    })();
  }, [])

  
  if (!hasCredentials) return (
    <div className="max-w-[400px] w-full flex-1 flex flex-col p-5">
      <SignInForm
        onSuccess={() => setHasCredentials(true)}
      />
    </div>
  )
  return (
    <div className="w-full flex-1 flex flex-col py-5">
      <Camera
        onUploadApiCall={(data) => openDialog({
          title: "Upload",
          description: "Please provide a name for the file",
          content: (
            <UploadAttachmentsToMoolaga
              data={data}
              onSuccess={closeDialog}
            />
          )
        })}
      />
    </div>
  )
}