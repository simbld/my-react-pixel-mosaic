import { useEffect, useRef, useState } from "react";
import type { StipplingArtFilterExtendedProps } from "@interfaces/types";
import { TARGET_WIDTH, TARGET_HEIGHT } from "@config/config";
import RangeSlider from "@features/modals/RangeSlider";

const StipplingArtFilterExtended: React.FC<StipplingArtFilterExtendedProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete,
  density
}) => {
  const [stipplingGridSpacing, setStipplingGridSpacing] = useState<number>(10);
  const [stipplingMaxPointSize, setStipplingMaxPointSize] = useState<number>(1);
  const [stipplingBrightnessScaling, setStipplingBrightnessScaling] =
    useState<number>(25);
  const [stipplingPointDensityScaling, setStipplingPointDensityScaling] =
    useState<number>(50);

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
      const points: [number, number, number, string][] = [];

      for (let y = 0; y < drawHeight; y += stipplingGridSpacing) {
        for (let x = 0; x < drawWidth; x += stipplingGridSpacing) {
          const pixelIndex = (y * drawWidth + x) * 4;
          const r = imageData.data[pixelIndex];
          const g = imageData.data[pixelIndex + 1];
          const b = imageData.data[pixelIndex + 2];
          const brightness = (r + g + b) / 3;
          const pointSize = 1 + (255 - brightness) / stipplingBrightnessScaling;
          const numPoints = Math.floor(
            (255 - brightness) / stipplingPointDensityScaling
          );

          for (let i = 0; i < numPoints; i++) {
            const offsetXPoint = x + Math.random() * stipplingGridSpacing;
            const offsetYPoint = y + Math.random() * stipplingGridSpacing;
            points.push([
              offsetXPoint + offsetX,
              offsetYPoint + offsetY,
              pointSize,
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
  }, [
    imageSrc,
    canvasRef,
    onFilterComplete,
    stipplingGridSpacing,
    stipplingMaxPointSize,
    stipplingBrightnessScaling,
    stipplingPointDensityScaling
  ]);

  return (
    <div>
      <img
        ref={imageRef}
        src={imageSrc}
        style={{ display: "none" }}
        alt="hidden"
      />
      <RangeSlider
        label="Grid Spacing"
        min={1}
        max={20}
        step={1}
        value={stipplingGridSpacing}
        className="range-slider"
        onChange={setStipplingGridSpacing}
      />
      <RangeSlider
        label="Max Point Size"
        min={1}
        max={10}
        step={1}
        value={stipplingMaxPointSize}
        className="range-slider"
        onChange={setStipplingMaxPointSize}
      />
      <RangeSlider
        label="Brightness Scaling"
        min={1}
        max={50}
        step={1}
        value={stipplingBrightnessScaling}
        className="range-slider"
        onChange={setStipplingBrightnessScaling}
      />
      <RangeSlider
        label="Point Density Scaling"
        min={1}
        max={100}
        step={1}
        value={stipplingPointDensityScaling}
        className="range-slider"
        onChange={setStipplingPointDensityScaling}
      />
    </div>
  );
};

export default StipplingArtFilterExtended;
