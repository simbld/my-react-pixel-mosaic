import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  RootStateProps,
  type SignArtFilterBlockProps
} from "@interfaces/types";

const SignArtFilterBlock: React.FC<SignArtFilterBlockProps> = ({
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
    maxLineDensity: reduxMaxLineDensity,
    shape: reduxShape
  } = useSelector((state: RootStateProps) => state.rangeSliders.signBlock);

  // props if exists, otherwise fallback on store Redux
  const step = propStep || reduxStep;
  const minLineDensity = propMinLineDensity || reduxMinLineDensity;
  const maxLineDensity = propMaxLineDensity || reduxMaxLineDensity;
  const shape = reduxShape || "defaultShape";

  if (!step || !minLineDensity || !maxLineDensity) {
    console.error(
      "Les valeurs de 'step', 'minLineDensity', ou 'maxLineDensity' sont manquantes."
    );
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

            for (let i = 0; i < maxLineDensity; i++) {
              const x1 = x + Math.random() * step;
              const y1 = y + Math.random() * step;
              const x2 = x + Math.random() * step;
              const y2 = y + Math.random() * step;

              context.strokeStyle = `rgb(${r},${g},${b})`;

              if (shape === "circle") {
                context.beginPath();
                context.arc(x1, y1, step / 2, 0, Math.PI * 2);
                context.stroke();
              } else {
                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.stroke();
              }
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
    maxLineDensity,
    shape
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

export default SignArtFilterBlock;
