import { useEffect, useRef } from "react";
import type { StipplingFilterProps } from "src/interfaces/types";
import * as d3 from "d3-delaunay";
import { TARGET_WIDTH, TARGET_HEIGHT } from "@config/config";

/**
 * Composant pour appliquer un filtre d'art stippling en blocs sur une image.
 * @param {StipplingFilterProps} props - Les propriétés du composant.
 * @param {string} props.imageSrc - L'URL de l'image à traiter.
 * @param {React.MutableRefObject<HTMLCanvasElement | null>} props.canvasRef - La référence du canevas.
 * @param {() => void} props.onFilterComplete - La fonction à appeler une fois le filtre appliqué.
 * @returns {JSX.Element} - Composant JSX.
 */
const StipplingArtFilterBlock: React.FC<StipplingFilterProps> = ({
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

      const numPoints = 5000; // Ajuste ce nombre selon les besoins
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
        } while (Math.random() > 1 - brightness / 255);
        points.push([x + offsetX, y + offsetY]);
      }

      const delaunay = d3.Delaunay.from(points);
      const voronoi = delaunay.voronoi([0, 0, canvas.width, canvas.height]);

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);

      const polygons = Array.from(voronoi.cellPolygons());
      const centroids: [number, number][] = new Array(polygons.length).fill([
        0, 0
      ]);
      const weights: number[] = new Array(polygons.length).fill(0);

      // Calculer les centroïdes et les poids
      for (let i = 0; i < drawWidth; i++) {
        for (let j = 0; j < drawHeight; j++) {
          const pixelIndex = (j * drawWidth + i) * 4;
          const r = imageData.data[pixelIndex];
          const g = imageData.data[pixelIndex + 1];
          const b = imageData.data[pixelIndex + 2];
          const brightness = (r + g + b) / 3;
          const weight = 1 - brightness / 255;
          const delaunayIndex = delaunay.find(i, j);

          centroids[delaunayIndex][0] += i * weight;
          centroids[delaunayIndex][1] += j * weight;
          weights[delaunayIndex] += weight;
        }
      }

      centroids.forEach((centroid, i) => {
        if (weights[i] > 0) {
          centroid[0] /= weights[i];
          centroid[1] /= weights[i];
        } else {
          centroid[0] = points[i][0];
          centroid[1] = points[i][1];
        }
      });

      // Dessiner les blocs
      for (let i = 0; i < polygons.length; i++) {
        const poly = polygons[i];
        const [cx, cy] = centroids[i];
        const pixelIndex = ((cy - offsetY) * drawWidth + (cx - offsetX)) * 4;
        const r = imageData.data[pixelIndex];
        const g = imageData.data[pixelIndex + 1];
        const b = imageData.data[pixelIndex + 2];
        context.fillStyle = `rgb(${r}, ${g}, ${b})`;
        context.strokeStyle = "black";
        context.lineWidth = 0.5;

        context.beginPath();
        poly.forEach(([x, y], i) => {
          if (i === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        });
        context.closePath();
        context.fill();
        context.stroke();
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

export default StipplingArtFilterBlock;
