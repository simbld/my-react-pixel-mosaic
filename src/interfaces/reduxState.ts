export interface ImageProcessingState {
  url: string | null;
  filters: {
    ascii: boolean;
  };
  error: string | null;
}

export interface AppImageData {
  appImageData: string;
}

export interface RootState {
  imageProcessing: ImageProcessingState;
}

export interface UseImageLoaderReturn {
  imageLoader: ImageData | null;
  loading: boolean;
}

export interface UseErrorReturn {
  error: Error | null;
  setError: (error: Error | null) => void;
  displayError: () => void;
  clearError: () => void;
}

export interface AsciiArtHookResult {
  asciiArt: string;
  loading: boolean;
  error: string | null;
}

export interface ErrorContextType {
  error: Error | null;
  setError: (error: Error | null) => void;
  displayError: () => void;
  clearError: () => void;
}
