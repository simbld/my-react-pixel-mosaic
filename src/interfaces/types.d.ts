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

// context providers
export interface ErrorContextTypeProps {
  error: Error | null;
  setError: (error: Error | null) => void;
  displayError: () => void;
  clearError: () => void;
}

// components
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

export interface ImageComparisonSliderProps {
  leftImage: string;
  rightImage: string;
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

export interface MenuOption {
  name: string;
  action: () => void;
}

export interface MenuGameboyProps {
  menuOptions: MenuOption[];
  onSelectOption: (index: number) => void;
  onOpenModal: () => void;
  onDisplayTips: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
}

export interface DirectionProps {
  direction: "up" | "down" | "left" | "right";
}

export interface PadStyle {
  transform: string;
  transformOrigin: string;
  transition: string;
}

// features/filters
export interface ArtFilterProps {
  imageSrc: string;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  filterType: "simple" | "extended" | "block";
  onFilterComplete: () => void;
  density?: string;
}

export interface AsciiFilterProps extends ArtFilterProps {
  density: string;
}

export interface StipplingArtFilterProps extends ArtFilterProps {
  density: string;
  numPoints: number;
  pointRadius: number;
  brightnessThreshold: number;
}

export interface StipplingArtFilterExtendedProps extends ArtFilterProps {
  density: string;
  gridSpacing: number;
  maxPointSize: number;
  brightnessScaling: number;
  pointDensityScaling: number;
}

export interface StipplingArtFilterBlockProps extends ArtFilterProps {
  numPoints: number;
  pointRadius: number;
  brightnessThreshold: number;
  lerpFactor: number;
}

export interface RopeArtFilterProps extends ArtFilterProps {
  density: string;
}

export interface SignArtFilterProps extends ArtFilterProps {
  shape: string;
}

export interface StringArtFilterProps extends ArtFilterProps {}

// modals
export interface ImageUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export interface ErrorModalProps {
  error: Error;
  onClose: () => void;
}

export interface ImageProcessingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  className?: string;
  onChange: (value: number) => void;
  onMouseUp?: () => void;
  onTouchEnd?: () => void;
}

export interface FilterOptionsProps {
  activeFilter: string;
  onFilterChange: (newFilter: "simple" | "extended" | "block") => void;
  density: string | null;
  handleDensityChange: (newDensity: string) => void;
}

export interface SliderFields {
  stipplingNumPoints: number;
  stipplingPointRadius: number;
  stipplingBrightnessThreshold: number;
  stipplingGridSpacing: number;
  stipplingMaxPointSize: number;
  stipplingBrightnessScaling: number;
  stipplingPointDensityScaling: number;
  stipplingLerpFactor: number;
}
