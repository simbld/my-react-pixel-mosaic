import { useRef, useEffect } from "react";
import { CanvasComponentProps } from "../interfaces/types";

function CanvasComponent({ image, width, height }: CanvasComponentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");
      if (context) {
        const img = new Image();
        img.onload = function () {
          context.drawImage(img, 0, 0, width, height);
        };
        img.src = image;
      }
    }
  }, [image, width, height]);

  return <canvas ref={canvasRef} />;
}

export default CanvasComponent;
