"use client";

import { useUploadThing } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { usePostHog } from 'posthog-js/react'

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

function UploadSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
  )
}


export function SimpleUploadButton() {
  const router = useRouter();
  const posthog = usePostHog();

  const { inputProps, isUploading } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      posthog.capture('upload_begin');
      toast.loading("Uploading...",{
        id: "uploading-toast",
      });
    },
    onUploadError(error) {
      posthog.capture('upload_error',{ error });
      toast.dismiss("uploading-toast");
      toast.error("Upload failed");
    },
    onClientUploadComplete: (result) => {
      posthog.capture('upload_complete');
      toast.dismiss("uploading-toast");
      toast.success("Upload complete");
      router.refresh();
    }
  });

  return (
    <div>
      <label className="cursor-pointer" htmlFor="upload-button"><UploadSvg /></label>
      <input 
        className="sr-only" 
        id="upload-button" 
        type="file"
        {...inputProps}
       />
    </div>
  );
}