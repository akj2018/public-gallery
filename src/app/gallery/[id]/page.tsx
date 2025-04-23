import GalleryItemDetails from "../components/GalleryItemDetails";
import Sidebar from "../components/Sidebar";

export default async function GalleryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex items-center justify-between  h-screen">
      {/* Gallery Item Details */}
      <GalleryItemDetails id={id} />
      {/* Sidebar */}
      <Sidebar />
    </div>
  );
}
