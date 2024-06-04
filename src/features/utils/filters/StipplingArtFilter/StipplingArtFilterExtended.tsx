import { useEffect, useRef } from "react";
import * as d3 from "d3-delaunay";
import { TARGET_WIDTH, TARGET_HEIGHT } from "@config/config";
import type { StipplingFilterProps } from "src/interfaces/types";

/**
 * Composant pour appliquer un filtre d'art stippling avancé sur une image.
 * @param {StipplingFilterProps} props - Les propriétés du composant.
 * @param {string} props.imageSrc - L'URL de l'image à traiter.
 * @param {React.MutableRefObject<HTMLCanvasElement | null>} props.canvasRef - La référence du canevas.
 * @param {() => void} props.onFilterComplete - La fonction à appeler une fois le filtre appliqué.
 * @returns {JSX.Element} - Composant JSX.
 */
const StipplingArtFilterExtended: React.FC<StipplingFilterProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete
}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

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
      const points: [number, number][] = [];

      const numPoints = 20000; // Augmenter le nombre de points pour un effet plus dense
      for (let i = 0; i < numPoints; i++) {
        let x, y, brightness;
        do {
          x = Math.floor(Math.random() * drawWidth);
          y = Math.floor(Math.random() * drawHeight);
          const pixelIndex = (y * drawWidth + x) * 4;
          const r = imageData.data[pixelIndex];
          const g = imageData.data[pixelIndex + 1];
          const b = imageData.data[pixelIndex + 2];
          brightness = (r + g + b) / 3;
        } while (Math.random() > 1 - brightness / 255); // Adjust the brightness threshold as needed
        points.push([x + offsetX, y + offsetY]);
      }

      const delaunay = d3.Delaunay.from(points);
      const voronoi = delaunay.voronoi([0, 0, canvas.width, canvas.height]);

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);

      for (const point of points) {
        const [x, y] = point;
        const pixelIndex = ((y - offsetY) * drawWidth + (x - offsetX)) * 4;
        const r = imageData.data[pixelIndex];
        const g = imageData.data[pixelIndex + 1];
        const b = imageData.data[pixelIndex + 2];
        const brightness = (r + g + b) / 3;
        const pointSize = 8 * (1 - brightness / 255); // Accentuer la différence de taille des points
        context.fillStyle = `rgb(${r}, ${g}, ${b})`;
        context.beginPath();
        context.arc(x, y, pointSize, 0, 2 * Math.PI);
        context.fill();
      }

      onFilterComplete();
    };

    imageRef.current = image;
  }, [imageSrc, canvasRef, onFilterComplete]);

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
