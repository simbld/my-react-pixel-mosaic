import { useEffect, useRef } from "react";
import {
  defaultImage,
  densityDot,
  TARGET_WIDTH,
  TARGET_HEIGHT
} from "../config/config";

const MainLayout: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    const image = imageRef.current!;

    image.onload = () => {
      // Définir la taille du canevas
      canvas.width = TARGET_WIDTH;
      canvas.height = TARGET_HEIGHT;

      // Dessiner l'image sur le canevas à la taille du canevas
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Récupérer les données de l'image
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Effacer le canevas avant de dessiner l'image ASCII
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < canvas.width; i += 10) {
        for (let j = 0; j < canvas.height; j += 10) {
          const pixelIndex = (i + j * canvas.width) * 4;
          const r = data[pixelIndex + 0];
          const g = data[pixelIndex + 1];
          const b = data[pixelIndex + 2];
          const avg = (r + g + b) / 3;

          const len = densityDot.length;
          const charIndex = Math.floor(map(avg, 0, 255, len, 0));

          context.font = `10px sans-serif`;
          context.fillText(densityDot.charAt(charIndex), i, j);
        }
      }
    };

    image.src = defaultImage;
  }, []);

  const map = (
    value: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number
  ) => {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  };

  return (
    <>
      <canvas ref={canvasRef} width={TARGET_WIDTH} height={TARGET_HEIGHT} />
      <img
        ref={imageRef}
        src={defaultImage}
        style={{ display: "none" }}
        alt="hidden"
      />
    </>
  );
};

export default MainLayout;
