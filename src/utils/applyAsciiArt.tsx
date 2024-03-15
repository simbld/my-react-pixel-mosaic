import { useEffect, useRef } from "react";
import getAsciiCharacter from "../helpers/getAsciiCharacter";
import getPixelColor from "../helpers/getPixelColor";

const applyAsciiArt = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): void => {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  context.font = "10px monospace";
  context.fillStyle = "black";

  for (let j = 0; j < imageData.height; j += 1) {
    for (let i = 0; i < imageData.width; i += 1) {
      console.log("Inside the loop", i, j);
      const pixelIndex = (i + j * imageData.width) * 4;
      const { r, g, b } = getPixelColor(imageData.data, pixelIndex);
      console.log(r, g, b);
      const brightness = 0.3 * r + 0.59 * g + 0.11 * b;
      const asciiCharacter = getAsciiCharacter(brightness);
      console.log(asciiCharacter);

      context.fillText(asciiCharacter, i * 10, j * 10);
    }
  }
};

export default applyAsciiArt;
