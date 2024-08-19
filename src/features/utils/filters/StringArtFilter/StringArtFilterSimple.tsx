import type { StringArtFilterSimpleProps } from "@interfaces/types";
import { useEffect, useRef, useState } from "react";

/**
 * StringArtFilterSimple is a React component that applies a String Art filter to an image.
 * @param {StringArtFilterProps} props - The component properties.
 * @returns {JSX.Element} The JSX element of the String Art filter.
 */
const StringArtFilterSimple: React.FC<StringArtFilterSimpleProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  // États pour les paramètres configurables
  const [numPoints, setNumPoints] = useState<number>(200); // Number of points around the circle
  const [numLines, setNumLines] = useState<number>(2000); // Number of lines to draw
  const [lineWidth, setLineWidth] = useState<number>(0.5); // Line width

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

        // Draw the resized image on the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

        // Retrieve image data and apply String Art filter
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
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
    }
  }, [imageSrc, canvasRef, onFilterComplete, numPoints, numLines, lineWidth]);

  /**
   * Generates points around a circle.
   * @param {number} numPoints - The number of points to generate.
   * @param {number} width - The width of the canvas.
   * @param {number} height - The height of the canvas.
   * @returns {Array<{x: number, y: number}>} - A points table.
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
   * Evaluates a line based on the pixels crossed.
   * @param {Uint8ClampedArray} data - Image data.
   * @param {number} width - The width of the canvas.
   * @param {{x: number, y: number}} point1 - The starting point of the line.
   * @param {{x: number, y: number}} point2 - The end point of the line.
   * @returns {number} - The line score.
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
      score += 255 - brightness; // The darker the area, the higher the score
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

export default StringArtFilterSimple;
