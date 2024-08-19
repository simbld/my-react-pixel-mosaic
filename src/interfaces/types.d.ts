// redux persist store
export interface RootStateProps {
  imageProcessing: ImageProcessingStateProps;
  rangeSliderState: RangeSliderStateProps;
}

export interface ImageProcessingStateProps {
  url: string | null;
  filters: {
    ascii: boolean;
    stippling: boolean;
    rope: boolean;
    sign: boolean;
    string: boolean;
  };
  error: string | null;
}

export interface GameboyStateProps {
  poweredOn: boolean;
  titlesShown: boolean;
  menuVisible: boolean;
  soundPlaying: boolean;
}

export interface MenuGameboyStateProps {
  selectedOptionIndex: number;
  optionCount: number;
}

export interface RangeSliderStateProps {
  stipplingSimple: SimpleFilterProps;
  stipplingExtended: ExtendedFilterProps;
  stipplingBlock: BlockFilterProps;
  ropeSimple: SimpleFilterProps;
  ropeExtended: ExtendedFilterProps;
  ropeBlock: BlockFilterProps;
  signSimple: SimpleFilterProps;
  signExtended: ExtendedFilterProps;
  signBlock: BlockFilterProps;
  stringSimple: SimpleFilterProps;
  stringExtended: ExtendedFilterProps;
  stringBlock: BlockFilterProps;
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
  density?: string; // Optional as not all filters will use density
}

export interface AsciiFilterProps extends ArtFilterProps {
  density: string;
}

// Stippling Art Filter Props
export interface StipplingArtFilterSimpleProps extends ArtFilterProps {
  numPoints: number;
  pointRadius: number;
  brightnessThreshold: number;
}

export interface StipplingArtFilterExtendedProps extends ArtFilterProps {
  stipplingGridSpacing: number;
  stipplingMaxPointSize: number;
  stipplingBrightnessScaling: number;
  stipplingPointDensityScaling: number;
}

export interface StipplingArtFilterBlockProps extends ArtFilterProps {
  numPoints: number;
  pointRadius: number;
  brightnessThreshold: number;
  lerpFactor: number;
}

// Rope Art Filter Props
export interface RopeArtFilterSimpleProps extends ArtFilterProps {
  lineThickness: number;
  numLines: number;
  minOpacity: number;
  maxOpacity: number;
}

export interface RopeArtFilterExtendedProps extends ArtFilterProps {
  step: number;
  angleSteps: number;
  lineDensity: number;
}

export interface RopeArtFilterBlockProps extends ArtFilterProps {
  step: number;
  minLineDensity: number;
  maxLineDensity: number;
}

// Sign Art Filter Props
export interface SignArtFilterSimpleProps extends ArtFilterProps {
  shape: string;
  step: number;
  lineDensity: number;
}

export interface SignArtFilterExtendedProps extends ArtFilterProps {
  step: number;
  lineDensity: number;
}

export interface SignArtFilterBlockProps extends ArtFilterProps {
  step: number;
  minLineDensity: number;
  maxLineDensity: number;
}

// String Art Filter Props (similar to others)
export interface StringArtFilterSimpleProps
  extends ArtFilterProps,
    SimpleFilterProps {}
export interface StringArtFilterExtendedProps
  extends ArtFilterProps,
    ExtendedFilterProps {}
export interface StringArtFilterBlockProps
  extends ArtFilterProps,
    BlockFilterProps {}

// Common filter props for Simple, Extended, and Block configurations
export interface SimpleFilterProps {
  numPoints: number;
  pointRadius: number;
  brightnessThreshold: number;
  shape?: string; // Added shape here, if applicable
}

export interface ExtendedFilterProps {
  gridSpacing: number;
  maxPointSize: number;
  brightnessScaling: number;
  pointDensityScaling: number;
}

export interface BlockFilterProps {
  numPoints: number;
  pointRadius: number;
  brightnessThreshold: number;
  lerpFactor: number;
  minLineDensity?: number;
  maxLineDensity?: number;
}

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
