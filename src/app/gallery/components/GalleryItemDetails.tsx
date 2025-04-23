"use client";

import { useRouter } from "next/navigation";

import isVideo from "@/app/utils/isVideo";
import VideoCard from "./VideoCard";
import ImageCard from "./ImageCard";
import getTimeElapsed from "@/app/utils/getTimeElapsed";

import { X } from "lucide-react";
import useGalleryItem from "@/app/hooks/useGalleryItem";
import LoadingPage from "../[id]/loading";
import ErrorPage from "../[id]/error";
import NotFoundPage from "../[id]/not-found";

interface GalleryItemDetailsProps {
  id: string;
}

const GalleryItemDetails = ({ id }: GalleryItemDetailsProps) => {
  const { item: itemData, loading, error } = useGalleryItem(id);
  const router = useRouter();

  if (loading) return <LoadingPage />;
  if (!itemData) return <NotFoundPage />;
  if (error) return <ErrorPage error={error} />;

  const { mediaUrl, uploadedAt, author, prompt, tags } = itemData;

  const isVid = isVideo(mediaUrl);
  const timeSinceUpload = getTimeElapsed(uploadedAt);

  const handleClose = () => {
    router.push("/gallery");
  };

  return (
    <div className="flex gap-3 h-full p-2 justify-between w-full mr-10">
      {/* Image / Video Container */}
      <div className="flex-1 h-full rounded-2xl overflow-hidden relative flex items-center justify-center">
        <div className="rounded-2xl overflow-hidden h-full">
          {isVid ? (
            <VideoCard src={mediaUrl} />
          ) : (
            <ImageCard alt="Image" src={mediaUrl} />
          )}
        </div>

        <div className="absolute top-2 right-3">
          <CloseIcon onClick={handleClose} />
        </div>
      </div>

      {/* Details Container */}
      <div className="w-[30%] lg:w-[20%]  rounded-2xl flex-col gap-4 p-2 mr-3">
        {/* Title and time */}
        <div className="flex items-center gap-3">
          <p>{author}</p>
          <p className="text-gray-400 text-xs">{timeSinceUpload}</p>
        </div>

        {/* Prompt */}
        <div className="text-sm mt-3 max-h-[50%] overflow-y-auto pr-4 scrollbar-custom">
          {prompt}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-700 text-gray-400 text-xs font-semibold px-3 py-1 rounded-sm cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CloseIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center size-8 rounded-full bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-gray-200 cursor-pointer transition duration-200 ease-in-out"
    >
      <X />
    </div>
  );
};

export default GalleryItemDetails;
