// redux persist store
export interface RootStateProps {
  [x: string]: any;
  filters: any;
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
  filterType: "ascii" | "stippling" | "rope" | "sign" | "string";
  stipplingType: "simple" | "extended" | "block";
  ropeType: "simple" | "extended" | "block";
  signType: "simple" | "extended" | "block";
  stringType: "simple" | "extended" | "block";
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

export interface FiltersStateProps {
  ascii: boolean;
  stippling: boolean;
  rope: boolean;
  sign: boolean;
  string: boolean;
}

export interface FilterState {
  filterType: "ascii" | "stippling" | "rope" | "sign" | "string";
}

// Specific state types for each filter configuration
export interface SimpleFilterStateProps {
  stipplingSimple: StipplingArtFilterSimpleProps;
  ropeSimple: RopeArtFilterSimpleProps;
  signSimple: SignArtFilterSimpleProps;
  stringSimple: StringArtFilterSimpleProps;
}

export interface ExtendedFilterStateProps {
  stipplingExtended: StipplingArtFilterExtendedProps;
  ropeExtended: RopeArtFilterExtendedProps;
  signExtended: SignArtFilterExtendedProps;
  stringExtended: StringArtFilterExtendedProps;
}

export interface BlockFilterStateProps {
  stipplingBlock: StipplingArtFilterBlockProps;
  ropeBlock: RopeArtFilterBlockProps;
  signBlock: SignArtFilterBlockProps;
  stringBlock: StringArtFilterBlockProps;
}

// Global interface
export interface RootStateProps {
  filters: FiltersStateProps;
  imageProcessing: ImageProcessingStateProps;
  gameboyState: GameboyStateProps;
  menuGameboyState: MenuGameboyStateProps;
  rangeSliderState: RangeSliderStateProps; // Pour gérer les états des sliders
  simpleFilterState: SimpleFilterStateProps; // Pour les filtres de type simple
  extendedFilterState: ExtendedFilterStateProps; // Pour les filtres de type extended
  blockFilterState: BlockFilterStateProps; // Pour les filtres de type block
}

// helpers
export interface PixelColorProps {
  r: number;
  g: number;
  b: number;
}

export interface GetPixelMapProps {
  value: number;
  start1: number;
  stop1: number;
  start2: number;
  stop2: number;
}

export interface ImageURLProps {
  imageUrl: string;
}

// utils
export interface GetGenerateCirclePointsProps {
  lineDensity: number;
  width: number;
  height: number;
}

export interface ApplyEvaluateLineProps {
  data: Uint8ClampedArray;
  width: number;
  lastPoint: { x: number; y: number };
  point: { x: number; y: number };
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

// Rope Art Filter Props
export interface RopeArtFilterSimpleProps extends ArtFilterProps {
  lineThickness: number;
  numLines: number;
  minOpacity: number;
  maxOpacity: number;
  boostFactor: number;
}

export interface RopeArtFilterExtendedProps extends ArtFilterProps {
  step: number;
  angleSteps: number;
  minLineDensity: number;
  maxLineDensity: number;
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
  step?: number;
  minLineDensity?: number;
  maxLineDensity?: number;
}

// String Art Filter Props
export interface StringArtFilterSimpleProps extends ArtFilterProps {
  lineDensity: number;
  numPoints: number;
  lineWidth: number;
}
export interface StringArtFilterExtendedProps extends ArtFilterProps {
  lineDensity: number;
  step: number;
  tension: number;
  opacity: number;
}
export interface StringArtFilterBlockProps extends ArtFilterProps {
  thickness: number;
  maxLength: number;
  step: number;
}

// Common filter props for Simple, Extended, and Block configurations
export interface SimpleFilterProps {
  numPoints?: number;
  numLines?: number;
  lineThickness?: number;
  lineWidth?: number;
  lineDensity?: number;
  angleSteps?: number;
  boostFactor?: number;
  step?: number;
  pointRadius?: number;
  brightnessThreshold?: number;
  shape?: string;
  minOpacity?: number;
  minLineDensity?: number;
  maxOpacity?: number;
  maxLineDensity?: number;
  length?: number;
  tension?: number;
}

export interface ExtendedFilterProps {
  gridSpacing?: number;
  maxPointSize?: number;
  brightnessScaling?: number;
  pointDensityScaling?: number;
  shape?: string;
  step?: number;
  angleSteps?: number;
  lineDensity?: number;
  minLineDensity?: number;
  maxLineDensity?: number;
  density?: number;
  opacity?: number;
  tension?: number;
}

export interface BlockFilterProps {
  numPoints?: number;
  pointRadius?: number;
  brightnessThreshold?: number;
  lerpFactor?: number;
  step?: number;
  minLineDensity?: number;
  maxLineDensity?: number;
  maxLength?: number;
  density?: number;
  opacity?: number;
  thickness?: number;
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
