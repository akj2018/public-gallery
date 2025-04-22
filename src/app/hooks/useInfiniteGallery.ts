// hooks/useInfiniteGallery.ts
import { useEffect, useRef, useState } from "react";
import getNextGalleryItems from "../api/getNextGalleryItems";
import useGalleryStore from "../stores/useGalleryStore";
import { GalleryStore } from "../stores/types";

export default function useInfiniteGallery() {
  const addGalleryItems = useGalleryStore(
    (state: GalleryStore) => state.addGalleryItems
  );

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const offsetRef = useRef(0); // how many we’ve already loaded
  const fetchingRef = useRef(false); // guard against races
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMore = async () => {
    if (fetchingRef.current || !hasMore) return;
    fetchingRef.current = true;
    setLoading(true);

    try {
      const { items: next, hasMore: more } = await getNextGalleryItems(
        offsetRef.current
      );

      if (next.length) {
        addGalleryItems(next); // add new items to the store
        offsetRef.current += next.length;
      }
      setHasMore(more);
    } catch (err) {
      console.error(err);
    } finally {
      fetchingRef.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    const node = loaderRef.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "70%", // fire a bit before the bottom
        threshold: 0,
      }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, []); // run once

  return { loaderRef, loading, hasMore };
}
