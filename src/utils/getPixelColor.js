/**
 * Extracts the RGB components of a given pixel.
 *
 * @param {Uint8ClampedArray} data - Image data.
 * @param {number} index - Index of the pixel in the image data.
 * @returns {object} The RGB components of the pixel.
 */
export function getPixelColor(data, index) {
  return {
    r: data[index],
    g: data[index + 1],
    b: data[index + 2]
  };
}
