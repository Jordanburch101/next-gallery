import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();
  return(
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <div key={image.id} className="w-48 h-30">
            <Image 
            src={image.url} 
            alt={image.name} 
            // style={{objectFit: "fill"}}
            className="aspect-video object-cover"
            width={300}
            height={300}
            placeholder="blur"
            blurDataURL={image.url}
            />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
  );
}

export default async function HomePage() {
  return (
    <main className="container mx-auto">
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
          <Images />
        </SignedIn>
      </div>
    </main>
  );
}
