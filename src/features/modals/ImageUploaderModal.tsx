import { useState, useRef, useEffect } from "react";
import type {
  BlockFilterProps,
  ExtendedFilterProps,
  ImageUploaderModalProps,
  RootStateProps,
  SimpleFilterProps
} from "src/interfaces/types";
import AsciiArtFilter from "@filters/AsciiArtFilter";
import {
  StipplingArtFilterSimple,
  StipplingArtFilterExtended,
  StipplingArtFilterBlock
} from "@filters/StipplingArtFilter";
import {
  RopeArtFilterSimple,
  RopeArtFilterExtended,
  RopeArtFilterBlock
} from "@filters/RopeArtFilter";
import {
  SignArtFilterSimple,
  SignArtFilterExtended,
  SignArtFilterBlock
} from "@filters/SignArtFilter";
import {
  StringArtFilterSimple,
  StringArtFilterExtended,
  StringArtFilterBlock
} from "@filters/StringArtFilter";
import {
  TARGET_WIDTH,
  TARGET_HEIGHT,
  asciiDensitySimple,
  asciiDensityExtended,
  asciiDensityBlock
} from "@config/config";
import Loader from "../common/Loader";
import getDefaultDensity from "../utils/density/getDefaultDensity";
import RangeSlider from "./RangeSlider";
import {
  updateFilterType,
  updateStipplingType,
  updateRopeType,
  updateSignType,
  updateStringType,
  updateRopeBlock,
  updateRopeExtended,
  updateRopeSimple,
  updateSignBlock,
  updateSignExtended,
  updateSignSimple,
  updateStipplingBlock,
  updateStipplingExtended,
  updateStipplingSimple,
  updateStringBlock,
  updateStringExtended,
  updateStringSimple
} from "@reducers/rangeSliders/rangeSliderSlice";
import {
  toggleAsciiFilter,
  toggleStipplingFilter,
  toggleRopeFilter,
  toggleSignFilter,
  toggleStringFilter,
  resetAllFilters
} from "@reducers/filters/filtersSlice";
import { useSelector } from "react-redux";
import type { AppDispatch } from "@features/reducers/stores/store";
import { useDispatch } from "react-redux";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ImageUploaderModal: React.FC<ImageUploaderModalProps> = ({
  isOpen,
  onClose
}) => {
  // DOM refs
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Local states
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [filteredImageUrl, setFilteredImageUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [density, setDensity] = useState<string | null>(
    getDefaultDensity("ascii")
  );

  // Redux
  const dispatch = useDispatch();
  const filterType = useSelector(
    (state: RootStateProps) => state.rangeSliders.filterType
  );
  const stipplingType = useSelector(
    (state: RootStateProps) => state.rangeSliders.stipplingType
  );
  const ropeType = useSelector(
    (state: RootStateProps) => state.rangeSliders.ropeType
  );
  const signType = useSelector(
    (state: RootStateProps) => state.rangeSliders.signType
  );
  const stringType = useSelector(
    (state: RootStateProps) => state.rangeSliders.stringType
  );

  // Filter actions
  const { ascii, stippling, rope, sign, string } = useSelector(
    (state: RootStateProps) => state.filters
  );

  // Get the filter values ​​in the Redux store (initialized to 0)
  const stipplingSimple = useSelector(
    (state: RootStateProps) => state.rangeSliders.stipplingSimple
  );
  const stipplingExtended = useSelector(
    (state: RootStateProps) => state.rangeSliders.stipplingExtended
  );
  const stipplingBlock = useSelector(
    (state: RootStateProps) => state.rangeSliders.stipplingBlock
  );
  const ropeSimple = useSelector(
    (state: RootStateProps) => state.rangeSliders.ropeSimple
  );
  const ropeExtended = useSelector(
    (state: RootStateProps) => state.rangeSliders.ropeExtended
  );
  const ropeBlock = useSelector(
    (state: RootStateProps) => state.rangeSliders.ropeBlock
  );
  const signSimple = useSelector(
    (state: RootStateProps) => state.rangeSliders.signSimple
  );
  const signExtended = useSelector(
    (state: RootStateProps) => state.rangeSliders.signExtended
  );
  const signBlock = useSelector(
    (state: RootStateProps) => state.rangeSliders.signBlock
  );
  const stringSimple = useSelector(
    (state: RootStateProps) => state.rangeSliders.stringSimple
  );
  const stringExtended = useSelector(
    (state: RootStateProps) => state.rangeSliders.stringExtended
  );
  const stringBlock = useSelector(
    (state: RootStateProps) => state.rangeSliders.stringBlock
  );

  // Filter actions
  const filterActions = {
    stipplingSimple: updateStipplingSimple,
    stipplingExtended: updateStipplingExtended,
    stipplingBlock: updateStipplingBlock,
    ropeSimple: updateRopeSimple,
    ropeExtended: updateRopeExtended,
    ropeBlock: updateRopeBlock,
    signSimple: updateSignSimple,
    signExtended: updateSignExtended,
    signBlock: updateSignBlock,
    stringSimple: updateStringSimple,
    stringExtended: updateStringExtended,
    stringBlock: updateStringBlock
  };

  const getCurrentValues = (filterName: keyof typeof filterActions) => {
    switch (filterName) {
      case "stipplingSimple":
        return stipplingSimple;
      case "stipplingExtended":
        return stipplingExtended;
      case "stipplingBlock":
        return stipplingBlock;
      case "ropeSimple":
        return ropeSimple;
      case "ropeExtended":
        return ropeExtended;
      case "ropeBlock":
        return ropeBlock;
      case "signSimple":
        return signSimple;
      case "signExtended":
        return signExtended;
      case "signBlock":
        return signBlock;
      case "stringSimple":
        return stringSimple;
      case "stringExtended":
        return stringExtended;
      case "stringBlock":
        return stringBlock;
      default:
        return undefined;
    }
  };

  // Toggle filter
  const handleAsciiToggle = () => {
    dispatch(toggleAsciiFilter(!ascii));
  };
  const handleStipplingToggle = () => {
    dispatch(toggleStipplingFilter(!stippling));
  };
  const handleRopeToggle = () => {
    dispatch(toggleRopeFilter(!rope));
  };
  const handleSignToggle = () => {
    dispatch(toggleSignFilter(!sign));
  };
  const handleStringToggle = () => {
    dispatch(toggleStringFilter(!string));
  };

  // Handle filter type change
  const handleFilterTypeChange = (
    type: "ascii" | "stippling" | "rope" | "sign" | "string"
  ) => {
    dispatch(updateFilterType(type));
    setDensity(getDefaultDensity(type));
    setFilteredImageUrl(imagePreviewUrl); // Reapply the filter with the new type
  };

  const handleStipplingTypeChange = (type: "simple" | "extended" | "block") => {
    dispatch(updateStipplingType(type));
    setFilteredImageUrl(imagePreviewUrl); // Reapply the filter with the new type
  };

  const handleRopeTypeChange = (type: "simple" | "extended" | "block") => {
    dispatch(updateRopeType(type));
    setFilteredImageUrl(imagePreviewUrl); // Reapply the filter with the new type
  };

  const handleSignTypeChange = (type: "simple" | "extended" | "block") => {
    dispatch(updateSignType(type));
    setFilteredImageUrl(imagePreviewUrl); // Reapply the filter avec le nouveau type
  };

  const handleStringTypeChange = (type: "simple" | "extended" | "block") => {
    dispatch(updateStringType(type));
    setFilteredImageUrl(imagePreviewUrl); // Reapply the filter avec le nouveau type
  };

  // Handle image change
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setIsLoading(true);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImagePreviewUrl(reader.result as string);
        setFilteredImageUrl(null); // Reset filtered image
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName("");
    }
    event.target.value = "";
  };

  // Handle density change for ascii
  const handleDensityChange = (newDensity: string) => {
    setDensity(density === newDensity ? null : newDensity); // Toggle the density(sub option: simple, extended, block)
    setFilteredImageUrl(imagePreviewUrl); // Reapply the filter with the new density
  };

  // Handle remove all filter
  const handleRemoveFilter = () => {
    setFilteredImageUrl(null);
    setDensity(null);
    const canvas = canvasRef.current;
    if (canvas && imagePreviewUrl) {
      const context = canvas.getContext("2d");
      if (!context) return;
      const image = new Image();
      image.onload = () => {
        const imgWidth = image.width;
        const imgHeight = image.height;
        const aspectRatio = imgWidth / imgHeight;

        let drawWidth = TARGET_WIDTH;
        let drawHeight = TARGET_HEIGHT;

        if (TARGET_WIDTH / TARGET_HEIGHT > aspectRatio) {
          drawWidth = TARGET_HEIGHT * aspectRatio;
        } else {
          drawHeight = TARGET_WIDTH / aspectRatio;
        }

        const offsetX = (TARGET_WIDTH - drawWidth) / 2;
        const offsetY = (TARGET_HEIGHT - drawHeight) / 2;

        context.clearRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
        context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
      };
      image.src = imagePreviewUrl;
    }
  };

  // Handle switch home menu
  const handleModalClose = () => {
    setImagePreviewUrl(null);
    setFilteredImageUrl(null);
    setFileName("");
    setDensity(null);
    onClose();
  };

  // Handle download filtered image
  const handleModalDownload = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const link = document.createElement("a");
      link.download = "filtered-image.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  const handleSliderChange = (
    filterName: keyof typeof filterActions,
    property:
      | keyof SimpleFilterProps
      | keyof ExtendedFilterProps
      | keyof BlockFilterProps,
    value: number
  ) => {
    const currentValues = getCurrentValues(filterName);
    const action = filterActions[filterName];
    const updatedValues = { ...currentValues, [property]: value };

    dispatch(action(updatedValues));
  };

  const handleSliderMouseUp = async () => {
    setIsLoading(true);
    setFilteredImageUrl(null);
    await delay(100);
    setFilteredImageUrl(imagePreviewUrl);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen && labelRef.current) {
      labelRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (canvasRef.current && imagePreviewUrl && !filteredImageUrl) {
      const canvas = canvasRef.current!;
      const context = canvas.getContext("2d")!;
      const image = new Image();
      image.onload = () => {
        const imgWidth = image.width;
        const imgHeight = image.height;
        const aspectRatio = imgWidth / imgHeight;

        let drawWidth = TARGET_WIDTH;
        let drawHeight = TARGET_HEIGHT;

        if (TARGET_WIDTH / TARGET_HEIGHT > aspectRatio) {
          drawWidth = TARGET_HEIGHT * aspectRatio;
        } else {
          drawHeight = TARGET_WIDTH / aspectRatio;
        }

        const offsetX = (TARGET_WIDTH - drawWidth) / 2;
        const offsetY = (TARGET_HEIGHT - drawHeight) / 2;

        canvas.width = TARGET_WIDTH;
        canvas.height = TARGET_HEIGHT;

        context.clearRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
        context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
      };
      image.src = imagePreviewUrl;
    }
  }, [imagePreviewUrl, filteredImageUrl]);

  useEffect(() => {
    if (filteredImageUrl) {
      setIsLoading(false);
    }
  }, [filteredImageUrl]);

  const renderStipplingSliders = () => {
    if (stipplingType === "simple") {
      return (
        <>
          <RangeSlider
            label="Number of Points"
            min={100}
            max={500000}
            step={10}
            value={stipplingSimple.numPoints!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("stipplingSimple", "numPoints", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Point Radius"
            min={0.25}
            max={10}
            step={0.05}
            value={stipplingSimple.pointRadius!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange(
                "stipplingSimple",
                "pointRadius",
                Number(value)
              )
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Brightness Threshold"
            min={0.05}
            max={1}
            step={0.05}
            value={stipplingSimple.brightnessThreshold!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange(
                "stipplingSimple",
                "brightnessThreshold",
                Number(value)
              )
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
        </>
      );
    } else if (stipplingType === "extended") {
      return (
        <>
          <RangeSlider
            label="Grid Spacing"
            min={1}
            max={200}
            step={1}
            value={stipplingExtended.gridSpacing!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange(
                "stipplingExtended",
                "gridSpacing",
                Number(value)
              )
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Max Point Size"
            min={1}
            max={200}
            step={1}
            value={stipplingExtended.maxPointSize!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange(
                "stipplingExtended",
                "maxPointSize",
                Number(value)
              )
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Brightness Scaling"
            min={1}
            max={200}
            step={1}
            value={stipplingExtended.brightnessScaling!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange(
                "stipplingExtended",
                "brightnessScaling",
                Number(value)
              )
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Point Density Scaling"
            min={1}
            max={200}
            step={1}
            value={stipplingExtended.pointDensityScaling!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange(
                "stipplingExtended",
                "pointDensityScaling",
                Number(value)
              )
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
        </>
      );
    } else if (stipplingType === "block") {
      return (
        <>
          <RangeSlider
            label="Number of Points"
            min={10}
            max={3000}
            step={10}
            value={stipplingBlock.numPoints!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("stipplingBlock", "numPoints", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Point Radius"
            min={1}
            max={10}
            step={0.1}
            value={stipplingBlock.pointRadius!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("stipplingBlock", "pointRadius", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Brightness Threshold"
            min={0.01}
            max={1}
            step={0.01}
            value={stipplingBlock.brightnessThreshold!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange(
                "stipplingBlock",
                "brightnessThreshold",
                Number(value)
              )
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Lerp Factor"
            min={0.01}
            max={1}
            step={0.01}
            value={stipplingBlock.lerpFactor!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("stipplingBlock", "lerpFactor", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
        </>
      );
    }
  };

  const renderRopeSliders = () => {
    if (ropeType === "simple" && ropeSimple) {
      return (
        <>
          <RangeSlider
            label="Line Thickness"
            min={1}
            max={10}
            step={0.5}
            value={ropeSimple.lineThickness!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("ropeSimple", "lineThickness", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Number of Lines"
            min={1}
            max={20}
            step={1}
            value={ropeSimple.numLines!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("ropeSimple", "numLines", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Min Opacity"
            min={0}
            max={1}
            step={0.1}
            value={ropeSimple.minOpacity!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("ropeSimple", "minOpacity", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Max Opacity"
            min={0}
            max={1}
            step={0.1}
            value={ropeSimple.maxOpacity!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("ropeSimple", "maxOpacity", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
        </>
      );
    } else if (ropeType === "extended" && ropeExtended) {
      return (
        <>
          <RangeSlider
            label="Step"
            min={1}
            max={50}
            step={1}
            value={ropeExtended.step!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("ropeExtended", "step", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Angle Steps"
            min={1}
            max={50}
            step={1}
            value={ropeExtended.angleSteps!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("ropeExtended", "angleSteps", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Min Line Density"
            min={0.1}
            max={2}
            step={0.1}
            value={ropeExtended.minLineDensity!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange(
                "ropeExtended",
                "minLineDensity",
                Number(value)
              )
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Max Line Density"
            min={0.1}
            max={2}
            step={0.1}
            value={ropeExtended.maxLineDensity!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange(
                "ropeExtended",
                "maxLineDensity",
                Number(value)
              )
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
        </>
      );
    } else if (ropeType === "block" && ropeBlock) {
      return (
        <>
          <RangeSlider
            label="Step"
            min={1}
            max={50}
            step={1}
            value={ropeExtended.step!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("ropeBlock", "step", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Angle Steps"
            min={1}
            max={50}
            step={1}
            value={ropeExtended.angleSteps!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("ropeBlock", "angleSteps", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Line Density"
            min={0.1}
            max={2}
            step={0.1}
            value={ropeExtended.lineDensity!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("ropeBlock", "lineDensity", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
        </>
      );
    }
  };

  const renderSignSliders = () => {
    if (signType === "simple" && signSimple) {
      return (
        <>
          <RangeSlider
            label="Shape"
            min={1}
            max={5}
            step={1}
            value={Number(signSimple.shape)}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("signSimple", "shape", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Step"
            min={1}
            max={10}
            step={1}
            value={signSimple.step!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("signSimple", "step", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Line Density"
            min={0.1}
            max={2}
            step={0.1}
            value={signSimple.lineDensity!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("signSimple", "lineDensity", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
        </>
      );
    } else if (signType === "extended" && signExtended) {
      return (
        <>
          <RangeSlider
            label="Step"
            min={1}
            max={10}
            step={1}
            value={signExtended.step!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("signExtended", "step", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Line Density"
            min={0.1}
            max={2}
            step={0.1}
            value={signExtended.lineDensity!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("signExtended", "lineDensity", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
        </>
      );
    } else if (signType === "block" && signBlock) {
      return (
        <>
          <RangeSlider
            label="Step"
            min={1}
            max={10}
            step={1}
            value={signBlock.step!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("signBlock", "step", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Min Line Density"
            min={0.1}
            max={2}
            step={0.1}
            value={signBlock.minLineDensity!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("signBlock", "minLineDensity", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Max Line Density"
            min={0.1}
            max={2}
            step={0.1}
            value={signBlock.maxLineDensity!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("signBlock", "maxLineDensity", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
        </>
      );
    }
  };

  const renderStringSliders = () => {
    if (stringType === "simple" && stringSimple) {
      return (
        <>
          <RangeSlider
            label="Line Density"
            min={0.1}
            max={2}
            step={0.1}
            value={stringSimple.lineDensity!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("stringSimple", "lineDensity", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Line Width"
            min={50}
            max={200}
            step={10}
            value={stringSimple.lineWidth!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("stringSimple", "lineWidth", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Number Of Points"
            min={0.1}
            max={2}
            step={0.1}
            value={stringSimple.numPoints!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("stringSimple", "numPoints", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
        </>
      );
    } else if (stringType === "extended" && stringExtended) {
      return (
        <>
          <RangeSlider
            label="Line Density"
            min={0.1}
            max={2}
            step={0.1}
            value={stringExtended.lineDensity!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("stringExtended", "lineDensity", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Step"
            min={1}
            max={50}
            step={1}
            value={stringExtended.step!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("stringExtended", "step", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Tension"
            min={0.1}
            max={1}
            step={0.1}
            value={stringExtended.tension!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("stringExtended", "tension", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Opacity"
            min={0.1}
            max={1}
            step={0.1}
            value={stringExtended.opacity!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("stringExtended", "opacity", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
        </>
      );
    } else if (stringType === "block" && stringBlock) {
      return (
        <>
          <RangeSlider
            label="Thickness"
            min={1}
            max={10}
            step={1}
            value={stringBlock.thickness!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("stringBlock", "thickness", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Max Length"
            min={50}
            max={300}
            step={10}
            value={stringBlock.maxLength!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("stringBlock", "maxLength", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
          <RangeSlider
            label="Step"
            min={0.1}
            max={2}
            step={0.1}
            value={stringBlock.step!}
            className="range-slider"
            onChange={(value) =>
              handleSliderChange("stringBlock", "step", Number(value))
            }
            onMouseUp={handleSliderMouseUp}
            onTouchEnd={handleSliderMouseUp}
          />
        </>
      );
    }
  };

  return isOpen ? (
    <div className="overlay" role="dialog" ref={modalRef} tabIndex={0}>
      {isLoading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      <div className="glass-screen-modal">
        <div className="glass-screen-modal-line">
          <div className="glass-screen-modal-line-l"></div>
          <div className="glass-screen-modal-line-l"></div>
        </div>
        <div className="text-indication-modal">
          <div className="dot-matrix-modal">DOT MATRIX WITH STEREO SOUND</div>
          <div className="battery-text-modal">BATTERY</div>
          <div className="indicator-light-modal"></div>
        </div>
        <div className="glass-screen-matrix-modal">
          <div className="title-modal">{fileName || "Aucune image"}</div>
          <button className="upload-btn inline">Open</button>
          <input
            type="file"
            id="file"
            accept="image/*"
            className="file-input"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <label className="upload-btn local" htmlFor="file" ref={labelRef}>
            new
          </label>
          <div className="whiteboard-container">
            <canvas
              className="whiteboard"
              width={1020}
              height={820}
              ref={canvasRef}
            ></canvas>
          </div>
          <div className="filter-selection-btn">
            <button
              onClick={() => handleFilterTypeChange("ascii")}
              className={`ascii-btn ${filterType === "ascii" ? "active" : ""}`}
            >
              ASCII
            </button>
            <button
              onClick={() => handleFilterTypeChange("stippling")}
              className={`stippling-btn ${
                filterType === "stippling" ? "active" : ""
              }`}
            >
              STIPPLING
            </button>
            <button
              onClick={() => handleFilterTypeChange("rope")}
              className={`rope-btn ${filterType === "rope" ? "active" : ""}`}
            >
              ROPE
            </button>
            <button
              onClick={() => handleFilterTypeChange("sign")}
              className={`sign-btn ${filterType === "sign" ? "active" : ""}`}
            >
              SIGN
            </button>
            <button
              onClick={() => handleFilterTypeChange("string")}
              className={`string-btn ${
                filterType === "string" ? "active" : ""
              }`}
            >
              STRING
            </button>
          </div>
          {filteredImageUrl && filterType === "ascii" && (
            <>
              <AsciiArtFilter
                imageSrc={filteredImageUrl}
                canvasRef={canvasRef}
                density={density || ""}
                onFilterComplete={() => setIsLoading(false)} // Callback pour terminer le chargement
                filterType={"simple"}
              />
              <div className="filter-btns-ascii">
                <button
                  onClick={() => handleDensityChange(asciiDensitySimple)}
                  className={`density-btn ${
                    density === asciiDensitySimple ? "active" : ""
                  }`}
                >
                  SIMPLE
                </button>
                <button
                  onClick={() => handleDensityChange(asciiDensityExtended)}
                  className={`density-btn ${
                    density === asciiDensityExtended ? "active" : ""
                  }`}
                >
                  EXTENDED
                </button>
                <button
                  onClick={() => handleDensityChange(asciiDensityBlock)}
                  className={`density-btn ${
                    density === asciiDensityBlock ? "active" : ""
                  }`}
                >
                  BLOCK
                </button>
              </div>
              <button
                onClick={handleRemoveFilter}
                className="remove-filter-btn"
              >
                NO FILTER
              </button>
            </>
          )}
          {filteredImageUrl && filterType === "stippling" && (
            <>
              <div className="range-slider-ctn">{renderStipplingSliders()}</div>
              {stipplingType === "simple" && stipplingSimple && (
                <StipplingArtFilterSimple
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  numPoints={stipplingSimple.numPoints!}
                  pointRadius={stipplingSimple.pointRadius!}
                  brightnessThreshold={stipplingSimple.brightnessThreshold!}
                  filterType={stipplingType}
                />
              )}
              {stipplingType === "extended" && stipplingExtended && (
                <StipplingArtFilterExtended
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  gridSpacing={stipplingExtended.gridSpacing!}
                  maxPointSize={stipplingExtended.maxPointSize!}
                  brightnessScaling={stipplingExtended.brightnessScaling!}
                  pointDensityScaling={stipplingExtended.pointDensityScaling!}
                  filterType={stipplingType}
                />
              )}
              {stipplingType === "block" && stipplingBlock && (
                <StipplingArtFilterBlock
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  numPoints={stipplingBlock.numPoints!}
                  pointRadius={stipplingBlock.pointRadius!}
                  brightnessThreshold={stipplingBlock.brightnessThreshold!}
                  lerpFactor={stipplingBlock.lerpFactor!}
                  filterType={stipplingType}
                />
              )}
              <div className="filter-options active">
                <button
                  onClick={() => handleStipplingTypeChange("simple")}
                  className={`filter-option ${
                    stipplingType === "simple" ? "active" : ""
                  }`}
                >
                  SIMPLE
                </button>
                <button
                  onClick={() => handleStipplingTypeChange("extended")}
                  className={`filter-option ${
                    stipplingType === "extended" ? "active" : ""
                  }`}
                >
                  EXTENDED
                </button>
                <button
                  onClick={() => handleStipplingTypeChange("block")}
                  className={`filter-option ${
                    stipplingType === "block" ? "active" : ""
                  }`}
                >
                  BLOCK
                </button>
              </div>
              <button
                onClick={handleRemoveFilter}
                className="remove-filter-btn"
              >
                NO FILTER
              </button>
            </>
          )}

          {filteredImageUrl && filterType === "rope" && (
            <>
              <div className="range-slider-ctn">{renderRopeSliders()}</div>
              {ropeType === "simple" && ropeSimple && (
                <RopeArtFilterSimple
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  lineThickness={ropeSimple.lineThickness!}
                  numLines={ropeSimple.numLines!}
                  minOpacity={ropeSimple.minOpacity!}
                  maxOpacity={ropeSimple.maxOpacity!}
                  boostFactor={ropeSimple.boostFactor!}
                  filterType={ropeType}
                />
              )}
              {ropeType === "extended" && ropeExtended && (
                <RopeArtFilterExtended
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  step={ropeExtended.step!}
                  angleSteps={ropeExtended.angleSteps!}
                  minLineDensity={ropeExtended.minLineDensity!}
                  maxLineDensity={ropeExtended.maxLineDensity!}
                  filterType={ropeType}
                />
              )}
              {ropeType === "block" && ropeBlock && (
                <RopeArtFilterBlock
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  step={ropeBlock.step!}
                  minLineDensity={ropeBlock.minLineDensity!}
                  maxLineDensity={ropeBlock.maxLineDensity!}
                  filterType={ropeType}
                />
              )}
              <div className="filter-options active">
                <button
                  onClick={() => handleRopeTypeChange("simple")}
                  className={`filter-option ${
                    ropeType === "simple" ? "active" : ""
                  }`}
                >
                  SIMPLE
                </button>
                <button
                  onClick={() => handleRopeTypeChange("extended")}
                  className={`filter-option ${
                    ropeType === "extended" ? "active" : ""
                  }`}
                >
                  EXTENDED
                </button>
                <button
                  onClick={() => handleRopeTypeChange("block")}
                  className={`filter-option ${
                    ropeType === "block" ? "active" : ""
                  }`}
                >
                  BLOCK
                </button>
              </div>
              <button
                onClick={handleRemoveFilter}
                className="remove-filter-btn"
              >
                NO FILTER
              </button>
            </>
          )}
          {filteredImageUrl && filterType === "sign" && (
            <>
              <div className="range-slider-ctn">{renderSignSliders()}</div>
              {signType === "simple" && signSimple && (
                <SignArtFilterSimple
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  shape={signSimple.shape!}
                  step={signSimple.step!}
                  lineDensity={signSimple.lineDensity!}
                  filterType={signType}
                />
              )}
              {signType === "extended" && signExtended && (
                <SignArtFilterExtended
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  step={signExtended.step!}
                  lineDensity={signExtended.lineDensity!}
                  filterType={signType}
                />
              )}
              {signType === "block" && signBlock && (
                <SignArtFilterBlock
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  step={signBlock.step!}
                  minLineDensity={signBlock.minLineDensity!}
                  maxLineDensity={signBlock.maxLineDensity!}
                  filterType={signType}
                />
              )}
              <div className="filter-options active">
                <button
                  onClick={() => handleSignTypeChange("simple")}
                  className={`filter-option ${
                    signType === "simple" ? "active" : ""
                  }`}
                >
                  SIMPLE
                </button>
                <button
                  onClick={() => handleSignTypeChange("extended")}
                  className={`filter-option ${
                    signType === "extended" ? "active" : ""
                  }`}
                >
                  EXTENDED
                </button>
                <button
                  onClick={() => handleSignTypeChange("block")}
                  className={`filter-option ${
                    signType === "block" ? "active" : ""
                  }`}
                >
                  BLOCK
                </button>
              </div>
              <button
                onClick={handleRemoveFilter}
                className="remove-filter-btn"
              >
                NO FILTER
              </button>
            </>
          )}
          {filteredImageUrl && filterType === "string" && (
            <>
              <div className="range-slider-ctn">{renderStringSliders()}</div>
              {stringType === "simple" && stringSimple && (
                <StringArtFilterSimple
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  lineDensity={stringSimple.lineDensity!}
                  numPoints={stringSimple.numPoints!}
                  lineWidth={stringSimple.lineWidth!}
                  filterType={stringType}
                />
              )}
              {stringType === "extended" && stringExtended && (
                <StringArtFilterExtended
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  lineDensity={stringExtended.lineDensity!}
                  step={stringExtended.step!}
                  tension={stringExtended.tension!}
                  opacity={stringExtended.opacity!}
                  filterType={stringType}
                />
              )}
              {stringType === "block" && stringBlock && (
                <StringArtFilterBlock
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  thickness={stringBlock.thickness!}
                  maxLength={stringBlock.maxLength!}
                  step={stringBlock.step!}
                  filterType={stringType}
                />
              )}
              <div className="filter-options active">
                <button
                  onClick={() => handleStringTypeChange("simple")}
                  className={`filter-option ${
                    stringType === "simple" ? "active" : ""
                  }`}
                >
                  SIMPLE
                </button>
                <button
                  onClick={() => handleStringTypeChange("extended")}
                  className={`filter-option ${
                    stringType === "extended" ? "active" : ""
                  }`}
                >
                  EXTENDED
                </button>
                <button
                  onClick={() => handleStringTypeChange("block")}
                  className={`filter-option ${
                    stringType === "block" ? "active" : ""
                  }`}
                >
                  BLOCK
                </button>
              </div>
              <button
                onClick={handleRemoveFilter}
                className="remove-filter-btn"
              >
                NO FILTER
              </button>
            </>
          )}
          <button onClick={handleModalClose} className="close-btn">
            Home
          </button>
          <button onClick={handleModalDownload} className="download-btn">
            Download
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ImageUploaderModal;
