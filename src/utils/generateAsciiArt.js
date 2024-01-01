import { getAsciiCharacter } from "./getAsciiCharacter";
import { getPixelColor } from "./getPixelColor";

export function generateAsciiArt(imageData) {
  let ascii = "";
  for (let j = 0; j < imageData.height; j++) {
    for (let i = 0; i < imageData.width; i++) {
      const pixelIndex = (i + j * imageData.width) * 4;
      const { r, g, b } = getPixelColor(imageData.data, pixelIndex);
      ascii += getAsciiCharacter(r, g, b);
    }
    ascii += "\n";
  }
  return ascii;
}
