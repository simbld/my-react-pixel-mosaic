import { useEffect, useRef } from "react";
import useLoading from "../common/useLoading";
import type { FilterProps } from "../../interfaces/types";

const StipplingArtFilter: React.FC<FilterProps> = ({ imageSrc }) => {
  const { startLoading, endLoading, loading, error } = useLoading();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    startLoading();

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      applyStipplingEffect(ctx, img);

      endLoading();
    };
    img.src = imageSrc;
  }, [imageSrc, startLoading, endLoading]);

  function applyStipplingEffect(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement
  ) {
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const brightness =
        0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
      // Apply your logic to apply the effect based on brightness
      // This may involve drawing points on the canvas based on brightness
    }

    ctx.putImageData(imageData, 0, 0);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <canvas ref={canvasRef}></canvas>;
};

export default StipplingArtFilter;
