import { asciiDensitySimple, stipplingDensitySimple } from "@config/config";

export const getDefaultDensity = (filterType: string): string => {
  if (filterType === "ascii") return asciiDensitySimple;
  if (filterType === "stippling") return stipplingDensitySimple;
  return asciiDensitySimple;
};

// Path: src/features/utils/density/GetDefaultDensity.ts
