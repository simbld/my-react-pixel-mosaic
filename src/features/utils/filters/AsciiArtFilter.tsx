import {
  densityDot,
  TARGET_WIDTH,
  TARGET_HEIGHT
} from "../../../config/config";

/**
 * Applique un filtre ASCII Art à une image sur un élément canvas.
 * @param {string} imageSrc - La source de l'image.
 * @param {HTMLCanvasElement} canvas - L'élément canvas où le filtre sera appliqué.
 */
export const AsciiArtFilter = (imageSrc: string, canvas: HTMLCanvasElement) => {
  const context = canvas.getContext("2d", { willReadFrequently: true })!;
  const image = new Image();

  image.onload = () => {
    const aspectRatio = image.width / image.height;
    let newWidth = canvas.width;
    let newHeight = canvas.height;

    // Ajustement des dimensions pour conserver le ratio de l'image
    if (newWidth / newHeight > aspectRatio) {
      newWidth = newHeight * aspectRatio;
    } else {
      newHeight = newWidth / aspectRatio;
    }

    const x = (canvas.width - newWidth) / 2;
    const y = (canvas.height - newHeight) / 2;

    // Nettoyage du canvas avant d'appliquer le filtre
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, x, y, newWidth, newHeight);

    const imageData = context.getImageData(x, y, newWidth, newHeight);
    const data = imageData.data;

    // Nettoyage du canvas avant d'appliquer l'ASCII
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < newWidth; i += 9) {
      for (let j = 0; j < newHeight; j += 9) {
        const pixelIndex = (i + j * newWidth) * 4;
        let r = data[pixelIndex + 0];
        let g = data[pixelIndex + 1];
        let b = data[pixelIndex + 2];

        // Application d'un facteur de luminosité
        const brightness = 0.7;
        r *= brightness;
        g *= brightness;
        b *= brightness;

        r = Math.min(255, Math.max(0, r));
        g = Math.min(255, Math.max(0, g));
        b = Math.min(255, Math.max(0, b));

        const avg = (r + g + b) / 3;
        const len = densityDot.length;
        const charIndex = Math.floor(map(avg, 0, 255, len, 0));

        context.font = `10px sans-serif`;
        context.fillText(densityDot.charAt(charIndex), x + i, y + j);
      }
    }
  };

  image.src = imageSrc;
};

/**
 * Mappe une valeur d'un intervalle à un autre.
 * @param {number} value - La valeur à mapper.
 * @param {number} start1 - Début de l'intervalle d'origine.
 * @param {number} stop1 - Fin de l'intervalle d'origine.
 * @param {number} start2 - Début du nouvel intervalle.
 * @param {number} stop2 - Fin du nouvel intervalle.
 * @returns {number} - La valeur mappée.
 */
const map = (
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number
): number => {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
};
