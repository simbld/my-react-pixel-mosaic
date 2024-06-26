import React, { useState, useEffect, useRef } from "react";
import AsciiArtFilter from "@filters/AsciiArtFilter";
import RangeSlider from "@features/modals/RangeSlider";
import FilterOptions from "./FilterOptions";
import getDefaultDensity from "../utils/density/GetDefaultDensity";
import { TARGET_WIDTH, TARGET_HEIGHT } from "@config/config";
import type { ImageUploaderModalProps } from "@interfaces/types";
import {
  StipplingArtFilterSimple,
  StipplingArtFilterExtended,
  StipplingArtFilterBlock
} from "@features/utils/filters/StipplingArtFilter";
import Loader from "@common/Loader";

const ImageUploaderModal: React.FC<ImageUploaderModalProps> = ({
  isOpen,
  onClose,
  onUpload
}) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [filteredImageUrl, setFilteredImageUrl] = useState<string | null>(null);
  const [density, setDensity] = useState<string>(getDefaultDensity("ascii"));
  const [filterType, setFilterType] = useState<
    "ascii" | "stippling" | "rope" | "string" | "sign"
  >("ascii");
  const [type, setType] = useState<"simple" | "extended" | "block">("simple");
  const [numPoints, setNumPoints] = useState<number>(50000);
  const [pointRadius, setPointRadius] = useState<number>(0.8);
  const [brightnessThreshold, setBrightnessThreshold] = useState<number>(0.8);
  const [isActive, setIsActive] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
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
      onUpload(file);
    } else {
      setFileName("");
    }
    event.target.value = "";
  };

  const handleDensityChange = (newDensity: string) => {
    setDensity(density === newDensity ? "" : newDensity); // Toggle the density
    setFilteredImageUrl(imagePreviewUrl); // Reapply the filter with the new density
  };

  const clearFilter = () => {
    setFilteredImageUrl(null);
    setDensity("");
    const canvas = canvasRef.current;
    if (canvas && imagePreviewUrl) {
      const context = canvas.getContext("2d", { willReadFrequently: true });
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
    type: "ascii" | "stippling" | "rope" | "string" | "sign"
  ) => {
    setFilterType(type);
    setType("simple");
    setFilteredImageUrl(imagePreviewUrl); // Reapply the filter with the new type
  };

  const handleTypeChange = (newType: "simple" | "extended" | "block") => {
    setType(newType);
    setFilteredImageUrl(imagePreviewUrl); // Reapply the filter with the new type
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
          <div className="whiteboard-ctn">
            <canvas
              className="whiteboard"
              width={1020}
              height={820}
              ref={canvasRef}
            ></canvas>
          </div>
          {imagePreviewUrl && (
            <>
              {filterType === "ascii" && (
                <AsciiArtFilter
                  imageSrc={filteredImageUrl || imagePreviewUrl}
                  canvasRef={canvasRef}
                  density={density || ""}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={type}
                />
              )}
              {filterType === "stippling" && (
                <>
                  {type === "simple" && (
                    <StipplingArtFilterSimple
                      imageSrc={filteredImageUrl || imagePreviewUrl}
                      canvasRef={canvasRef}
                      numPoints={numPoints}
                      pointRadius={pointRadius}
                      brightnessThreshold={brightnessThreshold}
                      onFilterComplete={() => setIsLoading(false)}
                      density={density || ""}
                      filterType={type}
                    />
                  )}
                  {type === "extended" && (
                    <StipplingArtFilterExtended
                      imageSrc={filteredImageUrl || imagePreviewUrl}
                      canvasRef={canvasRef}
                      numPoints={numPoints}
                      pointRadius={pointRadius}
                      brightnessThreshold={brightnessThreshold}
                      onFilterComplete={() => setIsLoading(false)}
                      density={density || ""}
                      filterType={type}
                    />
                  )}
                  {type === "block" && (
                    <StipplingArtFilterBlock
                      imageSrc={filteredImageUrl || imagePreviewUrl}
                      canvasRef={canvasRef}
                      numPoints={numPoints}
                      pointRadius={pointRadius}
                      brightnessThreshold={brightnessThreshold}
                      onFilterComplete={() => setIsLoading(false)}
                      density={density || ""}
                      filterType={type}
                    />
                  )}
                </>
              )}
              {/* Add similar conditional blocks for other filter types */}
              <FilterOptions
                activeFilter={type}
                onFilterChange={handleTypeChange}
                density={density}
                handleDensityChange={handleDensityChange}
              />
              <button onClick={clearFilter} className="remove-filter-btn">
                NO FILTER
              </button>
            </>
          )}
          <div className="filter-selection-btn">
            <button
              onClick={() => handleFilterTypeChange("ascii")}
              className={`ascii-btn ${filterType === "ascii" ? "active" : ""}`}
            >
              ASCII
            </button>
            <button
              onClick={() => handleFilterTypeChange("stippling")}
              className={`stippling-btn ${filterType === "stippling" ? "active" : ""}`}
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
              onClick={() => handleFilterTypeChange("string")}
              className={`string-btn ${filterType === "string" ? "active" : ""}`}
            >
              STRING
            </button>
            <button
              onClick={() => handleFilterTypeChange("sign")}
              className={`sign-btn ${filterType === "sign" ? "active" : ""}`}
            >
              SIGN
            </button>
          </div>
          <button onClick={onClose} className="close-btn">
            CLOSE
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ImageUploaderModal;
