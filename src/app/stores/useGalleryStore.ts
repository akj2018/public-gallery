import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { GalleryStore } from "./types";
import { DataItem } from "../gallery/types";

const useGalleryStore = create<GalleryStore>()(
  devtools((set, get) => ({
    galleryItems: [],
    likedItems: [],

    addGalleryItems: (newItems: DataItem[]) =>
      set(
        (prev) => ({ galleryItems: [...prev.galleryItems, ...newItems] }),
        undefined,
        "addGalleryItems"
      ),

    updateGalleryItem: (updatedItem: DataItem) =>
      set(
        (state) => ({
          galleryItems: state.galleryItems.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          ),
        }),
        undefined,
        "updateGalleryItem"
      ),

    addLikedItem: (itemId: string) =>
      set(
        (state) => {
          if (state.likedItems.includes(itemId)) return {};
          return { likedItems: [...state.likedItems, itemId] };
        },
        undefined,
        "LikedItem"
      ),

    removeLikedItem: (itemId: string) =>
      set(
        (state) => ({
          likedItems: state.likedItems.filter((id) => id !== itemId),
        }),
        undefined,
        "unlikedItem"
      ),

    isItemLiked: (itemId: string) => {
      return get().likedItems.includes(itemId);
    },
  }))
);

export default useGalleryStore;
