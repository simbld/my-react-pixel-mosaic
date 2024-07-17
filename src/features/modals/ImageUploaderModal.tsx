import { useState, useRef, useEffect } from "react";
import type { ImageUploaderModalProps } from "src/interfaces/types";
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
  asciiDensityBlock,
  DensitySimple,
  DensityExtended,
  DensityBlock
} from "@config/config";
import Loader from "../common/Loader";
import getDefaultDensity from "../utils/density/GetDefaultDensity";
import RangeSlider from "./RangeSlider";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ImageUploaderModal: React.FC<ImageUploaderModalProps> = ({
  isOpen,
  onClose
}) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [filteredImageUrl, setFilteredImageUrl] = useState<string | null>(null);
  const [density, setDensity] = useState<string | null>(
    getDefaultDensity("ascii")
  );
  const [filterType, setFilterType] = useState<
    "ascii" | "stippling" | "rope" | "sign" | "string"
  >("ascii");
  const [stipplingType, setStipplingType] = useState<
    "simple" | "extended" | "block"
  >("simple");
  const [stipplingNumPoints, setStipplingNumPoints] = useState<number>(2000);
  const [stipplingPointRadius, setStipplingPointRadius] = useState<number>(2);
  const [stipplingBrightnessThreshold, setStipplingBrightnessThreshold] =
    useState<number>(0.6);
  const [stipplingGridSpacing, setStipplingGridSpacing] = useState<number>(10);
  const [stipplingMaxPointSize, setStipplingMaxPointSize] = useState<number>(1);
  const [stipplingBrightnessScaling, setStipplingBrightnessScaling] =
    useState<number>(25);
  const [stipplingPointDensityScaling, setStipplingPointDensityScaling] =
    useState<number>(50);
  const [stipplingLerpFactor, setStipplingLerpFactor] = useState<number>(0.5);

  const [ropeType, setRopeType] = useState<"simple" | "extended" | "block">(
    "simple"
  );
  const [signType, setSignType] = useState<"simple" | "extended" | "block">(
    "simple"
  );
  const [stringType, setStringType] = useState<"simple" | "extended" | "block">(
    "simple"
  );
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleDensityChange = (newDensity: string) => {
    setDensity(density === newDensity ? null : newDensity); // Toggle the density
    setFilteredImageUrl(imagePreviewUrl); // Reapply the filter with the new density
  };

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

  const handleFilterTypeChange = (
    type: "ascii" | "stippling" | "rope" | "sign" | "string"
  ) => {
    setFilterType(type);
    setDensity(getDefaultDensity(type));
    setFilteredImageUrl(imagePreviewUrl); // Reapply the filter with the new type
  };

  const handleStipplingTypeChange = (type: "simple" | "extended" | "block") => {
    setStipplingType(type);
    setDensity(getDefaultDensity("stippling"));
    setFilteredImageUrl(imagePreviewUrl); // Reapply the filter with the new type
  };

  const handleRopeTypeChange = (type: "simple" | "extended" | "block") => {
    setRopeType(type);
    setDensity(getDefaultDensity("rope"));
    setFilteredImageUrl(imagePreviewUrl); // Reapply the filter with the new type
  };

  const handleSignTypeChange = (type: "simple" | "extended" | "block") => {
    setSignType(type);
    setDensity(getDefaultDensity("sign"));
    setFilteredImageUrl(imagePreviewUrl); // Reapply the filter avec le nouveau type
  };

  const handleStringTypeChange = (type: "simple" | "extended" | "block") => {
    setStringType(type);
    setDensity(getDefaultDensity("string"));
    setFilteredImageUrl(imagePreviewUrl); // Reapply the filter avec le nouveau type
  };

  const handleModalClose = () => {
    setImagePreviewUrl(null);
    setFilteredImageUrl(null);
    setFileName("");
    setDensity(null);
    onClose();
  };

  const handleSliderChange = (
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setValue(value);
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
          <button className="upload-btn inline">IN LINE</button>
          <input
            type="file"
            id="file"
            accept="image/*"
            className="file-input"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <label className="upload-btn local" htmlFor="file" ref={labelRef}>
            LOCAL
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
              {stipplingType === "simple" && (
                <StipplingArtFilterSimple
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  density={density || ""}
                  onFilterComplete={() => setIsLoading(false)}
                  numPoints={stipplingNumPoints}
                  pointRadius={stipplingPointRadius}
                  brightnessThreshold={stipplingBrightnessThreshold}
                  filterType={"simple"}
                />
              )}
              {stipplingType === "extended" && (
                <StipplingArtFilterExtended
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  density={density || ""}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"extended"}
                  gridSpacing={stipplingGridSpacing}
                  maxPointSize={stipplingMaxPointSize}
                  brightnessScaling={stipplingBrightnessScaling}
                  pointDensityScaling={stipplingPointDensityScaling}
                />
              )}
              {stipplingType === "block" && (
                <StipplingArtFilterBlock
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  density={density || ""}
                  onFilterComplete={() => setIsLoading(false)}
                  numPoints={stipplingNumPoints}
                  pointRadius={stipplingPointRadius}
                  brightnessThreshold={stipplingBrightnessThreshold}
                  lerpFactor={stipplingLerpFactor}
                  filterType={"block"}
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
              <div className="range-slider-ctn">
                {stipplingType === "simple" && (
                  <>
                    <RangeSlider
                      label="Number of Points"
                      min={500}
                      max={50000}
                      step={500}
                      value={stipplingNumPoints}
                      className="range-slider"
                      onChange={(value) =>
                        handleSliderChange(value, setStipplingNumPoints)
                      }
                      onMouseUp={handleSliderMouseUp}
                      onTouchEnd={handleSliderMouseUp}
                    />
                    <RangeSlider
                      label="Point Radius"
                      min={1}
                      max={10}
                      step={1}
                      value={stipplingPointRadius}
                      className="range-slider"
                      onChange={(value) =>
                        handleSliderChange(value, setStipplingPointRadius)
                      }
                      onMouseUp={handleSliderMouseUp}
                      onTouchEnd={handleSliderMouseUp}
                    />
                    <RangeSlider
                      label="Brightness Threshold"
                      min={0}
                      max={1}
                      step={0.1}
                      value={stipplingBrightnessThreshold}
                      className="range-slider"
                      onChange={(value) =>
                        handleSliderChange(
                          value,
                          setStipplingBrightnessThreshold
                        )
                      }
                      onMouseUp={handleSliderMouseUp}
                      onTouchEnd={handleSliderMouseUp}
                    />
                  </>
                )}
                {stipplingType === "extended" && (
                  <>
                    <RangeSlider
                      label="Grid Spacing"
                      min={1}
                      max={200}
                      step={1}
                      value={stipplingGridSpacing}
                      className="range-slider"
                      onChange={(value) =>
                        handleSliderChange(value, setStipplingGridSpacing)
                      }
                      onMouseUp={handleSliderMouseUp}
                      onTouchEnd={handleSliderMouseUp}
                    />
                    <RangeSlider
                      label="Max Point Size"
                      min={1}
                      max={10}
                      step={1}
                      value={stipplingMaxPointSize}
                      className="range-slider"
                      onChange={(value) =>
                        handleSliderChange(value, setStipplingMaxPointSize)
                      }
                      onMouseUp={handleSliderMouseUp}
                      onTouchEnd={handleSliderMouseUp}
                    />
                    <RangeSlider
                      label="Brightness Scaling"
                      min={1}
                      max={50}
                      step={1}
                      value={stipplingBrightnessScaling}
                      className="range-slider"
                      onChange={(value) =>
                        handleSliderChange(value, setStipplingBrightnessScaling)
                      }
                      onMouseUp={handleSliderMouseUp}
                      onTouchEnd={handleSliderMouseUp}
                    />
                    <RangeSlider
                      label="Point Density Scaling"
                      min={1}
                      max={100}
                      step={1}
                      value={stipplingPointDensityScaling}
                      className="range-slider"
                      onChange={(value) =>
                        handleSliderChange(
                          value,
                          setStipplingPointDensityScaling
                        )
                      }
                      onMouseUp={handleSliderMouseUp}
                      onTouchEnd={handleSliderMouseUp}
                    />
                  </>
                )}
                {stipplingType === "block" && (
                  <>
                    <RangeSlider
                      label="Number of Points"
                      min={500}
                      max={50000}
                      step={500}
                      value={stipplingNumPoints}
                      className="range-slider"
                      onChange={(value) =>
                        handleSliderChange(value, setStipplingNumPoints)
                      }
                      onMouseUp={handleSliderMouseUp}
                      onTouchEnd={handleSliderMouseUp}
                    />
                    <RangeSlider
                      label="Point Radius"
                      min={1}
                      max={10}
                      step={1}
                      value={stipplingPointRadius}
                      className="range-slider"
                      onChange={(value) =>
                        handleSliderChange(value, setStipplingPointRadius)
                      }
                      onMouseUp={handleSliderMouseUp}
                      onTouchEnd={handleSliderMouseUp}
                    />
                    <RangeSlider
                      label="Brightness Threshold"
                      min={0}
                      max={1}
                      step={0.1}
                      value={stipplingBrightnessThreshold}
                      className="range-slider"
                      onChange={(value) =>
                        handleSliderChange(
                          value,
                          setStipplingBrightnessThreshold
                        )
                      }
                      onMouseUp={handleSliderMouseUp}
                      onTouchEnd={handleSliderMouseUp}
                    />
                    <RangeSlider
                      label="Lerp Factor"
                      min={0}
                      max={1}
                      step={0.1}
                      value={stipplingLerpFactor}
                      className="range-slider"
                      onChange={(value) =>
                        handleSliderChange(value, setStipplingLerpFactor)
                      }
                      onMouseUp={handleSliderMouseUp}
                      onTouchEnd={handleSliderMouseUp}
                    />
                  </>
                )}
              </div>
            </>
          )}
          {filteredImageUrl && filterType === "rope" && (
            <>
              {ropeType === "simple" && (
                <RopeArtFilterSimple
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"simple"}
                  density={""}
                />
              )}
              {ropeType === "extended" && (
                <RopeArtFilterExtended
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"extended"}
                  density={""}
                />
              )}
              {ropeType === "block" && (
                <RopeArtFilterBlock
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"block"}
                  density={""}
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
              {signType === "simple" && (
                <SignArtFilterSimple
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"simple"}
                  density={""}
                />
              )}
              {signType === "extended" && (
                <SignArtFilterExtended
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"extended"}
                  density={""}
                />
              )}
              {signType === "block" && (
                <SignArtFilterBlock
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"block"}
                  density={""}
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
              {stringType === "simple" && (
                <StringArtFilterSimple
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"simple"}
                  density={""}
                />
              )}
              {stringType === "extended" && (
                <StringArtFilterExtended
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"extended"}
                  density={""}
                />
              )}
              {stringType === "block" && (
                <StringArtFilterBlock
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"block"}
                  density={""}
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
            CLOSE
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ImageUploaderModal;
