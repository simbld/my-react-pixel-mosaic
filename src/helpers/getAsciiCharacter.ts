/**
 *
 * @param brightness
 *
 * @returns The ASCII character corresponding to the given brightness.
 *
 */

import { densityDot } from "../config/config";
import mapValue from "../hooks/useMapValue";

function getAsciiCharacter(brightness: number): string {
  const chars = densityDot.split("");
  const index = mapValue(brightness, 0, 255, 0, chars.length - 1);

  return chars[Math.floor(index)];
}

export default getAsciiCharacter;
