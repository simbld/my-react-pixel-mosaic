// density = `${"\u2591"}${"\u2592"}${"\u2593"}${"\u2588"}`;
// density = "Ñ@#W$9876543210?!abc;:+=-,._ ";
// density = " _.,-=+:;cba!?0123456789$W#@Ñ";
// density = "  .:-i|=+╦%O#@";
// density = " .:░▒▓█";
// density = " .:░▒▓█";
// density = "█▓▒░:. ";
// density = "█▓▓▒▒▒░░░░░::::::.......";

export const defaultImage: string = "/src/assets/default.png";
// ASCII
export const asciiDensitySimple: string = "@%@O#╦o+=|i-:.      ";
export const asciiDensityExtended: string = "@WÑ#$9876543210/?!abc;:+=_-,.   ";
export const asciiDensityBlock: string = "█▓▒░:. ";

// Stippling
export const stipplingDensitySimple: string = "simple";
export const stipplingDensityExtended: string = "extended";
export const stipplingDensityBlock: string = "block";

export const TARGET_WIDTH: number = 1020;
export const TARGET_HEIGHT: number = 820;
export const MAX_IMAGE_SIZE: number = 6000;
export const MAX_CANVAS_SIZE: number = 6000;
export const MAX_IMAGE_SIZE_ERROR: string = `L'image est trop grande. La taille maximale est de ${MAX_IMAGE_SIZE} pixels.`;
export const MAX_CANVAS_SIZE_ERROR: string = `Le canvas est trop grand. La taille maximale est de ${MAX_CANVAS_SIZE} pixels.`;
export const IMAGE_LOAD_ERROR: string = "Erreur lors du chargement de l'image.";
export const IMAGE_RENDER_ERROR: string = "Erreur lors du rendu de l'image.";
export const IMAGE_RENDER_ERROR_DESCRIPTION: string =
  "Veuillez vérifier que l'image est accessible et réessayez.";
export const IMAGE_RENDER_ERROR_DESCRIPTION_2: string =
  "Si le problème persiste, veuillez contacter le support.";

export const FILTERS: string[] = ["ascii", "stippling"];

export const FILTERS_OPTIONS: string[] = ["simple", "extended", "block"];

// Path: src/config/config.ts
