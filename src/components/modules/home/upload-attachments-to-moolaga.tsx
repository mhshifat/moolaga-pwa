import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { dataURItoBlob } from "@/utils/helpers";
import { storage } from "@/utils/storage";

interface UploadAttachmentsToMoolagaProps {
  data: string | null;
  onSuccess?: () => void;
}

export default function UploadAttachmentsToMoolaga({ data, onSuccess }: UploadAttachmentsToMoolagaProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      title: ""
    },
    resolver: zodResolver(z.object({
      title: z.string({ message: "Title is required" }).min(1, "Title is required")
    }))
  })

  async function handleUpload(src: string, title: string) {
    toast.loading("Uploading...", { id: "UPLOAD_ATTACHMENT_TO_MOOLAGA" })
    try {
      setIsLoading(true);
      let blob: Blob; 
      if (src?.includes("blob")) {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error('Failed to fetch the blob');
        }
        const blobRes = await response.blob();
        blob = blobRes;
      } else {
        blob = dataURItoBlob(src);
      }
      const values = await storage.get("MOOLAGA_PWA_CREDENTIALS");
      const token = `Basic ${Buffer.from(`${values.email}:${values.password}`).toString("base64")}`;
      const formdata = new FormData();
      formdata.append("file", blob, `${slugify(title)}.pdf`);
      await axios.post(`${process.env.NEXT_PUBLIC_MOOLAGA_BASE_API_URL}/api/v2/attachments`, formdata, {
        headers: {
          "Content-Type": "multipart/formdata",
          "Authorization": token
        }
      });
      toast.success("Successfully uploaded to moolaga", { id: "UPLOAD_ATTACHMENT_TO_MOOLAGA" });
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload to moolaga", { id: "UPLOAD_ATTACHMENT_TO_MOOLAGA" })
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form onSubmit={form.handleSubmit((formValues) => {
      if (data) handleUpload(data, (formValues?.title || "moolaga") as string)
    })} className="flex flex-col w-full gap-3">
      <Label
        title="Title"
        error={form.formState.errors.title?.message}
      >
        <Input
          placeholder="Ex. example"
          {...form.register("title")}
        />
      </Label>

      <div className="mt-2">
        <Button disabled={isLoading} className="w-full" type="submit">Upload</Button>
      </div>
    </form>
  )
}