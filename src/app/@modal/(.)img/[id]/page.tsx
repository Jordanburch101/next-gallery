import { getImage } from "~/server/queries";
import { Modal } from "./modal";
import FullPageImageView from "~/components/full-image-page";

export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const isASNumber = Number(photoId);
  if (Number.isNaN(isASNumber)) throw new Error("Invalid ID");

  const image = getImage(isASNumber);
  return (
    <Modal>
      <FullPageImageView id={isASNumber} />
    </Modal>
  );
}