import Image from "next/image";

interface ImageCardProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const ImageCard = ({
  src,
  width = 1000,
  height = 1000,
  className = "",
  alt,
}: ImageCardProps) => {
  return (
    <Image
      alt={alt}
      src={src}
      width={width}
      height={height}
      className={`${className} min-h-screen w-auto object-cover object-center`}
    />
  );
};

export default ImageCard;
