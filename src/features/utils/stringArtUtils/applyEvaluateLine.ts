import type { ApplyEvaluateLineProps } from "@interfaces/types";

/**
 * Évalue une ligne entre deux points pour déterminer son score en fonction de la luminosité des pixels traversés.
 * @param {ApplyEvaluateLineProps} props - Les paramètres nécessaires pour évaluer la ligne.
 * @returns {number} Le score de la ligne en fonction de la luminosité des pixels traversés.
 */
const applyEvaluateLine = ({
  data,
  width,
  point1,
  point2
}: ApplyEvaluateLineProps): number => {
  const dx = Math.abs(point2.x - point1.x);
  const dy = Math.abs(point2.y - point1.y);
  const sx = point1.x < point2.x ? 1 : -1;
  const sy = point1.y < point2.y ? 1 : -1;
  let err = dx - dy;
  let score = 0;

  let x = point1.x;
  let y = point1.y;

  while (true) {
    const pixelIndex = (Math.floor(y) * width + Math.floor(x)) * 4;
    const brightness =
      data[pixelIndex] + data[pixelIndex + 1] + data[pixelIndex + 2];
    score += brightness;

    if (x === point2.x && y === point2.y) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }

  return score;
};

export default applyEvaluateLine;
