export interface ImageProcessingState {
  image: string | null; // URL de l'image ou le chemin du fichier chargé
  filters: {
    ascii: boolean;
    stippling: boolean;
    // mes filtres
  };
  error: string | null;
}
