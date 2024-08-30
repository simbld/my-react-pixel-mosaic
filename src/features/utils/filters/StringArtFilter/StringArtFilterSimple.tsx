import type { StringArtFilterSimpleProps } from "@interfaces/types";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootStateProps } from "@interfaces/types";
import getGenerateCirclePoints from "@features/utils/stringArtUtils/getGenerateCirclePoints";
import applyEvaluateLine from "@features/utils/stringArtUtils/applyEvaluateLine";

/**
 * StringArtFilterSimple is a React component that applies a basic String Art filter to an image.
 * @param {StringArtFilterSimpleProps} props - The component properties.
 * @returns {JSX.Element} The JSX element of the String Art filter.
 */
const StringArtFilterSimple: React.FC<StringArtFilterSimpleProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete,
  lineDensity: propLineDensity,
  numPoints: propNumPoints,
  lineWidth: propLineWidth
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  // Redux
  const {
    lineDensity: reduxLineDensity,
    numPoints: reduxNumPoints,
    lineWidth: reduxLineWidth
  } = useSelector((state: RootStateProps) => state.rangeSliders.stringSimple);

  // props if exists, otherwise fallback on store Redux
  const lineDensity = propLineDensity || reduxLineDensity;
  const numPoints = propNumPoints || reduxNumPoints;
  const lineWidth = propLineWidth || reduxLineWidth;

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

        const points = getGenerateCirclePoints({
          lineDensity: lineDensity * 2,
          width: canvas.width,
          height: canvas.height
        });

        context.clearRect(0, 0, canvas.width, canvas.height);

        let lastPoint = points[0];
        for (let i = 0; i < lineDensity * 20; i++) {
          let bestPoint = null;
          let bestScore = -Infinity;

          for (const point of points) {
            const score = applyEvaluateLine({
              data,
              width: canvas.width,
              lastPoint,
              point
            });
            if (score > bestScore) {
              bestScore = score;
              bestPoint = point;
            }
          }

          if (bestPoint) {
            context.strokeStyle = "black";
            context.lineWidth = lineWidth;
            context.beginPath();
            context.moveTo(lastPoint.x, lastPoint.y);
            context.lineTo(bestPoint.x, bestPoint.y);
            context.stroke();
            lastPoint = bestPoint;
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
    lineDensity,
    numPoints,
    lineWidth
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

export default StringArtFilterSimple;
