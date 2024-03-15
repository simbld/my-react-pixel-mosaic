import { useEffect, useRef } from "react";
import { AsciiArtCanvasProps } from "../interfaces/prop-types";
import { MAX_CANVAS_SIZE } from "../config/config";

const AsciiArtCanvas: React.FC<AsciiArtCanvasProps> = ({
  imageProcessingState
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
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
    };
    image.onerror = (error) => {
      console.error("Erreur lors du chargement de l'image:", error);
    };
    image.src = imageProcessingState.url;
    image.crossOrigin = "Anonymous";
  }, [imageProcessingState.url]);

  return <canvas ref={canvasRef} />;
};

export default AsciiArtCanvas;
