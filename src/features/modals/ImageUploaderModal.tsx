import { useState, useRef, useEffect } from "react";
import type { ImageUploaderModalProps } from "../../interfaces/types";
import AsciiArtFilter from "../filters/AsciiArtFilter";

/**
 * ImageUploaderModal is a React component for uploading an image and applying an ASCII art filter.
 * @param {ImageUploaderModalProps} props - The properties for the component.
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {() => void} props.onClose - Function to close the modal.
 * @returns {JSX.Element | null} The modal element.
 */

const ImageUploaderModal: React.FC<ImageUploaderModalProps> = ({
  isOpen,
  onClose
}) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [filteredImageUrl, setFilteredImageUrl] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
        setFilteredImageUrl(null);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName("");
    }
    event.target.value = "";
  };

  const handleApplyFilter = () => {
    if (canvasRef.current && imagePreviewUrl) {
      const context = canvasRef.current.getContext("2d");
      const image = new Image();
      image.onload = () => {
        const canvasWidth = canvasRef.current!.width;
        const canvasHeight = canvasRef.current!.height;
        const aspectRatio = image.width / image.height;
        let imageWidth = canvasWidth;
        let imageHeight = canvasHeight;

        if (canvasWidth / canvasHeight > aspectRatio) {
          imageWidth = canvasHeight * aspectRatio;
        } else {
          imageHeight = canvasWidth / aspectRatio;
        }

        const x = (canvasWidth - imageWidth) / 2;
        const y = (canvasHeight - imageHeight) / 2;

        context!.clearRect(0, 0, canvasWidth, canvasHeight);
        context!.drawImage(image, x, y, imageWidth, imageHeight);
      };
      image.src = imagePreviewUrl;
      setFilteredImageUrl(imagePreviewUrl);
    }
  };

  const handleModalClose = () => {
    setImagePreviewUrl(null);
    setFilteredImageUrl(null);
    setFileName("");
    onClose();
  };

  useEffect(() => {
    if (isOpen && labelRef.current) {
      labelRef.current.focus();
    }
  }, [isOpen]);

  return isOpen ? (
    <div className="overlay" role="dialog" ref={modalRef} tabIndex={0}>
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
          <button className="upload-btn inline">mes images en ligne</button>
          <input
            type="file"
            id="file"
            accept="image/*"
            className="file-input"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <label className="upload-btn local" htmlFor="file" ref={labelRef}>
            mes images en local
          </label>
          {filteredImageUrl ? (
            <AsciiArtFilter imageSrc={filteredImageUrl} />
          ) : (
            imagePreviewUrl && (
              <div className="whiteboard-container">
                <canvas
                  className="whiteboard"
                  width={1080}
                  height={720}
                  ref={canvasRef}
                ></canvas>
              </div>
            )
          )}
          <button onClick={handleApplyFilter} className="filter-btn">
            Filtrer
          </button>
          <button onClick={handleModalClose} className="close-btn">
            Menu
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ImageUploaderModal;
