import { useEffect, useRef, useState } from "react";
import type { StipplingArtFilterBlockProps } from "@interfaces/types";
import RangeSlider from "@features/modals/RangeSlider";

const StipplingArtFilterBlock: React.FC<StipplingArtFilterBlockProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete,
  density,
  numPoints,
  pointRadius,
  brightnessThreshold,
  lerpFactor
}) => {
  const [stipplingNumPoints, setStipplingNumPoints] = useState<number>(
    numPoints || 2000
  );
  const [stipplingPointRadius, setStipplingPointRadius] = useState<number>(
    pointRadius || 2
  );
  const [stipplingBrightnessThreshold, setStipplingBrightnessThreshold] =
    useState<number>(brightnessThreshold || 0.6);
  const [stipplingLerpFactor, setStipplingLerpFactor] = useState<number>(
    lerpFactor || 0.5
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      // Process the image and apply stippling filter
      // Utiliser les états: stipplingNumPoints, stipplingPointRadius, stipplingBrightnessThreshold, stipplingLerpFactor
      onFilterComplete();
    };
  }, [
    imageSrc,
    canvasRef,
    onFilterComplete,
    stipplingNumPoints,
    stipplingPointRadius,
    stipplingBrightnessThreshold,
    stipplingLerpFactor
  ]);

  return (
    <div>
      <RangeSlider
        label="Number of Points"
        min={500}
        max={5000}
        step={100}
        value={stipplingNumPoints}
        className="range-slider"
        onChange={setStipplingNumPoints}
      />
      <RangeSlider
        label="Point Radius"
        min={1}
        max={10}
        step={1}
        value={stipplingPointRadius}
        className="range-slider"
        onChange={setStipplingPointRadius}
      />
      <RangeSlider
        label="Brightness Threshold"
        min={0}
        max={1}
        step={0.1}
        value={stipplingBrightnessThreshold}
        className="range-slider"
        onChange={setStipplingBrightnessThreshold}
      />
      <RangeSlider
        label="Lerp Factor"
        min={0}
        max={1}
        step={0.1}
        value={stipplingLerpFactor}
        className="range-slider"
        onChange={setStipplingLerpFactor}
      />
    </div>
  );
};

export default StipplingArtFilterBlock;
