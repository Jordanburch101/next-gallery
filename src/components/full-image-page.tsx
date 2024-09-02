import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "../server/queries";

export default async function FullPageImageView(props: { id:number }) {
  const image = await getImage(props.id);
  const uploaderInfo = await clerkClient.users.getUser(image.userId);
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
          <div className="text-white mb-4">Uploaded by: {uploaderInfo.firstName}</div>
          {/* created on */}
          <div className="text-white">Created on: {new Date(image.createdAt).toLocaleDateString()}</div>
          {/* description */}
        </div>
      </div>
    </div>
  );
}