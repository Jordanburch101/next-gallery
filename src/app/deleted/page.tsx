
"use client"
import { toast } from "sonner";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default function DeletedPage() {
  // const router = useRouter();

  // useEffect(() => {
  //   toast.warning("Image deleted");
  //   console.log("deleted");
  //   router.refresh();
  // }, []);
  // revalidatePath("/");

  return <div>
    <Link href="/">Home</Link>
  </div>;
}
