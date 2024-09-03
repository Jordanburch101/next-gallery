"use client";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DeletedPage() {
  const router = useRouter();

  useEffect(() => {
    toast.warning("Image deleted");
    console.log("deleted");
    router.push("/");
  }, [router]);

  return null; // This component doesn't render anything
}
