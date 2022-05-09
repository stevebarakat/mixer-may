import React from "react";

import { debounce, throttle } from "../utils/utils";

const useBoundingBox = (ref, scrollDebounce = 60, resizeThrottle = 60) => {
  const [box, setBox] = React.useState(null);

  React.useEffect(() => {
    // Don't think this is possible?
    if (!ref.current) {
      return;
    }

    // Wait a sec before calculating the initial value.
    window.setTimeout(() => {
      setBox(ref.current.getBoundingClientRect());
    }, 200);

    function update() {
      const newBox = ref.current?.getBoundingClientRect();

      if (newBox) {
        setBox(newBox);
      }
    }

    const handleScroll = scrollDebounce
      ? debounce(update, scrollDebounce)
      : update;
    const handleResize = resizeThrottle
      ? throttle(update, resizeThrottle)
      : update;

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return box;
};

export default useBoundingBox;
