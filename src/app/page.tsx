import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc}) => desc(model.id),
  });
  return(
      <div className="flex flex-wrap gap-4">
      {[...images, ...images, ...images].map((image, index) => (
        <div key={image.id + '-' + index} className="w-48 h-30">
          <img src={image.url} alt="" className="w-full h-auto" />
          <div>{image.name}</div>
        </div>
      ))}
    </div>

  );
}

export default async function HomePage() {



  return (
    <main className="">
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
