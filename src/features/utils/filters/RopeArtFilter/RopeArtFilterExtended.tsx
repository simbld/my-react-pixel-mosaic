import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootStateProps, RopeArtFilterExtendedProps } from "@interfaces/types";
import getPixelMap from "@helpers/getPixelMap";

/**
 * RopeArtFilterExtended est un composant React qui applique un filtre Rope Art en mode étendu à une image.
 * @param {RopeArtFilterExtendedProps} props - Les propriétés du composant.
 * @returns {JSX.Element} L'élément JSX du filtre Rope Art étendu.
 */
const RopeArtFilterExtended: React.FC<RopeArtFilterExtendedProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete,
  step: propStep,
  angleSteps: propAngleSteps,
  minLineDensity: propMinLineDensity,
  maxLineDensity: propMaxLineDensity
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  // Redux
  const {
    step: reduxStep,
    angleSteps: reduxAngleSteps,
    minLineDensity: reduxMinLineDensity,
    maxLineDensity: reduxMaxLineDensity
  } = useSelector((state: RootStateProps) => state.rangeSliders.ropeExtended);

  // Utiliser les valeurs des props si elles existent, sinon fallback sur celles du store Redux
  const step = propStep || reduxStep;
  const angleSteps = propAngleSteps || reduxAngleSteps;
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

        // Dessiner l'image redimensionnée sur le canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

        // Récupérer les données de l'image et appliquer le filtre Sign Art
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
            });

            for (let angleIndex = 0; angleIndex < angleSteps; angleIndex++) {
              const angle = (Math.PI * 2 * angleIndex) / angleSteps;
              const dx = Math.cos(angle) * step;
              const dy = Math.sin(angle) * step;

              for (let i = 0; i < lineDensity; i++) {
                const x1 = x;
                const y1 = y;
                const x2 = x1 + dx;
                const y2 = y1 + dy;

                context.strokeStyle = `rgb(${r},${g},${b})`;
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
    angleSteps,
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

export default RopeArtFilterExtended;
