import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootStateProps, SignArtFilterExtendedProps } from "@interfaces/types";

const SignArtFilterExtended: React.FC<SignArtFilterExtendedProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete,
  step: propStep,
  lineDensity: propLineDensity
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  // Get values ​​from the Redux store
  const { step: reduxStep, lineDensity: reduxLineDensity } = useSelector(
    (state: RootStateProps) => state.rangeSliderState.signExtended
  );

  // props if exists, otherwise fallback on store Redux
  const step = propStep || reduxStep;
  const lineDensity = propLineDensity || reduxLineDensity;

  // Check if values ​​are set
  if (!step || !lineDensity) {
    console.error("Les valeurs de 'step' ou 'lineDensity' sont manquantes.");
    return null;
  }

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

            for (let i = 0; i < lineDensity; i++) {
              const x1 = x + Math.random() * step;
              const y1 = y + Math.random() * step;
              const x2 = x + Math.random() * step;
              const y2 = y + Math.random() * step;

              context.strokeStyle = `rgb(${r},${g},${b})`;
              context.lineWidth = Math.random() * 3;

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
  }, [imageSrc, canvasRef, onFilterComplete, step, lineDensity]);

  return (
    <img
      ref={imageRef}
      src={imageSrc}
      style={{ display: "none" }}
      alt="hidden"
    />
  );
};

export default SignArtFilterExtended;
