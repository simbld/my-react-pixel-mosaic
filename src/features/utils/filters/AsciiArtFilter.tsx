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
 * @param {React.RefObject<HTMLCanvasElement>} props.canvasRef - Référence du canvas où appliquer le filtre.
 * @param {() => void} props.onFilterComplete - Callback appelée lorsque le filtrage est terminé.
 * @returns {JSX.Element} L'élément JSX du filtre ASCII art.
 */
const AsciiArtFilter: React.FC<FilterProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    const context = canvas?.getContext("2d");
    const image = imageRef.current;

    if (canvas && context && image) {
      image.onload = () => {
        const imgWidth = image.width;
        const imgHeight = image.height;
        const aspectRatio = imgWidth / imgHeight;

        let drawWidth = TARGET_WIDTH;
        let drawHeight = TARGET_HEIGHT;

        if (TARGET_WIDTH / TARGET_HEIGHT > aspectRatio) {
          drawWidth = TARGET_HEIGHT * aspectRatio;
        } else {
          drawHeight = TARGET_WIDTH / aspectRatio;
        }

        const offsetX = (TARGET_WIDTH - drawWidth) / 2;
        const offsetY = (TARGET_HEIGHT - drawHeight) / 2;

        canvas.width = TARGET_WIDTH;
        canvas.height = TARGET_HEIGHT;

        // Dessiner l'image redimensionnée sur le canvas
        context.clearRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
        context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

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
        if (onFilterComplete) {
          onFilterComplete();
        }
      };

      image.crossOrigin = "Anonymous";
      image.src = imageSrc;
    }
  }, [imageSrc, canvasRef]);

  /**
   * Mappe une valeur d'un intervalle à un autre.
   * @param {number} value - La valeur à mapper.
   * @param {number} start1 - Début de l'intervalle d'origine.
   * @param {number} stop1 - Fin de l'intervalle d'origine.
   * @param {number} start2 - Début du nouvel intervalle.
   * @param {number} stop2 - Fin du nouvel intervalle.
   * @returns {number} - La valeur mappée.
   */
  const map = (
    value: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number
  ): number => {
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
