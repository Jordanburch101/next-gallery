import Link from "next/link";

const mockUrls = [
  "https://utfs.io/f/cbeeecd9-5b5c-4411-9077-46bb46321dfc-xl80dy.jpg",
  "https://utfs.io/f/873625e5-0877-46f3-b408-f8f69c83e42b-67atx1.jpg",
  "https://utfs.io/f/0eae6ac9-04a2-4fe4-a86b-c13fbd773f44-hemksy.jpeg",
  "https://utfs.io/f/c28eca48-88a3-4304-be53-536b0e8a4f6d-xoomzk.jpg",
  
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt="" className="w-full h-auto" />
          </div>
        ))}
      </div>
    </main>
  );
}
