import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { SimpleUploadButton } from "./simple-upload-button";

export function TopNav() {
  return (
    <nav className="flex items-center justify-between w-full p-4 text-xl mb-4 bg-gray-800 text-white">
      <Link href="/"><div>Gallery</div></Link>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <div className="flex gap-4 items-start">
          <SimpleUploadButton />
          <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
export default TopNav;