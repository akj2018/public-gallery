import { useState, useEffect } from "react";

enum Breakpoints {
  sm = 640,
  md = 768,
  lg = 1024,
  xl = 1280,
  "2xl" = 1536,
}

function useColumnCount() {
  const [cols, setCols] = useState(0);

  // set initial column count based on window width
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      // breakpoints = [640, 768, 1024, 1280, 1536]
      if (w >= Breakpoints["2xl"]) setCols(6);
      else if (w >= Breakpoints.xl) setCols(5);
      else if (w >= Breakpoints.lg) setCols(4);
      else if (w >= Breakpoints.md) setCols(3);
      else if (w >= Breakpoints.sm) setCols(2);
      else setCols(1);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return cols;
}

export default useColumnCount;
