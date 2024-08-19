import { useEffect, useRef, useState } from "react";
import { RopeArtFilterProps } from "@interfaces/types";

/**
 * RopeArtFilterExtended est un composant React qui applique un filtre Rope Art en mode étendu à une image.
 * @param {RopeArtFilterProps} props - Les propriétés du composant.
 * @returns {JSX.Element} L'élément JSX du filtre Rope Art étendu.
 */
const RopeArtFilterExtended: React.FC<RopeArtFilterProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  // États pour les paramètres configurables
  const [step, setStep] = useState<number>(10); // Distance entre les lignes
  const [angleSteps, setAngleSteps] = useState<number>(12); // Nombre de directions des lignes
  const [minLineDensity, setMinLineDensity] = useState<number>(5); // Densité minimale des lignes
  const [maxLineDensity, setMaxLineDensity] = useState<number>(15); // Densité maximale des lignes

  useEffect(() => {
    const canvas = canvasRef?.current;
    const context = canvas?.getContext("2d", { willReadFrequently: true });
    const image = imageRef.current;

    if (canvas && context && image) {
      image.onload = () => {
        const imgWidth = image.width;
        const imgHeight = image.height;
        const aspectRatio = imgWidth / imgHeight;

        let drawWidth = canvas.width;
        let drawHeight = canvas.height;

        if (canvas.width / canvas.height > aspectRatio) {
          drawWidth = canvas.height * aspectRatio;
        } else {
          drawHeight = canvas.width / aspectRatio;
        }

        const offsetX = (canvas.width - drawWidth) / 2;
        const offsetY = (canvas.height - drawHeight) / 2;

        // Dessiner l'image redimensionnée sur le canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

        // Récupérer les données de l'image et appliquer le filtre Rope Art
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const data = imageData.data;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        for (let y = 0; y < canvas.height; y += step) {
          for (let x = 0; x < canvas.width; x += step) {
            const pixelIndex = (x + y * canvas.width) * 4;
            const r = data[pixelIndex];
            const g = data[pixelIndex + 1];
            const b = data[pixelIndex + 2];
            const brightness = (r + g + b) / 3;
            const lineDensity = map(
              brightness,
              0,
              255,
              minLineDensity,
              maxLineDensity
            );

            for (let angleIndex = 0; angleIndex < angleSteps; angleIndex++) {
              const angle = (Math.PI * 2 * angleIndex) / angleSteps;
              const dx = Math.cos(angle) * step;
              const dy = Math.sin(angle) * step;

              for (let i = 0; i < lineDensity; i++) {
                const x1 = x;
                const y1 = y;
                const x2 = x1 + dx;
                const y2 = y1 + dy;

                context.strokeStyle = `rgb(${r},${g},${b})`;
                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.stroke();
              }
            }
          }
        }

        if (onFilterComplete) {
          onFilterComplete();
        }
      };

      image.crossOrigin = "Anonymous";
      image.src = imageSrc;
    }
  }, [
    imageSrc,
    canvasRef,
    onFilterComplete,
    step,
    angleSteps,
    minLineDensity,
    maxLineDensity
  ]);

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

export default RopeArtFilterExtended;
