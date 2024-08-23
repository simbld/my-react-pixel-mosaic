import { useEffect, useRef, useState } from "react";
import { TARGET_WIDTH, TARGET_HEIGHT } from "@config/config";
import type { StipplingArtFilterExtendedProps } from "@interfaces/types";

/**
 * Composant pour appliquer un filtre d'art stippling étendu sur une image.
 * @param {StipplingArtFilterExtendedProps} props - Les propriétés du composant.
 * @returns {JSX.Element} - Composant JSX.
 */
const StipplingArtFilterExtended: React.FC<StipplingArtFilterExtendedProps> = ({
  imageSrc,
  canvasRef,
  gridSpacing,
  maxPointSize,
  brightnessScaling,
  pointDensityScaling,
  onFilterComplete
}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Utilisation des props directement
  const [gridSpacingState, setGridSpacingState] = useState<number>(
    gridSpacing || 10
  );
  const [maxPointSizeState, setMaxPointSizeState] = useState<number>(
    maxPointSize || 15
  );
  const [brightnessScalingState, setBrightnessScalingState] = useState<number>(
    brightnessScaling || 40
  );
  const [pointDensityScalingState, setPointDensityScalingState] =
    useState<number>(pointDensityScaling || 10);

  const applyFilter = () => {
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
      const points: [number, number, number, string][] = [];

      for (let y = 0; y < drawHeight; y += gridSpacingState) {
        for (let x = 0; x < drawWidth; x += gridSpacingState) {
          const pixelIndex = (y * drawWidth + x) * 4;
          const r = imageData.data[pixelIndex];
          const g = imageData.data[pixelIndex + 1];
          const b = imageData.data[pixelIndex + 2];
          const brightness = (r + g + b) / 3;
          const pointSize = 1 + (255 - brightness) / brightnessScalingState;
          const numPoints = Math.floor(
            (255 - brightness) / pointDensityScalingState
          );

          for (let i = 0; i < numPoints; i++) {
            const offsetXPoint = x + Math.random() * gridSpacingState;
            const offsetYPoint = y + Math.random() * gridSpacingState;
            points.push([
              offsetXPoint + offsetX,
              offsetYPoint + offsetY,
              Math.min(pointSize, maxPointSizeState),
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
  };

  useEffect(() => {
    applyFilter();
  }, [
    gridSpacingState,
    maxPointSizeState,
    brightnessScalingState,
    pointDensityScalingState
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
