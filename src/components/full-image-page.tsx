import Image from "next/image";
import { clerkClient } from "@clerk/nextjs/server";
import { getImage , deleteImage} from "../server/queries";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import getBase64 from '~/lib/getBase64';


export default async function FullPageImageView(props: { photoId:string }) {
  const idAsNumber = Number(props.photoId);


  const image = await getImage(idAsNumber);

  if (!image) redirect("/");

  const userInfo = await clerkClient.users.getUser(image.userId);

  const base64 = await getBase64(image.url);

  return (
    <div className="grid z-10 relative grid-cols-12	my-auto px-10">
      <div className="col-span-12 lg:col-span-8 relative">
        <Image 
          src={image.url} 
          alt={image.name}
          width={1000}
          height={1000}
          className="ms-auto max-h-[1000px] rounded-lg rounded-tr-none rounded-br-none max-w-[1000px] aspect-[8/5] object-cover"
          placeholder="blur"
          // use blur proxy from public/images/blur.png
          blurDataURL={base64}
          />
      </div>
      <div className="col-span-12 lg:col-span-3 rounded-br-lg rounded-tr-lg px-8 items-start flex-col bg-clip-padding backdrop-filter bg-slate-900 backdrop-blur-lg bg-opacity-10  ">
        <div>
          {/* image name */}
          <h2 className="text-2xl py-8 text-white break-words font-bold">{image.name}</h2>
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

