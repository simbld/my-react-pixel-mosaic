/**
 * Creates and configures a canvas for a given image.
 *
 * @param {HTMLImageElement} image - Image to draw on the canvas.
 * @param {number} width - Canvas width.
 * @param {number} height - Height of the canvas.
 * @returns {object} Drawing context and image data.
 */
export function createCanvas(image, width, height) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  return { ctx, imageData };
}
