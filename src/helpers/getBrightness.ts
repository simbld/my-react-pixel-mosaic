import { PixelColorProps } from "../interfaces/prop-types";

const getBrightness = (color: PixelColorProps): number => {
  const { r, g, b } = color;
  return 0.3 * r + 0.59 * g + 0.11 * b;
};

export default getBrightness;
