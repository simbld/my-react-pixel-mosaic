import { useEffect, useRef, useState } from "react";
import { RopeArtFilterProps } from "@interfaces/types";

/**
 * RopeArtFilterSimple est un composant React qui applique un filtre Rope Art simple à une image.
 * @param {RopeArtFilterProps} props - Les propriétés du composant.
 * @returns {JSX.Element} L'élément JSX du filtre Rope Art simple.
 */
const RopeArtFilterSimple: React.FC<RopeArtFilterProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const [lineThickness, setLineThickness] = useState<number>(1); // Épaisseur des lignes
  const [numLines, setNumLines] = useState<number>(500000); // Nombre de lignes
  const [minOpacity, setMinOpacity] = useState<number>(0.0); // Opacité minimale des lignes
  const [maxOpacity, setMaxOpacity] = useState<number>(1.0); // Opacité maximale des lignes
  const [boostFactor, setBoostFactor] = useState<number>(1.5); // Facteur de boost pour les couleurs sombres

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

        for (let i = 0; i < numLines; i++) {
          // Générer des points de départ et d'arrivée aléatoires pour les lignes
          const x1 = Math.random() * canvas.width;
          const y1 = Math.random() * canvas.height;
          const x2 = Math.random() * canvas.width;
          const y2 = Math.random() * canvas.height;

          // Calculer la couleur moyenne de la ligne en fonction des pixels traversés
          const numSamples = 10;
          let avgR = 0,
            avgG = 0,
            avgB = 0;
          for (let j = 0; j < numSamples; j++) {
            const t = j / (numSamples - 1);
            const x = Math.round(x1 + t * (x2 - x1));
            const y = Math.round(y1 + t * (y2 - y1));
            const pixelIndex = (y * canvas.width + x) * 4;
            avgR += data[pixelIndex];
            avgG += data[pixelIndex + 1];
            avgB += data[pixelIndex + 2];
          }
          avgR /= numSamples;
          avgG /= numSamples;
          avgB /= numSamples;

          // Calculer la luminosité et ajuster l'opacité en fonction
          const brightness = (avgR + avgG + avgB) / 3;
          const opacity = map(brightness, 0, 255, maxOpacity, minOpacity);

          // Appliquer un facteur de boost aux couleurs sombres
          avgR = Math.min(avgR * boostFactor, 255);
          avgG = Math.min(avgG * boostFactor, 255);
          avgB = Math.min(avgB * boostFactor, 255);

          // Dessiner la ligne avec la couleur moyenne et l'opacité ajustée
          context.strokeStyle = `rgba(${avgR},${avgG},${avgB},${opacity})`;
          context.lineWidth = lineThickness;
          context.beginPath();
          context.moveTo(x1, y1);
          context.lineTo(x2, y2);
          context.stroke();
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
    lineThickness,
    numLines,
    minOpacity,
    maxOpacity,
    boostFactor
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

export default RopeArtFilterSimple;
