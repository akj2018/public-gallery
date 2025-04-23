"use client";

import { useParams, useRouter } from "next/navigation";

import useGalleryStore from "@/app/stores/useGalleryStore";
import Image from "next/image";
import isVideo from "@/app/utils/isVideo";
import { useRef } from "react";
import { useEffect } from "react";

const Sidebar = () => {
  const items = useGalleryStore((state) => state.galleryItems); // trigger re-render when items change
  const itemRefs = useRef(new Map<string, HTMLDivElement | null>());

  const params = useParams();
  const selectedId = params?.id as string;

  const router = useRouter();

  const sidebarClickHandler = (id: string) => {
    router.push(`/gallery/${id}`);
    const element = itemRefs.current.get(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center", // Scrolls the item into the vertical center
        inline: "nearest",
      });
    }
  };

  useEffect(() => {
    const selectedEl = itemRefs.current.get(selectedId);
    if (selectedEl) {
      selectedEl.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [items.length, selectedId]);

  return (
    <div className="w-[5%]  h-screen">
      <div className="flex flex-col gap-2 h-full overflow-y-auto hide-scrollbar px-3">
        {items.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => sidebarClickHandler(item.id.toString())}
              ref={(el) => {
                itemRefs.current.set(item.id.toString(), el);
              }}
              className={`w-full relative cursor-pointer transition-all duration-100 ease-in-out ${
                selectedId === item.id.toString()
                  ? "scale-110 -translate-x-2 z-10"
                  : "hover:scale-110 "
              }`}
              style={{ paddingTop: "100%" }}
            >
              {isVideo(item.mediaUrl) ? (
                <Image
                  src="/fallback.png"
                  alt={`Thumbnail ${item.id}`}
                  fill
                  className="object-cover rounded-md"
                />
              ) : (
                <Image
                  src={item.mediaUrl}
                  alt={`Thumbnail ${item.id}`}
                  fill
                  className="object-cover rounded-md"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
