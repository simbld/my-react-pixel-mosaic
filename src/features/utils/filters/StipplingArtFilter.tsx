import { useEffect, useRef } from "react";
import { TARGET_WIDTH, TARGET_HEIGHT } from "../../../config/config";
import { FilterProps } from "../../../interfaces/types";

/**
 * Composant pour appliquer un filtre d'art stippling sur une image.
 * @param {FilterProps} props - Les propriétés du composant.
 * @param {string} props.imageSrc - La source de l'image à filtrer.
 * @param {React.RefObject<HTMLCanvasElement>} props.canvasRef - Référence au canevas où dessiner le filtre.
 * @param {() => void} props.onFilterComplete - Callback appelé lorsque le filtrage est terminé.
 * @returns {JSX.Element} - Composant JSX.
 */
const StipplingArtFilter: React.FC<FilterProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const image = imageRef.current;

    if (canvas && context && image) {
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

        context.clearRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
        context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

        if (onFilterComplete) {
          onFilterComplete();
        }
      };

      image.crossOrigin = "Anonymous";
      image.src = imageSrc;
    }
  }, [imageSrc, canvasRef, onFilterComplete]);

  return (
    <img
      ref={imageRef}
      src={imageSrc}
      style={{ display: "none" }}
      alt="hidden"
    />
  );
};

export default StipplingArtFilter;
