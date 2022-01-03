import { useEffect } from "react";

export default function useScrollBottomDetect(callback, detectRange = 0) {
  const handleScrollBottom = () => {
    if (
      document.body.scrollHeight -
        document.body.clientHeight -
        window.scrollY <=
      detectRange
    ) {
      callback();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollBottom);

    return () => window.removeEventListener("scroll", handleScrollBottom);
  }, []);
}
