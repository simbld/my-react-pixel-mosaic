/**
 * Extracts the RGB components of a given pixel.
 *
 * @param data - Image data as a Uint8ClampedArray.
 * @param index - Index of the pixel in the image data.
 * @returns The RGB components of the pixel as a PixelColor object.
 */

import { PixelColorProps } from "../interfaces/types";

function getPixelColor(
  data: Uint8ClampedArray,
  index: number
): PixelColorProps {
  return {
    r: data[index],
    g: data[index + 1],
    b: data[index + 2]
  };
}

export default getPixelColor;
