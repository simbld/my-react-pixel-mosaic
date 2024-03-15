import { useEffect, useRef } from "react";
import {
  defaultImage,
  densityDot,
  TARGET_WIDTH,
  TARGET_HEIGHT
} from "../config/config";
import { MainLayoutProps } from "../interfaces/prop-types";

const MainLayout: React.FC<MainLayoutProps> = ({ imageSrc }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    const image = imageRef.current!;

    // Définir la source de l'image
    image.src = imageSrc;

    image.onload = () => {
      // Redimensionner l'image
      const aspectRatio = image.width / image.height;
      let newWidth = TARGET_WIDTH;
      let newHeight = TARGET_HEIGHT;

      if (newWidth / newHeight > aspectRatio) {
        newWidth = newHeight * aspectRatio;
      } else {
        newHeight = newWidth / aspectRatio;
      }

      // Dessiner l'image redimensionnée sur le canevas
      context.drawImage(image, 0, 0, newWidth, newHeight);

      // Récupérer les données de l'image
      const imageData = context.getImageData(0, 0, newWidth, newHeight);
      const data = imageData.data;

      // Effacer le canevas avant de dessiner l'image ASCII
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Ajuster la résolution de l'image
      for (let i = 0; i < newWidth; i += 9) {
        for (let j = 0; j < newHeight; j += 9) {
          const pixelIndex = (i + j * newWidth) * 4;
          let r = data[pixelIndex + 0];
          let g = data[pixelIndex + 1];
          let b = data[pixelIndex + 2];

          // Modifier la luminosité
          const brightness = 0.7; // Augmenter ou diminuer cette valeur pour ajuster la luminosité
          r *= brightness;
          g *= brightness;
          b *= brightness;

          // Assurer que les valeurs restent entre 0 et 255
          r = Math.min(255, Math.max(0, r));
          g = Math.min(255, Math.max(0, g));
          b = Math.min(255, Math.max(0, b));

          const avg = (r + g + b) / 3;

          const len = densityDot.length;
          const charIndex = Math.floor(map(avg, 0, 255, len, 0));

          context.font = `10px sans-serif`;
          context.fillText(densityDot.charAt(charIndex), i, j);
        }
      }
    };

    imageRef.current!.src = imageSrc;
  }, [imageSrc]);

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
