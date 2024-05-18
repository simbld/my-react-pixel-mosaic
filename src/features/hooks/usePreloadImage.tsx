import { useEffect, useState } from "react";

const usePreloadImage = (url: string) => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const img = new Image();

    if (!img) return;

    img.onload = () => setStatus("loaded");
    img.onerror = () => setStatus("error");

    img.src = url;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [url]);

  return status;
};

export default usePreloadImage;
