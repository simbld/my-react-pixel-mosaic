import React, { useState } from "react";
import { TARGET_WIDTH, TARGET_HEIGHT } from "@config/config";
import type { StipplingArtFilterProps } from "@interfaces/types";
import RangeSlider from "@features/modals/RangeSlider";

/**
 * Composant pour appliquer un filtre d'art stippling simple sur une image.
 * @param {StipplingArtFilterProps} props - Les propriétés du composant.
 * @param {string} props.imageSrc - L'URL de l'image à traiter.
 * @param {React.MutableRefObject<HTMLCanvasElement | null>} props.canvasRef - La référence du canevas.
 * @param {() => void} props.onFilterComplete - La fonction à appeler une fois le filtre appliqué.
 * @returns {JSX.Element} - Composant JSX.
 */
const StipplingArtFilterSimple: React.FC<StipplingArtFilterProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete
}) => {
  const [numPoints, setNumPoints] = useState(50000);
  const [pointRadius, setPointRadius] = useState(0.8);
  const [brightnessThreshold, setBrightnessThreshold] = useState(0.8);
  const [activeFilter, setActiveFilter] = useState<
    "simple" | "extended" | "block" | null
  >(null);

  const handleFilterClick = (filter: "simple" | "extended" | "block") => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

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
      const points: [number, number][] = [];

      for (let i = 0; i < numPoints; i++) {
        let x, y, brightness;
        do {
          x = Math.floor(Math.random() * drawWidth);
          y = Math.floor(Math.random() * drawHeight);
          const pixelIndex = (y * drawWidth + x) * 4;
          const r = imageData.data[pixelIndex];
          const g = imageData.data[pixelIndex + 1];
          const b = imageData.data[pixelIndex + 2];
          brightness = (r + g + b) / 3 / 255;
        } while (brightness > brightnessThreshold);

        points.push([x + offsetX, y + offsetY]);
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "black";

      for (const point of points) {
        context.beginPath();
        context.arc(point[0], point[1], pointRadius, 0, 2 * Math.PI);
        context.fill();
      }

      onFilterComplete();
    };
  };

  return (
    <div className="stippling-art-filter-ctn">
      <div className="filter-container">
        <button
          className={`stippling-btn active ${activeFilter ? "active" : ""}`}
          onClick={() => handleFilterClick("simple")}
        >
          Stippling
        </button>
        {activeFilter && (
          <div className="filter-options active">
            <button
              className={`filter-option ${activeFilter === "simple" ? "active" : ""}`}
              onClick={() => handleFilterClick("simple")}
            >
              Simple
            </button>
            <button
              className={`filter-option ${activeFilter === "extended" ? "active" : ""}`}
              onClick={() => handleFilterClick("extended")}
            >
              Extended
            </button>
            <button
              className={`filter-option ${activeFilter === "block" ? "active" : ""}`}
              onClick={() => handleFilterClick("block")}
            >
              Block
            </button>
          </div>
        )}
      </div>
      {activeFilter && (
        <div className="filter-settings active">
          <RangeSlider
            className="glow"
            label="Number of Points"
            min={1000}
            max={100000}
            step={1000}
            value={numPoints}
            onChange={setNumPoints}
          />
          <RangeSlider
            className="glow"
            label="Point Radius"
            min={0.1}
            max={5.0}
            step={0.1}
            value={pointRadius}
            onChange={setPointRadius}
          />
          <RangeSlider
            className="glow"
            label="Brightness Threshold"
            min={0.1}
            max={1.0}
            step={0.01}
            value={brightnessThreshold}
            onChange={setBrightnessThreshold}
          />
        </div>
      )}
      <button
        className={`stippling-btn apply-btn ${activeFilter ? "active" : ""}`}
        onClick={applyFilter}
      >
        Apply Filter
      </button>
    </div>
  );
};

export default StipplingArtFilterSimple;
