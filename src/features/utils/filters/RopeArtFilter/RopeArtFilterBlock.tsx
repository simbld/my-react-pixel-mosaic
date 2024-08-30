import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootStateProps, RopeArtFilterBlockProps } from "@interfaces/types";
import getPixelMap from "@helpers/getPixelMap";

/**
 * RopeArtFilterBlock est un composant React qui applique un filtre Rope Art en texture de filet à une image.
 * @param {RopeArtFilterBlockProps} props - Les propriétés du composant.
 * @returns {JSX.Element} L'élément JSX du filtre Rope Art en blocs.
 */
const RopeArtFilterBlock: React.FC<RopeArtFilterBlockProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete,
  step: propStep,
  minLineDensity: propMinLineDensity,
  maxLineDensity: propMaxLineDensity
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  // Redux
  const {
    step: reduxStep,
    minLineDensity: reduxMinLineDensity,
    maxLineDensity: reduxMaxLineDensity
  } = useSelector((state: RootStateProps) => state.rangeSliders.ropeBlock);

  // props if exists, otherwise fallback on store Redux
  const step = propStep || reduxStep;
  const minLineDensity = propMinLineDensity || reduxMinLineDensity;
  const maxLineDensity = propMaxLineDensity || reduxMaxLineDensity;

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

        // Get image data and apply Sign Art filter
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const data = imageData.data;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        for (let y = 0; y < canvas.height; y += step) {
          for (let x = 0; x < canvas.width; x += step) {
            const pixelIndex = (x + y * canvas.width) * 4;
            const r = data[pixelIndex];
            const g = data[pixelIndex + 1];
            const b = data[pixelIndex + 2];
            const brightness = (r + g + b) / 3;
            const lineDensity = getPixelMap({
              value: brightness,
              start1: 0,
              stop1: 255,
              start2: minLineDensity,
              stop2: maxLineDensity
            }); // The darker it is, the more lines there are

            // Draw horizontal lines
            for (let i = 0; i < lineDensity; i++) {
              const x1 = x;
              const y1 = y + (i * step) / lineDensity;
              const x2 = x + step;
              const y2 = y + (i * step) / lineDensity;

              context.strokeStyle = `rgb(${r},${g},${b})`;
              context.beginPath();
              context.moveTo(x1, y1);
              context.lineTo(x2, y2);
              context.stroke();
            }

            // Draw vertical lines
            for (let i = 0; i < lineDensity; i++) {
              const x1 = x + (i * step) / lineDensity;
              const y1 = y;
              const x2 = x + (i * step) / lineDensity;
              const y2 = y + step;

              context.strokeStyle = `rgb(${r},${g},${b})`;
              context.beginPath();
              context.moveTo(x1, y1);
              context.lineTo(x2, y2);
              context.stroke();
            }
          }
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
    step,
    minLineDensity,
    maxLineDensity
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

export default RopeArtFilterBlock;
