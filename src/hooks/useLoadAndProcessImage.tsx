import { useEffect, useRef } from "react";

const useLoadAndProcessImage = (imageSrc: string) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (canvas && context) {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
      }
    };
    image.src = imageSrc;
    // Gérer CORS
    image.crossOrigin = "Anonymous";
  }, [imageSrc]);

  return canvasRef;
};
