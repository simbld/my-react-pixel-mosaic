import { useEffect, useRef } from "react";
import {
  TARGET_HEIGHT,
  TARGET_WIDTH,
  defaultImage,
  densityDot
} from "../config/config";

const MainLayout: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    image.onload = () => {
      const scaleFactor = 0.1;
      const scaledWidth = image.width * scaleFactor;
      const scaledHeight = image.height * scaleFactor;

      canvas.width = TARGET_WIDTH;
      canvas.height = TARGET_HEIGHT;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < canvas.width; i++) {
        for (let j = 0; j < canvas.height; j++) {
          const pixelIndex = (i + j * canvas.width) * 4;
          const r = data[pixelIndex + 0];
          const g = data[pixelIndex + 1];
          const b = data[pixelIndex + 2];
          const avg = (r + g + b) / 3;

          data[pixelIndex + 0] = avg;
          data[pixelIndex + 1] = avg;
          data[pixelIndex + 2] = avg;
        }
      }

      context.putImageData(imageData, 0, 0);

      for (let i = 0; i < canvas.width; i += 10) {
        for (let j = 0; j < canvas.height; j += 10) {
          const pixelIndex = (i + j * canvas.width) * 4;
          const r = data[pixelIndex + 0];
          const g = data[pixelIndex + 1];
          const b = data[pixelIndex + 2];
          const avg = (r + g + b) / 3;

          const len = densityDot.length;
          const charIndex = Math.floor(map(avg, 0, 255, len, 0));

          context.font = `10px sans-serif`;
          context.fillText(densityDot.charAt(charIndex), i, j);
        }
      }
    };

    image.src = defaultImage;
  }, []);

  const map = (
    value: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number
  ) => {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  };

  return (
    <>
      <canvas ref={canvasRef} width={TARGET_WIDTH} height={TARGET_HEIGHT} />
      <img
        ref={imageRef}
        src={defaultImage}
        style={{ display: "none" }}
        alt="hidden"
      />
    </>
  );
};

export default MainLayout;
