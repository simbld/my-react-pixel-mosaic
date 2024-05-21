import { useRef, useEffect } from "react";
import {
  densityDot,
  TARGET_WIDTH,
  TARGET_HEIGHT
} from "../../../config/config";
import { FilterProps } from "../../../interfaces/types";

/**
 * AsciiArtFilter est un composant React qui applique un filtre ASCII art à une image.
 * @param {FilterProps} props - Les propriétés du composant.
 * @param {string} props.imageSrc - La source de l'image à filtrer.
 * @returns {JSX.Element} L'élément canvas avec l'image filtrée.
 */
const AsciiArtFilter: React.FC<FilterProps> = ({ imageSrc, canvasRef }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    const context = canvas?.getContext("2d");
    const image = imageRef.current;

    if (canvas && context && image) {
      image.onload = () => {
        canvas.width = TARGET_WIDTH;
        canvas.height = TARGET_HEIGHT;

        // Dessiner l'image redimensionnée sur le canvas
        context.clearRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
        context.drawImage(image, 0, 0, TARGET_WIDTH, TARGET_HEIGHT);

        // Récupérer les données de l'image et appliquer le filtre ASCII
        const imageData = context.getImageData(
          0,
          0,
          TARGET_WIDTH,
          TARGET_HEIGHT
        );
        const data = imageData.data;

        context.clearRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);

        for (let i = 0; i < TARGET_WIDTH; i += 9) {
          for (let j = 0; j < TARGET_HEIGHT; j += 9) {
            const pixelIndex = (i + j * TARGET_WIDTH) * 4;
            let r = data[pixelIndex];
            let g = data[pixelIndex + 1];
            let b = data[pixelIndex + 2];

            const brightness = 0.7;
            r *= brightness;
            g *= brightness;
            b *= brightness;

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

      image.crossOrigin = "Anonymous";
      image.src = imageSrc;
    }
  }, [imageSrc, canvasRef]);

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
    <img
      ref={imageRef}
      src={imageSrc}
      style={{ display: "none" }}
      alt="hidden"
    />
  );
};

export default AsciiArtFilter;
