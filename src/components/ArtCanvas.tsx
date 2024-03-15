import { useRef, useEffect } from "react";
import { MAX_CANVAS_SIZE } from "../config/config";
import { ArtCanvasPropsWithFilter } from "../interfaces/prop-types";

const ArtCanvas: React.FC<ArtCanvasPropsWithFilter> = ({
  imageProcessingState,
  filter
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = () => {
      const ratio = Math.min(
        MAX_CANVAS_SIZE / image.width,
        MAX_CANVAS_SIZE / image.height
      );
      const width = image.width * ratio;
      const height = image.height * ratio;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(image, 0, 0, width, height);

      console.log("Before applying filter");
      // Apply the filter
      filter(ctx, canvas);
      console.log("After applying filter");
    };
    image.onerror = (error) => {
      console.error("Erreur lors du chargement de l'image:", error);
    };
    image.src = imageProcessingState.url;
  }, [imageProcessingState.url, filter]);

  return <canvas ref={canvasRef} />;
};

export default ArtCanvas;
