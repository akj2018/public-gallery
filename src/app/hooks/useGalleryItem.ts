import { useState, useEffect } from "react";
import getGalleryItem from "../api/getGalleryItem";
import { DataItem } from "../gallery/types";
import useGalleryStore from "../stores/useGalleryStore";

const useGalleryItem = (id: string) => {
  // 1) Read from Zustand store
  const itemFromStore = useGalleryStore((s) => s.itemMap[id]);
  const addGalleryItems = useGalleryStore((s) => s.addGalleryItems);

  const [item, setItem] = useState<DataItem | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If we already have it, no need to fetch
    if (itemFromStore) {
      setItem(itemFromStore);
      setLoading(false);
      return;
    }

    let isMounted = true;

    setLoading(true);
    getGalleryItem(id)
      .then((data) => {
        if (!data) throw new Error("No data returned");
        // write into global store
        addGalleryItems([data]);
        if (isMounted) setItem(data);
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id, itemFromStore, addGalleryItems]);

  return { item, loading, error };
};

export default useGalleryItem;
