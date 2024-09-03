import { getImage } from "~/server/queries";

import FullPageImageView from "~/components/full-image-page";

export default function PhotoPage({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const isASNumber = Number(photoId);
  if (Number.isNaN(isASNumber)) throw new Error("Invalid ID");

  const image = getImage(isASNumber);
  return (

      <FullPageImageView photoId={photoId} />

  );
}