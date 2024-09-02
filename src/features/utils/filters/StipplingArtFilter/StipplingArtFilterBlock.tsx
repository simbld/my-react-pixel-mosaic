import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { TARGET_WIDTH, TARGET_HEIGHT } from "@config/config";
import type {
  RootStateProps,
  StipplingArtFilterBlockProps
} from "@interfaces/types";

/**
 * Composant pour appliquer un filtre d'art stippling en blocs sur une image.
 * @param {StipplingArtFilterBlockProps} props - Les propriétés du composant.
 * @returns {JSX.Element} - Composant JSX.
 */
const stipplingBlockWorker = new Worker(
  new URL("@workers/stipplingBlockWorker.ts", import.meta.url),
  {
    type: "module"
  }
);

const StipplingArtFilterBlock: React.FC<StipplingArtFilterBlockProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete,
  numPoints,
  pointRadius,
  brightnessThreshold,
  lerpFactor
}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const {
    numPoints: reduxNumPoints,
    pointRadius: reduxPointRadius,
    brightnessThreshold: reduxBrightnessThreshold,
    lerpFactor: reduxLerpFactor
  } = useSelector((state: RootStateProps) => state.rangeSliders.stipplingBlock);

  const effectiveNumPoints = numPoints || reduxNumPoints;
  const effectivePointRadius = pointRadius || reduxPointRadius;
  const effectiveBrightnessThreshold =
    brightnessThreshold || reduxBrightnessThreshold;
  const effectiveLerpFactor = lerpFactor || reduxLerpFactor;

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

      stipplingBlockWorker.postMessage({
        imageData,
        numPoints: effectiveNumPoints,
        brightnessThreshold: effectiveBrightnessThreshold,
        drawWidth,
        drawHeight,
        offsetX,
        offsetY,
        lerpFactor: effectiveLerpFactor,
        pointRadius: effectivePointRadius
      });

      stipplingBlockWorker.onmessage = (e) => {
        const { points, cells, centroids } = e.data;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < cells.length; i++) {
          const poly = cells[i];
          const centroid = centroids[i];
          if (centroid) {
            const col = tempContext.getImageData(
              Math.floor(centroid[0] - offsetX),
              Math.floor(centroid[1] - offsetY),
              1,
              1
            ).data;
            context.strokeStyle = `rgb(${col[0]}, ${col[1]}, ${col[2]})`;
            context.fillStyle = `rgb(${col[0]}, ${col[1]}, ${col[2]})`;
            context.beginPath();
            for (let j = 0; j < poly.length; j++) {
              const [x, y] = poly[j];
              context.lineTo(x, y);
            }
            context.closePath();
            context.stroke();
            context.fill();
          }
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
    effectiveNumPoints,
    effectivePointRadius,
    effectiveBrightnessThreshold,
    effectiveLerpFactor
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

export default StipplingArtFilterBlock;
