import mapValue from "./mapValue";
import { density } from "../config";

export function getAsciiCharacter(r, g, b) {
  const avg = (r + g + b) / 3;
  const charIndex = Math.floor(mapValue(avg, 0, 255, density.length, 0));
  return density.charAt(charIndex);
}
