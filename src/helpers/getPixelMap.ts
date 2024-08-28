import type { GetPixelMapProps } from "@interfaces/types";

/**
 * Mappe une valeur d'un intervalle à un autre.
 * @param {GetPixelMapProps} props - Les propriétés pour mapper la valeur.
 * @returns {number} - La valeur mappée.
 */
const getPixelMap = ({
  value,
  start1,
  stop1,
  start2,
  stop2
}: GetPixelMapProps): number => {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
};
export default getPixelMap;
