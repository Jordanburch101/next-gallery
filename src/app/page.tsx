import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import Image from "next/image";
import Link from "next/link";
import { FocusCards } from "~/components/ui/focus-cards";
import { FileUploadMain } from "~/app/_components/main-file-upload";


export const dynamic = "force-dynamic";


export async function FocusCardsDemo() {
  const images = await getMyImages();


  const cards = images.map((image) => ({
    title: image.name,
    src: image.url,
    link: `/img/${image.id}`,
  }));

  return <FocusCards cards={cards} />;
}

export default async function HomePage() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap gap-4">
        <SignedOut>
          <div className="w-full p-5">
            <h1 className="text-3xl">Welcome to the gallery</h1>
            <p>
              This is a gallery app built with Next.js and Drizzle ORM. Sign in to
              see the images.
            </p>
          </div>
        </SignedOut>
        <SignedIn>
          <FileUploadMain />
          <FocusCardsDemo />
        </SignedIn>
      </div>
    </div>
  );
}
