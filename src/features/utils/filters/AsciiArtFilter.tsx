import React, { useEffect, useRef } from "react";
import * as d3 from "d3-delaunay";
import { TARGET_WIDTH, TARGET_HEIGHT } from "@config/config";
import type { StipplingArtFilterTypeProps } from "@interfaces/types";

/**
 * AsciiArtFilter est un composant React qui applique un filtre ASCII art à une image.
 * @param {AsciiFilterProps} props - Les propriétés du composant.
 * @param {string} props.imageSrc - La source de l'image à filtrer.
 * @param {React.RefObject<HTMLCanvasElement>} props.canvasRef - Référence du canvas où appliquer le filtre.
 * @param {string} props.density - La densité de caractères à utiliser pour le filtre.
 * @param {() => void} props.onFilterComplete - Callback appelée lorsque le filtrage est terminé.
 * @param {"simple" | "extended" | "block"} props.filterType - Type de filtre à appliquer.
 * @returns {JSX.Element} L'élément JSX du filtre ASCII art.
 */
const AsciiArtFilter: React.FC<StipplingArtFilterTypeProps> = ({
  imageSrc,
  canvasRef,
  density = "",
  onFilterComplete,
  filterType
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    const context = canvas?.getContext("2d", { willReadFrequently: true });
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
        context.fillStyle = "black";
        context.fillRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
        context.fillStyle = "white";

        for (let i = 0; i < TARGET_WIDTH; i += 9) {
          for (let j = 0; j < TARGET_HEIGHT; j += 9) {
            const pixelIndex = (i + j * TARGET_WIDTH) * 4;
            let r = data[pixelIndex + 0];
            let g = data[pixelIndex + 1];
            let b = data[pixelIndex + 2];

            const brightness = 1.1; // Adjust the brightness as needed
            r *= brightness;
            g *= brightness;
            b *= brightness;

            r = Math.min(255, Math.max(0, r));
            g = Math.min(255, Math.max(0, g));
            b = Math.min(255, Math.max(0, b));

            const avg = (r + g + b) / 3;
            const len = density.length;
            const charIndex = Math.floor(map(avg, 0, 255, len, 0));

            context.font = `11px sans-serif`;
            context.fillText(density.charAt(charIndex), i, j);
          }
        }
        if (onFilterComplete) {
          onFilterComplete();
        }
      };

      image.crossOrigin = "Anonymous";
      image.src = imageSrc;
    }
  }, [imageSrc, canvasRef, density, filterType]);

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
