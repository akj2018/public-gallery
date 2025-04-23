import { DataItem } from "../gallery/types";

const getGalleryItem = async (id: string): Promise<DataItem> => {
  if (!id) {
    throw new Error("ID is required to fetch gallery item");
  }

  const url = `https://mirror-yielding-science.glitch.me/api/gallery/${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("404: Item not found");
    }

    throw new Error(`Server error: ${response.status}`);
  }

  const data: DataItem = await response.json();
  return data;
};

export default getGalleryItem;
