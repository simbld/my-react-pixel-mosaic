export interface PixelColorProps {
  r: number;
  g: number;
  b: number;
}

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

export interface AsciiArtCanvasProps {
  asciiArtCanvas: string;
  imageProcessingState: {
    url: string;
    filters: {
      ascii: boolean;
    };
    error: null;
  };
}

export interface TabletProps {
  image: string;
}
