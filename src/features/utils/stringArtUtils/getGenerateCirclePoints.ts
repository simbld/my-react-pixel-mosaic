import type { GetGenerateCirclePointsProps } from "@interfaces/types";

/**
 * Generates points arranged in a circle for use in the String Art algorithm.
 * @param {GetGenerateCirclePointsProps} props - The parameters needed to generate the points.
 * @returns {Array<{x: number, y: number}>} An array of objects containing the coordinates of the generated points.
 */
const getGenerateCirclePoints = ({
  lineDensity,
  width,
  height
}: GetGenerateCirclePointsProps): Array<{ x: number; y: number }> => {
  const points: Array<{ x: number; y: number }> = [];
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) * 0.9;

  for (let i = 0; i < lineDensity; i++) {
    const angle = (i / lineDensity) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push({ x, y });
  }

  return points;
};

export default getGenerateCirclePoints;
