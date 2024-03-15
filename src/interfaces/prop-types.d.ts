export type PixelColorProps = {
  r: number;
  g: number;
  b: number;
};

export interface ImageURLProps {
  imageUrl: string;
}

export interface UseImageLoaderReturnProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  loading: boolean;
}

export interface AsciiFilterProps {
  asciiFilter: ImageData;
}

export interface CanvasComponentProps {
  image: string;
  width: number;
  height: number;
}

export interface UseLoadAndProcessImageProps {
  processImage: string;
  onImageLoaded: (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => void;
}

export interface ArtCanvasProps {
  artCanvas: string;
  imageProcessingState: {
    url: string;
    filters: {
      ascii: boolean;
    };
    error: string | null;
  };
}

export interface ArtCanvasPropsWithFilter extends ArtCanvasProps {
  filter: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
}

export interface TabletProps {
  image: string;
}

export interface HomeFiltersProps {
  onImageReady: (data: string) => void;
  onApplyAscii: () => void;
}
export interface ImageProcessingStateProps {
  url: string | null;
  filters: {
    ascii: boolean;
  };
  error: string | null;
}

export interface AppImageDataProps {
  appImageData: string;
}

export interface RootStateProps {
  imageProcessing: ImageProcessingStateProps;
}

export interface UseImageLoaderReturnProps {
  imageLoader: ImageData | null;
  loading: boolean;
}

export interface UseErrorReturnProps {
  error: Error | null;
  setError: (error: Error | null) => void;
  displayError: () => void;
  clearError: () => void;
}

export interface AsciiArtHookResultProps {
  asciiArt: string;
  loading: boolean;
  error: string | null;
}

export interface ErrorContextTypeProps {
  error: Error | null;
  setError: (error: Error | null) => void;
  displayError: () => void;
  clearError: () => void;
}
