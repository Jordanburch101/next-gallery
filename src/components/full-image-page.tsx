import { getImage } from "../server/queries";

export default async function FullPageImageView(props: { id:number }) {
  const image = await getImage(props.id);
  return (
    <div className="flex my-auto gap-8 px-10">
      <div>
           <img src={image.url} className="w-full object-contain" />
      </div>
      <div className="w-48 flex items-start flex-col">
        <div>
        <h2 className="text-2xl text-white font-bold">{image.name}</h2>
        {/* <p className="text-lg">{image.description}</p> */}
        </div>

      </div>
    </div>
  );
}