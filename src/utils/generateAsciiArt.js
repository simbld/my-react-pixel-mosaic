/**
 * Generates ASCII art from the provided image data.
 *
 * Goes through image data pixel by pixel, converts each pixel into
 * ASCII character based on its brightness and assembles these characters
 * to a string representing the ASCII art of the full image.
 *
 * @param {ImageData} imageData - Image data extracted from a canvas.
 * @returns {string} A string representing the ASCII art of the image.
 */

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
