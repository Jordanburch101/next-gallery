import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import { FocusCards } from "~/components/ui/focus-cards";
import { FileUploadMain } from "~/app/_components/main-file-upload";
import { IntroHero } from "~/app/_components/intro_hero";

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
    <div className="w-full relative">
      <div className="flex flex-wrap gap-4">
        <SignedOut>
          <div className=" gird place-items-center mx-auto container p-5">
            <IntroHero />
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
