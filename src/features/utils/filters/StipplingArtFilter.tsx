import { useEffect, useRef } from "react";
import { StipplingFilterProps } from "../../../interfaces/types";
import * as d3 from "d3-delaunay";
import { TARGET_WIDTH, TARGET_HEIGHT } from "../../../config/config";

/**
 * Composant pour appliquer un filtre d'art stippling sur une image.
 * @param {StipplingFilterProps} props - Les propriétés du composant.
 * @param {string} props.imageSrc - L'URL de l'image à traiter.
 * @param {React.MutableRefObject<HTMLCanvasElement | null>} props.canvasRef - La référence du canevas.
 * @param {string} props.density - Le type de densité ("simple", "extended", "block").
 * @param {() => void} props.onFilterComplete - La fonction à appeler une fois le filtre appliqué.
 * @returns {JSX.Element} - Composant JSX.
 */
const StipplingArtFilter: React.FC<StipplingFilterProps> = ({
  imageSrc,
  canvasRef,
  density,
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

      const numPoints = 300000; // Adjust the number of points as needed
      const brightnessSize = 0.5; // Adjust the brightness size as needed
      const pointSize = 0.7; // Adjust the point size as needed

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
        } while (Math.random() > brightnessSize - brightness / 255); // Adjust the brightness threshold as needed
        points.push([x + offsetX, y + offsetY]);
      }

      const delaunay = d3.Delaunay.from(points);
      const voronoi = delaunay.voronoi([0, 0, canvas.width, canvas.height]);

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "black";

      for (const point of points) {
        context.beginPath();
        const radius =
          density === "extended" ? Math.random() * pointSize * 2 : pointSize;
        context.arc(point[0], point[1], radius, 0, 2 * Math.PI); // Adjust the radius as needed
        context.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`; // Colorful points for extended
        context.fill();
      }

      onFilterComplete();
    };

    imageRef.current = image;
  }, [imageSrc, canvasRef, onFilterComplete, density]);

  return (
    <img
      ref={imageRef}
      src={imageSrc}
      style={{ display: "none" }}
      alt="hidden"
    />
  );
};

export default StipplingArtFilter;
