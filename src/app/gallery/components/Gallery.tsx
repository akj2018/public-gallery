"use client";

import { GalleryCard } from "./GalleryCard";
import { DataItem } from "../types";
import useColumnCount from "@/app/hooks/useColumnCount";
import useInfiniteGallery from "@/app/hooks/useInfiniteGallery";
import useGalleryStore from "@/app/stores/useGalleryStore";
import { useMemo } from "react";

const Gallery = () => {
  const cols = useColumnCount();
  const { loaderRef, loading, hasMore } = useInfiniteGallery();
  const items = useGalleryStore((state) => state.galleryItems); // trigger re-render when items change

  const columns = useMemo(() => {
    // 1) Make a sorted copy
    const sortedItems = [...items].sort((a, b) => {
      // sort by likes descending
      if (b.likes !== a.likes) {
        return b.likes - a.likes;
      }
      // if likes equal, sort by uploadedAt descending (newest first)
      return (
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      );
    });

    // initialize empty arrays for each column
    const colsArr: DataItem[][] = Array.from({ length: cols }, () => []);

    // distribute items in round‑robin
    sortedItems.forEach((item, i) => {
      if (cols === 0) return; // avoid division by zero
      colsArr[i % cols].push(item);
    });
    return colsArr;
  }, [items, cols]);

  return (
    <div className="h-screen rounded-3xl">
      <div className="flex gap-[2px]">
        {columns.map((columnItems, ci) => (
          <div key={ci} className="flex flex-col gap-[2px] flex-1">
            {columnItems.map((item) => {
              console.log("Render item:", item.id);
              return <GalleryCard key={item.id} data={item} />;
            })}
          </div>
        ))}
      </div>

      {/* the “sentinel” that fires loadMore when it comes into view */}
      <div ref={loaderRef} className="h-1" />

      {loading && <div className="text-center py-4">Loading…</div>}
      {!hasMore && <div className="text-center py-4">End of gallery</div>}
    </div>
  );
};

export default Gallery;
