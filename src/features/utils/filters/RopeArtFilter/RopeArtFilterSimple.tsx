import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootStateProps, RopeArtFilterSimpleProps } from "@interfaces/types";
import getPixelMap from "@helpers/getPixelMap";

const RopeArtFilterSimple: React.FC<RopeArtFilterSimpleProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete,
  lineThickness: propLineThickness,
  numLines: propNumLines,
  minOpacity: propMinOpacity,
  maxOpacity: propMaxOpacity,
  boostFactor: propBoostFactor
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const {
    lineThickness: reduxLineThickness,
    numLines: reduxNumLines,
    minOpacity: reduxMinOpacity,
    maxOpacity: reduxMaxOpacity,
    boostFactor: reduxBoostFactor
  } = useSelector((state: RootStateProps) => state.rangeSliders.ropeSimple);

  const lineThickness = propLineThickness ?? reduxLineThickness;
  const numLines = propNumLines ?? reduxNumLines;
  const minOpacity = propMinOpacity ?? reduxMinOpacity;
  const maxOpacity = propMaxOpacity ?? reduxMaxOpacity;
  const boostFactor = propBoostFactor ?? reduxBoostFactor;

  useEffect(() => {
    const canvas = canvasRef?.current;
    const context = canvas?.getContext("2d", { willReadFrequently: true });
    const image = imageRef.current;

    console.log("Canvas:", canvas);

    if (!canvas || !context) {
      console.error("Canvas or context is not available.");
      return;
    }

    if (canvas && context && image) {
      image.onload = () => {
        console.log("Image loaded:", image.src);

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

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const data = imageData.data;

        context.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < numLines; i++) {
          console.log(`Drawing line ${i + 1}/${numLines}`);

          const x1 = Math.random() * canvas.width;
          const y1 = Math.random() * canvas.height;
          const x2 = Math.random() * canvas.width;
          const y2 = Math.random() * canvas.height;

          const numSamples = 10;
          let avgR = 0,
            avgG = 0,
            avgB = 0;
          for (let j = 0; j < numSamples; j++) {
            const t = j / (numSamples - 1);
            const x = Math.round(x1 + t * (x2 - x1));
            const y = Math.round(y1 + t * (y2 - y1));
            const pixelIndex = (y * canvas.width + x) * 4;
            avgR += data[pixelIndex];
            avgG += data[pixelIndex + 1];
            avgB += data[pixelIndex + 2];
          }
          avgR /= numSamples;
          avgG /= numSamples;
          avgB /= numSamples;

          const brightness = (avgR + avgG + avgB) / 3;
          const opacity = getPixelMap({
            value: brightness,
            start1: 0,
            stop1: 255,
            start2: minOpacity,
            stop2: maxOpacity
          });

          avgR = Math.min(avgR * boostFactor, 255);
          avgG = Math.min(avgG * boostFactor, 255);
          avgB = Math.min(avgB * boostFactor, 255);

          context.strokeStyle = `rgba(${avgR},${avgG},${avgB},${opacity})`;
          context.lineWidth = lineThickness;
          context.beginPath();
          context.moveTo(x1, y1);
          context.lineTo(x2, y2);
          context.stroke();
        }

        if (onFilterComplete) {
          onFilterComplete();
        }
      };

      image.crossOrigin = "Anonymous";
      image.src = imageSrc;
    }
  }, [
    imageSrc,
    canvasRef,
    onFilterComplete,
    lineThickness,
    numLines,
    minOpacity,
    maxOpacity,
    boostFactor
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

export default RopeArtFilterSimple;
