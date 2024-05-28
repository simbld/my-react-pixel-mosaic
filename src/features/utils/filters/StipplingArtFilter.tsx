import { useEffect, useRef, useState } from "react";
import { StipplingFilterProps } from "../../../interfaces/types";
import * as d3 from "d3-delaunay";

/**
 * Composant pour appliquer un filtre d'art stippling sur une image.
 * @param {StipplingFilterProps} props - Les propriétés du composant.
 * @returns {JSX.Element} - Composant JSX.
 */
const StipplingArtFilter: React.FC<StipplingFilterProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete
}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = imageSrc;

    image.onload = () => {
      // Ajuster la taille du canevas à la taille de l'image
      canvas.width = image.width;
      canvas.height = image.height;

      // Créer un canevas temporaire pour traiter l'image
      const tempCanvas = document.createElement("canvas");
      const tempContext = tempCanvas.getContext("2d");
      if (!tempContext) return;

      tempCanvas.width = image.width;
      tempCanvas.height = image.height;
      tempContext.drawImage(image, 0, 0);

      const imageData = tempContext.getImageData(
        0,
        0,
        image.width,
        image.height
      );
      const points: [number, number][] = [];
      const numPoints = 10000; // Adjust the number of points as needed

      for (let i = 0; i < numPoints; i++) {
        let x, y, brightness;
        do {
          x = Math.floor(Math.random() * image.width);
          y = Math.floor(Math.random() * image.height);
          const pixelIndex = (y * image.width + x) * 4;
          const r = imageData.data[pixelIndex];
          const g = imageData.data[pixelIndex + 1];
          const b = imageData.data[pixelIndex + 2];
          brightness = (r + g + b) / 3;
        } while (brightness > 100); // Adjust the brightness threshold as needed
        points.push([x, y]);
      }

      const delaunay = d3.Delaunay.from(points);
      const voronoi = delaunay.voronoi([0, 0, canvas.width, canvas.height]);

      context.clearRect(0, 0, canvas.width, canvas.height);

      const pointSize = 1; // Adjust the point size as needed

      for (const point of points) {
        context.beginPath();
        context.arc(point[0], point[1], pointSize, 0, 2 * Math.PI); // Adjust the radius as needed
        context.fillStyle = "#000";
        context.fill();
      }

      onFilterComplete();
    };

    imageRef.current = image;
  }, [imageSrc, canvasRef, onFilterComplete]);

  return null;
};

export default StipplingArtFilter;
