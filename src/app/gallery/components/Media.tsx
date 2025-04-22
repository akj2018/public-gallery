"use client";

import isVideo from "@/app/utils/isVideo";
import Image from "next/image";
import { useState } from "react";
import FallbackMedia from "./FallbackMedia";
import getVideoDuration from "@/app/utils/getVideoDuration";

interface MediaProps {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  durationSec?: number;
}

const Media = ({
  src,
  alt = "",
  className = "",
  width = 500,
  height = 500,
  loop = true,
  muted = true,
  controls = false,
  durationSec = 5,
}: MediaProps) => {
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const isVid = isVideo(src);

  const handleError = () => {
    setFailed(true);
    setLoading(false);
  };

  const handleLoaded = () => {
    setLoading(false);
    console.log("Media loaded successfully");
  };

  if (failed) {
    return <FallbackMedia className={className} />;
  }

  return (
    <div
      className={`${className} relative overflow-hidden`}
      onMouseEnter={(e) => e.currentTarget.querySelector("video")?.play()}
      onMouseLeave={(e) => e.currentTarget.querySelector("video")?.pause()}
    >
      {/* Shimmer UI overlay */}
      {loading && (
        <div
          className={`absolute z-10 inset-0 bg-gray-900 animate-pulse`}
        ></div>
      )}

      {isVid ? (
        // Video element
        <div>
          <video
            className={`${className} object-cover object-center`}
            width={width}
            height={height}
            controls={controls}
            loop={loop}
            muted={muted}
            playsInline
            preload="auto"
            onLoadedData={handleLoaded}
            onError={handleError}
          >
            <source src={src} />
            Your browser does not support the video tag.
          </video>
          {/* Overlay Content */}
          <div className="absolute top-2 left-2 bg-background px-3 py-1 text-sm rounded-2xl inline-flex items-center justify-center">
            <span className="leading-4 tracking-wider">
              {getVideoDuration(durationSec)}
            </span>
          </div>
        </div>
      ) : (
        // Image element
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoaded}
          onError={handleError}
          className={`${className} object-cover object-center`}
        />
      )}
    </div>
  );
};

export default Media;
