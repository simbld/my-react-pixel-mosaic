import type { ArtFilterProps } from "@interfaces/types";
import { useEffect, useRef, useState } from "react";

/**
 * StringArtFilterExtended est un composant React qui applique un filtre de String Art à une image.
 * @param {ArtFilterProps} props - Les propriétés du composant.
 * @returns {JSX.Element} L'élément JSX du filtre String Art.
 */
const StringArtFilterExtended: React.FC<ArtFilterProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  // États pour les paramètres configurables
  const [numPoints, setNumPoints] = useState<number>(200); // Nombre de points autour du cercle
  const [numLines, setNumLines] = useState<number>(2000); // Nombre de lignes à tracer
  const [lineWidth, setLineWidth] = useState<number>(0.5); // Épaisseur des lignes

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) {
      console.error("Canvas is null");
      return;
    }

    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) {
      console.error("Context is null");
      return;
    }

    const image = imageRef.current;
    if (!image) {
      console.error("Image ref is null");
      return;
    }

    image.onload = () => {
      console.log("Image loaded:", image.src); // Vérifier si l'image est bien chargée

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
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const points = generateCirclePoints(
        numPoints,
        canvas.width,
        canvas.height
      );

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
          context.lineWidth = lineWidth;
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
    console.log("Image source set:", image.src); // Vérifier si l'image source est bien définie

    // Cleanup function
    return () => {
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, [imageSrc, canvasRef, onFilterComplete, numPoints, numLines, lineWidth]);

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

    console.log("Generated points:", points); // Vérifier les points générés
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
      if (pixelIndex < data.length) {
        const brightness =
          (data[pixelIndex] + data[pixelIndex + 1] + data[pixelIndex + 2]) / 3;
        score += 255 - brightness; // Plus la zone est sombre, plus le score est élevé
      }
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

export default StringArtFilterExtended;
