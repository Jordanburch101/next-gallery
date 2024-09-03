import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import Image from "next/image";
import Link from "next/link";
import { FocusCards } from "~/components/ui/focus-cards";


export const dynamic = "force-dynamic";

// async function Images() {
//   const images = await getMyImages();
//   return(
//       <div className="grid grid-cols-4 gap-4">
//         {images.map((image) => (
//           <div key={image.id} className="">
//             <Link href={`/img/${image.id}`}>
//               <Image 
//               src={image.url} 
//               alt={image.name} 
//               // style={{objectFit: "fill"}}
//               className="aspect-video object-cover w-full"
//               width={300}
//               height={300}
//               placeholder="blur"
//               blurDataURL={image.url}
//               />
//             </Link>
//             <div>{image.name}</div>
//           </div>
//         ))}
//       </div>
//   );
// }

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
          <FocusCardsDemo />
        </SignedIn>
      </div>
    </div>
  );
}
