interface VideoCardProps {
  src: string;
  className?: string;
  durationSec?: number;
  width?: number;
  height?: number;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
}

const VideoCard = ({
  src,
  className = "",
  width = 1000,
  height = 1000,
  controls = true,
  loop = false,
  muted = true,
  autoPlay = true,
}: VideoCardProps) => {
  return (
    <div className="relative h-full">
      <video
        className={`${className} h-full w-auto object-contain object-center`}
        width={width}
        height={height}
        controls={controls}
        loop={loop}
        muted={muted}
        playsInline
        preload="auto"
        autoPlay={autoPlay}
      >
        <source src={src} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoCard;
