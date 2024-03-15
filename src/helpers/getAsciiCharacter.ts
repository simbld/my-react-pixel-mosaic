/**
 *
 * @param brightness
 *
 * @returns The ASCII character corresponding to the given brightness.
 *
 */

import { densityDot } from "../config/config";
import useMapValue from "../hooks/useMapValue";

function getAsciiCharacter(brightness: number): string {
  const chars = densityDot.split("");
  const index = useMapValue(brightness, 0, 255, 0, chars.length - 1);

  return chars[Math.floor(index)];
}

export default getAsciiCharacter;
