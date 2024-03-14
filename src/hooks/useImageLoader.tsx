import { useEffect, useState } from "react";
import { UseImageLoaderReturn } from "../interfaces/reduxState";

const useImageLoader = (
  imageSrc: string,
  onImageLoaded: (imageData: ImageData) => void
): UseImageLoaderReturn => {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setImageData(imgData);
      setLoading(false);
    };
    image.src = imageSrc;
    // CORS policy handling
    image.crossOrigin = "anonymous";
  }, [imageSrc]);

  return { imageData, loading };
};

export default useImageLoader;
