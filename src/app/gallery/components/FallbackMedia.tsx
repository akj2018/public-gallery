import { Image } from "lucide-react";

const FallbackMedia = ({ className }: { className: string }) => {
  return (
    <div
      className={`${className} bg-background text-foreground dark:bg-gray-600 flex justify-center items-center`}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image size={50} aria-hidden="true" focusable="false" />
    </div>
  );
};

export default FallbackMedia;
