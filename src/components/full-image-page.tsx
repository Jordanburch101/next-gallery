

import { clerkClient } from "@clerk/nextjs/server";
import { getImage , deleteImage} from "../server/queries";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";



export default async function FullPageImageView(props: { photoId:string }) {
  const idAsNumber = Number(props.photoId);
  // if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getImage(idAsNumber);

  if (!image) redirect("/");

  const userInfo = await clerkClient.users.getUser(image.userId);


  return (
    <div className="grid z-10 relative grid-cols-12	my-auto gap-8 px-10">
      <div className="col-span-12 lg:col-span-8">
        <img src={image.url} className="w-full object-contain" />
      </div>
      <div className="col-span-12 lg:col-span-3 items-start flex-col">
        <div>
          {/* image name */}
          <h2 className="text-2xl py-8 text-white font-bold">{image.name}</h2>
          {/* uploaded by */}
          <div className="text-white mb-4">Uploaded by: {userInfo.firstName}</div>
          {/* created on */}
          <div className="text-white mb-5">Created on: {new Date(image.createdAt).toLocaleDateString()}</div>
          {/* delete button */}
          <form action={async () => {
            "use server";
            await deleteImage(idAsNumber);
            // call the ToastImageDeleted component
            // to show the toast
          }}>
            <Button variant="destructive" className="text-white">Delete</Button>
     
          </form>
          
        </div>
      </div>
    </div>
  );
}

