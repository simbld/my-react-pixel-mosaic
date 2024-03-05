/**
 * Extracts the RGB components of a given pixel.
 *
 * @param {Uint8ClampedArray} data - Image data.
 * @param {number} index - Index of the pixel in the image data.
 * @returns {object} The RGB components of the pixel.
 * 
 *  @example
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const { r, g, b } = getPixelColor(imageData.data, 0);
 * 
 */
function getPixelColor(data, index) {
  return {
    r: data[index],
    g: data[index + 1],
    b: data[index + 2]
  };
}

export default getPixelColor;
