import { asciiDensitySimple, DensitySimple } from "@config/config";

export const getDefaultDensity = (filterType: string): string => {
  if (filterType === "ascii") return asciiDensitySimple;
  if (filterType === "stippling") return DensitySimple;
  if (filterType === "sign") return DensitySimple;
  if (filterType === "rope") return DensitySimple;
  if (filterType === "ropeArt") return DensitySimple;
  return asciiDensitySimple;
};

// Path: src/features/utils/density/GetDefaultDensity.ts
