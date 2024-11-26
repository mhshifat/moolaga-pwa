"use client";

import Camera from "@/components/common/camera";
import { useDialog } from "@/components/providers/dialog";
import SignInForm from "../auth/sign-in-form";
import UploadAttachmentsToMoolaga from "./upload-attachments-to-moolaga";
import { useAuth } from "@/components/providers/auth";

export default function HomePageContainer() {
  const { login, authState } = useAuth();
  const { openDialog, closeDialog } = useDialog();

  const hasCredentials = authState.isLoggedIn;


  if (!hasCredentials) return (
    <div className="max-w-[400px] w-full flex-1 flex flex-col p-5">
      <SignInForm
        onSuccess={() => {
          login({
            isLoggedIn: true,
          })
        }}
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