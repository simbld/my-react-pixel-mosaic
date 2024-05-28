import { useEffect, useRef, useState } from "react";
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
  const [points, setPoints] = useState<[number, number][]>([]);

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

        generateRandomPoints(context, drawWidth, drawHeight, offsetX, offsetY);

        if (onFilterComplete) {
          onFilterComplete();
        }
      };

      image.crossOrigin = "Anonymous";
      image.src = imageSrc;
    }
  }, [imageSrc, canvasRef, onFilterComplete]);

  /**
   * Génère des points aléatoires en évitant les zones lumineuses de l'image.
   * @param {CanvasRenderingContext2D} context - Le contexte du canevas.
   * @param {number} width - La largeur du canevas.
   * @param {number} height - La hauteur du canevas.
   * @param {number} offsetX - L'offset X du dessin de l'image.
   * @param {number} offsetY - L'offset Y du dessin de l'image.
   */
  const generateRandomPoints = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    offsetX: number,
    offsetY: number
  ) => {
    const newPoints: [number, number][] = [];
    const imgData = context.getImageData(offsetX, offsetY, width, height).data;

    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * width + offsetX;
      const y = Math.random() * height + offsetY;
      const pixelIndex = ((y | 0) * width + (x | 0)) * 4;
      const [r, g, b] = [
        imgData[pixelIndex],
        imgData[pixelIndex + 1],
        imgData[pixelIndex + 2]
      ];
      const brightness = (r + g + b) / 3;

      if (Math.random() * 255 > brightness) {
        newPoints.push([x, y]);
      } else {
        i--;
      }
    }

    setPoints(newPoints);
    drawPoints(context, newPoints);
  };

  /**
   * Dessine les points sur le canevas.
   * @param {CanvasRenderingContext2D} context - Le contexte du canevas.
   * @param {[number, number][]} points - Les points à dessiner.
   */
  const drawPoints = (
    context: CanvasRenderingContext2D,
    points: [number, number][]
  ) => {
    context.fillStyle = "black";
    points.forEach(([x, y]) => {
      context.fillRect(x, y, 2, 2);
    });
  };

  return (
    <>
      <img
        ref={imageRef}
        src={imageSrc}
        style={{ display: "none" }}
        alt="hidden"
      />
    </>
  );
};

export default StipplingArtFilter;
