import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { images } from "./db/schema";
import { redirect } from "next/navigation";
import analyticsServerCLient from "./analytics";
import { UTApi } from "uploadthing/server";

export async function getMyImages() {

  const user = auth();

  if (!user.userId) throw new Error("User is not authorized to view images");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc}) => desc(model.id),
  });
  return images;
}

export async function getImage(id: number) {
  const user = auth();
  
  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) return;

  if (image.userId !== user.userId) throw new Error("Unauthorized");

  return image;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) throw new Error("Invalid id");

  const imageUrl = image.url.replace("https://utfs.io/f/", "");

  const utApi = new UTApi();
  await utApi.deleteFiles([imageUrl]);
  console.log("deleted image with id", imageUrl);


  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));
    

    analyticsServerCLient.capture({
      distinctId: user.userId,
      event: 'delete image',
      properties: {
        imageId: id
      }
    });



  redirect("/deleted");
}