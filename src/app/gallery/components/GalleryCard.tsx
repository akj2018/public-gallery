import { useRouter } from "next/navigation";

import { DataItem } from "../types";
import Media from "./Media";
import { Heart } from "lucide-react";
import useGalleryStore from "@/app/stores/useGalleryStore";
import React from "react";

interface GalleryCardProps {
  data: DataItem;
}

function GalleryCardInner({ data }: GalleryCardProps) {
  const likeItem = useGalleryStore((state) => state.addLikedItem);
  const unlikeItem = useGalleryStore((state) => state.removeLikedItem);
  const likedItems = useGalleryStore((state) => state.likedItems);
  const isLiked = likedItems.includes(data.id.toString());

  const likeHandler = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isLiked) {
      unlikeItem(data.id.toString());
    } else {
      likeItem(data.id.toString());
    }
  };

  const router = useRouter();
  const clickHandler = () => {
    router.push(`/gallery/${data.id}`);
  };

  return (
    <div
      className=" rounded-[2px] overflow-hidden relative group cursor-pointer"
      onClick={clickHandler}
    >
      {/* Text Overlay */}
      <div
        className="absolute bottom-0 z-10 p-5 w-full text-white  font-bold transition-all duration-200 ease-in-out
                      translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                      bg-gradient-to-t from-black/90 to-transparent"
      >
        <div className="flex justify-between">
          <p className="">{data.author}</p>
          <p
            className="flex items-center gap-1 select-none"
            onClick={likeHandler}
          >
            <Heart
              fill={isLiked ? "red" : "none"}
              stroke={isLiked ? "red" : "white"}
            />
            <span>{isLiked ? data.likes + 1 : data.likes}</span>
          </p>
        </div>
      </div>

      <Media
        alt={"Media created by - " + data.author}
        src={data.mediaUrl}
        className="w-full h-full min-h-[350px]"
        durationSec={data?.durationSec}
      />
    </div>
  );
}

export const GalleryCard = React.memo(GalleryCardInner);
