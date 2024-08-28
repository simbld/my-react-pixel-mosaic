import type { ApplyEvaluateLineProps } from "@interfaces/types";

/**
 * Évalue une ligne entre deux points pour déterminer son score en fonction de la luminosité des pixels traversés.
 * @param {ApplyEvaluateLineProps} props - Les paramètres nécessaires pour évaluer la ligne.
 * @returns {number} Le score de la ligne en fonction de la luminosité des pixels traversés.
 */
const applyEvaluateLine = ({
  data,
  width,
  lastPoint,
  point
}: ApplyEvaluateLineProps): number => {
  const dx = point.x - lastPoint.x;
  const dy = point.y - lastPoint.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  let total = 0;

  for (let i = 0; i < distance; i++) {
    const t = i / distance;
    const x = Math.floor(lastPoint.x + t * dx);
    const y = Math.floor(lastPoint.y + t * dy);
    const index = (y * width + x) * 4;
    total += data[index] + data[index + 1] + data[index + 2];
  }

  return total / distance;
};

export default applyEvaluateLine;
