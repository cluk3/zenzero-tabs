import { useEffect, useRef } from "react";

import { useRafState } from "react-use";

export const useScroll = (ref) => {
  const [state, setState] = useRafState({
    x: 0,
    y: 0,
    xPerc: 0,
    yPerc: 0,
  });

  useEffect(() => {
    const scrollEl = ref.current;
    const handler = () => {
      setState((state) => {
        const x = scrollEl.scrollLeft;
        const y = scrollEl.scrollTop;
        return {
          x,
          y,
          xPerc: x / (scrollEl.scrollWidth - scrollEl.offsetWidth) || 0,
          yPerc: y / (scrollEl.scrollHeight - scrollEl.offsetHeight) || 0,
        };
      });
    };
    scrollEl.addEventListener("scroll", handler, {
      capture: false,
      passive: true,
    });

    return () => {
      scrollEl.removeEventListener("scroll", handler);
    };
  }, [ref, setState]);

  return state;
};
