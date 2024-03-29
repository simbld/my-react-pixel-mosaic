/**
 * Calculates the corresponding ASCII character from the RGB color components of a pixel.
 *
 * This function first calculates the average brightness of the pixel from its components
 * red (r), green (g) and blue (b). Then, it uses this luminosity to find a
 * matching character in ASCII density string. Brighter pixels
 * correspond to lighter characters in the density string, and higher pixels
 * dark to darker characters.
 *
 * @param {number} r - The red component of the pixel, between 0 and 255.
 * @param {number} g - The green component of the pixel, between 0 and 255.
 * @param {number} b - The blue component of the pixel, between 0 and 255.
 * @returns {string} The ASCII character corresponding to the brightness of the pixel.
 * 
 *  @example
      function MyComponent({ r, g, b }) {
      const representation = usePixelRepresentation(255, 255, 255);
      return <p>{representation}</p>;
 */

import { useState, useEffect } from "react";
import mapValue from "../hooks/useMapValue";
import { density } from "../config/config";

const usePixelRepresentation = (r: number, g: number, b: number): string => {
  const [representation, setRepresentation] = useState<string>("");

  useEffect(() => {
    const avg: number = (r + g + b) / 3;
    const charIndex: number = Math.floor(
      mapValue(avg, 0, 255, 0, density.length - 1)
    );
    setRepresentation(density.charAt(charIndex));
  }, [r, g, b]);

  return representation;
};

export default usePixelRepresentation;
