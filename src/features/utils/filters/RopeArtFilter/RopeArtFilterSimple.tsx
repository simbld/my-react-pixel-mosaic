import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootStateProps, RopeArtFilterSimpleProps } from "@interfaces/types";
import getPixelMap from "@helpers/getPixelMap";

/**
 * RopeArtFilterSimple est un composant React qui applique un filtre Rope Art simple à une image.
 * @param {RopeArtFilterSimpleProps} props - Les propriétés du composant.
 * @returns {JSX.Element} L'élément JSX du filtre Rope Art simple.
 */
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

  // Redux
  const {
    lineThickness: reduxLineThickness,
    numLines: reduxNumLines,
    minOpacity: reduxMinOpacity,
    maxOpacity: reduxMaxOpacity,
    boostFactor: reduxBoostFactor
  } = useSelector((state: RootStateProps) => state.rangeSliders.ropeSimple);

  // props if exists, otherwise fallback on store Redux
  const lineThickness = propLineThickness || reduxLineThickness;
  const numLines = propNumLines || reduxNumLines;
  const minOpacity = propMinOpacity || reduxMinOpacity;
  const maxOpacity = propMaxOpacity || reduxMaxOpacity;
  const boostFactor = propBoostFactor || reduxBoostFactor;

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

        for (let i = 0; i < numLines; i++) {
          // Générer des points de départ et d'arrivée aléatoires pour les lignes
          const x1 = Math.random() * canvas.width;
          const y1 = Math.random() * canvas.height;
          const x2 = Math.random() * canvas.width;
          const y2 = Math.random() * canvas.height;

          // Calculer la couleur moyenne de la ligne en fonction des pixels traversés
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

          // Calculer la luminosité et ajuster l'opacité en fonction
          const brightness = (avgR + avgG + avgB) / 3;
          const opacity = getPixelMap({
            value: brightness,
            start1: 0,
            stop1: 255,
            start2: minOpacity,
            stop2: maxOpacity
          });

          // Appliquer un facteur de boost aux couleurs sombres
          avgR = Math.min(avgR * boostFactor, 255);
          avgG = Math.min(avgG * boostFactor, 255);
          avgB = Math.min(avgB * boostFactor, 255);

          // Dessiner la ligne avec la couleur moyenne et l'opacité ajustée
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
