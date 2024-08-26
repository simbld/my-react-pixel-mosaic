import type { GetGenerateCirclePointsProps } from "@interfaces/types";

/**
 * Génère des points disposés en cercle pour une utilisation dans l'algorithme de String Art.
 * @param {number} lineDensity - La densité des lignes.
 * @param {number} width - La largeur de la zone de dessin.
 * @param {number} height - La hauteur de la zone de dessin.
 * @param {GetGenerateCirclePointsProps} props - Les paramètres nécessaires pour générer les points.
 * @returns {Array<{x: number, y: number}>} Un tableau d'objets contenant les coordonnées des points générés.
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
