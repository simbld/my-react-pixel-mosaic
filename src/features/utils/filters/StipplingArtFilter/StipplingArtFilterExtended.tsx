import { useEffect, useRef } from "react";
import * as d3 from "d3-delaunay";
import { TARGET_WIDTH, TARGET_HEIGHT } from "@config/config";
import type { StipplingArtProps } from "src/interfaces/types";

/**
 * Composant pour appliquer un filtre d'art stippling avancé sur une image.
 * @param {StipplingArtProps} props - Les propriétés du composant.
 * @param {string} props.imageSrc - L'URL de l'image à traiter.
 * @param {React.MutableRefObject<HTMLCanvasElement | null>} props.canvasRef - La référence du canevas.
 * @param {() => void} props.onFilterComplete - La fonction à appeler une fois le filtre appliqué.
 * @returns {JSX.Element} - Composant JSX.
 */
const StipplingArtFilterExtended: React.FC<StipplingArtProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete
}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Variables configurables
  const gridSpacing = 10;
  const maxPointSize = 1;
  const brightnessScaling = 25;
  const pointDensityScaling = 50;

  useEffect(() => {
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

      for (let y = 0; y < drawHeight; y += gridSpacing) {
        for (let x = 0; x < drawWidth; x += gridSpacing) {
          const pixelIndex = (y * drawWidth + x) * 4;
          const r = imageData.data[pixelIndex];
          const g = imageData.data[pixelIndex + 1];
          const b = imageData.data[pixelIndex + 2];
          const brightness = (r + g + b) / 3;
          const pointSize = 1 + (255 - brightness) / brightnessScaling;
          const numPoints = Math.floor(
            (255 - brightness) / pointDensityScaling
          );

          for (let i = 0; i < numPoints; i++) {
            const offsetXPoint = x + Math.random() * gridSpacing;
            const offsetYPoint = y + Math.random() * gridSpacing;
            points.push([
              offsetXPoint + offsetX,
              offsetYPoint + offsetY,
              pointSize,
              `rgb(${r},${g},${b})`
            ]);
          }
        }
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "black";
      context.fillRect(0, 0, canvas.width, canvas.height);

      for (const point of points) {
        context.fillStyle = point[3];
        context.beginPath();
        context.arc(point[0], point[1], point[2], 0, 2 * Math.PI);
        context.fill();
      }

      onFilterComplete();
    };

    imageRef.current = image;
  }, [
    imageSrc,
    canvasRef,
    onFilterComplete,
    gridSpacing,
    maxPointSize,
    brightnessScaling,
    pointDensityScaling
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
