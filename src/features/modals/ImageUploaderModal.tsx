import { useState, useRef, useEffect } from "react";
import type { ImageUploaderModalProps } from "../../interfaces/types";
import AsciiArtFilter from "../utils/filters/AsciiArtFilter";
import StipplingArtFilter from "../utils/filters/StipplingArtFilter";
import {
  TARGET_WIDTH,
  TARGET_HEIGHT,
  densityExtended,
  densitySimple,
  densityBlock
} from "../../config/config";
import Loader from "../common/Loader";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ImageUploaderModal: React.FC<ImageUploaderModalProps> = ({
  isOpen,
  onClose
}) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [filteredImageUrl, setFilteredImageUrl] = useState<string | null>(null);
  const [density, setDensity] = useState<string | null>(densitySimple);
  const [filterType, setFilterType] = useState<string>("ascii");
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

  const handleApplyFilter = () => {
    setIsLoading(true);
    setFilteredImageUrl(imagePreviewUrl);
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

  const handleFilterTypeChange = (type: string) => {
    setFilterType(type);
    setFilteredImageUrl(imagePreviewUrl); // Reapply the filter with the new type
  };

  const handleModalClose = () => {
    setImagePreviewUrl(null);
    setFilteredImageUrl(null);
    setFileName("");
    setDensity(null);
    onClose();
  };

  useEffect(() => {
    if (isOpen && labelRef.current) {
      labelRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (canvasRef.current && imagePreviewUrl && !filteredImageUrl) {
      const canvas = canvasRef.current!;
      const context = canvas.getContext("2d", { willReadFrequently: true })!;
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
          {filteredImageUrl && filterType === "ascii" && (
            <>
              <AsciiArtFilter
                imageSrc={filteredImageUrl}
                canvasRef={canvasRef}
                density={density || densitySimple}
                onFilterComplete={() => setIsLoading(false)} // Callback pour terminer le chargement
              />
              <div className="filter-btns-ascii">
                <button
                  onClick={() => handleDensityChange(densitySimple)}
                  className={`density-btn ${density === densitySimple ? "active" : ""}`}
                >
                  SIMPLE
                </button>
                <button
                  onClick={() => handleDensityChange(densityExtended)}
                  className={`density-btn ${density === densityExtended ? "active" : ""}`}
                >
                  EXTENDED
                </button>
                <button
                  onClick={() => handleDensityChange(densityBlock)}
                  className={`density-btn ${density === densityBlock ? "active" : ""}`}
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
              <StipplingArtFilter
                imageSrc={filteredImageUrl}
                canvasRef={canvasRef}
                density={density as "simple" | "extended" | "block"}
                onFilterComplete={() => setIsLoading(false)} // Callback pour terminer le chargement
              />
              <div className="filter-btns-stippling">
                <button
                  onClick={() => handleDensityChange("simple")}
                  className={`density-btn ${density === "simple" ? "active" : ""}`}
                >
                  SIMPLE
                </button>
                <button
                  onClick={() => handleDensityChange("extended")}
                  className={`density-btn ${density === "extended" ? "active" : ""}`}
                >
                  EXTENDED
                </button>
                <button
                  onClick={() => handleDensityChange("block")}
                  className={`density-btn ${density === "block" ? "active" : ""}`}
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
          </div>
          <button onClick={handleModalClose} className="close-btn">
            CLOSE
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ImageUploaderModal;
