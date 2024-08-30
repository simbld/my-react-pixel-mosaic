import type { StringArtFilterBlockProps } from "@interfaces/types";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootStateProps } from "@interfaces/types";

/**
 * StringArtFilterBlock is a React component that applies a String Art filter in block style to an image.
 * @param {StringArtFilterBlockProps} props - The component properties.
 * @returns {JSX.Element} The JSX element of the String Art filter.
 */
const StringArtFilterBlock: React.FC<StringArtFilterBlockProps> = ({
  imageSrc,
  canvasRef,
  onFilterComplete,
  thickness: propThickness,
  maxLength: propMaxLength,
  step: propStep
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  // Redux
  const {
    thickness: reduxThickness,
    maxLength: reduxMaxLength,
    step: reduxStep
  } = useSelector((state: RootStateProps) => state.rangeSliders.stringBlock);

  // props if exists, otherwise fallback on store Redux
  const thickness = propThickness || reduxThickness;
  const maxLength = propMaxLength || reduxMaxLength;
  const step = propStep || reduxStep;

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

        // Retrieve image data and apply String Art filter
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const data = imageData.data;

        context.clearRect(0, 0, canvas.width, canvas.height);

        for (let y = 0; y < canvas.height; y += step) {
          for (let x = 0; x < canvas.width; x += step) {
            const pixelIndex = (y * canvas.width + x) * 4;
            const brightness =
              (data[pixelIndex] + data[pixelIndex + 1] + data[pixelIndex + 2]) /
              3;

            if (brightness < 128) {
              // Assuming darker areas should have lines
              const angle = Math.random() * 2 * Math.PI;
              const x2 = x + Math.cos(angle) * maxLength;
              const y2 = y + Math.sin(angle) * maxLength;

              context.strokeStyle = "black";
              context.lineWidth = thickness;
              context.beginPath();
              context.moveTo(x, y);
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
  }, [imageSrc, canvasRef, onFilterComplete, thickness, maxLength, step]);

  return (
    <img
      ref={imageRef}
      src={imageSrc}
      style={{ display: "none" }}
      alt="hidden"
    />
  );
};

export default StringArtFilterBlock;
