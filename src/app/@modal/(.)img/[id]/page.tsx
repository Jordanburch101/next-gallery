import { getImage } from "~/server/queries";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const isASNumber = Number(photoId);
  if (Number.isNaN(isASNumber)) throw new Error("Invalid ID");

  const image = await getImage(isASNumber);
  return <div>
         <img src={image.url} className="w-96" />
        </div>;
}