import { DataItem } from "../gallery/types";

type GalleryResponse = {
  items: DataItem[];
  hasMore: boolean;
};

const getNextGalleryItems = async (index = 0): Promise<GalleryResponse> => {
  const url = `https://mirror-yielding-science.glitch.me/api/gallery/next/${index}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("404: Item not found");
    }

    throw new Error(`Server error: ${response.status}`);
  }

  return response.json();
};

export default getNextGalleryItems;
