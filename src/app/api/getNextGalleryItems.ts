import { DataItem } from "../gallery/types";

type GalleryResponse = {
  items: DataItem[];
  hasMore: boolean;
};

const getNextGalleryItems = async (index = 0): Promise<GalleryResponse> => {
  const url = `http://localhost:5000/api/gallery/next/${index}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch gallery data");
  }

  return response.json();
};

export default getNextGalleryItems;
