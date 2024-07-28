import { useEffect, useRef, useState } from "react";
import * as d3 from "d3-delaunay";
import type { StipplingArtFilterProps } from "@interfaces/types";
import { TARGET_WIDTH, TARGET_HEIGHT } from "@config/config";

/**
 * Composant pour appliquer un filtre d'art stippling simple sur une image.
 * @param {StipplingFilterProps} props - Les propriétés du composant.
 * @param {string} props.imageSrc - L'URL de l'image à traiter.
 * @param {React.MutableRefObject<HTMLCanvasElement | null>} props.canvasRef - La référence du canevas.
 * @param {() => void} props.onFilterComplete - La fonction à appeler une fois le filtre appliqué.
 * @returns {JSX.Element} - Composant JSX.
 */
const StipplingArtFilterSimple: React.FC<StipplingArtFilterProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete,
  numPoints,
  pointRadius,
  brightnessThreshold
}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [stipplingNumPoints, setStipplingNumPoints] = useState<number>(
    numPoints || 50
  );
  const [stipplingPointRadius, setStipplingPointRadius] = useState<number>(
    pointRadius || 0.1
  );
  const [stipplingBrightnessThreshold, setStipplingBrightnessThreshold] =
    useState<number>(brightnessThreshold || 0.2);

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

      // Generate points while avoiding bright areas
      for (let i = 0; i < stipplingNumPoints; i++) {
        let x, y, brightness;
        do {
          x = Math.floor(Math.random() * drawWidth);
          y = Math.floor(Math.random() * drawHeight);
          const pixelIndex = (y * drawWidth + x) * 4;
          const r = imageData.data[pixelIndex + 0];
          const g = imageData.data[pixelIndex + 1];
          const b = imageData.data[pixelIndex + 2];
          brightness = (r + g + b) / 3 / 255;
        } while (brightness > stipplingBrightnessThreshold);
        points.push([x + offsetX, y + offsetY]);
      }

      const delaunay = d3.Delaunay.from(points);
      const voronoi = delaunay.voronoi([0, 0, canvas.width, canvas.height]);

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);

      const cells = Array.from(voronoi.cellPolygons());
      const centroids = new Array(cells.length).fill(null).map(() => [0, 0]);
      const weights = new Array(cells.length).fill(0);

      let delaunayIndex = 0;
      for (let i = 0; i < drawWidth; i++) {
        for (let j = 0; j < drawHeight; j++) {
          const pixelIndex = (i + j * drawWidth) * 4;
          const r = imageData.data[pixelIndex + 0];
          const g = imageData.data[pixelIndex + 1];
          const b = imageData.data[pixelIndex + 2];
          const bright = (r + g + b) / 3;
          const weight = 1 - bright / 255;
          delaunayIndex = delaunay.find(i, j, delaunayIndex);
          if (centroids[delaunayIndex]) {
            centroids[delaunayIndex][0] += i * weight;
            centroids[delaunayIndex][1] += j * weight;
            weights[delaunayIndex] += weight;
          }
        }
      }

      for (let i = 0; i < centroids.length; i++) {
        if (weights[i] > 0) {
          centroids[i][0] /= weights[i];
          centroids[i][1] /= weights[i];
        } else {
          centroids[i] = points[i];
        }
      }

      for (let i = 0; i < points.length; i++) {
        if (centroids[i]) {
          points[i][0] = centroids[i][0];
          points[i][1] = centroids[i][1];
        }
      }

      context.fillStyle = "black";
      for (const point of points) {
        context.beginPath();
        context.arc(point[0], point[1], stipplingPointRadius, 0, 2 * Math.PI);
        context.fill();
      }

      onFilterComplete();
    };

    imageRef.current = image;
  }, [
    imageSrc,
    canvasRef,
    onFilterComplete,
    stipplingNumPoints,
    stipplingPointRadius,
    stipplingBrightnessThreshold
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

export default StipplingArtFilterSimple;
