import { useEffect, useRef } from "react";
import type { StipplingArtFilterExtendedProps } from "@interfaces/types";
import { TARGET_WIDTH, TARGET_HEIGHT } from "@config/config";

/**
 * Composant pour appliquer un filtre d'art stippling étendu sur une image.
 * @param {StipplingArtFilterExtendedProps} props - Les propriétés du composant.
 * @param {string} props.imageSrc - L'URL de l'image à traiter.
 * @param {React.MutableRefObject<HTMLCanvasElement | null>} props.canvasRef - La référence du canevas.
 * @param {number} props.stipplingGridSpacing - Espacement de la grille.
 * @param {number} props.stipplingMaxPointSize - Taille maximale des points.
 * @param {number} props.stipplingBrightnessScaling - Échelle de la luminosité.
 * @param {number} props.stipplingPointDensityScaling - Échelle de la densité des points.
 * @param {() => void} props.onFilterComplete - La fonction à appeler une fois le filtre appliqué.
 * @returns {JSX.Element} - Composant JSX.
 */
const StipplingArtFilterExtended: React.FC<StipplingArtFilterExtendedProps> = ({
  imageSrc,
  canvasRef,
  stipplingGridSpacing,
  stipplingMaxPointSize,
  stipplingBrightnessScaling,
  stipplingPointDensityScaling,
  onFilterComplete
}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const applyFilter = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !context) return;

    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = imageSrc;

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

      // Créer un canevas temporaire pour traiter l'image
      const tempCanvas = document.createElement("canvas");
      const tempContext = tempCanvas.getContext("2d", {
        willReadFrequently: true
      });
      if (!tempContext) return;

      tempCanvas.width = drawWidth;
      tempCanvas.height = drawHeight;
      tempContext.drawImage(image, 0, 0, drawWidth, drawHeight);

      const imageData = tempContext.getImageData(0, 0, drawWidth, drawHeight);
      const points: [number, number, number, string][] = [];

      // Itérer sur chaque pixel de l'image en fonction du pas de la grille
      for (let y = 0; y < drawHeight; y += stipplingGridSpacing) {
        for (let x = 0; x < drawWidth; x += stipplingGridSpacing) {
          const pixelIndex = (y * drawWidth + x) * 4;
          const r = imageData.data[pixelIndex];
          const g = imageData.data[pixelIndex + 1];
          const b = imageData.data[pixelIndex + 2];
          const brightness = (r + g + b) / 3;
          const pointSize = 1 + (255 - brightness) / stipplingBrightnessScaling;
          const numPoints = Math.floor(
            (255 - brightness) / stipplingPointDensityScaling
          );

          // Ajouter des points aléatoires dans la cellule de la grille
          for (let i = 0; i < numPoints; i++) {
            const offsetXPoint = x + Math.random() * stipplingGridSpacing;
            const offsetYPoint = y + Math.random() * stipplingGridSpacing;
            points.push([
              offsetXPoint + offsetX,
              offsetYPoint + offsetY,
              Math.min(pointSize, stipplingMaxPointSize),
              `rgb(${r},${g},${b})`
            ]);
          }
        }
      }

      // Effacer le canvas et le remplir de noir
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "black";
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Dessiner les points générés sur le canvas
      for (const point of points) {
        context.fillStyle = point[3];
        context.beginPath();
        context.arc(point[0], point[1], point[2], 0, 2 * Math.PI);
        context.fill();
      }

      onFilterComplete();
    };

    imageRef.current = image;
  };

  useEffect(() => {
    console.log("Updated Grid Spacing:", stipplingGridSpacing);
    console.log("Updated Max Point Size:", stipplingMaxPointSize);
    console.log("Updated Brightness Scaling:", stipplingBrightnessScaling);
    console.log("Updated Point Density Scaling:", stipplingPointDensityScaling);
    applyFilter();
  }, [
    stipplingGridSpacing,
    stipplingMaxPointSize,
    stipplingBrightnessScaling,
    stipplingPointDensityScaling
  ]);

  return (
    <img
      ref={imageRef}
      src={imageSrc}
      style={{ display: "none" }}
      alt="hidden"
    />
  );
};

export default StipplingArtFilterExtended;
