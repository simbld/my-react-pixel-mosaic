import { useState, useRef, useEffect } from "react";
import type { ImageUploaderModalProps } from "../interfaces/types";

const ImageUploaderModal: React.FC<ImageUploaderModalProps> = ({
  isOpen,
  onClose,
  onUpload
}) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onUpload(file);
    }
  };

  const handleModalClose = () => {
    setImagePreviewUrl(null);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      fileInputRef.current?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "Enter":
        fileInputRef.current?.click();
        break;
      case "Escape":
        onClose();
        break;
    }
  };

  const handleClick = () => {
    setIsActive(true);
    fileInputRef.current?.click();
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  return isOpen ? (
    <div
      className="overlay"
      role="dialog"
      ref={modalRef}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
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
          <div className="title-modal">Upload Image</div>
          <input
            type="file"
            id="file"
            accept="image/*"
            className="file-input"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              if (file) onUpload(file);
            }}
            ref={fileInputRef}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                onClose();
              }
            }}
          />
          <label
            className={`upload-button ${isActive ? "active" : ""}`}
            htmlFor="file"
            onClick={handleClick}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onMouseUp={handleMouseUp}
          >
            Choisir un fichier
          </label>
          {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" />}
          <button
            onClick={onClose}
            className="closeButton"
            ref={closeBtnRef}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ImageUploaderModal;
