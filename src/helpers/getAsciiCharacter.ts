/**
 *
 * @param brightness
 *
 * @returns The ASCII character corresponding to the given brightness.
 *
 */

import { densityBlock } from "../config/config";
import mapValue from "../features/hooks/useMapValue";
import { AsciiCharacterProps } from "../interfaces/types";

const getAsciiCharacter: (AsciiCharacterProps) => string = (
  brightness: number
): string => {
  const chars = densityBlock.split("");
  const index = mapValue(brightness, 0, 255, 0, chars.length - 1);

  return chars[Math.floor(index)];
};

export default getAsciiCharacter;
