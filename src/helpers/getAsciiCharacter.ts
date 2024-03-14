import { densityDot } from "../config/config";

function getAsciiCharacter(brightness: number): string {
  const chars = densityDot.split("");
  const index = Math.floor(((brightness - 0) * (chars.length - 1)) / (255 - 0));

  return chars[index];
}

export default getAsciiCharacter;
