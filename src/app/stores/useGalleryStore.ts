import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { GalleryStore } from "./types";
import { DataItem } from "../gallery/types";

const useGalleryStore = create<GalleryStore>()(
  devtools((set, get) => ({
    galleryItems: [],
    itemMap: {},
    clickedItemId: 0,
    likedItems: [],

    setClickedItemId: (id: string) => set({ clickedItemId: id }),

    addGalleryItems: (newItems) =>
      set((state) => {
        const updatedMap = { ...state.itemMap };
        newItems.forEach((item) => {
          updatedMap[item.id] = item;
        });
        return {
          galleryItems: [...state.galleryItems, ...newItems],
          itemMap: updatedMap,
        };
      }),

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
