import { useEffect, useRef } from "react";
import { AsciiArtCanvasProps } from "../interfaces/prop-types";

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
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
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
