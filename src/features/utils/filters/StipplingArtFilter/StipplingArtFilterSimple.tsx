import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import type {
  RootStateProps,
  StipplingArtFilterSimpleProps
} from "@interfaces/types";
import { TARGET_WIDTH, TARGET_HEIGHT } from "@config/config";

// Importez le Web Worker
const stipplingSimpleWorker = new Worker(
  new URL("@workers/stipplingSimpleWorker.ts", import.meta.url),
  {
    type: "module"
  }
);

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

  // Utilisation des props ou fallback sur Redux
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

      // Envoyer les données au Web Worker
      stipplingSimpleWorker.postMessage({
        imageData,
        numPoints,
        pointRadius,
        brightnessThreshold,
        drawWidth,
        drawHeight,
        offsetX,
        offsetY
      });

      stipplingSimpleWorker.onmessage = (e) => {
        const { points } = e.data;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "black";
        for (const point of points) {
          context.beginPath();
          context.arc(point[0], point[1], pointRadius, 0, 2 * Math.PI);
          context.fill();
        }

        if (onFilterComplete) {
          onFilterComplete();
        }
      };
    };
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
