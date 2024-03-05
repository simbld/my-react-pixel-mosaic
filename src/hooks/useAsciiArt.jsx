/**
 * Generates ASCII art from the provided image data.
 *
 * Goes through image data pixel by pixel, converts each pixel into
 * ASCII character based on its brightness and assembles these characters
 * to a string representing the ASCII art of the full image.
 *
 * @param {ImageData} imageData - Image data extracted from a canvas.
 * @returns {string} A string representing the ASCII art of the image.
 *
 *  @example
 *    function MyComponent({ imageData }) {
 *     const ascii = useAsciiArt(imageData);
 *    return <pre>{ascii}</pre>;
 */

import { useEffect, useState } from "react";
import getPixelColor from "../utils/getPixelColor";

function useAsciiArt(imageData) {
  const [ascii, setAscii] = useState("");

  useEffect(() => {
    let ascii = "";
    for (let j = 0; j < imageData.height; j += 1) {
      for (let i = 0; i < imageData.width; i += 1) {
        const pixelIndex = (i + j * imageData.width) * 4;
        const { r, g, b } = getPixelColor(imageData.data, pixelIndex);
        const brightness = 0.3 * r + 0.59 * g + 0.11 * b; // Calcul simplifié de la luminosité
        const asciiCharacter = getAsciiCharacter(brightness);
        ascii += asciiCharacter;
      }
      ascii += "\n";
    }
    setAscii(ascii);
  }, [imageData]);

  return ascii;
}

export default useAsciiArt;
