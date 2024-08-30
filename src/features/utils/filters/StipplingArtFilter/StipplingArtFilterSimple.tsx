import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3-delaunay";
import type {
  RootStateProps,
  StipplingArtFilterSimpleProps
} from "@interfaces/types";
import { TARGET_WIDTH, TARGET_HEIGHT } from "@config/config";

/**
 * Component for applying a simple stippling art filter on an image.
 * @param {StipplingArtFilterSimpleProps} props - Props of the component.
 * @returns {JSX.Element} - JSX Component.
 */
const StipplingArtFilterSimple: React.FC<StipplingArtFilterSimpleProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete,
  numPoints: propNumPoints,
  pointRadius: propPointRadius,
  brightnessThreshold: propBrightnessThreshold
}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Redux
  const {
    numPoints: reduxNumPoints,
    pointRadius: reduxPointRadius,
    brightnessThreshold: reduxBrightnessThreshold
  } = useSelector(
    (state: RootStateProps) => state.rangeSliders.stipplingSimple
  );

  // props if exists, otherwise fallback on store Redux
  const numPoints = propNumPoints || reduxNumPoints;
  const pointRadius = propPointRadius || reduxPointRadius;
  const brightnessThreshold =
    propBrightnessThreshold || reduxBrightnessThreshold;

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
      for (let i = 0; i < numPoints; i++) {
        let x, y, brightness;
        do {
          x = Math.floor(Math.random() * drawWidth);
          y = Math.floor(Math.random() * drawHeight);
          const pixelIndex = (y * drawWidth + x) * 4;
          const r = imageData.data[pixelIndex + 0];
          const g = imageData.data[pixelIndex + 1];
          const b = imageData.data[pixelIndex + 2];
          brightness = (r + g + b) / 3 / 255;
        } while (brightness > brightnessThreshold);
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
        context.arc(point[0], point[1], pointRadius, 0, 2 * Math.PI);
        context.fill();
      }

      onFilterComplete();
    };

    imageRef.current = image;
  }, [
    imageSrc,
    canvasRef,
    onFilterComplete,
    numPoints,
    pointRadius,
    brightnessThreshold
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
