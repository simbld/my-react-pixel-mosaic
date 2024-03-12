export interface ImageProcessingState {
  url: string | null;
  filters: {
    ascii: boolean;
    stippling: boolean;
  };
  error: string | null;
}

export interface ImageData {
  imageSrc: string;
}
