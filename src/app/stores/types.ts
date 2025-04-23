import { DataItem } from "../gallery/types";

type GalleryStore = {
  galleryItems: DataItem[];
  likedItems: string[];
  itemMap: Record<string, DataItem>;
  clickedItemId: string;
  setClickedItemId: (id: string) => void;
  addLikedItem: (itemId: string) => void;
  removeLikedItem: (itemId: string) => void;
  isItemLiked: (itemId: string) => boolean;
  addGalleryItems: (newItems: DataItem[]) => void;
  updateGalleryItem: (updatedItem: DataItem) => void;
};

export type { GalleryStore };
