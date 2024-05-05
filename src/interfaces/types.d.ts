// redux persist store
export interface RootStateProps {
  imageProcessing: ImageProcessingStateProps;
}

export interface ImageProcessingStateProps {
  url: string | null;
  filters: {
    ascii: boolean;
  };
  error: string | null;
}

export interface GameboyState {
  poweredOn: boolean;
  titlesShown: boolean;
  menuVisible: boolean;
  soundPlaying: boolean;
}

export interface MenuGameboyState {
  selectedOptionIndex: number;
  optionCount: number;
}

// helpers
export interface PixelColorProps {
  r: number;
  g: number;
  b: number;
}

export interface ImageURLProps {
  imageUrl: string;
}

// custom hooks
export interface UseImageLoaderReturnProps {
  imageData: ImageData | null;
  loading: boolean;
}

export interface UseLoadAndProcessImageProps {
  processImage: string;
  onImageLoaded: (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => void;
}

export interface UseErrorReturnProps {
  error: Error | null;
  setError: (error: Error | null) => void;
  displayError: () => void;
  clearError: () => void;
}

// utils

export interface AsciiCharacterProps {
  brightness: number;
}

export interface AsciiFilterProps {
  asciiFilter: ImageData;
}

// context providers
export interface ErrorContextTypeProps {
  error: Error | null;
  setError: (error: Error | null) => void;
  displayError: () => void;
  clearError: () => void;
}

// components
export interface ArtCanvasPropsWithFilter extends ArtCanvasProps {
  filter: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
}

export interface TabletProps {
  imageSrc: string;
}

export interface HomeFiltersProps {
  onImageReady: (data: string) => void;
  onApplyAscii: () => void;
}

export interface AppImageDataProps {
  appImageData: string;
}

export interface CanvasComponentProps {
  image: string;
  width: number;
  height: number;
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

// common
export interface ButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  loading?: boolean;
  setError?: (error: Error) => void;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  error?: { message: string };
  fill?: string;
  filter?: string;
  ref?: React.RefObject<HTMLButtonElement>;
}

export interface LoaderProps {
  barCount?: number;
  color?: string;
}

export interface GameboyProps {
  imageSrc: string;
  onGameboyHome: () => void;
}

export interface MenuGameboyProps {
  onUploadImage: () => void;
  onChooseFilter: () => void;
  onDisplaySettings: () => void;
  onDownloadImage: () => void;
  onSelectOption: (index: number) => void;
}

export interface MenuOption {
  name: string;
  action: () => void;
}

export interface MenuGameboyProps {
  menuOptions: MenuOption[];
  onSelectOption: (index: number) => void;
  onUploadImage: () => void;
  onChooseFilter: () => void;
  onDisplaySettings: () => void;
  onDownloadImage: () => void;
}

// features
export interface FilterProps {
  imageSrc: string;
}

// modals
export interface ImageUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}
