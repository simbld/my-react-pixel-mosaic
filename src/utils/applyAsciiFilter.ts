import getAsciiCharacter from "../helpers/getAsciiCharacter";
import getPixelColor from "../helpers/getPixelColor";

const applyAsciiFilter = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): string => {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  let asciiArt = "";

  for (let j = 0; j < imageData.height; j += 1) {
    for (let i = 0; i < imageData.width; i += 1) {
      const pixelIndex = (i + j * imageData.width) * 4;
      const { r, g, b } = getPixelColor(imageData.data, pixelIndex);
      const brightness = 0.3 * r + 0.59 * g + 0.11 * b;
      const asciiCharacter = getAsciiCharacter(brightness);
      asciiArt += asciiCharacter;
    }
    asciiArt += "\n";
  }

  return asciiArt;
};

export default applyAsciiFilter;
