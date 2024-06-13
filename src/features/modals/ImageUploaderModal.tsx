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
} from "@features/utils/filters/SignArtFilter";
import {
  StringArtFilterSimple,
  StringArtFilterExtended,
  StringArtFilterBlock
} from "@features/utils/filters/StringArtFilter";
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
import { getDefaultDensity } from "../utils/density/GetDefaultDensity";

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
    "ascii" | "stippling" | "rope" | "string" | "sign"
  >("ascii");

  const [type, setType] = useState<"simple" | "extended" | "block">("simple");
  const [shape, setShape] = useState<string | null>(null);
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
    setDensity(
      getDefaultDensity(
        type as "ascii" | "stippling" | "rope" | "string" | "sign"
      )
    );
    setFilteredImageUrl(imagePreviewUrl); // Reapply the filter with the new type
  };

  const handleStipplingTypeChange = (type: "simple" | "extended" | "block") => {
    setType(type);
    setDensity(getDefaultDensity("stippling"));
    setFilteredImageUrl(imagePreviewUrl); // Reapply the filter with the new type
  };

  const handleRopeTypeChange = (type: "simple" | "extended" | "block") => {
    setType(type);
    setDensity(getDefaultDensity("rope"));
    setFilteredImageUrl(imagePreviewUrl); // Reapply the filter with the new type
  };

  const handleStringTypeChange = (newShape: string) => {
    setShape(shape === newShape ? null : newShape); // Toggle the shape
    setFilteredImageUrl(imagePreviewUrl); // Reapply the filter with the new shape
  };

  const handleSignTypeChange = (newShape: string) => {
    setShape(shape === newShape ? null : newShape); // Toggle the shape
    setFilteredImageUrl(imagePreviewUrl); // Reapply the filter with the new shape
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
              {type === "simple" && (
                <StipplingArtFilterSimple
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  density={density || ""}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"simple"}
                />
              )}
              {type === "extended" && (
                <StipplingArtFilterExtended
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  density={density || ""}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"simple"}
                />
              )}
              {type === "block" && (
                <StipplingArtFilterBlock
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  density={density || ""}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"simple"}
                />
              )}
              <div className="filter-btns-stippling">
                <button
                  onClick={() => handleStipplingTypeChange("simple")}
                  className={`density-btn ${type === "simple" ? "active" : ""}`}
                >
                  SIMPLE
                </button>
                <button
                  onClick={() => handleStipplingTypeChange("extended")}
                  className={`density-btn ${
                    type === "extended" ? "active" : ""
                  }`}
                >
                  EXTENDED
                </button>
                <button
                  onClick={() => handleStipplingTypeChange("block")}
                  className={`density-btn ${type === "block" ? "active" : ""}`}
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
              {type === "simple" && (
                <RopeArtFilterSimple
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  density={density || ""}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"simple"}
                />
              )}
              {type === "extended" && (
                <RopeArtFilterExtended
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  density={density || ""}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"simple"}
                />
              )}
              {type === "block" && (
                <RopeArtFilterBlock
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  density={density || ""}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"simple"}
                />
              )}
              <div className="filter-btns-rope">
                <button
                  onClick={() => handleRopeTypeChange("simple")}
                  className={`density-btn ${type === "simple" ? "active" : ""}`}
                >
                  SIMPLE
                </button>
                <button
                  onClick={() => handleRopeTypeChange("extended")}
                  className={`density-btn ${type === "extended" ? "active" : ""}`}
                >
                  EXTENDED
                </button>
                <button
                  onClick={() => handleRopeTypeChange("block")}
                  className={`density-btn ${type === "block" ? "active" : ""}`}
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
              {type === "simple" && (
                <StringArtFilterSimple
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"simple"}
                />
              )}
              {type === "extended" && (
                <StringArtFilterExtended
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"simple"}
                />
              )}
              {type === "block" && (
                <StringArtFilterBlock
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"simple"}
                />
              )}
              <div className="filter-btns-string">
                <button
                  onClick={() => handleStringTypeChange("simple")}
                  className={`density-btn ${shape === "simple" ? "active" : ""}`}
                >
                  SIMPLE
                </button>
                <button
                  onClick={() => handleStringTypeChange("extended")}
                  className={`density-btn ${shape === "extended" ? "active" : ""}`}
                >
                  EXTENDED
                </button>
                <button
                  onClick={() => handleStringTypeChange("block")}
                  className={`density-btn ${shape === "block" ? "active" : ""}`}
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
              {type === "simple" && (
                <SignArtFilterSimple
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"simple"}
                  shape={""}
                />
              )}
              {type === "extended" && (
                <SignArtFilterExtended
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"simple"}
                  density={""}
                />
              )}
              {type === "block" && (
                <SignArtFilterBlock
                  imageSrc={filteredImageUrl}
                  canvasRef={canvasRef}
                  onFilterComplete={() => setIsLoading(false)}
                  filterType={"simple"}
                />
              )}
              <div className="filter-btns-sign">
                <button
                  onClick={() => handleSignTypeChange("simple")}
                  className={`density-btn ${shape === "simple" ? "active" : ""}`}
                >
                  SIMPLE
                </button>
                <button
                  onClick={() => handleSignTypeChange("extended")}
                  className={`density-btn ${shape === "extended" ? "active" : ""}`}
                >
                  EXTENDED
                </button>
                <button
                  onClick={() => handleSignTypeChange("block")}
                  className={`density-btn ${shape === "block" ? "active" : ""}`}
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
          <button onClick={handleModalClose} className="close-btn">
            CLOSE
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ImageUploaderModal;
