import type { ArtFilterProps } from "@interfaces/types";
import { useEffect, useRef } from "react";

/**
 * StringArtFilterBlock est un composant React qui applique un filtre de String Art à une image.
 * @param {ArtFilterProps} props - Les propriétés du composant.
 * @returns {JSX.Element} L'élément JSX du filtre String Art.
 */
const StringArtFilterBlock: React.FC<ArtFilterProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete
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

        // Récupérer les données de l'image et appliquer le filtre String Art
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const data = imageData.data;

        const numPoints = 200; // Nombre de points autour du cercle
        const points = generateCirclePoints(
          numPoints,
          canvas.width,
          canvas.height
        );
        const numLines = 2000; // Nombre de lignes à tracer

        context.clearRect(0, 0, canvas.width, canvas.height);

        let lastPoint = points[0];
        for (let i = 0; i < numLines; i++) {
          let bestPoint = null;
          let bestScore = -Infinity;

          for (const point of points) {
            const score = evaluateLine(data, canvas.width, lastPoint, point);
            if (score > bestScore) {
              bestScore = score;
              bestPoint = point;
            }
          }

          if (bestPoint) {
            context.strokeStyle = "black";
            context.lineWidth = 0.5;
            context.beginPath();
            context.moveTo(lastPoint.x, lastPoint.y);
            context.lineTo(bestPoint.x, bestPoint.y);
            context.stroke();
            lastPoint = bestPoint;
          }
        }

        if (onFilterComplete) {
          onFilterComplete();
        }
      };

      image.crossOrigin = "Anonymous";
      image.src = imageSrc;
    }
  }, [imageSrc, canvasRef, onFilterComplete]);

  /**
   * Génère des points autour d'un cercle.
   * @param {number} numPoints - Le nombre de points à générer.
   * @param {number} width - La largeur du canvas.
   * @param {number} height - La hauteur du canvas.
   * @returns {Array<{x: number, y: number}>} - Un tableau de points.
   */
  const generateCirclePoints = (
    numPoints: number,
    width: number,
    height: number
  ) => {
    const points = [];
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2;

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      points.push({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      });
    }

    return points;
  };

  /**
   * Évalue une ligne en fonction des pixels traversés.
   * @param {Uint8ClampedArray} data - Les données de l'image.
   * @param {number} width - La largeur du canvas.
   * @param {{x: number, y: number}} point1 - Le point de départ de la ligne.
   * @param {{x: number, y: number}} point2 - Le point d'arrivée de la ligne.
   * @returns {number} - Le score de la ligne.
   */
  const evaluateLine = (
    data: Uint8ClampedArray,
    width: number,
    point1: { x: number; y: number },
    point2: { x: number; y: number }
  ): number => {
    const numSamples = 100;
    let score = 0;

    for (let i = 0; i < numSamples; i++) {
      const t = i / (numSamples - 1);
      const x = Math.round(point1.x + t * (point2.x - point1.x));
      const y = Math.round(point1.y + t * (point2.y - point1.y));
      const pixelIndex = (y * width + x) * 4;
      const brightness =
        (data[pixelIndex] + data[pixelIndex + 1] + data[pixelIndex + 2]) / 3;
      score += 255 - brightness; // Plus la zone est sombre, plus le score est élevé
    }

    return score;
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

export default StringArtFilterBlock;
